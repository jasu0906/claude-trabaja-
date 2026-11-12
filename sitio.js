// Activa los botones de contacto de las páginas informativas con los datos de contacto.js.
(function () {
  var c = window.REPONER_CONTACTO || {};
  var tel = String(c.whatsapp || '').replace(/\D/g, '');
  [].forEach.call(document.querySelectorAll('[data-wa]'), function (a) {
    if (!tel) { a.hidden = true; return; }
    a.href = 'https://wa.me/' + tel + '?text=' + encodeURIComponent(a.getAttribute('data-wa'));
  });
  [].forEach.call(document.querySelectorAll('[data-sin-contacto]'), function (e) { e.hidden = !!tel; });
  [].forEach.call(document.querySelectorAll('[data-zona]'), function (e) { if (c.zona) e.textContent = c.zona; });
  [].forEach.call(document.querySelectorAll('[data-nombre]'), function (e) { if (c.nombre) e.textContent = c.nombre; else e.hidden = true; });
})();
