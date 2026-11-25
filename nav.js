/* Menu commun BEA — injecté sur les 6 pages.
   Remplace l'en-tête propre à chaque page par un menu identique partout. */
(function () {
  var PAGES = [
    { href: '/diagnostic-strategique/', label: 'Diagnostic', full: 'Diagnostic Stratégique', group: '01 · Comprendre et préparer' },
    { href: '/etude-de-finition/', label: 'Étude de finition', full: 'Étude de Finition', group: '01 · Comprendre et préparer' },
    { href: '/bibliotheque/', label: 'Bibliothèque', full: 'Bibliothèque Privée', group: '02 · Explorer et valider' },
    { href: '/immersion/', label: 'Immersion', full: 'Immersion Turquie & Chine', group: '02 · Explorer et valider' },
    { href: '/pilotage-des-achats/', label: 'Pilotage', full: 'Pilotage des achats', group: '03 · Exécuter et sécuriser' }
  ];
  var CTA = { href: '/#contact', label: 'Analyser mon projet' };

  function norm(p) { return (p || '/').replace(/index\.html$/, '').replace(/\/?$/, '/'); }
  var here = norm(location.pathname);

  var css = [
    'nav[data-nav],header.bea-sec{display:none!important}',
    '#bea-nav{position:fixed;top:0;left:0;right:0;z-index:9999;font-family:Inter,system-ui,sans-serif;transition:background .35s ease,border-color .35s ease,backdrop-filter .35s ease;border-bottom:1px solid transparent;background:linear-gradient(180deg,rgba(5,5,5,.88) 0%,rgba(5,5,5,.55) 65%,rgba(5,5,5,0) 100%)}',
    '#bea-nav.bea-solid{background:rgba(5,5,5,.82);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-color:rgba(255,255,255,.07)}',
    '#bea-nav .bn-in{max-width:1320px;margin:0 auto;padding:16px clamp(18px,4vw,48px);display:flex;align-items:center;justify-content:space-between;gap:24px}',
    '#bea-nav .bn-logo{display:flex;align-items:center;text-decoration:none;color:#F4EFE8;font-weight:800;font-size:28px;letter-spacing:-.04em;flex-shrink:0}',
    '#bea-nav .bn-logo span{color:#C41E3A}',
    '#bea-nav .bn-links{display:flex;align-items:center;gap:clamp(14px,2vw,30px);list-style:none;margin:0;padding:0}',
    '#bea-nav .bn-links a{color:rgba(244,239,232,.72);text-decoration:none;font-size:14px;font-weight:500;letter-spacing:.01em;padding:6px 0;border-bottom:2px solid transparent;transition:color .2s,border-color .2s;white-space:nowrap}',
    '#bea-nav .bn-links a:hover{color:#F4EFE8}',
    '#bea-nav .bn-links a.bn-on{color:#F4EFE8;border-color:#C41E3A}',
    '#bea-nav .bn-cta{flex-shrink:0;background:#C41E3A;color:#fff;text-decoration:none;border-radius:50px;padding:11px 24px;font-size:13px;font-weight:600;letter-spacing:.015em;transition:box-shadow .24s,transform .24s}',
    '#bea-nav .bn-cta:hover{box-shadow:0 0 28px rgba(196,30,58,.55);transform:translateY(-1px)}',
    '#bea-nav .bn-burger{display:none;background:none;border:0;padding:8px;cursor:pointer;flex-direction:column;gap:5px}',
    '#bea-nav .bn-burger i{display:block;width:24px;height:2px;background:#F4EFE8;border-radius:2px;transition:transform .25s,opacity .25s}',
    '#bea-nav.bn-open .bn-burger i:nth-child(1){transform:translateY(7px) rotate(45deg)}',
    '#bea-nav.bn-open .bn-burger i:nth-child(2){opacity:0}',
    '#bea-nav.bn-open .bn-burger i:nth-child(3){transform:translateY(-7px) rotate(-45deg)}',
    '#bea-nav .bn-panel{display:none}',
    '@media(max-width:1020px){',
    '  #bea-nav .bn-links,#bea-nav .bn-in>.bn-cta{display:none}',
    '  #bea-nav .bn-burger{display:flex}',
    '  #bea-nav.bn-open{background:#050505;border-color:rgba(255,255,255,.07)}',
    '  #bea-nav.bn-open .bn-panel{display:block;padding:8px clamp(18px,4vw,48px) 28px;max-height:calc(100vh - 70px);overflow:auto}',
    '  #bea-nav .bn-group{margin-top:18px}',
    '  #bea-nav .bn-gt{color:rgba(244,239,232,.4);font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;margin-bottom:6px}',
    '  #bea-nav .bn-panel a.bn-pl{display:block;color:#F4EFE8;text-decoration:none;font-size:19px;font-weight:600;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.06)}',
    '  #bea-nav .bn-panel a.bn-pl.bn-on{color:#C41E3A}',
    '  #bea-nav .bn-panel .bn-cta{display:block;text-align:center;margin-top:26px;padding:15px 24px;font-size:15px}',
    '}'
  ].join('\n');

  function build() {
    if (document.getElementById('bea-nav')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

    var nav = document.createElement('div'); nav.id = 'bea-nav';
    var links = PAGES.map(function (p) {
      return '<li><a href="' + p.href + '"' + (norm(p.href) === here ? ' class="bn-on"' : '') + '>' + p.label + '</a></li>';
    }).join('');
    var groups = {};
    PAGES.forEach(function (p) { (groups[p.group] = groups[p.group] || []).push(p); });
    var panel = Object.keys(groups).map(function (g) {
      return '<div class="bn-group"><div class="bn-gt">' + g + '</div>' + groups[g].map(function (p) {
        return '<a class="bn-pl' + (norm(p.href) === here ? ' bn-on' : '') + '" href="' + p.href + '">' + p.full + '</a>';
      }).join('') + '</div>';
    }).join('');

    nav.innerHTML =
      '<div class="bn-in">' +
        '<a class="bn-logo" href="/" aria-label="BEA — accueil">bea<span>.</span></a>' +
        '<ul class="bn-links">' + links + '</ul>' +
        '<a class="bn-cta" href="' + CTA.href + '">' + CTA.label + '</a>' +
        '<button class="bn-burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false"><i></i><i></i><i></i></button>' +
      '</div>' +
      '<div class="bn-panel"><a class="bn-pl' + (here === '/' ? ' bn-on' : '') + '" href="/">Accueil</a>' + panel +
        '<a class="bn-cta" href="' + CTA.href + '">' + CTA.label + '</a></div>';
    document.body.appendChild(nav);

    var btn = nav.querySelector('.bn-burger');
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('bn-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.bn-panel a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('bn-open'); });
    });

    function onScroll() { nav.classList.toggle('bea-solid', window.scrollY > 40); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    // « Analyser mon projet » sur l'accueil : défilement doux vers le formulaire
    if (here === '/') {
      nav.querySelectorAll('a[href="/#contact"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
          var t = document.getElementById('contact');
          if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
      });
    }
  }

  // Arrivée sur /#contact depuis une autre page : attendre le rendu puis défiler
  function jumpToHash() {
    if (!location.hash) return;
    var id = location.hash.slice(1), tries = 0;
    (function go() {
      var t = document.getElementById(id);
      if (t) { t.scrollIntoView(); return; }
      if (++tries < 40) setTimeout(go, 100);
    })();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { build(); jumpToHash(); });
  } else { build(); jumpToHash(); }
})();
