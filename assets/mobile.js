// mobile.js — bottom nav, drawer lateral e modais para todas as páginas
// Centralizado aqui: muda em 1 lugar, reflete em todo o site.

(function () {

  // ── HTML INJETADO ────────────────────────────────────────────────

  const html = `
  <!-- OVERLAY DO DRAWER -->
  <div id="m-overlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:200;"></div>

  <!-- DRAWER LATERAL ESQUERDO -->
  <nav id="m-drawer" aria-label="Menu lateral" style="position:fixed;top:0;left:0;bottom:0;width:80%;max-width:300px;background:#fff;z-index:201;transform:translateX(-100%);transition:transform .28s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;overflow-y:auto;">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #DCDCDC;">
      <span style="font-family:'Playfair Display',Georgia,serif;font-weight:700;color:#1A3A5C;font-size:1.1rem;">Grande Ateu</span>
      <button id="m-drawer-close" aria-label="Fechar menu" style="background:none;border:none;cursor:pointer;padding:4px;color:#6B6B6B;">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <ul style="list-style:none;margin:0;padding:12px 0;flex:1;">
      <li><a href="/t1/" style="display:block;padding:14px 20px;color:#1C1C1E;font-family:sans-serif;font-size:.9rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f0f0f0;">Tomo I — Ruptura</a></li>
      <li><a href="/t2/" style="display:block;padding:14px 20px;color:#1C1C1E;font-family:sans-serif;font-size:.9rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f0f0f0;">Tomo II — Edificação</a></li>
      <li><a href="/t3/" style="display:block;padding:14px 20px;color:#1C1C1E;font-family:sans-serif;font-size:.9rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f0f0f0;">Tomo III — Consolidação</a></li>
      <li><a href="/faq/" style="display:block;padding:14px 20px;color:#1C1C1E;font-family:sans-serif;font-size:.9rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f0f0f0;">FAQ</a></li>
      <li><a href="/sobre/" style="display:block;padding:14px 20px;color:#1C1C1E;font-family:sans-serif;font-size:.9rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f0f0f0;">Sobre</a></li>
      <li><a href="#" data-modal="modal-apoiar" style="display:block;padding:14px 20px;color:#6B6B6B;font-family:sans-serif;font-size:.9rem;font-weight:600;text-decoration:none;border-bottom:1px solid #f0f0f0;">Apoiar</a></li>
      <li><a href="#" data-modal="modal-config" style="display:block;padding:14px 20px;color:#6B6B6B;font-family:sans-serif;font-size:.9rem;font-weight:600;text-decoration:none;">Configurações</a></li>
    </ul>
    <div style="padding:16px 20px;border-top:1px solid #DCDCDC;display:flex;gap:14px;align-items:center;">
      <a href="/" title="Português"><img src="/assets/flags/br.svg" alt="PT" width="30" height="21" style="border-radius:2px;display:block;"></a>
      <a href="https://translate.google.com/translate?sl=pt&tl=en&u=https://idioluzes.github.io/" target="_blank" rel="noopener" title="English"><img src="/assets/flags/us.svg" alt="EN" width="30" height="21" style="border-radius:2px;display:block;"></a>
      <a href="https://translate.google.com/translate?sl=pt&tl=es&u=https://idioluzes.github.io/" target="_blank" rel="noopener" title="Español"><img src="/assets/flags/es.svg" alt="ES" width="30" height="21" style="border-radius:2px;display:block;"></a>
      <a href="https://translate.google.com/translate?sl=pt&tl=de&u=https://idioluzes.github.io/" target="_blank" rel="noopener" title="Deutsch"><img src="/assets/flags/de.svg" alt="DE" width="30" height="21" style="border-radius:2px;display:block;"></a>
      <a href="https://translate.google.com/translate?sl=pt&tl=fr&u=https://idioluzes.github.io/" target="_blank" rel="noopener" title="Français"><img src="/assets/flags/fr.svg" alt="FR" width="30" height="21" style="border-radius:2px;display:block;"></a>
    </div>
  </nav>

  <!-- MODAL: APOIAR -->
  <div id="modal-apoiar" style="display:none;position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.5);align-items:center;justify-content:center;padding:20px;">
    <div style="background:#fff;border-radius:12px;width:100%;max-width:420px;max-height:85vh;overflow-y:auto;font-family:sans-serif;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 20px 16px;border-bottom:1px solid #DCDCDC;">
        <span style="font-family:'Playfair Display',Georgia,serif;font-weight:700;color:#1A3A5C;font-size:1.2rem;">Apoiar o Projeto</span>
        <button data-fechar="modal-apoiar" style="background:none;border:none;cursor:pointer;color:#6B6B6B;font-size:1.4rem;line-height:1;">✕</button>
      </div>
      <div style="padding:20px;color:#1C1C1E;font-size:.9rem;line-height:1.7;">
        <p style="margin-bottom:12px;">A Bíblia Ateia é uma obra gratuita, disponível para todos, sem anúncios e sem muros de pagamento.</p>
        <p style="margin-bottom:12px;">Se esta obra tocou você de alguma forma — se fez você pensar, questionar ou simplesmente sentir que não está sozinho — considere apoiar sua continuidade.</p>
        <p style="margin-bottom:20px;">Qualquer valor é bem-vindo e vai direto para a manutenção do site, do app e da escrita dos próximos livros.</p>
        <div style="background:#F9F7F4;border:1px solid #DCDCDC;border-radius:8px;padding:16px;text-align:center;color:#6B6B6B;font-size:.85rem;">
          💳 Formas de apoio em breve.<br>Obrigado por chegar até aqui.
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
        <li><a href="#" data-placeholder style="display:flex;align-items:center;gap:14px;padding:15px 20px;color:#1C1C1E;text-decoration:none;font-size:.9rem;font-weight:600;"><span style="font-size:1.2rem;">🔐</span> Login</a></li>
      </ul>
    </div>
  </div>

  <!-- BOTTOM NAV — só mobile -->
  <nav id="m-bottom-nav" aria-label="Navegação mobile" style="display:none;position:fixed;bottom:0;left:0;right:0;z-index:100;background:#1A3A5C;border-top:1px solid #2a4f7a;height:60px;">
    <div style="display:flex;align-items:stretch;height:100%;max-width:480px;margin:0 auto;">
      <a href="/" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:white;text-decoration:none;font-family:sans-serif;font-size:10px;font-weight:600;letter-spacing:.04em;padding:8px 4px;">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12L12 3l9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/></svg>
        Home
      </a>
      <a href="#" data-modal="modal-apoiar" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:#93c5fd;text-decoration:none;font-family:sans-serif;font-size:10px;font-weight:600;letter-spacing:.04em;padding:8px 4px;">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"/></svg>
        Apoiar
      </a>
      <a href="#" data-modal="modal-config" style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;color:#93c5fd;text-decoration:none;font-family:sans-serif;font-size:10px;font-weight:600;letter-spacing:.04em;padding:8px 4px;">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>
        Configurações
      </a>
    </div>
  </nav>`;

  document.body.insertAdjacentHTML('beforeend', html);

  // ── OCULTAR FOOTER DESKTOP NO MOBILE ────────────────────────────
  // Em mobile a barra inferior substitui o footer. CSS via media query.
  const mobileStyle = document.createElement('style');
  mobileStyle.textContent = '@media(max-width:767px){footer[role="contentinfo"]{display:none!important;}}';
  document.head.appendChild(mobileStyle);

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
    document.body.style.paddingBottom = visivel ? '60px' : '';
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

  // ── FECHAR DRAWER ────────────────────────────────────────────────

  document.getElementById('m-drawer-close').addEventListener('click', fecharDrawer);
  document.getElementById('m-overlay').addEventListener('click', fecharDrawer);

  // ── LINKS COM data-modal ─────────────────────────────────────────

  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-modal]');
    if (el) {
      e.preventDefault();
      fecharDrawer();
      setTimeout(() => abrirModal(el.dataset.modal), 150);
    }
    const fc = e.target.closest('[data-fechar]');
    if (fc) { fecharModal(fc.dataset.fechar); }
    const ph = e.target.closest('[data-placeholder]');
    if (ph) { e.preventDefault(); alert('Em breve.'); }
    // Fechar modal ao clicar no overlay (fora do conteúdo)
    if (e.target.id === 'modal-apoiar' || e.target.id === 'modal-config') {
      fecharModal(e.target.id);
    }
  });

})();
