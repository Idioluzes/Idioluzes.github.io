import os

ROOT = r'C:\Users\noteb\OneDrive\Área de Trabalho\RAÍZ\1 BACKUP SÓ HD\8 VisualStudioCode\grandeateu'

# Loja/index.html já tem os links corretos — pula ela
SKIP = { os.path.join(ROOT, 'loja', 'index.html') }

OLD_BIBLIA  = '<a href="#" data-placeholder style="display:block;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">Bíblia Impressa</a>'
NEW_BIBLIA  = '<a href="/loja/#produto-biblia" style="display:block;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">Bíblia Impressa</a>'

OLD_HOTMART = '<a href="#" data-placeholder style="display:block;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">Imersão Hotmart</a>'
NEW_HOTMART = '<a href="/loja/#produto-curso" style="display:block;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">Imersão Hotmart</a>'

updated = 0
skipped = 0

for dirpath, dirnames, filenames in os.walk(ROOT):
    for fname in filenames:
        if fname != 'index.html':
            continue
        fpath = os.path.join(dirpath, fname)
        if fpath in SKIP:
            skipped += 1
            continue
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        new_content = content.replace(OLD_BIBLIA, NEW_BIBLIA).replace(OLD_HOTMART, NEW_HOTMART)
        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated += 1
        else:
            skipped += 1

print(f"Updated: {updated} | Skipped (unchanged/excluded): {skipped}")
