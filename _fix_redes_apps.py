import os

ROOT = r'C:\Users\noteb\OneDrive\Área de Trabalho\RAÍZ\1 BACKUP SÓ HD\8 VisualStudioCode\grandeateu'

# ── SVG paths reutilizados ──────────────────────────────────────────────────
INSTA_SVG   = '<svg width="18" height="18" viewBox="0 0 24 24" fill="#E1306C" style="flex-shrink:0;"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>'
APP_SVG_OLD = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A3A5C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1" fill="#1A3A5C" stroke="none"/></svg>'
GP_SVG      = '<svg width="18" height="18" viewBox="0 0 24 24" fill="#01875F" style="flex-shrink:0;"><path d="M8 5v14l11-7z"/></svg>'
AS_SVG      = '<svg width="18" height="18" viewBox="0 0 24 24" fill="#555" style="flex-shrink:0;"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>'

LINK_STYLE = 'display:flex;align-items:center;gap:10px;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;'

# ── FORMATO MULTILINE (876 páginas originais) ──────────────────────────────

OLD_INSTA_MULTI = (
    '<a href="#" data-placeholder style="' + LINK_STYLE + '">\n'
    '                ' + INSTA_SVG + '\n'
    '                Instagram\n'
    '              </a>'
)
NEW_INSTA_MULTI = (
    '<a href="#" data-externo="https://www.instagram.com/governogoias" style="' + LINK_STYLE + '">\n'
    '                ' + INSTA_SVG + '\n'
    '                Instagram\n'
    '              </a>'
)

OLD_APP_MULTI = (
    '<a href="#" data-placeholder style="' + LINK_STYLE + '">\n'
    '                ' + APP_SVG_OLD + '\n'
    '                App\n'
    '              </a>'
)
NEW_APP_MULTI = (
    '<a href="#" data-externo="https://play.google.com/store/apps/details?id=com.google.android.googlequicksearchbox&hl=pt_BR" style="' + LINK_STYLE + '">\n'
    '                ' + GP_SVG + '\n'
    '                Google Play\n'
    '              </a>\n'
    '              <a href="#" data-externo="https://apps.apple.com/br/app/google/id284815942" style="' + LINK_STYLE + '">\n'
    '                ' + AS_SVG + '\n'
    '                App Store\n'
    '              </a>'
)

# ── FORMATO SINGLE-LINE (apoiar, loja e páginas criadas manualmente) ────────

OLD_INSTA_SINGLE = (
    '<a href="#" data-placeholder style="' + LINK_STYLE + '">'
    + INSTA_SVG + 'Instagram</a>'
)
NEW_INSTA_SINGLE = (
    '<a href="#" data-externo="https://www.instagram.com/governogoias" style="' + LINK_STYLE + '">'
    + INSTA_SVG + 'Instagram</a>'
)

OLD_APP_SINGLE = (
    '<a href="#" data-placeholder style="' + LINK_STYLE + '">'
    + APP_SVG_OLD + 'App</a>'
)
NEW_APP_SINGLE = (
    '<a href="#" data-externo="https://play.google.com/store/apps/details?id=com.google.android.googlequicksearchbox&hl=pt_BR" style="' + LINK_STYLE + '">'
    + GP_SVG + 'Google Play</a>\n'
    '              <a href="#" data-externo="https://apps.apple.com/br/app/google/id284815942" style="' + LINK_STYLE + '">'
    + AS_SVG + 'App Store</a>'
)

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
            .replace(OLD_INSTA_MULTI,   NEW_INSTA_MULTI)
            .replace(OLD_INSTA_SINGLE,  NEW_INSTA_SINGLE)
            .replace(OLD_APP_MULTI,     NEW_APP_MULTI)
            .replace(OLD_APP_SINGLE,    NEW_APP_SINGLE)
        )
        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated += 1
        else:
            skipped += 1

print(f"Updated: {updated} | Skipped (unchanged): {skipped}")
