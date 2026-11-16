#!/usr/bin/env bash
# 启动 Mac 服务器：bash start.sh
# 第一次会自动装 Node.js 和 ws（约 1–2 分钟），之后秒开。
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v node >/dev/null; then
  command -v brew >/dev/null || { echo "先装 Homebrew：https://brew.sh"; exit 1; }
  echo "▶ 安装 Node.js"; brew install node
fi
# ws = 网络，three = 3D 世界（放在 Mac 上，手机不用连外网也能看 3D）
if [[ ! -d node_modules/ws || ! -f node_modules/three/build/three.module.min.js ]]; then
  echo "▶ 安装 ws + three（第一次约 1 分钟）"; npm install --no-audit --no-fund --silent
fi

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

echo "提示：macOS 弹出「是否允许 node 接受传入网络连接」时点【允许】，不然手机和车连不进来"
exec node server.js
