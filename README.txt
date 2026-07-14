SITE — DRA. LETÍCIA ROCHA (Osteopatia Adulto e Pediátrica)
==========================================================

ESTRUTURA
  index.html        -> site inteiro (HTML + CSS + JS em arquivo único)
  assets/           -> logo, símbolo e fotos já otimizadas para web

O QUE PRECISA SER PREENCHIDO
  Abra o index.html e vá até o bloco "CONFIGURAÇÃO" no final do arquivo (dentro do <script>):

    whatsapp: '5511999999999'   -> trocar pelo número real (DDI + DDD, só números)
    videoDepoimento: ''         -> colar o link do vídeo da paciente quando tiver

  O campo videoDepoimento aceita:
    - arquivo local:  'assets/depoimento.mp4'
    - YouTube:        'https://youtu.be/XXXXXXXXXXX'  (funciona com Shorts também)
    - Vimeo:          'https://vimeo.com/123456789'
  Enquanto estiver vazio, o site mostra um espaço reservado elegante no lugar do vídeo.

  No HTML, na seção de contato, trocar também:
    [ENDEREÇO DO CONSULTÓRIO]     (id="endereco")
    [SEG A SEX — 08H ÀS 18H]      (id="horario")

PUBLICAÇÃO (Vercel)
  Basta arrastar a pasta inteira no vercel.com/new (projeto estático, sem build).

IDENTIDADE
  Cores: #CC2F89 (primária) • #FF8A98 (secundária) • #FCEFEC (apoio)
  Tipografia: Baloo 2 (títulos, substituindo a Tommy) + Nunito Sans (texto)
