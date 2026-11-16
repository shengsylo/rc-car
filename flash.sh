#!/usr/bin/env bash
# RC 车一键烧录（macOS）
#
#   第一次（USB 线）：       ./flash.sh
#   之后（无线，车开着就行）： ./flash.sh --ota
#   放到服务器，从手机网页点「升级」： ./flash.sh --server   ← 推荐，有记录、有人在开时不会升级
#   只看串口输出：          ./flash.sh --monitor
#   第二台车：              CAR_ID=2 ./flash.sh
#
# 第一次会自动安装 Homebrew 里的 arduino-cli、ESP32 核心和 WebSockets 库（约 5–10 分钟，之后不再装）。
# WiFi 名称和密码第一次会问你，存在同目录的 .wifi 文件里，之后不再问。

set -euo pipefail
cd "$(dirname "$0")"

SKETCH_DIR="$(pwd)"
SKETCH="rc_car.ino"
FQBN="esp32:esp32:esp32"
CAR_ID="${CAR_ID:-1}"
BUILD="$SKETCH_DIR/.build"
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

# ---------- 2. WiFi（只问一次） ----------
if [[ ! -f .wifi ]]; then
  read -r -p "家里 WiFi 名称（必须是 2.4GHz）: " WSSID
  read -r -s -p "WiFi 密码: " WPASS; echo
  printf '%s\n%s\n' "$WSSID" "$WPASS" > .wifi
  chmod 600 .wifi
fi
WSSID="$(sed -n 1p .wifi)"; WPASS="$(sed -n 2p .wifi)"
# 服务器 = 这台 Mac：车先用 mDNS 名字找，找不到再用 IP
SRV_HOST="$(scutil --get LocalHostName 2>/dev/null || hostname -s)"
SRV_IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"

# ---------- 3. 生成带配置的临时源码（不改你的原文件） ----------
TMP="$BUILD/src/rc_car"; mkdir -p "$TMP"
esc(){ printf '%s' "$1" | sed -e 's/[\\&|]/\\&/g' -e 's/"/\\\\"/g'; }
sed -e "s|const char\* WIFI_SSID *= *\".*\";|const char* WIFI_SSID   = \"$(esc "$WSSID")\";|" \
    -e "s|const char\* WIFI_PASS *= *\".*\";|const char* WIFI_PASS   = \"$(esc "$WPASS")\";|" \
    -e "s|const int  *CAR_ID *= *[0-9]*;|const int   CAR_ID    = ${CAR_ID};|" \
    -e "s|const char\* SERVER_HOST *= *\".*\";|const char* SERVER_HOST = \"${SRV_HOST}\";|" \
    -e "s|const char\* SERVER_IP *= *\".*\";|const char* SERVER_IP   = \"${SRV_IP}\";|" \
    "$SKETCH" > "$TMP/rc_car.ino"

# 检查有没有真的填进去
if grep -qE 'WIFI_SSID *= *"你的WiFi' "$TMP/rc_car.ino"; then echo "✗ WiFi 没填进固件（脚本 bug），把这段贴给 Claude"; exit 1; fi
printf "\n  WiFi 名称：%s\n  WiFi 密码：%s\n  服务器：  %s.local / %s:8080\n  车号：    %s\n" "$WSSID" "${WPASS:0:1}***${WPASS: -1}（${#WPASS} 位）" "$SRV_HOST" "${SRV_IP:-（没拿到 IP）}" "$CAR_ID"

# ---------- 4. 编译（有缓存，第二次起只要几秒） ----------
say "编译 车 #${CAR_ID}"
rm -f "$BUILD/out/rc_car.ino.bin"   # 删掉旧的，免得编译失败时把旧固件当新的发出去
CLOG="$BUILD/compile.log"
CRC=0; arduino-cli compile --fqbn "$FQBN" --build-path "$BUILD/out" "$TMP" > "$CLOG" 2>&1 || CRC=$?
if [[ $CRC -ne 0 || ! -f "$BUILD/out/rc_car.ino.bin" ]]; then
  grep -E "error|Error|错误" "$CLOG" | head -15
  die "编译失败，把上面的错误贴给 Claude（完整记录：.build/compile.log）"
fi
grep -E "Sketch uses|项目使用" "$CLOG" | head -1 || true

# 每次编译都放一份到 firmware/，服务器从这里给车 OTA
FWVER="$(sed -n 's/.*FW_VERSION *= *"\([^"]*\)".*/\1/p' "$SKETCH" | head -1)"
mkdir -p firmware
cp "$BUILD/out/rc_car.ino.bin" firmware/car.bin
printf '{"version":"%s","built":"%s"}\n' "$FWVER" "$(date '+%Y-%m-%d %H:%M')" > firmware/info.json
say "固件 $FWVER 已放到 firmware/（服务器可以推送给车）"

if [[ "$MODE" == "--server" ]]; then
  say "完成 ✓  手机网页 → 设置 → 车辆维护 → 点「升级到 ${FWVER}」（没人在开时才能升级）"
  exit 0
fi

# ---------- 5. 烧录 ----------
if [[ "$MODE" == "--ota" ]]; then
  HOST="car${CAR_ID}.local"
  say "无线烧录到 ${HOST}（车要开着并连上 WiFi）"
  IP="$(dscacheutil -q host -a name "${HOST}" 2>/dev/null | awk '/ip_address/{print $2; exit}')"
  [[ -n "${IP}" ]] || IP="${HOST}"
  ESPOTA="$(find "$HOME/Library/Arduino15/packages/esp32/hardware/esp32" -name espota.py | head -1)"
  [[ -n "$ESPOTA" ]] || die "找不到 espota.py，先用 USB 烧一次"
  python3 "$ESPOTA" -i "${IP}" -p 3232 -f "$BUILD/out/rc_car.ino.bin" -r \
    || die "无线烧录失败：车开着吗？Mac 和车在同一个 WiFi 吗？不行就插 USB 跑 ./flash.sh"
  say "完成 ✓  手机打开 http://${HOST}"
  exit 0
fi

PORT="$(find_port)"
[[ -n "${PORT}" ]] || die "没找到 USB 串口。换一根能传数据的 USB-C 线（很多线只能充电），或者装 CH340/CP2102 驱动"
say "USB 烧录到 ${PORT}（如果卡在 Connecting...，按住板上 BOOT 键 2 秒）"
arduino-cli upload --fqbn "$FQBN:UploadSpeed=115200" -p "${PORT}" --input-dir "$BUILD/out" "$TMP"

say "完成 ✓  下面会打印车的网址（Ctrl+C 退出）"
sleep 1
exec arduino-cli monitor -p "${PORT}" -c baudrate=115200
