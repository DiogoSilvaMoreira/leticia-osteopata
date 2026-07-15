-- =========================================================
-- BANCO DE DADOS DO SITE — Dra. Letícia Rocha
-- Cole tudo isto no Supabase → SQL Editor → New query → Run
-- =========================================================

-- 1) Tabela única que guarda os dados de contato do site
create table if not exists public.site_config (
  id integer primary key default 1,
  dados jsonb not null default '{}'::jsonb,
  atualizado_em timestamptz not null default now(),
  constraint apenas_uma_linha check (id = 1)
);

-- 2) Linha inicial com os valores atuais do site
insert into public.site_config (id, dados)
values (1, jsonb_build_object(
  'whatsapp', '5511917879980',
  'telefoneExibicao', '(11) 91787-9980',
  'mensagem', 'Olá, Dra. Letícia! Vi seu site e gostaria de agendar uma avaliação.',
  'endereco', 'Rua Miguel de Frias, 150 / sala 1309' || chr(10) || 'Icaraí — Niterói, RJ',
  'mapsUrl', 'https://www.google.com/maps/search/?api=1&query=Rua+Miguel+de+Frias,+150,+Icara%C3%AD,+Niter%C3%B3i,+RJ',
  'horarios', 'Das 9h às 19h, com hora marcada',
  'instagram', 'leticia_rocha_osteo',
  'crefito', 'Crefito2/25112F'
))
on conflict (id) do nothing;

-- 3) Segurança (RLS): qualquer visitante pode LER; só quem está
--    logado (a Letícia) pode ALTERAR.
alter table public.site_config enable row level security;

drop policy if exists "leitura publica" on public.site_config;
create policy "leitura publica"
  on public.site_config for select
  to anon, authenticated
  using (true);

drop policy if exists "edicao autenticada" on public.site_config;
create policy "edicao autenticada"
  on public.site_config for update
  to authenticated
  using (true)
  with check (true);

-- =========================================================
-- Depois de rodar isto:
--   Authentication → Users → Add user → crie o e-mail e senha
--   da Letícia (marque "Auto Confirm User").
-- =========================================================
