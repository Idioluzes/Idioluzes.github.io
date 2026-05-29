import os

ROOT = r'C:\Users\noteb\OneDrive\Área de Trabalho\RAÍZ\1 BACKUP SÓ HD\8 VisualStudioCode\grandeateu'

# ── SVGs ────────────────────────────────────────────────────────────────────
TG_SVG18 = ('<svg width="18" height="18" viewBox="0 0 24 24" fill="#229ED9" style="flex-shrink:0;">'
            '<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0z'
            'm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 '
            '8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21'
            '.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061'
            ' 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893'
            '-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>')

LINK_STYLE = 'display:flex;align-items:center;gap:10px;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;'
BLOCK_STYLE = 'display:block;padding:10px 18px;font-size:.85rem;font-family:sans-serif;color:#1C1C1E;text-decoration:none;font-weight:600;white-space:nowrap;'
BTN_STYLE = 'background:none;border:none;cursor:pointer;font-size:.875rem;font-weight:600;font-family:inherit;color:inherit;display:flex;align-items:center;gap:4px;padding:0;'
DROP_BASE = 'display:none;position:absolute;top:calc(100% + 10px);right:0;background:#F9F7F4;border:1px solid #DCDCDC;border-radius:8px;padding:6px 0;z-index:300;box-shadow:0 4px 16px rgba(0,0,0,.09);'
CHEVRON = '<svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>'

# ── 1. TELEGRAM — inserir após Instagram no dropdown REDES ──────────────────

TG_LINK = ('<a href="#" data-externo="https://t.me/diariodetorcedor" style="' + LINK_STYLE + '">\n'
           '                ' + TG_SVG18 + '\n'
           '                Canal Telegram\n'
           '              </a>\n'
           '              ')

TG_LINK_SL = ('<a href="#" data-externo="https://t.me/diariodetorcedor" style="' + LINK_STYLE + '">'
              + TG_SVG18 + 'Canal Telegram</a>\n              ')

# Multiline (876 páginas originais): após "Instagram\n              </a>\n              <a..." Google Play
OLD_TG_MULTI = '                Instagram\n              </a>\n              <a href="#" data-externo="https://play.google.com/'
NEW_TG_MULTI = ('                Instagram\n              </a>\n              '
                + TG_LINK
                + '<a href="#" data-externo="https://play.google.com/')

# Single-line (apoiar, loja): após "Instagram</a>\n              <a..." Google Play
OLD_TG_SINGLE = 'Instagram</a>\n              <a href="#" data-externo="https://play.google.com/'
NEW_TG_SINGLE = 'Instagram</a>\n              ' + TG_LINK_SL + '<a href="#" data-externo="https://play.google.com/'

# ── 2. DIA RUIM? + SE ENVOLVA — novos itens de nav ─────────────────────────

NOVOS_NAV = '''          <!-- DIA RUIM? -->
          <li style="position:relative;">
            <button id="btn-diaruim" style="''' + BTN_STYLE + '''">
              Dia Ruim? ''' + CHEVRON + '''
            </button>
            <div id="drop-diaruim" style="''' + DROP_BASE + '''min-width:200px;">
              <a href="#" data-placeholder style="''' + BLOCK_STYLE + '''">Aconselhamentos</a>
              <a href="#" data-placeholder style="''' + BLOCK_STYLE + '''">Reflexões Diárias</a>
              <a href="#" data-placeholder style="''' + BLOCK_STYLE + '''">Plano de Leitura</a>
              <a href="#" data-placeholder style="''' + BLOCK_STYLE + '''">Mensagens de Afirmação</a>
              <a href="#" data-placeholder style="''' + BLOCK_STYLE + '''">Descanse em Paz</a>
              <a href="#" data-placeholder style="''' + BLOCK_STYLE + '''">Depressão</a>
              <a href="#" data-placeholder style="''' + BLOCK_STYLE + '''">Perda do Emprego</a>
            </div>
          </li>

          <!-- SE ENVOLVA -->
          <li style="position:relative;">
            <button id="btn-envolva" style="''' + BTN_STYLE + '''">
              Se Envolva ''' + CHEVRON + '''
            </button>
            <div id="drop-envolva" style="''' + DROP_BASE + '''min-width:220px;">
              <a href="#" data-placeholder style="''' + BLOCK_STYLE + '''">Votações</a>
              <a href="#" data-placeholder style="''' + BLOCK_STYLE + '''">Fórum</a>
              <a href="#" data-placeholder style="''' + BLOCK_STYLE + '''">Listas de Distribuição</a>
              <a href="#" data-placeholder style="''' + BLOCK_STYLE + '''">Enviar Material</a>
            </div>
          </li>

          '''

# Inserção COM comentário (maioria das páginas)
OLD_COSMO_C  = '          <!-- COSMOVISÃO -->\n          <li style="position:relative;">\n            <button id="btn-cosmo"'
NEW_COSMO_C  = NOVOS_NAV + '<!-- COSMOVISÃO -->\n          <li style="position:relative;">\n            <button id="btn-cosmo"'

# Inserção SEM comentário (apoiar/index.html)
OLD_COSMO_NC = '          </li>\n          <li style="position:relative;">\n            <button id="btn-cosmo"'
NEW_COSMO_NC = '          </li>\n\n' + NOVOS_NAV + '<li style="position:relative;">\n            <button id="btn-cosmo"'

# ── Loop ────────────────────────────────────────────────────────────────────

updated = 0
skipped = 0

for dirpath, dirnames, filenames in os.walk(ROOT):
    for fname in filenames:
        if fname != 'index.html':
            continue
        fpath = os.path.join(dirpath, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Já processado — pula
        if 'btn-diaruim' in content:
            skipped += 1
            continue

        new_content = (content
            .replace(OLD_TG_MULTI,   NEW_TG_MULTI)
            .replace(OLD_TG_SINGLE,  NEW_TG_SINGLE)
            .replace(OLD_COSMO_C,    NEW_COSMO_C)
            .replace(OLD_COSMO_NC,   NEW_COSMO_NC)
        )

        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated += 1
        else:
            skipped += 1

print(f"Updated: {updated} | Skipped (unchanged/already done): {skipped}")
