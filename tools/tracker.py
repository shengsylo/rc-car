#!/usr/bin/env python3
"""Tracker tool. One folder per task under private/t/ (git-ignored), one task.json each.
The public site in docs/ is an empty shell: tracker content is pushed to a private Supabase
database and the browser fetches it only after login. Nothing with content is written to docs/.

  python3 tools/tracker.py new "Title here"     create private/t/T00N-slug/task.json
  python3 tools/tracker.py build                copy the page shells to docs/, write docs/config.js,
                                                push every tracker to Supabase
  python3 tools/tracker.py hook-post            (Claude Code PostToolUse hook, reads JSON on stdin)
  python3 tools/tracker.py hook-stop            (Claude Code Stop hook)

Standard library only.
"""
import datetime as dt
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import sb  # noqa: E402  (tools/sb.py)

ROOT = Path(__file__).resolve().parent.parent
TASKS = ROOT / "private" / "t"  # git-ignored: tracker content never enters the public repo
DOCS = ROOT / "docs"
TOOLS = ROOT / "tools"
WORK_DIRS = ["tools", "firmware", "pit_display", "studio", "projects", "library"]  # edits here must be reflected in a tracker
STATUSES = {"open": "待开始", "active": "进行中", "blocked": "卡住", "done": "完成", "killed": "已否决"}
STEP_STATES = {"todo", "active", "done", "blocked"}

SKELETON = {
    "id": "", "title": "", "status": "open", "created": "", "summary": "",
    "problem": "", "idea": "",
    "proof": [],      # {"claim": "", "evidence": "", "verdict": "pass|fail|pending"}
    "solution": "",
    "path": [],       # {"step": "", "status": "todo|active|done|blocked"}
    "issues": [],     # {"text": "", "severity": "high|med|low", "open": true}
    "data": [],       # {"k": "", "v": "", "note": ""}
    "files": [],      # repo-relative paths
    "log": [],        # {"at": "YYYY-MM-DD", "text": ""}
}


def load_tasks():
    tasks = []
    for f in sorted(TASKS.glob("*/task.json")):
        try:
            t = json.loads(f.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            raise SystemExit(f"tracker: invalid JSON in {f.relative_to(ROOT)}: {e}")
        if not isinstance(t, dict):
            raise SystemExit(f"tracker: {f.relative_to(ROOT)} must be a JSON object")
        t = {**SKELETON, **t}
        if t["status"] not in STATUSES:
            raise SystemExit(f"tracker: {f.relative_to(ROOT)} status must be one of {sorted(STATUSES)}")
        t["_dir"] = f.parent
        t["_mtime"] = f.stat().st_mtime
        tasks.append(t)
    return tasks


def write_if_changed(path, text):
    if not path.exists() or path.read_text(encoding="utf-8") != text:
        path.write_text(text, encoding="utf-8")
        return 1
    return 0


def rows(tasks):
    """DB rows: data is the task.json object (skeleton defaults filled in), updated_at is the file's mtime."""
    return [{
        "id": t["id"], "slug": t["_dir"].name,
        "data": {k: v for k, v in t.items() if not k.startswith("_")},
        "updated_at": dt.datetime.fromtimestamp(t["_mtime"], dt.timezone.utc).isoformat(timespec="seconds"),
    } for t in tasks]


def build():
    """Copy the two page shells into docs/, write docs/config.js, push every tracker to Supabase.
    Returns (trackers, site files written, push result text, push ok). Tracker content never enters docs/."""
    tasks = load_tasks()
    ids = [t["id"] for t in tasks]
    if any(not i for i in ids) or len(set(ids)) != len(ids):
        raise SystemExit("tracker: every task.json needs a unique non-empty id")
    DOCS.mkdir(exist_ok=True)
    n = 0
    for src, dst in (("index.template.html", "index.html"), ("task.template.html", "task.html")):
        n += write_if_changed(DOCS / dst, (TOOLS / src).read_text(encoding="utf-8"))
    try:
        cfg = sb.public_config()  # URL + publishable key only; the secret key never leaves .env
        n += write_if_changed(DOCS / "config.js", "window.XAU_CONFIG = " + json.dumps(cfg) + ";\n")
        pushed = sb.upsert_tasks(rows(tasks))
        removed = sb.delete_tasks_not_in(ids) if ids else 0
        return len(tasks), n, f"pushed {pushed} to Supabase" + (f", removed {removed} stale" if removed else ""), True
    except sb.SbError as e:
        return len(tasks), n, f"NOT pushed to Supabase: {e}", False


def new(title):
    TASKS.mkdir(parents=True, exist_ok=True)
    nums = [int(m.group(1)) for d in TASKS.iterdir() if (m := re.match(r"T(\d+)", d.name))]
    tid = f"T{max(nums, default=0) + 1:03d}"
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")[:40] or "task"
    d = TASKS / f"{tid}-{slug}"
    d.mkdir()
    t = {**SKELETON, "id": tid, "title": title, "status": "active", "created": dt.date.today().isoformat()}
    (d / "task.json").write_text(json.dumps(t, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(d.relative_to(ROOT) / "task.json")
    print(build()[2])


def hook_post():
    """Rebuild + push when a private/t task.json or a template was just written. Exit 2 reports bad JSON back to the model."""
    try:
        p = json.load(sys.stdin).get("tool_input", {}).get("file_path", "")
    except Exception:
        return 0
    if not p:
        return 0
    p = Path(p).resolve()
    if p.name == "task.json" and TASKS in p.parents or p.suffix == ".html" and p.parent == TOOLS:
        try:
            *_, msg, ok = build()
        except SystemExit as e:
            print(e, file=sys.stderr)
            return 2
        if not ok:
            print(f"tracker warning: {msg}")  # a DB outage must not block the edit; the next build retries
    return 0


def hook_stop():
    """Block the end of a turn when work files are newer than every tracker."""
    try:
        if json.load(sys.stdin).get("stop_hook_active"):
            return 0
    except Exception:
        pass
    work = [f for d in WORK_DIRS for f in (ROOT / d).rglob("*")
            if f.is_file() and "__pycache__" not in f.parts and f.suffix not in (".pyc", ".log") and f.name != ".DS_Store" and not f.name.endswith(".state.json") and not {"progress", "workers", "runs"} & set(f.parts)]  # logs are written by background jobs, not by a turn's work
    trackers = list(TASKS.glob("*/task.json"))
    if not work:
        return 0
    newest = max(work, key=lambda f: f.stat().st_mtime)
    last_tracker = max((f.stat().st_mtime for f in trackers), default=0)
    if newest.stat().st_mtime > last_tracker + 5:
        print(f"Tracker out of date: {newest.relative_to(ROOT)} changed after the last tracker update. "
              f"Update the matching private/t/<task>/task.json (path, proof, issues, data, log), "
              f"or run `python3 tools/tracker.py new \"<title>\"` for new work. It is pushed to Supabase automatically.",
              file=sys.stderr)
        return 2
    return 0


def main(argv):
    cmd = argv[1] if len(argv) > 1 else ""
    if cmd == "new" and len(argv) > 2:
        new(" ".join(argv[2:]))
    elif cmd == "build":
        tasks, changed, msg, ok = build()
        print(f"{tasks} trackers, {changed} site files written, {msg}")
        return 0 if ok else 1
    elif cmd == "hook-post":
        return hook_post()
    elif cmd == "hook-stop":
        return hook_stop()
    else:
        print(__doc__)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
