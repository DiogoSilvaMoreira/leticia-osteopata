=====================================================================
 SITE — DRA. LETÍCIA ROCHA
=====================================================================

ARQUIVOS
  index.html          -> o site
  admin.html          -> painel da Letícia (login por e-mail e senha)
  config.js           -> onde você cola as 2 chaves do Supabase
  supabase-setup.sql  -> script que cria o banco (rodar 1 vez)
  assets/             -> logo, fotos e vídeo

---------------------------------------------------------------------
 COMO DEIXAR O PAINEL FUNCIONANDO (você faz uma vez, ~5 min)
---------------------------------------------------------------------

1) CRIAR O PROJETO
   - Entre em supabase.com -> New project (plano grátis serve).
   - Dê um nome (ex: leticia-rocha) e uma senha de banco.

2) CRIAR O BANCO
   - No projeto: menu "SQL Editor" -> "New query".
   - Cole TODO o conteúdo de supabase-setup.sql e clique em "Run".

3) CRIAR O LOGIN DA LETÍCIA
   - Menu "Authentication" -> "Users" -> "Add user" -> "Create new user".
   - Informe o e-mail e a senha dela e marque "Auto Confirm User".
   - É com esse e-mail/senha que ela vai entrar no painel.

4) PEGAR AS 2 CHAVES
   - Menu "Project Settings" -> "API".
   - Copie "Project URL" e a chave "anon public".

5) COLAR NO SITE
   - Abra config.js e substitua os dois valores:
       window.SUPABASE_URL      = '...sua Project URL...';
       window.SUPABASE_ANON_KEY = '...sua anon public...';
   - Salve, faça commit e push. Pronto.

---------------------------------------------------------------------
 COMO A LETÍCIA USA
---------------------------------------------------------------------
   - Acessa   seusite.com.br/admin.html
   - Entra com o e-mail e a senha que você criou.
   - Edita WhatsApp, endereço, horários, Instagram etc.
   - Clica em "Salvar alterações". O site atualiza na hora.

OBS: a "anon public" é uma chave pública (pode ficar no código).
     NUNCA use a chave "service_role" no config.js.
     Quem não estiver logado só consegue LER; alterar, só a Letícia.
=====================================================================

=====================================================================
 MANTER O SUPABASE SEMPRE ATIVO (evita a pausa por inatividade)
=====================================================================
O plano grátis do Supabase pausa o projeto após ~7 dias sem uso.
Para evitar isso, o projeto já inclui um robô que "cutuca" o banco
a cada 3 dias, automaticamente, pelo GitHub Actions.

Para ligar (uma vez):
  1) No GitHub, abra o repositório do site.
  2) Settings -> Secrets and variables -> Actions -> New repository secret.
  3) Crie DOIS secrets, com os MESMOS valores do config.js:
        Nome: SUPABASE_URL        Valor: sua Project URL
        Nome: SUPABASE_ANON_KEY   Valor: sua anon public
  4) Pronto. Na aba "Actions" você pode abrir "Manter Supabase ativo"
     e clicar em "Run workflow" para testar na hora.

Não precisa mexer em mais nada — ele roda sozinho a cada 3 dias.
=====================================================================
