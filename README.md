# REPIQ

**Sé qué reponer, cuánto y a quién, con la plata que tengo hoy.**

App gratuita para bodegas y abastos de Venezuela. Lleva el fiado de los vecinos, le dice al dueño **qué pedir, cuánto y a qué proveedor** según la plata que tiene ese día, y deja el pedido listo para enviar por WhatsApp. Antes se llamaba Reponer.

Funciona en cualquier teléfono, sin internet y sin crear cuenta. Los datos se quedan en el teléfono del negocio.

- App: https://jasu0906.github.io/claude-trabaja-/
- Para negocios: https://jasu0906.github.io/claude-trabaja-/negocios/
- Para distribuidores: https://jasu0906.github.io/claude-trabaja-/distribuidores/

## Cómo funciona

0. El dueño anota el fiado en segundos y cobra por WhatsApp con un toque.
1. El dueño agrega los productos que más vende, con su proveedor y cuántos días tarda en llegar.
2. Dos veces por semana cuenta lo que hay en el estante. Toma unos 2 minutos.
3. Reponer calcula cuánto se vende por día y avisa qué se está acabando.
4. Si escribe cuánta plata tiene hoy, REPIQ reparte ese dinero: primero lo agotado y lo que se acaba antes.
5. La pantalla Pedido agrupa por proveedor y abre WhatsApp con el pedido escrito.

No registra ventas, no cobra y no factura: solo hace el pedido.

## Derechos

© 2026 REPIQ. **Todos los derechos reservados.** Este repositorio es público solo para poder publicar la aplicación. No se permite copiar, modificar ni reutilizar su código, sus textos, su nombre ni su logotipo sin permiso por escrito. Ver [`LICENSE`](LICENSE).

## Privacidad

La app no tiene servidor ni cuentas y no envía datos a ningún lado. Detalle en [`docs/privacidad.md`](docs/privacidad.md).

## Archivos

| Archivo o carpeta | Para qué sirve |
|---|---|
| `reponer/app.html` | La aplicación. Es el único archivo de la app que se edita |
| `build.sh` | Genera `index.html` a partir de `reponer/app.html` |
| `index.html`, `sw.js`, `manifest.webmanifest`, iconos | Versión instalable que abre sin internet |
| `catalogos/`, `catalogo.html` | Catálogos de distribuidoras y la herramienta para armarlos |
| `negocios/`, `distribuidores/`, `sitio.css`, `sitio.js`, `contacto.js` | Páginas informativas y sus datos de contacto |
| `docs/` | Privacidad, volantes y piezas para compartir |
| `herramientas/` | Programas que generan el código QR, los volantes y las piezas |
| `tests/prueba.js` | Prueba automática: `npm test` |

## Para cambiar algo

- **La app:** edita `reponer/app.html`, corre `./build.sh` y luego `npm test`.
- **Tu contacto:** edita `contacto.js`.

Lo que llega a la rama `main` se publica solo en uno o dos minutos.

**Este repositorio es público.** No subas aquí datos de clientes ni documentos internos del negocio.
