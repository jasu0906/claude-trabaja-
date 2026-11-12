// Prueba de extremo a extremo: node tests/prueba.js
const { chromium } = require('playwright');
const path = require('path');
const assert = require('assert');
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 400, height: 800 } });
  const errores = [];
  pg.on('pageerror', e => errores.push(e.message));
  await pg.addInitScript(() => { window.__hoy = '2026-11-12'; });
  await pg.goto('file://' + path.resolve(__dirname, '../index.html'));

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

  // 6. Sin desbordes horizontales
  assert.ok(await pg.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'desborde');
  assert.deepStrictEqual(errores, []);
  await b.close();
  console.log('OK: todas las pruebas pasaron');
})().catch(e => { console.error('FALLO:', e.message); process.exit(1); });
