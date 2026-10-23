/* =========================================================
   WIZARD DE AGENDAMENTO (Início)
   Depende de assets/js/site.js (svgIcone, waLink e o objeto SITE)
   ========================================================= */
function iniciarWizard() {
  const PUBLICOS = [
    { id:'bebe',      ic:'bebe',     t:'Bebê',                  s:'0 a 2 anos' },
    { id:'crianca',   ic:'crianca',  t:'Criança',               s:'2 a 12 anos' },
    { id:'gestante',  ic:'gestante', t:'Gestante ou pós-parto', s:'gestação e puerpério' },
    { id:'adulto',    ic:'adulto',   t:'Adulto',                s:'dores e tensões do dia a dia' },
    { id:'idoso',     ic:'idoso',    t:'Idoso',                 s:'mobilidade e equilíbrio' },
    { id:'conversar', ic:'conversa', t:'Prefiro conversar',     s:'me ajuda a entender' }
  ];
  const QUEIXAS = {
    bebe:     ['Cólicas e gases','Refluxo','Dificuldade na amamentação','Torcicolo congênito','Assimetria da cabecinha','Sono agitado e choro','Outro / não sei dizer'],
    crianca:  ['Postura','Dores de crescimento','Otites de repetição','Sono e irritabilidade','Desenvolvimento motor','Outro / não sei dizer'],
    gestante: ['Dor lombar e ciática','Desconfortos da gestação','Preparo para o parto','Recuperação pós-parto','Outro / não sei dizer'],
    adulto:   ['Dor lombar','Dor cervical e ombros','Enxaqueca','ATM (mandíbula)','Tensão do trabalho','Dor crônica','Prevenção de cirurgias','Outro / não sei dizer'],
    idoso:    ['Mobilidade e equilíbrio','Dores articulares','Postura','Prevenção de cirurgias','Bem-estar geral','Outro / não sei dizer'],
    conversar:['Prefiro explicar na conversa']
  };
  const HORARIOS = [
    { ic:'manha',  t:'Manhã',    s:'até 12h' },
    { ic:'tarde',  t:'Tarde',    s:'12h às 18h' },
    { ic:'agenda', t:'Flexível', s:'me adapto ao seu horário' }
  ];

  const wizard = document.getElementById('wizard');
  if (!wizard) return;
  const steps  = [...wizard.querySelectorAll('.wz-step')];
  const bar    = document.getElementById('wzBar');
  const count  = document.getElementById('wzCount');
  const boxPub = document.getElementById('optPublico');
  const boxQue = document.getElementById('optQueixa');
  const boxHor = document.getElementById('optHorario');
  const send   = document.getElementById('wzSend');
  const state  = { publico:null, queixa:null, horario:null };
  let step = 1;

  const show = n => {
    step = n;
    steps.forEach(s => s.classList.toggle('on', +s.dataset.step === n));
    const v = Math.min(n, 3);
    bar.style.transform = 'scaleX(' + (n >= 4 ? 1 : v / 3) + ')';
    count.textContent = n >= 4 ? 'Tudo pronto' : 'Passo ' + v + ' de 3';
    if (n > 1) {
      // só rola se o topo do wizard tiver saído da tela (ficou atrás do header);
      // caso contrário a tela fica parada no lugar
      const topo = wizard.getBoundingClientRect().top;
      const hdrH = (document.getElementById('hdr') || {}).offsetHeight || 0;
      if (topo < hdrH) {
        const suave = matchMedia('(min-width:769px) and (prefers-reduced-motion:no-preference)').matches;
        scrollTo({ top: scrollY + topo - hdrH - 12, behavior: suave ? 'smooth' : 'auto' });
      }
      const alvo = wizard.querySelector('.wz-step.on .wz-q');
      if (alvo) { alvo.setAttribute('tabindex', '-1'); alvo.focus({ preventScroll:true }); }
    }
  };

  const marcar = (box, b) => {
    [...box.children].forEach(c => { c.classList.remove('on'); c.setAttribute('aria-pressed', 'false'); });
    b.classList.add('on'); b.setAttribute('aria-pressed', 'true');
  };

  boxPub.innerHTML = '';
  PUBLICOS.forEach(p => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opt';
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = `<span class="em" aria-hidden="true">${svgIcone(p.ic)}</span><span><b>${p.t}</b><small>${p.s}</small></span>`;
    b.onclick = () => {
      state.publico = p.t; state.queixa = null;
      marcar(boxPub, b);
      montarQueixas(p.id);
      if (p.id === 'conversar') { state.queixa = 'Prefere explicar na conversa'; show(3); }
      else show(2);
    };
    boxPub.appendChild(b);
  });

  function montarQueixas(id) {
    boxQue.innerHTML = '';
    (QUEIXAS[id] || QUEIXAS.adulto).forEach(q => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt';
      b.setAttribute('aria-pressed', 'false');
      b.innerHTML = `<span><b>${q}</b></span>`;
      b.onclick = () => {
        state.queixa = q;
        marcar(boxQue, b);
        show(3);
      };
      boxQue.appendChild(b);
    });
  }

  boxHor.innerHTML = '';
  HORARIOS.forEach(h => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opt';
    b.setAttribute('aria-pressed', 'false');
    b.innerHTML = `<span class="em" aria-hidden="true">${svgIcone(h.ic)}</span><span><b>${h.t}</b><small>${h.s}</small></span>`;
    b.onclick = () => {
      state.horario = h.t + ' (' + h.s + ')';
      marcar(boxHor, b);
      resumir(); show(4);
    };
    boxHor.appendChild(b);
  });

  function resumir() {
    document.getElementById('rPublico').textContent = state.publico || '';
    document.getElementById('rQueixa').textContent  = state.queixa  || '';
    document.getElementById('rHorario').textContent = state.horario || '';
    const msg = 'Olá, Dra. Letícia! Vim pelo site e gostaria de agendar uma consulta.\n\n' +
      '• Atendimento para: ' + state.publico + '\n' +
      '• Queixa principal: ' + state.queixa + '\n' +
      '• Melhor horário: ' + state.horario + '\n\n' +
      'Podemos conversar?';
    // o número vem do objeto SITE, em assets/js/site.js
    send.href = waLink(msg);
  }

  wizard.querySelectorAll('[data-back]').forEach(b => {
    b.onclick = () => {
      if (step === 3 && state.publico === 'Prefiro conversar') return show(1);
      show(Math.max(1, step - 1));
    };
  });
  show(1);
}

iniciarWizard();
