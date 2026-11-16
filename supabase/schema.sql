-- rc-car private content store (same schema as xau-lab; use a SEPARATE Supabase project).
-- Run this whole file once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- It is safe to run again: no data is dropped, and every policy on the three tables is removed and
-- rebuilt, so a stray policy added by hand or by a dashboard template does not survive a re-run.
-- The last statement prints a check table: read it every time (expected values are in section 5).
--
-- Access model
--   * The public website only ever holds the PUBLISHABLE key. On its own that key maps to the
--     "anon" role, which gets no privileges and no policies here, so it can read nothing.
--   * After email + password sign-in the browser acts as the "authenticated" role. That is still
--     not enough: a row is visible only when the signed-in user's id is listed in public.owners.
--     So a stranger who manages to register sees zero rows. Sign-up is still to be turned off
--     (section 6) so that the user list holds nobody but you.
--   * Nobody can write through the website. There are no insert/update/delete policies and no
--     write privileges for anon/authenticated. Writes come only from the local Python tools using
--     the SECRET key (role "service_role"), which bypasses row level security by design.
--     Whoever holds the secret key holds everything: it stays in .env and nowhere else.

-- 1. Tables -----------------------------------------------------------------------------------

-- Who may read. One row per allowed login user.
create table if not exists public.owners (
  user_id uuid primary key references auth.users (id) on delete cascade
);

-- One row per tracker. data = the whole task.json object.
create table if not exists public.tasks (
  id         text primary key,
  slug       text not null,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

-- Single row (id = 1). data = {"jobs":[...]} from tools/status.py; updated_at is the freshness stamp.
create table if not exists public.status (
  id         int primary key check (id = 1),
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2. Row level security -----------------------------------------------------------------------
-- "enable" turns RLS on for normal roles; "force" also applies it to the table owner, so the only
-- way around the policies is a role with the BYPASSRLS attribute (service_role = the secret key).

alter table public.owners enable row level security;
alter table public.tasks  enable row level security;
alter table public.status enable row level security;
alter table public.owners force row level security;
alter table public.tasks  force row level security;
alter table public.status force row level security;

-- 3. Privileges -------------------------------------------------------------------------------
-- Supabase grants ALL on new public tables to anon and authenticated by default. Take it all back,
-- then give back only what is needed. Privileges are checked before policies, so anon is refused
-- outright (permission denied) instead of merely getting an empty result.

revoke all on table public.owners, public.tasks, public.status from public, anon, authenticated;
grant select on table public.owners, public.tasks, public.status to authenticated;
grant all    on table public.owners, public.tasks, public.status to service_role;

-- 4. Policies ---------------------------------------------------------------------------------
-- Only SELECT policies, only for the "authenticated" role. No policy exists for anon and none for
-- insert/update/delete, and RLS denies whatever has no policy.
-- (select auth.uid()) is wrapped in a sub-select so Postgres evaluates it once per query.

-- Permissive policies are OR-ed together, so one leftover "read access for all users" policy would
-- undo everything below. Start from zero: drop EVERY policy on the three tables, whatever its name.
do $$
declare p record;
begin
  for p in
    select policyname, tablename from pg_policies
    where schemaname = 'public' and tablename in ('owners', 'tasks', 'status')
  loop
    execute format('drop policy %I on public.%I', p.policyname, p.tablename);
  end loop;
end $$;

-- A signed-in user can see only their own row in owners (enough to answer "am I an owner?").
-- This policy references no other table, so the policies below can query owners without recursion.
create policy owners_select_self on public.owners
  for select to authenticated
  using (user_id = (select auth.uid()));

-- Trackers: readable only by a signed-in user who is listed in owners.
create policy tasks_select_owner on public.tasks
  for select to authenticated
  using (exists (select 1 from public.owners o where o.user_id = (select auth.uid())));

-- Live job status: same rule.
create policy status_select_owner on public.status
  for select to authenticated
  using (exists (select 1 from public.owners o where o.user_id = (select auth.uid())));

-- Ask the API layer to pick up the new tables straight away.
notify pgrst, 'reload schema';

-- 5. Check (this is the result the SQL editor shows after Run) ---------------------------------
-- Expect on each of the three rows:
--   anon_any = false, auth_write = false, auth_select = true, policies = 1, rls = true, cols as below
--   owners: user_id:uuid    tasks: id:text,slug:text,data:jsonb,updated_at:timestamptz
--   status: id:int4,data:jsonb,updated_at:timestamptz
-- Anything else means a table of that name already existed with another shape or another owner
-- ("create table if not exists" keeps it, and a revoke cannot remove another role's grants).
-- Do not load data then: drop that table in the dashboard and run this file again.
select
  t as "table",
  has_table_privilege('anon', 'public.' || t, 'select,insert,update,delete,truncate,references,trigger') as anon_any,
  has_table_privilege('authenticated', 'public.' || t, 'insert,update,delete,truncate,references,trigger') as auth_write,
  has_table_privilege('authenticated', 'public.' || t, 'select') as auth_select,
  (select count(*) from pg_policies where schemaname = 'public' and tablename = t) as policies,
  (select relrowsecurity and relforcerowsecurity from pg_class where oid = ('public.' || t)::regclass) as rls,
  (select string_agg(a.attname || ':' || ty.typname, ',' order by a.attnum)
     from pg_attribute a join pg_type ty on ty.oid = a.atttypid
    where a.attrelid = ('public.' || t)::regclass and a.attnum > 0 and not a.attisdropped) as cols
from unnest(array['owners', 'tasks', 'status']) as t;

-- 6. Making yourself the owner (dashboard steps, in THIS order) --------------------------------
-- Nothing in this file adds anyone to owners, on purpose: a statement that guesses "the one user"
-- can promote a stranger who registered first. The owner row is added by hand, by user id.
--
--   a. Authentication -> Sign In / Providers: turn OFF "Allow new users to sign up" and turn OFF
--      anonymous sign-ins. Do this first, before any user exists.
--   b. Authentication -> Users: the list must be empty. Delete every user you did not create.
--      If "Add user" later says the email is already registered, somebody else took it:
--      delete that user and create yours again. Never promote a user you did not just create.
--   c. Authentication -> Users -> Add user: create your own login (email + password, auto-confirm).
--   d. Copy that user's UID from the Users list, then run this in the SQL editor ONLY
--      (do not save the UID into this file or anywhere in the repo):
--        insert into public.owners (user_id) values ('PASTE-THE-UID-HERE') on conflict do nothing;
--   e. Verify. Expect exactly one row, and it is your email:
--        select u.email, u.created_at from public.owners o join auth.users u on u.id = o.user_id;
--      Any other row: delete from public.owners where user_id = '<that uid>';
