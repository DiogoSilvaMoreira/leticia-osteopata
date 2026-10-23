/* =========================================================
   SITE: Dra. Letícia Rocha
   JavaScript compartilhado por todas as páginas:
   dados de contato (SITE), links de WhatsApp, menu,
   animações e lightbox da galeria.
   ========================================================= */

/* =========================================================
   DADOS DO SITE: edite aqui, em um só lugar.
   Os links de WhatsApp, telefone, Instagram e mapa de todas as
   páginas são gerados a partir deste objeto, e os textos marcados
   com data-site="..." no HTML são trocados por estes valores.
   ========================================================= */
const SITE = {
  // WhatsApp: 55 + DDD + número, só dígitos (usado no link wa.me e no tel:)
  whatsapp: '5521999839880',
  // como o telefone aparece escrito no site
  telefone: '(21) 99983-9880',
  // texto que já vem pronto quando o paciente abre o WhatsApp
  mensagem: 'Olá, Dra. Letícia! Vi seu site e gostaria de agendar uma consulta.',
  // endereço (use <br> para quebrar a linha)
  endereco: 'Rua Miguel de Frias, 150 / sala 1309<br>Icaraí, Niterói, RJ',
  // link que abre o endereço no Google Maps
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Miguel+de+Frias,+150,+Icara%C3%AD,+Niter%C3%B3i,+RJ',
  // mapa incorporado na página Contato
  mapaEmbed: 'https://www.google.com/maps?q=Rua+Miguel+de+Frias,+150,+Icara%C3%AD,+Niter%C3%B3i,+RJ&output=embed',
  // horário de atendimento
  horarios: 'Das 9h às 19h, com hora marcada!',
  // Instagram: só o nome de usuário, sem o @
  instagram: 'dra.leticia_rocha_osteo',
  // registro profissional
  crefito: 'Crefito2/25112F'
};

function escapeHtml(t) {
  return String(t == null ? '' : t)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ---------- endereços antigos (/#sobre, /#faq...) levam às novas páginas ---------- */
(function redirecionarAncorasAntigas() {
  if (document.body.dataset.page !== 'inicio') return;
  const MOVIDAS = {
    bebes: 'bebes.html', atendimentos: 'atendimentos.html', consulta: 'atendimentos.html#consulta', sobre: 'sobre.html',
    depoimentos: 'depoimentos.html', faq: 'duvidas.html', contato: 'contato.html', artigos: 'blog.html'
  };
  const k = decodeURIComponent(location.hash.slice(1));
  if (MOVIDAS[k] && !document.getElementById(k)) location.replace(MOVIDAS[k]);
})();

/* ---------- link do WhatsApp ---------- */
function waLink(mensagem) {
  return 'https://wa.me/' + String(SITE.whatsapp).replace(/\D/g, '') +
    '?text=' + encodeURIComponent(mensagem || SITE.mensagem);
}

/* ---------- ícones SVG (traço) usados nas opções do wizard ---------- */
const ICONES = {
  bebe: '<circle cx="12" cy="9" r="5"/><path d="M12 4c0-1.2.9-1.8 1.8-1.6"/><path d="M10 9h.01M14 9h.01"/><path d="M10.6 11.3c.8.6 2 .6 2.8 0"/><path d="M6.5 21c.6-3 2.8-5 5.5-5s4.9 2 5.5 5"/>',
  gestante: '<circle cx="10.5" cy="4.5" r="2.3"/><path d="M9 21v-5.5L7.8 12c-.5-1.6.3-3.4 1.9-3.9"/><path d="M10.5 8.2c3.6.1 6 2.4 6 5.2 0 2.3-1.8 3.6-4 3.6h-1.2V21"/>',
  adulto: '<circle cx="12" cy="4.5" r="2.3"/><path d="M4 9.5l8 1.5 8-1.5"/><path d="M12 11v4.5"/><path d="M12 15.5L9 21M12 15.5l3 5.5"/>',
  idoso: '<circle cx="10" cy="4.5" r="2.3"/><path d="M10 8v6.5L8 21"/><path d="M10 14.5l3 6.5"/><path d="M10 9.5l4.5 2.5"/><path d="M14.5 12v9"/>',
  crianca: '<circle cx="12" cy="5" r="2.5"/><path d="M12 8.5V15"/><path d="M7.5 11h9"/><path d="M12 15l-3 6M12 15l3 6"/>',
  conversa: '<path d="M21 12a8 8 0 0 1-11.8 7L4 20.5l1.5-4.9A8 8 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
  manha: '<path d="M3 19h18"/><path d="M6 15a6 6 0 0 1 12 0"/><path d="M12 4v3M4.9 8.6l2 1.6M19.1 8.6l-2 1.6"/>',
  tarde: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  agenda: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8.5 14.5l2 2 4-4"/>'
};
function svgIcone(nome) {
  return ICONES[nome] ? `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${ICONES[nome]}</svg>` : '';
}

/* ---------- aplica o objeto SITE nos links e textos de contato ---------- */
function aplicarSite() {
  const wa = waLink();
  const tel = 'tel:+' + String(SITE.whatsapp).replace(/\D/g, '');
  const insta = 'https://www.instagram.com/' + SITE.instagram;
  const textos = { telefone: SITE.telefone, endereco: SITE.endereco, horarios: SITE.horarios, crefito: SITE.crefito, instagram: '@' + SITE.instagram };
  document.querySelectorAll('[data-site]').forEach(el => {
    const v = textos[el.dataset.site];
    if (v != null && el.innerHTML !== v) el.innerHTML = v;
  });
  // .js-wpp com data-msg usa uma mensagem própria (ex: botão dos artigos do blog)
  document.querySelectorAll('.js-wpp').forEach(a => { a.href = a.dataset.msg ? waLink(a.dataset.msg) : wa; a.target = '_blank'; a.rel = 'noopener'; });
  document.querySelectorAll('.js-tel').forEach(a => { a.href = tel; });
  document.querySelectorAll('.js-maps').forEach(a => { a.href = SITE.mapsUrl; a.target = '_blank'; a.rel = 'noopener'; });
  document.querySelectorAll('.js-insta').forEach(a => { a.href = insta; a.target = '_blank'; a.rel = 'noopener'; });
}

/* ---------- mapa da página Contato: só carrega quando chega perto da tela ---------- */
function iniciarMapa() {
  document.querySelectorAll('.js-mapa').forEach(f => {
    f.dataset.src = SITE.mapaEmbed;
    const carregar = () => { if (f.getAttribute('src') !== f.dataset.src) f.src = f.dataset.src; };
    if (!('IntersectionObserver' in window)) return carregar();
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { carregar(); io.disconnect(); } }, { rootMargin: '300px 0px' });
    io.observe(f);
  });
}

/* =========================================================
   HEADER / MENU
   ========================================================= */
const hdr = document.getElementById('hdr');
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
// rolagem: lê scrollY uma vez por frame e só mexe na classe quando o estado muda
let hdrOn = null, scrollTick = false;
function atualizarHeader() {
  scrollTick = false;
  const on = scrollY > 20;
  if (on !== hdrOn && hdr) { hdrOn = on; hdr.classList.toggle('on', on); }
}
atualizarHeader();
addEventListener('scroll', () => {
  if (!scrollTick) { scrollTick = true; requestAnimationFrame(atualizarHeader); }
}, { passive: true });

function toggleMenu(open) {
  if (!drawer || !burger) return;
  const aberto = drawer.classList.contains('on');
  const o = open ?? !aberto;
  if (o === aberto) return;
  drawer.classList.toggle('on', o);
  drawer.inert = !o;
  burger.setAttribute('aria-expanded', String(o));
  burger.setAttribute('aria-label', o ? 'Fechar menu' : 'Abrir menu');
  // trava a rolagem do fundo (inclusive no iOS, que ignora overflow:hidden no body)
  document.documentElement.style.overflow = o ? 'hidden' : '';
  document.body.style.overflow = o ? 'hidden' : '';
  document.body.classList.toggle('menu-aberto', o);
  if (o) setTimeout(() => { const a = drawer.querySelector('a'); a && a.focus({ preventScroll: true }); }, 60);
  else burger.focus({ preventScroll: true });
}
if (burger && drawer) {
  drawer.inert = true;
  burger.addEventListener('click', () => toggleMenu());
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
  // tocar fora dos links (no fundo do menu) fecha
  drawer.addEventListener('click', e => { if (!e.target.closest('a,button')) toggleMenu(false); });
  drawer.addEventListener('touchmove', e => { if (drawer.scrollHeight <= drawer.clientHeight) e.preventDefault(); }, { passive: false });
  addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('on')) toggleMenu(false); });
  matchMedia('(min-width:1121px)').addEventListener('change', e => { if (e.matches) toggleMenu(false); });
}

/* =========================================================
   ANIMAÇÕES DE ENTRADA (.rv)
   ========================================================= */
// Um único observer para o site todo. Começa a animar quando o elemento ainda está
// 15% abaixo da tela, então ele já chega visível.
const SEM_ANIMACAO = !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealIO = SEM_ANIMACAO ? null : new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); revealIO.unobserve(e.target); } });
}, { threshold: 0, rootMargin: '0px 0px 15% 0px' });

function revelar(raiz) {
  const els = (raiz || document).querySelectorAll('.rv:not(.show)');
  if (SEM_ANIMACAO) { els.forEach(el => el.classList.add('show')); return; }
  els.forEach(el => revealIO.observe(el));
}

// O que já está na tela no carregamento é marcado pelo script inline no fim do <main>
// (classes "now" e "show", antes da primeira pintura). Aqui só tiramos o "now" depois,
// sem medir nada, para não forçar um layout extra no carregamento.
function revelarPrimeiraDobra() {
  requestAnimationFrame(() => requestAnimationFrame(() =>
    document.querySelectorAll('.rv.now').forEach(el => el.classList.remove('now'))));
}

/* =========================================================
   ANIMAÇÕES INFINITAS: pausadas fora da tela
   ========================================================= */
function pausarForaDaTela() {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('anim-off', !e.isIntersecting)));
  document.querySelectorAll('.fc-1,.fc-2,.hero h1').forEach(el => io.observe(el));
}

/* =========================================================
   WHATSAPP FLUTUANTE: some quando já há botões de contato na tela
   (CTA final e rodapé) ou com o menu aberto, para não cobrir nada
   ========================================================= */
let fabLendo = false;
function iniciarWhatsappFlutuante() {
  const fab = document.querySelector('.float-wpp');
  if (!fab || !('IntersectionObserver' in window)) return;
  const visiveis = new Set();
  const aplicar = () => fab.classList.toggle('away', visiveis.size > 0 || fabLendo);
  const io = new IntersectionObserver(es => {
    es.forEach(e => e.isIntersecting ? visiveis.add(e.target) : visiveis.delete(e.target));
    aplicar();
  }, { rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.hero-cta,.cta,.ft,.article-cta,.wizard,.contact-grid,.hours,.faq-aside').forEach(el => io.observe(el));

  // No celular: some enquanto a pessoa rola para baixo lendo e volta quando
  // ela rola para cima ou para de rolar, para não ficar sobre o texto.
  const mobile = matchMedia('(max-width:768px)');
  let ultimoY = scrollY, parado = 0;
  addEventListener('scroll', () => {
    if (!mobile.matches) return;
    const y = scrollY, desce = y > ultimoY + 4, sobe = y < ultimoY - 4;
    if (desce || sobe) ultimoY = y;
    const antes = fabLendo;
    if (desce && y > 200) fabLendo = true;
    else if (sobe) fabLendo = false;
    if (antes !== fabLendo) aplicar();
    clearTimeout(parado);
    parado = setTimeout(() => { if (fabLendo) { fabLendo = false; aplicar(); } }, 900);
  }, { passive: true });
}

/* =========================================================
   LIGHTBOX DA GALERIA
   ========================================================= */
function iniciarLightbox() {
  const gal = document.getElementById('galBox');
  if (!gal) return;
  let dlg = document.getElementById('lightbox');
  if (!dlg) {
    dlg = document.createElement('dialog');
    dlg.id = 'lightbox';
    dlg.className = 'lb';
    dlg.setAttribute('aria-label', 'Foto ampliada');
    dlg.innerHTML = `
      <figure><img alt=""><figcaption></figcaption></figure>
      <button type="button" class="lb-btn lb-close" aria-label="Fechar"><svg class="ico" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      <button type="button" class="lb-btn lb-prev" aria-label="Foto anterior"><svg class="ico" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg></button>
      <button type="button" class="lb-btn lb-next" aria-label="Próxima foto"><svg class="ico" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>`;
    document.body.appendChild(dlg);
  }
  const img = dlg.querySelector('img');
  const cap = dlg.querySelector('figcaption');
  let i = 0;
  const itens = () => [...gal.querySelectorAll('figure')];
  const mostrar = n => {
    const lista = itens();
    if (!lista.length) return;
    i = (n + lista.length) % lista.length;
    const fig = lista[i];
    const src = fig.querySelector('img');
    img.src = src.dataset.full || src.currentSrc || src.src;
    img.alt = src.alt;
    cap.textContent = (fig.querySelector('figcaption') || {}).textContent || '';
  };
  gal.addEventListener('click', e => {
    const fig = e.target.closest('figure');
    if (!fig) return;
    mostrar(itens().indexOf(fig));
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else window.open(img.src, '_blank');
  });
  dlg.querySelector('.lb-close').onclick = () => dlg.close();
  dlg.querySelector('.lb-prev').onclick = () => mostrar(i - 1);
  dlg.querySelector('.lb-next').onclick = () => mostrar(i + 1);
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') mostrar(i + 1);
    if (e.key === 'ArrowLeft') mostrar(i - 1);
  });
}

/* =========================================================
   START (scripts com defer: o HTML já está todo carregado)
   ========================================================= */
aplicarSite();
document.querySelectorAll('.js-ano').forEach(el => { el.textContent = new Date().getFullYear(); });
revelarPrimeiraDobra();
revelar();
pausarForaDaTela();
iniciarWhatsappFlutuante();
iniciarLightbox();
iniciarMapa();
