# Resumen para leer en la mañana

Jueves 12 de noviembre de 2026.

## La conclusión, primero

Desarrollé Reponer como negocio completo y lo dejé listo para empezar hoy. La parte incómoda: **con este negocio no vas a ganar $2.000 al mes pronto.** El cálculo realista da $166 de ganancia en el sexto mes, unos $2,40 por hora. Llegar a $2.000 tomaría 18 a 24 meses y depende de que las distribuidoras paguen, cosa que nadie ha comprobado. Lo máximo que arriesgas en dinero son unos $150; lo que arriesgas de verdad es tu tiempo.

Elegiste "impacto primero", y eso es lo que este plan persigue. Si tu prioridad vuelve a ser ganar dinero pronto, el plan freelance de `plan-negocio.md` paga mejor por hora. Dímelo y lo desarrollo con el mismo detalle.

## 1. Qué hice

**En la app**

- Catálogos de distribuidoras: una bodega abre un enlace y recibe los productos, precios, empaques, días de entrega y pedido mínimo de su proveedor. Los precios se actualizan solos.
- Aviso de pedido mínimo: le dice a la bodega cuánto le falta.
- Aviso de conteo: si pasan 5 días sin contar, la app lo recuerda. Ataca el mayor riesgo del plan.
- Todo con pruebas automáticas, que pasan.

**Páginas y herramientas**

- Dos páginas de venta: `negocios/` (Reponer Instalado) y `distribuidores/` (Plan Distribuidor).
- `catalogo.html`: convierte una lista de precios en un catálogo.
- Volante con código QR para distribuidoras; hay uno de muestra en `docs/volantes/ejemplo.pdf`.

**Plan de negocio (carpeta `negocio/`)**

- Los 11 documentos que pediste, del modelo de negocio a los riesgos.
- `hojas/finanzas.xlsx`: tres escenarios a 6 meses, con fórmulas.
- `hojas/clientes-y-ventas.xlsx`: registro de clientes con el embudo calculado.
- Listo para usar: 30 publicaciones con fecha, 3 anuncios, guion de ventas, 2 mensajes automáticos y 19 respuestas rápidas de WhatsApp, condiciones de servicio y un script de recordatorios.

**Guía para ti**

- `guia/como-funciona-mi-negocio.md`: resumen de una página, siete áreas explicadas con ejemplos, glosario de 57 términos y recursos gratuitos.

**Presentaciones**

- Actualicé las dos (la general y la de distribuidores) para que coincidan con los precios nuevos.

## 2. Decisiones que tomé por ti

La lista completa, con el porqué de cada una, está en `negocio/README.md`. Las que más importan:

1. **El negocio es Reponer**, no el servicio freelance.
2. **Precios:** $35 la instalación, $10 al mes el Acompañamiento, $39 al mes el Plan Distribuidor ($19 para las 3 primeras, tras 60 días gratis). No hay datos de cuánto pagaría un negocio: son precios para probar.
3. **Garantía de devolución de 30 días** en la instalación.
4. **Planifiqué con 16 horas a la semana, no con 20 a 30.** Con 25 horas de clase, es lo que cabe sin tocar tus noches de estudio.
5. **Supuse** que estás en Caracas, que eres mayor de edad, y que tus exámenes son del 7 al 18 de diciembre. Corrige lo que no sea cierto.
6. **No gasté nada:** todo usa planes gratuitos.
7. **No uní los cambios a la versión publicada.** Te toca a ti aprobarlos (tarea 1).
8. **No inventé testimonios.** Cinco publicaciones esperan tus datos reales.

## 3. Lo que solo tú puedes hacer

| Qué | Dónde | Tiempo |
|---|---|---|
| Unir el pull request para publicar todo | GitHub | 2 min |
| Escribir tu nombre y WhatsApp | Archivo `contacto.js` | 5 min |
| Instalar y configurar WhatsApp Business | `negocio/06-automatizacion.md`, sección B | 40 min |
| Subir las hojas a Google Drive y activar el script | Secciones C y D | 35 min |
| Crear la cuenta de Instagram y programar publicaciones | Sección F | 30 min |
| Visitar negocios | La calle | Lo que no se puede delegar |
| Tramitar RIF y registro de emprendedor | `negocio/08-legal-y-pagos.md` | Semanas 7 y 8 |
| Consultar a un contador sobre el IGTF y la facturación | | 1 hora, antes de cobrar mensualidades |
| Cobrar | | |

**Dos advertencias**

- **El repositorio es público.** No subas a GitHub nombres ni teléfonos de clientes. Trabaja esas hojas en Google Drive.
- **Si tienes menos de 18 años,** lee la sección de RIF en el documento 8 antes de cobrar.

## 4. Tus 3 primeras tareas de hoy

Tu día: clases de 9:00 a 1:00, libre de 1:00 a 4:00, llegada al partido a las 4:30.

| Hora | Tarea | Tiempo |
|---|---|---|
| 1:00–1:30 | Almuerzo | |
| 1:30–1:45 | **1. Unir el pull request y llenar `contacto.js`.** En GitHub abre "Pull requests", entra al que está abierto y toca "Merge pull request". Después edita `contacto.js` con tu nombre y tu número | 15 min |
| 1:45–2:05 | **2. Imprimir** 5 copias de `docs/volante.pdf` y 3 de `docs/guia-entrevista.md` | 20 min |
| 2:05–4:00 | **3. Entrevistar 3 negocios** con la guía y anotar cada uno al salir. No muestres la app todavía | 1 h 55 min |
| 4:30 | Partido en la Unimet | |
| Noche | Leer la primera página de la guía para principiantes | 20 min |

Si la impresión se complica, sáltala y usa la guía en el teléfono. La tarea 3 es la que no se puede saltar: es la que dice si todo lo demás vale la pena.

## Lo que no pude comprobar

- El script de recordatorios: revisé su sintaxis, pero no pude ejecutarlo en Google. Pruébalo con una fila de ejemplo.
- Los nombres exactos de los menús de WhatsApp Business y Meta Business Suite.
- El calendario académico de la Unimet.
- Los datos de competidores vienen de resultados de búsqueda; varios sitios no abrieron desde mi entorno.
- Nada de lo legal lo revisó un abogado ni un contador.
- No pude ver videos de YouTube, así que recomiendo cursos confirmados y búsquedas, no videos sueltos.
