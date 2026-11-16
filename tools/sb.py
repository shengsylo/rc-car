#!/usr/bin/env python3
"""Supabase access for the local tools. Reads .env from the repo root and never prints key values.

  python3 tools/sb.py check     are the tables there, how many rows, is the public key locked out

Used as a module by tracker.py and status.py:
  upsert_tasks(rows)            rows = [{"id", "slug", "data", "updated_at"}]
  delete_tasks_not_in(ids)      drop DB rows whose tracker folder no longer exists
  upsert_status(obj)            obj = {"jobs": [...]}

Writes use SUPABASE_SECRET_KEY (bypasses row level security). That key lives only in .env.
Standard library only.
"""
import datetime as dt
import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ENV = ROOT / ".env"
TABLES = ["owners", "tasks", "status"]
MISSING = "Supabase tables are missing: run supabase/schema.sql in the SQL editor"
TIMEOUT = 20


class SbError(Exception):
    """Message is safe to print: it never contains a key or the request headers."""


def load_env():
    if not ENV.exists():
        raise SbError(".env not found in the repo root (needs SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_SECRET_KEY)")
    env = {}
    for line in ENV.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        env[k.strip().removeprefix("export ").strip()] = v.strip().strip("'\"")
    return env


def need(env, name):
    if not env.get(name):
        raise SbError(f".env has no {name}")
    return env[name]


def public_config():
    """URL + publishable key for the browser. Refuses anything that looks like a secret key."""
    env = load_env()
    url, key = need(env, "SUPABASE_URL").rstrip("/"), need(env, "SUPABASE_PUBLISHABLE_KEY")
    if key == env.get("SUPABASE_SECRET_KEY") or key.startswith("sb_" + "secret_") or "service_role" in key:
        raise SbError("SUPABASE_PUBLISHABLE_KEY looks like a secret key; refusing to write it to the site")
    return {"url": url, "key": key}


def request(method, path, body=None, prefer=None, secret=True):
    """Call PostgREST. Returns (status, headers, parsed body or None). Raises SbError with a key-free message."""
    env = load_env()
    key = need(env, "SUPABASE_SECRET_KEY" if secret else "SUPABASE_PUBLISHABLE_KEY")
    headers = {"apikey": key, "Authorization": f"Bearer {key}", "Accept": "application/json",
               "User-Agent": "rc-car-tools"}
    data = None
    if body is not None:
        data = json.dumps(body, ensure_ascii=False).encode("utf-8")
        headers["Content-Type"] = "application/json"
    if prefer:
        headers["Prefer"] = prefer
    req = urllib.request.Request(need(env, "SUPABASE_URL").rstrip("/") + "/rest/v1/" + path,
                                 data=data, method=method, headers=headers)
    table = path.split("?")[0]
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
            raw = r.read()
            return r.status, r.headers, (json.loads(raw) if raw else None)
    except urllib.error.HTTPError as e:
        try:
            err = json.loads(e.read() or b"{}")
        except ValueError:
            err = {}
        code, msg = str(err.get("code", "")), str(err.get("message", ""))[:200]
        if code in ("PGRST205", "42P01") or (e.code == 404 and "schema cache" in msg):
            raise SbError(MISSING) from None
        raise SbError(f"{method} {table}: HTTP {e.code} {code} {msg}".strip()) from None
    except (urllib.error.URLError, TimeoutError, OSError) as e:
        reason = getattr(e, "reason", e)
        raise SbError(f"{method} {table}: Supabase unreachable ({type(reason).__name__})") from None


def now():
    return dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")


def upsert_tasks(rows):
    """Insert or replace trackers by id. Each row: id, slug, data, and optionally updated_at."""
    if not rows:
        return 0
    rows = [{"id": r["id"], "slug": r["slug"], "data": r["data"], "updated_at": r.get("updated_at") or now()}
            for r in rows]
    request("POST", "tasks?on_conflict=id", rows, prefer="resolution=merge-duplicates,return=minimal")
    return len(rows)


def delete_tasks_not_in(ids):
    """Delete DB trackers that no longer exist locally. An empty list is refused (it would wipe the table)."""
    ids = [str(i) for i in ids]
    if not ids:
        raise SbError("delete_tasks_not_in: empty id list, refusing to delete every tracker")
    if any(not i.isalnum() for i in ids):
        raise SbError("delete_tasks_not_in: tracker ids must be alphanumeric")
    _, _, gone = request("DELETE", "tasks?id=" + urllib.parse.quote(f"not.in.({','.join(ids)})", safe="().,"),
                         prefer="return=representation")
    return len(gone or [])


def upsert_status(obj):
    """Replace the single status row and stamp it with the current time."""
    request("POST", "status?on_conflict=id", [{"id": 1, "data": obj, "updated_at": now()}],
            prefer="resolution=merge-duplicates,return=minimal")


def count(table, secret=True):
    _, headers, _ = request("GET", f"{table}?select=*&limit=1", prefer="count=exact", secret=secret)
    total = (headers.get("Content-Range") or "").rpartition("/")[2]
    return int(total) if total.isdigit() else None


def check():
    """Read-only report. Returns 0 when every table exists and the publishable key alone reads nothing."""
    bad = 0
    for t in TABLES:
        try:
            print(f"{t}: ok, {count(t)} rows")
        except SbError as e:
            bad += 1
            print(f"{t}: {e}")
    if bad:
        return 1
    # The same request the website can make before anyone signs in. It must get nothing.
    for t in TABLES:
        try:
            n = count(t, secret=False)
            if n:
                bad += 1
                print(f"LEAK: {t} shows {n} rows to the publishable key without login - re-run supabase/schema.sql")
            else:
                print(f"{t}: publishable key without login sees 0 rows, but was not refused outright - re-run supabase/schema.sql")
        except SbError as e:
            if "HTTP 401" in str(e) or "HTTP 403" in str(e):
                print(f"{t}: publishable key without login is refused (good)")
            else:
                bad += 1
                print(f"{t}: public-key probe failed: {e}")
    return 1 if bad else 0


def add_owner():
    """Interactive, run by the owner in a terminal: create the login user and list it in owners.
    The email and password are typed here and sent straight to Supabase; nothing is printed or saved."""
    import getpass
    if not sys.stdin.isatty():
        raise SbError("add-owner must be run by hand in a terminal")
    if count("owners"):
        raise SbError("an owner already exists; remove it in the Supabase dashboard first if you want to replace it")
    email = input("邮箱（登录用）: ").strip()
    if "@" not in email:
        raise SbError("需要一个邮箱地址")
    pw = getpass.getpass("密码（至少 10 位，输入时不显示）: ")
    if len(pw) < 10:
        raise SbError("密码太短：至少 10 位")
    if pw != getpass.getpass("再输入一次密码: "):
        raise SbError("两次密码不一样")
    env = load_env()
    key = need(env, "SUPABASE_SECRET_KEY")
    req = urllib.request.Request(
        need(env, "SUPABASE_URL").rstrip("/") + "/auth/v1/admin/users", method="POST",
        data=json.dumps({"email": email, "password": pw, "email_confirm": True}).encode("utf-8"),
        headers={"apikey": key, "Authorization": f"Bearer {key}", "Content-Type": "application/json",
                 "User-Agent": "rc-car-tools"})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
            uid = json.loads(r.read())["id"]
    except urllib.error.HTTPError as e:
        try:
            err = json.loads(e.read() or b"{}")
        except ValueError:
            err = {}
        raise SbError(f"建账号失败: HTTP {e.code} {str(err.get('msg') or err.get('message') or '')[:120]}") from None
    except (urllib.error.URLError, TimeoutError, OSError) as e:
        raise SbError(f"建账号失败: Supabase 连不上 ({type(getattr(e, 'reason', e)).__name__})") from None
    request("POST", "owners", [{"user_id": uid}], prefer="return=minimal")
    print("完成：账号已建好并设为 owner。现在可以在网站登录。")
    return 0


def main(argv):
    if len(argv) > 1 and argv[1] == "add-owner":
        try:
            return add_owner()
        except SbError as e:
            print(e)
            return 1
    if len(argv) > 1 and argv[1] == "check":
        try:
            return check()
        except SbError as e:
            print(e)
            return 1
    print(__doc__)
    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
