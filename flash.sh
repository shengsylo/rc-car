#!/usr/bin/env bash
# RC 车一键烧录（macOS）—— 命令行版，跟 RC Studio 网页（bash start.sh 后打开 http://127.0.0.1:8090）同一套代码
#
#   第一次装车（USB 线）：     bash flash.sh                  编译 → 刷机 → 经 USB 写 WiFi（固件里不再有密码）
#   保时捷小车（ESP32-C3）：   TARGET=c3 CAR_ID=2 bash flash.sh
#   只编译（之后手机/Studio 无线升级）： bash flash.sh --server
#   只重新写 WiFi/车号：       bash flash.sh --prov
#   改 WiFi：                 bash flash.sh --wifi
#   只看串口输出：             bash flash.sh --monitor
#
# 第一次会自动安装 Homebrew 里的 arduino-cli、ESP32 核心和 WebSockets 库（约 5–10 分钟，之后不再装）。
# WiFi 名称和密码第一次会问你，存在 ~/.rcstudio/secrets.json（不进 git、不进固件），之后不再问。

set -euo pipefail
cd "$(dirname "$0")"

TARGET="${TARGET:-esp32}"
CAR_ID="${CAR_ID:-1}"
MODE="${1:-usb}"

say(){ printf "\n\033[1;32m▶ %s\033[0m\n" "$*"; }
die(){ printf "\n\033[1;31m✗ %s\033[0m\n" "$*"; exit 1; }

# ---------- 1. 工具（只装一次） ----------
if ! command -v arduino-cli >/dev/null; then
  command -v brew >/dev/null || die "先装 Homebrew：https://brew.sh 上那一行命令贴到终端运行，然后再跑这个脚本"
  say "安装 arduino-cli"
  brew install arduino-cli
fi

if ! arduino-cli core list 2>/dev/null | grep -q "^esp32:esp32"; then
  say "安装 ESP32 开发板支持（第一次比较久）"
  arduino-cli config init --overwrite >/dev/null 2>&1 || true
  arduino-cli config add board_manager.additional_urls \
    https://espressif.github.io/arduino-esp32/package_esp32_index.json
  arduino-cli core update-index
  arduino-cli core install esp32:esp32
fi

if ! arduino-cli lib list 2>/dev/null | grep -qi "^WebSockets "; then
  say "安装 WebSockets 库"
  arduino-cli lib install "WebSockets"
fi

# ---------- 只看串口 ----------
find_port(){ ls /dev/cu.usbserial* /dev/cu.SLAB_USBtoUART* /dev/cu.wchusbserial* /dev/cu.usbmodem* 2>/dev/null | head -1 || true; }
if [[ "$MODE" == "--monitor" ]]; then
  PORT="$(find_port)"; [[ -n "${PORT}" ]] || die "没找到 USB 串口，插上 ESP32 了吗？"
  say "串口输出（Ctrl+C 退出）"; exec arduino-cli monitor -p "${PORT}" -c baudrate=115200
fi

# ---------- 2. Node（tools/rc.js 用） ----------
if ! command -v node >/dev/null; then say "安装 Node.js"; brew install node; fi
[[ -d node_modules/serialport ]] || { say "安装 Node 依赖"; npm install --no-audit --no-fund --silent; }

case "$MODE" in
  --server) exec node tools/rc.js build "$TARGET" ;;
  --prov)   exec node tools/rc.js prov --car "$CAR_ID" ;;
  --wifi)   exec node tools/rc.js wifi ;;
  --ota)    die "--ota 不用了：先 bash flash.sh --server 编译，再在 RC Studio 或手机网页点「升级」" ;;
  usb)      node tools/rc.js setup "$TARGET" --car "$CAR_ID"
            PORT="$(find_port)"; [[ -n "$PORT" ]] && { say "串口输出（Ctrl+C 退出）"; exec arduino-cli monitor -p "$PORT" -c baudrate=115200; } ;;
  *)        die "不认识的参数：$MODE" ;;
esac
