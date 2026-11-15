// Prueba de extremo a extremo: node tests/prueba.js
const { chromium } = require('playwright');
const path = require('path');
const assert = require('assert');
const http = require('http');
const fs = require('fs');
const RAIZ = path.resolve(__dirname, '..');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
// Servidor local: los catálogos se piden con fetch, que no funciona abriendo el archivo directamente.
function servir() {
  return new Promise(ok => {
    const s = http.createServer((req, res) => {
      let ruta = decodeURIComponent(req.url.split('?')[0]);
      if (ruta.endsWith('/')) ruta += 'index.html';
      const f = path.join(RAIZ, ruta);
      if (!f.startsWith(RAIZ) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': TIPOS[path.extname(f)] || 'application/octet-stream' }); res.end(fs.readFileSync(f));
    }).listen(0, '127.0.0.1', () => ok(s));
  });
}
(async () => {
  const servidor = await servir();
  const BASE = 'http://127.0.0.1:' + servidor.address().port + '/';
  const b = await chromium.launch();
  const errores = [];
  const vigilar = p => {
    p.on('pageerror', e => errores.push('error: ' + e.message));
    p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errores.push('consola: ' + m.text()); });
  };
  const nuevo = async (hoy, antes) => {
    const ctx = await b.newContext({ viewport: { width: 400, height: 800 } });
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: BASE.slice(0, -1) });
    const p = await ctx.newPage(); vigilar(p);
    await p.addInitScript(h => { if (!window.__hoy) window.__hoy = h; }, hoy);
    if (antes) await p.addInitScript(antes);
    return p;
  };
  const texto = (p, s) => p.locator(s).innerText();
  const confirmar = p => p.click('[data-acc="confirmarSi"]');

  const pg = await nuevo('2026-11-12');
  await pg.goto(BASE);

  // 1. Cálculo puro y lectura de números
  const r = await pg.evaluate(() => {
    const cfg = { cobertura: 7 };
    const p = { entrega: 2, empaque: 20, conteos: [
      { fecha: '2026-10-29', stock: 40, recibido: 0 }, { fecha: '2026-11-05', stock: 22, recibido: 20 }, { fecha: '2026-11-10', stock: 6, recibido: 20 }] };
    return { a: analizar(p, cfg, '2026-11-12'), uno: analizar({ conteos: [{ fecha: '2026-11-10', stock: 5 }] }, cfg, '2026-11-12'),
      quieto: analizar({ entrega: 2, conteos: [{ fecha: '2026-11-01', stock: 9 }, { fecha: '2026-11-10', stock: 9 }] }, cfg, '2026-11-12'),
      guia: analizar({ entrega: 2, empaque: 20, conteos: [{ fecha: '2026-11-02', stock: 40, recibido: 0 }, { fecha: '2026-11-09', stock: 20, recibido: 20 }] }, cfg, '2026-11-09'),
      atraso: analizar({ entrega: 2, pendiente: { fecha: '2026-11-10', cantidad: 5 }, conteos: [] }, cfg, '2026-11-17'),
      nums: [num('1,5', null), num('1.5', null), num('1.234,50', null), num('1,234.50', null), num('', null), num('abc', null), num('-3', null), num(' 12 ', null), num('1.234.567', null)],
      dinero: [usd(1234.5), usd(0), bs(4400), cant(2.5), cant(40), cant(1234)],
      fechas: [fechaCorta('2026-11-09'), fechaLarga('2026-11-15')],
      saneo: [sanear(null), sanear({ productos: 'x' }), sanear({ productos: [null, { nombre: ' ' }, { nombre: 'Sal', costo: '0,45', conteos: [{ fecha: 'mal', stock: 1 }, { fecha: '2026-11-02', stock: '3' }, { fecha: '2026-11-01', stock: 5 }] }] })] };
  });
  // consumo: (40+20-22) + (22+20-6) = 74 en 12 días = 6,17/día; stock hoy = 6 - 2*6,17 -> 0
  assert.ok(Math.abs(r.a.ritmo - 74 / 12) < 1e-9, 'ritmo');
  assert.strictEqual(r.a.estado, 'agotado');
  assert.strictEqual(r.a.sugerido, 60, 'sugerido: 6,17*(2+7)=55,5 -> 60 por empaque de 20');
  assert.strictEqual(r.uno.estado, 'sin');
  assert.strictEqual(r.quieto.estado, 'bien');
  assert.deepStrictEqual([r.guia.estado, r.guia.sugerido], ['pedir', 40], 'ejemplo de la guía');
  assert.deepStrictEqual([r.atraso.estado, r.atraso.atraso], ['camino', 3]);
  assert.deepStrictEqual(r.nums, [1.5, 1.5, 1234.5, 1234.5, null, null, null, 12, 1234567]);
  assert.deepStrictEqual(r.dinero, ['$1.234,50', '$0,00', 'Bs 4.400,00', '2,5', '40', '1.234']);
  assert.deepStrictEqual(r.fechas, ['9 nov', 'domingo 15 de noviembre']);
  assert.strictEqual(r.saneo[0], null); assert.strictEqual(r.saneo[1], null);
  assert.strictEqual(r.saneo[2].productos.length, 1);
  assert.deepStrictEqual(r.saneo[2].productos[0].conteos, [{ fecha: '2026-11-01', stock: 5, recibido: 0 }, { fecha: '2026-11-02', stock: 3, recibido: 0 }]);
  assert.strictEqual(r.saneo[2].productos[0].costo, 0.45);

  assert.strictEqual(await pg.evaluate(() => document.documentElement.getAttribute('data-theme')), 'light', 'el fondo claro es el inicial');

  // 2. Bienvenida de tres pasos y bodega de ejemplo
  assert.ok(await pg.locator('#capa [role=dialog]').isVisible());
  assert.ok((await texto(pg, '#capa')).includes('Cuenta tu estante'));
  await pg.keyboard.press('Escape');
  assert.ok(await pg.locator('#capa').isVisible(), 'la primera bienvenida no se cierra con Escape');
  await pg.click('[data-acc="bienSig"]'); await pg.click('[data-acc="bienSig"]');
  assert.ok((await texto(pg, '#capa')).includes('Tus datos son tuyos'));
  await pg.click('[data-acc="bienEjemplo"]');
  assert.ok(await pg.locator('#capa').isHidden());
  assert.ok(await pg.locator('#avisoEjemplo').isVisible());
  assert.strictEqual((await texto(pg, '.heroe .grande')).trim(), '4');
  assert.ok((await texto(pg, '.heroe')).includes('$218,30'));
  assert.strictEqual(await pg.locator('article.tarjeta').count(), 3);
  assert.ok((await pg.locator('a[data-acc="wa"]').first().getAttribute('href')).startsWith('https://wa.me/?text=Hola'));
  await pg.screenshot({ path: path.resolve(__dirname, 'captura.png'), fullPage: true });
  await pg.reload();
  assert.ok(await pg.locator('#capa').isHidden(), 'la bienvenida no se repite');

  // 3. Empezar de cero y agregar un producto, con validaciones
  await pg.click('[data-acc="empezar"]');
  assert.ok((await texto(pg, '#vista')).includes('Empieza por lo que más vendes'));
  await pg.click('[data-acc="nuevo"]');
  await pg.click('#fProd button[type=submit]');
  assert.ok((await texto(pg, '#ePNombre')).includes('Escribe el nombre'));
  await pg.fill('#pNombre', 'Harina <b>PAN</b>');
  await pg.fill('#pProv', 'La Central');
  await pg.fill('#pCosto', 'caro');
  await pg.click('#fProd button[type=submit]');
  assert.ok(await pg.locator('#capa').isVisible(), 'un costo que no es número no se guarda');
  await pg.fill('#pCosto', '1,10');
  await pg.fill('#pEntrega', '2');
  await pg.fill('#pEmp', '10');
  await pg.fill('#pStock', '30');
  await pg.click('#fProd button[type=submit]');
  assert.ok(await pg.locator('#capa').isHidden());
  assert.strictEqual(await pg.locator('.fila-prod').count(), 1);
  assert.strictEqual(await pg.locator('.fila-prod b b').count(), 0, 'el nombre se escapa');
  assert.strictEqual(await pg.evaluate(() => S.productos[0].costo), 1.1);
  await pg.click('[data-acc="nuevo"]'); await pg.fill('#pNombre', 'harina <B>pan</B>'); await pg.click('#fProd button[type=submit]');
  assert.ok((await texto(pg, '#ePNombre')).includes('Ya tienes'));
  await pg.keyboard.press('Escape');
  assert.ok(await pg.locator('#capa').isHidden());

  // 4. Conteo con botones, Enter y guardado
  await pg.evaluate(() => { window.__hoy = '2026-11-17'; });
  await pg.click('[data-tab="conteo"]');
  assert.ok(await pg.locator('#btnGuardarConteo').isDisabled());
  await pg.click('[data-campo="hay"][data-d="-1"]');
  assert.strictEqual(await pg.inputValue('[data-hay]'), '29', 'el botón − parte del último conteo');
  await pg.click('[data-campo="hay"][data-d="1"]'); await pg.click('[data-campo="hay"][data-d="1"]');
  assert.strictEqual(await pg.inputValue('[data-hay]'), '31');
  await pg.fill('[data-hay]', '5x');
  assert.strictEqual(await pg.inputValue('[data-hay]'), '5', 'solo se aceptan números');
  assert.ok((await texto(pg, '#progreso')).includes('1 producto contado de 1'));
  await pg.click('[data-tab="pedido"]'); await pg.click('[data-tab="conteo"]');
  assert.strictEqual(await pg.inputValue('[data-hay]'), '5', 'lo escrito no se pierde al cambiar de pestaña');
  await pg.focus('[data-hay]'); await pg.keyboard.press('Enter');
  assert.strictEqual(await pg.evaluate(() => document.activeElement.id), 'btnGuardarConteo');
  await pg.keyboard.press('Enter');
  // 25 vendidas en 5 días = 5/día; punto de pedido 5*(2+2)=20; pedir 5*(2+7)-5 = 40
  assert.ok((await texto(pg, '#vista')).includes('Pedir hoy'));
  assert.strictEqual((await texto(pg, '.cant b >> nth=0')).trim(), '40');
  assert.ok((await texto(pg, '.heroe')).includes('$44,00'));
  assert.ok((await texto(pg, '#toast')).includes('Conteo guardado'));

  // 5. Ajustes: se guardan solos y persisten al recargar
  await pg.click('[data-tab="ajustes"]');
  await pg.fill('#aCob', '0'); await pg.locator('#aCob').blur();
  assert.strictEqual(await pg.evaluate(() => S.cobertura), 7, 'una cobertura inválida no se guarda');
  await pg.fill('#aTasa', '100'); await pg.locator('#aTasa').blur();
  await pg.fill('#aBodega', 'Abasto Prueba'); await pg.locator('#aBodega').blur();
  await pg.fill('[data-tel]', '58 412-1234567'); await pg.locator('[data-tel]').blur();
  await pg.reload();
  assert.ok((await texto(pg, '.heroe')).includes('Bs 4.400,00'));
  assert.strictEqual(await texto(pg, '#negocio'), 'Abasto Prueba');
  const enlace = await pg.locator('a[data-acc="wa"]').first().getAttribute('href');
  assert.ok(enlace.startsWith('https://wa.me/584121234567?text='));
  const msj = decodeURIComponent(enlace.split('?text=')[1]);
  assert.strictEqual(msj, 'Hola, La Central. Pedido de Abasto Prueba:\n- 40 × Harina <b>PAN</b>\nTotal estimado: $44,00');
  await pg.click('[data-acc="copiar"]');
  assert.strictEqual(await pg.evaluate(() => navigator.clipboard.readText()), msj, 'Copiar pedido');

  // 6. Ya lo pedí -> En camino -> Llegó -> conteo
  await pg.click('[data-acc="yaPedi"]');
  assert.ok((await texto(pg, '#vista')).includes('EN CAMINO'));
  assert.strictEqual(await pg.locator('a[data-acc="wa"]').count(), 0, 'ya no se sugiere');
  assert.ok((await texto(pg, '.heroe')).includes('Hoy no hace falta pedir nada'));
  await pg.click('[data-acc="llego"]');
  const tras = await pg.evaluate(() => ({ a: analizar(S.productos[0], S, hoyISO()), p: S.productos[0] }));
  assert.strictEqual(tras.p.porRecibir, 40); assert.strictEqual(tras.a.stock, 45); assert.strictEqual(tras.a.estado, 'bien');
  await pg.click('[data-tab="conteo"]');
  assert.strictEqual(await pg.inputValue('[data-llego]'), '40');
  assert.ok(await pg.locator('[data-llego]').isVisible());
  await pg.fill('[data-hay]', '44');
  await pg.click('[data-acc="guardarConteo"]');
  assert.strictEqual(await pg.evaluate(() => S.productos[0].porRecibir), 0);
  assert.strictEqual(await pg.evaluate(() => S.productos[0].conteos.length), 2, 'contar dos veces el mismo día reemplaza');

  // 7. Lista rápida, informe y borrar un producto con confirmación
  await pg.click('[data-tab="productos"]');
  await pg.click('details summary');
  await pg.click('[data-nombre="Arroz 1 kg"]');
  assert.strictEqual(await pg.evaluate(() => S.productos.length), 2);
  assert.strictEqual(await pg.locator('.chips [data-nombre="Arroz 1 kg"]').count(), 0);
  assert.ok((await texto(pg, '#listaProd')).includes('Falta completar'));
  await pg.click('[data-tab="ajustes"]');
  const inf = await pg.inputValue('#informe');
  assert.ok(inf.includes('Productos: 2') && inf.includes('Pedidos marcados como hechos: 1') && inf.includes('Conteos anotados: 2'), inf);
  await pg.click('[data-tab="productos"]');
  await pg.click('.fila-prod >> nth=1');
  await pg.click('#fProd [data-acc="borrar"]'); await pg.click('#capa [data-acc="cerrar"]');
  assert.strictEqual(await pg.evaluate(() => S.productos.length), 2, 'cancelar no borra');
  await pg.click('.fila-prod >> nth=1'); await pg.click('#fProd [data-acc="borrar"]'); await confirmar(pg);
  assert.strictEqual(await pg.evaluate(() => S.productos.length), 1);

  // 8. Respaldo, borrar todo y restaurar
  await pg.click('[data-tab="ajustes"]');
  await pg.click('[data-acc="copiarResp"]');
  const resp = await pg.evaluate(() => navigator.clipboard.readText());
  assert.strictEqual(JSON.parse(resp).productos.length, 1);
  await pg.click('[data-acc="borrarTodo"]'); await pg.click('#capa [data-acc="cerrar"]');
  assert.strictEqual(await pg.evaluate(() => S.productos.length), 1);
  await pg.click('[data-acc="borrarTodo"]'); await confirmar(pg);
  assert.strictEqual(await pg.evaluate(() => S.productos.length), 0);
  await pg.click('[data-tab="ajustes"]');
  await pg.fill('#respaldo', 'esto no es un respaldo'); await pg.click('[data-acc="restaurar"]');
  assert.ok(await pg.locator('#capa').isHidden()); assert.ok((await texto(pg, '#toast')).includes('no es un respaldo'));
  await pg.fill('#respaldo', resp); await pg.click('[data-acc="restaurar"]'); await confirmar(pg);
  assert.deepStrictEqual(await pg.evaluate(() => [S.productos.length, S.bodega, S.tasa]), [1, 'Abasto Prueba', 100]);

  // Código QR dentro de la app para compartirla
  await pg.click('[data-tab="ajustes"]');
  assert.ok(await pg.locator('#compartir .qr-caja svg').isVisible());
  assert.ok(await pg.evaluate(() => document.querySelector('#i-qr path').getAttribute('d').length > 500), 'el QR viene dentro de la app');
  assert.ok((await texto(pg, '#derechos')).includes('Todos los derechos reservados'));
  await pg.click('[data-acc="copiarEnlace"]');
  assert.strictEqual(await pg.evaluate(() => navigator.clipboard.readText()), 'https://jasu0906.github.io/claude-trabaja-/');
  await pg.click('[data-acc="verQR"]');
  assert.ok(await pg.locator('#capa .qr-caja.grande').isVisible());
  await pg.screenshot({ path: path.resolve(__dirname, 'captura-qr.png') });
  await pg.keyboard.press('Escape');
  assert.ok(await pg.locator('#capa').isHidden());

  // 9. Tema claro y oscuro, y bienvenida vista de nuevo sin riesgo
  await pg.click('[data-tab="ajustes"]');
  await pg.click('[data-tema="dark"]');
  assert.strictEqual(await pg.evaluate(() => document.documentElement.getAttribute('data-theme')), 'dark');
  await pg.screenshot({ path: path.resolve(__dirname, 'captura-oscuro.png') });
  await pg.click('[data-tema="auto"]');
  assert.strictEqual(await pg.evaluate(() => document.documentElement.getAttribute('data-theme')), null);
  await pg.click('[data-acc="verBienvenida"]'); await pg.click('[data-acc="bienSig"]'); await pg.click('[data-acc="bienSig"]');
  assert.strictEqual(await pg.locator('[data-acc="bienMio"]').count(), 0, 'repasar la bienvenida no ofrece borrar datos');
  await pg.click('#capa [data-acc="cerrar"]');
  assert.strictEqual(await pg.evaluate(() => S.productos.length), 1);
  assert.ok(await pg.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'desborde');

  // 10. Catálogo de distribuidora: se ofrece, se agrega y reemplaza la bodega de ejemplo
  const p2 = await nuevo('2026-11-12');
  await p2.goto(BASE + '?d=ejemplo');
  await p2.click('[data-acc="bienSaltar"]');
  await p2.waitForSelector('#catalogoAviso:not([hidden])');
  assert.ok((await texto(p2, '#catalogoAviso')).includes('Distribuidora de Ejemplo'));
  await p2.click('[data-acc="catSi"]');
  let st = await p2.evaluate(() => ({ n: S.productos.length, ej: S.ejemplo, min: S.minimos['Distribuidora de Ejemplo'], cat: Object.keys(S.catalogos), url: location.search, prov: S.productos[0].proveedor, emp: S.productos[0].empaque }));
  assert.deepStrictEqual(st, { n: 6, ej: false, min: 50, cat: ['ejemplo'], url: '', prov: 'Distribuidora de Ejemplo', emp: 20 });
  // buscador del conteo
  await p2.fill('#buscarConteo', 'azucar');
  assert.strictEqual(await p2.locator('.prod-conteo:visible').count(), 1, 'el buscador ignora tildes');
  await p2.fill('#buscarConteo', 'zzz');
  assert.ok(await p2.locator('#sinCoincidencias').isVisible());
  await p2.fill('#buscarConteo', '');
  // Enter pasa al siguiente producto
  await p2.fill('[data-hay] >> nth=0', '20'); await p2.keyboard.press('Enter');
  assert.strictEqual(await p2.evaluate(() => document.activeElement === document.querySelectorAll('[data-hay]')[1]), true);
  await p2.click('[data-acc="guardarConteo"]');
  await p2.evaluate(() => { window.__hoy = '2026-11-16'; });
  await p2.click('[data-tab="conteo"]'); await p2.fill('[data-hay] >> nth=0', '4'); await p2.click('[data-acc="guardarConteo"]');
  // 16 vendidas en 4 días = 4/día; pedir 4*(2+7)-4 = 32 -> 40 por empaque de 20; 40 x 1,10 = $44 < mínimo de $50
  const vista = await texto(p2, '#vista');
  assert.ok(vista.includes('Faltan $6,00 para el pedido mínimo de $50,00'), vista);
  // tras 5 días sin contar aparece el aviso, y lleva a la pestaña Conteo
  assert.ok(await p2.locator('#avisoConteo').isHidden());
  await p2.evaluate(() => { window.__hoy = '2026-11-21'; pintar(); });
  assert.ok((await texto(p2, '#avisoConteo')).includes('hace 5 días'));
  await p2.click('#avisoConteo button');
  assert.ok(await p2.locator('#avisoConteo').isHidden());
  assert.ok(await p2.locator('[data-acc="guardarConteo"]').isVisible());
  // falta escribir "Hay" cuando solo se anotó lo que llegó
  await p2.click('[data-acc="verLlego"] >> nth=1'); await p2.fill('[data-llego] >> nth=1', '10'); await p2.fill('[data-hay] >> nth=0', '3');
  await p2.click('[data-acc="guardarConteo"]');
  assert.ok((await texto(p2, '#toast')).includes('Escribe cuántas hay de Arroz'));
  assert.strictEqual(await p2.evaluate(() => S.productos[0].conteos.length), 2, 'no se guarda a medias');
  // un precio viejo se corrige solo al volver a abrir
  await p2.evaluate(() => { window.__hoy = '2026-11-16'; S.productos[0].costo = 9; guardar(); });
  await p2.reload();
  await p2.waitForFunction(() => S.productos[0].costo === 1.1);
  assert.ok(await p2.locator('#capa').isHidden(), 'quien ya tiene datos no ve la bienvenida');
  // un enlace inválido no rompe nada
  await p2.goto(BASE + '?d=no-existe'); await p2.waitForTimeout(300);
  assert.ok(await p2.locator('#catalogoAviso').isHidden());

  // 11. Datos guardados por la versión anterior se conservan; datos dañados no rompen la app
  const viejo = JSON.stringify({ ejemplo: false, bodega: 'Bodega Vieja', tasa: 36.5, cobertura: 7, telefonos: { 'La Central': '584120000000' }, registro: { inicio: '2026-10-01', pedidos: 3 },
    productos: [{ id: 'a1', nombre: 'Harina', proveedor: 'La Central', costo: 1.1, entrega: 2, empaque: 20, porRecibir: 20, pendiente: { fecha: '2026-11-10', cantidad: 40 },
      conteos: [{ fecha: '2026-11-01', stock: 40, recibido: 0 }, { fecha: '2026-11-08', stock: 12, recibido: 20 }] }] });
  const p3 = await nuevo('2026-11-12', `if(!localStorage.getItem('reponer.v1')) localStorage.setItem('reponer.v1', ${JSON.stringify(viejo)});`);
  await p3.goto(BASE);
  assert.ok(await p3.locator('#capa').isHidden());
  const cons = await p3.evaluate(() => JSON.parse(localStorage.getItem('reponer.v1')));
  assert.deepStrictEqual(await p3.evaluate(() => [S.bodega, S.tasa, S.registro.pedidos, S.telefonos['La Central'], S.productos[0].conteos.length, S.productos[0].porRecibir, S.productos[0].pendiente.cantidad, S.productos[0].id]),
    ['Bodega Vieja', 36.5, 3, '584120000000', 2, 20, 40, 'a1']);
  assert.strictEqual(cons.bodega, 'Bodega Vieja', 'abrir la app no toca lo guardado');
  assert.ok((await texto(p3, '#vista')).includes('EN CAMINO'));
  // con el teléfono en modo oscuro, la app sigue abriendo en claro hasta que se elija otra cosa
  const ctxO = await b.newContext({ viewport: { width: 400, height: 800 }, colorScheme: 'dark' });
  const p5 = await ctxO.newPage(); vigilar(p5); await p5.goto(BASE);
  assert.strictEqual(await p5.evaluate(() => getComputedStyle(document.body).backgroundColor), 'rgb(244, 246, 245)');
  await p5.click('[data-acc="bienSaltar"]'); await p5.click('[data-tab="ajustes"]'); await p5.click('[data-tema="auto"]');
  assert.strictEqual(await p5.evaluate(() => getComputedStyle(document.body).backgroundColor), 'rgb(11, 19, 17)');
  await p5.reload();
  assert.strictEqual(await p5.evaluate(() => getComputedStyle(document.body).backgroundColor), 'rgb(11, 19, 17)', 'la elección se recuerda');
  const p4 = await nuevo('2026-11-12', `localStorage.setItem('reponer.v1', '{dañado');`);
  await p4.goto(BASE);
  assert.ok(await p4.evaluate(() => S.ejemplo === true));

  // 12. Herramienta para armar catálogos
  await p2.goto(BASE + 'catalogo.html');
  await p2.fill('#nombre', 'Distribuidora Ñandú');
  assert.strictEqual(await p2.inputValue('#slug'), 'distribuidora-nandu');
  await p2.fill('#lineas', 'Arroz 1 kg; 1,25; 24\nSal 1 kg\t0.45\t25\nmala; x; 1');
  await p2.click('#generar');
  assert.ok((await texto(p2, '#error')).includes('Línea 3'));
  await p2.fill('#lineas', 'Arroz 1 kg; 1,25; 24\nSal 1 kg\t0.45\t25');
  await p2.click('#generar');
  const cat = JSON.parse(await p2.inputValue('#salida'));
  assert.deepStrictEqual(cat.productos, [{ n: 'Arroz 1 kg', c: 1.25, e: 24 }, { n: 'Sal 1 kg', c: 0.45, e: 25 }]);
  assert.ok((await texto(p2, '#enlace')).endsWith('/?d=distribuidora-nandu'));

  // 13. Páginas informativas: sin WhatsApp configurado no hay botón de contacto roto
  for (const ruta of ['negocios/', 'distribuidores/']) {
    await p2.goto(BASE + ruta);
    assert.strictEqual(await p2.locator('a[data-wa]:visible').count(), 0, ruta);
    assert.ok(await p2.locator('[data-sin-contacto]').first().isVisible(), ruta);
    assert.ok(await p2.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'desborde ' + ruta);
    await p2.evaluate(() => { window.REPONER_CONTACTO = { whatsapp: '58 412-1234567' }; });
    await p2.addScriptTag({ url: BASE + 'sitio.js' });
    assert.ok((await p2.locator('a[data-wa]').first().getAttribute('href')).startsWith('https://wa.me/584121234567?text=Hola'));
  }
  for (const f of fs.readdirSync(path.join(RAIZ, 'catalogos'))) {
    const c = JSON.parse(fs.readFileSync(path.join(RAIZ, 'catalogos', f), 'utf8'));
    assert.ok(/^[a-z0-9-]{1,40}\.json$/.test(f) && c.nombre && c.productos.every(x => x.n && x.c >= 0 && x.e >= 1), f);
  }

  assert.deepStrictEqual(errores, []);
  await b.close(); servidor.close();
  console.log('OK: todas las pruebas pasaron');
})().catch(e => { console.error('FALLO:', e.message); process.exit(1); });
