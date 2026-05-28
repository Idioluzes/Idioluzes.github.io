import os

ROOT = r'C:\Users\noteb\OneDrive\Área de Trabalho\RAÍZ\1 BACKUP SÓ HD\8 VisualStudioCode\grandeateu'

SKIP = {
    os.path.join(ROOT, 'index.html'),
    os.path.join(ROOT, 'piramide', 'index.html'),
    os.path.join(ROOT, 'jornada', 'index.html'),
}

OLD_JORNADA  = '<a href="#" data-placeholder style="display:block;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">Jornada</a>'
NEW_JORNADA  = '<a href="/jornada/" style="display:block;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">Jornada</a>'

OLD_PIRAMIDE = '<a href="#" data-placeholder style="display:block;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">Pirâmide Ateia</a>'
NEW_PIRAMIDE = '<a href="/piramide/" style="display:block;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">Pirâmide Ateia</a>'

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
        new_content = content.replace(OLD_JORNADA, NEW_JORNADA).replace(OLD_PIRAMIDE, NEW_PIRAMIDE)
        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated += 1
        else:
            skipped += 1

print(f"Updated: {updated} | Skipped (unchanged/excluded): {skipped}")
