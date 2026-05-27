"""
Atualiza todos os HTMLs: remove CDN script e tailwind.config inline,
adiciona <link> para CSS local.
"""
import os
import re

BASE = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(BASE, "assets")

# ─── custom.css ───────────────────────────────────────────────────────────────

CUSTOM_CSS = """\
/* Grande Ateu — classes customizadas (cores e fontes do projeto) */

/* Backgrounds */
.bg-fundo        { background-color: #F9F7F4 }
.bg-fundo-sec    { background-color: #EFEFEF }
.bg-acento       { background-color: #1A3A5C }
.hover\\:bg-acento:hover { background-color: #1A3A5C }
.hover\\:bg-blue-50:hover { background-color: #eff6ff }

/* Texto */
.text-texto      { color: #1C1C1E }
.text-texto-sec  { color: #6B6B6B }
.text-acento     { color: #1A3A5C }
.text-link       { color: #2563EB }
.hover\\:text-acento:hover { color: #1A3A5C }
.hover\\:text-white:hover  { color: #fff }
.group:hover .group-hover\\:text-acento { color: #1A3A5C }

/* Bordas */
.border-borda    { border-color: #DCDCDC }
.border-acento   { border-color: #1A3A5C }
.hover\\:border-acento:hover { border-color: #1A3A5C }
.divide-borda > :not([hidden]) ~ :not([hidden]) { --tw-divide-opacity: 1; border-color: #DCDCDC }

/* Azuis do footer */
.text-blue-100   { color: #dbeafe }
.text-blue-200   { color: #bfdbfe }
.text-blue-300   { color: #93c5fd }
.border-blue-800 { border-color: #1e40af }

/* Fontes — sobrescreve os padrões do Tailwind v2 */
.font-serif { font-family: 'Playfair Display', Georgia, serif }
.font-sans  { font-family: 'Source Sans 3', ui-sans-serif, system-ui, sans-serif }

/* Transição */
.transition-colors {
  transition-property: color, background-color, border-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms
}
.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms
}
"""

with open(os.path.join(ASSETS_DIR, "custom.css"), "w", encoding="utf-8") as f:
    f.write(CUSTOM_CSS)
print("custom.css criado.")

# ─── Substitui em cada HTML ───────────────────────────────────────────────────

NEW_LINKS = (
    '  <link rel="stylesheet" href="/assets/tailwind.min.css"/>\n'
    '  <link rel="stylesheet" href="/assets/custom.css"/>\n'
    '  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet"/>'
)

# Padrão que captura o bloco CDN script + config script + Google Fonts que vamos substituir
BLOCK_PATTERN = re.compile(
    r'<script src="https://cdn\.tailwindcss\.com">.*?</script>'   # CDN (com ou sem backslash)
    r'|'
    r'<script src="https://cdn\.tailwindcss\.com"><\\/script>'     # CDN com backslash no arquivo
    r'|'
    r'<script>\s*tailwind\.config\s*=.*?<\\/script>'               # config com backslash
    r'|'
    r'<script>\s*tailwind\.config\s*=.*?</script>',                # config normal
    re.DOTALL
)

FONTS_PATTERN = re.compile(
    r'<link href="https://fonts\.googleapis\.com/css2\?family=Playfair.*?rel="stylesheet"/>'
)

updated = skipped = 0

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in (".claude", "assets")]
    for fname in files:
        if not fname.endswith(".html"):
            continue
        fpath = os.path.join(root, fname)
        try:
            raw = open(fpath, "r", encoding="utf-8").read()
        except Exception:
            continue

        if "cdn.tailwindcss.com" not in raw:
            skipped += 1
            continue

        # 1. Remove Google Fonts link (será re-adicionado junto com o CSS)
        clean = FONTS_PATTERN.sub("", raw)

        # 2. Remove os blocos CDN script e tailwind.config
        clean = BLOCK_PATTERN.sub("", clean)

        # 3. Insere os dois <link> + Google Fonts antes de </head>
        clean = clean.replace("</head>", NEW_LINKS + "\n</head>", 1)

        # 4. Limpa linhas em branco duplas que sobraram
        clean = re.sub(r'\n{3,}', '\n\n', clean)

        open(fpath, "w", encoding="utf-8").write(clean)
        updated += 1

print(f"{updated} arquivos atualizados, {skipped} sem CDN.")
