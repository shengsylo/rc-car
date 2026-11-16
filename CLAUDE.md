# rc-car

远程遥控赛车平台。这个 repo 是 Claude 的工作区：固件、服务器、UI、设计文档、tracker 都在这里。

## 初衷（owner 的规则，不经他同意不改）

- Underground 地下赛车的感觉。
- 不露脸的自动转播（传感器：RFID 计圈、IMU、速度），AI 语音喊麦主持。
- 用户登录网站远程控制真车比赛或自由玩；以后收费（例如公开跑道 10 分钟约 RM5）。
- 第一性原理 + Musk 5 步（质疑需求→删除→简化→加速→自动化）。省钱：先查资料确认再一次过买，不用 owner 的钱去 test。
- 不推荐达不到目标的"代替品"；贵的东西先问 owner 再加购物车。

## Tracker 规则（`.claude/settings.json` 的 hooks 强制）

每件事一个 tracker：`private/t/RC00N-slug/task.json`。`docs/` 会被复制到公开网站，tracker 内容绝不能写进 `docs/`。

- 新工作：`python3 tools/tracker.py new "标题"`，再填 JSON。
- 进行中：编辑那个 `task.json`（`problem`, `idea`, `proof`, `solution`, `path`, `issues`, `data`, `files`, `log`）。字段格式见 `tools/tracker.py` 里的 `SKELETON`。
- 改了 `task.json` 后 hook 会把所有 tracker 推到私有 Supabase 表 `tasks`（手动：`python3 tools/tracker.py build`）。推送失败只打警告，下次 build 重试。Stop hook：`tools/ firmware/ pit_display/ studio/ projects/ library/` 有改动但 tracker 没更新，就不许结束这一轮。
- `docs/` 只是空壳（`index.html`, `task.html?id=RC00N`, `app.js`, `config.js`），登录后才从 Supabase 读内容（RLS，见 `supabase/schema.sql`）。不要手写 tracker HTML。设计改 `tools/*.template.html`，不要改 `docs/` 里的副本。
- **Supabase 和 xau-lab 共用同一个 project**：rc-car 的 id 前缀是 `RC`（xau-lab 是 `T`）。`tools/sb.py` 的 `ID_PREFIX` 只删/写 `RC*`，网站 `app.js` 只读 `id=like.RC*`。不要改成删全部。Keys 放 `.env`（git-ignored）：`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`。secret key 只给 `tools/sb.py` 读，绝不能出现在 `docs/`、日志、tracker 或任何 tracked 文件。`python3 tools/sb.py check` 检查。
- 文字字段只用 `` `code` ``、`**bold**` 和换行。tracker 用中文写，短、带数字。

## 安全

- WiFi 密码、管理 token、OTA 密码在 Mac 的 `~/.rcstudio/secrets.json`（旧的 `.wifi` 会自动导入），输出打码，不在聊天里显示。固件 0.6 起 bin 里**没有**密码（USB 配网写进 NVS）。不提交 `.env`、`.wifi`、`certs/`、`firmware/*.bin`、`builds/`。
- 管理功能（ota/cfg/selftest/calib）只给本机或 `?admin=TOKEN`；RC Studio 只绑 `127.0.0.1:8090`，检查 Host/Origin。不要把管理动作加到驾驶端。
- Shopee/淘宝：owner 自己登录、结账、付款；Claude 不输入密码、不解验证码、不结账。改购物车一件一件来，每件确认。

## 布局

- 启动：`rcstudio`（= `bash start.sh`，第一次自动装这个命令；Finder 双击 `RC Studio.command` 也行）。先只开 RC Studio :8090；驾驶服务器 :8080/:8443 在 Studio 里开关（`server.js` 的 `startDrive/stopDrive`），`rcstudio --drive` 一起开。
- 根目录：`server.js`（Node，ws :8080 / https :8443）、`ui.html`（驾驶端）、`rc_car.ino`（ESP32 固件）、`flash.sh`/`reflash.sh`/`start.sh`/`logs.sh`、`wiring.html`、`pit_display/`。
- `HANDOFF.md`：历史交接；`PLATFORM_DESIGN.md`：RC Studio 平台设计（Phase 0–6），按它做。
- `admin.js`：RC Studio 后端（127.0.0.1:8090，WS `/admin` + `/api/*`）。`lib/`：jobs、ports、builds、firmware、projects、secrets。`targets.json`：板子型号（fqbn、芯片）。
- `studio/`：RC Studio 网页（Vite+React+TS）。改了 `studio/src` 要 `npm run studio:build`，`studio/dist` 提交进 repo（Mac 上不用装 vite）。
- `projects/<id>/project.json`：零件 3D 位置是唯一真相，导线是真相（网络算出来）。`library/<part>/part.json` 由 `tools/gen_library.py` 生成，尺寸 `verified:false` = 还没量实物。
- `tools/rc.js`：命令行版（build/flash/prov/setup），flash.sh/reflash.sh 调它。`builds/`：编译版本（git-ignored）。`firmware/pins/<型号>.h`：接线图生成的脚位。
- 计划中：`plugins/`（Bambu 打印机、ELRS、G29 方向盘）。
- `private/t/` tracker · `supabase/` schema · `docs/` 登录壳 · `tools/` tracker 工具。
