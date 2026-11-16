#!/usr/bin/env bash
# 看车（或维修站屏幕）的实时日志 —— debug 用
#
#   bash logs.sh            插 USB 就开始看，拔了再插会自动接回
#   bash logs.sh --save     同时存一份到 logs/ 文件夹（带时间），出问题直接把文件发给 Claude
#
# 想看开机过程：开着这个脚本，按一下板上的 EN 键。
# Ctrl+C 退出。
set -uo pipefail
cd "$(dirname "$0")"

command -v arduino-cli >/dev/null || { echo "先跑一次 bash flash.sh 装好工具"; exit 1; }

SAVE=0; [[ "${1:-}" == "--save" ]] && SAVE=1
LOG=""
if (( SAVE )); then mkdir -p logs; LOG="logs/$(date +%Y%m%d-%H%M%S).log"; echo "日志同时存到 $LOG"; fi

find_port(){ ls /dev/cu.usbserial* /dev/cu.wchusbserial* /dev/cu.SLAB_USBtoUART* /dev/cu.usbmodem* 2>/dev/null | head -1 || true; }

# 给关键字上色 + 翻译常见崩溃信息
colorize() {
  local R=$'\033[1;31m' Y=$'\033[1;33m' G=$'\033[1;32m' C=$'\033[1;36m' N=$'\033[0m' line ts
  while IFS= read -r line; do
    ts="$(date +%H:%M:%S)"
    case "$line" in
      *Brownout*|*BROWNOUT*)
        printf '%s\n' "$R$ts  $line$N" "$R        ↳ 电压不够：电池没电，或者 VIN 那路 5V 不稳。先用 USB/充电宝给 ESP32 供电$N" ;;
      *"Guru Meditation"*|*panic*|*"abort()"*|*Backtrace*)
        printf '%s\n' "$R$ts  $line$N" "$R        ↳ 程序崩溃了：把这一段整个复制给 Claude$N" ;;
      *rst:0x*|*boot:0x*)
        printf '%s\n' "$C$ts  ── 板子重启 ── $line$N" ;;
      *失败*|*断开*|*刹停*|*掉线*|*不工作*|*连不上*|*未检测到*|*ERR*|*rror*)
        printf '%s\n' "$Y$ts  $line$N" ;;
      *已连*|*OK*|*就绪*|*恢复*|*ready*)
        printf '%s\n' "$G$ts  $line$N" ;;
      *) printf '%s\n' "$ts  $line" ;;
    esac
  done
}

echo "等 USB…（插上车的 USB 线；Ctrl+C 退出）"
while true; do
  PORT="$(find_port)"
  if [[ -z "$PORT" ]]; then sleep 0.5; continue; fi
  printf "\n\033[1;32m▶ 已接上 %s —— 按板上 EN 键可以看开机日志\033[0m\n" "$PORT"
  if [[ -n "$LOG" ]]; then
    arduino-cli monitor -p "$PORT" -c baudrate=115200 --quiet 2>/dev/null | tee -a "$LOG" | colorize
  else
    arduino-cli monitor -p "$PORT" -c baudrate=115200 --quiet 2>/dev/null | colorize
  fi
  printf "\n\033[1;33m! USB 断开了，等重新接上…\033[0m\n"
  sleep 1
done
