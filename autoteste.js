(async () => {
  const H = document.querySelector('.fxa-host');
  if (!H || !window.FluxA11y) { console.log('Flux Acessibilidade não encontrado nesta página. Limpe o cache e recarregue.'); return; }
  const R = H.shadowRoot, h = document.documentElement, out = [];
  const w = (t) => new Promise((r) => setTimeout(r, t));
  const ok = (n, c) => out.push({ teste: n, resultado: c ? 'OK' : 'FALHOU' });
  const key = (k, code) => document.dispatchEvent(new KeyboardEvent('keydown', { key: k, code, altKey: true, shiftKey: true, bubbles: true }));
  FluxA11y.reset(); await w(300);
  console.log('Flux Acessibilidade ' + FluxA11y.version + ' — testando...');

  const dock = R.querySelector('.dock'), dr = dock.getBoundingClientRect();
  ok('Botão dentro da tela', dr.width > 0 && dr.left >= 0 && dr.right <= innerWidth && dr.top >= 0 && dr.bottom <= innerHeight);
  const top = document.elementFromPoint(dr.left + dr.width / 2, dr.top + dr.height / 4);
  ok('Botão por cima de tudo (nada cobrindo)', top === H);

  key('A', 'KeyA'); await w(200); ok('Alt+Shift+A abre o painel', !R.querySelector('.p').hidden);
  key('A', 'KeyA'); await w(200); ok('Alt+Shift+A fecha o painel', R.querySelector('.p').hidden);

  const p = [...document.querySelectorAll('main p, article p, p')].find((e) => e.offsetParent && e.textContent.trim().length > 20);
  if (p && R.querySelector('.sb')) {
    const a = parseFloat(getComputedStyle(p).fontSize);
    R.querySelector('.sb[data-s="1"]').click(); await w(300);
    ok('A+ aumenta o texto', parseFloat(getComputedStyle(p).fontSize) > a);
    R.querySelector('.sb[data-s="-1"]').click(); await w(300);
    ok('A− volta ao normal', Math.abs(parseFloat(getComputedStyle(p).fontSize) - a) < 0.5);
  } else { out.push({ teste: 'Tamanho do texto', resultado: 'pulado (desligado ou sem parágrafo)' }); }

  const checks = {
    contraste: () => h.classList.contains('fxa-hc'),
    inverter: () => !R.querySelector('.fx').hidden,
    cinza: () => !R.querySelector('.fx').hidden,
    links: () => h.classList.contains('fxa-links'),
    titulos: () => h.classList.contains('fxa-titulos'),
    legivel: () => h.classList.contains('fxa-legivel'),
    espacamento: () => h.classList.contains('fxa-espaco'),
    cursor: () => h.classList.contains('fxa-cursor'),
    animacoes: () => h.classList.contains('fxa-pausa'),
    regua: () => !R.querySelector('.rt').hidden,
  };
  for (const k in checks) {
    const b = R.querySelector('.o[data-k="' + k + '"]');
    if (!b) { out.push({ teste: k, resultado: 'desligado no admin' }); continue; }
    b.click(); await w(300);
    const liga = checks[k](), d = dock.getBoundingClientRect();
    ok(k + ': liga', liga);
    ok(k + ': botão continua na tela', d.width > 0 && d.right <= innerWidth + 1 && d.bottom <= innerHeight + 1);
    b.click(); await w(300);
    ok(k + ': desliga', !checks[k]() || k === 'cinza' && !R.querySelector('.o[data-k="inverter"]'));
  }

  const c = R.querySelector('.o[data-k="contraste"]'), i = R.querySelector('.o[data-k="inverter"]');
  if (c && i) { c.click(); await w(200); i.click(); await w(300); ok('Contraste e Inverter não ficam juntos', !h.classList.contains('fxa-hc')); }
  key('0', 'Digit0'); await w(300);
  ok('Alt+Shift+0 restaura tudo', !h.classList.contains('fxa-hc') && R.querySelector('.fx').hidden);

  const lib = R.querySelector('.lib');
  if (lib) {
    lib.click();
    let aberto = false;
    for (let t = 0; t < 40 && !aberto; t++) {
      await w(500);
      const r = document.getElementById('vlibras-app-root'), app = r && r.shadowRoot && r.shadowRoot.getElementById('vlibras-app');
      aberto = app ? !app.hasAttribute('inert') : !!(r && r.dataset.active === 'true');
    }
    ok('Libras: VLibras abriu', aberto);
    await w(800);
    ok('Libras: nosso botão sai da frente', dock.style.display === 'none');
    const wr = document.getElementById('vlibras-access-wrapper');
    ok('Libras: botão próprio do VLibras escondido', !wr || getComputedStyle(wr).display === 'none');
    lib.click(); await w(1200);
    ok('Libras: fecha e o nosso botão volta', dock.style.display !== 'none');
  } else { out.push({ teste: 'Libras', resultado: 'desligado no admin' }); }

  FluxA11y.reset();
  console.table(out);
  const f = out.filter((x) => x.resultado === 'FALHOU').length;
  console.log(f ? f + ' teste(s) falharam — mande um print desta tabela.' : 'Tudo OK. Teste à parte: "Ler em voz alta" (precisa de clique real).');
})();
