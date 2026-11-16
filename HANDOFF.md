# RC 遥控赛车项目 — 交接摘要（2026-10-27）

> 新对话开头贴这段 + 附上 rccar_v0.6.zip（里面是全部代码）。

## ★ 初衷（最重要，所有决定以这个为准）
- **Underground 地下赛车的感觉**。
- **直播/转播**：不露脸；自动转播（用传感器：RFID 计圈、IMU、速度等自动切镜头/出数据）；**AI 语音喊麦主持**（根据实时比赛数据解说）。
- **用户登录我的网站远程控制车**：比赛或自由玩。
- **以后收费**：例如公开跑道 10 分钟约 RM5。
- 所以：画质/延迟/稳定性要能给付费用户用，**不要推荐做不到这个目标的"代替品"**（例如用 WiFi 小摄像头代替真 FPV 这种）。

## 0. 我是谁 / 怎么跟我合作
- 我是程序员，你（Claude）写代码 + 指导硬件。中文沟通。
- 原则：第一性原理 + Musk 5 步（质疑需求→删除→简化→加速→自动化）。**省钱**，不要用我的钱去 test，先上网查资料确认再一次过买。
- WiFi：名称+密码存在我 Mac 上 `rc_car/.wifi`（第1行名称，第2行密码，flash.sh 第一次问我后自动生成，之后自动读取，烧录时自动填进固件）。证书在 Mac 的 `rc_car/certs/`（start.sh 自动生成）。新代码解压时**不要覆盖/删除** Mac 上的 `.wifi` 和 `certs/`。
- 安全：flash.sh/reflash.sh 输出已把密码打码，不要在聊天里显示密码。Shopee/AliExpress 我自己登录，你**不能结账/付款/输入密码/解验证码**，不要动我购物车里无关的东西。

## 1. 系统架构
手机/PC 浏览器 ⇄ WebSocket ⇄ Mac 上的 Node `server.js` ⇄ WebSocket ⇄ ESP32 车
- server.js：ws 端口 8080 + HTTPS 8443（自签证书，手机陀螺仪需要 secure context）。`ui.html` 由 server 提供。three.js 0.160.0 从 node_modules 走 `/vendor/three.module.min.js`。
- 目标：多车竞速，F1/地下赛车氛围；以后加转播、换电站、FPV。

## 2. 代码现状（v0.6 zip，固件 FW 0.5.0）
文件：`rc_car.ino`、`server.js`、`ui.html`、`wiring.html`、`start.sh`、`flash.sh`、`reflash.sh`、`flash_pit.sh`、`logs.sh`、`package.json`、`config.json`、`pit_display/`、`firmware/`
- **固件 rc_car.ino**：发原始 IMU（校准在 server 做）；蜂鸣器 D13（默认关）+ RTTTL + 喇叭；转向模式 `smode` 0=满舵 1=比例(pmin+(1-pmin)|s|，死区0.04) 2=舵机 D18（LEDC ch6 50Hz 16bit，sc 中位/sr 行程 µs）；自检含 buz；OTA。
  - Arduino 注意：自定义类型（如 `struct Note`）必须放文件最顶（auto-prototype 问题）。Flash 用量 93%。ESP32 core 我用 3.3.12。
- **server.js**：DEFAULT_CFG 含 `bz:0,bzlo:0,bvol:0.5,rvb:1,smode:1,pmin:0.35,sc:1500,sr:400`；校准（Rodrigues 旋转重力到 +Z、1/|g|、陀螺零偏，存 calib.json）；SONGS；司机档位/rpm 转发给观众。
- **ui.html**（手机端）：
  - 模式 direct/auto/manual；可选 4/6/8 档、一档低至 5%、geo/lin 档比、各档需要时间拉升；RPM 线性限速；油门曲线 thShape（<5% 发 0，否则 ≥0.07，用 sqrt 抵消固件 x²）。
  - WebAudio V12 声音（手机上出声）、回火、轮胎尖叫、倒车哔、本地 MP3 播放。
  - 3D 世界（赛道、车、龙门灯、烟、4 个镜头），失败回退 2D。
  - 转向：摇杆/按钮/手机陀螺仪（倾斜比例）；PC 键盘 Shift 加速；横屏有设置按钮；换挡拨片。
  - 设置页：驾驶/声音/车/手感/日志。
- **start.sh** 装 ws+three、生成含 IP/hostname.local/localhost SAN 的自签证书。**flash.sh** 编译前删旧 bin、失败显示错误并停止。
- 接线图 artifact：https://claude.ai/artifact/82mcEEbqMiwDnkGENFaFyT（v13，蜂鸣器 D13、舵机 D18）。

## 3. 硬件现状
- 红车（现在那台，较大，2S）+ ESP32 + **L298N**：第一块 L298N 因 VIN/GND 接反烧了，换了备用的。另一块 ESP32 坏了。RFID 已有。MPU6050 已有。
- 问题："60% 油门才动、一档就 60% 不丝滑" → 原因：静摩擦 + L298N 压降 + 2kHz PWM。
- 解决方案：TB6612（红车 2S 用）/ DRV8833（新小车 1S 用），**20kHz PWM**、**起步 kick**、**闭环测速**（霍尔 KY-003 + 3×2mm 磁铁，或电机反电动势 BEMF）。DRV8871 需 ≥6.5V 不适合。

## 4. 新小车方案（自己组装，1:43，比红车小，房间地板 3–5m，暂无 3D 打印机）
- （已取消，不买）**Jiabaile 4309（1:43）**：官方规格 2g **三线数码舵机**（可直接接 ESP32 GPIO）、615 空心杯电机 3.7V 51000rpm、2A 双向电调、3.7V 200mAh 15C 电池、11×4.5×3cm。官网 jiabailerc.com 卖备件：舵机 $7.99、电池 $7.99、USB 充电器 $5.99。
- 计划：拆掉原厂板 → ESP32-C3 SuperMini + DRV8833 + MPU6050 + 霍尔测速；固件要移植到 ESP32-C3。电池 1S 可接 C3 的 5V 脚（板载 LDO）。1S 上不要用 SR3100 二极管防反接（压降 0.5V 太大），用防呆插头。
- Fayee FQD17（Shopee RM99）也保留在购物车，内部不明，我自己再 check。

## 5. 购物车（全部 Shopee，未结账；AliExpress 方案已取消）
**方案 B：买 RC 来改（Fayee FQD17 1:43）**：Fayee FQD17 灰 RM99；ESP32-C3 SuperMini ×2 RM35.90（MakerHub MY）；DRV8833 ×2 RM7.80；TB6612 ×1 RM8.50（红车换掉 L298N）；3×2mm 磁铁 ×2 包 RM6；KY-003 ×2 RM3.20；1000µF 25V ×3 RM11.40；0.1µF ×10 RM0.60；SR3100 ×5 RM3（红车 2S 防反接）；热缩管；F-F 杜邦线 RM2.30。
**方案 A：自己组装（约 1:28，3D 打印车架）**：
- GA12-N20 霍尔编码器电机 6V 1500rpm ×2 RM39.28（szdhdj.my，预购约 11/5–14 到）。规格：减速比 1:10，6V 空载 1500rpm，额定 0.027kg·cm；接线 红=电机+ 白=电机− 黑=编码器VCC 蓝=GND 绿=A 黄=B。后轮左右各一个 → 电子差速 + 每轮闭环。1S 下约 925rpm → 34mm 轮约 1.3–1.6 m/s。
- 34mm N20 橡胶轮（3mm D 孔）×4 RM17.08；MG90S 金属舵机 180° ×1 RM13.92（同店 Mycontroller）。前轮直接套在 M3 螺丝上转（不买轴承，删掉）。
- BetaFPV LAVA II 1S 580mAh（LiHV 4.35V，95C，BT2.0 插头）×2 RM67.80（FPV Tribe）→ 一个在车上一个在充 = 换电站 v1。
- BetaFPV BT2.0 1S 充电器 V2（USB-C 5V/2A 输入，2 路 4.35V/1A 同时充，兼测电压）RM61。
- BT2.0 插头 1 对 ×3 RM15（车上、站上、备用；要焊）。
- MPU6050 GY-521（不焊针）×1 RM11.99（我已有一块，凑两台车各一块）。
- 880 件不锈钢内六角螺丝套装 M2–M5 带螺母垫片 RM45.61。
- 24AWG 硅胶线 红 2m + 黑 2m RM4.40。
**3D 打印机**：Bambu Lab A1 mini + 1 卷耗材 RM1,305（购物车显示价；对比 Creality Ender-3 V3 SE RM629 更便宜但更要调校）。
**FPV**：XIAO ESP32-S3 Sense 已从购物车删除（我不要代替品）。正确方向：每台车 5.8G 模拟 AIO 摄像头 → 每台车一个 UVC 接收器插 Mac 服务器 → 服务器推流给网站用户 + 直播。Shopee 上 UVC 接收器目前只找到 FUAV Mini 5.8G UVC RM420（i.663510799.47216181827，中国发货），待定。
- 新加合计约 RM1,581（含打印机），不含打印机约 RM276；加上方案 B 原有约 RM180。
- **需要电烙铁**焊 BT2.0、N20 线、MPU6050（我有没有还没确认）。

## 6. 换电站 / 电池
- v1 = 2 块 LAVA 580mAh + BT2.0 双路充电器。以后用 3D 打印做充电底座/快拆电池仓（BT2.0 插头做在底座上）。
- Fayee 原厂电池插头到货后再看，必要时改成 BT2.0 统一。

## 7. 待办（按顺序）
1. 我检查 Shopee 购物车后自己结账。
2. 设计 3D 打印车架（N20 ×2 后驱、MG90S 前转向、34mm 轮、电池仓、C3/DRV8833/MPU6050 安装位）→ 出 STL。
3. 固件：移植 ESP32-C3；双 N20 编码器闭环（每轮 PID + 电子差速）、起步 kick、20kHz PWM；Fayee 用霍尔测速；红车换 TB6612。
4. 新接线图（DIY 车、Fayee、红车 TB6612）。
5. FPV：XIAO S3 Sense MJPEG 流接入 ui.html/转播。
6. 换电站底座设计。

## 8. 技术备忘
- 沙盒编译测试用 Arduino 自己的 ctags（`--build-property runtime.tools.ctags.path=...`）。
- 杀 server 用 `pkill -f "^node server.js"`（不加 ^ 会杀到 shell）。
- SVG 元素隐藏用 toggleAttribute('hidden')，不是 class。
