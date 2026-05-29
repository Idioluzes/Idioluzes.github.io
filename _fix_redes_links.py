import os

ROOT = r'C:\Users\noteb\OneDrive\Área de Trabalho\RAÍZ\1 BACKUP SÓ HD\8 VisualStudioCode\grandeateu'

# ── WHATSAPP ────────────────────────────────────────────────────────────
# Substitui href="#" data-placeholder → data-externo (identificado pelo fill="#25D366")
OLD_WA_HREF = '<a href="#" data-placeholder style="display:flex;align-items:center;gap:10px;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">\n                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" style="flex-shrink:0;">'
NEW_WA_HREF = '<a href="#" data-externo="https://whatsapp.com/channel/0029VbBSupFAjPXGrgFRxG0V" style="display:flex;align-items:center;gap:10px;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">\n                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" style="flex-shrink:0;">'

OLD_WA_TEXT = '                WhatsApp\n              </a>'
NEW_WA_TEXT = '                Canal WhatsApp\n              </a>'

# ── YOUTUBE ─────────────────────────────────────────────────────────────
# Identificado pelo fill="#FF0000"
OLD_YT_HREF = '<a href="#" data-placeholder style="display:flex;align-items:center;gap:10px;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">\n                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000" style="flex-shrink:0;">'
NEW_YT_HREF = '<a href="#" data-externo="https://www.youtube.com/c/VlogdoCair%C3%A3oOficial" style="display:flex;align-items:center;gap:10px;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;">\n                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000" style="flex-shrink:0;">'

OLD_YT_TEXT = '                YouTube\n              </a>'
NEW_YT_TEXT = '                Canal YouTube\n              </a>'

updated = 0
skipped = 0

for dirpath, dirnames, filenames in os.walk(ROOT):
    for fname in filenames:
        if fname != 'index.html':
            continue
        fpath = os.path.join(dirpath, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_content = (content
            .replace(OLD_WA_HREF, NEW_WA_HREF)
            .replace(OLD_WA_TEXT, NEW_WA_TEXT)
            .replace(OLD_YT_HREF, NEW_YT_HREF)
            .replace(OLD_YT_TEXT, NEW_YT_TEXT)
        )

        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated += 1
        else:
            skipped += 1

print(f"Updated: {updated} | Skipped (unchanged): {skipped}")
