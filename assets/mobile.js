// mobile.js — bottom nav, drawer lateral, modais e dark mode para todas as páginas
// Centralizado aqui: muda em 1 lugar, reflete em todo o site.

(function () {

  // ── ÍCONES DE TEMA ───────────────────────────────────────────────

  var MOON_SVG = '<svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
  var SUN_SVG  = '<svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke-linecap="round" stroke-linejoin="round"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';

  // ── DARK MODE — LEITURA INICIAL ──────────────────────────────────
  // (o anti-flash já está no <head> de cada página; aqui confirmamos o estado)

  var _saved = '';
  try { _saved = localStorage.getItem('gaTheme') || ''; } catch (e) {}
  var _escuro = _saved === 'dark' ? true
              : _saved === 'light' ? false
              : !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Garante consistência (pode ser que o script inline do <head> já aplicou)
  if (_escuro) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  function isDark() { return document.documentElement.classList.contains('dark'); }

  function aplicarTema(dark) {
    // Ativa transição suave
    document.documentElement.classList.add('ga-tema-transicao');
    setTimeout(function () { document.documentElement.classList.remove('ga-tema-transicao'); }, 250);

    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    var icone  = dark ? SUN_SVG  : MOON_SVG;
    var titulo = dark ? 'Mudar para modo claro' : 'Mudar para modo escuro';

    // Atualiza todos os botões toggle (bottom nav, drawer, desktop nav)
    document.querySelectorAll('[data-dark-toggle]').forEach(function (btn) {
      btn.innerHTML = icone;
      btn.title = titulo;
      btn.setAttribute('aria-label', titulo);
    });

    // Dark mode nos elementos injetados com inline style
    _aplicarDarkInjetados(dark);
  }

  function toggleTema() {
    var novo = !isDark();
    try { localStorage.setItem('gaTheme', novo ? 'dark' : 'light'); } catch (e) {}
    aplicarTema(novo);
  }

  // Ajusta cores dos elementos injetados via inline style (não cobertos pelo CSS externo)
  function _aplicarDarkInjetados(dark) {
    var drawer = document.getElementById('m-drawer');
    if (drawer) {
      drawer.style.background = dark ? '#0D1520' : '#fff';
      // Cabeçalho do drawer
      var drawerHead = drawer.querySelector('div:first-child');
      if (drawerHead) drawerHead.style.borderColor = dark ? '#1E3040' : '#DCDCDC';
      // Título (agora é um <a>, mas também aceita <span> por compatibilidade)
      var titulo = drawerHead && (drawerHead.querySelector('a') || drawerHead.querySelector('span'));
      if (titulo) titulo.style.color = dark ? '#7BB3E0' : '#1A3A5C';
      // Botão fechar drawer
      var btnClose = drawerHead && drawerHead.querySelector('button');
      if (btnClose) btnClose.style.color = dark ? '#8B9BAA' : '#6B6B6B';
      // Links do menu principal
      drawer.querySelectorAll('ul li a:not(._drawer-sub)').forEach(function (a) {
        a.style.color = dark ? '#E8E4DC' : '#1C1C1E';
        a.style.borderColor = dark ? '#2A3D50' : '#f0f0f0';
      });
      // Botões de seção accordion
      drawer.querySelectorAll('[data-drawer-toggle]').forEach(function (btn) {
        btn.style.color = dark ? '#E8E4DC' : '#1C1C1E';
        btn.style.borderColor = dark ? '#2A3D50' : '#f0f0f0';
        btn.style.background = 'transparent';
      });
      // Sub-itens das seções
      drawer.querySelectorAll('._drawer-sub').forEach(function (a) {
        a.style.background   = dark ? '#0A1018' : '#F9F7F4';
        a.style.color        = dark ? '#8B9BAA' : '#6B6B6B';
        a.style.borderColor  = dark ? '#1E2F3C' : '#f5f5f5';
      });
      // Links "cinzas" (Apoiar, Configurações)
      var linksSecondary = drawer.querySelectorAll('ul li a[data-modal]');
      linksSecondary.forEach(function (a) {
        a.style.color = dark ? '#8B9BAA' : '#6B6B6B';
      });
      // Rodapé das bandeiras
      var drawerFoot = drawer.querySelector('div:last-child');
      if (drawerFoot) drawerFoot.style.borderColor = dark ? '#1E3040' : '#DCDCDC';
      // Botão dark toggle no drawer
      var darkBtn = drawerFoot && drawerFoot.querySelector('[data-dark-toggle]');
      if (darkBtn) darkBtn.style.color = dark ? '#8B9BAA' : '#6B6B6B';
    }

    // Modal leitura
    var leit = document.getElementById('modal-leitura');
    if (leit) {
      var leitInner = leit.querySelector('div');
      if (leitInner) {
        leitInner.style.background = dark ? '#0D1520' : '#fff';
        var leitHead = leitInner.querySelector('div:first-child');
        if (leitHead) leitHead.style.borderColor = dark ? '#1E3040' : '#DCDCDC';
        var leitTitle = leitHead && leitHead.querySelector('span');
        if (leitTitle) leitTitle.style.color = dark ? '#7BB3E0' : '#1A3A5C';
        var leitClose = leitHead && leitHead.querySelector('button');
        if (leitClose) leitClose.style.color = dark ? '#8B9BAA' : '#6B6B6B';
        var prev = document.getElementById('leitura-previa');
        if (prev) {
          prev.style.background   = dark ? '#1A2B3C' : '#F9F7F4';
          prev.style.borderColor  = dark ? '#2A3D50'  : '#DCDCDC';
          var pp = document.getElementById('leitura-previa-p');
          if (pp) pp.style.color = dark ? '#E8E4DC' : '#1C1C1E';
        }
        // Botão reset no modal leitura
        var resetBtn = leitInner && leitInner.querySelector('[data-reset-all]');
        if (resetBtn) {
          resetBtn.style.borderColor = dark ? '#2A3D50' : '#DCDCDC';
          resetBtn.style.background  = dark ? 'transparent' : 'none';
        }
      }
    }
    // Sincroniza cores dos botões de personalização conforme tema
    if (typeof _gaLeitura !== 'undefined') _sincronizarBotoesLeitura(_gaLeitura);

    // Modais
    ['modal-apoiar', 'modal-config'].forEach(function (id) {
      var modal = document.getElementById(id);
      if (!modal) return;
      var inner = modal.querySelector('div');
      if (!inner) return;
      inner.style.background = dark ? '#0D1520' : '#fff';
      var head = inner.querySelector('div:first-child');
      if (head) head.style.borderColor = dark ? '#1E3040' : '#DCDCDC';
      var titulo = head && head.querySelector('span');
      if (titulo) titulo.style.color = dark ? '#7BB3E0' : '#1A3A5C';
      var btnX = head && head.querySelector('button');
      if (btnX) btnX.style.color = dark ? '#8B9BAA' : '#6B6B6B';
      // Texto dos modais
      inner.querySelectorAll('p').forEach(function (p) {
        p.style.color = dark ? '#E8E4DC' : '#1C1C1E';
      });
      // Links do modal-config
      inner.querySelectorAll('ul li a').forEach(function (a) {
        // O link de reset mantém sempre a cor vermelha
        if (a.hasAttribute('data-reset-all')) return;
        a.style.color = dark ? '#E8E4DC' : '#1C1C1E';
        a.style.borderColor = dark ? '#2A3D50' : '#f5f5f5';
      });
      // Box de apoio
      var box = inner.querySelector('div[style*="background:#F9F7F4"], div[style*="background:#0D1520"]');
      if (box) {
        box.style.background = dark ? '#1A2B3C' : '#F9F7F4';
        box.style.borderColor = dark ? '#2A3D50' : '#DCDCDC';
        box.style.color = dark ? '#8B9BAA' : '#6B6B6B';
      }
    });
  }

  // ── VARIÁVEIS PARA O HTML INJETADO ───────────────────────────────

  var _temaIcone  = _escuro ? SUN_SVG  : MOON_SVG;
  var _temaTitulo = _escuro ? 'Mudar para modo claro' : 'Mudar para modo escuro';

  // ── HTML INJETADO ────────────────────────────────────────────────

  const html = `
  <!-- OVERLAY DO DRAWER -->
  <div id="m-overlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:200;"></div>

  <!-- DRAWER LATERAL ESQUERDO -->
  <nav id="m-drawer" aria-label="Menu lateral" style="position:fixed;top:0;left:0;bottom:0;width:80%;max-width:300px;background:#fff;z-index:201;transform:translateX(-100%);transition:transform .28s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;overflow-y:auto;">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #DCDCDC;">
      <a href="/" style="font-family:'Playfair Display',Georgia,serif;font-weight:700;color:#1A3A5C;font-size:1.1rem;text-decoration:none;">Grande Ateu</a>
      <button id="m-drawer-close" aria-label="Fechar menu" style="background:none;border:none;cursor:pointer;padding:4px;color:#6B6B6B;">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div style="padding:10px 16px;border-bottom:1px solid #DCDCDC;">
      <div style="display:flex;align-items:center;gap:8px;background:#F9F7F4;border:1px solid #DCDCDC;border-radius:8px;padding:7px 10px;">
        <svg width="14" height="14" fill="none" stroke="#6B6B6B" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
        <input id="m-busca-drawer" type="search" placeholder="Buscar passagens..." autocomplete="off" style="border:none;background:transparent;outline:none;font-family:sans-serif;font-size:.88rem;width:100%;color:#1C1C1E;"/>
      </div>
    </div>
    <ul style="list-style:none;margin:0;padding:12px 0;flex:1;">
      <li>
        <button data-drawer-toggle="m-dl-biblia" style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 20px;color:#1C1C1E;font-family:sans-serif;font-size:.9rem;font-weight:600;background:none;border:none;border-bottom:1px solid #f0f0f0;cursor:pointer;">
          Bíblia Online
          <svg data-arrow width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="flex-shrink:0;transition:transform .2s;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6"/></svg>
        </button>
        <ul id="m-dl-biblia" style="display:none;list-style:none;padding:0;margin:0;">
          <li><a href="/biblia/" class="_drawer-sub" style="display:block;padding:11px 20px 11px 32px;color:#6B6B6B;font-family:sans-serif;font-size:.85rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f5f5f5;background:#F9F7F4;">Conheça</a></li>
          <li><a href="/t1/An/" class="_drawer-sub" style="display:block;padding:11px 20px 11px 32px;color:#6B6B6B;font-family:sans-serif;font-size:.85rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f0f0f0;background:#F9F7F4;">Leia</a></li>
        </ul>
      </li>

      <li><a href="/loja/" style="display:block;padding:14px 20px;color:#1C1C1E;font-family:sans-serif;font-size:.9rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f0f0f0;">Loja</a></li>

      <li>
        <button data-drawer-toggle="m-dl-redes" style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 20px;color:#1C1C1E;font-family:sans-serif;font-size:.9rem;font-weight:600;background:none;border:none;border-bottom:1px solid #f0f0f0;cursor:pointer;">
          Redes
          <svg data-arrow width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="flex-shrink:0;transition:transform .2s;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6"/></svg>
        </button>
        <ul id="m-dl-redes" style="display:none;list-style:none;padding:0;margin:0;">
          <li><a href="#" data-externo="https://whatsapp.com/channel/0029VbBSupFAjPXGrgFRxG0V" class="_drawer-sub" style="display:flex;align-items:center;gap:10px;padding:11px 20px 11px 32px;color:#6B6B6B;font-family:sans-serif;font-size:.85rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f5f5f5;background:#F9F7F4;"><svg width="17" height="17" viewBox="0 0 24 24" fill="#25D366" style="flex-shrink:0;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>Canal WhatsApp</a></li>
          <li><a href="#" data-placeholder class="_drawer-sub" style="display:flex;align-items:center;gap:10px;padding:11px 20px 11px 32px;color:#6B6B6B;font-family:sans-serif;font-size:.85rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f5f5f5;background:#F9F7F4;"><svg width="17" height="17" viewBox="0 0 24 24" fill="#E1306C" style="flex-shrink:0;"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>Instagram</a></li>
          <li><a href="#" data-placeholder class="_drawer-sub" style="display:flex;align-items:center;gap:10px;padding:11px 20px 11px 32px;color:#6B6B6B;font-family:sans-serif;font-size:.85rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f5f5f5;background:#F9F7F4;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1A3A5C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1" fill="#1A3A5C" stroke="none"/></svg>App</a></li>
          <li><a href="#" data-externo="https://www.youtube.com/c/VlogdoCair%C3%A3oOficial" class="_drawer-sub" style="display:flex;align-items:center;gap:10px;padding:11px 20px 11px 32px;color:#6B6B6B;font-family:sans-serif;font-size:.85rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f0f0f0;background:#F9F7F4;"><svg width="17" height="17" viewBox="0 0 24 24" fill="#FF0000" style="flex-shrink:0;"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>Canal YouTube</a></li>
        </ul>
      </li>

      <li>
        <button data-drawer-toggle="m-dl-cosmo" style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:14px 20px;color:#1C1C1E;font-family:sans-serif;font-size:.9rem;font-weight:600;background:none;border:none;border-bottom:1px solid #f0f0f0;cursor:pointer;">
          Cosmovisão
          <svg data-arrow width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="flex-shrink:0;transition:transform .2s;"><path stroke-linecap="round" stroke-linejoin="round" d="M9 18l6-6-6-6"/></svg>
        </button>
        <ul id="m-dl-cosmo" style="display:none;list-style:none;padding:0;margin:0;">
          <li><a href="/jornada/" class="_drawer-sub" style="display:block;padding:11px 20px 11px 32px;color:#6B6B6B;font-family:sans-serif;font-size:.85rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f5f5f5;background:#F9F7F4;">Jornada</a></li>
          <li><a href="/piramide/" class="_drawer-sub" style="display:block;padding:11px 20px 11px 32px;color:#6B6B6B;font-family:sans-serif;font-size:.85rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f5f5f5;background:#F9F7F4;">Pirâmide Ateia</a></li>
          <li><a href="/dicionario/" class="_drawer-sub" style="display:block;padding:11px 20px 11px 32px;color:#6B6B6B;font-family:sans-serif;font-size:.85rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f5f5f5;background:#F9F7F4;">Dicionário Bíblico</a></li>
          <li><a href="/" class="_drawer-sub" style="display:block;padding:11px 20px 11px 32px;color:#6B6B6B;font-family:sans-serif;font-size:.85rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f5f5f5;background:#F9F7F4;">Grande Ateu</a></li>
          <li><a href="#" data-placeholder class="_drawer-sub" style="display:block;padding:11px 20px 11px 32px;color:#6B6B6B;font-family:sans-serif;font-size:.85rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f5f5f5;background:#F9F7F4;">Salvação</a></li>
          <li><a href="/declaracao/" class="_drawer-sub" style="display:block;padding:11px 20px 11px 32px;color:#6B6B6B;font-family:sans-serif;font-size:.85rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f0f0f0;background:#F9F7F4;">Declaração de Fé Genuína</a></li>
        </ul>
      </li>

      <li><a href="/apoiar/" style="display:block;padding:14px 20px;color:#6B6B6B;font-family:sans-serif;font-size:.9rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f0f0f0;">Apoiar</a></li>
      <li><a href="#" data-modal="modal-config" style="display:block;padding:14px 20px;color:#6B6B6B;font-family:sans-serif;font-size:.9rem;font-weight:600;text-decoration:none;">Configurações</a></li>
    </ul>
    <div style="padding:16px 20px;border-top:1px solid #DCDCDC;display:flex;gap:14px;align-items:center;">
      <a href="#" data-translate="pt" title="Português"><img src="/assets/flags/br.svg" alt="PT" width="30" height="21" style="border-radius:2px;display:block;"></a>
      <a href="#" data-translate="en" title="English"><img src="/assets/flags/us.svg" alt="EN" width="30" height="21" style="border-radius:2px;display:block;"></a>
      <a href="#" data-translate="es" title="Español"><img src="/assets/flags/es.svg" alt="ES" width="30" height="21" style="border-radius:2px;display:block;"></a>
      <a href="#" data-translate="de" title="Deutsch"><img src="/assets/flags/de.svg" alt="DE" width="30" height="21" style="border-radius:2px;display:block;"></a>
      <a href="#" data-translate="fr" title="Français"><img src="/assets/flags/fr.svg" alt="FR" width="30" height="21" style="border-radius:2px;display:block;"></a>
      <button data-dark-toggle aria-label="${_temaTitulo}" title="${_temaTitulo}" style="background:none;border:none;cursor:pointer;color:#6B6B6B;padding:4px;display:flex;align-items:center;margin-left:auto;">${_temaIcone}</button>
    </div>
  </nav>

  <!-- MODAL: LINK EXTERNO — confirmação antes de sair do site -->
  <div id="modal-externo" style="display:none;position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.6);align-items:center;justify-content:center;padding:20px;">
    <div style="background:#fff;border-radius:16px;width:100%;max-width:340px;font-family:sans-serif;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.18);">
      <div style="padding:24px 24px 20px;">
        <div style="width:44px;height:44px;background:#FEF3C7;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
          <svg width="22" height="22" fill="none" stroke="#D97706" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </div>
        <p style="font-weight:700;font-size:1rem;color:#1C1C1E;margin:0 0 6px;">Você está saindo do site</p>
        <p id="externo-desc" style="font-size:.83rem;color:#6B6B6B;line-height:1.55;margin:0 0 20px;">Este link abrirá em uma nova aba.</p>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <a id="externo-btn-ir" href="#" target="_blank" rel="noopener noreferrer"
             style="display:block;text-align:center;background:#1A3A5C;color:#fff;text-decoration:none;padding:12px;border-radius:10px;font-weight:700;font-size:.88rem;">
            Ir para o link externo
          </a>
          <button data-fechar="modal-externo"
                  style="background:none;border:1.5px solid #DCDCDC;border-radius:10px;padding:11px;font-size:.88rem;font-weight:600;color:#6B6B6B;cursor:pointer;font-family:sans-serif;">
            Permanecer no site
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL: CONFIGURAÇÕES -->
  <div id="modal-config" style="display:none;position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.5);align-items:center;justify-content:center;padding:20px;">
    <div style="background:#fff;border-radius:12px;width:100%;max-width:420px;max-height:85vh;overflow-y:auto;font-family:sans-serif;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 20px 16px;border-bottom:1px solid #DCDCDC;">
        <span style="font-family:'Playfair Display',Georgia,serif;font-weight:700;color:#1A3A5C;font-size:1.2rem;">Configurações</span>
        <button data-fechar="modal-config" style="background:none;border:none;cursor:pointer;color:#6B6B6B;font-size:1.4rem;line-height:1;">✕</button>
      </div>
      <ul style="list-style:none;margin:0;padding:8px 0;">
        <li><a href="#" data-placeholder style="display:flex;align-items:center;gap:14px;padding:15px 20px;color:#1C1C1E;text-decoration:none;font-size:.9rem;font-weight:600;border-bottom:1px solid #f5f5f5;"><span style="font-size:1.2rem;">🔔</span> Notificações</a></li>
        <li><a href="#" data-placeholder style="display:flex;align-items:center;gap:14px;padding:15px 20px;color:#1C1C1E;text-decoration:none;font-size:.9rem;font-weight:600;border-bottom:1px solid #f5f5f5;"><span style="font-size:1.2rem;">🔊</span> Sons</a></li>
        <li><a href="/sobre/" style="display:flex;align-items:center;gap:14px;padding:15px 20px;color:#1C1C1E;text-decoration:none;font-size:.9rem;font-weight:600;border-bottom:1px solid #f5f5f5;"><span style="font-size:1.2rem;">ℹ️</span> Sobre o Site</a></li>
        <li><a href="/faq/" style="display:flex;align-items:center;gap:14px;padding:15px 20px;color:#1C1C1E;text-decoration:none;font-size:.9rem;font-weight:600;border-bottom:1px solid #f5f5f5;"><span style="font-size:1.2rem;">❓</span> Central de Ajuda / FAQ</a></li>
        <li><a href="#" data-placeholder style="display:flex;align-items:center;gap:14px;padding:15px 20px;color:#1C1C1E;text-decoration:none;font-size:.9rem;font-weight:600;border-bottom:1px solid #f5f5f5;"><span style="font-size:1.2rem;">✉️</span> Contate o Autor</a></li>
        <li><a href="#" data-placeholder style="display:flex;align-items:center;gap:14px;padding:15px 20px;color:#1C1C1E;text-decoration:none;font-size:.9rem;font-weight:600;border-bottom:1px solid #f5f5f5;"><span style="font-size:1.2rem;">🎯</span> Missão, Visão e Valores</a></li>
        <li><a href="#" data-placeholder style="display:flex;align-items:center;gap:14px;padding:15px 20px;color:#1C1C1E;text-decoration:none;font-size:.9rem;font-weight:600;border-bottom:1px solid #f5f5f5;"><span style="font-size:1.2rem;">📜</span> Termos e Políticas</a></li>
        <li><a href="#" data-placeholder style="display:flex;align-items:center;gap:14px;padding:15px 20px;color:#1C1C1E;text-decoration:none;font-size:.9rem;font-weight:600;border-bottom:1px solid #f5f5f5;"><span style="font-size:1.2rem;">🔐</span> Login</a></li>
        <li><a href="#" data-reset-all style="display:flex;align-items:center;gap:14px;padding:15px 20px;color:#c0392b;text-decoration:none;font-size:.9rem;font-weight:600;"><span style="font-size:1.2rem;">🔄</span> Reset de Preferências</a></li>
      </ul>
    </div>
  </div>

  <!-- MODAL: BUSCA -->
  <div id="modal-busca" style="display:none;position:fixed;inset:0;z-index:400;background:rgba(0,0,0,.65);padding:16px;">
    <div style="background:#fff;border-radius:12px;width:100%;max-width:640px;margin:56px auto 0;max-height:82vh;display:flex;flex-direction:column;overflow:hidden;font-family:sans-serif;">
      <div style="display:flex;align-items:center;gap:10px;padding:14px 20px;border-bottom:1px solid #DCDCDC;">
        <svg width="17" height="17" fill="none" stroke="#6B6B6B" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
        <input id="m-busca-input" type="search" placeholder="Buscar passagens, capítulos, livros..." autocomplete="off" style="flex:1;border:none;outline:none;font-size:.95rem;font-family:sans-serif;color:#1C1C1E;background:transparent;"/>
        <button data-fechar="modal-busca" style="background:none;border:none;cursor:pointer;color:#6B6B6B;font-size:1.4rem;line-height:1;">✕</button>
      </div>
      <div style="padding:6px 16px;display:flex;gap:8px;align-items:center;border-bottom:1px solid #f0f0f0;flex-shrink:0;">
        <span style="font-size:.72rem;color:#9B9B9B;font-family:sans-serif;">Modo:</span>
        <button data-busca-modo="parcial" style="background:#1A3A5C;color:#fff;border:1px solid #1A3A5C;border-radius:12px;padding:3px 10px;font-size:.72rem;cursor:pointer;font-family:sans-serif;font-weight:600;line-height:1.4;">Contém</button>
        <button data-busca-modo="exato" style="background:transparent;color:#6B6B6B;border:1px solid #DCDCDC;border-radius:12px;padding:3px 10px;font-size:.72rem;cursor:pointer;font-family:sans-serif;font-weight:600;line-height:1.4;">Palavra inteira</button>
      </div>
      <div id="m-busca-resultados" style="overflow-y:auto;flex:1;"></div>
      <div id="m-busca-hint" style="padding:20px;text-align:center;color:#6B6B6B;font-size:.85rem;line-height:1.7;">Digite <strong>3+ caracteres</strong> para busca automática<br>ou pressione <strong>Enter</strong> com qualquer texto.</div>
    </div>
  </div>

  <!-- MODAL: PERSONALIZAR LEITURA -->
  <div id="modal-leitura" style="display:none;position:fixed;inset:0;z-index:400;background:rgba(0,0,0,.65);padding:16px;align-items:flex-start;justify-content:center;">
    <div style="background:#fff;border-radius:12px;width:100%;max-width:400px;margin-top:56px;max-height:85vh;overflow-y:auto;font-family:sans-serif;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 20px 14px;border-bottom:1px solid #DCDCDC;">
        <span style="font-family:'Playfair Display',Georgia,serif;font-weight:700;color:#1A3A5C;font-size:1.1rem;">Personalizar Leitura</span>
        <button data-fechar="modal-leitura" style="background:none;border:none;cursor:pointer;color:#6B6B6B;font-size:1.4rem;line-height:1;">✕</button>
      </div>
      <div style="padding:16px 20px 22px;display:flex;flex-direction:column;gap:18px;">

        <div>
          <p style="margin:0 0 8px;font-size:.7rem;color:#9B9B9B;font-weight:700;text-transform:uppercase;letter-spacing:.07em;">Fonte</p>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button data-leitura-fonte="playfair" style="background:#1A3A5C;color:#fff;border:1px solid #1A3A5C;border-radius:8px;padding:6px 11px;font-size:.76rem;cursor:pointer;font-weight:600;font-family:'Playfair Display',serif;">Padrão</button>
            <button data-leitura-fonte="pt-serif" style="background:#F9F7F4;color:#1A3A5C;border:1px solid #DCDCDC;border-radius:8px;padding:6px 11px;font-size:.76rem;cursor:pointer;font-weight:600;font-family:'PT Serif',serif;">PT Serif</button>
            <button data-leitura-fonte="spectral" style="background:#F9F7F4;color:#1A3A5C;border:1px solid #DCDCDC;border-radius:8px;padding:6px 11px;font-size:.76rem;cursor:pointer;font-weight:600;font-family:'Spectral',serif;">Spectral</button>
            <button data-leitura-fonte="neuton"   style="background:#F9F7F4;color:#1A3A5C;border:1px solid #DCDCDC;border-radius:8px;padding:6px 11px;font-size:.76rem;cursor:pointer;font-weight:600;font-family:'Neuton',serif;">Neuton</button>
          </div>
        </div>

        <div>
          <p style="margin:0 0 8px;font-size:.7rem;color:#9B9B9B;font-weight:700;text-transform:uppercase;letter-spacing:.07em;">Tamanho do Texto</p>
          <div style="display:flex;gap:6px;">
            <button data-leitura-tamanho="pq" style="background:#F9F7F4;color:#1A3A5C;border:1px solid #DCDCDC;border-radius:8px;padding:6px 14px;font-size:.75rem;cursor:pointer;font-weight:600;">PEQ</button>
            <button data-leitura-tamanho="md" style="background:#1A3A5C;color:#fff;border:1px solid #1A3A5C;border-radius:8px;padding:6px 14px;font-size:.75rem;cursor:pointer;font-weight:600;">MED</button>
            <button data-leitura-tamanho="gr" style="background:#F9F7F4;color:#1A3A5C;border:1px solid #DCDCDC;border-radius:8px;padding:6px 14px;font-size:.75rem;cursor:pointer;font-weight:600;">GRA</button>
            <button data-leitura-tamanho="ex" style="background:#F9F7F4;color:#1A3A5C;border:1px solid #DCDCDC;border-radius:8px;padding:6px 14px;font-size:.75rem;cursor:pointer;font-weight:600;">EXT</button>
          </div>
        </div>

        <div>
          <p style="margin:0 0 8px;font-size:.7rem;color:#9B9B9B;font-weight:700;text-transform:uppercase;letter-spacing:.07em;">Espaço entre Linhas</p>
          <div style="display:flex;gap:6px;">
            <button data-leitura-linha="min" style="background:#F9F7F4;color:#1A3A5C;border:1px solid #DCDCDC;border-radius:8px;padding:6px 18px;font-size:.75rem;cursor:pointer;font-weight:600;">MIN</button>
            <button data-leitura-linha="med" style="background:#1A3A5C;color:#fff;border:1px solid #1A3A5C;border-radius:8px;padding:6px 18px;font-size:.75rem;cursor:pointer;font-weight:600;">MED</button>
            <button data-leitura-linha="max" style="background:#F9F7F4;color:#1A3A5C;border:1px solid #DCDCDC;border-radius:8px;padding:6px 18px;font-size:.75rem;cursor:pointer;font-weight:600;">MAX</button>
          </div>
        </div>

        <div>
          <p style="margin:0 0 8px;font-size:.7rem;color:#9B9B9B;font-weight:700;text-transform:uppercase;letter-spacing:.07em;">Espaço entre Letras</p>
          <div style="display:flex;gap:6px;">
            <button data-leitura-letra="min" style="background:#F9F7F4;color:#1A3A5C;border:1px solid #DCDCDC;border-radius:8px;padding:6px 18px;font-size:.75rem;cursor:pointer;font-weight:600;">MIN</button>
            <button data-leitura-letra="med" style="background:#1A3A5C;color:#fff;border:1px solid #1A3A5C;border-radius:8px;padding:6px 18px;font-size:.75rem;cursor:pointer;font-weight:600;">MED</button>
            <button data-leitura-letra="max" style="background:#F9F7F4;color:#1A3A5C;border:1px solid #DCDCDC;border-radius:8px;padding:6px 18px;font-size:.75rem;cursor:pointer;font-weight:600;">MAX</button>
          </div>
        </div>

        <div>
          <p style="margin:0 0 8px;font-size:.7rem;color:#9B9B9B;font-weight:700;text-transform:uppercase;letter-spacing:.07em;">Prévia</p>
          <div id="leitura-previa" style="background:#F9F7F4;border:1px solid #DCDCDC;border-radius:8px;padding:14px 16px;">
            <p id="leitura-previa-p" style="margin:0;color:#1C1C1E;font-family:'Playfair Display',Georgia,serif;font-size:1rem;line-height:1.7;letter-spacing:0em;">A razão é o único farol verdadeiro.<br>Sem ela, apenas a névoa do dogma permanece.</p>
          </div>
        </div>

        <button data-reset-all style="width:100%;background:none;border:1px solid #DCDCDC;border-radius:8px;padding:10px 16px;font-family:sans-serif;font-size:.8rem;font-weight:600;color:#c0392b;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;">
          🔄 Reset de Preferências
        </button>

      </div>
    </div>
  </div>

  <!-- FOOTER RICO — visível no mobile E desktop (SEO: links internos para o Googlebot) -->
  <footer id="ga-footer" style="background:#1A3A5C;color:#fff;font-family:sans-serif;">
    <div style="max-width:1152px;margin:0 auto;padding:14px 24px 10px;">

      <div id="ga-ft-grid" style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:10px 20px;align-items:start;">

        <!-- Marca -->
        <div>
          <a href="/" style="font-family:'Playfair Display',Georgia,serif;font-size:.97rem;font-weight:700;color:#fff;text-decoration:none;display:block;margin-bottom:3px;">Grande Ateu</a>
          <p style="font-size:.7rem;color:#93c5fd;line-height:1.1;margin:0;">A Bíblia Ateia — 3 tomos, 38 livros, 873 passagens.<br>Uma cosmovisão fundamentada na razão e na Legítima Verdade.</p>
        </div>

        <!-- A Bíblia -->
        <nav aria-label="A Bíblia">
          <p style="font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#93c5fd;margin:0 0 5px;">A Bíblia</p>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:1.5px;">
            <li><a href="/biblia/" style="color:#bfdbfe;text-decoration:none;font-size:.73rem;">Conheça a Bíblia</a></li>
            <li><a href="/t1/" style="color:#bfdbfe;text-decoration:none;font-size:.73rem;">Tomo I — Ruptura</a></li>
            <li><a href="/t2/" style="color:#bfdbfe;text-decoration:none;font-size:.73rem;">Tomo II — Edificação</a></li>
            <li><a href="/t3/" style="color:#bfdbfe;text-decoration:none;font-size:.73rem;">Tomo III — Consolidação</a></li>
          </ul>
        </nav>

        <!-- Cosmovisão -->
        <nav aria-label="Cosmovisão">
          <p style="font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#93c5fd;margin:0 0 5px;">Cosmovisão</p>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:1.5px;">
            <li><a href="/jornada/" style="color:#bfdbfe;text-decoration:none;font-size:.73rem;">Jornada Ateia</a></li>
            <li><a href="/piramide/" style="color:#bfdbfe;text-decoration:none;font-size:.73rem;">Pirâmide Ateia</a></li>
            <li><a href="/dicionario/" style="color:#bfdbfe;text-decoration:none;font-size:.73rem;">Dicionário Bíblico</a></li>
            <li><a href="/declaracao/" style="color:#bfdbfe;text-decoration:none;font-size:.73rem;">Declaração de Fé</a></li>
          </ul>
        </nav>

        <!-- Projeto -->
        <nav aria-label="Projeto">
          <p style="font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#93c5fd;margin:0 0 5px;">Projeto</p>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:1.5px;">
            <li><a href="/sobre/" style="color:#bfdbfe;text-decoration:none;font-size:.73rem;">Sobre</a></li>
            <li><a href="/faq/" style="color:#bfdbfe;text-decoration:none;font-size:.73rem;">FAQ</a></li>
            <li><a href="/sitemap.xml" style="color:#bfdbfe;text-decoration:none;font-size:.73rem;">Sitemap</a></li>
            <li><a href="#" data-placeholder style="color:#bfdbfe;text-decoration:none;font-size:.73rem;display:flex;align-items:center;gap:5px;"><svg width="11" height="11" viewBox="0 0 24 24" fill="#FF6600" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="19" r="3"/><path d="M4 4a16 16 0 0116 16" stroke="#FF6600" stroke-width="2.5" stroke-linecap="round" fill="none"/><path d="M4 11a9 9 0 019 9" stroke="#FF6600" stroke-width="2.5" stroke-linecap="round" fill="none"/></svg>RSS</a></li>
          </ul>
        </nav>

      </div>

      <!-- Rodapé do footer -->
      <div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,.12);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:6px;">
        <span style="font-size:.64rem;color:#93c5fd;">© 2026 Grande Ateu — Todos os direitos reservados.</span>
        <span style="font-size:.64rem;color:#93c5fd;">grandeateu.com</span>
      </div>

    </div>
  </footer>

  <!-- BOTTOM NAV — só mobile (3 botões: Home · Apoiar · Config) -->
  <nav id="m-bottom-nav" aria-label="Navegação mobile" style="display:none;position:fixed;bottom:0;left:0;right:0;z-index:100;background:#1A3A5C;border-top:1px solid #2a4f7a;height:50px;">
    <div style="display:flex;align-items:stretch;height:100%;max-width:480px;margin:0 auto;">
      <a href="/" aria-label="Início" style="flex:1;display:flex;align-items:center;justify-content:center;color:white;text-decoration:none;padding:4px;">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/></svg>
      </a>
      <a href="/apoiar/" style="flex:1;display:flex;flex-direction:row;align-items:center;justify-content:center;gap:7px;color:#93c5fd;text-decoration:none;font-family:sans-serif;font-size:12px;font-weight:700;letter-spacing:.02em;padding:4px 8px;">
        Apoiar
        <svg width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"/></svg>
      </a>
      <a href="#" data-modal="modal-config" aria-label="Configurações" style="flex:1;display:flex;align-items:center;justify-content:center;color:#93c5fd;text-decoration:none;padding:4px;">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>
      </a>
    </div>
  </nav>`;

  document.body.insertAdjacentHTML('beforeend', html);

  // Aplica dark nos elementos injetados imediatamente se necessário
  if (_escuro) _aplicarDarkInjetados(true);

  // ── CSS: OCULTAR FOOTER DESKTOP NO MOBILE ───────────────────────

  const mobileStyle = document.createElement('style');
  mobileStyle.textContent = [
    // Wrapper de botões do header: escondido por padrão, visível só no mobile
    '#m-hdr-btns{display:none;}',
    // Footer antigo (estático) sempre oculto — o novo #ga-footer é o canônico
    'footer[role="contentinfo"]{display:none!important;}',
    // Footer responsivo: 2 colunas no mobile (marca ocupa linha inteira)
    '@media(max-width:767px){',
    '#m-hdr-btns{display:flex!important;align-items:center;}',
    // Garante que o nav desktop nunca apareça no mobile
    'header nav > ul{display:none!important;}',
    '#ga-ft-grid{grid-template-columns:1fr 1fr!important;}',
    '#ga-ft-grid>div:first-child{grid-column:1/-1!important;}',
    '}',
    // Telas muito pequenas: coluna única
    '@media(max-width:380px){',
    '#ga-ft-grid{grid-template-columns:1fr!important;}',
    '}'
  ].join('');
  document.head.appendChild(mobileStyle);

  // ── ÍCONES NO NAV DESKTOP (busca + dark mode) ───────────────────

  var desktopUl = document.querySelector('header nav > ul');
  if (desktopUl) {
    var _icoStyle = 'background:none;border:none;cursor:pointer;color:inherit;padding:4px;display:flex;align-items:center;line-height:1;opacity:.75;';
    var SEARCH_SVG = '<svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>';

    // Botão de Busca
    var liSearch = document.createElement('li');
    var btnSearch = document.createElement('button');
    btnSearch.setAttribute('aria-label', 'Buscar');
    btnSearch.title = 'Buscar';
    btnSearch.innerHTML = SEARCH_SVG;
    btnSearch.style.cssText = _icoStyle;
    btnSearch.addEventListener('click', function () {
      abrirModal('modal-busca');
      setTimeout(function () {
        var inp = document.getElementById('m-busca-input');
        if (inp) inp.focus();
      }, 80);
    });
    liSearch.appendChild(btnSearch);
    desktopUl.appendChild(liSearch);

    // Botão Dark Mode
    var liDark = document.createElement('li');
    var btnDark = document.createElement('button');
    btnDark.setAttribute('data-dark-toggle', '');
    btnDark.setAttribute('aria-label', _temaTitulo);
    btnDark.title = _temaTitulo;
    btnDark.innerHTML = _escuro ? SUN_SVG : MOON_SVG;
    btnDark.style.cssText = _icoStyle;
    liDark.appendChild(btnDark);
    desktopUl.appendChild(liDark);

    // Botão Apoiar ♥ (desktop) — inserido antes das bandeiras de idioma
    var flagsLi = desktopUl.querySelector('li.flex');
    if (flagsLi) {
      var liApoiar = document.createElement('li');
      var aApoiar  = document.createElement('a');
      aApoiar.href = '/apoiar/';
      aApoiar.setAttribute('aria-label', 'Apoiar o projeto');
      aApoiar.title = 'Apoiar o projeto';
      aApoiar.innerHTML = 'Apoiar <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-top:-2px;"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"/></svg>';
      aApoiar.style.cssText = 'display:inline-flex;align-items:center;gap:5px;font-family:sans-serif;font-size:.82rem;font-weight:700;color:inherit;text-decoration:none;padding:5px 12px;border:1.5px solid currentColor;border-radius:20px;opacity:.75;transition:opacity .15s;';
      aApoiar.addEventListener('mouseover', function(){ aApoiar.style.opacity='1'; });
      aApoiar.addEventListener('mouseout',  function(){ aApoiar.style.opacity='.75'; });
      liApoiar.appendChild(aApoiar);
      desktopUl.insertBefore(liApoiar, flagsLi);
    }

    // Botão Personalizar Leitura (desktop)
    var COG_SVG = '<svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>';
    var liCfg = document.createElement('li');
    var btnCfgDesk = document.createElement('button');
    btnCfgDesk.setAttribute('aria-label', 'Personalizar leitura');
    btnCfgDesk.title = 'Personalizar leitura';
    btnCfgDesk.setAttribute('data-modal', 'modal-leitura');
    btnCfgDesk.innerHTML = COG_SVG;
    btnCfgDesk.style.cssText = _icoStyle;
    liCfg.appendChild(btnCfgDesk);
    desktopUl.appendChild(liCfg);
  }

  // ── HELPERS ──────────────────────────────────────────────────────

  function isMobile() { return window.innerWidth < 768; }

  function abrirModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function fecharModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.style.display = 'none';
    document.body.style.overflow = '';
  }
  function abrirDrawer() {
    document.getElementById('m-drawer').style.transform = 'translateX(0)';
    document.getElementById('m-overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  function fecharDrawer() {
    document.getElementById('m-drawer').style.transform = 'translateX(-100%)';
    document.getElementById('m-overlay').style.display = 'none';
    document.body.style.overflow = '';
  }

  // ── BOTTOM NAV VISIBILITY ────────────────────────────────────────

  function toggleBottomNav() {
    const nav = document.getElementById('m-bottom-nav');
    const visivel = isMobile();
    nav.style.display = visivel ? 'block' : 'none';
    document.body.style.paddingBottom = visivel ? '50px' : '';
  }
  toggleBottomNav();
  window.addEventListener('resize', toggleBottomNav);

  // ── HAMBURGUER (redireciona para o drawer do mobile.js) ───────────

  const menuBtn = document.getElementById('menu-btn');
  if (menuBtn) {
    // Remove listener antigo clonando o botão
    const newBtn = menuBtn.cloneNode(true);
    menuBtn.parentNode.replaceChild(newBtn, menuBtn);
    newBtn.addEventListener('click', function () {
      if (isMobile()) {
        abrirDrawer();
      } else {
        // Desktop: comportamento original (menu-mobile dropdown)
        const m = document.getElementById('menu-mobile');
        if (m) { const a = m.classList.toggle('hidden'); newBtn.setAttribute('aria-expanded', !a); }
      }
    });
  }

  // ── REPOSICIONAR HAMBURGUER À ESQUERDA (subpáginas) ──────────────
  // Em subpáginas o #menu-btn é filho direto do <nav> (à direita).
  // No index.html já está dentro de um <div> à esquerda — não mexemos.

  function fixHamburgerPosition() {
    if (!isMobile()) return;
    const btn = document.getElementById('menu-btn');
    if (!btn) return;

    // Só age quando o pai imediato é a <nav> (subpáginas)
    const parent = btn.parentElement;
    if (!parent || parent.tagName.toLowerCase() !== 'nav') return;

    // Encontra o primeiro <a> filho direto da nav (link do logo)
    let logoLink = null;
    for (let child of parent.children) {
      if (child.tagName.toLowerCase() === 'a') { logoLink = child; break; }
    }
    if (!logoLink) return;

    // Cria wrapper flex igual ao do index.html
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;align-items:center;gap:12px;';

    // Insere wrapper no lugar do logo
    parent.insertBefore(wrapper, logoLink);

    // Hamburguer primeiro, depois logo
    wrapper.appendChild(btn);
    wrapper.appendChild(logoLink);
  }

  fixHamburgerPosition();
  window.addEventListener('resize', fixHamburgerPosition);

  // ── BOTÃO DE BUSCA NO HEADER MOBILE ─────────────────────────────
  // Injetado como último filho da <nav> do header.
  // flex justify-between faz ele ir automaticamente para o lado direito.
  // CSS acima garante display:none no desktop e display:flex no mobile.

  function _injetarBuscaMobileHeader() {
    if (document.getElementById('m-busca-hdr')) return;
    var nav = document.querySelector('header nav');
    if (!nav) return;

    // Wrapper para agrupar lupa + engrenagem lado a lado
    var wrap = document.createElement('div');
    wrap.id = 'm-hdr-btns';
    wrap.style.cssText = 'align-items:center;gap:2px;'; // display controlado pelo CSS (#m-hdr-btns)

    // Botão de busca
    var btnS = document.createElement('button');
    btnS.id = 'm-busca-hdr';
    btnS.setAttribute('aria-label', 'Buscar');
    btnS.title = 'Buscar';
    btnS.innerHTML = '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>';
    btnS.style.cssText = 'background:none;border:none;cursor:pointer;padding:6px;color:inherit;line-height:1;display:flex;align-items:center;';
    btnS.addEventListener('click', function () { _abrirBusca(''); });

    // Botão de personalização
    var btnC = document.createElement('button');
    btnC.id = 'm-config-hdr';
    btnC.setAttribute('aria-label', 'Personalizar leitura');
    btnC.title = 'Personalizar leitura';
    btnC.setAttribute('data-modal', 'modal-leitura');
    btnC.innerHTML = '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>';
    btnC.style.cssText = 'background:none;border:none;cursor:pointer;padding:6px;color:inherit;line-height:1;display:flex;align-items:center;';

    wrap.appendChild(btnS);
    wrap.appendChild(btnC);
    nav.appendChild(wrap);
  }
  _injetarBuscaMobileHeader();

  // ── LINKS DE BANDEIRA — dinâmicos ────────────────────────────────
  // Funciona tanto no site original quanto dentro do translate.goog.
  // No translate.goog: troca só o parâmetro _x_tr_tl da URL atual.
  // Bandeira BR: volta sempre ao site original.

  var SITE_ORIGEM = 'https://idioluzes.github.io';

  function getTranslateUrl(lang) {
    var noTranslate = window.location.hostname.endsWith('.translate.goog');

    // Bandeira Brasil → volta ao original
    if (lang === 'pt') {
      return noTranslate
        ? SITE_ORIGEM + window.location.pathname
        : '/';
    }

    // Já dentro do translate.goog → só troca o idioma
    if (noTranslate) {
      var url = new URL(window.location.href);
      url.searchParams.set('_x_tr_tl', lang);
      return url.toString();
    }

    // Site original → monta URL de tradução para a página atual
    var pagina = encodeURIComponent(SITE_ORIGEM + window.location.pathname);
    return 'https://translate.google.com/translate?sl=pt&tl=' + lang + '&u=' + pagina;
  }

  function atualizarBandeiras() {
    // Drawer (data-translate)
    document.querySelectorAll('[data-translate]').forEach(function (a) {
      a.href = getTranslateUrl(a.dataset.translate);
    });
    // Desktop nav — <img alt="EN/ES/DE/FR/PT"> dentro de <a>
    var mapa = { EN: 'en', ES: 'es', DE: 'de', FR: 'fr', PT: 'pt' };
    document.querySelectorAll('nav a > img[alt]').forEach(function (img) {
      var lang = mapa[img.alt];
      if (lang) img.parentElement.href = getTranslateUrl(lang);
    });
  }
  atualizarBandeiras();

  // ── FECHAR DRAWER ────────────────────────────────────────────────

  document.getElementById('m-drawer-close').addEventListener('click', fecharDrawer);
  document.getElementById('m-overlay').addEventListener('click', fecharDrawer);

  // ── BOTÕES FLUTUANTES PREV / NEXT ────────────────────────────────
  // Lê o <nav aria-label="Livros|Capítulos|Passagens"> do <main>
  // e cria botões colados às bordas do viewport.

  var _LABELS_CONTEUDO = ['Livros', 'Capítulos', 'Passagens'];
  var _btnPrevRef = null;
  var _btnNextRef = null;

  // Reposiciona / reestiliza os botões conforme o breakpoint atual
  function _posicionarNavFlutuante() {
    var wrap  = document.getElementById('m-nav-flutuante');
    var mainEl = document.querySelector('main');
    if (!wrap || !mainEl) return;

    if (window.innerWidth < 768) {
      // Mobile: half-pill grudado na borda — fácil de atingir com o polegar
      wrap.style.paddingLeft  = '0';
      wrap.style.paddingRight = '0';
      if (_btnPrevRef) { _btnPrevRef.style.borderRadius='0 6px 6px 0'; _btnPrevRef.style.width='36px'; _btnPrevRef.style.height='54px'; }
      if (_btnNextRef) { _btnNextRef.style.borderRadius='6px 0 0 6px'; _btnNextRef.style.width='36px'; _btnNextRef.style.height='54px'; }
    } else {
      // Desktop: circular, centralizado na margem vazia ao lado do <main>
      var rect = mainEl.getBoundingClientRect();
      var btnW = 44; // px
      // Empurra o wrap para dentro: os botões ficam no meio da margem livre
      var padL = Math.max(0, Math.round(rect.left  / 2 - btnW / 2));
      var padR = Math.max(0, Math.round((window.innerWidth - rect.right) / 2 - btnW / 2));
      wrap.style.paddingLeft  = padL + 'px';
      wrap.style.paddingRight = padR + 'px';
      if (_btnPrevRef) { _btnPrevRef.style.borderRadius='50%'; _btnPrevRef.style.width=btnW+'px'; _btnPrevRef.style.height=btnW+'px'; }
      if (_btnNextRef) { _btnNextRef.style.borderRadius='50%'; _btnNextRef.style.width=btnW+'px'; _btnNextRef.style.height=btnW+'px'; }
    }
  }

  // ── REPOSICIONAMENTO VERTICAL — impede overlap com footer ────────
  // Ajusta o top do wrap a cada scroll, mantendo os botões acima
  // do footer (e da barra inferior) sem nunca ultrapassá-los.

  function _reposicionarBotoesNavVertical() {
    var wrap = document.getElementById('m-nav-flutuante');
    if (!wrap) return;

    var footer  = document.getElementById('ga-footer');
    var viewH   = window.innerHeight;
    var isMob   = window.innerWidth < 768;
    var btnH    = isMob ? 54 : 44;
    var navH    = isMob ? 50 : 0;   // barra inferior fixa só no mobile

    // Limite inferior: topo do footer OU topo da bottom nav — o que vier primeiro
    var footerTop = footer ? footer.getBoundingClientRect().top : viewH;
    var limiteInf = Math.min(footerTop, viewH - navH);

    // Centro ideal: meio exato do viewport
    var centroIdeal = viewH / 2;

    // Centro máximo: não pode passar de limiteInf - metade do botão - 8px de margem
    var centroMax = limiteInf - btnH / 2 - 8;

    // Clamp: nunca acima de btnH/2, nunca abaixo de centroMax
    var centro = Math.min(centroIdeal, Math.max(btnH / 2, centroMax));

    wrap.style.top       = centro + 'px';
    wrap.style.transform = 'translateY(-50%)';
  }

  window.addEventListener('scroll', _reposicionarBotoesNavVertical, { passive: true });

  function iniciarBotoesNavegacao() {
    var antigo = document.getElementById('m-nav-flutuante');
    if (antigo) antigo.remove();
    _btnPrevRef = null;
    _btnNextRef = null;

    var mainEl = document.querySelector('main');
    if (!mainEl) return;

    var navConteudo = null;
    mainEl.querySelectorAll('nav').forEach(function (nav) {
      if (_LABELS_CONTEUDO.indexOf(nav.getAttribute('aria-label')) !== -1) navConteudo = nav;
    });
    if (!navConteudo) return;

    var hrAnterior = null, hrProximo = null;
    navConteudo.querySelectorAll('a').forEach(function (a) {
      var t = a.textContent;
      if (t.includes('←')) hrAnterior = a.getAttribute('href');
      if (t.includes('→')) hrProximo  = a.getAttribute('href');
    });
    if (!hrAnterior && !hrProximo) return;

    var wrap = document.createElement('div');
    wrap.id = 'm-nav-flutuante';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.style.cssText = 'position:fixed;top:50%;transform:translateY(-50%);left:0;right:0;pointer-events:none;z-index:49;display:flex;justify-content:space-between;align-items:center;';

    var base = 'pointer-events:all;display:flex;align-items:center;justify-content:center;background:rgba(26,58,92,.78);color:#fff;text-decoration:none;font-size:1.1rem;border:none;cursor:pointer;line-height:1;transition:opacity .15s,background .15s;opacity:.65;';

    function criarBtn(href, seta, label) {
      var btn = document.createElement('a');
      btn.href = href;
      btn.setAttribute('aria-label', label);
      btn.title = label;
      btn.innerHTML = seta;
      btn.style.cssText = base;
      btn.addEventListener('mouseenter', function () { this.style.opacity='1'; this.style.background='rgba(26,58,92,.95)'; });
      btn.addEventListener('mouseleave', function () { this.style.opacity='.65'; this.style.background='rgba(26,58,92,.78)'; });
      return btn;
    }

    if (hrAnterior) { _btnPrevRef = criarBtn(hrAnterior, '&#8592;', 'Anterior'); wrap.appendChild(_btnPrevRef); }
    else            { wrap.appendChild(document.createElement('span')); }

    if (hrProximo)  { _btnNextRef = criarBtn(hrProximo,  '&#8594;', 'Próximo');  wrap.appendChild(_btnNextRef);  }
    else            { wrap.appendChild(document.createElement('span')); }

    document.body.appendChild(wrap);
    _posicionarNavFlutuante();        // horizontal (padding esquerda/direita)
    _reposicionarBotoesNavVertical(); // vertical   (top, clampado ao footer)
  }

  iniciarBotoesNavegacao();
  window.addEventListener('resize', function () {
    _posicionarNavFlutuante();
    _reposicionarBotoesNavVertical();
  });

  // ── EVENT DELEGATION ─────────────────────────────────────────────

  document.addEventListener('click', function (e) {

    // Accordion do drawer (Loja / Redes / Cosmovisão)
    var tog = e.target.closest('[data-drawer-toggle]');
    if (tog) {
      e.preventDefault();
      var subId = tog.getAttribute('data-drawer-toggle');
      var sub   = document.getElementById(subId);
      if (sub) {
        var isOpen = sub.style.display !== 'none';
        sub.style.display = isOpen ? 'none' : 'block';
        var arrow = tog.querySelector('[data-arrow]');
        if (arrow) arrow.style.transform = isOpen ? '' : 'rotate(90deg)';
      }
      return;
    }

    // Dark mode toggle
    const dt = e.target.closest('[data-dark-toggle]');
    if (dt) { e.preventDefault(); toggleTema(); return; }

    // Abrir modal
    const el = e.target.closest('[data-modal]');
    if (el) {
      e.preventDefault();
      fecharDrawer();
      setTimeout(function() {
        abrirModal(el.dataset.modal);
        if (el.dataset.modal === 'modal-leitura') {
          _sincronizarBotoesLeitura(_gaLeitura);
          _atualizarPreviaLeitura(_gaLeitura);
        }
      }, 150);
      return;
    }

    // Fechar modal pelo botão ✕
    const fc = e.target.closest('[data-fechar]');
    if (fc) { fecharModal(fc.dataset.fechar); return; }

    // Links externos — abre modal de confirmação
    const extEl = e.target.closest('[data-externo]');
    if (extEl) {
      e.preventDefault();
      var url  = extEl.getAttribute('data-externo');
      var nome = extEl.textContent.trim();
      var descEl = document.getElementById('externo-desc');
      var btnIr  = document.getElementById('externo-btn-ir');
      if (descEl) descEl.textContent = 'Você será redirecionado para: ' + nome + '.';
      if (btnIr)  btnIr.href = url;
      abrirModal('modal-externo');
      return;
    }

    // Itens "em breve"
    const ph = e.target.closest('[data-placeholder]');
    if (ph) { e.preventDefault(); alert('Em breve.'); return; }

    // Fechar modal ao clicar no overlay (fora do conteúdo interno)
    if (e.target.id === 'modal-externo' || e.target.id === 'modal-config' || e.target.id === 'modal-leitura') {
      fecharModal(e.target.id);
    }
  });


  // ── NAVEGAÇÃO SPA ─────────────────────────────────────────────────
  // Ao clicar em qualquer link interno troca só o <main> + URL.
  // Header, footer, drawer e modais ficam intactos.

  function _ehLinkInterno(href) {
    if (!href || href === '#' || href.startsWith('#')) return false;
    if (/^(https?:|mailto:|tel:|data:)/.test(href)) return false;
    if (/\.(xml|pdf|svg|png|jpg|webp|woff2?|ttf|js|css)$/.test(href)) return false;
    return true;
  }

  // Barra de progresso fina no topo
  var _barra = document.createElement('div');
  _barra.style.cssText = 'position:fixed;top:0;left:0;height:2px;width:0%;z-index:9999;background:#7BB3E0;opacity:0;pointer-events:none;transition:width .3s ease,opacity .2s ease;';
  document.body.appendChild(_barra);
  function _barraOn()  { _barra.style.opacity='1'; _barra.style.width='65%'; }
  function _barraOff() {
    _barra.style.width = '100%';
    setTimeout(function () {
      _barra.style.opacity = '0';
      setTimeout(function () { _barra.style.width = '0%'; }, 250);
    }, 180);
  }

  // Cache de preload (hover antecipado)
  var _preload = {};
  var _navegandoSPA = false;

  async function navegarSPA(url) {
    if (_navegandoSPA) return;
    if (window.location.pathname === url) return;
    _navegandoSPA = true;
    _barraOn();
    fecharDrawer();

    try {
      var html = _preload[url]
                ? await _preload[url]
                : await fetch(url).then(function (r) {
                    if (!r.ok) throw new Error(r.status);
                    return r.text();
                  });

      var parser = new DOMParser();
      var doc    = parser.parseFromString(html, 'text/html');
      var novoMain  = doc.querySelector('main');
      var atualMain = document.querySelector('main');
      if (!novoMain || !atualMain) throw new Error('sem main');

      // Troca o <main> inteiro (preserva class, width, etc.)
      atualMain.replaceWith(document.adoptNode(novoMain));

      // Atualiza title + meta description + canonical
      document.title = doc.title;
      var sel = [
        ['meta[name="description"]', 'content'],
        ['link[rel="canonical"]',    'href']
      ];
      sel.forEach(function (par) {
        var novo  = doc.querySelector(par[0]);
        var atual = document.querySelector(par[0]);
        if (novo && atual) atual[par[1]] = novo[par[1]];
      });

      history.pushState({ url: url }, document.title, url);
      window.scrollTo(0, 0);

      // Re-inicializa após troca de conteúdo
      iniciarBotoesNavegacao();
      atualizarBandeiras();

    } catch (e) {
      window.location.href = url; // fallback
    } finally {
      _navegandoSPA = false;
      _barraOff();
    }
  }

  // Preload ao passar o mouse
  document.addEventListener('mouseover', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!_ehLinkInterno(href) || _preload[href]) return;
    _preload[href] = fetch(href)
      .then(function (r) { return r.ok ? r.text() : null; })
      .catch(function () { return null; });
  });

  // Intercepta cliques em links internos
  document.addEventListener('click', function (e) {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest('a[href]');
    if (!a || a.target === '_blank') return;
    // Deixa os links especiais passarem sem interferência
    if (a.hasAttribute('data-modal') ||
        a.hasAttribute('data-translate') ||
        a.hasAttribute('data-placeholder') ||
        a.hasAttribute('data-fechar')) return;
    var href = a.getAttribute('href');
    if (!_ehLinkInterno(href)) return;
    e.preventDefault();
    navegarSPA(href);
  });

  // Botões voltar/avançar do browser
  window.addEventListener('popstate', function () {
    navegarSPA(window.location.pathname);
  });

  // ── ABREVIAÇÃO DOS SELECTS DE TOMO E PASSAGEM ───────────────────
  // Após seleção: Tomo I → I  |  PASS.3 → 3
  // Ao abrir (focus): restaura texto completo para o usuário ver todas as opções

  var _TOMO_FULL  = { 't1': 'Tomo I', 't2': 'Tomo II', 't3': 'Tomo III' };
  var _TOMO_SHORT = { 't1': 'I',      't2': 'II',       't3': 'III'      };

  function _abreviarSelTomo() {
    var sel = document.getElementById('m-sel-tomo');
    if (!sel || !sel.value) return;
    // Restaura todas as options para texto completo
    Array.from(sel.options).forEach(function (o) { o.textContent = _TOMO_FULL[o.value] || o.textContent; });
    var idx = sel.selectedIndex;
    var opt = idx >= 0 ? sel.options[idx] : null;
    if (!opt || !_TOMO_SHORT[opt.value]) return;
    // Altera o texto
    opt.textContent = _TOMO_SHORT[opt.value];
    // Remove e re-insere a option para forçar o Chrome a atualizar o estado fechado
    var ref = opt.nextSibling;
    sel.removeChild(opt);
    sel.insertBefore(opt, ref || null);
    sel.selectedIndex = idx;
  }

  function _abreviarSelPass() {
    var sel = document.getElementById('m-sel-pass');
    if (!sel || !sel.value) return;
    // Restaura todas para PASS.N
    Array.from(sel.options).forEach(function (o) { if (o.value) o.textContent = 'PASS.' + o.value; });
    var idx = sel.selectedIndex;
    var opt = idx >= 0 ? sel.options[idx] : null;
    if (!opt || !opt.value) return;
    // Altera para só o número
    opt.textContent = opt.value;
    // Remove e re-insere para forçar re-render
    var ref = opt.nextSibling;
    sel.removeChild(opt);
    sel.insertBefore(opt, ref || null);
    sel.selectedIndex = idx;
  }

  // ── BARRA DE DROPDOWN (Tomo › Livro › Cap › Passagem) ───────────
  // Injetada dentro do <header> — fica sticky junto com ele.
  // Visível em qualquer página /t1/ /t2/ /t3/ e seus filhos.

  var _SEL_STYLE = 'border:1px solid #DCDCDC;border-radius:6px;padding:5px 6px;font-family:sans-serif;font-size:.75rem;color:#1A3A5C;background:#fff;cursor:pointer;font-weight:600;flex:1;min-width:0;';

  function _ehConteudo() {
    return /^\/(t1|t2|t3)\//.test(window.location.pathname);
  }

  function _parseUrl() {
    var pts = window.location.pathname.split('/').filter(Boolean);
    return {
      tomo  : pts[0] || '',
      livro : pts[1] || '',
      cap   : pts[2] ? parseInt(pts[2]) : 0,
      pass  : pts[3] ? parseInt(pts[3]) : 0
    };
  }

  function _carregarScript(url, cb) {
    if (document.querySelector('script[src="' + url + '"]')) { if (cb) cb(); return; }
    var s = document.createElement('script');
    s.src = url;
    s.onload = function () { if (cb) cb(); };
    document.head.appendChild(s);
  }

  function _popularLivros(tomo, livroSel) {
    var sel = document.getElementById('m-sel-livro');
    if (!sel || !window.GA_NAVDATA || !window.GA_NAVDATA[tomo]) return;
    sel.disabled = false;
    sel.innerHTML = '';
    window.GA_NAVDATA[tomo].livros.forEach(function (l) {
      var o = document.createElement('option');
      o.value = l.sigla; o.textContent = l.sigla + ' — ' + l.nome;
      if (l.sigla === livroSel) o.selected = true;
      sel.appendChild(o);
    });
  }

  function _popularCaps(tomo, livro, capSel) {
    var sel = document.getElementById('m-sel-cap');
    if (!sel || !window.GA_NAVDATA || !window.GA_NAVDATA[tomo]) return;
    var ld = window.GA_NAVDATA[tomo].livros.find(function (l) { return l.sigla === livro; });
    if (!ld) return;
    sel.disabled = false;
    sel.innerHTML = '';
    ld.caps.forEach(function (c) {
      var o = document.createElement('option');
      o.value = c.num;
      o.textContent = 'CAP. ' + c.num;
      if (c.num === capSel) o.selected = true;
      sel.appendChild(o);
    });
  }

  function _popularPassagens(tomo, livro, cap, passSel) {
    var sel = document.getElementById('m-sel-pass');
    if (!sel || !window.GA_NAVDATA || !window.GA_NAVDATA[tomo]) return;
    var ld = window.GA_NAVDATA[tomo].livros.find(function (l) { return l.sigla === livro; });
    if (!ld) return;
    var cd = ld.caps.find(function (c) { return c.num === cap; });
    if (!cd || !cd.pass || !cd.pass.length) return;
    sel.disabled = false;
    sel.innerHTML = '';
    cd.pass.forEach(function (p) {
      var o = document.createElement('option');
      o.value = p; o.textContent = 'PASS.' + p;
      if (p === passSel) o.selected = true;
      sel.appendChild(o);
    });
  }

  function _popularDropdowns() {
    if (!window.GA_NAVDATA) return;
    var u  = _parseUrl();
    var st = document.getElementById('m-sel-tomo');
    var sl = document.getElementById('m-sel-livro');
    var sc = document.getElementById('m-sel-cap');
    var sp = document.getElementById('m-sel-pass');
    var _dash = '<option value="" disabled selected>—</option>';

    // Reseta dependentes antes de popular para não exibir valores de navegação anterior
    if (sl) { sl.innerHTML = _dash; sl.disabled = true; }
    if (sc) { sc.innerHTML = _dash; sc.disabled = true; }
    if (sp) { sp.innerHTML = _dash; sp.disabled = true; }

    if (st) st.value = u.tomo;

    if (u.tomo && u.livro) {
      _popularLivros(u.tomo, u.livro);
      if (u.cap) {
        _popularCaps(u.tomo, u.livro, u.cap);
        if (u.pass) _popularPassagens(u.tomo, u.livro, u.cap, u.pass);
      }
    }
    // Se só tomo (sem livro), os selects dependentes ficam como "—" (já resetados acima)

    // Abrevia selects após popular (mostra só I/II/III e número da pass)
    _abreviarSelTomo();
    _abreviarSelPass();
  }

  function _atualizarBarraDropdown() {
    var bar = document.getElementById('m-nav-drop');
    if (_ehConteudo()) {
      if (bar) { bar.style.display = 'block'; _popularDropdowns(); }
      else     { _criarBarraDropdown(); }
    } else {
      if (bar) bar.style.display = 'none';
    }
  }

  function _criarBarraDropdown() {
    var header = document.querySelector('header');
    if (!header) return;

    var bar = document.createElement('div');
    bar.id = 'm-nav-drop';
    bar.style.cssText = 'border-top:1px solid #DCDCDC;background:#F9F7F4;overflow:hidden;';

    // Wrapper centralizado alinhado ao max-w-3xl do conteúdo (≈ 48rem)
    var inner = document.createElement('div');
    inner.style.cssText = 'max-width:48rem;margin:0 auto;padding:5px 16px;display:flex;gap:5px;align-items:center;';

    var mkSep = function () {
      var sp = document.createElement('span');
      sp.textContent = '›';
      sp.style.cssText = 'color:#DCDCDC;flex-shrink:0;font-size:.9rem;';
      return sp;
    };

    // Selects sem placeholder navegável — disabled mostra traço visual
    var mkSel = function (id, disabled) {
      var s = document.createElement('select');
      s.id = id;
      s.style.cssText = _SEL_STYLE;
      s.disabled = !!disabled;
      if (disabled) s.innerHTML = '<option value="" disabled selected>—</option>';
      return s;
    };

    var selTomo  = mkSel('m-sel-tomo',  false);
    var selLivro = mkSel('m-sel-livro', true);
    var selCap   = mkSel('m-sel-cap',   true);
    var selPass  = mkSel('m-sel-pass',  true);

    // Proporções ajustadas: Tomo e Pass abreviados (I/II/3) precisam de menos espaço
    selTomo.style.flex  = '0.7';
    selLivro.style.flex = '3';    // mais espaço para "Sigla — Nome completo"
    selCap.style.flex   = '1.2';
    selPass.style.flex  = '0.7';

    // Tomo options (fixos — sem option vazio)
    [['t1','Tomo I'],['t2','Tomo II'],['t3','Tomo III']].forEach(function (t) {
      var o = document.createElement('option');
      o.value = t[0]; o.textContent = t[1];
      selTomo.appendChild(o);
    });

    inner.appendChild(selTomo);  inner.appendChild(mkSep());
    inner.appendChild(selLivro); inner.appendChild(mkSep());
    inner.appendChild(selCap);   inner.appendChild(mkSep());
    inner.appendChild(selPass);
    bar.appendChild(inner);
    header.appendChild(bar);

    // ── Cascade listeners ────────────────────────────────────────────

    // mousedown: desktop — captura o texto ANTES do browser renderizar o dropdown
    // touchstart: mobile — idem para toque
    // focus: fallback para teclado/acessibilidade
    function _restoreTomo() {
      Array.from(selTomo.options).forEach(function (o) { o.textContent = _TOMO_FULL[o.value] || o.textContent; });
    }
    selTomo.addEventListener('mousedown',  _restoreTomo);
    selTomo.addEventListener('touchstart', _restoreTomo, { passive: true });
    selTomo.addEventListener('focus',      _restoreTomo);
    selTomo.addEventListener('blur', function () { _abreviarSelTomo(); });

    selTomo.addEventListener('change', function () {
      var t = this.value;
      if (!t) return;
      // Limpa dependentes
      selLivro.innerHTML = ''; selLivro.disabled = false;
      selCap.innerHTML   = '<option value="" disabled selected>—</option>'; selCap.disabled = true;
      selPass.innerHTML  = '<option value="" disabled selected>—</option>'; selPass.disabled = true;
      _popularLivros(t, '');
      // Auto-navega ao 1.º livro do tomo
      if (window.GA_NAVDATA && window.GA_NAVDATA[t] && window.GA_NAVDATA[t].livros.length) {
        var fl = window.GA_NAVDATA[t].livros[0];
        selLivro.value = fl.sigla;
        navegarSPA('/' + t + '/' + fl.sigla + '/');
      } else {
        navegarSPA('/' + t + '/');
      }
      _abreviarSelTomo();
    });

    selLivro.addEventListener('change', function () {
      var t = selTomo.value, l = this.value;
      if (!l) return;
      // Limpa dependentes
      selCap.innerHTML  = ''; selCap.disabled = false;
      selPass.innerHTML = '<option value="" disabled selected>—</option>'; selPass.disabled = true;
      _popularCaps(t, l, 0);
      // Auto-navega ao cap. 1 do livro
      if (window.GA_NAVDATA && window.GA_NAVDATA[t]) {
        var ld = window.GA_NAVDATA[t].livros.find(function (lv) { return lv.sigla === l; });
        if (ld && ld.caps.length) {
          var fc = ld.caps[0];
          selCap.value = fc.num;
          navegarSPA('/' + t + '/' + l + '/' + fc.num + '/');
        } else {
          navegarSPA('/' + t + '/' + l + '/');
        }
      }
    });

    selCap.addEventListener('change', function () {
      var t = selTomo.value, l = selLivro.value, c = parseInt(this.value);
      selPass.innerHTML = ''; selPass.disabled = !c;
      if (c) { _popularPassagens(t, l, c, 0); navegarSPA('/' + t + '/' + l + '/' + c + '/'); }
    });

    function _restorePass() {
      Array.from(selPass.options).forEach(function (o) { if (o.value) o.textContent = 'PASS.' + o.value; });
    }
    selPass.addEventListener('mousedown',  _restorePass);
    selPass.addEventListener('touchstart', _restorePass, { passive: true });
    selPass.addEventListener('focus',      _restorePass);
    selPass.addEventListener('blur', function () { _abreviarSelPass(); });

    selPass.addEventListener('change', function () {
      var t = selTomo.value, l = selLivro.value, c = selCap.value, p = this.value;
      if (p) navegarSPA('/' + t + '/' + l + '/' + c + '/' + p + '/');
      _abreviarSelPass();
    });

    // Carrega navdata e popula conforme URL atual
    _carregarScript('/assets/navdata.js', _popularDropdowns);
  }

  // Inicia barra se estiver em página de conteúdo
  if (_ehConteudo()) _criarBarraDropdown();


  // ── BUSCA ────────────────────────────────────────────────────────

  var _buscaTimer = null;
  var _buscaModo  = 'parcial'; // 'parcial' = contém | 'exato' = palavra inteira

  // Escapa HTML para injeção segura
  function _escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // Envolve ocorrências da query em <mark> amarelo
  function _highlight(text, rawQuery) {
    if (!rawQuery || !text) return _escHtml(text);
    var escaped = rawQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Modo exato: \b ... \b; parcial: qualquer ocorrência
    var pattern = _buscaModo === 'exato'
      ? '(\\b' + escaped + '\\b)'
      : '(' + escaped + ')';
    try {
      var regex = new RegExp(pattern, 'gi');
      return _escHtml(text).replace(regex,
        '<mark style="background:#FEF08A;color:inherit;border-radius:2px;padding:0 1px;">$1</mark>');
    } catch(e) { return _escHtml(text); }
  }

  // Extrai contexto em torno do match: 5 palavras antes + match + 5 palavras depois
  function _contexto(text, rawQuery) {
    if (!text || !rawQuery) return text || '';
    try {
      var escaped = rawQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var re = new RegExp(escaped, 'i');
      var m  = re.exec(text);
      if (!m) {
        // Tenta via texto normalizado (fallback para diacríticos)
        var ni = _norm(text).indexOf(_norm(rawQuery));
        if (ni === -1) return text.length > 130 ? text.substring(0, 130) + '…' : text;
        m = { index: ni, 0: text.substring(ni, ni + rawQuery.length) };
      }
      var idx     = m.index;
      var matchTx = m[0];

      // Palavras antes do match
      var before      = text.substring(0, idx);
      var bWords      = before.length ? before.split(/\s+/).filter(Boolean) : [];
      var ctxBefore   = bWords.slice(-5).join(' ');
      var hasPrefix   = bWords.length > 5 || (bWords.length === 5 && before.trimStart() !== before);

      // Palavras depois do match
      var after       = text.substring(idx + matchTx.length);
      var aWords      = after.length ? after.split(/\s+/).filter(Boolean) : [];
      var ctxAfter    = aWords.slice(0, 5).join(' ');
      var hasSuffix   = aWords.length > 5;

      return (hasPrefix   ? '…' : '') +
             (ctxBefore   ? ctxBefore + ' ' : '') +
             matchTx +
             (ctxAfter    ? ' ' + ctxAfter : '') +
             (hasSuffix   ? '…' : '');
    } catch(e) {
      return text.length > 130 ? text.substring(0, 130) + '…' : text;
    }
  }

  function _norm(s) {
    // Remove diacríticos após NFD decomposition (U+0300-U+036F)
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function _renderBusca(items, query) {
    var div  = document.getElementById('m-busca-resultados');
    var hint = document.getElementById('m-busca-hint');
    if (!div) return;
    if (!items.length) {
      div.innerHTML = '<div style="padding:20px;text-align:center;color:#6B6B6B;font-size:.85rem;">Nenhum resultado para <em>"' + _escHtml(query) + '"</em>.</div>';
      if (hint) hint.style.display = 'none';
      return;
    }
    if (hint) hint.style.display = 'none';
    var q = _norm(query.trim());
    // Cabeçalho com contagem
    var total = items.length;
    var countHtml = '<div style="padding:8px 20px 6px;font-family:sans-serif;font-size:.75rem;color:#6B6B6B;border-bottom:1px solid #f0f0f0;">' +
      total + (total === 1 ? ' resultado' : ' resultados') + ' para <em>"' + _escHtml(query) + '"</em>' +
      (total === 20 ? ' <span style="color:#9B9B9B">(limite de exibição)</span>' : '') +
      '</div>';
    div.innerHTML = countHtml + items.map(function (it) {
      // Escolhe snippet: usa texto se contém match; caso contrário usa capDesc (que foi o que casou)
      var alvo = _norm(it.texto || '').includes(q)
        ? (it.texto || '')
        : (it.capDesc || it.texto || '');
      // Snippet inteligente: 5 palavras antes + match + 5 palavras depois
      var snip = _contexto(alvo, query);
      return '<a href="' + _escHtml(it.url) + '" class="_ga-busca-res" style="display:block;padding:12px 20px;border-bottom:1px solid #f0f0f0;text-decoration:none;color:#1C1C1E;font-family:sans-serif;">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">' +
          '<span style="font-family:monospace;font-size:.7rem;background:#F9F7F4;color:#6B6B6B;padding:2px 6px;border-radius:4px;white-space:nowrap;">' + _escHtml(it.ref) + '</span>' +
          '<span style="font-size:.8rem;color:#1A3A5C;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + _highlight(it.capTitulo || it.livroNome, query) + '</span>' +
        '</div>' +
        '<p style="font-size:.83rem;color:#6B6B6B;margin:0;line-height:1.6;">' + _highlight(snip, query) + '</p>' +
      '</a>';
    }).join('');
  }

  function _executarBusca(query) {
    var div  = document.getElementById('m-busca-resultados');
    var hint = document.getElementById('m-busca-hint');
    if (!query || !query.trim()) {
      if (div)  div.innerHTML = '';
      if (hint) { hint.style.display='block'; }
      return;
    }
    if (!window.GA_SEARCH) {
      if (hint) { hint.style.display='block'; hint.innerHTML='Carregando índice…'; }
      _carregarScript('/assets/search-index.js', function () { _executarBusca(query); });
      return;
    }
    var q = _norm(query.trim());
    var res = window.GA_SEARCH.filter(function (it) {
      var hay = _norm(it.texto + ' ' + it.capTitulo + ' ' + (it.capDesc || '') + ' ' + it.livroNome);
      if (_buscaModo === 'exato') {
        // Palavra inteira: q deve aparecer como token isolado
        return hay.split(/\W+/).indexOf(q) !== -1;
      }
      return hay.includes(q);
    }).slice(0, 20);
    _renderBusca(res, query);
  }

  function _onBuscaInput(e) {
    var q = e.target.value;
    clearTimeout(_buscaTimer);
    if (q.length >= 3) {
      _buscaTimer = setTimeout(function () { _executarBusca(q); }, 280);
    } else {
      var div  = document.getElementById('m-busca-resultados');
      var hint = document.getElementById('m-busca-hint');
      if (div)  div.innerHTML = '';
      if (hint) hint.style.display = 'block';
    }
  }

  function _abrirBusca(valorInicial) {
    abrirModal('modal-busca');
    setTimeout(function () {
      var inp = document.getElementById('m-busca-input');
      if (!inp) return;
      inp.focus();
      if (valorInicial) { inp.value = valorInicial; _executarBusca(valorInicial); }
    }, 80);
  }

  // Input do modal de busca
  var _buscaMainInput = document.getElementById('m-busca-input');
  if (_buscaMainInput) {
    _buscaMainInput.addEventListener('input', _onBuscaInput);
    _buscaMainInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && this.value.trim()) _executarBusca(this.value);
      if (e.key === 'Escape') fecharModal('modal-busca');
    });
  }

  // Input do drawer → abre modal com o texto
  var _buscaDrawerInput = document.getElementById('m-busca-drawer');
  if (_buscaDrawerInput) {
    _buscaDrawerInput.addEventListener('keydown', function (e) {
      var q = this.value;
      if (e.key === 'Enter' && q.trim()) {
        fecharDrawer();
        setTimeout(function () { _abrirBusca(q); }, 180);
      }
    });
    _buscaDrawerInput.addEventListener('input', function () {
      if (this.value.length >= 3) {
        var q = this.value;
        fecharDrawer();
        setTimeout(function () { _abrirBusca(q); }, 180);
      }
    });
  }

  // Fechar busca ao clicar em resultado (SPA cuida da navegação)
  document.addEventListener('click', function (e) {
    if (e.target.closest('._ga-busca-res')) fecharModal('modal-busca');
  });

  // ── TOGGLE MODO DE BUSCA (Contém / Palavra inteira) ──────────────
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-busca-modo]');
    if (!btn) return;
    _buscaModo = btn.dataset.buscaModo;
    // Atualiza estilos dos botões
    document.querySelectorAll('[data-busca-modo]').forEach(function (b) {
      var ativo = b.dataset.buscaModo === _buscaModo;
      b.style.background   = ativo ? '#1A3A5C' : 'transparent';
      b.style.color        = ativo ? '#fff'     : '#6B6B6B';
      b.style.borderColor  = ativo ? '#1A3A5C'  : '#DCDCDC';
    });
    // Re-executa busca se já há query digitada
    var inp = document.getElementById('m-busca-input');
    if (inp && inp.value.trim()) _executarBusca(inp.value.trim());
  });

  // ── PERSONALIZAÇÃO DE LEITURA ────────────────────────────────────
  // Fontes, tamanho, espaçamento entre linhas e letras.
  // Persistido em localStorage como 'gaLeitura'.
  // Aplicado via <style id="ga-leitura-style"> injetado no <head>.

  var _LEITURA_DEF = { fonte: 'playfair', tamanho: 'md', linha: 'med', letra: 'med' };
  var _gaLeitura   = Object.assign({}, _LEITURA_DEF);

  var _FONTE_MAP   = {
    'playfair': "'Playfair Display', Georgia, serif",
    'pt-serif': "'PT Serif', Georgia, serif",
    'spectral': "'Spectral', Georgia, serif",
    'neuton':   "'Neuton', Georgia, serif"
  };
  var _SIZE_MAP  = { 'pq': '0.87rem', 'md': '1rem',   'gr': '1.14rem', 'ex': '1.3rem' };
  var _LH_MAP    = { 'min': '1.5',    'med': '1.7',    'max': '2.1' };
  var _LS_MAP    = { 'min': '-0.02em','med': '0em',    'max': '0.06em' };

  function _carregarLeitura() {
    try {
      var s = localStorage.getItem('gaLeitura');
      if (s) {
        var parsed = JSON.parse(s);
        _gaLeitura = Object.assign({}, _LEITURA_DEF, parsed);
      }
    } catch(e) {}
  }

  function _salvarLeitura() {
    try { localStorage.setItem('gaLeitura', JSON.stringify(_gaLeitura)); } catch(e) {}
  }

  function _gerarCSSLeitura(cfg) {
    var font = _FONTE_MAP[cfg.fonte]   || _FONTE_MAP['playfair'];
    var size = _SIZE_MAP[cfg.tamanho]  || '1rem';
    var lh   = _LH_MAP[cfg.linha]     || '1.7';
    var ls   = _LS_MAP[cfg.letra]     || '0em';
    // .font-serif: aplica fonte a todos os elementos serif (títulos e passagens)
    // main p.font-serif: aplica tamanho/espaçamento só ao texto das passagens
    return '.font-serif{font-family:' + font + '!important;}' +
      'main p.font-serif,main blockquote p{font-size:' + size + '!important;line-height:' + lh + '!important;letter-spacing:' + ls + '!important;}';
  }

  function _aplicarLeitura(cfg) {
    var el = document.getElementById('ga-leitura-style');
    if (!el) {
      el = document.createElement('style');
      el.id = 'ga-leitura-style';
      document.head.appendChild(el);
    }
    el.textContent = _gerarCSSLeitura(cfg);
    _atualizarPreviaLeitura(cfg);
  }

  function _atualizarPreviaLeitura(cfg) {
    var pp = document.getElementById('leitura-previa-p');
    if (!pp) return;
    pp.style.fontFamily    = _FONTE_MAP[cfg.fonte]  || _FONTE_MAP['playfair'];
    pp.style.fontSize      = _SIZE_MAP[cfg.tamanho] || '1rem';
    pp.style.lineHeight    = _LH_MAP[cfg.linha]     || '1.7';
    pp.style.letterSpacing = _LS_MAP[cfg.letra]     || '0em';
  }

  function _sincronizarBotoesLeitura(cfg) {
    var dark = isDark();
    var grupos = [
      ['data-leitura-fonte',   'fonte'],
      ['data-leitura-tamanho', 'tamanho'],
      ['data-leitura-linha',   'linha'],
      ['data-leitura-letra',   'letra']
    ];
    grupos.forEach(function(g) {
      document.querySelectorAll('[' + g[0] + ']').forEach(function(btn) {
        var ativo = btn.getAttribute(g[0]) === cfg[g[1]];
        btn.style.background  = ativo ? '#1A3A5C' : (dark ? '#1A2B3C' : '#F9F7F4');
        btn.style.color       = ativo ? '#fff'     : (dark ? '#7BB3E0' : '#1A3A5C');
        btn.style.borderColor = ativo ? '#1A3A5C'  : (dark ? '#2A3D50' : '#DCDCDC');
      });
    });
  }

  // ── RESET DE PREFERÊNCIAS ────────────────────────────────────────
  // Limpa gaTheme + gaLeitura do localStorage e volta ao padrão visual.

  function _resetarTudo() {
    if (!confirm('Redefinir todas as preferências para o padrão?\n(Tema claro, fonte Playfair, tamanho e espaçamento médios)')) return;
    // 1. Limpa localStorage
    try {
      localStorage.removeItem('gaTheme');
      localStorage.removeItem('gaLeitura');
    } catch(e) {}
    // 2. Volta ao tema claro
    aplicarTema(false);
    // 3. Volta leitura ao padrão — re-aplica CSS defaults explicitamente
    //    (não zera o elemento; injeta os valores padrão para evitar quirks de fonte)
    _gaLeitura = Object.assign({}, _LEITURA_DEF);
    _aplicarLeitura(_gaLeitura);
    _sincronizarBotoesLeitura(_gaLeitura);
  }

  // Event delegation para botões de personalização
  document.addEventListener('click', function(e) {
    // Reset de preferências
    if (e.target.closest('[data-reset-all]')) {
      e.preventDefault();
      _resetarTudo();
      return;
    }

    var grupos = [
      ['data-leitura-fonte',   'fonte'],
      ['data-leitura-tamanho', 'tamanho'],
      ['data-leitura-linha',   'linha'],
      ['data-leitura-letra',   'letra']
    ];
    for (var i = 0; i < grupos.length; i++) {
      var par = grupos[i];
      var btn = e.target.closest('[' + par[0] + ']');
      if (btn) {
        _gaLeitura[par[1]] = btn.getAttribute(par[0]);
        _salvarLeitura();
        _aplicarLeitura(_gaLeitura);
        _sincronizarBotoesLeitura(_gaLeitura);
        return;
      }
    }
  });

  // Inicialização: carrega do localStorage e aplica
  _carregarLeitura();
  if (_gaLeitura.fonte !== 'playfair' || _gaLeitura.tamanho !== 'md' || _gaLeitura.linha !== 'med' || _gaLeitura.letra !== 'med') {
    _aplicarLeitura(_gaLeitura);
  }

  // Atualiza dropdown bar após cada SPA nav (re-hook em navegarSPA é feito abaixo)
  var _navegarSPA_orig = navegarSPA;
  navegarSPA = async function (url) {
    await _navegarSPA_orig(url);
    _atualizarBarraDropdown();
    // Re-avalia posição vertical após troca de conteúdo (novo conteúdo pode ser mais curto)
    setTimeout(_reposicionarBotoesNavVertical, 120);
  };

// ── DROPDOWNS DO HEADER DESKTOP — hover com delay 150ms ──────────────────────
(function () {
  var allIds = ['biblia', 'redes', 'cosmo'];
  var timers = {};

  function fecharTodos() {
    allIds.forEach(function (d) {
      var el = document.getElementById('drop-' + d);
      if (el) el.style.display = 'none';
    });
  }

  allIds.forEach(function (id) {
    var btn  = document.getElementById('btn-' + id);
    var drop = document.getElementById('drop-' + id);
    if (!btn || !drop) return;
    var li = btn.parentElement; // <li> pai

    li.addEventListener('mouseenter', function () {
      clearTimeout(timers[id]);
      fecharTodos();
      drop.style.display = 'block';
    });
    li.addEventListener('mouseleave', function () {
      timers[id] = setTimeout(function () {
        drop.style.display = 'none';
      }, 150);
    });
    drop.addEventListener('mouseenter', function () {
      clearTimeout(timers[id]);
    });
  });

  document.addEventListener('click', function (e) {
    var dentro = allIds.some(function (d) {
      return e.target.closest('#btn-' + d) || e.target.closest('#drop-' + d);
    });
    if (!dentro) fecharTodos();
  });
})();

})();
