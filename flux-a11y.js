/*!
 * Flux Acessibilidade 1.1.1
 * Widget leve de acessibilidade, sem dependências.
 * Autor: Aislan Renedy — https://fluxativa.com.br/
 * Licença: GPL-2.0-or-later
 */
(function (w, d) {
	'use strict';
	if (w.FluxA11y) { return; }

	var VERSION = '1.1.1';
	var STORE = 'fxa_prefs_v1';
	var ALL = ['fonte', 'contraste', 'inverter', 'cinza', 'links', 'titulos', 'legivel', 'espacamento', 'cursor', 'animacoes', 'regua', 'voz', 'libras'];
	var DEF = {
		cor: '#1769e0',
		tema: 'claro',
		posicao: 'direita',
		vertical: 'meio',
		tamanho: 52,
		margem: 18,
		recursos: 'fonte,contraste,inverter,cinza,links,titulos,legivel,espacamento,cursor,animacoes,regua,voz,libras',
		idioma: 'auto',
		titulo: '',
		declaracao: '',
		icone: '',
		zindex: 2147483647,
		desviar: true,
		estilo: 'borda',
		vozModo: 'apontar',
		vozVel: 1,
		vlibrasUrl: 'https://vlibras.gov.br/app'
	};

	/* ---------- Textos ---------- */
	var T = {
		pt: {
			ui: { titulo: 'Acessibilidade', abrir: 'Abrir menu de acessibilidade', fechar: 'Fechar menu de acessibilidade', texto: 'Tamanho do texto', maior: 'Aumentar texto', menor: 'Diminuir texto', restaurar: 'Restaurar padrão', declaracao: 'Declaração de acessibilidade', on: 'ativado', off: 'desativado', semvoz: 'Leitura em voz alta indisponível neste navegador.', libras: 'Abrir tradutor de Libras (VLibras)', libfalha: 'Não foi possível carregar o VLibras agora. Tente de novo em instantes.', zerado: 'Configurações restauradas', lang: 'pt-BR' },
			v: { player: 'Leitura em voz alta', link: 'Link', botao: 'Botão', campo: 'Campo', img: 'Imagem', aponte: 'Aponte para um texto', clique: 'Clique em um texto', toque: 'Toque em um texto', lendo: 'Lendo…', prev: 'Parágrafo anterior', next: 'Próximo parágrafo', play: 'Ler a página a partir daqui', pause: 'Pausar leitura', vel: 'Velocidade', modo: 'Ler ao apontar o mouse', fechar: 'Desligar leitura em voz alta', ativar: 'Clique em qualquer lugar da página para liberar a voz.', denovo: 'Toque de novo para abrir.' },
			f: { contraste: 'Alto contraste', inverter: 'Inverter cores', cinza: 'Escala de cinza', links: 'Destacar links', titulos: 'Destacar títulos', legivel: 'Fonte legível', espacamento: 'Espaçamento do texto', cursor: 'Cursor grande', animacoes: 'Pausar animações', regua: 'Régua de leitura', voz: 'Ler em voz alta', libras: 'Libras (VLibras)' }
		},
		en: {
			ui: { titulo: 'Accessibility', abrir: 'Open accessibility menu', fechar: 'Close accessibility menu', texto: 'Text size', maior: 'Increase text', menor: 'Decrease text', restaurar: 'Reset', declaracao: 'Accessibility statement', on: 'on', off: 'off', semvoz: 'Read aloud is not available in this browser.', libras: 'Open Libras translator (VLibras)', libfalha: 'Could not load VLibras right now. Please try again shortly.', zerado: 'Settings reset', lang: 'en-US' },
			v: { player: 'Read aloud', link: 'Link', botao: 'Button', campo: 'Field', img: 'Image', aponte: 'Point at any text', clique: 'Click any text', toque: 'Tap any text', lendo: 'Reading…', prev: 'Previous paragraph', next: 'Next paragraph', play: 'Read the page from here', pause: 'Pause reading', vel: 'Speed', modo: 'Read on mouse hover', fechar: 'Turn off read aloud', ativar: 'Click anywhere on the page to enable the voice.', denovo: 'Tap again to open.' },
			f: { contraste: 'High contrast', inverter: 'Invert colors', cinza: 'Grayscale', links: 'Highlight links', titulos: 'Highlight headings', legivel: 'Readable font', espacamento: 'Text spacing', cursor: 'Large cursor', animacoes: 'Pause animations', regua: 'Reading ruler', voz: 'Read aloud', libras: 'Libras (Brazilian Sign Language)' }
		},
		es: {
			ui: { titulo: 'Accesibilidad', abrir: 'Abrir menú de accesibilidad', fechar: 'Cerrar menú de accesibilidad', texto: 'Tamaño del texto', maior: 'Aumentar texto', menor: 'Disminuir texto', restaurar: 'Restablecer', declaracao: 'Declaración de accesibilidad', on: 'activado', off: 'desactivado', semvoz: 'La lectura en voz alta no está disponible en este navegador.', libras: 'Abrir traductor de Libras (VLibras)', libfalha: 'No se pudo cargar VLibras ahora. Inténtelo de nuevo en unos instantes.', zerado: 'Ajustes restablecidos', lang: 'es-ES' },
			v: { player: 'Lectura en voz alta', link: 'Enlace', botao: 'Botón', campo: 'Campo', img: 'Imagen', aponte: 'Apunte a un texto', clique: 'Haga clic en un texto', toque: 'Toque un texto', lendo: 'Leyendo…', prev: 'Párrafo anterior', next: 'Párrafo siguiente', play: 'Leer la página desde aquí', pause: 'Pausar lectura', vel: 'Velocidad', modo: 'Leer al pasar el ratón', fechar: 'Desactivar lectura en voz alta', ativar: 'Haga clic en cualquier parte de la página para activar la voz.', denovo: 'Toque de nuevo para abrir.' },
			f: { contraste: 'Alto contraste', inverter: 'Invertir colores', cinza: 'Escala de grises', links: 'Resaltar enlaces', titulos: 'Resaltar títulos', legivel: 'Fuente legible', espacamento: 'Espaciado del texto', cursor: 'Cursor grande', animacoes: 'Pausar animaciones', regua: 'Regla de lectura', voz: 'Leer en voz alta', libras: 'Libras (lengua de señas brasileña)' }
		}
	};

	/* ---------- Ícones (traço) ---------- */
	var IC = {
		fab: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="6.6" r="1.5" fill="currentColor" stroke="none"/><path d="M6.8 9.4l5.2 1.1 5.2-1.1M12 10.5v3.6M12 14.1l-2.6 4.4M12 14.1l2.6 4.4" stroke-width="2"/>',
		maos: '<path fill="currentColor" stroke="none" fill-rule="evenodd" transform="translate(0.378 0) scale(6.2992)" d="M2.03 2.68c-0.07,0.14 -0.47,0.88 -0.37,0.98 0.16,0.15 0.38,-0.41 0.52,-0.65 0.03,-0.06 0.04,-0.08 0.08,-0.13 0.07,-0.11 0.02,-0.07 0.12,-0.11 0,0.29 -0.21,1.24 0.06,1 0.18,-0.15 0.07,-0.91 0.29,-1.01 0.08,0.09 0.07,0.26 0.09,0.43 0,0.07 0.01,0.17 0.02,0.24 0.02,0.12 0.01,0.12 0.12,0.14 0.12,-0.03 0.08,-0.47 0.08,-0.58 -0.02,-0.68 0.14,-0.57 0.26,-1.1 0.06,-0.27 0,-0.36 -0.19,-0.47 -0.16,-0.09 -0.26,-0.25 -0.39,-0.28 -0.31,-0.06 -0.73,0.22 -1.01,0.34 -0.18,0.07 -0.36,0.08 -0.51,0.13 0.03,0.29 0.52,0.08 0.71,0.19l0.03 0.13c-0.01,0.05 -0.02,0.07 -0.04,0.12 -0.11,0.23 -0.43,0.66 -0.59,0.85 -0.09,0.1 -0.21,0.2 -0.14,0.34 0.14,0.03 0.16,-0.04 0.23,-0.11l0.51 -0.5 0.1 0.04c0,0 0.01,0 0.02,0.01zm-1.37 0.12c0.05,0.04 0.08,0.07 0.17,0.07 -0.03,-0.08 -0.14,-0.11 -0.2,-0.2 -0.05,-0.06 -0.08,-0.21 -0.18,-0.22 0.02,0.18 0.12,0.26 0.21,0.35zm-0.01 0.11c-0.16,-0.08 -0.24,-0.19 -0.29,-0.4l-0.06 0.04c0.02,0.19 0.17,0.37 0.32,0.43l0.03 -0.07zm2.95 -1.42c-0.07,0.07 0.04,0.05 -0.02,0.42 -0.03,0.23 -0.02,0.04 0.02,0.12 0.09,-0.12 0.11,-0.29 0.07,-0.44 -0.03,-0.1 -0.03,-0.07 -0.07,-0.1zm-0.12 0.07c-0.05,-0.14 -0.01,-0.06 -0.08,-0.11 -0.02,0.03 -0.02,0 -0.02,0.06 0.01,0.14 0.06,-0.08 0.02,0.48 0.08,-0.02 0.07,0.03 0.09,-0.11 0.01,-0.04 0.01,-0.11 0.01,-0.15 0,-0.06 -0.01,-0.12 -0.02,-0.17zm-2.17 -0.48l-0.04 -0.12c-0.15,-0.4 0,-1.05 -0.35,-0.95 -0.05,0.19 0.05,0.84 0.05,1.11 -0.1,-0.04 -0.06,0 -0.13,-0.11 -0.15,-0.26 -0.27,-0.76 -0.5,-0.72 -0.1,0.15 0.3,0.75 0.34,1.04 -0.15,-0.02 -0.16,-0.04 -0.22,-0.14 -0.05,-0.07 -0.4,-0.54 -0.45,-0.39 -0.05,0.15 0.09,0.28 0.23,0.5 0.47,0.69 0.19,0.61 0.45,1.14 0.11,0.24 0.25,0.23 0.56,0.21 0.12,-0.11 0.41,-0.51 0.48,-0.7 -0.3,0 -0.76,0.02 -0.72,-0.34 0.03,-0.25 0.46,-0.21 0.7,-0.34 0.01,-0.21 0.01,-0.42 0.03,-0.63 0,-0.12 0.1,-0.51 -0.06,-0.55 -0.14,-0.04 -0.14,0.18 -0.19,0.43 -0.02,0.1 -0.04,0.57 -0.18,0.56z"/>',
		x: '<path d="M6 6l12 12M18 6L6 18"/>',
		contraste: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>',
		inverter: '<rect x="4" y="4" width="11" height="11" rx="2"/><rect x="9" y="9" width="11" height="11" rx="2" fill="currentColor"/>',
		cinza: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M20 4v16H4z" fill="currentColor" opacity=".4"/>',
		links: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
		titulos: '<path d="M6 4v16M18 4v16M6 12h12"/>',
		legivel: '<path d="M3 19l5-14 5 14M5 14h6M15 19l3.5-9 3.5 9M16.5 16h4"/>',
		espacamento: '<path d="M3 5v14M21 5v14M7 12h10M10 9l-3 3 3 3M14 9l3 3-3 3"/>',
		cursor: '<path d="M6 3l12 7.5-5.2 1.3L16 19l-2.4 1-3.2-7.2L6 16z"/>',
		animacoes: '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
		regua: '<rect x="3" y="9" width="18" height="6" rx="1"/><path d="M7 9v3M11 9v2M15 9v3M19 9v2"/>',
		voz: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/>',
		libras: '<path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V11M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-2-4a1.5 1.5 0 0 1 2.4-1.7L8 13"/>',
		prev: '<path d="M6 5v14"/><path d="M19 6l-9 6 9 6z" fill="currentColor"/>',
		next: '<path d="M18 5v14"/><path d="M5 6l9 6-9 6z" fill="currentColor"/>',
		play: '<path d="M7 5l12 7-12 7z" fill="currentColor"/>',
		pause: '<rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/>',
		reset: '<path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4.5h4.5"/>'
	};
	function svg(name, size) {
		size = size || 20;
		return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + IC[name] + '</svg>';
	}

	/* ---------- Utilidades ---------- */
	function hex(c, fb) {
		c = String(c || '').trim();
		if (/^#[0-9a-f]{3}$/i.test(c)) { c = '#' + c[1] + c[1] + c[2] + c[2] + c[3] + c[3]; }
		return /^#[0-9a-f]{6}$/i.test(c) ? c.toLowerCase() : fb;
	}
	function rgbOf(h) { return parseInt(h.substr(1, 2), 16) + ',' + parseInt(h.substr(3, 2), 16) + ',' + parseInt(h.substr(5, 2), 16); }
	function lum(h) {
		var v = [1, 3, 5].map(function (i) {
			var x = parseInt(h.substr(i, 2), 16) / 255;
			return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
		});
		return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
	}
	function shade(h) {
		var t = lum(h) > 0.179 ? 0 : 255, k = 0.1, o = '#';
		[1, 3, 5].forEach(function (i) {
			var v = parseInt(h.substr(i, 2), 16);
			v = Math.round(v + (t - v) * k);
			o += ('0' + v.toString(16)).slice(-2);
		});
		return o;
	}
	function safeUrl(u, allowData) {
		u = String(u || '').trim();
		if (/^(https?:)?\/\//i.test(u) || /^\//.test(u)) { return u; }
		if (allowData && /^data:image\/(png|jpe?g|gif|svg\+xml|webp);/i.test(u)) { return u; }
		return '';
	}
	function pick(v, list, fb) { return list.indexOf(v) > -1 ? v : fb; }
	function merge() {
		var o = {};
		for (var i = 0; i < arguments.length; i++) {
			var s = arguments[i];
			if (s && typeof s === 'object') { for (var k in s) { if (Object.prototype.hasOwnProperty.call(s, k) && s[k] !== null && s[k] !== undefined && s[k] !== '') { o[k] = s[k]; } } }
		}
		return o;
	}
	function normalize(u) {
		var c = merge(DEF, u);
		var rec = c.recursos;
		if (typeof rec === 'string') { rec = rec.split(','); }
		if (!Array.isArray(rec)) { rec = DEF.recursos.split(','); }
		rec = rec.map(function (x) { return String(x).trim().toLowerCase(); }).filter(function (x, i, a) { return ALL.indexOf(x) > -1 && a.indexOf(x) === i; });
		var tam = parseInt(c.tamanho, 10); if (isNaN(tam)) { tam = DEF.tamanho; }
		var mar = parseInt(c.margem, 10); if (isNaN(mar)) { mar = DEF.margem; }
		var z = parseInt(c.zindex, 10); if (isNaN(z)) { z = DEF.zindex; }
		return {
			cor: hex(c.cor, DEF.cor),
			tema: pick(String(c.tema).toLowerCase(), ['claro', 'escuro', 'auto'], 'claro'),
			estilo: pick(String(c.estilo).toLowerCase(), ['borda', 'flutuante'], 'borda'),
			vozModo: pick(String(c.vozModo).toLowerCase(), ['apontar', 'clique'], 'apontar'),
			vozVel: [0.75, 1, 1.25, 1.5].indexOf(parseFloat(c.vozVel)) > -1 ? parseFloat(c.vozVel) : 1,
			posicao: pick(String(c.posicao).toLowerCase(), ['direita', 'esquerda'], 'direita'),
			vertical: pick(String(c.vertical).toLowerCase(), ['baixo', 'meio', 'cima'], 'meio'),
			tamanho: Math.max(40, Math.min(72, tam)),
			margem: Math.max(0, Math.min(80, mar)),
			recursos: rec,
			idioma: String(c.idioma || 'auto').toLowerCase(),
			titulo: String(c.titulo || ''),
			declaracao: safeUrl(c.declaracao),
			icone: safeUrl(c.icone, true),
			zindex: z,
			desviar: ['false', '0', 'nao', 'não', 'no'].indexOf(String(c.desviar).toLowerCase()) === -1,
			vlibrasUrl: safeUrl(c.vlibrasUrl) || DEF.vlibrasUrl
		};
	}

	/* ---------- Estado ---------- */
	var cfg, host, root, prefs, nodes, styleEl, tx, scaled = [], libEl, rulerFn, speaking = false, keyFn, resizeFn, dodgeTimers = [];

	function emptyPrefs() { return { fonte: 0, contraste: false, inverter: false, cinza: false, links: false, titulos: false, legivel: false, espacamento: false, cursor: false, animacoes: false, regua: false, voz: false, libras: false, vozVel: 0, vozModo: '' }; }
	function load() {
		var p = emptyPrefs();
		if (/[?&]fxa=reset(&|$)/.test(String(w.location && w.location.search))) {
			try { w.localStorage.removeItem(STORE); } catch (e) { /* ignora */ }
			return p;
		}
		try {
			var r = JSON.parse(w.localStorage.getItem(STORE) || '{}');
			for (var k in p) { if (k in r && typeof r[k] === typeof p[k]) { p[k] = r[k]; } }
			p.fonte = Math.max(0, Math.min(5, parseInt(p.fonte, 10) || 0));
		} catch (e) { /* storage indisponível */ }
		if (p.contraste && p.inverter) { p.inverter = false; }
		return p;
	}
	function save() { try { w.localStorage.setItem(STORE, JSON.stringify(prefs)); } catch (e) { /* ignora */ } }
	function on(k) { return cfg.recursos.indexOf(k) > -1 && !!prefs[k]; }
	function lang() {
		var l = cfg.idioma === 'auto' ? (d.documentElement.lang || (w.navigator && w.navigator.language) || 'pt') : cfg.idioma;
		l = String(l).slice(0, 2).toLowerCase();
		return T[l] || T.pt;
	}

	/* ---------- CSS global (efeitos na página) ---------- */
	var X = ':not(.fxa-host):not([vw]):not([vw] *)';
	function globalCss() {
		var cur = encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'><path d='M6 3l12 7.5-5.2 1.3L16 19l-2.4 1-3.2-7.2L6 16z' fill='black' stroke='white' stroke-width='1.4' stroke-linejoin='round'/></svg>");
		var icons = ':not(i):not(svg):not(svg *):not([class*="icon"]):not([class*="fa-"]):not(.fa):not(.fas):not(.far):not(.fab):not(.dashicons):not(.material-icons):not(.glyphicon)';
		return [
			'[vw].enabled [vw-access-button],#vlibras-access-wrapper{display:none!important}',
			'html.fxa-hc,html.fxa-hc body{background:#000!important;color:#fff!important}',
			'html.fxa-hc body *' + X + '{background-color:#000!important;color:#fff!important;border-color:#fff!important;text-shadow:none!important;box-shadow:none!important}',
			'html.fxa-hc body *' + X + ':not([data-fxa-bg]){background-image:none!important}',
			'html.fxa-hc body a' + X + ',html.fxa-hc body a *' + X + '{color:#ff0!important;text-decoration:underline!important}',
			'html.fxa-hc body :is(button,input,select,textarea)' + X + '{border:2px solid #fff!important}',
			'html.fxa-links body a' + X + '{text-decoration:underline!important;text-decoration-thickness:2px!important;text-underline-offset:3px!important;outline:2px solid rgba(' + rgbOf(cfg.cor) + ',.55)!important;outline-offset:2px!important;border-radius:3px!important;background-color:rgba(' + rgbOf(cfg.cor) + ',.08)!important}',
			'html.fxa-links body a' + X + ':hover,html.fxa-links body a' + X + ':focus-visible{outline-color:rgba(' + rgbOf(cfg.cor) + ',1)!important;background-color:rgba(' + rgbOf(cfg.cor) + ',.16)!important}',
			'html.fxa-titulos body :is(h1,h2,h3,h4,h5,h6)' + X + '{outline:3px solid #1769e0!important;outline-offset:2px!important;background:#fff8c5!important;color:#000!important}',
			'html.fxa-legivel body *' + X + icons + '{font-family:Verdana,Arial,Helvetica,sans-serif!important}',
			'html.fxa-espaco body *' + X + '{letter-spacing:.1em!important;word-spacing:.2em!important;line-height:1.8!important}',
			'html.fxa-cursor,html.fxa-cursor body *' + X + '{cursor:url("data:image/svg+xml,' + cur + '") 6 3,auto!important}',
			'html.fxa-pausa *' + X + ',html.fxa-pausa *' + X + '::before,html.fxa-pausa *' + X + '::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}'
		].join('\n');
	}

	/* ---------- Alto contraste: manter fotos de fundo sem texto por cima ---------- */
	// Marca com data-fxa-bg os elementos cuja imagem de fundo é uma foto (url) e que não têm texto dentro.
	// Mede com a nossa folha de estilos desligada por um instante (no mesmo ciclo, sem piscar).
	var bgScrollFn = null;
	function markBg() {
		if (!d.body || !styleEl) { return; }
		styleEl.disabled = true;
		var els = d.body.querySelectorAll('*'), i, el, bi, list = [];
		for (i = 0; i < els.length; i++) {
			el = els[i];
			if (el === host || el.hasAttribute('data-fxa-bg')) { continue; }
			bi = w.getComputedStyle(el).backgroundImage;
			if (bi && bi.indexOf('url(') > -1 && !(el.textContent || '').trim()) { list.push(el); }
		}
		styleEl.disabled = false;
		for (i = 0; i < list.length; i++) { list[i].setAttribute('data-fxa-bg', ''); }
		// Fotos que só carregam ao rolar (lazy load do Elementor / WP Rocket)
		if (!bgScrollFn) {
			bgScrollFn = function () { clearTimeout(bgScrollFn.t); bgScrollFn.t = setTimeout(markBg, 350); };
			w.addEventListener('scroll', bgScrollFn, { passive: true });
			w.addEventListener('resize', bgScrollFn);
		}
	}
	function clearBg() {
		if (bgScrollFn) {
			clearTimeout(bgScrollFn.t);
			w.removeEventListener('scroll', bgScrollFn);
			w.removeEventListener('resize', bgScrollFn);
			bgScrollFn = null;
		}
		[].forEach.call(d.querySelectorAll('[data-fxa-bg]'), function (el) { el.removeAttribute('data-fxa-bg'); });
	}

	/* ---------- Tamanho do texto ---------- */
	function scaleText() {
		var i, r;
		for (i = 0; i < scaled.length; i++) {
			r = scaled[i];
			if (r.inl) { r.el.style.setProperty('font-size', r.inl, r.pr); } else { r.el.style.removeProperty('font-size'); }
		}
		scaled = [];
		var step = on('fonte') ? prefs.fonte : 0;
		if (!step || !d.body) { return; }
		var f = 1 + step * 0.1;
		var els = d.body.querySelectorAll('*'), list = [], el, j, n, has, px;
		for (i = 0; i < els.length; i++) {
			el = els[i];
			if (el === host || /^(SCRIPT|STYLE|NOSCRIPT|BR|HR|IMG|VIDEO|AUDIO|CANVAS|IFRAME|OPTION)$/i.test(el.tagName) || el.closest('svg,[vw]')) { continue; }
			has = false;
			for (j = 0; j < el.childNodes.length; j++) {
				n = el.childNodes[j];
				if (n.nodeType === 3 && n.nodeValue.trim()) { has = true; break; }
			}
			if (has) { list.push(el); }
		}
		var sizes = list.map(function (e) { return parseFloat(w.getComputedStyle(e).fontSize); });
		for (i = 0; i < list.length; i++) {
			px = sizes[i];
			if (!px) { continue; }
			scaled.push({ el: list[i], inl: list[i].style.getPropertyValue('font-size'), pr: list[i].style.getPropertyPriority('font-size') });
			list[i].style.setProperty('font-size', (Math.round(px * f * 100) / 100) + 'px', 'important');
		}
	}

	/* ---------- Leitura em voz alta ---------- */
	// Com o recurso ligado:
	//  - modo "apontar" (padrão): parar o mouse 0,4 s sobre um parágrafo, título, link, botão ou imagem lê aquele bloco;
	//  - modo "clique": clicar num texto lê o texto;
	//  - toque (celular): tocar lê; em links/botões o 1º toque lê e o 2º abre;
	//  - teclado: o item que recebe o foco (Tab) é lido.
	// O bloco lido ganha um contorno. O mini player tem anterior/pausar/próximo, velocidade e modo.
	var V = { gen: 0, cur: null, seq: null, idx: -1, playing: false, dwell: null, hover: null, tapEl: null, tapAt: 0, touchAt: 0, mouseAt: 0, voice: null, warned: false, hinted: false, raf: 0, on: false, fns: null };
	var SPEEDS = [0.75, 1, 1.25, 1.5];
	var BLOCK = 'p,h1,h2,h3,h4,h5,h6,li,dt,dd,td,th,caption,figcaption,blockquote,label,legend,summary,pre';
	var INTER = 'a[href],button,[role="button"],[role="link"],input,select,textarea';
	var TAPPABLE = 'a[href],button,[role="button"],[role="link"]';

	function vozOk() { return !!(w.speechSynthesis && w.SpeechSynthesisUtterance); }
	function vozOn() { return on('voz') && vozOk(); }
	function modo() { return prefs.vozModo === 'clique' || prefs.vozModo === 'apontar' ? prefs.vozModo : cfg.vozModo; }
	function vel() { return SPEEDS.indexOf(prefs.vozVel) > -1 ? prefs.vozVel : cfg.vozVel; }
	function clean(t) { return String(t || '').replace(/\s+/g, ' ').trim(); }
	function ignorable(el) {
		return !el || el.nodeType !== 1 || el === host || el === d.documentElement || el === d.body ||
			!!(el.closest && el.closest('[vw],#vlibras-app-root,#vlibras-access-wrapper,script,style,noscript,[aria-hidden="true"]'));
	}
	function ownText(el) {
		for (var i = 0; i < el.childNodes.length; i++) {
			if (el.childNodes[i].nodeType === 3 && el.childNodes[i].nodeValue.trim()) { return true; }
		}
		return false;
	}
	function visible(el) {
		if (el.closest('[hidden]')) { return false; }
		var cs = w.getComputedStyle(el);
		if (cs.display === 'none' || cs.visibility === 'hidden') { return false; }
		// jsdom não calcula layout; no navegador, sem retângulos = invisível
		return !d.documentElement.getClientRects().length || el.getClientRects().length > 0;
	}
	function blockFrom(el) {
		if (el && el.nodeType !== 1) { el = el.parentElement; }
		if (ignorable(el)) { return null; }
		var b = el.closest(INTER);
		if (b && !ignorable(b)) { return b; }
		if (el.tagName === 'IMG') { return clean(el.alt) ? el : null; }
		b = el.closest(BLOCK);
		if (b && !ignorable(b)) { return b; }
		for (var x = el; x && x !== d.body; x = x.parentElement) {
			if (ownText(x)) { return clean(x.textContent).length <= 800 ? x : null; }
		}
		return null;
	}
	function cssEsc(v) { return w.CSS && w.CSS.escape ? w.CSS.escape(v) : String(v).replace(/["\\]/g, '\\$&'); }
	function textOf(el) {
		var k = tx.v, tag = el.tagName, name;
		if (tag === 'IMG') { return clean(el.alt) ? k.img + ': ' + clean(el.alt) : ''; }
		if (/^(INPUT|SELECT|TEXTAREA)$/.test(tag)) {
			var lb = el.id ? d.querySelector('label[for="' + cssEsc(el.id) + '"]') : null;
			name = clean(el.getAttribute('aria-label')) || clean(lb && lb.textContent) || clean(el.closest('label') && el.closest('label').textContent) || clean(el.getAttribute('placeholder'));
			return name ? k.campo + ': ' + name : '';
		}
		name = clean(el.getAttribute('aria-label')) || clean(el.innerText !== undefined ? el.innerText : el.textContent) || clean(el.textContent) || clean(el.getAttribute('title'));
		if (!name && el.querySelector) { var im = el.querySelector('img[alt]'); name = im ? clean(im.alt) : ''; }
		if (!name) { return ''; }
		if (el.matches('a[href],[role="link"]')) { return k.link + ': ' + name; }
		if (el.matches('button,[role="button"]')) { return k.botao + ': ' + name; }
		return name.slice(0, 2000);
	}
	function pickVoice() {
		try {
			var vs = w.speechSynthesis.getVoices() || [], L = tx.ui.lang.toLowerCase(), base = L.slice(0, 2), i, lg, exact = null, same = null;
			for (i = 0; i < vs.length; i++) {
				lg = String(vs[i].lang || '').toLowerCase().replace('_', '-');
				if (!exact && lg === L) { exact = vs[i]; }
				if (!same && lg.indexOf(base) === 0) { same = vs[i]; }
			}
			V.voice = exact || same;
		} catch (e) { V.voice = null; }
	}
	function chunksOf(t) {
		var parts = t.match(/[^.!?;:\n]+[.!?;:]?\s*/g) || [t], out = [], buf = '';
		parts.forEach(function (s) {
			if ((buf + s).length > 180 && buf) { out.push(buf); buf = ''; }
			buf += s;
		});
		if (buf.trim()) { out.push(buf); }
		return out;
	}

	/* destaque do bloco que está sendo lido */
	function hl(el) {
		V.hlEl = el || null;
		// acompanha mudanças de tamanho do bloco (fonte maior, rotação da tela, conteúdo que carrega depois)
		if (w.ResizeObserver) {
			if (!V.ro) { V.ro = new w.ResizeObserver(hlTick); }
			V.ro.disconnect();
			if (el) { V.ro.observe(el); }
		}
		hlPos();
	}
	function hlPos() {
		if (!nodes || !nodes.hl) { return; }
		var n = nodes.hl, el = V.hlEl;
		if (!el || !el.isConnected) { n.hidden = true; return; }
		var r = el.getBoundingClientRect();
		if (!r.width && !r.height) { n.hidden = true; return; }
		n.hidden = false;
		// contorno com folga, mas sempre dentro da tela (no celular o texto ocupa a largura toda)
		var W = d.documentElement.clientWidth || w.innerWidth, L = Math.max(3, r.left - 5), R = Math.min(W - 3, r.right + 5);
		n.style.left = L + 'px'; n.style.top = (r.top - 4) + 'px';
		n.style.width = Math.max(0, R - L) + 'px'; n.style.height = (r.height + 8) + 'px';
	}
	function hlTick() { if (!V.raf) { V.raf = (w.requestAnimationFrame || setTimeout)(function () { V.raf = 0; hlPos(); }); } }

	function speakEl(el, fromSeq) {
		var t = el ? textOf(el) : '';
		if (!t) { if (fromSeq) { seqStep(1); } return; }
		var ss = w.speechSynthesis, g = ++V.gen, cs = chunksOf(t);
		try { ss.cancel(); } catch (e) { /* ignora */ }
		V.cur = el; V.playing = true;
		if (!fromSeq) { V.seq = null; }
		hl(el);
		if (fromSeq) {
			var r = el.getBoundingClientRect();
			if (r.top < 60 || r.bottom > w.innerHeight - 90) {
				try { el.scrollIntoView({ block: 'center', behavior: w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); } catch (e) { /* ignora */ }
			}
		}
		cs.forEach(function (c, i) {
			var u = new w.SpeechSynthesisUtterance(c);
			u.lang = tx.ui.lang;
			if (V.voice) { u.voice = V.voice; }
			u.rate = vel();
			u.onerror = function (e) {
				if (g !== V.gen) { return; }
				if (e && e.error === 'not-allowed') {
					V.playing = false; playerState();
					if (!V.warned) { V.warned = true; toast(tx.v.ativar); }
				}
			};
			if (i === cs.length - 1) {
				u.onend = function () {
					if (g !== V.gen) { return; }
					if (V.seq) { seqStep(1); } else { V.playing = false; hl(null); playerState(); }
				};
			}
			ss.speak(u);
		});
		playerState();
	}
	function stopVoz() {
		V.gen++; V.playing = false; V.seq = null; V.cur = null;
		clearTimeout(V.dwell);
		try { if (w.speechSynthesis) { w.speechSynthesis.cancel(); } } catch (e) { /* ignora */ }
		hl(null); playerState();
	}
	function pauseVoz() {
		V.gen++; V.playing = false;
		try { w.speechSynthesis.cancel(); } catch (e) { /* ignora */ }
		playerState();
	}
	function pageBlocks() {
		var rt = d.querySelector('main,[role="main"]') || d.body, sel = BLOCK + ',' + TAPPABLE + ',img[alt]';
		return [].slice.call(rt.querySelectorAll(sel)).filter(function (el) {
			if (ignorable(el)) { return false; }
			if (rt === d.body && el.closest('nav,header,footer,aside,[role="navigation"],[role="banner"],[role="contentinfo"]')) { return false; }
			var up = el.parentElement && el.parentElement.closest(sel);
			if (up && rt.contains(up)) { return false; }
			return visible(el) && !!textOf(el);
		});
	}
	function seqStart(from) {
		var list = pageBlocks(), i = -1, k;
		if (!list.length) { return; }
		if (from) {
			for (k = 0; k < list.length; k++) {
				if (list[k] === from || list[k].contains(from) || from.contains(list[k])) { i = k; break; }
				if (from.compareDocumentPosition(list[k]) & 4) { i = k; break; }
			}
		}
		if (i < 0) {
			for (k = 0; k < list.length; k++) { if (list[k].getBoundingClientRect().bottom > 0) { i = k; break; } }
		}
		V.seq = list; V.idx = Math.max(0, i);
		speakEl(list[V.idx], true);
	}
	function seqStep(dir) {
		if (!V.seq) { seqStart(V.cur); if (!V.seq) { return; } if (dir < 0 && V.idx > 0) { V.idx--; speakEl(V.seq[V.idx], true); } else if (dir > 0) { seqStep(1); } return; }
		V.idx += dir;
		if (V.idx < 0) { V.idx = 0; }
		if (V.idx >= V.seq.length) { V.playing = false; V.seq = null; hl(null); playerState(); return; }
		speakEl(V.seq[V.idx], true);
	}

	/* eventos da página (só com o recurso ligado) */
	function vozInstall(onoff) {
		if (onoff && !V.on) {
			V.on = true;
			V.fns = {
				over: function (e) {
					if (modo() !== 'apontar' || Date.now() - V.touchAt < 900) { return; }
					var b = blockFrom(e.target);
					if (!b || b === V.hover) { return; }
					V.hover = b;
					clearTimeout(V.dwell);
					V.dwell = setTimeout(function () {
						if (V.hover === b && !(V.playing && V.cur === b)) { speakEl(b, false); }
					}, 400);
				},
				out: function (e) {
					if (V.hover && !(e.relatedTarget && e.relatedTarget.nodeType === 1 && V.hover.contains(e.relatedTarget))) { V.hover = null; clearTimeout(V.dwell); }
				},
				touch: function () { V.touchAt = Date.now(); },
				down: function () { V.mouseAt = Date.now(); },
				click: function (e) {
					var b = blockFrom(e.target), touch = Date.now() - V.touchAt < 900;
					if (!b) { return; }
					if (b.matches(TAPPABLE)) {
						if (!touch) { return; }
						if (V.tapEl === b && Date.now() - V.tapAt < 5000) { V.tapEl = null; return; }
						e.preventDefault(); e.stopPropagation();
						V.tapEl = b; V.tapAt = Date.now();
						speakEl(b, false);
						if (!V.hinted) { V.hinted = true; toast(tx.v.denovo); }
						return;
					}
					if (b.matches(INTER)) { return; }
					if (touch || modo() === 'clique') { speakEl(b, false); }
				},
				focus: function (e) {
					var t = e.target;
					if (ignorable(t) || Date.now() - V.mouseAt < 600 || Date.now() - V.touchAt < 900) { return; }
					var b = t.matches && t.matches(INTER) ? t : blockFrom(t);
					if (b) { speakEl(b, false); }
				},
				key: function (e) { if (e.key === 'Escape' && V.playing) { stopVoz(); } },
				scroll: hlTick
			};
			d.addEventListener('mouseover', V.fns.over, true);
			d.addEventListener('mouseout', V.fns.out, true);
			d.addEventListener('touchstart', V.fns.touch, { capture: true, passive: true });
			d.addEventListener('mousedown', V.fns.down, true);
			d.addEventListener('click', V.fns.click, true);
			d.addEventListener('focusin', V.fns.focus, true);
			d.addEventListener('keydown', V.fns.key, true);
			w.addEventListener('scroll', V.fns.scroll, { passive: true, capture: true });
			w.addEventListener('resize', V.fns.scroll);
			pickVoice();
			try { w.speechSynthesis.addEventListener('voiceschanged', pickVoice); } catch (e) { /* ignora */ }
		} else if (!onoff && V.on) {
			V.on = false;
			d.removeEventListener('mouseover', V.fns.over, true);
			d.removeEventListener('mouseout', V.fns.out, true);
			d.removeEventListener('touchstart', V.fns.touch, true);
			d.removeEventListener('mousedown', V.fns.down, true);
			d.removeEventListener('click', V.fns.click, true);
			d.removeEventListener('focusin', V.fns.focus, true);
			d.removeEventListener('keydown', V.fns.key, true);
			w.removeEventListener('scroll', V.fns.scroll, true);
			w.removeEventListener('resize', V.fns.scroll);
			try { w.speechSynthesis.removeEventListener('voiceschanged', pickVoice); } catch (e) { /* ignora */ }
			V.fns = null; V.hover = null;
		}
	}
	function vozSync() {
		var ok = vozOn();
		if (on('voz') && !vozOk()) { prefs.voz = false; say(tx.ui.semvoz); }
		vozInstall(ok);
		if (!ok && (V.playing || V.cur)) { stopVoz(); }
		if (nodes && nodes.pl) { nodes.pl.hidden = !ok; }
		playerState();
	}

	/* mini player */
	// toque = aparelho sem mouse (celular/tablet); notebook com tela de toque continua "apontar"
	function isTouch() { return !!(w.matchMedia && w.matchMedia('(pointer: coarse)').matches && !w.matchMedia('(any-pointer: fine)').matches); }
	function playerState() {
		if (!nodes || !nodes.pl) { return; }
		var b = nodes.plb, k = tx.v;
		b.play.innerHTML = svg(V.playing ? 'pause' : 'play', 18);
		b.play.setAttribute('aria-label', V.playing ? k.pause : k.play);
		b.play.title = V.playing ? k.pause : k.play;
		var v = vel();
		b.vel.textContent = String(v).replace('.', ',') + '×';
		b.vel.setAttribute('aria-label', k.vel + ' ' + String(v).replace('.', ','));
		b.modo.setAttribute('aria-pressed', modo() === 'apontar' ? 'true' : 'false');
		nodes.plt.textContent = V.playing ? k.lendo : (isTouch() ? k.toque : (modo() === 'apontar' ? k.aponte : k.clique));
	}
	function playerAct(a) {
		if (a === 'play') { if (V.playing) { pauseVoz(); } else if (V.seq && V.seq[V.idx]) { speakEl(V.seq[V.idx], true); } else { seqStart(V.cur); } }
		else if (a === 'prev') { seqStep(-1); }
		else if (a === 'next') { seqStep(1); }
		else if (a === 'vel') {
			prefs.vozVel = SPEEDS[(SPEEDS.indexOf(vel()) + 1) % SPEEDS.length];
			save();
			if (V.playing && V.cur) { speakEl(V.cur, !!V.seq); }
		}
		else if (a === 'modo') { prefs.vozModo = modo() === 'apontar' ? 'clique' : 'apontar'; save(); V.hover = null; }
		else if (a === 'fechar') { prefs.voz = false; stopVoz(); apply(); say(tx.f.voz + ': ' + tx.ui.off); return; }
		playerState();
	}

	/* ---------- Régua de leitura ---------- */
	function ruler(onoff) {
		var t = nodes.rt, b = nodes.rb;
		if (onoff && !rulerFn) {
			rulerFn = function (e) {
				var y = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;
				t.style.height = Math.max(0, y - 28) + 'px';
				b.style.top = (y + 28) + 'px';
			};
			t.hidden = b.hidden = false;
			rulerFn({ clientY: Math.round(w.innerHeight / 2) });
			d.addEventListener('mousemove', rulerFn);
			d.addEventListener('touchmove', rulerFn, { passive: true });
		} else if (!onoff && rulerFn) {
			d.removeEventListener('mousemove', rulerFn);
			d.removeEventListener('touchmove', rulerFn);
			rulerFn = null;
			t.hidden = b.hidden = true;
		}
	}

	/* ---------- Libras (VLibras, governo federal) ---------- */
	// Só carrega o serviço quando o visitante clica nas mãos.
	// VLibras 7 publicado (vlibras.gov.br/app): new VLibras.Widget({...}) e window.VLibrasWidget.open().
	// Não há "fechar" na API: fecha-se marcando #vlibras-app-root[data-active="false"] (o app observa esse atributo).
	// O botão próprio dele (#vlibras-access-wrapper) é escondido por CSS; o nosso substitui.
	var libState = 0; // 0 nada, 1 carregando, 2 pronto
	function libBusy(on) { if (nodes && nodes.lib) { nodes.lib.setAttribute('aria-busy', on ? 'true' : 'false'); } }
	function libApi() { var v = w.VLibrasWidget; return v && typeof v.open === 'function' ? v : null; }
	// Janela aberta? O app marca #vlibras-app com "inert" quando está fechado (inclusive pelo X dele).
	function libIsOpen() {
		var r = d.getElementById('vlibras-app-root');
		if (!r) { return false; }
		var app = r.shadowRoot && r.shadowRoot.getElementById ? r.shadowRoot.getElementById('vlibras-app') : null;
		if (app) { return !app.hasAttribute('inert'); }
		return r.getAttribute('data-active') === 'true';
	}
	function libToggle(api) {
		var r = d.getElementById('vlibras-app-root');
		if (libIsOpen()) { if (r) { r.setAttribute('data-active', 'false'); } libSync(); return; }
		// Fechado pelo X do VLibras, o data-active continua "true"; zera antes para o app perceber a mudança.
		if (r) { r.setAttribute('data-active', 'false'); r.setAttribute('data-active', 'true'); } else { api.open(); }
		libSync();
	}
	// Enquanto a janela do VLibras está aberta, o nosso botão sai da frente (a janela tem o X dela).
	var libTimer = null;
	function libSync() {
		if (!nodes || !nodes.dock) { return; }
		var open = libIsOpen();
		nodes.dock.style.display = open ? 'none' : '';
		if (open && !nodes.panel.hidden) { closePanel(false); }
		if (!libTimer) { libTimer = setInterval(libSync, 400); }
	}
	function libFail(why) {
		libState = 0; libBusy(false); toast(tx.ui.libfalha);
		try { console.warn('[Flux Acessibilidade] VLibras não abriu: ' + (why || 'motivo desconhecido')); } catch (e) { /* ignora */ }
	}
	function libWaitApp() {
		var tries = 0;
		(function chk() {
			if (d.getElementById('vlibras-app-root')) { libState = 2; libBusy(false); libSync(); return; }
			if (++tries > 75) { libFail('o app do VLibras não apareceu em 15 s (rede lenta ou bloqueio do vlibras-plugin-app.js).'); return; }
			setTimeout(chk, 200);
		})();
	}
	function libMarkup() {
		// VLibras antigo (até 6.x): marcação [vw]; o botão dele fica oculto e é acionado pelo nosso.
		libEl = d.querySelector('[vw]');
		if (!libEl) {
			libEl = d.createElement('div');
			libEl.setAttribute('vw', '');
			libEl.className = 'enabled';
			libEl.innerHTML = '<div vw-access-button class="active"></div><div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div>';
			d.body.appendChild(libEl);
		}
	}
	function libLegacy() {
		var el = libEl, tries = 0;
		(function chk() {
			var b = el.querySelector('[vw-access-button]');
			if (b && b.children.length) { libState = 2; libBusy(false); b.click(); return; }
			if (++tries > 75) { libFail('VLibras antigo não respondeu em 15 s.'); return; }
			setTimeout(chk, 200);
		})();
	}
	function openLibras() {
		var api = libApi();
		if (libState === 2 && api) { libToggle(api); return; }
		if (libState === 2 && libEl) { var b = libEl.querySelector('[vw-access-button]'); if (b) { b.click(); } return; }
		if (libState === 1) { return; }
		libState = 1;
		libBusy(true);
		var base = cfg.vlibrasUrl.replace(/\/$/, '');
		function start() {
			try {
				var pos = cfg.posicao === 'esquerda' ? 'L' : 'R';
				// O carregador do VLibras 7+ cria window.VLibrasWidget assim que é lido.
				if (w.VLibrasWidget) {
					new w.VLibras.Widget({ rootPath: base, showButton: false, position: pos });
					api = libApi();
					if (api) { api.open(); libWaitApp(); return; }
				}
				// Versões antigas: precisam da marcação [vw] antes e iniciam no window.onload.
				libMarkup();
				var prev = w.onload;
				new w.VLibras.Widget(base);
				if (d.readyState === 'complete' && typeof w.onload === 'function' && w.onload !== prev) { w.onload(); }
				libLegacy();
			} catch (e) { libFail('erro ao iniciar: ' + (e && e.message)); }
		}
		if (w.VLibras && w.VLibras.Widget) { start(); return; }
		var sc = d.createElement('script');
		sc.src = base + '/vlibras-plugin.js';
		sc.onload = start;
		sc.onerror = function () { libFail('não foi possível baixar ' + sc.src + ' (rede, bloqueador de anúncios ou política de segurança do site).'); };
		d.head.appendChild(sc);
	}

	/* ---------- Aviso visível curto ---------- */
	function toast(msg) {
		say(msg);
		if (!nodes || !nodes.tt) { return; }
		nodes.tt.textContent = msg;
		nodes.tt.hidden = false;
		// com o mini player na tela, o aviso aparece logo acima dele (não por cima)
		place();
		if (nodes.pl && !nodes.pl.hidden) {
			var pr = nodes.pl.getBoundingClientRect(), ts = nodes.tt.style;
			if (pr.height) { ts.top = ''; ts.transform = ''; ts.bottom = Math.round(w.innerHeight - pr.top + 10) + 'px'; }
		}
		clearTimeout(nodes.tt.t);
		nodes.tt.t = setTimeout(function () { nodes.tt.hidden = true; }, 5000);
	}

	/* ---------- Aplicar preferências ---------- */
	function apply() {
		var h = d.documentElement, c = h.classList;
		if (on('contraste')) { markBg(); } else { clearBg(); }
		c.toggle('fxa-hc', on('contraste'));
		c.toggle('fxa-links', on('links'));
		c.toggle('fxa-titulos', on('titulos'));
		c.toggle('fxa-legivel', on('legivel'));
		c.toggle('fxa-espaco', on('espacamento'));
		c.toggle('fxa-cursor', on('cursor'));
		c.toggle('fxa-pausa', on('animacoes'));
		// Filtros numa camada sobreposta (backdrop-filter): inverte também o fundo da página
		// e não cria bloco de contenção, então o botão e elementos fixos do site ficam no lugar.
		var fl = [];
		if (on('inverter')) { fl.push('invert(1) hue-rotate(180deg)'); }
		if (on('cinza')) { fl.push('grayscale(1)'); }
		if (nodes && nodes.fx) {
			var fv = fl.join(' ');
			nodes.fx.hidden = !fl.length;
			nodes.fx.style.setProperty('-webkit-backdrop-filter', fv || 'none');
			nodes.fx.style.setProperty('backdrop-filter', fv || 'none');
		}
		if (on('animacoes')) { [].forEach.call(d.querySelectorAll('video'), function (v) { try { v.pause(); } catch (e) { /* ignora */ } }); }
		scaleText();
		ruler(on('regua'));
		vozSync();
		refresh();
		save();
	}
	function refresh() {
		if (!nodes) { return; }
		cfg.recursos.forEach(function (k) {
			var b = nodes.opts[k];
			if (b) { b.setAttribute('aria-pressed', prefs[k] ? 'true' : 'false'); }
		});
		if (nodes.val) { nodes.val.textContent = Math.round((1 + prefs.fonte * 0.1) * 100) + '%'; }
	}
	function say(msg) { var n = nodes && nodes.live; if (n) { n.textContent = ''; setTimeout(function () { n.textContent = msg; }, 30); } }

	function toggle(k) {
		prefs[k] = !prefs[k];
		if (prefs[k] && k === 'contraste') { prefs.inverter = false; }
		if (prefs[k] && k === 'inverter') { prefs.contraste = false; }
		if (k === 'voz' && !prefs.voz) { stopVoz(); }
		apply();
		say(tx.f[k] + ': ' + (prefs[k] ? tx.ui.on : tx.ui.off));
	}
	function resetAll() {
		stopVoz();
		prefs = emptyPrefs();
		apply();
		say(tx.ui.zerado);
	}

	/* ---------- Interface (Shadow DOM) ---------- */
	function panelCss() {
		var dark = cfg.tema === 'escuro' || (cfg.tema === 'auto' && w.matchMedia && w.matchMedia('(prefers-color-scheme: dark)').matches);
		var a = cfg.cor, on_ = lum(a) > 0.179 ? '#111111' : '#ffffff';
		var v = dark ? ['#171a20', '#f4f6f8', '#98a2b3', '#2a303a', '#1d2129', '#222733'] : ['#ffffff', '#17202a', '#667085', '#d9dfe7', '#f6f8fa', '#eef2f6'];
		var z = cfg.zindex, s = cfg.tamanho, h = Math.round(s / 2) + 'px', R = cfg.posicao === 'direita';
		var rad = cfg.estilo === 'flutuante' ? h : (R ? h + ' 0 0 ' + h : '0 ' + h + ' ' + h + ' 0');
		var a2 = shade(a), on2 = on_;
		return ':host{all:initial}' +
			'*{box-sizing:border-box}' +
			'.w{--a:' + a + ';--on:' + on_ + ';--ar:' + rgbOf(a) + ';--bg:' + v[0] + ';--fg:' + v[1] + ';--mu:' + v[2] + ';--bd:' + v[3] + ';--so:' + v[4] + ';--ho:' + v[5] + ';font:14px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:var(--fg)}' +
			'button{font:inherit;color:inherit;cursor:pointer}' +
			'button:focus-visible,a:focus-visible{outline:3px solid var(--fg);outline-offset:2px;box-shadow:0 0 0 5px rgba(var(--ar),.55)}' +
			'.dock{position:fixed;z-index:' + z + ';display:flex;flex-direction:column;width:' + s + 'px;overflow:hidden;border-radius:' + rad + ';box-shadow:0 6px 18px rgba(0,0,0,.28)}' +
			'.fab,.lib{width:' + s + 'px;height:' + s + 'px;border:0;margin:0;padding:0;display:flex;align-items:center;justify-content:center;border-radius:0;transition:filter .15s ease}' +
			'.fab{background:var(--a);color:var(--on)}' +
			'.lib{background:' + a2 + ';color:' + on2 + '}' +
			'.fab:hover,.lib:hover{filter:brightness(1.12)}' +
			'.fab:focus-visible,.lib:focus-visible{outline:3px solid currentColor;outline-offset:-6px;box-shadow:none}' +
			'.fab svg{width:' + Math.round(s * 0.66) + 'px;height:' + Math.round(s * 0.66) + 'px}' +
			'.lib svg{width:' + Math.round(s * 0.74) + 'px;height:' + Math.round(s * 0.74) + 'px}' +
			'.lib[aria-busy="true"] svg{animation:fxp 1s ease-in-out infinite}' +
			'@keyframes fxp{50%{opacity:.35}}' +
			'.fab img{width:' + Math.round(s * 0.66) + 'px;height:' + Math.round(s * 0.66) + 'px;object-fit:contain;border-radius:50%}' +
			'.p{position:fixed;z-index:' + z + ';width:min(320px,calc(100vw - 24px));max-height:calc(100vh - 24px);overflow:auto;background:var(--bg);border:1px solid var(--bd);border-radius:16px;box-shadow:0 18px 55px rgba(0,0,0,.28);padding:14px}' +
			'.p[hidden],.rt[hidden],.rb[hidden],.fx[hidden],.hl[hidden],.pl[hidden]{display:none}' +
			'.h{display:flex;align-items:center;justify-content:space-between;margin:0 0 12px}' +
			'.h strong{font-size:16px;font-weight:700}' +
			'.x{background:transparent;border:0;border-radius:8px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;color:var(--mu);padding:0}' +
			'.x:hover{background:var(--ho);color:var(--fg)}' +
			'.fs{display:flex;align-items:center;justify-content:space-between;gap:10px;background:var(--so);border:1px solid var(--bd);border-radius:12px;padding:8px 10px;margin:0 0 10px}' +
			'.fs span{font-size:13px;font-weight:600}' +
			'.fs div{display:flex;align-items:center;gap:6px}' +
			'.fs output{min-width:44px;text-align:center;font-size:13px;font-weight:700}' +
			'.sb{width:36px;height:36px;border-radius:9px;border:1px solid var(--bd);background:var(--bg);font-weight:700;font-size:13px;padding:0}' +
			'.sb:hover{background:var(--ho)}' +
			'.g{display:grid;grid-template-columns:1fr 1fr;gap:8px}' +
			'.o{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-height:72px;padding:10px 6px;text-align:center;font-size:12.5px;font-weight:600;line-height:1.25;background:var(--so);border:1px solid var(--bd);border-radius:12px}' +
			'.o:hover{background:var(--ho)}' +
			'.o[aria-pressed="true"]{background:var(--a);border-color:var(--a);color:var(--on)}' +
			'.f{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:12px 0 0;padding:10px 0 0;border-top:1px solid var(--bd);font-size:12px}' +
			'.f a{color:var(--mu);text-decoration:underline}' +
			'.r{display:inline-flex;align-items:center;gap:6px;background:transparent;border:1px solid var(--bd);border-radius:9px;padding:6px 10px;font-size:12px;font-weight:600}' +
			'.r:hover{background:var(--ho)}' +
			'.tt{position:fixed;z-index:' + z + ';max-width:min(300px,calc(100vw - 24px));padding:10px 12px;border-radius:10px;background:#17202a;color:#fff;font-size:13px;box-shadow:0 10px 30px rgba(0,0,0,.3)}' +
			'.tt[hidden]{display:none}' +
			'.rt,.rb{position:fixed;left:0;right:0;background:rgba(0,0,0,.6);pointer-events:none;z-index:' + (z - 1) + '}' +
			'.hl{position:fixed;z-index:' + (z - 3) + ';pointer-events:none;border:2px solid var(--a);background:rgba(var(--ar),.10);border-radius:8px;box-shadow:0 0 0 4px rgba(var(--ar),.16);transition:left .12s,top .12s,width .12s,height .12s}' +
			'.pl{position:fixed;z-index:' + z + ';bottom:12px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:2px;padding:5px;background:var(--bg);color:var(--fg);border:1px solid var(--bd);border-radius:999px;box-shadow:0 10px 30px rgba(0,0,0,.22);max-width:calc(100vw - 16px)}' +
			'.pl button{width:40px;height:40px;flex:0 0 40px;border-radius:50%;border:0;background:transparent;display:flex;align-items:center;justify-content:center;padding:0;color:var(--fg)}' +
			'.pl button:hover{background:var(--ho)}' +
			'.pl .pp{background:var(--a);color:var(--on)}' +
			'.pl .pp:hover{background:var(--a);filter:brightness(1.1)}' +
			'.pl .vel{width:auto;flex-basis:auto;min-width:46px;padding:0 8px;border-radius:999px;font-size:13px;font-weight:700}' +
			'.pl [aria-pressed="true"]{color:var(--a);background:rgba(var(--ar),.12)}' +
			'.pl .sep{width:1px;height:22px;background:var(--bd);margin:0 4px}' +
			'.plt{font-size:13px;font-weight:600;color:var(--mu);padding:0 10px 0 12px;white-space:nowrap}' +
			'@media (max-width:600px){.pl{left:8px;right:' + (cfg.vertical === 'baixo' && cfg.posicao === 'direita' ? (s + (cfg.estilo === 'borda' ? 0 : cfg.margem) + 10) : 8) + 'px;' + (cfg.vertical === 'baixo' && cfg.posicao === 'esquerda' ? 'left:' + (s + (cfg.estilo === 'borda' ? 0 : cfg.margem) + 10) + 'px;right:8px;' : '') + 'transform:none;justify-content:space-between;bottom:' + cfg.margem + 'px}.plt{display:none}.pl .sep{display:none}}' +
			'.fx{position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:' + (z - 2) + '}' +
			'.rt{top:0;height:0}.rb{top:100%;bottom:0}' +
			'.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}' +
			'@media (prefers-reduced-motion:reduce){.fab,.lib{transition:none}.lib[aria-busy="true"] svg{animation:none}}';
	}

	function dockH() { return cfg.tamanho * (nodes && nodes.lib ? 2 : 1); }
	function place() {
		var vm = cfg.margem, hm = cfg.estilo === 'borda' ? 0 : cfg.margem, pm = Math.max(hm, 12);
		var s = cfg.tamanho, H = dockH(), gap = 10, R = cfg.posicao === 'direita';
		var f = nodes.dock.style, p = nodes.panel.style;
		f.left = f.right = f.top = f.bottom = f.transform = '';
		p.left = p.right = p.top = p.bottom = p.transform = p.maxHeight = '';
		var t = nodes.tt.style;
		t.left = t.right = t.top = t.bottom = t.transform = '';
		f[R ? 'right' : 'left'] = hm + 'px';
		p[R ? 'right' : 'left'] = pm + 'px';
		t[R ? 'right' : 'left'] = (hm + s + gap) + 'px';
		if (cfg.vertical === 'cima') { t.top = vm + 'px'; } else if (cfg.vertical === 'meio') { t.top = '50%'; t.transform = 'translateY(-50%)'; } else { t.bottom = vm + 'px'; }
		if (cfg.vertical === 'meio') {
			f.top = '50%'; f.transform = 'translateY(-50%)';
			p.top = '50%'; p.transform = 'translateY(-50%)';
			p[R ? 'right' : 'left'] = (hm + s + gap) + 'px';
		} else if (cfg.vertical === 'cima') {
			f.top = vm + 'px';
			p.top = (vm + H + gap) + 'px';
			p.maxHeight = 'calc(100vh - ' + (vm + H + gap + 12) + 'px)';
		} else {
			f.bottom = vm + 'px';
			p.bottom = (vm + H + gap) + 'px';
			p.maxHeight = 'calc(100vh - ' + (vm + H + gap + 12) + 'px)';
		}
	}

	/* ---------- Desvio de botões flutuantes do site (WhatsApp, chat, cookies) ---------- */
	function fixedAncestor(el) {
		while (el && el !== d.body && el !== d.documentElement) {
			var pos = w.getComputedStyle(el).position;
			if (pos === 'fixed' || pos === 'sticky') { return el; }
			el = el.parentElement;
		}
		return null;
	}
	function dodge() {
		if (!nodes || !cfg.desviar || cfg.vertical === 'meio' || !d.elementsFromPoint) { return; }
		place();
		var fr = nodes.dock.getBoundingClientRect(), hit = null, list, i, el, fx;
		list = d.elementsFromPoint(fr.left + fr.width / 2, fr.top + fr.height / 2) || [];
		for (i = 0; i < list.length; i++) {
			el = list[i];
			if (el === host || el === d.documentElement || el === d.body || (libEl && libEl.contains(el))) { continue; }
			fx = fixedAncestor(el);
			if (fx) { hit = fx; break; }
		}
		if (!hit) { return; }
		var r = hit.getBoundingClientRect(), gap = 10, s = dockH(), H = w.innerHeight;
		var f = nodes.dock.style, p = nodes.panel.style, v;
		if (cfg.vertical === 'baixo') {
			v = Math.round(H - r.top + gap);
			if (v + s > H * 0.6) { return; }
			f.bottom = v + 'px';
			p.bottom = (v + s + gap) + 'px';
			p.maxHeight = 'calc(100vh - ' + (v + s + gap + 12) + 'px)';
		} else {
			v = Math.round(r.bottom + gap);
			if (v + s > H * 0.6) { return; }
			f.top = v + 'px';
			p.top = (v + s + gap) + 'px';
			p.maxHeight = 'calc(100vh - ' + (v + s + gap + 12) + 'px)';
		}
	}

	function build() {
		tx = lang();
		host = d.createElement('div');
		host.className = 'fxa-host';
		host.setAttribute('data-fxa', '');
		// Blindagem: estilos do site (transform, filter, z-index, position em div/body)
		// não podem deslocar nem esconder o botão. Estilo inline !important vence o CSS do site.
		host.setAttribute('style', 'all:initial !important');
		root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
		var title = cfg.titulo || tx.ui.titulo;
		var html = '<style>' + panelCss() + '</style><div class="w">' +
			'<div class="dock"><button type="button" class="fab" aria-haspopup="dialog" aria-expanded="false" aria-controls="fxa-p"></button>' +
			(cfg.recursos.indexOf('libras') > -1 ? '<button type="button" class="lib" aria-busy="false">' + svg('maos', 30) + '</button>' : '') + '</div>' +
			'<section class="p" id="fxa-p" role="dialog" aria-modal="false" hidden>' +
			'<div class="h"><strong></strong><button type="button" class="x">' + svg('x', 18) + '</button></div>';
		if (cfg.recursos.indexOf('fonte') > -1) {
			html += '<div class="fs"><span>' + tx.ui.texto + '</span><div><button type="button" class="sb" data-s="-1">A−</button><output aria-live="polite">100%</output><button type="button" class="sb" data-s="1">A+</button></div></div>';
		}
		html += '<div class="g">';
		cfg.recursos.forEach(function (k) {
			if (k === 'fonte' || k === 'libras') { return; }
			html += '<button type="button" class="o" data-k="' + k + '" aria-pressed="false">' + svg(k, 22) + '<span>' + tx.f[k] + '</span></button>';
		});
		html += '</div><div class="f"><button type="button" class="r">' + svg('reset', 14) + '<span>' + tx.ui.restaurar + '</span></button><span class="decl"></span></div>' +
			'</section><div class="hl" hidden></div>' +
			'<div class="pl" role="toolbar" hidden><span class="plt" aria-live="polite"></span>' +
			'<button type="button" data-a="prev">' + svg('prev', 18) + '</button>' +
			'<button type="button" class="pp" data-a="play"></button>' +
			'<button type="button" data-a="next">' + svg('next', 18) + '</button>' +
			'<span class="sep" aria-hidden="true"></span>' +
			'<button type="button" class="vel" data-a="vel"></button>' +
			'<button type="button" data-a="modo">' + svg('cursor', 18) + '</button>' +
			'<button type="button" data-a="fechar">' + svg('x', 18) + '</button></div>' +
			'<div class="fx" hidden></div><div class="rt" hidden></div><div class="rb" hidden></div><div class="tt" hidden></div><div class="sr" role="status" aria-live="polite"></div></div>';
		root.innerHTML = html;

		nodes = {
			dock: root.querySelector('.dock'), fab: root.querySelector('.fab'), lib: root.querySelector('.lib'), panel: root.querySelector('.p'), live: root.querySelector('.sr'),
			rt: root.querySelector('.rt'), rb: root.querySelector('.rb'), fx: root.querySelector('.fx'), hl: root.querySelector('.hl'), pl: root.querySelector('.pl'), plt: root.querySelector('.plt'), plb: {}, tt: root.querySelector('.tt'), val: root.querySelector('.fs output'), opts: {}
		};
		nodes.panel.querySelector('.h strong').textContent = title;
		nodes.panel.setAttribute('aria-label', title);
		nodes.fab.setAttribute('aria-label', tx.ui.abrir);
		nodes.fab.setAttribute('title', title + ' (Alt+Shift+A)');
		nodes.fab.setAttribute('aria-keyshortcuts', 'Alt+Shift+A');
		var rb = root.querySelector('.r');
		rb.setAttribute('title', tx.ui.restaurar + ' (Alt+Shift+0)');
		rb.setAttribute('aria-keyshortcuts', 'Alt+Shift+0');
		if (cfg.icone) {
			var im = d.createElement('img'); im.src = cfg.icone; im.alt = ''; nodes.fab.appendChild(im);
		} else { nodes.fab.innerHTML = svg('fab', 28); }
		root.querySelector('.x').setAttribute('aria-label', tx.ui.fechar);
		nodes.pl.setAttribute('aria-label', tx.v.player);
		[].forEach.call(nodes.pl.querySelectorAll('button'), function (b) {
			var a = b.getAttribute('data-a'), lbl = { prev: tx.v.prev, next: tx.v.next, modo: tx.v.modo, fechar: tx.v.fechar }[a];
			nodes.plb[a] = b;
			if (lbl) { b.setAttribute('aria-label', lbl); b.title = lbl; }
			b.addEventListener('click', function () { playerAct(a); });
		});
		if (nodes.lib) {
			nodes.lib.setAttribute('aria-label', tx.ui.libras);
			nodes.lib.setAttribute('title', tx.ui.libras);
			nodes.lib.addEventListener('click', function () { closePanel(false); openLibras(); });
		}
		if (cfg.declaracao) {
			var a = d.createElement('a'); a.href = cfg.declaracao; a.textContent = tx.ui.declaracao; a.target = '_blank'; a.rel = 'noopener';
			root.querySelector('.decl').appendChild(a);
		}
		[].forEach.call(root.querySelectorAll('.o'), function (b) { nodes.opts[b.getAttribute('data-k')] = b; b.addEventListener('click', function () { toggle(b.getAttribute('data-k')); }); });
		[].forEach.call(root.querySelectorAll('.sb'), function (b) {
			b.addEventListener('click', function () {
				prefs.fonte = Math.max(0, Math.min(5, prefs.fonte + parseInt(b.getAttribute('data-s'), 10)));
				apply();
				say(tx.ui.texto + ': ' + Math.round((1 + prefs.fonte * 0.1) * 100) + '%');
			});
		});
		root.querySelector('.r').addEventListener('click', resetAll);
		root.querySelector('.x').addEventListener('click', function () { closePanel(true); });
		nodes.fab.addEventListener('click', function () { if (nodes.panel.hidden) { openPanel(); } else { closePanel(true); } });

		keyFn = function (e) {
			if (e.altKey && e.shiftKey && !e.ctrlKey && !e.metaKey) {
				if (e.code === 'Digit0' || e.key === '0' || e.key === ')') { e.preventDefault(); resetAll(); return; }
				if (e.code === 'KeyA' || e.key === 'A' || e.key === 'a') {
					e.preventDefault();
					if (nodes.panel.hidden) { openPanel(); } else { closePanel(true); }
					return;
				}
			}
			if (nodes.panel.hidden) { return; }
			if (e.key === 'Escape') { closePanel(true); return; }
			if (e.key !== 'Tab') { return; }
			var f = [].slice.call(nodes.panel.querySelectorAll('button,a[href]')).concat([nodes.fab]);
			var cur = root.activeElement || d.activeElement;
			var first = f[0], last = f[f.length - 1];
			if (e.shiftKey && cur === first) { e.preventDefault(); last.focus(); }
			else if (!e.shiftKey && cur === last) { e.preventDefault(); first.focus(); }
		};
		d.addEventListener('keydown', keyFn, true);
		place();
		// Fora do <body>: transform/filter/zoom aplicados no body pelo tema não afetam o widget.
		d.documentElement.appendChild(host);
	}
	function openPanel() {
		nodes.panel.hidden = false;
		nodes.fab.setAttribute('aria-expanded', 'true');
		var f = nodes.panel.querySelector('.sb,.o');
		if (f) { f.focus(); }
	}
	function closePanel(focusFab) {
		nodes.panel.hidden = true;
		nodes.fab.setAttribute('aria-expanded', 'false');
		if (focusFab) { nodes.fab.focus(); }
	}

	/* ---------- API ---------- */
	function init(user) {
		destroy();
		cfg = normalize(user);
		prefs = load();
		styleEl = d.createElement('style');
		styleEl.id = 'fxa-global';
		styleEl.textContent = globalCss();
		d.head.appendChild(styleEl);
		build();
		apply();
		// Botões de WhatsApp/chat costumam carregar depois: confere algumas vezes e ao redimensionar.
		[0, 1200, 3500, 8000].forEach(function (t) { dodgeTimers.push(setTimeout(dodge, t)); });
		resizeFn = function () { clearTimeout(resizeFn.t); resizeFn.t = setTimeout(dodge, 200); };
		w.addEventListener('resize', resizeFn);
	}
	function destroy() {
		if (!host && !styleEl) { return; }
		stopVoz();
		vozInstall(false);
		ruler(false);
		var h = d.documentElement;
		['fxa-hc', 'fxa-links', 'fxa-titulos', 'fxa-legivel', 'fxa-espaco', 'fxa-cursor', 'fxa-pausa'].forEach(function (c) { h.classList.remove(c); });
		h.style.removeProperty('filter');
		clearBg();
		prefs = emptyPrefs();
		scaleText();
		if (libEl) { libEl.style.display = 'none'; }
		if (keyFn) { d.removeEventListener('keydown', keyFn, true); keyFn = null; }
		dodgeTimers.forEach(clearTimeout); dodgeTimers = [];
		if (libTimer) { clearInterval(libTimer); libTimer = null; }
		if (resizeFn) { clearTimeout(resizeFn.t); w.removeEventListener('resize', resizeFn); resizeFn = null; }
		if (host && host.parentNode) { host.parentNode.removeChild(host); }
		if (styleEl && styleEl.parentNode) { styleEl.parentNode.removeChild(styleEl); }
		host = root = nodes = styleEl = null;
	}

	w.FluxA11y = {
		version: VERSION,
		init: init,
		destroy: destroy,
		open: function () { if (nodes) { openPanel(); } },
		close: function () { if (nodes) { closePanel(false); } },
		reset: function () { if (nodes) { resetAll(); } }
	};

	/* ---------- Inicialização automática ---------- */
	var script = d.currentScript || d.querySelector('script[src*="flux-a11y"]');
	function attrs() {
		var o = {};
		if (!script) { return o; }
		Object.keys(DEF).forEach(function (k) {
			var n = 'data-' + k.replace(/[A-Z]/g, function (m) { return '-' + m.toLowerCase(); });
			if (script.hasAttribute(n)) { o[k] = script.getAttribute(n); }
		});
		return o;
	}
	function auto() {
		if (w.FluxA11yManual || (script && script.hasAttribute('data-manual'))) { return; }
		var a = attrs(), base = w.FluxA11yConfig, url = script && script.getAttribute('data-config');
		if (url && w.fetch) {
			w.fetch(url, { credentials: 'omit' }).then(function (r) { return r.json(); })
				.then(function (j) { init(merge(base, j, a)); })
				.catch(function () { init(merge(base, a)); });
		} else { init(merge(base, a)); }
	}
	if (d.readyState === 'loading') { d.addEventListener('DOMContentLoaded', auto); } else { auto(); }
})(window, document);
