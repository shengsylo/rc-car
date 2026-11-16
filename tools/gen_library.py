#!/usr/bin/env python3
"""生成 library/<part>/part.json。尺寸是查资料/估计的（verified=false），实物到了量一下再改。
用法：python3 tools/gen_library.py   （会覆盖 library/ 下同名零件）"""
import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def row(names, x0, y, dx, **kw):
    out = []
    for i, n in enumerate(names):
        if n is None: continue
        p = {"id": n, "x": round(x0 + i * dx, 2), "y": y}
        p.update(kw.get(n, {}) if isinstance(kw.get(n), dict) else {})
        out.append(p)
    return out
def col(names, x, y0, dy):
    return [{"id": n, "x": x, "y": round(y0 - i * dy, 2)} for i, n in enumerate(names) if n]

P = {}
def part(pid, **d):
    P[pid] = d

def gpio(n, caps=("io", "pwm"), **extra):
    d = {"type": "gpio", "gpio": n, "caps": list(caps), "v": [0, 3.3]}
    d.update(extra); return d

# ---------- ESP32-C3 SuperMini（22.5 × 18 mm）----------
c3l = col(["5V", "GND", "3V3", "GPIO4", "GPIO3", "GPIO2", "GPIO1", "GPIO0"], -7.62, 8.89, 2.54)
c3r = col(["GPIO5", "GPIO6", "GPIO7", "GPIO8", "GPIO9", "GPIO10", "GPIO20", "GPIO21"], 7.62, 8.89, 2.54)
c3types = {
  "5V": {"type": "power_in", "v": [3.5, 5.5], "note": "1S 锂电直接接这里（板载 LDO 压差约 0.3V，电池低于 3.6V 时 3V3 会掉）"},
  "GND": {"type": "gnd"}, "3V3": {"type": "power_out", "v": [3.3, 3.3], "maxmA": 500},
  "GPIO0": gpio(0, ("io", "pwm", "adc")), "GPIO1": gpio(1, ("io", "pwm", "adc")),
  "GPIO2": gpio(2, ("io", "pwm", "adc"), strap="开机时要高电平（有内部上拉，别接会拉低的东西）"),
  "GPIO3": gpio(3, ("io", "pwm", "adc")), "GPIO4": gpio(4, ("io", "pwm", "adc")),
  "GPIO5": gpio(5, ("io", "pwm")), "GPIO6": gpio(6), "GPIO7": gpio(7),
  "GPIO8": gpio(8, ("io", "pwm", "i2c"), strap="开机时要高电平；板载 LED 在这脚"),
  "GPIO9": gpio(9, ("io", "pwm", "i2c"), strap="BOOT 按键；开机时低电平会进下载模式"),
  "GPIO10": gpio(10), "GPIO20": gpio(20, note="RX0"), "GPIO21": gpio(21, note="TX0"),
}
pins = c3l + c3r
for p in pins: p.update(c3types[p["id"]])
part("esp32c3-supermini", name="ESP32-C3 SuperMini", kind="mcu", soc="esp32c3", target="c3", size=[18, 22.52, 4.2], color="#1f3a5f", model="c3", pinZ=1.0,
     pins=pins, drawmA=120, verified=True, weight=1.7, source="https://www.espboards.dev/esp32/esp32-c3-super-mini/", price="RM18（MakerHub）", note="USB-C 在上边。GPIO 都是 3.3V，不能直接接 5V 信号。")

# ---------- ESP32 DevKit V1 30 针（51 × 28 mm）----------
L = ["EN", "GPIO36", "GPIO39", "GPIO34", "GPIO35", "GPIO32", "GPIO33", "GPIO25", "GPIO26", "GPIO27", "GPIO14", "GPIO12", "GND", "GPIO13", "VIN"]
R = ["GPIO23", "GPIO22", "GPIO1", "GPIO3", "GPIO21", "GPIO19", "GPIO18", "GPIO5", "GPIO17", "GPIO16", "GPIO4", "GPIO2", "GPIO15", "GND2", "3V3"]
pins = col(L, -12.7, 17.78, 2.54) + col(R, 12.7, 17.78, 2.54)
for p in pins:
    n = p["id"]
    if n.startswith("GPIO"):
        g = int(n[4:])
        caps = ["in", "adc"] if g in (34, 35, 36, 39) else ["io", "pwm"] + (["adc"] if g in (32, 33, 25, 26, 27, 14, 12, 13, 15, 2, 4) else [])
        d = gpio(g, caps)
        if g in (34, 35, 36, 39): d["note"] = "只能输入"
        if g in (0, 2, 5, 12, 15): d["strap"] = {12: "开机时必须低电平（否则闪存电压错，开不了机）", 2: "开机时要低/浮空", 0: "开机时低电平进下载模式", 5: "开机时要高", 15: "开机时要高"}[g]
        if g in (1, 3): d["note"] = "USB 串口（TX/RX），别用"
        if g in (25, 26) : pass
        p.update(d)
    elif n in ("GND", "GND2"): p.update({"type": "gnd"})
    elif n == "VIN": p.update({"type": "power_in", "v": [4.5, 12], "note": "板载 AMS1117，最高约 12V（会很烫），建议 5–7V"})
    elif n == "3V3": p.update({"type": "power_out", "v": [3.3, 3.3], "maxmA": 600})
    elif n == "EN": p.update({"type": "nc", "note": "复位"})
part("esp32-devkit", name="ESP32 DevKit V1（30 针）", kind="mcu", soc="esp32", target="esp32", size=[28.3, 51.5, 4.8], color="#1b2a3a", model="devkit", pinZ=3.1,
     pins=pins, drawmA=160, verified=False, weight=9.5, note="ADC2（GPIO 0/2/4/12–15/25–27）开 WiFi 时不能用来量电压。")

# ---------- DRV8833 模块（约 18.5 × 16 mm）----------
pins = col(["EEP", "OUT1", "OUT2", "OUT3", "OUT4", "ULT"], -7.6, 6.35, 2.54) + col(["IN1", "IN2", "VCC", "GND", "IN3", "IN4"], 7.6, 6.35, 2.54)
t = {"EEP": {"type": "enable", "note": "睡眠脚：高=工作。多数模块板上已上拉"}, "ULT": {"type": "nc", "note": "故障输出"},
     "OUT1": {"type": "motor_out", "ch": "A"}, "OUT2": {"type": "motor_out", "ch": "A"}, "OUT3": {"type": "motor_out", "ch": "B"}, "OUT4": {"type": "motor_out", "ch": "B"},
     "IN1": {"type": "logic_in", "fw": "IN1", "v": [0, 5.5], "need": ["pwm"]}, "IN2": {"type": "logic_in", "fw": "IN2", "v": [0, 5.5], "need": ["pwm"]},
     "IN3": {"type": "logic_in", "v": [0, 5.5], "need": ["pwm"]}, "IN4": {"type": "logic_in", "v": [0, 5.5], "need": ["pwm"]},
     "VCC": {"type": "power_in", "v": [2.7, 10.8], "note": "电机电源，1S 直接接"}, "GND": {"type": "gnd"}}
for p in pins: p.update(t[p["id"]])
part("drv8833", name="DRV8833 双路电机驱动", kind="driver", driver=2, size=[16, 18.5, 2.6], color="#5b2a86", model="drv8833", pinZ=1.2, pins=pins, verified=False, weight=1.2, source="https://components101.com/node/2317",
     maxA=1.5, note="每路持续 1.5A。IN1/IN2 都用 20kHz PWM（固件已改），没有 L298N 的 2V 压降。")

# ---------- L298N 模块（43 × 43 mm）----------
pins = [dict(p, z=11.6) for p in row(["12V", "GND", "5V"], -6.08, -17.5, 5.08)] + [dict(p, z=7.6) for p in row(["ENA", "IN1", "IN2", "IN3", "IN4", "ENB"], -6.35, 19, 2.54)] + \
       [{"id": "OUT1", "x": -17.5, "y": 4.04, "z": 11.6}, {"id": "OUT2", "x": -17.5, "y": -1.04, "z": 11.6}, {"id": "OUT3", "x": 17.5, "y": -1.04, "z": 11.6}, {"id": "OUT4", "x": 17.5, "y": 4.04, "z": 11.6}]
t = {"12V": {"type": "power_in", "v": [5, 35], "note": "电机电源。接反会烧（之前烧过一块）"}, "GND": {"type": "gnd"}, "5V": {"type": "power_out", "v": [5, 5], "maxmA": 300, "note": "跳线帽在时输出 5V"},
     "ENA": {"type": "logic_in", "fw": "ENA", "v": [0, 5.5], "need": ["pwm"]}, "ENB": {"type": "logic_in", "fw": "ENB", "v": [0, 5.5], "need": ["pwm"]},
     "IN1": {"type": "logic_in", "fw": "IN1", "v": [0, 5.5]}, "IN2": {"type": "logic_in", "fw": "IN2", "v": [0, 5.5]},
     "IN3": {"type": "logic_in", "fw": "IN3", "v": [0, 5.5]}, "IN4": {"type": "logic_in", "fw": "IN4", "v": [0, 5.5]},
     "OUT1": {"type": "motor_out", "ch": "A"}, "OUT2": {"type": "motor_out", "ch": "A"}, "OUT3": {"type": "motor_out", "ch": "B"}, "OUT4": {"type": "motor_out", "ch": "B"}}
for p in pins: p.update(t[p["id"]])
part("l298n", name="L298N 电机驱动", kind="driver", driver=1, size=[43, 43, 27], color="#b3261e", model="l298n", pins=pins, verified=True, weight=26,
     note="压降约 2V（2S 7.4V 到电机只剩约 5.4V），这是红车「60% 油门才动」的原因之一。")

# ---------- N20 带编码器电机 ----------
pins = [{"id": "M+", "x": -3, "y": -16, "type": "motor_in", "wire": "红"}, {"id": "M-", "x": 3, "y": -16, "type": "motor_in", "wire": "白"},
        {"id": "EVCC", "x": -4.5, "y": -14, "type": "power_in", "v": [3.3, 5], "wire": "黑"}, {"id": "EGND", "x": -1.5, "y": -14, "type": "gnd", "wire": "蓝"},
        {"id": "A", "x": 1.5, "y": -14, "type": "logic_out", "v": [0, 3.3], "wire": "绿"}, {"id": "B", "x": 4.5, "y": -14, "type": "logic_out", "v": [0, 3.3], "wire": "黄"}]
part("n20-encoder", name="N20 电机 6V 1500rpm + 霍尔编码器", kind="motor", size=[12, 34, 10], shape="motor", model="n20", color="#c0c0c0", pins=pins, verified=False, weight=10, shaft={"d": 3, "len": 10, "flat": 2.5},
     stallA=0.6, note="轴 3mm D 型，在 +y 方向。线色：红 M+ 白 M− 黑 编码器 VCC 蓝 GND 绿 A 黄 B。")

# ---------- 3.7g 舵机 ----------
pins = [{"id": "SIG", "x": -2.54, "y": -10, "type": "logic_in", "fw": "SERVO", "v": [0, 5], "need": ["pwm"], "wire": "黄"},
        {"id": "V+", "x": 0, "y": -10, "type": "power_in", "v": [2.8, 4.2], "wire": "红"}, {"id": "GND", "x": 2.54, "y": -10, "type": "gnd", "wire": "棕"}]
part("servo-3g7", name="Mitoot 3.7g 金属齿舵机", kind="servo", size=[8.5, 20.2, 18.2], color="#222", model="servo", pins=pins, verified=True, weight=3.7, stallA=0.5,
     note="2.8–4.2V，1S 直接供电。堵转电流大，舵机线要短、电源加 470µF。")

# ---------- 电池 ----------
part("lipo-1s-lava580", name="BetaFPV LAVA II 1S 580mAh（BT2.0）", kind="battery", size=[15, 70, 6.5], color="#e8a500", model="lipo", verified=True, weight=14.1,
     source="https://betafpv.com/products/lava-ii-1s-battery",
     pins=[{"id": "B+", "x": -2.5, "y": -35, "type": "power_src", "v": [3.3, 4.35]}, {"id": "B-", "x": 2.5, "y": -35, "type": "gnd"}], maxA=50,
     note="官方 70 × 15 × 6.5mm，14.1g。LiHV 满电 4.35V。")
part("lipo-2s", name="2S 锂电（红车）", kind="battery", size=[34, 70, 18], color="#2c5", model="lipo", verified=False,
     pins=[{"id": "B+", "x": -4, "y": -35, "type": "power_src", "v": [6.4, 8.4]}, {"id": "B-", "x": 4, "y": -35, "type": "gnd"}], maxA=20)

# ---------- 传感器 / 小件 ----------
pins = row(["VCC", "GND", "SCL", "SDA", "XDA", "XCL", "AD0", "INT"], -8.9, -6.5, 2.54)
t = {"VCC": {"type": "power_in", "v": [3, 5.5]}, "GND": {"type": "gnd"}, "SCL": {"type": "logic_in", "fw": "SCL", "v": [0, 3.3], "need": ["i2c"]},
     "SDA": {"type": "logic_io", "fw": "SDA", "v": [0, 3.3], "need": ["i2c"]}, "XDA": {"type": "nc"}, "XCL": {"type": "nc"}, "AD0": {"type": "nc"}, "INT": {"type": "nc"}}
for p in pins: p.update(t[p["id"]])
part("mpu6050", name="MPU6050 GY-521", kind="sensor", size=[21, 16, 3.2], color="#1d3f8f", model="mpu6050", pinZ=1.6, pins=pins, verified=True, drawmA=4, weight=2, source="https://protosupplies.com/product/mpu-6050-gy-521-3-axis-accel-gryo-sensor-module/")
part("buzzer", name="无源蜂鸣器", kind="io", size=[12, 12, 9.5], shape="cyl", model="buzzer", color="#111", verified=False,
     pins=[{"id": "SIG", "x": -3, "y": 0, "type": "logic_in", "fw": "BUZ", "v": [0, 5], "need": ["pwm"]}, {"id": "GND", "x": 3, "y": 0, "type": "gnd"}], drawmA=25)
part("batt-divider", name="电池分压（2 个电阻）", kind="passive", size=[6, 10, 2], color="#7a6", model="divider", verified=True,
     pins=[{"id": "VBAT", "x": 0, "y": 4, "type": "power_in", "v": [0, 12]}, {"id": "OUT", "x": 0, "y": 0, "type": "analog_out", "fw": "BATT", "v": [0, 3.3], "need": ["adc"]},
           {"id": "GND", "x": 0, "y": -4, "type": "gnd"}], note="1S：100k/100k（4.35V → 2.2V）；2S：100k/33k。")
part("cap-470u", name="470µF 16V 电解电容", kind="passive", size=[8, 8, 12], shape="cyl", model="ecap", color="#234", verified=False,
     pins=[{"id": "+", "x": -1.75, "y": 0, "type": "cap_pos", "v": [0, 16]}, {"id": "-", "x": 1.75, "y": 0, "type": "gnd"}], note="并在舵机/电机电源，防止 ESP32 掉电重启（BROWNOUT）。")
part("fpv-aio", name="Eachine TX06 5.8G 一体摄像头", kind="video", size=[14, 13.8, 12], color="#333", model="tx06", verified=False, weight=2.8,
     source="https://www.fpvfaster.com.au/products/eachine-tx06-700tvl-aio-5-8ghz-vtx-fpv-analog-camera", antenna={"len": 35, "d": 4.2},
     pins=[{"id": "VCC", "x": -2, "y": -6, "type": "power_in", "v": [2.9, 5.5]}, {"id": "GND", "x": 2, "y": -6, "type": "gnd"}], drawmA=300,
     note="官方 14 × 13.8mm、2.8g，3.3–5.5V 约 280mA；铜天线 35mm × Ø4.2 另算（高度未量）。天线朝上，别贴着电机线。")
part("wheel-15", name="车轮 Ø15", kind="wheel", size=[6, 15, 15], shape="wheel", model="wheel", color="#111", verified=False, pins=[], note="1:32 原车轮约 Ø15，量实物。")
part("wheel-34", name="N20 橡胶轮 Ø34", kind="wheel", size=[12, 34, 34], shape="wheel", model="wheel", color="#111", verified=True, pins=[])
part("switch", name="拨动开关", kind="io", size=[8.5, 4, 4], color="#777", model="switch", verified=False,
     pins=[{"id": "IN", "x": -2.54, "y": 0, "type": "pass"}, {"id": "OUT", "x": 2.54, "y": 0, "type": "pass"}], note="串在电池正极。")

part("dc-motor-130", name="130 有刷电机（红车）", kind="motor", size=[20, 25, 15], shape="motor", model="m130", color="#aaa", verified=False,
     pins=[{"id": "M+", "x": -3, "y": -12, "type": "motor_in"}, {"id": "M-", "x": 3, "y": -12, "type": "motor_in"}], stallA=2)

for pid, d in P.items():
    d.setdefault("shape", "box")
    os.makedirs(os.path.join(ROOT, "library", pid), exist_ok=True)
    with open(os.path.join(ROOT, "library", pid, "part.json"), "w") as f:
        json.dump(d, f, ensure_ascii=False, indent=1); f.write("\n")
print(len(P), "parts")
