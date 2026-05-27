"""
Gerador de páginas HTML do Tomo II e Tomo III — Grande Ateu
Estrutura: pasta/index.html para URLs limpas
"""
import os
import random
import json

random.seed(99)

BASE = os.path.dirname(os.path.abspath(__file__))

TOMES = {
    "t2": {
        "num": "II",
        "nome": "Edificação",
        "desc": "Cosmovisão ateísta. Catorze livros que revelam, estruturam e ensinam o Ateísmo como caminho de lucidez.",
        "books": [
            ("At", "Ateísmo"),
            ("Pi", "Pirâmide"),
            ("Ve", "Verdade"),
            ("Gr", "Grande"),
            ("Pr", "Princípios"),
            ("Va", "Valores"),
            ("Cd", "Condutas"),
            ("Fe", "Fé"),
            ("Jo", "Jornada"),
            ("Az", "Ateização"),
            ("Ca", "Catecismo"),
            ("Ex", "Existencial"),
            ("Mx", "Máximas"),
            ("Cn", "Conceituações"),
        ],
    },
    "t3": {
        "num": "III",
        "nome": "Consolidação",
        "desc": "Multiplicação e vida prática. Doze livros que orientam o Ateu a viver e transmitir sua cosmovisão.",
        "books": [
            ("Be", "Berço"),
            ("Ap", "Apologética"),
            ("Po", "Poemas"),
            ("Gl", "Glória"),
            ("Pd", "Poderio"),
            ("Re", "Reflexões"),
            ("Ac", "Aconselhamento"),
            ("Si", "Seitas"),
            ("En", "Enfermos"),
            ("Dk", "Descanso"),
            ("Ar", "Armagedon"),
            ("Fc", "Fecho Canônico"),
        ],
    },
}

LATIN_SENTENCES = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Veritas non quaerit angulos nec timet lucem.",
    "Ratio sola via est ad scientiam et libertatem mentis.",
    "Homo sapiens, si vere sapit, dogma relinquit.",
    "Nulla divinitas requiritur ut bene et honeste vivamus.",
    "Scientia fundamentum est omnis lucis in mente humana.",
    "Libertas cogitandi maxima virtus est hominis liberi.",
    "Non in caelo, sed in terra vita nostra est agenda.",
    "Ethica sine deo non solum possibilis sed necessaria est.",
    "Sapientia non ex fide caeca, sed ex ratione pura nascitur.",
    "Qui quaerit veritatem, non timet errorem proprium agnoscere.",
    "Mens humana, non spiritus, rerum domina et architecta est.",
    "Dubium primum et necessarium est passum ad intelligentiam.",
    "In natura, non in fabula antiqua, vera veritas latet.",
    "Mortalis sum et hoc ipsum satis est ad felicitatem.",
    "Virtus in ratione et humanitate posita est, non in ritu.",
    "Antiqua dogmata cadunt sub lumine crescentis scientiae.",
    "Omnia ex materia et energia et lege constant atque fluunt.",
    "Conscientia humana flos longissimae evolutionis est.",
    "Sine metu vivitur, cum ratione et studio floretur.",
    "Pax in mente rationali et disciplinata semper invenitur.",
    "Non deus, sed homo ipse mundi faber et custos est.",
    "Veritatis amor omnia vincit, omnia illuminat, omnia liberat.",
    "Ignorantia timorem parit; scientia et ratio pacem pariunt.",
    "Qui rationi credit, toti naturae et mundo innititur.",
    "Lux mentis non ex precibus, sed ex studio et labore venit.",
    "Natura ipsa magistra nostra optima et fidelissima est.",
    "Humanitas sine transcendentia et sine deo florere potest.",
    "Critica est virtus, non vitium, mentis vere liberae.",
    "Ex nihilo nihil fit; omnia causas naturales habent.",
    "Qui legit et cogitat, liberior fit quam qui orat.",
    "Mors finis est, non transitus — et haec veritas liberat.",
    "Nemo nascitur credulus; fides imponitur, ratio discitur.",
    "Universum indifferens est; nos sensum ei damus.",
    "Tempus praeteritum non redit; praesens est thesaurus noster.",
    "Felicitas in rebus externis non est; in mente habitat.",
    "Qui sibi imperare nescit, deo imperat frustra.",
    "Disciplina mentis plus valet quam omnis precatio.",
    "Societas iusta non ex lege divina, sed ex pacto humano fit.",
    "Fabulae consolantur; veritas autem aedificat.",
]

CHAPTER_TITLES = [
    "De Origine Erroris Antiqui",
    "De Via Rationis Purae",
    "De Lumine Mentis Liberae",
    "De Libertate Cogitandi",
    "De Natura Rerum Omnium",
    "De Fundamentis Veritatis",
    "De Fine Dogmatis Vetustis",
    "De Initio Sapientiae Novae",
    "De Virtute Rationali",
    "De Pace Mentis Serenatae",
    "De Scientia et Fide",
    "De Humana Conditione",
    "De Rerum Causa Prima",
    "De Vita Lucida et Libera",
    "De Antiquis Fabulis Caducis",
    "De Nova Via Saeculari",
    "De Conscientia Libera",
    "De Ethica Saeculari",
    "De Morte et Memoria",
    "De Veritate Nuda",
    "De Casu Credentium",
    "De Mente Surgente",
    "De Signis Rationis",
    "De Progressu Humano",
    "De Erroris Radice",
]

CHAPTER_SUBTITLES = [
    "Quomodo error in mentem hominis antiquitus ingressus est.",
    "Via longa est, sed ratio dux optima et fidelis.",
    "Lux mentis tenebras antiquas penitus dissipat.",
    "Libertas cogitandi fundamentum est omnis verae scientiae.",
    "Natura rerum docet quod fides longa negavit.",
    "Veritas nuda pulchrior est quam fabula ornata et vana.",
    "Dogma cadit sub lumine rationis crescentis.",
    "Sapientia ex dubio sano nascitur, non ex fide caeca.",
    "Virtus in ratione posita est, non in ritu vacuo.",
    "Pax mentis ex scientia et studio, non ex precibus, venit.",
    "Fides et scientia vias plane diversas et oppositas tenent.",
    "Homo mortalis et liber — haec duo satis sunt.",
    "Omnia causas naturales habent; nulla miracula vera sunt.",
    "Vita lucida sine deo et sine metu vivenda est.",
    "Fabulae antiquae cedunt veritati modernae et lucidae.",
    "Nova via rationis mundum meliorem et iustiorem facit.",
    "Conscientia libera maxima hereditas generationis nostrae est.",
    "Ethica ex ratione et humanitate, non ex codice divino.",
    "Mors finis naturalis est, non transitus — et hoc liberat.",
    "Veritas simplex et nuda est; error semper ornatus.",
]

CSS_LINKS = '  <link rel="stylesheet" href="/assets/tailwind.min.css"/>\n  <link rel="stylesheet" href="/assets/custom.css"/>'

FOOTER = """  <footer class="bg-acento text-white py-12 px-4 mt-16" role="contentinfo">
    <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm font-sans">
      <div>
        <p class="font-serif text-lg font-bold mb-2">Grande Ateu</p>
        <p class="text-blue-200 leading-relaxed">A Bíblia Ateia — 3 tomos · 38 livros originais.</p>
      </div>
      <nav aria-label="Tomos">
        <p class="font-semibold mb-3 uppercase tracking-wider text-xs text-blue-200">Tomos</p>
        <ul class="space-y-2">
          <li><a href="/t1/" class="text-blue-100 hover:text-white transition-colors">Tomo I — Ruptura</a></li>
          <li><a href="/t2/" class="text-blue-100 hover:text-white transition-colors">Tomo II — Edificação</a></li>
          <li><a href="/t3/" class="text-blue-100 hover:text-white transition-colors">Tomo III — Consolidação</a></li>
        </ul>
      </nav>
      <nav aria-label="Site">
        <p class="font-semibold mb-3 uppercase tracking-wider text-xs text-blue-200">Site</p>
        <ul class="space-y-2">
          <li><a href="/faq/" class="text-blue-100 hover:text-white transition-colors">FAQ</a></li>
          <li><a href="/sobre/" class="text-blue-100 hover:text-white transition-colors">Sobre</a></li>
          <li><a href="/sitemap.xml" class="text-blue-100 hover:text-white transition-colors">Sitemap</a></li>
        </ul>
      </nav>
    </div>
    <div class="max-w-6xl mx-auto mt-10 pt-6 border-t border-blue-800 text-blue-300 text-xs text-center">
      © 2025 Grande Ateu — Todos os direitos reservados.
    </div>
  </footer>
  <script>
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu-mobile');
    btn.addEventListener('click', () => { const aberto = menu.classList.toggle('hidden'); btn.setAttribute('aria-expanded', !aberto); });
  </script>"""


def make_header(tkey):
    t1_class = 'text-acento border-b-2 border-acento pb-1' if tkey == 't1' else 'hover:text-acento transition-colors'
    t2_class = 'text-acento border-b-2 border-acento pb-1' if tkey == 't2' else 'hover:text-acento transition-colors'
    t3_class = 'text-acento border-b-2 border-acento pb-1' if tkey == 't3' else 'hover:text-acento transition-colors'
    return f"""  <header class="bg-fundo border-b border-borda sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex items-center justify-between h-16" aria-label="Navegação principal">
        <a href="/" class="font-serif text-xl font-bold text-acento">Grande Ateu <span class="hidden sm:inline text-texto-sec text-sm font-sans font-normal">| A Bíblia Ateia</span></a>
        <ul class="hidden md:flex items-center gap-6 text-sm font-semibold text-texto">
          <li><a href="/t1/" class="{t1_class}">Tomo I</a></li>
          <li><a href="/t2/" class="{t2_class}">Tomo II</a></li>
          <li><a href="/t3/" class="{t3_class}">Tomo III</a></li>
          <li><a href="/faq/" class="hover:text-acento transition-colors">FAQ</a></li>
          <li><a href="/sobre/" class="hover:text-acento transition-colors">Sobre</a></li>
        </ul>
        <button id="menu-btn" class="md:hidden p-2" aria-label="Abrir menu" aria-expanded="false">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </nav>
      <div id="menu-mobile" class="hidden md:hidden pb-4">
        <ul class="flex flex-col gap-3 text-sm font-semibold">
          <li><a href="/t1/">Tomo I — Ruptura</a></li>
          <li><a href="/t2/">Tomo II — Edificação</a></li>
          <li><a href="/t3/">Tomo III — Consolidação</a></li>
          <li><a href="/faq/">FAQ</a></li>
          <li><a href="/sobre/">Sobre</a></li>
        </ul>
      </div>
    </div>
  </header>"""


def rnd_passage():
    return " ".join(random.choices(LATIN_SENTENCES, k=random.randint(1, 3)))


def head(title, desc, canonical, ld):
    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="description" content="{desc}"/>
  <meta name="robots" content="index, follow"/>
  <meta name="googlebot" content="index, follow"/>
  <meta name="GPTBot" content="index, follow"/>
  <meta name="ClaudeBot" content="index, follow"/>
  <meta name="bingbot" content="index, follow"/>
  <meta name="PerplexityBot" content="index, follow"/>
  <meta name="Google-Extended" content="index, follow"/>
  <meta property="og:title" content="{title}"/>
  <meta property="og:description" content="{desc}"/>
  <meta property="og:type" content="article"/>
  <meta property="og:url" content="https://grandeateu.com{canonical}"/>
  <meta property="og:locale" content="pt_BR"/>
  <link rel="canonical" href="https://grandeateu.com{canonical}"/>
  <link rel="alternate" hreflang="pt-BR" href="https://grandeateu.com{canonical}"/>
  <title>{title}</title>
  <link rel="stylesheet" href="/assets/tailwind.min.css"/>
  <link rel="stylesheet" href="/assets/custom.css"/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet"/>
  <script type="application/ld+json">
  {json.dumps(ld, ensure_ascii=False, indent=2)}
  </script>
</head>
<body class="font-sans antialiased bg-fundo text-texto">"""


def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)


def make_book_index(tkey, tnum, tnome, sigla, nome, book_idx, books, chapters_meta):
    prev_book = books[book_idx - 1] if book_idx > 0 else None
    next_book = books[book_idx + 1] if book_idx < len(books) - 1 else None
    canonical = f"/{tkey}/{sigla}/"
    header = make_header(tkey)

    chapters_li = "\n".join(
        f'              <li><a href="/{tkey}/{sigla}/{c[0]}/" class="flex items-start gap-3 py-3 border-b border-borda hover:text-acento transition-colors group">'
        f'<span class="font-mono text-xs text-texto-sec w-6 shrink-0 pt-0.5">{c[0]}</span>'
        f'<span><span class="font-semibold text-texto group-hover:text-acento">{c[1]}</span>'
        f'<span class="block text-xs text-texto-sec mt-0.5 italic">{c[2]}</span></span>'
        f'</a></li>'
        for c in chapters_meta
    )

    prev_link = f'<a href="/{tkey}/{prev_book[0]}/" class="text-sm font-semibold text-link hover:underline">← {prev_book[1]}</a>' if prev_book else '<span></span>'
    next_link = f'<a href="/{tkey}/{next_book[0]}/" class="text-sm font-semibold text-link hover:underline">{next_book[1]} →</a>' if next_book else '<span></span>'

    ld = {
        "@context": "https://schema.org", "@type": "Book",
        "name": f"{nome} — Grande Ateu", "inLanguage": "pt-BR",
        "isPartOf": {"@type": "Book", "name": "Grande Ateu — A Bíblia Ateia", "url": "https://grandeateu.com/"},
        "url": f"https://grandeateu.com{canonical}",
        "breadcrumb": {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Início", "item": "https://grandeateu.com/"},
            {"@type": "ListItem", "position": 2, "name": f"Tomo {tnum}", "item": f"https://grandeateu.com/{tkey}/"},
            {"@type": "ListItem", "position": 3, "name": nome, "item": f"https://grandeateu.com{canonical}"},
        ]},
    }

    html = head(f"{sigla} · {nome} | Grande Ateu", f"{nome} — Tomo {tnum} de A Bíblia Ateia. {len(chapters_meta)} capítulos.", canonical, ld)
    html += f"""
{header}
  <main class="max-w-3xl mx-auto px-4 sm:px-6 py-12">

    <nav aria-label="Breadcrumb" class="mb-8 text-xs text-texto-sec">
      <ol class="flex items-center gap-1">
        <li><a href="/" class="hover:text-acento">Início</a></li>
        <li aria-hidden="true" class="mx-1">›</li>
        <li><a href="/{tkey}/" class="hover:text-acento">Tomo {tnum}</a></li>
        <li aria-hidden="true" class="mx-1">›</li>
        <li class="text-texto font-semibold">{nome}</li>
      </ol>
    </nav>

    <div class="mb-10 pb-8 border-b border-borda">
      <p class="text-xs uppercase tracking-widest text-texto-sec mb-1">Tomo {tnum} · {tnome}</p>
      <h1 class="font-serif text-4xl font-bold text-acento mb-3">{nome}</h1>
      <p class="font-mono text-xs text-texto-sec">{sigla} · /{tkey}/{sigla}/</p>
    </div>

    <section aria-label="Capítulos">
      <h2 class="font-sans text-xs uppercase tracking-widest text-texto-sec mb-4">{len(chapters_meta)} Capítulos</h2>
      <ul class="space-y-0">
{chapters_li}
      </ul>
    </section>

    <nav class="mt-12 pt-8 border-t border-borda flex items-center justify-between" aria-label="Livros">
      {prev_link}
      <a href="/{tkey}/" class="text-xs text-texto-sec hover:text-acento">Tomo {tnum}</a>
      {next_link}
    </nav>

  </main>
{FOOTER}
</body>
</html>"""
    return html


def make_chapter(tkey, tnum, tnome, sigla, nome, book_idx, books, cap_num, cap_title, cap_subtitle, passages, total_caps):
    canonical = f"/{tkey}/{sigla}/{cap_num}/"
    header = make_header(tkey)

    passages_html = ""
    for p_num, p_text in enumerate(passages, 1):
        passages_html += f"""
      <div class="flex gap-4 py-5 border-b border-borda" id="p{p_num}">
        <a href="/{tkey}/{sigla}/{cap_num}/{p_num}/" class="font-mono text-xs text-texto-sec hover:text-acento shrink-0 w-6 text-right pt-0.5">{p_num}</a>
        <p class="font-serif text-base leading-relaxed text-texto">{p_text}</p>
      </div>"""

    if cap_num > 1:
        prev_link = f'<a href="/{tkey}/{sigla}/{cap_num - 1}/" class="text-sm font-semibold text-link hover:underline">← Capítulo {cap_num - 1}</a>'
    else:
        pb = books[book_idx - 1] if book_idx > 0 else None
        prev_link = f'<a href="/{tkey}/{pb[0]}/" class="text-sm font-semibold text-link hover:underline">← {pb[1]}</a>' if pb else '<span></span>'

    if cap_num < total_caps:
        next_link = f'<a href="/{tkey}/{sigla}/{cap_num + 1}/" class="text-sm font-semibold text-link hover:underline">Capítulo {cap_num + 1} →</a>'
    else:
        nb = books[book_idx + 1] if book_idx < len(books) - 1 else None
        next_link = f'<a href="/{tkey}/{nb[0]}/" class="text-sm font-semibold text-link hover:underline">{nb[1]} →</a>' if nb else '<span></span>'

    ld = {
        "@context": "https://schema.org", "@type": "Chapter",
        "name": cap_title, "description": cap_subtitle, "inLanguage": "pt-BR",
        "isPartOf": {"@type": "Book", "name": f"{nome} — Grande Ateu", "url": f"https://grandeateu.com/{tkey}/{sigla}/"},
        "url": f"https://grandeateu.com{canonical}",
        "breadcrumb": {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Início", "item": "https://grandeateu.com/"},
            {"@type": "ListItem", "position": 2, "name": f"Tomo {tnum}", "item": f"https://grandeateu.com/{tkey}/"},
            {"@type": "ListItem", "position": 3, "name": nome, "item": f"https://grandeateu.com/{tkey}/{sigla}/"},
            {"@type": "ListItem", "position": 4, "name": f"Cap. {cap_num}", "item": f"https://grandeateu.com{canonical}"},
        ]},
    }

    html = head(f"{sigla} {cap_num} · {cap_title} | Grande Ateu", f"{cap_title} — {nome} {cap_num}. {cap_subtitle}", canonical, ld)
    html += f"""
{header}
  <main class="max-w-3xl mx-auto px-4 sm:px-6 py-12">

    <nav aria-label="Breadcrumb" class="mb-8 text-xs text-texto-sec">
      <ol class="flex items-center gap-1 flex-wrap">
        <li><a href="/" class="hover:text-acento">Início</a></li>
        <li aria-hidden="true" class="mx-1">›</li>
        <li><a href="/{tkey}/" class="hover:text-acento">Tomo {tnum}</a></li>
        <li aria-hidden="true" class="mx-1">›</li>
        <li><a href="/{tkey}/{sigla}/" class="hover:text-acento">{sigla}</a></li>
        <li aria-hidden="true" class="mx-1">›</li>
        <li class="text-texto font-semibold">Cap. {cap_num}</li>
      </ol>
    </nav>

    <div class="mb-10 pb-8 border-b border-borda">
      <p class="font-mono text-xs text-texto-sec mb-3">{sigla} · capítulo {cap_num} · /{tkey}/{sigla}/{cap_num}/</p>
      <h1 class="font-serif text-4xl font-bold text-acento mb-3">{cap_title}</h1>
      <p class="font-serif text-lg italic text-texto-sec">{cap_subtitle}</p>
    </div>

    <section aria-label="Passagens do capítulo {cap_num}">
{passages_html}
    </section>

    <nav class="mt-12 pt-8 border-t border-borda flex items-center justify-between" aria-label="Capítulos">
      {prev_link}
      <a href="/{tkey}/{sigla}/" class="text-xs text-texto-sec hover:text-acento">{sigla}</a>
      {next_link}
    </nav>

  </main>
{FOOTER}
</body>
</html>"""
    return html


def make_passage(tkey, tnum, sigla, nome, book_idx, books, cap_num, cap_title, p_num, p_text, total_passages, total_caps):
    canonical = f"/{tkey}/{sigla}/{cap_num}/{p_num}/"
    header = make_header(tkey)

    if p_num > 1:
        prev_link = f'<a href="/{tkey}/{sigla}/{cap_num}/{p_num - 1}/" class="text-sm font-semibold text-link hover:underline">← {sigla} {cap_num}-{p_num - 1}</a>'
    elif cap_num > 1:
        prev_link = f'<a href="/{tkey}/{sigla}/{cap_num - 1}/" class="text-sm font-semibold text-link hover:underline">← Capítulo {cap_num - 1}</a>'
    else:
        prev_link = '<span></span>'

    if p_num < total_passages:
        next_link = f'<a href="/{tkey}/{sigla}/{cap_num}/{p_num + 1}/" class="text-sm font-semibold text-link hover:underline">{sigla} {cap_num}-{p_num + 1} →</a>'
    elif cap_num < total_caps:
        next_link = f'<a href="/{tkey}/{sigla}/{cap_num + 1}/" class="text-sm font-semibold text-link hover:underline">Capítulo {cap_num + 1} →</a>'
    else:
        nb = books[book_idx + 1] if book_idx < len(books) - 1 else None
        next_link = f'<a href="/{tkey}/{nb[0]}/" class="text-sm font-semibold text-link hover:underline">{nb[1]} →</a>' if nb else '<span></span>'

    ld = {
        "@context": "https://schema.org", "@type": "CreativeWork",
        "name": f"Grande Ateu, {sigla} {cap_num}-{p_num}", "text": p_text, "inLanguage": "pt-BR",
        "isPartOf": {"@type": "Chapter", "name": cap_title, "url": f"https://grandeateu.com/{tkey}/{sigla}/{cap_num}/"},
        "url": f"https://grandeateu.com{canonical}",
        "breadcrumb": {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Início", "item": "https://grandeateu.com/"},
            {"@type": "ListItem", "position": 2, "name": f"Tomo {tnum}", "item": f"https://grandeateu.com/{tkey}/"},
            {"@type": "ListItem", "position": 3, "name": nome, "item": f"https://grandeateu.com/{tkey}/{sigla}/"},
            {"@type": "ListItem", "position": 4, "name": f"Cap. {cap_num}", "item": f"https://grandeateu.com/{tkey}/{sigla}/{cap_num}/"},
            {"@type": "ListItem", "position": 5, "name": f"Passagem {p_num}", "item": f"https://grandeateu.com{canonical}"},
        ]},
    }

    html = head(f"Grande Ateu, {sigla} {cap_num}-{p_num} | A Bíblia Ateia", f"Grande Ateu, {sigla} {cap_num}-{p_num} — {p_text[:120]}...", canonical, ld)
    html += f"""
{header}
  <main class="max-w-2xl mx-auto px-4 sm:px-6 py-12">

    <nav aria-label="Breadcrumb" class="mb-8 text-xs text-texto-sec">
      <ol class="flex items-center gap-1 flex-wrap">
        <li><a href="/" class="hover:text-acento">Início</a></li>
        <li aria-hidden="true" class="mx-1">›</li>
        <li><a href="/{tkey}/" class="hover:text-acento">Tomo {tnum}</a></li>
        <li aria-hidden="true" class="mx-1">›</li>
        <li><a href="/{tkey}/{sigla}/" class="hover:text-acento">{sigla}</a></li>
        <li aria-hidden="true" class="mx-1">›</li>
        <li><a href="/{tkey}/{sigla}/{cap_num}/" class="hover:text-acento">Cap. {cap_num}</a></li>
        <li aria-hidden="true" class="mx-1">›</li>
        <li class="text-texto font-semibold">Passagem {p_num}</li>
      </ol>
    </nav>

    <article>
      <p class="font-mono text-xs text-texto-sec mb-6">{sigla} {cap_num}-{p_num} · /{tkey}/{sigla}/{cap_num}/{p_num}/</p>
      <blockquote class="border-l-4 border-acento pl-6 py-2 mb-8">
        <p class="font-serif text-2xl sm:text-3xl leading-relaxed text-texto">{p_text}</p>
        <cite class="block mt-4 font-sans text-sm text-texto-sec not-italic">— Grande Ateu, {sigla} {cap_num}-{p_num}</cite>
      </blockquote>
      <div class="flex items-center gap-4 mt-8 text-xs text-texto-sec">
        <a href="/{tkey}/{sigla}/{cap_num}/" class="hover:text-acento">← Ver capítulo completo</a>
        <span>·</span>
        <a href="/{tkey}/{sigla}/" class="hover:text-acento">{nome}</a>
      </div>
    </article>

    <nav class="mt-12 pt-8 border-t border-borda flex items-center justify-between" aria-label="Passagens">
      {prev_link}
      <span class="text-xs text-texto-sec">{sigla} {cap_num}-{p_num}</span>
      {next_link}
    </nav>

  </main>
{FOOTER}
</body>
</html>"""
    return html


def main():
    grand_total = 0

    for tkey, tdata in TOMES.items():
        tnum = tdata["num"]
        tnome = tdata["nome"]
        books = tdata["books"]
        print(f"\nTomo {tnum} — {tnome}")

        for book_idx, (sigla, nome) in enumerate(books):
            book_dir = os.path.join(BASE, tkey, sigla)
            os.makedirs(book_dir, exist_ok=True)

            num_chapters = random.randint(2, 5)
            titles = random.sample(CHAPTER_TITLES, num_chapters)
            subtitles = random.sample(CHAPTER_SUBTITLES, num_chapters)

            chapters_meta = []
            for i in range(num_chapters):
                n_pass = random.randint(2, 8)
                passages = [rnd_passage() for _ in range(n_pass)]
                chapters_meta.append((i + 1, titles[i], subtitles[i], passages))

            # Índice do livro
            write(
                os.path.join(book_dir, "index.html"),
                make_book_index(tkey, tnum, tnome, sigla, nome, book_idx, books,
                                [(c[0], c[1], c[2]) for c in chapters_meta])
            )

            for cap_num, cap_title, cap_subtitle, passages in chapters_meta:
                write(
                    os.path.join(book_dir, str(cap_num), "index.html"),
                    make_chapter(tkey, tnum, tnome, sigla, nome, book_idx, books,
                                 cap_num, cap_title, cap_subtitle, passages, num_chapters)
                )
                for p_num, p_text in enumerate(passages, 1):
                    write(
                        os.path.join(book_dir, str(cap_num), str(p_num), "index.html"),
                        make_passage(tkey, tnum, sigla, nome, book_idx, books,
                                     cap_num, cap_title, p_num, p_text, len(passages), num_chapters)
                    )

            total_pass = sum(len(c[3]) for c in chapters_meta)
            book_total = 1 + num_chapters + total_pass
            grand_total += book_total
            print(f"  {sigla} ({nome}): {num_chapters} caps · {total_pass} passagens · {book_total} arquivos")

    print(f"\nTotal gerado: {grand_total} arquivos")


if __name__ == "__main__":
    main()
