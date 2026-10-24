=====================================================================
 SITE: DRA. LETÍCIA ROCHA, OSTEOPATA
 https://www.osteopataleticiarocha.com.br
=====================================================================
Site 100% estático (HTML, CSS e JavaScript puros) publicado na Vercel.
Todo o conteúdo é editado direto nos arquivos.

---------------------------------------------------------------------
 ESTRUTURA
---------------------------------------------------------------------
  index.html            Início (hero, frase de destaque, agendamento)
  bebes.html            Bebês e recém-nascidos
  atendimentos.html     Atendimentos + como é a consulta
  sobre.html            Sobre, trajetória e fotos do consultório
  depoimentos.html      Vídeo, avaliações do Google e WhatsApp real
  duvidas.html          Perguntas frequentes
  contato.html          WhatsApp, endereço, mapa e horários
  blog.html             Lista de artigos do blog
  blog/                 Uma página por artigo + _modelo-post.html
  post.html             Só redireciona links antigos do blog
  sitemap.xml           Lista de páginas para o Google
  robots.txt            Regras para buscadores (aponta o sitemap)
  favicon.ico           Ícone do navegador
  vercel.json           Endereços sem ".html", cache e redirecionamentos
  .vercelignore         Arquivos que não vão para o site publicado

  assets/css/site.css   Estilos de todas as páginas
  assets/js/site.js     Dados de contato (objeto SITE), menu, animações
                        O menu lateral do celular é montado a partir do
                        menu do header (.nav): mude as abas só no .nav
  assets/js/wizard.js   Agendamento passo a passo do Início
  assets/js/depoimentos.js  Carrossel de avaliações
  assets/img/           Fotos otimizadas (geradas por npm run imagens)
  assets/originais/     Fotos originais (fonte das versões otimizadas)
  assets/leticia-retrato.jpg   Foto de perfil original
  assets/og-image.jpg   Imagem de compartilhamento (WhatsApp, redes)
  assets/fonts/         Fontes do site
  assets/blog/          Capas dos artigos do blog
  scripts/imagens.mjs   Gera as fotos otimizadas, ícones e og-image

---------------------------------------------------------------------
 TESTAR NO COMPUTADOR
---------------------------------------------------------------------
Os links internos usam ".html" (ex: sobre.html). Assim o site funciona
igual no Live Server do VS Code, no "npx serve ." e abrindo o arquivo
direto. Na Vercel o endereço aparece limpo (/sobre).

---------------------------------------------------------------------
 ONDE EDITAR O CONTATO (WhatsApp, telefone, endereço, horários...)
---------------------------------------------------------------------
Abra assets/js/site.js. No topo está o objeto SITE:

  whatsapp   55 + DDD + número, só dígitos (ex: 5521999839880)
  telefone   como aparece escrito (ex: (21) 99983-9880)
  mensagem   texto que já vem pronto no WhatsApp
  endereco   endereço (use <br> para quebrar a linha)
  mapsUrl    link que abre o endereço no Google Maps
  mapaEmbed  mapa incorporado na página Contato
  horarios   horário de atendimento
  instagram  só o nome de usuário, sem @
  crefito    registro profissional

Todos os botões de WhatsApp, o agendamento, os links de telefone,
Instagram e mapa e os textos de contato das páginas usam esses valores.

Para a busca do Google (que não depende do JavaScript), troque também
o valor antigo escrito no HTML das páginas (buscar e substituir em
todos os arquivos) e o "telephone"/"sameAs" do JSON-LD em index.html
e contato.html.

---------------------------------------------------------------------
 COMO TROCAR FOTOS (npm run imagens)
---------------------------------------------------------------------
Na primeira vez, instale as ferramentas:   npm install

Foto de perfil:
  1. Substitua assets/leticia-retrato.jpg pela foto nova, com o MESMO
     nome (de preferência vertical, 800x1100 ou maior).
  2. Rode:   npm run imagens
  3. Confira no navegador e publique.
  O comando gera as versões WebP e JPG (400 e 800 px) usadas no Início
  e nos artigos e também refaz assets/og-image.jpg com a foto nova.

Outras fotos (bebês, sobre, consultório, pôster do vídeo):
  substitua o arquivo com o mesmo nome em assets/originais/ e rode
  npm run imagens.

Vídeo do depoimento: substitua assets/depoimento-mae.mp4.

---------------------------------------------------------------------
 COMO ADICIONAR UM ARTIGO NO BLOG
---------------------------------------------------------------------
1. Copie blog/_modelo-post.html para blog/titulo-do-artigo.html
   (sem acento, minúsculo, palavras separadas por hífen).
2. No arquivo novo, troque tudo marcado com EDITE (título, resumo,
   data, texto, canonical e og:url com o endereço do artigo).
   Apague o comentário do topo e a linha <meta name="robots" ...>.
3. Capa (opcional): salve em assets/blog/titulo-do-artigo.jpg e tire o
   comentário do bloco "article-cover" no arquivo do artigo.
4. Em blog.html: copie o card de exemplo (está comentado dentro da
   lista) para o topo da lista e ajuste link, data, título e resumo.
   No primeiro artigo, apague também o bloco "Em breve novos artigos".
5. No index.html: a seção de artigos está desligada (comentada). Ligue
   seguindo a instrução que está no próprio arquivo e mantenha só os
   3 artigos mais recentes.
6. No sitemap.xml, acrescente uma linha <url> com o endereço do artigo
   (sem .html), como as outras.
7. Publique (veja abaixo).

---------------------------------------------------------------------
 COMO PUBLICAR
---------------------------------------------------------------------
  git add .
  git commit -m "descrição da alteração"
  git push

A Vercel publica sozinha em cerca de 1 minuto após o push.

---------------------------------------------------------------------
 REGRAS DE TEXTO
---------------------------------------------------------------------
- Usar sempre "Osteopata" (não usar "fisioterapeuta").
- Usar "consulta" (não "avaliação" ou "sessão"), exceto quando se
  referir às avaliações do Google.
- Não usar travessões nos textos.
- A pasta _backup/ guarda a cópia dos dados antigos e _relatorio/ os
  relatórios de análise. As duas ficam só no seu computador (estão no
  .gitignore) e não vão para o site.
=====================================================================
