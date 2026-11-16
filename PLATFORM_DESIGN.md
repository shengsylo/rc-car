# RC Studio(工作台)设计方案

已读 `/home/claude/rc_car/` 下的 HANDOFF.md、server.js、ui.html、rc_car.ino、flash.sh、start.sh、package.json、wiring.html。本方案只做设计,没有改任何文件,也没有联网核实外部库的现状(需核实的点在第 7 节单列)。没有找到 CLAUDE.md,任务板格式按我的建议写。

## 先说结论

- **刷机**:后端驱动 arduino-cli + `serialport`,不用 Web Serial。编译本来就只能在 Mac 上做,USB 也插在 Mac 上。
- **界面**:`ui.html`(驾驶端)不重写。新建独立的 Studio 应用(Vite + TypeScript + React),只监听 127.0.0.1。
- **3D 与电路同步**:每个零件只存一份 3D 位姿。"布局图"是同一份数据的俯视正交投影,所以没有同步问题。
- **电路编辑器**:自研 SVG 的模块级接线图。PCB 不自研,导出 KiCad。
- **顺序**:Phase 0–1(设备管理)现在做,它替换的是你每天在用的 flash.sh。Phase 2 以后是工具链,不在"付费远程开车"的关键路径上,要限时做。

读代码发现三个现有问题,必须在 Phase 0–1 修:

1. **WiFi 密码泄露**:flash.sh 用 sed 把密码写进源码,编译出的 `firmware/car.bin` 由 server.js 的 `/fw/car.bin` 无认证提供下载。局域网内任何人都能下载并 `strings` 出密码,公网开放后更严重。
2. **管理操作无权限**:`/ui` WebSocket 上任何客户端都能发 `ota`、`cfg`、`selftest`、`calib`。公开网站上线前必须分离。
3. **只支持一种板**:FQBN 写死 `esp32:esp32:esp32`,引脚写死在 .ino 里。ESP32-C3 小车需要多 target。

---

## 1. 总体架构

```
┌─ 浏览器 ──────────────────────────────────────────────────────────┐
│ 驾驶端 ui.html(手机/PC,公开)     Studio(仅本机 Chrome)        │
│  驾驶·档位·声音·3D 世界            ┌ Shell:项目切换/面板/命令 ┐  │
│        │                           │ 设备  3D  接线  固件  打印 │  │
│        │ 共用 carRig.js(three)    │ 任务板  …(都是插件)      │  │
│        │                           └ ProjectStore(命令+undo) ┘  │
└────────┼───────────────────────────────────┼──────────────────────┘
   WS /ui│ 0.0.0.0:8080/8443           WS /admin + REST│ 127.0.0.1:8090
┌────────▼───────────────────────────────────▼──────────────────────┐
│ Node 后端(一个进程)                                             │
│ public 平面                │ admin 平面                            │
│  驾驶权/30Hz 控制/事件引擎 │  JobRunner(编译/烧录/OTA/切片,队列)│
│  (现有 server.js 逻辑)   │  PortManager(串口枚举/独占锁/日志) │
│                            │  ProjectFS(读写+文件监听+校验)     │
│                            │  BuildRegistry(固件产物/版本)      │
│                            │  PluginHost(加载插件的 server 端)  │
│        └──── core:DeviceRegistry · EventBus · Telemetry 通道 ────┘ │
└───┬────────────┬──────────────┬───────────────┬───────────────────┘
 WS /car      USB 串口       MQTT/FTPS       子进程
┌───▼───┐  ┌────▼─────┐   ┌────▼─────┐   ┌─────▼──────────────┐
│ESP32 车│  │ESP32/C3  │   │Bambu     │   │arduino-cli         │
│Pit 屏  │  │ELRS TX   │   │A1 mini   │   │OrcaSlicer CLI(后期)│
└────────┘  └──────────┘   └──────────┘   └────────────────────┘
磁盘:projects/<id>/  library/  builds/  ~/.rcstudio/secrets.json
```

边界规则:

- **public 平面**只有驾驶相关消息(hello、claim、release、input、ping)和只读遥测。以后通过 Cloudflare Tunnel 只暴露这一个端口。
- **admin 平面**只绑定 127.0.0.1。能碰 USB、文件、子进程、打印机的代码全在这里。
- **core** 不知道"车"以外的东西长什么样,只知道 Device、Channel、Event。RC 车逻辑(档位、翻车判定)是一个插件。

## 2. 技术选型

| 决策 | 选择 | 理由 | 备选(不选的原因) |
|---|---|---|---|
| 编译 | 后端调 arduino-cli | 已装好、已跑通、核心 3.3.12 已验证 | PlatformIO(迁移成本,无收益) |
| 烧录 | 后端 `arduino-cli upload` | 自带 esptool,零新增工具 | Web Serial + esptool-js(仅 Chrome、要 secure context;只有 USB 插在别的机器上时才有意义,接口上留口子) |
| 串口日志/配网 | npm `serialport` | 要双向写(配网、以后 CRSF),`arduino-cli monitor` 做不到 | 包一层 monitor 子进程 |
| 驾驶端 | `ui.html` 保持单文件 | 能用、手机优化过,重写零收益 | 拆成组件(等真要改时再拆) |
| Studio 框架 | Vite + TypeScript + React + Zustand | 面板、表单、属性检查器多,需要框架;生态最大 | Svelte、纯原生 |
| 3D | 原生 three.js(不用 R3F)+ `TransformControls` + `three-mesh-bvh` | 车模 `carRig.js` 要和 `ui.html` 共用,原生模块两边都能 import | react-three-fiber(共用不了) |
| three 版本 | 继续锁 0.160.0 | 两端共用一份,升级没有需求 | — |
| 接线图 | 自研 SVG,单位 mm,模块级 | 你要的是"哪个焊盘接哪个焊盘、线多长",这是 Fritzing 面包板视图的概念,交互必须自己控制 | tscircuit(代码优先,拖线交互弱);Wokwi(零件不是真实尺寸) |
| 零件库格式 | 自有 `part.json` + `top.svg` + `model.glb` | 要同时带电气、尺寸、固件角色,没有现成格式三样都有 | 直接用 Fritzing/KiCad 格式(缺电气和固件语义;只做导入器) |
| PCB | 不自研;导出 `.kicad_pcb` + 网表,到 KiCad 布线 | 布线器是几年的工作量;零件位置直接来自 3D 布局 | tscircuit、EasyEDA |
| 实体建模(车架/支架) | `manifold-3d`(WASM 布尔运算)→ STL/3MF | 快、布尔稳、浏览器和 Node 都能跑 | JSCAD、replicad(更重,但有 STEP 和圆角) |
| 项目存储 | 磁盘上的文件夹 + git | 可 diff、Claude 能直接改 JSON、零成本 | 数据库 |

### 3D 与电路同步的数据模型(核心设计)

三个视图,两份位置数据:

| 视图 | 位置数据 | 说明 |
|---|---|---|
| 3D 装配 | `part.pose`(车体坐标,mm) | 唯一的物理真相 |
| 2D 布局(俯视/侧视) | 同一个 `part.pose` 的正交投影 | 拖动时改的就是 pose 的 x/y 和绕 Z 旋转 |
| 原理图(逻辑) | `part.sch`(独立的 2D 坐标) | 只为好读,不需要和物理同步 |

- 所有编辑都是 `Command`(例如 `movePart`、`addWire`、`cutWire`),经 ProjectStore 产生补丁。各视图只订阅 store,所以任何视图的改动都会立刻出现在其他视图,undo/redo 也是全局的。
- **导线是真相,网络是推导的**:只存 `wires`(引脚到引脚),网络用并查集算出来。这样不会出现"网表说连了、线没画"的漂移。
- 导线的 3D 路径(折点)存在导线上,长度由路径算出,直接得到裁线清单。"剪线"就是删除这根线,或在中间插一个接头变成两根。
- 后端监听 `project.json`。Claude 或你在磁盘上改文件,Studio 实时刷新。

## 3. 项目数据模型(草案)

目录:

```
projects/porsche-132/
  project.json      # 下面的 schema
  TASKS.md          # 任务板
  models/           # 车壳 GLB、生成的 STL/3MF
  firmware/         # 该项目的 sketch(或引用共享 sketch)
library/<part-id>/  # part.json + top.svg + model.glb,跨项目共用
builds/<project>/<target>/<version>+<n>/  # app.bin + manifest.json
```

坐标系:X 向前、Y 向左、Z 向上,原点在后轴中心的地面投影。单位 mm、度、V、A。渲染时再转成 three 的 Y-up。

**project.json**(数值均为示例,以实测为准):

```jsonc
{
  "schema": 1,
  "id": "porsche-132", "name": "Porsche 1:32",
  "libraries": ["../../library"],

  "parts": [
    { "id": "u1", "ref": "U1", "part": "esp32-c3-supermini@1", "label": "主控",
      "pose": { "p": [38, 0, 9], "q": [0,0,0,1], "parent": "chassis" },
      "sch":  { "x": 200, "y": 120, "rot": 0 },
      "locked": false, "props": {} }
  ],

  "wires": [
    { "id": "w1", "from": "bt1.+", "to": "u3.VM",
      "awg": 24, "color": "red",
      "path": [[10,4,6],[22,4,6]],        // 3D 折点,可空(直线)
      "via": null }                         // 或接头零件 id
  ],
  "netMeta": [                              // 网络是推导的,这里只放命名和约束
    { "pin": "bt1.+", "name": "VBAT", "class": "power", "vRange": [3.3, 4.35] }
  ],

  "enclosure": {
    "shell":   { "model": "models/shell.glb", "pose": {"p":[0,0,0],"q":[0,0,0,1]}, "visualOnly": true },
    "keepIn":  [ { "id": "cabin", "type": "prism",            // 实测截面拉伸
                   "profile": [[5,-17],[70,-17],[70,17],[5,17]], "z": [3, 21],
                   "source": "卡尺 2026-11-xx" } ],
    "keepOut": [ { "id": "rear-axle", "type": "box", "min": [-4,-20,0], "max": [4,20,8] } ],
    "clearance": 0.5
  },

  "rig": {
    "params": { "wheelbase": 76, "track": 44, "wheelDia": 20 },
    "joints": [
      { "id": "steer_fl", "node": "wheel_fl", "axis": [0,0,1], "range": [-25, 25] },
      { "id": "spin_rl",  "node": "wheel_rl", "axis": [0,1,0], "continuous": true }
    ],
    "bindings": [                           // 遥测通道 → 关节
      { "joint": "steer_fl", "channel": "tel.ost", "scale": 25 },
      { "joint": "spin_rl",  "channel": "tel.rpmL", "mode": "velocity" }
    ],
    "clips": []                             // 关键帧动画,Phase 4
  },

  "firmware": {
    "targets": [
      { "id": "car-c3", "sketch": "firmware/rc_car", "fqbn": "esp32:esp32:esp32c3:CDCOnBoot=cdc",
        "mcu": "u1",
        "roles": { "motor.in1": "u3.AIN1", "servo.sig": "sv1.SIG", "imu.sda": "u2.SDA" },
        "params": { "pwmFreq": 20000, "failsafeMs": 500 } }
    ]
  },

  "devices": [
    { "id": "car2", "kind": "rc-car", "target": "car-c3", "hwId": "AA:BB:CC:DD:EE:FF",
      "links": [ { "type": "wifi-ws" }, { "type": "usb-serial" } ],
      "provision": { "wifi": "secret:home", "carId": 2 },   // 密码不进项目文件
      "calib": "calib.json#2" }
  ]
}
```

要点:

- `firmware.targets[].roles` 把固件角色映射到零件引脚。GPIO 号由导线推导(`sv1.SIG` 沿线连到 `u1.GPIO4`),构建时生成 `pins.h`。这样接线图和固件引脚永远一致,自检步骤也从这里生成。
- `devices[].links` 与传输无关。以后加 ELRS/CRSF 只是多一种 link。

**part.json**(零件库):

```jsonc
{
  "id": "drv8833-module", "rev": 1, "name": "DRV8833 双路电机驱动模块", "kind": "module",
  "body": { "size": [18.5, 16, 3.5], "model": "model.glb", "top": "top.svg", "mass_g": 1.2 },
  "pins": [
    { "id": "VM",   "pos": [-7.62, 6.35, 0], "type": "power_in",  "v": [2.7, 10.8] },
    { "id": "GND",  "pos": [-7.62, 3.81, 0], "type": "gnd" },
    { "id": "AIN1", "pos": [ 7.62, 6.35, 0], "type": "digital_in", "vih": 2.0, "vMaxIn": 5.75 },
    { "id": "AOUT1","pos": [-7.62,-3.81, 0], "type": "motor_out", "iMax": 1.5 }
  ],
  "mcuCaps": null,          // MCU 零件才有:每个 GPIO 的 adc/pwm/strapping/usb/仅输入
  "electrical": { "iq_mA": 2 },
  "mount": { "holes": [], "methods": ["tape", "slot"] },
  "fw": { "driver": "drv8833" },
  "source": { "datasheet": "…", "measured": false, "verifiedAt": null }
}
```

`source.measured` 为 false 的零件,在适配检查里显示"尺寸未实测"警告。小车壳体内空间以毫米计,这个标记能避免打印废件。

**电气检查(ERC)规则,按价值排序:**

1. 电压范围:网络上所有电源输出的电压必须落在每个 `power_in` 的 `v` 范围内。
2. 逻辑电平:5V 信号接到 3.3V 引脚。
3. MCU 引脚能力:strapping 引脚、仅输入引脚、USB 占用引脚、WiFi 开启时不可用的 ADC。
4. 引脚冲突:一个 GPIO 被两个固件角色占用;固件角色没有接线。
5. 电流预算:负载合计对比电源能力(电池放电能力、板载 LDO 上限)。
6. 线规载流量;两个电源输出短接;缺 GND 回路。

## 4. 刷机与设备管理流程

### 固件侧要先改的三处

1. **配网改为 NVS**:固件启动时若 NVS 无配置,进入配网模式,从串口读一行 JSON(`{"t":"prov","ssid":…,"pass":…,"host":…,"ip":…,"car":2}`)写入 NVS。一个 bin 通用所有车,bin 里不再有密码。
2. **多 target**:引脚从生成的 `pins.h` 读,`#include` 而不是写死常量。
3. **OTA 回退**:OTA 后在 NVS 记 `pending`。新固件连上服务器后清除;连续 3 次启动仍未清除,就把启动分区切回旧分区。

### 首次 USB 烧录(逐步)

| 步骤 | 做什么 | 失败时 UI 显示 |
|---|---|---|
| 1. 发现 | 每 2 秒 `arduino-cli board list --format json`,按 VID/PID 识别芯片类型,新端口弹出卡片 | 没有端口:"换数据线 / 装 CH340 驱动" |
| 2. 选择 | 用户选项目、target、车号 | — |
| 3. 生成 | 从 project.json 生成 `pins.h` 和参数头文件;ERC 有错误则拦住 | 列出 ERC 错误,可点到接线图 |
| 4. 编译 | JobRunner 调 arduino-cli,日志流式推到 UI | 抽出 `error:` 行,保留完整日志,一键复制 |
| 5. 入库 | 产物写入 `builds/…/manifest.json`(版本、构建号、sha256、fqbn、git commit、配置哈希) | — |
| 6. 烧录 | PortManager 先关掉该端口的日志监视(独占锁),再 upload | 卡在 Connecting:"按住 BOOT 再插线";自动降速 115200 重试一次 |
| 7. 配网 | 重新打开串口,等到配网提示,发 prov JSON,等固件回 `ok` | 10 秒无响应:显示原始串口输出 |
| 8. 验证 | 等该设备在 `/car` WebSocket 上 hello,比对版本和 MAC,写入 `devices[]` | 30 秒未上线:显示串口里的 WiFi 失败原因(固件已有 `wifiReason`) |
| 9. 自检 | 可选,直接触发现有 selftest | 现有逻辑 |

### OTA

沿用现有 `ota` 消息和 90 秒超时。改动:从 BuildRegistry 选版本(可以降级),固件下载后校验 sha256,加上面的自动回退。有人在开车时不允许升级的规则保留。

### 日志与版本

- 每个 Job 一个 `logs/jobs/<时间>-<类型>.log`,UI 里可回看。串口日志按设备滚动保存。
- 版本 = `FW_VERSION` + 自增构建号。设备列表显示"当前版本 / 最新构建",不一致时高亮。
- `flash.sh`、`reflash.sh`、`logs.sh` 改成调用同一个 JobRunner 的薄 CLI,保证终端和 UI 行为一致。

### 其他设备类型

- **ELRS TX/RX**:不自己编译。设备插件只做识别、记录 binding phrase 和参数、CRSF 链路统计。固件用 ELRS 官方工具刷。
- **摄像头/UVC 接收器**:设备插件只登记"哪台车对应哪个视频输入",预览用浏览器的 `getUserMedia`。

### 安全

- admin 监听只绑 127.0.0.1,并且校验 `Origin` 和 `Host` 头。恶意网页可以让你的浏览器连本机端口,不校验就等于没隔离。
- 手机在赛道边做校准、自检:终端打印一次性 admin token(带二维码),局域网凭 token 访问有限的管理子集(校准、自检、参数),不含烧录和文件。
- 后端只用 `execFile` 加参数数组,Job 类型固定,不拼 shell 字符串。
- 密码只放 `~/.rcstudio/secrets.json`(兼容现有 `.wifi`),项目文件里只有引用,日志里打码。

## 5. 插件系统

先不做沙箱和市场。插件就是受信任的本地文件夹,同进程加载。

```
plugins/bambu/
  plugin.json     # id、版本、依赖、贡献点声明
  server.js       # 可选:export activate(ctx) / deactivate()
  client.js       # 可选:export activate(ui)  / deactivate()
```

```ts
// 后端
interface ServerCtx {
  devices: DeviceRegistry;            // registerDriver({ kind, match(port|mdns), connect() })
  jobs: JobRunner;                    // registerJob('slice', handler)
  bus: EventBus;                      // 订阅/发布事件与遥测通道
  project: ProjectFS;                 // 读写当前项目,注册 schema 扩展
  rpc: (name, handler) => void;       // 暴露给前端的方法(只在 admin 平面)
  secrets: SecretStore;
}
// 前端
interface UiCtx {
  panels: { register(id, title, Component) };
  commands: { register(id, run, keybinding?) };
  store: ProjectStore;                // 发命令、订阅
  partTypes / ercRules / exporters / rigBindings: { register(...) };
  rpc: (name, args) => Promise<any>;
}
```

生命周期:启动时扫描 → 按依赖排序 → `activate` → 切换项目时发 `project:open` / `project:close` → 退出时 `deactivate`。项目在 `project.json` 里声明启用哪些插件。

内置功能也按这个接口写:`devices-esp32`、`view-3d`、`view-wiring`、`firmware`、`tasks`、`rc-car`(档位、驾驶权、事件引擎)。

**Bambu A1 mini 插件怎么加:**

- 设备驱动:LAN 模式下用 MQTT(TLS)读状态和下发指令,用 FTPS 上传文件。访问码放 SecretStore。
- Job:`slice` 调 OrcaSlicer 或 Bambu Studio 的命令行,输入 3MF 加预设,输出切片后的 3MF。
- 面板:打印机状态、进度、"从当前项目发送"。
- 导出器:把 `manifold-3d` 生成的车架或支架写成 3MF。

**别的项目怎么复用**:新建 `projects/<新项目>/`,启用通用插件(设备、3D、接线、固件、打印、任务),不启用 `rc-car`。零件库是共用的。

**任务板**:`projects/<id>/TASKS.md` 是唯一真相,`tasks` 插件把它解析成看板,拖动卡片就改写文件。建议格式:

```md
## Doing
- [ ] #12 C3 固件移植 @phase1 !high
## Todo
## Done
```

Claude 和你都能直接编辑,git 可 diff。如果你的 CLAUDE.md 另有格式,只换解析器。

## 6. 路线图

工作量按"你 + Claude 专注工作日"估算。

| 阶段 | 交付物 | 工作量 | 为什么排这里 |
|---|---|---|---|
| **0 地基** | git init;server.js 拆成 core / public / admin 三个模块(行为不变);admin 监听 + Origin 校验;`ota/cfg/selftest/calib` 加权限;Studio 空壳;TASKS.md | 1–2 天 | 公开前必须修的安全问题,且后面全靠它 |
| **1 设备管理** | 端口发现、编译、烧录、串口日志、NVS 配网、OTA 选版本 + 回退、BuildRegistry、C3 target | 4–6 天 | 替换每天在用的 flash.sh;C3 小车到货就要用 |
| **2 项目模型 + 3D 布局** | project.json + schema 校验;8–10 个零件(C3、DRV8833、TB6612、MPU6050、N20、舵机、1S 电池、AIO 摄像头、ELRS RX);3D 摆放、吸附、俯视投影视图;对实测 keep-in 做适配检查 | 5–8 天 | 能回答"这些东西塞得进 Porsche 壳吗",打印前就省耗材 |
| **3 接线 + ERC** | 拖线、剪线、线色线规、长度清单;ERC;生成 `pins.h`;可打印的接线清单(取代 wiring.html) | 5–8 天 | 你烧过一块 L298N 和一块 ESP32,ERC 直接对应这个损失 |
| **4 动画** | `carRig.js` 关节 + 遥测绑定;驾驶端 3D 世界改用同一个车模;关键帧时间线(可选) | 4–6 天 | 对直播观感有用,但不阻塞任何事 |
| **5 打印** | 支架/车架生成 → 3MF;Bambu 状态、上传、开始打印;命令行切片 | 4–6 天 | 打印机到货并手动打过几次之后再做 |
| **6 以后** | KiCad 导出;G29;ELRS 设备插件 | 按需 | — |

合计约 5–7 周。

**建议的实际顺序**:现在做 0 和 1。阶段 2 开始前先决定一件事:第一版 Porsche 车架要不要等工具。我的建议是不等,第一版用代码(OpenSCAD/JSCAD 脚本)直接出 STL。原因是阶段 2–5 做完之前,车已经可以跑了。

**先不做的:**

- 自研 PCB 布线器、电路仿真(SPICE)、自动走线。
- 通用 CAD 建模(只做"底板 + 挖孔 + 支架"这类参数化生成)。
- 照片自动生成 3D 模型。车壳用手机扫描 App 导入 GLB,只当外观;适配检查只信卡尺量出的 keep-in。
- 插件沙箱、插件市场、多人协作、云端编译。
- 重写 `ui.html`。

## 7. 风险、取舍与成本

**最大的风险是范围。** 这套工作台是工具,不是产品。你的初衷(地下赛车、直播、付费远程驾驶)的关键路径是 FPV 延迟、控制链路、计圈、公网接入和登录收费,阶段 2–6 一项都不推进它们。按你的 Musk 五步,阶段 4 之后的每一项都应该先问"删掉会怎样"。建议每个阶段设硬性时间上限,超了就砍功能。

| 风险 | 影响 | 对策 |
|---|---|---|
| 零件尺寸不准 | 适配检查给出错误的"放得下" | `source.measured` 标记 + 未实测警告;默认间隙 0.5 mm |
| ERC 给人虚假的安全感 | 规则没覆盖的错误照样烧板 | UI 上写明检查了哪些规则;上电前仍按现有接线顺序做 |
| C3 原生 USB 的串口行为 | 烧录后端口重新枚举,日志断开 | PortManager 按 USB 序列号而不是端口名跟踪设备 |
| `serialport` 是原生模块 | Node 升级后可能要重装 | 锁 Node 大版本;失败时降级用 `arduino-cli monitor` 只读 |
| Bambu 局域网控制受固件限制 | 可能只能读状态,不能下发打印 | 买之前或到货第一天核实;最差情况是导出 3MF 手动发送,阶段 5 的一半仍有用 |
| 自研接线编辑器的交互打磨 | 比估算多花时间 | 第一版只做直线 + 折点,不做自动避让 |
| OTA 回退逻辑有 bug | 车变砖,要拆壳插 USB | 先在红车(容易插线)上验证,再用到 Porsche |

**需要联网核实后再依赖的点**(我没有查):

- Bambu A1 mini 当前固件下,第三方通过局域网 MQTT 下发打印是否需要开启开发者模式,以及开启后是否失去云端功能。
- OrcaSlicer / Bambu Studio 命令行切片在 macOS 上对 A1 mini 预设的可用性。
- Fritzing 零件库和 KiCad 封装库的许可证条款(如果要把导入的零件随项目分发)。
- `manifold-3d` 的 3MF 导出能力,不够的话要自己写 3MF 打包。

**成本**:软件全部开源免费,新增依赖是 `serialport`、Vite/React/Zustand、`three-mesh-bvh`、`manifold-3d`、一个 MQTT 客户端和一个 FTP 客户端。不需要任何付费服务。唯一的硬件支出是已在计划内的打印机。公网接入用 Cloudflare Tunnel 免费档即可。

## 相关文件

- `/home/claude/rc_car/server.js`:第 395–418 行(`selftest`/`ota` 无权限)、498–509 行(`cfg`)、592–599 行(`/fw/car.bin` 无认证)。
- `/home/claude/rc_car/flash.sh`:第 18 行(FQBN 写死)、66–74 行(sed 写入 WiFi 密码)。
- `/home/claude/rc_car/rc_car.ino`:第 30–53 行(凭据和引脚常量)、798–816 行(`doHttpOta`,无校验无回退)。
- `/home/claude/rc_car/wiring.html`:`W` 数组(约 290–325 行)是现有接线数据,可作为阶段 3 红车项目的导入来源。
- `/home/claude/rc_car/ui.html`:第 1288–1478 行(`buildWorld`),阶段 4 把车模部分抽成 `carRig.js`。