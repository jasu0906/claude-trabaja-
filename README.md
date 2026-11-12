# Reponer

Herramienta gratuita para bodegas y abastos de Venezuela. Le dice al dueño **qué pedir hoy, cuánto y a qué proveedor**, y arma el pedido listo para enviar por WhatsApp.

Funciona en cualquier teléfono, sin internet y sin crear cuenta. Los datos se quedan en el teléfono del negocio.

- App: `https://jasu0906.github.io/claude-trabaja-/`
- Para negocios: `https://jasu0906.github.io/claude-trabaja-/negocios/`
- Para distribuidores: `https://jasu0906.github.io/claude-trabaja-/distribuidores/`
- Demostración de un catálogo: `https://jasu0906.github.io/claude-trabaja-/?d=ejemplo`

## Por dónde empezar

| Si quieres… | Abre |
|---|---|
| Saber qué se hizo y qué te toca hoy | [`RESUMEN-MANANA.md`](RESUMEN-MANANA.md) |
| Entender el negocio desde cero | [`guia/como-funciona-mi-negocio.md`](guia/como-funciona-mi-negocio.md) |
| Ver el plan de negocio completo | [`negocio/README.md`](negocio/README.md) |
| Salir a visitar negocios | [`docs/semana-1.md`](docs/semana-1.md) |

## El problema

El canal tradicional (abastos, bodegas, panaderías, farmacias) concentra cerca del 66 % del consumo en Venezuela, con unos 63.000 puntos de venta activos. La mayoría decide sus compras de memoria. El resultado son dos pérdidas diarias: productos agotados y dinero atrapado en mercancía que no rota.

Ya existen apps de punto de venta (LoTuyo, Kyte, Loyverse). Exigen registrar cada venta, y un bodeguero que atiende solo no lo hace. Reponer pide mucho menos.

## Cómo funciona

1. El dueño agrega los productos que más vende, con su proveedor y cuántos días tarda en llegar. También puede cargarlos de una vez con el enlace del catálogo de su distribuidora.
2. Cada pocos días cuenta lo que hay en el estante y anota si llegó mercancía. Toma unos 2 minutos.
3. Reponer calcula cuánto se vende por día y avisa qué se está acabando.
4. La pestaña Pedido agrupa por proveedor, suma el costo en dólares y bolívares, avisa si falta para el pedido mínimo y abre WhatsApp con el pedido escrito.
5. Al tocar "Ya lo pedí", el producto pasa a "En camino" y deja de sugerirse. Si se atrasa, la app lo avisa. Al tocar "Llegó", la mercancía se suma al inventario.

**El cálculo.** Ventas por día = (lo que había + lo que llegó − lo que hay) ÷ días entre conteos. Se pide cuando lo que queda no cubre los días de entrega más 2 días de seguridad. La cantidad sugerida cubre los días de entrega más 7 días de venta (configurable), redondeada al empaque del proveedor.

## Cómo gana dinero

La app es gratis. Los ingresos vienen de Reponer Instalado ($35, pago único), el Acompañamiento ($10 al mes) y el Plan Distribuidor ($39 al mes). El detalle y las proyecciones están en [`negocio/`](negocio/README.md).

## Archivos

| Archivo o carpeta | Para qué sirve |
|---|---|
| `reponer/app.html` | La aplicación completa. Es el único archivo de la app que se edita |
| `build.sh` | Genera `index.html` a partir de `reponer/app.html` |
| `index.html`, `sw.js`, `manifest.webmanifest`, iconos | Versión instalable que abre sin internet |
| `catalogos/` | Un archivo por distribuidora, con sus productos y precios |
| `catalogo.html` | Herramienta para convertir una lista de precios en un catálogo |
| `negocios/`, `distribuidores/` | Páginas de venta |
| `contacto.js` | Tu nombre y WhatsApp para las páginas de venta |
| `sitio.css`, `sitio.js` | Estilos y botones de contacto de las páginas de venta |
| `tests/prueba.js` | Prueba automática de la app y las páginas: `npm test` |
| `.github/workflows/pruebas.yml` | Corre las pruebas en GitHub en cada cambio |
| `negocio/` | Plan de negocio, textos y hojas de cálculo listos para usar |
| `guia/` | Guía para principiantes |
| `docs/` | Guías de campo, volante con QR, hoja del piloto, privacidad |
| `herramientas/generar_hojas.py` | Genera las hojas de cálculo de `negocio/hojas/` |
| `plan-negocio.md` | El primer plan (servicio freelance), como alternativa |

## Para cambiar algo

- **La app:** edita `reponer/app.html`, corre `./build.sh` y luego `npm test`.
- **Un precio o un texto de venta:** edita `negocios/index.html` o `distribuidores/index.html`.
- **Tu contacto:** edita `contacto.js`.
- **El catálogo de una distribuidora:** usa `catalogo.html` y guarda el resultado en `catalogos/`.

Todo lo que llega a la rama `main` se publica solo en uno o dos minutos.

## El repositorio es público

No subas aquí datos de clientes: nombres, teléfonos ni la hoja de seguimiento llena. Trabaja esos archivos en Google Drive.

## Lo que todavía no está probado

- **Ningún bodeguero la ha usado.** Las pruebas automáticas confirman que calcula bien; no confirman que alguien la quiera usar.
- No se sabe si contarán cada pocos días. Sin conteos no hay cálculo.
- No se sabe si un negocio paga $35 por la instalación ni si una distribuidora paga $39 al mes.
- Los datos viven en un solo teléfono. Si se borra el navegador sin respaldo, se pierden.

## Fuentes

- [Valora Analitik: el canal tradicional concentra el 66 % del consumo](https://www.valoraanalitik.com/consumo-venezuela-crecimiento-2026/)
- [Yahoo Noticias / Inside Venezuela: puntos de venta del canal tradicional](https://es-us.noticias.yahoo.com/inside-venezuela-cambiado-consumo-venezuela-160221040.html)
- [El Diario: cortes de luz y su efecto en bodegas](https://eldiario.com/2026/08/16/cortes-luz-venezuela/)
- [ComparaSoftware: LoTuyo App](https://www.comparasoftware.com/lotuyo-app)
- [Kyte](https://apps.apple.com/MX/app/id1345983058) y [Loyverse](https://loyverse.com/advanced-inventory)
