#!/bin/sh
# 发布公开网站（GitHub Pages）。两个 repo，跟 xau-lab 一样：
#   origin  shengsylo/rc-car        （私有）全部代码、tracker、工具
#   ROUTE   shengsylo/rc-car-route  （公开）只有：任务板登录壳 + RC Studio 网页演示版
# 公开的那个每次只推一个全新提交（没有历史），文件来自白名单（tools/build_site.js），私有内容进不去。
# 用法（在 Mac 上 rc-car 文件夹）：sh tools/publish.sh
set -e
cd "$(dirname "$0")/.."
OWNER="shengsylo"
ROUTE_NAME="rc-car-route"
ROUTE="https://github.com/$OWNER/$ROUTE_NAME.git"

command -v gh >/dev/null || { echo "要 GitHub CLI：brew install gh && gh auth login" >&2; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "先登录：gh auth login" >&2; exit 1; }

# 1. 私有 repo：没有就建（私有），然后推
if ! gh repo view "$OWNER/rc-car" >/dev/null 2>&1; then
  echo "▶ 建私有 repo $OWNER/rc-car"; gh repo create "$OWNER/rc-car" --private >/dev/null
fi
git push -q origin HEAD

# 2. 任务板配置（docs/config.js 只有 publishable key）
python3 tools/tracker.py build >/dev/null || true

# 3. 生成网站到临时文件夹
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
node tools/build_site.js "$tmp"

# 4. 检查：不能有 secret key / WiFi 密码 / 管理 token
SECRET="$(sed -n 's/^SUPABASE_SECRET_KEY=//p' .env 2>/dev/null)"
if grep -rqE "sb_secre[t]_[A-Za-z0-9_-]{12,}|eyJhbGciOi[A-Za-z0-9_-]{20,}" "$tmp" || { [ -n "$SECRET" ] && grep -rqF "$SECRET" "$tmp"; }; then
  echo "发布取消：网站文件里有像 secret key 的东西" >&2; exit 1
fi
if [ -f "$HOME/.rcstudio/secrets.json" ]; then
  for v in $(node -e "const s=require(process.env.HOME+'/.rcstudio/secrets.json');const o=[s.adminToken,s.otaPassword];for(const w of Object.values(s.wifi||{}))o.push(w.pass);console.log(o.filter(x=>x&&x.length>=6).join(' '))"); do
    if grep -rqF "$v" "$tmp"; then echo "发布取消：网站文件里有密码/token" >&2; exit 1; fi
  done
fi

# 5. 公开 repo：没有就建（公开），推一个全新提交，开 Pages
if ! gh repo view "$OWNER/$ROUTE_NAME" >/dev/null 2>&1; then
  echo "▶ 建公开 repo $OWNER/$ROUTE_NAME（只放网站）"; gh repo create "$OWNER/$ROUTE_NAME" --public -d "rc-car 网站（自动生成，别手改）" >/dev/null
fi
uid="$(gh api user -q '"\(.id)+\(.login)"')"
( cd "$tmp" && git init -q -b main && git add -A && git -c user.name="rc-car" -c user.email="$uid@users.noreply.github.com" commit -q -m "site" && git push -q -f "$ROUTE" main )
gh api "repos/$OWNER/$ROUTE_NAME/pages" >/dev/null 2>&1 || gh api -X POST "repos/$OWNER/$ROUTE_NAME/pages" -f "source[branch]=main" -f "source[path]=/" >/dev/null
echo "发布好了（第一次要等 1–2 分钟）："
echo "  任务板：     https://$OWNER.github.io/$ROUTE_NAME/"
echo "  RC Studio：  https://$OWNER.github.io/$ROUTE_NAME/studio/"
