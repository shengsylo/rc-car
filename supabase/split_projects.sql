-- 把 rc-car 和 xau-lab 在同一个 Supabase project 里分开（数据库层面，不只是网页过滤）。
-- 在 Supabase 后台：SQL Editor -> New query -> 整个贴进去 -> Run。可以重复跑。
--
-- 规则：
--   * owners 加一列 project：'xau' 或 'rc'。现有的账号（你的 xau 邮箱）自动是 'xau'。
--   * project = 'rc' 的账号只能读 id 以 RC 开头的 tasks；project = 'xau' 的账号只能读其他的（T001…）和 status（实时任务）。
--   * 所以 xau 网站登录看不到任何 RC 的东西，rc 网站登录也看不到任何 xau 的东西。
--   * tools/sb.py add-login（rc-car）建的账号会写 project = 'rc'。

alter table public.owners add column if not exists project text not null default 'xau';
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'owners_project_check') then
    alter table public.owners add constraint owners_project_check check (project in ('xau', 'rc'));
  end if;
end $$;
-- rc-car 的用户名登录（xxx@rc-car.local）归 rc
update public.owners o set project = 'rc' from auth.users u where u.id = o.user_id and u.email like '%@rc-car.local';

-- 重建全部策略（跟 schema.sql 一样：先全删，避免留下旧的「谁都能读」）
do $$
declare p record;
begin
  for p in select policyname, tablename from pg_policies where schemaname = 'public' and tablename in ('owners', 'tasks', 'status')
  loop execute format('drop policy %I on public.%I', p.policyname, p.tablename); end loop;
end $$;

create policy owners_select_self on public.owners
  for select to authenticated
  using (user_id = (select auth.uid()));

create policy tasks_select_owner on public.tasks
  for select to authenticated
  using (exists (
    select 1 from public.owners o
    where o.user_id = (select auth.uid())
      and ((o.project = 'rc' and tasks.id like 'RC%') or (o.project = 'xau' and tasks.id not like 'RC%'))
  ));

create policy status_select_owner on public.status
  for select to authenticated
  using (exists (select 1 from public.owners o where o.user_id = (select auth.uid()) and o.project = 'xau'));

notify pgrst, 'reload schema';

-- 检查：每个账号属于哪边（应该看到你的 xau 邮箱 = xau，lotion@rc-car.local = rc）
select u.email, o.project from public.owners o join auth.users u on u.id = o.user_id order by o.project, u.email;
