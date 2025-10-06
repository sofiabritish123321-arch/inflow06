-- create users table if not exists
create table if not exists public.users (
  id text primary key,
  email text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- enable RLS
alter table public.users enable row level security;

-- simple policy to allow users to upsert their own row
create policy "users_upsert_own"
  on public.users
  for insert
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "users_update_own"
  on public.users
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- allow users to read their own data
create policy "users_read_own"
  on public.users
  for select
  using (auth.uid() = id);