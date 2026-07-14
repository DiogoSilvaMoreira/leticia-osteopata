SITE — DRA. LETÍCIA ROCHA
=========================

ARQUIVOS
  index.html    -> o site (lê o conteúdo do content.json)
  content.json  -> todos os textos, fotos e depoimentos (editável pelo painel)
  admin.html    -> painel da Letícia
  assets/       -> logo, fotos e vídeo

COMO O PAINEL FUNCIONA
  Ela acessa  seusite.vercel.app/admin.html
  Cola a "chave de acesso" (um token do GitHub) — fica salva no navegador dela.
  Edita textos/fotos e clica em "Publicar no site".
  O painel grava direto no repositório via API do GitHub e o Vercel republica sozinho (~30s).

COMO GERAR A CHAVE (você faz isso UMA vez)
  1. github.com -> Settings -> Developer settings
  2. Personal access tokens -> Fine-grained tokens -> Generate new token
  3. Nome: "Painel Leticia" | Expiration: 1 ano (ou No expiration)
  4. Repository access: Only select repositories -> leticia-ostepata
  5. Permissions -> Repository permissions -> Contents: Read and write
  6. Generate token e copie o valor (github_pat_...) — só aparece uma vez
  7. Envie essa chave para a Letícia

  ATENÇÃO: essa chave dá acesso de escrita ao repositório. Use SEMPRE
  fine-grained, limitado a esse repositório e só com "Contents".

SE TROCAR O NOME DO REPOSITÓRIO
  Ajuste a constante REPO no topo do <script> do admin.html.
