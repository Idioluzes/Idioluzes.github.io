"""
Baixa Tailwind CSS localmente e atualiza todos os HTMLs do projeto.
Substitui o <script> CDN por <link> para CSS local — funciona offline.
"""
import os
import urllib.request
import re

BASE = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(BASE, "assets")
TAILWIND_PATH = os.path.join(ASSETS_DIR, "tailwind.min.css")
CUSTOM_PATH = os.path.join(ASSETS_DIR, "custom.css")

# ─── 1. Baixa Tailwind CSS ────────────────────────────────────────────────────

def download_tailwind():
    os.makedirs(ASSETS_DIR, exist_ok=True)
    if os.path.exists(TAILWIND_PATH):
        print("  tailwind.min.css já existe, pulando download.")
        return
    url = "https://cdn.jsdelivr.net/npm/tailwindcss@3.4.17/dist/tailwind.min.css"
    print(f"  Baixando Tailwind CSS de jsDelivr...")
    urllib.request.urlretrieve(url, TAILWIND_PATH)
    size_kb = os.path.getsize(TAILWIND_PATH) // 1024
    print(f"  tailwind.min.css salvo ({size_kb} KB)")

# ─── 2. Cria CSS de customizações do projeto ─────────────────────────────────

CUSTOM_CSS = """\
/* ============================================================
   Grande Ateu — CSS customizado (cores e fontes do projeto)
   Complementa o tailwind.min.css com as classes personalizadas
   ============================================================ */

/* Cores customizadas — backgrounds */
.bg-fundo     { background-color: #F9F7F4 }
.bg-fundo-sec { background-color: #EFEFEF }
.bg-acento    { background-color: #1A3A5C }

/* Cores customizadas — texto */
.text-texto     { color: #1C1C1E }
.text-texto-sec { color: #6B6B6B }
.text-acento    { color: #1A3A5C }
.text-link      { color: #2563EB }

/* Cores customizadas — bordas */
.border-borda  { border-color: #DCDCDC }
.border-acento { border-color: #1A3A5C }
.divide-borda > :not([hidden]) ~ :not([hidden]) { border-color: #DCDCDC }

/* Hover — cores customizadas */
.hover\\:text-acento:hover  { color: #1A3A5C }
.hover\\:bg-acento:hover    { background-color: #1A3A5C }
.hover\\:text-white:hover   { color: #ffffff }
.hover\\:border-acento:hover { border-color: #1A3A5C }

/* Fontes — sobrescreve os padrões do Tailwind */
.font-serif { font-family: 'Playfair Display', Georgia, serif }
.font-sans  { font-family: 'Source Sans 3', ui-sans-serif, system-ui, sans-serif }

/* Transição padrão de cores */
.transition-colors {
  transition-property: color, background-color, border-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms
}

/* Azul-800 e variantes de azul usadas no footer */
.bg-blue-800  { background-color: #1e40af }
.border-blue-800 { border-color: #1e40af }
.text-blue-100 { color: #dbeafe }
.text-blue-200 { color: #bfdbfe }
.text-blue-300 { color: #93c5fd }
.text-blue-600 { color: #2563eb }
"""

def create_custom_css():
    with open(CUSTOM_PATH, "w", encoding="utf-8") as f:
        f.write(CUSTOM_CSS)
    print(f"  custom.css criado ({len(CUSTOM_CSS)} bytes)")

# ─── 3. Atualiza todos os HTMLs ───────────────────────────────────────────────

OLD_CDN = '<script src="https://cdn.tailwindcss.com"><\\/script>'
OLD_CDN_ALT = '<script src="https://cdn.tailwindcss.com"></script>'

NEW_LINKS = """\
  <link rel="stylesheet" href="/assets/tailwind.min.css"/>
  <link rel="stylesheet" href="/assets/custom.css"/>"""

# O tailwind.config inline (<script>tailwind.config=...</script>) pode ser removido
# pois as classes customizadas agora estão no custom.css
CONFIG_SCRIPT_PATTERN = re.compile(
    r'\s*<script>\s*tailwind\.config\s*=.*?<\/script>',
    re.DOTALL
)

CDN_SCRIPT_PATTERN = re.compile(
    r'<script src="https://cdn\.tailwindcss\.com"(?:\s*/)?><\/script>'
)

def update_html_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if "cdn.tailwindcss.com" not in content:
        return False  # Já atualizado ou não usa CDN

    # Remove <script src="cdn.tailwindcss.com">
    content = CDN_SCRIPT_PATTERN.sub("", content)

    # Remove tailwind.config script inline
    content = CONFIG_SCRIPT_PATTERN.sub("", content)

    # Insere os dois <link> antes do fechamento do </head>
    content = content.replace("</head>", NEW_LINKS + "\n</head>", 1)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    return True


def update_all_html():
    updated = 0
    skipped = 0
    for root, dirs, files in os.walk(BASE):
        # Ignora node_modules e .claude se existirem
        dirs[:] = [d for d in dirs if d not in (".claude", "node_modules", "assets")]
        for fname in files:
            if fname.endswith(".html"):
                fpath = os.path.join(root, fname)
                if update_html_file(fpath):
                    updated += 1
                else:
                    skipped += 1
    print(f"  {updated} arquivos atualizados, {skipped} ignorados")


# ─── Main ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("1. Baixando Tailwind CSS...")
    download_tailwind()

    print("2. Criando custom.css...")
    create_custom_css()

    print("3. Atualizando todos os HTMLs...")
    update_all_html()

    print("\nConcluído! O projeto agora funciona 100% offline.")
    print("Abra pelo Live Server: http://127.0.0.1:5500/")
