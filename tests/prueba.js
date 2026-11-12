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
  const pg = await b.newPage({ viewport: { width: 400, height: 800 } });
  const errores = [];
  pg.on('pageerror', e => errores.push(e.message));
  await pg.addInitScript(() => { window.__hoy = '2026-11-12'; });
  await pg.goto(BASE);

  // 1. Cálculo puro
  const r = await pg.evaluate(() => {
    const cfg = { cobertura: 7 };
    const p = { entrega: 2, empaque: 20, conteos: [
      { fecha: '2026-10-29', stock: 40, recibido: 0 }, { fecha: '2026-11-05', stock: 22, recibido: 20 }, { fecha: '2026-11-10', stock: 6, recibido: 20 }] };
    return { a: analizar(p, cfg, '2026-11-12'), uno: analizar({ conteos: [{ fecha: '2026-11-10', stock: 5 }] }, cfg, '2026-11-12'),
      quieto: analizar({ entrega: 2, conteos: [{ fecha: '2026-11-01', stock: 9 }, { fecha: '2026-11-10', stock: 9 }] }, cfg, '2026-11-12') };
  });
  // consumo: (40+20-22) + (22+20-6) = 74 en 12 días = 6,17/día; stock hoy = 6 - 2*6,17 -> 0
  assert.ok(Math.abs(r.a.ritmo - 74 / 12) < 1e-9, 'ritmo');
  assert.strictEqual(r.a.estado, 'agotado');
  assert.strictEqual(r.a.sugerido, 60, 'sugerido: 6,17*(2+7)=55,5 -> 60 por empaque de 20');
  assert.strictEqual(r.uno.estado, 'sin');
  assert.strictEqual(r.quieto.estado, 'bien');

  // 2. La bodega de ejemplo muestra pedidos
  assert.ok(await pg.locator('#avisoEjemplo').isVisible());
  assert.ok(await pg.locator('.grupo').count() >= 2);
  const enlace = await pg.locator('a.b').first().getAttribute('href');
  assert.ok(enlace.startsWith('https://wa.me/?text=Hola'), enlace);
  await pg.screenshot({ path: path.resolve(__dirname, 'captura.png'), fullPage: true });

  // 3. Empezar de cero, agregar producto, contar dos veces
  await pg.click('[data-acc="empezar"]');
  await pg.fill('#pNombre', 'Harina <b>PAN</b>');
  await pg.fill('#pProv', 'La Central');
  await pg.fill('#pCosto', '1,10');
  await pg.fill('#pEntrega', '2');
  await pg.fill('#pEmp', '10');
  await pg.fill('#pStock', '30');
  await pg.click('#fProd button[type=submit]');
  assert.strictEqual(await pg.locator('#vista .grupo .fila').count(), 1);
  assert.strictEqual(await pg.locator('#vista .grupo b b').count(), 0, 'el nombre se escapa');

  await pg.evaluate(() => { window.__hoy = '2026-11-17'; });
  await pg.click('[data-tab="conteo"]');
  await pg.fill('[data-hay]', '5');
  await pg.click('[data-acc="guardarConteo"]');
  // 25 vendidas en 5 días = 5/día; punto de pedido 5*(2+2)=20; pedir 5*(2+7)-5 = 40
  assert.ok((await pg.locator('#vista').innerText()).includes('Pedir hoy'));
  assert.strictEqual((await pg.locator('.cant').first().innerText()).split('\n')[0].trim(), '40');
  assert.ok((await pg.locator('.resumen').innerText()).includes('$44.00'));

  // 4. Ajustes: tasa y teléfono; persiste al recargar
  await pg.click('[data-tab="ajustes"]');
  await pg.fill('#aTasa', '100');
  await pg.fill('[data-tel]', '58 412-1234567');
  await pg.click('[data-acc="guardarAjustes"]');
  await pg.addInitScript(() => { window.__hoy = '2026-11-17'; });
  await pg.reload();
  assert.ok((await pg.locator('.resumen').innerText()).includes('4.400,00'));
  assert.ok((await pg.locator('a.b').first().getAttribute('href')).startsWith('https://wa.me/584121234567?text='));

  // 5. Respaldo y borrado
  await pg.click('[data-tab="ajustes"]');
  const resp = await pg.evaluate(() => JSON.stringify(S));
  await pg.click('[data-acc="borrarTodo"]'); await pg.click('[data-acc="borrarTodo"]');
  assert.strictEqual(await pg.evaluate(() => S.productos.length), 0);
  await pg.click('[data-tab="ajustes"]');
  await pg.fill('#respaldo', resp);
  await pg.click('[data-acc="restaurar"]');
  assert.strictEqual(await pg.evaluate(() => S.productos.length), 1);

  // 6. Pedido en camino: deja de sugerirse, y al llegar se suma al inventario
  await pg.click('[data-tab="pedido"]');
  await pg.click('[data-acc="yaPedi"]');
  assert.ok((await pg.locator('#vista').innerText()).includes('EN CAMINO'));
  assert.strictEqual(await pg.locator('a.b').count(), 0, 'ya no se sugiere');
  assert.ok((await pg.locator('.resumen').innerText()).startsWith('0'));
  await pg.click('[data-acc="llego"]');
  const tras = await pg.evaluate(() => ({ a: analizar(S.productos[0], S, hoyISO()), p: S.productos[0] }));
  assert.strictEqual(tras.p.porRecibir, 40); assert.strictEqual(tras.a.stock, 45); assert.strictEqual(tras.a.estado, 'bien');
  await pg.click('[data-tab="conteo"]');
  assert.strictEqual(await pg.inputValue('[data-llego]'), '40');
  await pg.fill('[data-hay]', '44');
  await pg.click('[data-acc="guardarConteo"]');
  assert.strictEqual(await pg.evaluate(() => S.productos[0].porRecibir), 0);

  // 7. Lista rápida e informe
  await pg.click('[data-tab="productos"]');
  await pg.click('details summary');
  await pg.click('[data-nombre="Arroz 1 kg"]');
  assert.strictEqual(await pg.evaluate(() => S.productos.length), 2);
  assert.strictEqual(await pg.locator('[data-nombre="Arroz 1 kg"]').count(), 0);
  await pg.click('[data-tab="ajustes"]');
  const inf = await pg.inputValue('#informe');
  assert.ok(inf.includes('Productos: 2') && inf.includes('Pedidos marcados como hechos: 1') && inf.includes('Conteos anotados: 2'), inf);

  // 8. Estados atrasados y respaldo antiguo sin registro
  const at = await pg.evaluate(() => analizar({ entrega: 2, pendiente: { fecha: '2026-11-10', cantidad: 5 }, conteos: [] }, { cobertura: 7 }, '2026-11-17'));
  assert.strictEqual(at.estado, 'camino'); assert.strictEqual(at.atraso, 3);
  assert.ok(await pg.evaluate(() => normalizar({ productos: [] }).registro.pedidos === 0));

  // 9. Catálogo de distribuidora: se ofrece, se agrega y reemplaza la bodega de ejemplo
  const ctx2 = await b.newContext({ viewport: { width: 400, height: 800 } });
  const p2 = await ctx2.newPage();
  p2.on('pageerror', e => errores.push(e.message));
  await p2.addInitScript(() => { window.__hoy = '2026-11-12'; });
  await p2.goto(BASE + '?d=ejemplo');
  await p2.waitForSelector('#catalogoAviso:not([hidden])');
  assert.ok((await p2.locator('#catalogoAviso').innerText()).includes('Distribuidora de Ejemplo'));
  await p2.click('[data-acc="catSi"]');
  let st = await p2.evaluate(() => ({ n: S.productos.length, ej: S.ejemplo, min: S.minimos['Distribuidora de Ejemplo'], cat: Object.keys(S.catalogos), url: location.search, prov: S.productos[0].proveedor, emp: S.productos[0].empaque }));
  assert.deepStrictEqual(st, { n: 6, ej: false, min: 50, cat: ['ejemplo'], url: '', prov: 'Distribuidora de Ejemplo', emp: 20 });
  // dos conteos -> pedido por debajo del mínimo muestra el aviso
  await p2.fill('[data-hay]', '20'); await p2.click('[data-acc="guardarConteo"]');
  await p2.evaluate(() => { window.__hoy = '2026-11-16'; });
  await p2.click('[data-tab="conteo"]'); await p2.fill('[data-hay]', '4'); await p2.click('[data-acc="guardarConteo"]');
  // 16 vendidas en 4 días = 4/día; pedir 4*(2+7)-4 = 32 -> 40 por empaque de 20; 40 x 1,10 = $44 < mínimo de $50
  const vista = await p2.locator('#vista').innerText();
  assert.ok(vista.includes('Faltan $6.00 para el mínimo de $50.00'), vista);
  // tras 5 días sin contar aparece el aviso, y lleva a la pestaña Conteo
  assert.strictEqual(await p2.locator('#avisoConteo').isHidden(), true);
  await p2.evaluate(() => { window.__hoy = '2026-11-21'; pintar(); });
  assert.ok((await p2.locator('#avisoConteo').innerText()).includes('hace 5 días'));
  await p2.click('#avisoConteo button');
  assert.strictEqual(await p2.locator('#avisoConteo').isHidden(), true);
  assert.ok(await p2.locator('[data-acc="guardarConteo"]').isVisible());
  await p2.evaluate(() => { window.__hoy = '2026-11-16'; });
  // un precio viejo se corrige solo al volver a abrir
  await p2.evaluate(() => { S.productos[0].costo = 9; guardar(); });
  await p2.addInitScript(() => { window.__hoy = '2026-11-16'; });
  await p2.reload();
  await p2.waitForFunction(() => S.productos[0].costo === 1.1);
  // un enlace inválido no rompe nada
  await p2.goto(BASE + '?d=no-existe'); await p2.waitForTimeout(300);
  assert.strictEqual(await p2.locator('#catalogoAviso').isHidden(), true);

  // 10. Herramienta para armar catálogos
  await p2.goto(BASE + 'catalogo.html');
  await p2.fill('#nombre', 'Distribuidora Ñandú');
  assert.strictEqual(await p2.inputValue('#slug'), 'distribuidora-nandu');
  await p2.fill('#lineas', 'Arroz 1 kg; 1,25; 24\nSal 1 kg\t0.45\t25\nmala; x; 1');
  await p2.click('#generar');
  assert.ok((await p2.locator('#error').innerText()).includes('Línea 3'));
  await p2.fill('#lineas', 'Arroz 1 kg; 1,25; 24\nSal 1 kg\t0.45\t25');
  await p2.click('#generar');
  const cat = JSON.parse(await p2.inputValue('#salida'));
  assert.deepStrictEqual(cat.productos, [{ n: 'Arroz 1 kg', c: 1.25, e: 24 }, { n: 'Sal 1 kg', c: 0.45, e: 25 }]);
  assert.ok((await p2.locator('#enlace').innerText()).endsWith('/?d=distribuidora-nandu'));

  // 11. Páginas informativas: sin WhatsApp configurado no hay botón de contacto roto
  for (const ruta of ['negocios/', 'distribuidores/']) {
    await p2.goto(BASE + ruta);
    assert.strictEqual(await p2.locator('a[data-wa]:visible').count(), 0, ruta);
    assert.ok(await p2.locator('[data-sin-contacto]').first().isVisible(), ruta);
    assert.ok(await p2.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'desborde ' + ruta);
    await p2.evaluate(() => { window.REPONER_CONTACTO = { whatsapp: '58 412-1234567' }; });
    await p2.addScriptTag({ url: BASE + 'sitio.js' });
    assert.ok((await p2.locator('a[data-wa]').first().getAttribute('href')).startsWith('https://wa.me/584121234567?text=Hola'));
  }
  // los catálogos publicados son válidos
  for (const f of fs.readdirSync(path.join(RAIZ, 'catalogos'))) {
    const c = JSON.parse(fs.readFileSync(path.join(RAIZ, 'catalogos', f), 'utf8'));
    assert.ok(/^[a-z0-9-]{1,40}\.json$/.test(f) && c.nombre && c.productos.every(x => x.n && x.c >= 0 && x.e >= 1), f);
  }
  await ctx2.close();

  // 12. Sin desbordes horizontales
  assert.ok(await pg.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'desborde');
  assert.deepStrictEqual(errores, []);
  await b.close(); servidor.close();
  console.log('OK: todas las pruebas pasaron');
})().catch(e => { console.error('FALLO:', e.message); process.exit(1); });
