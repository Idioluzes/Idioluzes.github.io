import os

ROOT = r'C:\Users\noteb\OneDrive\Área de Trabalho\RAÍZ\1 BACKUP SÓ HD\8 VisualStudioCode\grandeateu'

# Páginas que já têm o nav correto (criadas manualmente)
SKIP = {
    os.path.join(ROOT, 'loja',   'index.html'),
    os.path.join(ROOT, 'apoiar', 'index.html'),
}

OLD = '''          <!-- LOJA -->
          <li style="position:relative;">
            <button id="btn-loja" style="background:none;border:none;cursor:pointer;font-size:.875rem;font-weight:600;font-family:inherit;color:inherit;display:flex;align-items:center;gap:4px;padding:0;">
              Loja <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div id="drop-loja" style="display:none;position:absolute;top:calc(100% + 10px);right:0;background:#F9F7F4;border:1px solid #DCDCDC;border-radius:8px;padding:6px 0;min-width:180px;z-index:300;box-shadow:0 4px 16px rgba(0,0,0,.09);">
              <a href="/loja/#produto-biblia" style="display:block;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">Bíblia Impressa</a>
              <a href="/loja/#produto-curso" style="display:block;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">Imersão Hotmart</a>
              <a href="#" data-placeholder style="display:block;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">Doação</a>
            </div>
          </li>'''

NEW = '''          <!-- LOJA -->
          <li><a href="/loja/" style="font-size:.875rem;font-weight:600;font-family:inherit;color:inherit;text-decoration:none;">Loja</a></li>'''

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
        new_content = content.replace(OLD, NEW)
        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated += 1
        else:
            skipped += 1

print(f"Updated: {updated} | Skipped (unchanged/excluded): {skipped}")
