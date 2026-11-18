# -*- coding: utf-8 -*-
import pathlib, re

P = pathlib.Path('.')
CSS_OLD = 'assets/css/style.v1.css'
CSS_NEW = 'assets/css/style.v2.css'
TEL_T = '+37529513700'

# 1. CSS: копия + блок услуг
css = (P / CSS_OLD).read_text(encoding='utf-8')
add = """

/* === бытовые услуги (Толочин) === */
.svc-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(10px,1.6vw,18px)}
.svc{background:var(--white);border:1px solid var(--line);display:flex;flex-direction:column;min-width:0;transition:transform .2s,box-shadow .2s}
.svc:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(20,24,26,.09)}
.svc__img{position:relative;overflow:hidden;background:#DDE2E1}
.svc__img img{width:100%;height:100%;object-fit:cover;aspect-ratio:4/3;display:block;transition:transform .6s}
.svc:hover .svc__img img{transform:scale(1.05)}
.svc__tag{position:absolute;left:10px;top:10px;background:var(--red);color:#fff;font:500 8.5px/1 var(--m);letter-spacing:.12em;text-transform:uppercase;padding:6px 8px}
.svc__b{padding:clamp(13px,1.8vw,20px);display:flex;flex-direction:column;gap:8px;flex:1}
.svc__b h3{font:700 1.12rem/1.2 var(--d);margin:0;letter-spacing:-.01em}
.svc__b p{margin:0;font-size:.9rem;color:var(--zinc);line-height:1.5}
.svc__b ul{margin:0;padding-left:15px;color:#39423F;font-size:.88rem;line-height:1.5}
.svc__more{margin-top:auto;padding-top:10px;font:500 9px/1 var(--m);letter-spacing:.1em;text-transform:uppercase;color:var(--red);border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;gap:8px}
.svc__more:hover{color:var(--red2)}
.svc-block{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(14px,3.2vw,42px);align-items:center}
.svc-block+.svc-block{margin-top:clamp(24px,4vw,54px);padding-top:clamp(24px,4vw,54px);border-top:1px solid var(--line)}
.svc-block:nth-child(even) .svc-block__media{order:-1}
.svc-block__media{position:relative;overflow:hidden;border:1px solid var(--line);background:#DDE2E1}
.svc-block__media img{width:100%;height:100%;object-fit:cover;aspect-ratio:4/3;display:block}
.svc-block__cap{position:absolute;left:0;bottom:0;background:rgba(17,22,24,.86);color:#fff;font:500 8.5px/1 var(--m);letter-spacing:.1em;text-transform:uppercase;padding:7px 10px}
.svc-block__b h3{font:700 clamp(1.25rem,2.4vw,1.85rem)/1.15 var(--d);margin:0 0 8px;letter-spacing:-.02em}
.svc-block__b p{margin:0 0 10px;color:#39423F;font-size:.95rem;max-width:52ch}
.svc-block__b ul{margin:0 0 12px;padding-left:16px;color:#39423F;font-size:.92rem;line-height:1.6}
.svc-block__b li{margin-bottom:3px}
.svc-num{font:500 9px/1 var(--m);letter-spacing:.12em;color:var(--red);display:block;margin-bottom:9px}
@media (max-width:1024px){.svc-grid{grid-template-columns:1fr 1fr}.svc-block{grid-template-columns:minmax(0,1fr)}.svc-block:nth-child(even) .svc-block__media{order:0}}
@media (max-width:720px){.svc-grid{grid-template-columns:minmax(0,1fr)}}
@media (max-width:1280px){.header__in>.btn{display:none}}
.nav{gap:12px;font-size:12px}
"""
(P / CSS_NEW).write_text(css + add, encoding='utf-8')
(P / CSS_OLD).unlink()

# 2. Патч общих страниц: CSS-ссылка, пункт меню
pages = [p for p in P.glob('*.html')]
NAV_OLD = '<a href="produkciya.html">Продукция</a>'
NAV_NEW = '<a href="produkciya.html">Продукция</a><a href="uslugi.html">Услуги</a>'
for p in pages:
    if p.name == 'uslugi.html':
        continue
    s = p.read_text(encoding='utf-8')
    s = s.replace('assets/css/style.v1.css', 'assets/css/style.v2.css')
    # шапка и панель меню
    if 'uslugi.html' not in s:
        s = s.replace('<a href="produkciya.html" class="is-on">Продукция</a>',
                      '<a href="produkciya.html" class="is-on">Продукция</a><a href="uslugi.html">Услуги</a>')
        s = s.replace(NAV_OLD, NAV_NEW)
        s = s.replace('<li><a href="produkciya.html">Продукция</a></li>',
                      '<li><a href="produkciya.html">Продукция</a></li><li><a href="uslugi.html">Услуги</a></li>')
    p.write_text(s, encoding='utf-8')
print('страниц обновлено:', len(pages))
