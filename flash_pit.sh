#!/usr/bin/env bash
# 维修站屏幕烧录（macOS）
#
#   ESP32-C3 SuperMini： bash flash_pit.sh
#   普通 ESP32 DevKit：  BOARD=esp32 bash flash_pit.sh
#   只看串口（触摸校准）：bash flash_pit.sh --monitor
#
# 要先跑过一次 flash.sh（工具和 WiFi 已经设置好）。
set -uo pipefail
cd "$(dirname "$0")"

BOARD="${BOARD:-c3}"
if [[ "$BOARD" == "c3" ]]; then FQBN="esp32:esp32:esp32c3:CDCOnBoot=cdc"; UPFQBN="$FQBN,UploadSpeed=115200"
else FQBN="esp32:esp32:esp32"; UPFQBN="$FQBN:UploadSpeed=115200"; fi
BUILD="$(pwd)/.build_pit"
TMP="$BUILD/src/pit_display"

say(){ printf "\n\033[1;32m▶ %s\033[0m\n" "$*"; }
die(){ printf "\n\033[1;31m✗ %s\033[0m\n" "$*"; exit 1; }

command -v arduino-cli >/dev/null || die "先跑一次 bash flash.sh 装好工具"
[[ -f .wifi ]] || die "先跑一次 bash flash.sh 设置 WiFi"
[[ -f pit_display/pit_display.ino ]] || die "找不到 pit_display/pit_display.ino（要放在 pit_display 文件夹里）"

find_port(){ ls /dev/cu.usbmodem* /dev/cu.usbserial* /dev/cu.wchusbserial* /dev/cu.SLAB_USBtoUART* 2>/dev/null | head -1 || true; }

if [[ "${1:-}" == "--monitor" ]]; then
  PORT="$(find_port)"; [[ -n "$PORT" ]] || die "没找到 USB 串口"
  say "串口（点屏幕四个角，记下 raw 值填进 TS_MINX/MAXX/MINY/MAXY；Ctrl+C 退出）"
  exec arduino-cli monitor -p "$PORT" -c baudrate=115200
fi

for lib in "WebSockets" "Adafruit GFX Library" "Adafruit BusIO" "Adafruit ST7735 and ST7789 Library" "Adafruit ILI9341" "XPT2046_Touchscreen"; do
  arduino-cli lib list 2>/dev/null | grep -qi "^${lib// /.} " || { say "安装库 $lib"; arduino-cli lib install "$lib" >/dev/null; }
done

WSSID="$(sed -n 1p .wifi)"; WPASS="$(sed -n 2p .wifi)"
SRV_HOST="$(scutil --get LocalHostName 2>/dev/null || hostname -s)"
SRV_IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"
esc(){ printf '%s' "$1" | sed -e 's/[\\&|]/\\&/g' -e 's/"/\\\\"/g'; }
mkdir -p "$TMP"
sed -e "s|const char\* WIFI_SSID   = \".*\";|const char* WIFI_SSID   = \"$(esc "$WSSID")\";|" \
    -e "s|const char\* WIFI_PASS   = \".*\";|const char* WIFI_PASS   = \"$(esc "$WPASS")\";|" \
    -e "s|const char\* SERVER_HOST = \".*\";|const char* SERVER_HOST = \"${SRV_HOST}\";|" \
    -e "s|const char\* SERVER_IP   = \".*\";|const char* SERVER_IP   = \"${SRV_IP}\";|" \
    pit_display/pit_display.ino > "$TMP/pit_display.ino"

say "编译维修站屏幕（${BOARD}）"
arduino-cli compile --fqbn "$FQBN" --build-path "$BUILD/out" "$TMP" 2>&1 | tail -4
[[ ${PIPESTATUS[0]} -eq 0 ]] || die "编译失败，把上面的错误贴给 Claude"

say "插上屏幕那块板的 USB…"
PORT=""; for i in $(seq 1 30); do PORT="$(find_port)"; [[ -n "$PORT" ]] && break; printf "."; sleep 1; done; echo
[[ -n "$PORT" ]] || die "没找到串口。C3 的话：按住 BOOT 再插 USB，然后再跑一次"

say "烧录到 $PORT"
arduino-cli upload --fqbn "$UPFQBN" -p "$PORT" --input-dir "$BUILD/out" "$TMP" \
  || arduino-cli upload --fqbn "$FQBN" -p "$PORT" --input-dir "$BUILD/out" "$TMP" \
  || die "烧录失败：C3 的话按住 BOOT 键再插 USB，然后重跑"
say "完成 ✓  屏幕会显示 PIT WALL，Mac 上要先跑着 start.sh"
