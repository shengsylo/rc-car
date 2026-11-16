#!/usr/bin/env python3
"""生成示例项目 projects/porsche-132 和 projects/red-car（接线照 rc_car.ino 默认脚位）。已存在就跳过，除非加 --force。"""
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COL = {"pwr": "#e5484d", "gnd": "#222222", "sig": "#f5d90a", "i2c": "#3e9bff", "mot": "#ff8b3e", "adc": "#30a46c"}

def proj(pid, name, enclosure, parts, wires, rig, target, mcu, notes):
    W = []
    for i, (a, b, c) in enumerate(wires):
        pa, na = a.split("."); pb, nb = b.split(".")
        W.append({"id": f"w{i+1}", "a": {"part": pa, "pin": na}, "b": {"part": pb, "pin": nb}, "color": COL[c], "pts": []})
    P = []
    for pid_, lib, label, p, r in parts:
        P.append({"id": pid_, "lib": lib, "label": label, "pose": {"p": p, "r": r}})
    return {"schema": 1, "name": name, "units": "mm", "notes": notes, "enclosure": enclosure, "parts": P, "wires": W, "rig": rig,
            "anim": {"duration": 8, "channels": {"throttle": [[0, 0], [1, 0.6], [4, 1], [5.5, 0], [6.5, -0.4], [8, 0]], "steer": [[0, 0], [2, 0], [2.6, -1], [3.6, 1], [4.4, 0], [8, 0]]}},
            "firmware": {"targets": [{"target": target, "mcu": mcu}]}}

porsche = proj("porsche-132", "保时捷 1:32 遥控改装",
  {"size": [58, 140, 40], "floor": 3, "keepOut": [{"name": "前轮左", "c": [-22, 46, 7.5], "s": [10, 18, 16]}, {"name": "前轮右", "c": [22, 46, 7.5], "s": [10, 18, 16]},
                                                  {"name": "后轮左", "c": [-22, -44, 7.5], "s": [10, 18, 16]}, {"name": "后轮右", "c": [22, -44, 7.5], "s": [10, 18, 16]}]},
  [("u1", "esp32c3-supermini", "ESP32-C3", [0, 14, 15.2], [0, 0, 0]),
   ("u2", "drv8833", "DRV8833", [0, -12, 15], [0, 0, 0]),
   ("m1", "n20-encoder", "后驱 N20", [0, -44, 8], [0, 0, 90]),
   ("s1", "servo-3g7", "转向舵机", [0, 44, 12.1], [0, 0, 90]),
   ("b1", "lipo-1s-lava580", "LAVA 580", [0, 8, 8], [0, 0, 0]),
   ("v1", "fpv-aio", "FPV 摄像头", [-8, 20, 28], [0, 0, 0]),
   ("c1", "cap-470u", "470µF", [12, -14, 9], [0, 0, 0]),
   ("r1", "batt-divider", "电池分压", [12, 4, 5], [0, 0, 0]),
   ("k1", "switch", "开关", [-14, -14, 5], [0, 0, 90]),
   ("wfl", "wheel-15", "前左轮", [-22, 46, 7.5], [0, 0, 0]), ("wfr", "wheel-15", "前右轮", [22, 46, 7.5], [0, 0, 0]),
   ("wrl", "wheel-15", "后左轮", [-22, -44, 7.5], [0, 0, 0]), ("wrr", "wheel-15", "后右轮", [22, -44, 7.5], [0, 0, 0])],
  [("b1.B+", "k1.IN", "pwr"), ("k1.OUT", "u1.5V", "pwr"), ("k1.OUT", "u2.VCC", "pwr"), ("k1.OUT", "s1.V+", "pwr"), ("k1.OUT", "v1.VCC", "pwr"), ("k1.OUT", "c1.+", "pwr"), ("k1.OUT", "r1.VBAT", "pwr"),
   ("b1.B-", "u1.GND", "gnd"), ("u1.GND", "u2.GND", "gnd"), ("u2.GND", "s1.GND", "gnd"), ("s1.GND", "c1.-", "gnd"), ("u1.GND", "v1.GND", "gnd"), ("r1.GND", "u2.GND", "gnd"),
   ("u1.GPIO3", "u2.IN1", "sig"), ("u1.GPIO4", "u2.IN2", "sig"), ("u1.GPIO5", "s1.SIG", "sig"), ("u1.GPIO0", "r1.OUT", "adc"),
   ("u2.OUT1", "m1.M+", "mot"), ("u2.OUT2", "m1.M-", "mot")],
  {"steerMaxDeg": 25, "joints": [
    {"id": "j1", "part": "wfl", "kind": "yaw", "channel": "steer"}, {"id": "j2", "part": "wfr", "kind": "yaw", "channel": "steer"},
    {"id": "j3", "part": "wfl", "kind": "spin", "channel": "throttle"}, {"id": "j4", "part": "wfr", "kind": "spin", "channel": "throttle"},
    {"id": "j5", "part": "wrl", "kind": "spin", "channel": "throttle"}, {"id": "j6", "part": "wrr", "kind": "spin", "channel": "throttle"},
    {"id": "j7", "part": "s1", "kind": "horn", "channel": "steer"}]},
  "c3", "u1",
  "1:32 拉回车壳。尺寸都是估计，量实物后改 enclosure 和零件位置。后轴 15T/20T 齿轮减速，N20 横放。")

red = proj("red-car", "红车（ESP32 + L298N，2S）",
  {"size": [120, 230, 70], "floor": 5, "keepOut": []},
  [("u1", "esp32-devkit", "ESP32", [-25, 20, 20], [0, 0, 0]),
   ("u2", "l298n", "L298N", [25, -30, 18], [0, 0, 0]),
   ("m1", "dc-motor-130", "驱动电机", [0, -85, 12], [0, 0, 90]),
   ("m2", "dc-motor-130", "转向电机", [0, 85, 12], [0, 0, 90]),
   ("b1", "lipo-2s", "2S 电池", [-25, -45, 14], [0, 0, 0]),
   ("i1", "mpu6050", "MPU6050", [25, 30, 10], [0, 0, 0]),
   ("z1", "buzzer", "蜂鸣器", [25, 60, 10], [0, 0, 0]),
   ("r1", "batt-divider", "电池分压", [0, 10, 8], [0, 0, 0]),
   ("wfl", "wheel-34", "前左轮", [-55, 85, 17], [0, 0, 0]), ("wfr", "wheel-34", "前右轮", [55, 85, 17], [0, 0, 0]),
   ("wrl", "wheel-34", "后左轮", [-55, -85, 17], [0, 0, 0]), ("wrr", "wheel-34", "后右轮", [55, -85, 17], [0, 0, 0])],
  [("b1.B+", "u2.12V", "pwr"), ("b1.B-", "u2.GND", "gnd"), ("u2.5V", "u1.VIN", "pwr"), ("u2.GND", "u1.GND", "gnd"),
   ("u1.3V3", "i1.VCC", "pwr"), ("u1.GND2", "i1.GND", "gnd"), ("u1.GPIO21", "i1.SDA", "i2c"), ("u1.GPIO22", "i1.SCL", "i2c"),
   ("u1.GPIO25", "u2.ENA", "sig"), ("u1.GPIO26", "u2.IN1", "sig"), ("u1.GPIO27", "u2.IN2", "sig"),
   ("u1.GPIO14", "u2.ENB", "sig"), ("u1.GPIO32", "u2.IN3", "sig"), ("u1.GPIO33", "u2.IN4", "sig"),
   ("u2.OUT1", "m1.M+", "mot"), ("u2.OUT2", "m1.M-", "mot"), ("u2.OUT3", "m2.M+", "mot"), ("u2.OUT4", "m2.M-", "mot"),
   ("u1.GPIO13", "z1.SIG", "sig"), ("z1.GND", "u1.GND", "gnd"),
   ("b1.B+", "r1.VBAT", "pwr"), ("r1.OUT", "u1.GPIO34", "adc"), ("r1.GND", "u2.GND", "gnd")],
  {"steerMaxDeg": 30, "joints": [
    {"id": "j1", "part": "wfl", "kind": "yaw", "channel": "steer"}, {"id": "j2", "part": "wfr", "kind": "yaw", "channel": "steer"},
    {"id": "j3", "part": "wfl", "kind": "spin", "channel": "throttle"}, {"id": "j4", "part": "wfr", "kind": "spin", "channel": "throttle"},
    {"id": "j5", "part": "wrl", "kind": "spin", "channel": "throttle"}, {"id": "j6", "part": "wrr", "kind": "spin", "channel": "throttle"}]},
  "esp32", "u1", "现在那台红车。L298N 之前 VIN/GND 接反烧过一块。")

force = "--force" in sys.argv
for pid, doc in (("porsche-132", porsche), ("red-car", red)):
    d = os.path.join(ROOT, "projects", pid); os.makedirs(d, exist_ok=True)
    f = os.path.join(d, "project.json")
    if os.path.exists(f) and not force: print("skip", pid); continue
    json.dump(doc, open(f, "w"), ensure_ascii=False, indent=1); print("wrote", pid)
