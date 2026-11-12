# Reponer

Herramienta gratuita para bodegas y abastos de Venezuela. Le dice al dueño **qué pedir hoy, cuánto y a qué proveedor**, y arma el pedido listo para enviar por WhatsApp.

Funciona en cualquier teléfono, sin internet y sin crear cuenta. Los datos se quedan en el teléfono del bodeguero.

## El problema

El canal tradicional (abastos, bodegas, panaderías, farmacias) concentra cerca del 66 % del consumo en Venezuela. La mayoría decide sus compras de memoria o con un cuaderno. El resultado son dos pérdidas diarias: productos agotados (venta perdida, el vecino camina más o paga más) y dinero atrapado en mercancía que no rota. Con cortes de luz de varias horas, comprar de más en perecederos sale todavía más caro.

Ya existen apps de punto de venta (LoTuyo, Kyte, Loyverse). Exigen registrar cada venta, y un bodeguero que atiende solo no lo hace. Reponer pide mucho menos.

## Cómo funciona

1. El dueño agrega los 10 a 20 productos que más vende, con su proveedor y cuántos días tarda en llegar.
2. Cada pocos días cuenta lo que hay en el estante y anota si llegó mercancía. Toma unos 2 minutos.
3. Reponer calcula cuánto se vende por día y avisa qué se está acabando.
4. La pestaña Pedido agrupa por proveedor, suma el costo en dólares y bolívares, y abre WhatsApp con el pedido escrito.

**El cálculo.** Ventas por día = (lo que había + lo que llegó − lo que hay) ÷ días entre conteos. Se pide cuando lo que queda no cubre los días de entrega más 2 días de seguridad. La cantidad sugerida cubre los días de entrega más 7 días de venta (configurable), redondeada al empaque del proveedor.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `reponer/app.html` | La aplicación completa. Es el único archivo que se edita. |
| `build.sh` | Genera `index.html` a partir de `reponer/app.html`. |
| `index.html`, `sw.js`, `manifest.webmanifest`, `icon.svg` | Versión instalable que abre sin internet. |
| `tests/prueba.js` | Prueba automática del cálculo y del flujo completo: `node tests/prueba.js` |
| `plan-negocio.md` | El plan anterior (servicio freelance), por si quieres ingresos mientras tanto. |

## Cómo ponerla en línea gratis

1. Une esta rama a `main` en GitHub.
2. En el repositorio: Settings → Pages → Source: "Deploy from a branch" → rama `main`, carpeta `/ (root)`.
3. En un par de minutos queda en `https://jasu0906.github.io/claude-trabaja-/`. Ese es el enlace que le pasas al bodeguero. La primera vez necesita internet; después abre sin conexión.

## Lo que todavía no está probado

- **Ningún bodeguero la ha usado.** Las pruebas automáticas confirman que calcula bien; no confirman que alguien la quiera usar.
- No sé si contarán cada pocos días. Sin conteos no hay cálculo.
- Los datos viven en un solo teléfono. Si se borra el navegador sin respaldo, se pierden.
- No hay cifra confiable de cuántas bodegas hay en Venezuela, así que no puedo estimar el alcance.

## Plan de 8 semanas (20 a 30 horas por semana)

| Semanas | Qué haces | Meta medible |
|---|---|---|
| 1 | Publicar en GitHub Pages. Visitar 10 bodegas de tu zona y ver cómo deciden qué comprar. No vendas nada: pregunta y observa. | 10 entrevistas anotadas; 3 bodegas dispuestas a probar |
| 2 | Instalar Reponer en 3 bodegas, cargando tú los productos con el dueño. | 3 bodegas con 10+ productos cargados |
| 3–4 | Volver dos veces por semana. Anotar qué no entienden y qué no usan. | 2 de 3 bodegas con 4+ conteos hechos por su cuenta |
| 5–6 | Corregir lo que falló. Ampliar a 10 bodegas. | 10 bodegas activas; al menos 5 pedidos enviados por WhatsApp desde la app |
| 7–8 | Medir: ¿se agotan menos productos que antes? Preguntar a 2 distribuidores si les sirve recibir pedidos ordenados. | Dato de agotados antes y después en 5 bodegas; 2 conversaciones con distribuidores |

**Cuándo parar o cambiar:** si en la semana 4 ninguna de las 3 bodegas cuenta sin que tú estés presente, el diseño no sirve como está. Antes de programar más, pregunta qué harían en su lugar.

## Hacia dónde puede crecer

Una bodega sola tiene poco poder de compra. Cuando 20 bodegas de una misma zona usan Reponer, sus pedidos se pueden juntar en una compra conjunta a un mayorista, con mejor precio y un solo flete. Ese es el impacto grande, y también una posible fuente de ingresos: una comisión pequeña al distribuidor por pedidos consolidados, manteniendo la app gratis para la bodega. Es una hipótesis: depende de que primero las bodegas la usen.

## Fuentes

- [Valora Analitik: el canal tradicional concentra el 66 % del consumo](https://www.valoraanalitik.com/consumo-venezuela-crecimiento-2026/)
- [El Diario: cortes de luz y su efecto en bodegas](https://eldiario.com/2026/08/16/cortes-luz-venezuela/)
- [ComparaSoftware: LoTuyo App](https://www.comparasoftware.com/lotuyo-app)
- [Kyte](https://apps.apple.com/MX/app/id1345983058) y [Loyverse](https://apps.apple.com/MX/app/id1070865387)
- [DPL News: conectividad y apagones](https://dplnews.com/apagones-y-fallas-de-red-diagnostico-telecomunicaciones-en-venezuela-tras-ofensiva-militar-ee-uu/)
