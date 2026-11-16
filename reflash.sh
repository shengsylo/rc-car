#!/usr/bin/env bash
# 重新烧录（USB）——带检查、等待、自动重试
#
#   bash reflash.sh            正常重新烧
#   bash reflash.sh --erase    先把 ESP32 整片擦干净再烧（板子乱了、怎么都不对时用）
#
# 和 flash.sh 放同一个文件夹。前提：flash.sh 至少跑过一次（工具和 WiFi 已经装好）。

set -uo pipefail
cd "$(dirname "$0")"

FQBN="esp32:esp32:esp32"
BUILD="$(pwd)/.build"
TMP="$BUILD/src/rc_car"
ERASE=0; [[ "${1:-}" == "--erase" ]] && ERASE=1

say(){ printf "\n\033[1;32m▶ %s\033[0m\n" "$*"; }
warn(){ printf "\033[1;33m! %s\033[0m\n" "$*"; }
die(){ printf "\n\033[1;31m✗ %s\033[0m\n" "$*"; exit 1; }

command -v arduino-cli >/dev/null || die "还没装工具，先跑一次：bash flash.sh"
[[ -f .wifi ]] || die "还没设置 WiFi，先跑一次：bash flash.sh"

find_port(){ ls /dev/cu.usbserial* /dev/cu.SLAB_USBtoUART* /dev/cu.wchusbserial* /dev/cu.usbmodem* 2>/dev/null | head -1 || true; }
usb_seen(){ ioreg -p IOUSB -w0 2>/dev/null | grep -i -E "serial|uart|cp210|ch34|ch910|wch|silicon|jtag" | head -1; }

# ---------- 1. 安全提醒 ----------
say "烧录前检查"
cat <<'T'
  1. 电池断开（或者关车上的 ON 开关）
  2. ESP32 的 VIN 和 GND 两根线拔掉 —— USB 和 VIN 同时供电，Mac 会把 USB 口关掉
  3. 用能传数据的线，直接插 Mac，不要经过扩展坞
T
read -r -p "  都做好了按回车继续…" _

# ---------- 2. 等板子出现（最多 60 秒） ----------
say "等 Mac 认到 ESP32（拔插一次 USB 线试试）"
PORT=""
for i in $(seq 1 60); do
  PORT="$(find_port)"
  [[ -n "$PORT" ]] && break
  if (( i == 10 )); then
    if [[ -n "$(usb_seen)" ]]; then
      warn "Mac 看到了板子：$(usb_seen | sed 's/^[ |+-o]*//')"
      warn "但没有串口 → 缺驱动。板子芯片是 CH340/CH9102 的话装 WCH 驱动，CP2102 装 Silicon Labs 驱动"
    else
      warn "Mac 完全没看到板子：换个 USB 口 / 换根线；还不行就重启 Mac（被停用的 USB 口会恢复）"
    fi
  fi
  printf "."
  sleep 1
done
echo
[[ -n "$PORT" ]] || die "60 秒内没找到串口。按上面黄色提示处理后再跑一次"
say "找到 $PORT"

# ---------- 3. 编译（用 flash.sh 同一份配置） ----------
WSSID="$(sed -n 1p .wifi)"; WPASS="$(sed -n 2p .wifi)"
# 服务器 = 这台 Mac：车先用 mDNS 名字找，找不到再用 IP
SRV_HOST="$(scutil --get LocalHostName 2>/dev/null || hostname -s)"
SRV_IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"; CAR_ID="${CAR_ID:-1}"
mkdir -p "$TMP"
esc(){ printf '%s' "$1" | sed -e 's/[\\&|]/\\&/g' -e 's/"/\\\\"/g'; }
sed -e "s|const char\* WIFI_SSID *= *\".*\";|const char* WIFI_SSID   = \"$(esc "$WSSID")\";|" \
    -e "s|const char\* WIFI_PASS *= *\".*\";|const char* WIFI_PASS   = \"$(esc "$WPASS")\";|" \
    -e "s|const int  *CAR_ID *= *[0-9]*;|const int   CAR_ID    = ${CAR_ID};|" \
    -e "s|const char\* SERVER_HOST *= *\".*\";|const char* SERVER_HOST = \"${SRV_HOST}\";|" \
    -e "s|const char\* SERVER_IP *= *\".*\";|const char* SERVER_IP   = \"${SRV_IP}\";|" \
    rc_car.ino > "$TMP/rc_car.ino"

# 检查有没有真的填进去
if grep -qE 'WIFI_SSID *= *"你的WiFi' "$TMP/rc_car.ino"; then echo "✗ WiFi 没填进固件（脚本 bug），把这段贴给 Claude"; exit 1; fi
printf "\n  WiFi 名称：%s\n  WiFi 密码：%s\n  服务器：  %s.local / %s:8080\n  车号：    %s\n" "$WSSID" "${WPASS:0:1}***${WPASS: -1}（${#WPASS} 位）" "$SRV_HOST" "${SRV_IP:-（没拿到 IP）}" "$CAR_ID"
say "编译 车 #${CAR_ID}"
arduino-cli compile --fqbn "$FQBN" --build-path "$BUILD/out" "$TMP" > "$BUILD/compile.log" 2>&1 \
  || { grep -E "error|Error" "$BUILD/compile.log" | head -15; die "编译失败，把上面的错误贴给 Claude"; }

# ---------- 4. 擦除（可选） ----------
if (( ERASE )); then
  ESPTOOL="$(find "$HOME/Library/Arduino15/packages/esp32/tools/esptool_py" -name 'esptool' -type f 2>/dev/null | head -1)"
  if [[ -n "$ESPTOOL" ]]; then
    say "整片擦除（约 10 秒；卡在 Connecting 就按住 BOOT）"
    "$ESPTOOL" --port "$PORT" erase-flash || "$ESPTOOL" --port "$PORT" erase_flash || warn "擦除失败，继续直接烧"
  else
    warn "没找到 esptool，跳过擦除"
  fi
fi

# ---------- 5. 烧录，失败自动重试 3 次 ----------
for try in 1 2 3; do
  say "烧录到 ${PORT}（第 $try 次）"
  (( try > 1 )) && warn "现在按住板上 BOOT 键不放，看到 Writing 再松开"
  if arduino-cli upload --fqbn "$FQBN:UploadSpeed=115200" -p "$PORT" --input-dir "$BUILD/out" "$TMP"; then
    say "完成 ✓  下面会打印车的网址（Ctrl+C 退出）"
    warn "看完网址：拔 USB → 接回 VIN/GND → 接电池"
    sleep 1
    exec arduino-cli monitor -p "$PORT" -c baudrate=115200
  fi
  sleep 2
  PORT="$(find_port)"; [[ -n "$PORT" ]] || die "烧录中途串口消失了：线接触不良或 USB 口被停用，换口/重启 Mac 再试"
done
die "试了 3 次都没成功，把终端里的错误贴给 Claude"
