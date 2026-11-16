#!/usr/bin/env bash
# 启动 RC Studio：rcstudio（第一次跑 bash start.sh 会装好 rcstudio 命令）
# 先开 RC Studio（http://127.0.0.1:8090，只有这台 Mac 能开）；驾驶服务器（8080，车和手机连的）在 Studio 里开关。
#   rcstudio           开 Studio
#   rcstudio --drive   Studio + 驾驶服务器一起开
# 第一次会自动装 Node.js 和依赖（约 1–2 分钟），之后秒开。
set -euo pipefail
cd "$(dirname "$0")"
STUDIO="http://127.0.0.1:${RC_ADMIN_PORT:-8090}/"

# 已经开着：直接打开网页
if curl -s -m 1 -o /dev/null "${STUDIO}api/status" 2>/dev/null; then
  echo "RC Studio 已经开着：${STUDIO}"
  [[ " $* " == *" --drive "* ]] && curl -s -m 5 -X POST -H 'content-type: application/json' -d '{}' "${STUDIO}api/driveStart" >/dev/null && echo "驾驶服务器开了"
  open "$STUDIO" 2>/dev/null || true; exit 0
fi

if ! command -v node >/dev/null; then
  command -v brew >/dev/null || { echo "先装 Homebrew：https://brew.sh"; exit 1; }
  echo "▶ 安装 Node.js"; brew install node
fi
# ws = 网络，three = 3D 世界（放在 Mac 上，手机不用连外网也能看 3D）
# serialport = RC Studio 用 USB 配网/看串口
if [[ ! -d node_modules/ws || ! -f node_modules/three/build/three.module.min.js || ! -d node_modules/serialport ]]; then
  echo "▶ 安装 ws + three + serialport（第一次约 1 分钟）"; npm install --no-audit --no-fund --silent
fi
# RC Studio 网页（studio/dist 已经编译好放在 repo 里；改了 studio/src 才需要重编）
if [[ ! -f studio/dist/index.html ]]; then
  echo "▶ 编译 RC Studio"; npm run studio:build --silent
fi
command -v arduino-cli >/dev/null || echo "提示：还没装 arduino-cli（RC Studio 编译/刷机要用）：brew install arduino-cli，或先跑一次 bash flash.sh"


# 手机浏览器只在 https 网页里给陀螺仪：做一张自己签的证书（只在家里 WiFi 用）
IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo 127.0.0.1)"
HOSTN="$(scutil --get LocalHostName 2>/dev/null || hostname -s)"
if [[ ! -f certs/cert.pem || "$(cat certs/ip 2>/dev/null)" != "${IP}" ]]; then
  mkdir -p certs
  printf '%s\n' '[req]' 'distinguished_name = dn' 'x509_extensions = v3' 'prompt = no' '[dn]' 'CN = rccar' '[v3]' \
    "subjectAltName = IP:${IP},DNS:${HOSTN}.local,DNS:localhost" 'basicConstraints = CA:FALSE' \
    'keyUsage = digitalSignature, keyEncipherment' 'extendedKeyUsage = serverAuth' > certs/openssl.cnf
  if openssl req -x509 -newkey rsa:2048 -nodes -days 825 -keyout certs/key.pem -out certs/cert.pem -config certs/openssl.cnf >/dev/null 2>&1; then
    echo "${IP}" > certs/ip; echo "▶ 做好了 https 证书（${IP}）"
  else
    echo "! 证书没做成（openssl 出错）：手机陀螺仪转向用不了，其他照常"
  fi
fi

# rcstudio 命令（只装一次）：放到 PATH 里一个能写的地方
if ! command -v rcstudio >/dev/null; then
  HERE="$(pwd)"
  for d in /opt/homebrew/bin /usr/local/bin "$HOME/.local/bin"; do
    if [[ "$d" == "$HOME/.local/bin" ]]; then mkdir -p "$d"; fi
    if [[ -d "$d" && -w "$d" ]]; then
      printf '#!/bin/sh\n# RC Studio（rc-car 文件夹：%s）\nexec bash "%s/start.sh" "$@"\n' "$HERE" "$HERE" > "$d/rcstudio"; chmod +x "$d/rcstudio"
      echo "▶ 装好了命令：rcstudio（$d/rcstudio），以后在任何地方打 rcstudio 就开"
      if [[ "$d" == "$HOME/.local/bin" ]] && ! grep -q '.local/bin' "$HOME/.zshrc" 2>/dev/null; then
        echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.zshrc"; echo "  （加进了 ~/.zshrc，新开的终端才认得）"
      fi
      break
    fi
  done
fi

( sleep 1.5; open "$STUDIO" 2>/dev/null || true ) &
echo "提示：macOS 弹出「是否允许 node 接受传入网络连接」时点【允许】，不然手机和车连不进来"
exec node server.js "$@"
