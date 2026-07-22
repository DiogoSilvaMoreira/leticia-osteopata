create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  resumo text,
  conteudo text not null,
  capa text,
  publicado boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);
alter table public.posts enable row level security;
drop policy if exists "ler publicados" on public.posts;
create policy "ler publicados" on public.posts for select to anon using (publicado = true);
drop policy if exists "ler tudo autenticado" on public.posts;
create policy "ler tudo autenticado" on public.posts for select to authenticated using (true);
drop policy if exists "criar" on public.posts;
create policy "criar" on public.posts for insert to authenticated with check (true);
drop policy if exists "editar" on public.posts;
create policy "editar" on public.posts for update to authenticated using (true) with check (true);
drop policy if exists "apagar" on public.posts;
create policy "apagar" on public.posts for delete to authenticated using (true);
