# -*- coding: utf-8 -*-
import pathlib, re
P = pathlib.Path('.')
tpl = (P / 'produkciya.html').read_text(encoding='utf-8')

main = """<main>
<section class="phero"><img src="assets/img/antenna.jpg" alt="Спутниковая антенна на стене дома" fetchpriority="high">
<div class="wrap phero__in">
<div class="crumbs"><a href="index.html">Главная</a> · Услуги</div>
<h1>Ключи, телевизоры и <em>антенны</em></h1>
<p>Бытовые услуги в Толочине, Дзержинского 11: изготовление ключей, ремонт телевизоров, эфирные и спутниковые антенны. Приносите образец или фото — скажем, что можно сделать.</p>
</div></section>

<section class="section"><div class="wrap">
<div class="sec-head"><div><span class="eyebrow">01 / что делаем</span><h2 class="h2">Три направления<br><em>под одной вывеской</em></h2></div>
<p>Работаем с тем, что есть под рукой у каждого: ключи, телевизор, антенна. Без записи на неделю вперёд — приходите или позвоните.</p></div>

<div class="svc-block">
<div class="svc-block__b"><span class="svc-num">01 — ключи</span><h3>Изготовление ключей</h3>
<p>Все виды ключей: принесите образец, подберём заготовку и сделаем дубликат при вас.</p>
<ul><li>Квартирные, замковые и сейфовые</li><li>Домофонные и почтовые</li><li>Автомобильные дубликаты и брелоки</li><li>Заготовки в наличии, подбор по образцу</li></ul>
<div class="formula">цена и срок — по вашему образцу: зависит от типа ключа и заготовки</div></div>
<div class="svc-block__media"><img src="assets/img/keys.jpg" alt="Заготовки ключей на витрине" loading="lazy"><span class="svc-block__cap">Ключи · Толочин, Дзержинского 11</span></div>
</div>

<div class="svc-block">
<div class="svc-block__b"><span class="svc-num">02 — телевизоры</span><h3>Ремонт телевизоров</h3>
<p>Диагностика и восстановление работоспособности: сначала смотрим, потом называем объём и стоимость.</p>
<ul><li>Диагностика и поиск неисправности</li><li>Ремонт платы и блока питания</li><li>Замена подсветки</li><li>Проверка и настройка после ремонта</li></ul>
<div class="formula">точный перечень работ — после диагностики, а не «по телефону»</div></div>
<div class="svc-block__media"><img src="assets/img/tv.jpg" alt="Ремонт телевизора на верстаке" loading="lazy"><span class="svc-block__cap">Ремонт телевизоров</span></div>
</div>

<div class="svc-block">
<div class="svc-block__b"><span class="svc-num">03 — антенны</span><h3>Антенны: эфирные и спутниковые</h3>
<p>Монтаж, установка, проверка и настройка. Подключаем и настраиваем пакеты спутникового телевидения.</p>
<ul><li>Эфирные антенны, 20 каналов</li><li>Триколор, НТВ Плюс, МТС ТВ</li><li>Монтаж и установка на дом или мачту</li><li>Проверка сигнала и настройка каналов</li></ul>
<div class="formula">выезд и стоимость монтажа зависят от адреса и высоты установки</div></div>
<div class="svc-block__media"><img src="assets/img/antenna.jpg" alt="Спутниковая антенна и эфирная антенна" loading="lazy"><span class="svc-block__cap">Антенны · монтаж и настройка</span></div>
</div>
</div></section>

<section class="section section--dim"><div class="wrap">
<div class="sec-head"><div><span class="eyebrow">02 / порядок</span><h2 class="h2">Как проходит<br><em>работа</em></h2></div>
<p>Короткая цепочка: без бумажной волокиты и «оставьте, мы позвоним, когда вспомним».</p></div>
<div class="steps">
<div class="step"><span>01</span><b>Обращение</b><p>Звонок, сообщение или визит на Дзержинского, 11.</p></div>
<div class="step"><span>02</span><b>Осмотр</b><p>Смотрим ключ, телевизор или точку установки антенны.</p></div>
<div class="step"><span>03</span><b>Объём и цена</b><p>Называем, что делаем и сколько это стоит, до начала работ.</p></div>
<div class="step"><span>04</span><b>Работа</b><p>Изготовление ключа, ремонт или монтаж антенны.</p></div>
<div class="step"><span>05</span><b>Проверка</b><p>Проверяем результат при вас: ключ, изображение, сигнал.</p></div>
</div>
</div></section>

<section class="section"><div class="wrap"><div class="two">
<div>
<span class="eyebrow">03 / адрес</span>
<h2 class="h2">БытСервис<br><em>в Толочине</em></h2>
<div class="prose" style="margin-top:12px">
<p>Мастерская бытовых услуг: Дзержинского, 11. Здесь же можно задать вопрос по кровле и изделиям из металла — это второе направление «Бытсервиса».</p>
<ul>
<li>Адрес: Толочин, ул. Дзержинского, 11</li>
<li>Телефон: +375 (29) 511-37-00</li>
<li>УНП 391972423</li>
<li>Ключи, ремонт телевизоров, антенны</li>
</ul>
<p class="note">Режим работы уточняйте по телефону: он меняется по сезону.</p>
</div>
<div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn" href="https://wa.me/37529513700" target="_blank" rel="noopener">WhatsApp</a><a class="btn btn--ghost" href="tel:+37529513700">Позвонить</a></div>
</div>
<div class="gal"><figure><img src="assets/img/keys.jpg" alt="Ключи" loading="lazy"></figure><figure><img src="assets/img/tv.jpg" alt="Ремонт телевизоров" loading="lazy"></figure><figure><img src="assets/img/antenna.jpg" alt="Антенны" loading="lazy"></figure></div>
</div></div></section>

<section class="section section--dim"><div class="wrap">
<h2 class="h2" style="margin-bottom:14px">Коротко<br><em>по делу</em></h2>
<div class="faq">
<details><summary>Можно ли сделать ключ по замку, а не по образцу?</summary><p>Да, если привезёте замок или цилиндр. По образцу проще и быстрее, по замку — точнее, если ключ уже изношен.</p></details>
<details><summary>Сколько занимает изготовление ключа?</summary><p>Простые ключи делаем при вас, за несколько минут. Сложные заготовки и автомобильные дубликаты могут потребовать времени — скажем сразу при обращении.</p></details>
<details><summary>Ремонтируете телевизоры с любой матрицей?</summary><p>Сначала диагностика. Если ремонт невозможен или невыгоден, скажем об этом прямо, а не будем тянуть.</p></details>
<details><summary>Ставите антенну за городом?</summary><p>Да, выезжаем. Стоимость зависит от расстояния, высоты установки и материала стены — уточняйте по телефону.</p></details>
<details><summary>А если нужна кровля или откосы?</summary><p>Это второе направление «Бытсервиса» в Ушачах: листогиб, доборные элементы кровли, откосы, заборы. Смотрите разделы сайта.</p></details>
</div>
</div></section>

<section class="cta"><div class="wrap cta__in">
<div><h2>Ключ, телевизор<br><em>или антенна?</em></h2><p>Толочин, Дзержинского, 11. Позвоните или напишите — подскажем по вашему случаю.</p></div>
<div class="cta__acts"><a class="btn btn--light" href="https://wa.me/37529513700" target="_blank" rel="noopener">WhatsApp</a><a class="btn btn--light" href="tel:+37529513700">+375 (29) 511-37-00</a></div>
</div></section>
</main>"""

s = tpl
s = re.sub(r'<title>[^<]*</title>',
           '<title>Бытовые услуги в Толочине: ключи, ремонт телевизоров, антенны — БытСервис</title>', s)
s = re.sub(r'<meta name="description" content="[^"]*">',
           '<meta name="description" content="БытСервис, Толочин, Дзержинского 11: изготовление ключей, ремонт телевизоров, '
           'эфирные и спутниковые антенны (Триколор, НТВ Плюс, МТС ТВ). Телефон +375 (29) 511-37-00.">', s)
s = s.replace('<a href="produkciya.html" class="is-on">Продукция</a>', '<a href="produkciya.html">Продукция</a>')
s = s.replace('<a href="uslugi.html">Услуги</a>', '<a href="uslugi.html" class="is-on">Услуги</a>')
s = re.sub(r'<main>.*?</main>', main, s, flags=re.S)
(P / 'uslugi.html').write_text(s, encoding='utf-8')
print('uslugi.html', len(s), 'h1', s.count('<h1'), 'aria-current/is-on', s.count('is-on'))
