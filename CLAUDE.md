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
- **Supabase 要用独立的新 project**（不要和 xau-lab 共用：`tasks.id` 是 T001… 会撞）。Keys 放 `.env`（git-ignored）：`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`。secret key 只给 `tools/sb.py` 读，绝不能出现在 `docs/`、日志、tracker 或任何 tracked 文件。`python3 tools/sb.py check` 检查。
- 文字字段只用 `` `code` ``、`**bold**` 和换行。tracker 用中文写，短、带数字。

## 安全

- WiFi 密码在 `.wifi`（git-ignored），脚本输出打码，不在聊天里显示。不提交 `.env`、`.wifi`、`certs/`、`firmware/*.bin`（bin 里目前有 WiFi 密码，见 PLATFORM_DESIGN.md 第 0 节）。
- Shopee/淘宝：owner 自己登录、结账、付款；Claude 不输入密码、不解验证码、不结账。改购物车一件一件来，每件确认。

## 布局

- 根目录：`server.js`（Node，ws :8080 / https :8443）、`ui.html`（驾驶端）、`rc_car.ino`（ESP32 固件）、`flash.sh`/`reflash.sh`/`start.sh`/`logs.sh`、`wiring.html`、`pit_display/`。
- `HANDOFF.md`：历史交接；`PLATFORM_DESIGN.md`：RC Studio 平台设计（Phase 0–6），按它做。
- 计划中：`studio/`（Vite+TS+React 工作台，127.0.0.1）、`projects/<id>/project.json`、`library/<part>/`、`plugins/`。
- `private/t/` tracker · `supabase/` schema · `docs/` 登录壳 · `tools/` tracker 工具。
