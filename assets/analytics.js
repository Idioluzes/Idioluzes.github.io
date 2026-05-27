// analytics.js — métricas de acesso centralizadas
// Para ativar cada serviço: troque false por true e preencha o ID correspondente.
// Muda só aqui — reflete em todas as páginas do site automaticamente.

(function () {

  // ── CONFIGURAÇÃO ─────────────────────────────────────────────────

  var ANALYTICS_GA4        = false;  // Google Analytics 4
  var ANALYTICS_CLARITY    = false;  // Microsoft Clarity (+ gravação de sessão + heatmap)
  var ANALYTICS_CLOUDFLARE = false;  // Cloudflare Web Analytics (sem cookies)

  var GA4_ID     = 'G-XXXXXXXXXX';                   // analytics.google.com
  var CLARITY_ID = 'xxxxxxxxxx';                     // clarity.microsoft.com
  var CF_TOKEN   = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // cloudflare.com → Web Analytics

  // ── GOOGLE ANALYTICS 4 ───────────────────────────────────────────

  if (ANALYTICS_GA4 && GA4_ID !== 'G-XXXXXXXXXX') {
    var sGA = document.createElement('script');
    sGA.async = true;
    sGA.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(sGA);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA4_ID);
  }

  // ── MICROSOFT CLARITY ────────────────────────────────────────────

  if (ANALYTICS_CLARITY && CLARITY_ID !== 'xxxxxxxxxx') {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }

  // ── CLOUDFLARE WEB ANALYTICS ─────────────────────────────────────

  if (ANALYTICS_CLOUDFLARE && CF_TOKEN !== 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
    var sCF = document.createElement('script');
    sCF.defer = true;
    sCF.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    sCF['data-cf-beacon'] = '{"token":"' + CF_TOKEN + '"}';
    sCF.setAttribute('data-cf-beacon', '{"token":"' + CF_TOKEN + '"}');
    document.head.appendChild(sCF);
  }

})();
