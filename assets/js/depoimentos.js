/* =========================================================
   DEPOIMENTOS: carrossel de avaliações do Google
   (o vídeo é um <video> direto no HTML de depoimentos.html)
   ========================================================= */

/* ---------- carrossel ---------- */
function iniciarCarrossel() {
  const track = document.getElementById('track');
  const dotsBox = document.getElementById('dots');
  const carousel = document.getElementById('carousel');
  if (!track || !track.children.length) return;
  const slides = [...track.children];
  let i = 0, timer = null, dragging = false, startX = 0, deltaX = 0;

  dotsBox.innerHTML = '';
  slides.forEach((_, n) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'dot' + (n === 0 ? ' on' : '');
    b.setAttribute('aria-label', 'Ir para a avaliação ' + (n + 1));
    b.onclick = () => go(n);
    dotsBox.appendChild(b);
  });
  const dots = [...dotsBox.children];

  const render = () => {
    track.style.transform = 'translate3d(' + (-i * 100) + '%,0,0)';
    dots.forEach((d, n) => {
      d.classList.toggle('on', n === i);
      if (n === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
    });
    slides.forEach((s, n) => { s.inert = n !== i; s.setAttribute('aria-hidden', String(n !== i)); });
  };
  const go = n => { i = (n + slides.length) % slides.length; render(); restart(); };
  const next = () => go(i + 1);
  const prev = () => go(i - 1);

  document.getElementById('next').onclick = next;
  document.getElementById('prev').onclick = prev;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // autoplay só enquanto o carrossel está na tela
  let naTela = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(es => { naTela = es[0].isIntersecting; naTela ? start() : stop(); }).observe(carousel);
  const start = () => { stop(); if (!reduce && naTela) timer = setInterval(() => { i = (i + 1) % slides.length; render(); }, 6000); };
  const stop = () => clearInterval(timer);
  const restart = () => { stop(); start(); };
  start();

  carousel.onmouseenter = stop;
  carousel.onmouseleave = start;
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', e => { if (!carousel.contains(e.relatedTarget)) start(); });
  carousel.setAttribute('tabindex', '0');
  carousel.onkeydown = e => {
    if (e.key === 'ArrowRight') { next(); e.preventDefault(); }
    if (e.key === 'ArrowLeft')  { prev(); e.preventDefault(); }
  };

  // Arrasto com pointer events: só transform, aplicado no máximo uma vez por frame.
  // touch-action:pan-y (no CSS) deixa a rolagem vertical com o navegador.
  let largura = 0, startY = 0, t0 = 0, frame = 0, horizontal = null;
  const pintar = () => {
    frame = 0;
    track.style.transform = 'translate3d(' + (-i * largura + deltaX) + 'px,0,0)';
  };
  track.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging = true; horizontal = null; deltaX = 0;
    startX = e.clientX; startY = e.clientY; t0 = performance.now();
    largura = track.parentElement.clientWidth; // lido uma vez por gesto, não a cada pixel
    stop();
  }, { passive:true });
  track.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    if (horizontal === null) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      horizontal = Math.abs(dx) > Math.abs(dy);
      if (!horizontal) { dragging = false; start(); return; }
      track.classList.add('drag');
      try { track.setPointerCapture(e.pointerId); } catch (err) {}
    }
    // resistência nas pontas
    deltaX = ((i === 0 && dx > 0) || (i === slides.length - 1 && dx < 0)) ? dx * .35 : dx;
    if (!frame) frame = requestAnimationFrame(pintar);
  }, { passive:true });
  const soltar = () => {
    if (!dragging) return;
    dragging = false;
    if (frame) { cancelAnimationFrame(frame); frame = 0; }
    track.classList.remove('drag');
    if (!horizontal) { start(); return; }
    const vel = deltaX / Math.max(1, performance.now() - t0); // px/ms
    // troca de slide com 50px de arraste ou um gesto rápido
    const passou = Math.abs(deltaX) > 50 || Math.abs(vel) > .45;
    if (passou && deltaX < 0 && i < slides.length - 1) next();
    else if (passou && deltaX > 0 && i > 0) prev();
    else if (passou) go(i); // nas pontas volta com animação
    else { render(); start(); }
    deltaX = 0;
  };
  track.addEventListener('pointerup', soltar, { passive:true });
  track.addEventListener('pointercancel', soltar, { passive:true });
  // No toque, o navegador captura o ponteiro no elemento filho que recebeu o dedo; quando
  // passamos a captura para o track, esse filho dispara lostpointercapture, que sobe até aqui.
  // Só encerra o arraste quando quem perdeu a captura foi o próprio track.
  track.addEventListener('lostpointercapture', e => { if (e.target === track) soltar(); }, { passive:true });
  // evita "clique" acidental depois de arrastar e o arrasto nativo de imagens/texto
  track.addEventListener('dragstart', e => e.preventDefault());
  render();
}

iniciarCarrossel();
