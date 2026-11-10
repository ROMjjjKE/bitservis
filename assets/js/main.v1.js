
(function () {
  'use strict';
  var WA = 'https://wa.me/375291731278';
  var RALS = [['7016','Антрацит','#3A4247'],['8017','Шоколад','#45302A'],['6005','Зелёный мох','#114A3A'],['3005','Вишня','#5E2129'],['9003','Белый','#E8E8E2'],['5005','Синий','#1B3F73'],['1015','Слоновая кость','#E3D6B8'],['7024','Графит','#42474B']];
  var NAMES = { ridge:'конёк', vetro:'ветровая планка', otliv:'отлив', otkos:'откос', sneg:'снегозадержатель' };

  function initDrawer() {
    var d = document.getElementById('drawer');
    var b = document.querySelector('.header .burger');
    if (!d || !b) return;
    var last = null;
    function open() {
      last = document.activeElement;
      d.hidden = false; d.setAttribute('data-open', '');
      b.setAttribute('aria-expanded', 'true');
      document.body.classList.add('is-locked');
      var f = d.querySelector('a, button'); if (f) f.focus({ preventScroll: true });
    }
    function close() {
      d.hidden = true; d.removeAttribute('data-open');
      b.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('is-locked');
      if (last) last.focus({ preventScroll: true });
    }
    b.addEventListener('click', function () { d.hidden ? open() : close(); });
    d.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]') || e.target.closest('a') || !e.target.closest('.drawer__in')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !d.hidden) close();
      if (e.key === 'Tab' && !d.hidden) {
        var it = d.querySelectorAll('a, button, input');
        if (!it.length) return;
        var f = it[0], l = it[it.length - 1];
        if (e.shiftKey && document.activeElement === f) { e.preventDefault(); l.focus(); }
        else if (!e.shiftKey && document.activeElement === l) { e.preventDefault(); f.focus(); }
      }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 1024 && !d.hidden) close(); });
  }

  function initCfg() {
    var svg = document.getElementById('cfgSvg');
    if (!svg) return;
    var st = { type: 'ridge', ral: 0, th: 0.5, len: 24, a: 100, hh: 90 };
    var TYPH = { ridge: 90, vetro: 70, otliv: 60, otkos: 80, sneg: 50 };
    var o = {
      spec: document.getElementById('cSpec'), f: document.getElementById('cFormula'),
      go: document.getElementById('cGo'), dev: document.getElementById('cDev'),
      thick: document.getElementById('cThick'), col: document.getElementById('cCol'),
      vL: document.getElementById('vL'), vA: document.getElementById('vA'), vHh: document.getElementById('vHh')
    };
    function n(v, d) { return (Math.round(v * Math.pow(10, d || 0)) / Math.pow(10, d || 0)).toString().replace('.', ','); }

    function geoms(a) {
      var g = {};
      g.ridge = { parts: [[a, 0], [a + 60, 90], [a + 60, 90]], dev: 2 * a + 2 * 60 + 40, h: 90 };
      return g;
    }

    function draw() {
      var a = st.a, H = st.hh;
      var col = RALS[st.ral][2];
      var dev, dims = [];
      if (st.type === 'ridge') dev = 2 * a + 2 * H * 0.5 + 30;
      else if (st.type === 'vetro') dev = a + H + 20;
      else if (st.type === 'otliv') dev = a + H + 30;
      else if (st.type === 'otkos') dev = a + H + 40;
      else dev = 2 * a + 60;

      var p = [];
      var X = 90, Y = 210, S = 0.85;
      var w = a * S, h = H * S;
      p.push('<rect x="0" y="0" width="520" height="300" fill="none"/>');
      // сетка
      for (var gx = 40; gx < 500; gx += 20) p.push('<line x1="' + gx + '" y1="30" x2="' + gx + '" y2="260" stroke="rgba(20,24,26,.05)" stroke-width="1"/>');
      for (var gy = 30; gy < 260; gy += 20) p.push('<line x1="40" y1="' + gy + '" x2="490" y2="' + gy + '" stroke="rgba(20,24,26,.05)" stroke-width="1"/>');
      // земля/база
      p.push('<line x1="50" y1="' + (Y + 14) + '" x2="480" y2="' + (Y + 14) + '" stroke="#6C7679" stroke-width="1" stroke-dasharray="6 5"/>');

      if (st.type === 'ridge') {
        p.push('<path d="M' + (X - w) + ' ' + Y + ' L' + X + ' ' + (Y - h) + ' L' + (X + w) + ' ' + Y + '" fill="' + col + '" fill-opacity=".22" stroke="' + col + '" stroke-width="3" stroke-linejoin="round"/>');
        p.push('<path d="M' + (X - w) + ' ' + Y + ' L' + (X - w) + ' ' + (Y + 12) + ' M' + (X + w) + ' ' + Y + ' L' + (X + w) + ' ' + (Y + 12) + '" stroke="' + col + '" stroke-width="3"/>');
        dims.push([X - w, Y + 34, X + w, Y + 34, '2 × ' + a + ' мм']);
        dims.push([X + w + 22, Y, X + w + 22, Y - h, H + ' мм']);
      } else if (st.type === 'vetro') {
        p.push('<path d="M' + X + ' ' + (Y - h) + ' L' + X + ' ' + Y + ' L' + (X + w) + ' ' + Y + ' L' + (X + w) + ' ' + (Y + 10) + '" fill="' + col + '" fill-opacity=".22" stroke="' + col + '" stroke-width="3" stroke-linejoin="round"/>');
        dims.push([X, Y + 34, X + w, Y + 34, a + ' мм']);
        dims.push([X - 24, Y, X - 24, Y - h, H + ' мм']);
      } else if (st.type === 'otliv') {
        p.push('<path d="M' + X + ' ' + (Y - h) + ' L' + X + ' ' + Y + ' L' + (X + w + 80) + ' ' + Y + ' L' + (X + w + 80) + ' ' + (Y - 16) + ' L' + (X + w + 92) + ' ' + (Y - 16) + ' L' + (X + w + 92) + ' ' + (Y + 10) + '" fill="' + col + '" fill-opacity=".22" stroke="' + col + '" stroke-width="3" stroke-linejoin="round"/>');
        dims.push([X, Y - h - 24, X + w + 92, Y - h - 24, (a + H) + ' мм']);
        dims.push([X - 26, Y, X - 26, Y - h, H + ' мм']);
      } else if (st.type === 'otkos') {
        p.push('<path d="M' + X + ' ' + (Y - h - 60) + ' L' + X + ' ' + Y + ' L' + (X + w + 90) + ' ' + Y + ' L' + (X + w + 90) + ' ' + (Y - 18) + ' L' + (X + w + 110) + ' ' + (Y - 18) + '" fill="' + col + '" fill-opacity=".22" stroke="' + col + '" stroke-width="3" stroke-linejoin="round"/>');
        dims.push([X - 26, Y, X - 26, Y - h - 60, H + 60 + ' мм']);
        dims.push([X, Y + 34, X + w, Y + 34, a + ' мм']);
      } else {
        // снегозадержатель
        p.push('<circle cx="' + (X + 40) + '" cy="' + (Y - h) + '" r="' + (h * 0.42) + '" fill="' + col + '" fill-opacity=".22" stroke="' + col + '" stroke-width="3"/>');
        p.push('<path d="M' + (X + 40) + ' ' + (Y - h + h * 0.42) + ' L' + (X + 40) + ' ' + Y + ' L' + (X + 40 + a * 0.9) + ' ' + Y + '" fill="none" stroke="' + col + '" stroke-width="3"/>');
        dims.push([X + 40, Y + 34, X + 40 + a * 0.9, Y + 34, a + ' мм']);
      }

      // размерные линии
      dims.forEach(function (d) {
        var x1 = d[0], y1 = d[1], x2 = d[2], y2 = d[3], t = d[4];
        p.push('<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#C1121F" stroke-width="1"/>');
        p.push('<line x1="' + x1 + '" y1="' + (y1 - 4) + '" x2="' + x1 + '" y2="' + (y1 + 4) + '" stroke="#C1121F" stroke-width="1.4"/>');
        p.push('<line x1="' + x2 + '" y1="' + (y2 - 4) + '" x2="' + x2 + '" y2="' + (y2 + 4) + '" stroke="#C1121F" stroke-width="1.4"/>');
        if (t) p.push('<text x="' + ((x1 + x2) / 2) + '" y="' + (y1 > y2 ? y1 + 13 : y1 - 6) + '" text-anchor="middle" font-family="Spline Sans Mono, monospace" font-size="10" fill="#14181A">' + t + '</text>');
      });

      // подпись профиля
      p.push('<text x="50" y="24" font-family="Spline Sans Mono, monospace" font-size="9" letter-spacing="1.6" fill="#6C7679">' + (NAMES[st.type] || '').toUpperCase() + ' · RAL ' + RALS[st.ral][0] + ' · ' + n(st.th, 2) + ' ММ</text>');
      svg.innerHTML = p.join('');

      var area = (dev / 1000) * st.len;
      var weight = area * (st.th / 1000) * 7850;
      var screws = Math.ceil(st.len / 0.3) * (st.type === 'sneg' ? 1 : 1);
      var rows = [
        ['Элемент', NAMES[st.type] || st.type],
        ['Ширина заготовки (развёртка)', Math.round(dev) + ' мм'],
        ['Высота профиля', H + ' мм'],
        ['Толщина металла', n(st.th, 2) + ' мм'],
        ['Длина', st.len + ' м'],
        ['Площадь металла', n(area, 2) + ' м²'],
        ['Вес металла', n(weight, 1) + ' кг'],
        ['Цвет', 'RAL ' + RALS[st.ral][0] + ' · ' + RALS[st.ral][1]],
        ['Крепёж (ориентир)', screws + ' саморезов, шаг 300 мм']
      ];
      o.spec.innerHTML = rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>'; }).join('');
      o.dev.textContent = Math.round(dev) + ' мм';
      o.thick.textContent = n(st.th, 2) + ' мм';
      o.col.textContent = 'RAL ' + RALS[st.ral][0];
      o.vL.textContent = st.len + ' м';
      o.vA.textContent = a + ' мм';
      if (o.vHh) o.vHh.textContent = H + ' мм';
      o.f.textContent = 'Развёртка ≈ ' + Math.round(dev) + ' мм | Площадь = ' + n(dev / 1000, 3) + ' × ' + st.len + ' = ' + n(area, 2) + ' м² | Вес = площадь × ' + n(st.th, 2) + ' мм × 7850 = ' + n(weight, 1) + ' кг';
      o.go.href = WA + '?text=' + encodeURIComponent(
        'Заявка с сайта: изделия из металла.\nЭлемент: ' + (NAMES[st.type] || st.type) +
        '\nЦвет: RAL ' + RALS[st.ral][0] + ' (' + RALS[st.ral][1] + ')' +
        '\nТолщина: ' + n(st.th, 2) + ' мм\nДлина: ' + st.len + ' м\nПолка: ' + a + ' мм\nВысота профиля: ' + H + ' мм' +
        '\nРазвёртка: ' + Math.round(dev) + ' мм, площадь: ' + n(area, 2) + ' м², вес: ' + n(weight, 1) + ' кг' +
        '\n\nПришлю фото объекта и уточню размеры.');
    }

    var box = document.getElementById('cType');
    if (box) box.addEventListener('click', function (e) {
      var btn = e.target.closest('button'); if (!btn || !box.contains(btn)) return;
      st.type = btn.getAttribute('data-v');
      st.hh = TYPH[st.type] || 70;
      var hEl = document.getElementById('cH'); if (hEl) hEl.value = String(st.hh);
      [].forEach.call(box.children, function (c) { c.setAttribute('aria-pressed', c === btn ? 'true' : 'false'); });
      draw();
    });
    var th = document.getElementById('cTh');
    if (th) th.addEventListener('click', function (e) {
      var btn = e.target.closest('button'); if (!btn || !th.contains(btn)) return;
      st.th = parseFloat(btn.getAttribute('data-v'));
      [].forEach.call(th.children, function (c) { c.setAttribute('aria-pressed', c === btn ? 'true' : 'false'); });
      draw();
    });
    var sw = document.getElementById('cSw');
    if (sw) {
      sw.innerHTML = RALS.map(function (r, i) {
        return '<button type="button" class="sw" data-i="' + i + '" aria-pressed="' + (i === 0 ? 'true' : 'false') + '" aria-label="RAL ' + r[0] + ' ' + r[1] + '" title="RAL ' + r[0] + ' ' + r[1] + '" style="background:' + r[2] + '"></button>';
      }).join('');
      sw.addEventListener('click', function (e) {
        var btn = e.target.closest('.sw'); if (!btn) return;
        st.ral = parseInt(btn.getAttribute('data-i'), 10);
        [].forEach.call(sw.children, function (c) { c.setAttribute('aria-pressed', c === btn ? 'true' : 'false'); });
        draw();
      });
    }
    var cL = document.getElementById('cL'), cA = document.getElementById('cA');
    if (cL) cL.addEventListener('input', function () { st.len = parseInt(cL.value, 10); draw(); });
    if (cA) cA.addEventListener('input', function () { st.a = parseInt(cA.value, 10); draw(); });
    var cH = document.getElementById('cH');
    if (cH) cH.addEventListener('input', function () { st.hh = parseInt(cH.value, 10); draw(); });
    draw();
  }

  function initLead() {
    var f = document.getElementById('lead');
    if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = document.getElementById('lName'), t = document.getElementById('lTel');
      var city = document.getElementById('lCity'), obj = document.getElementById('lObj'), task = document.getElementById('lTask');
      var bad = false;
      [n, t].forEach(function (el) {
        if (!el.value.trim()) { el.style.borderColor = '#C1121F'; bad = true; } else { el.style.borderColor = ''; }
      });
      if (bad) return;
      var msg = 'Заявка с сайта: листогиб, изделия из металла.\nИмя: ' + n.value.trim() + '\nТелефон: ' + t.value.trim() +
        (city && city.value.trim() ? '\nГород: ' + city.value.trim() : '') +
        (obj && obj.value.trim() ? '\nЧто нужно: ' + obj.value.trim() : '') +
        (task && task.value.trim() ? '\nРазмеры: ' + task.value.trim() : '') +
        '\n\nФото прикреплю следом.';
      window.open(WA + '?text=' + encodeURIComponent(msg), '_blank');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initDrawer(); initCfg(); initLead();
    var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
  });
})();
