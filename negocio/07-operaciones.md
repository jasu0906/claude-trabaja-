# 7. Operaciones

Cómo funciona el negocio en el día a día, desde que aparece un cliente hasta que recibe lo que pagó.

## Recorrido de un negocio (Reponer Instalado)

| Paso | Qué pasa | Quién | Tiempo | Herramienta |
|---|---|---|---|---|
| 1. Contacto | Lo visitas, o te escribe por la página o por recomendación | Tú | 15 min | Guion de ventas |
| 2. Registro | Anotas el negocio con etapa `Contactado` o `Entrevistado` | Tú | 2 min | Hoja Clientes |
| 3. Cita | Acuerdan día y hora; envías `/cita` | Tú | 2 min | WhatsApp |
| 4. Recordatorio | Un día antes envías `/recordatorio` | Tú | 1 min | WhatsApp |
| 5. Instalación | Cargas hasta 60 productos, primer conteo, respaldo | Tú y el dueño | 2 h | `docs/guia-instalacion.md` |
| 6. Cobro | Cobras $35 y envías el recibo | Tú | 5 min | Pago móvil, Zelle o efectivo |
| 7. Etapa `Instalado` | Cambias la etapa; se crean tus 3 recordatorios | Automático | 0 | Apps Script |
| 8. Día 2 | Envías `/seguimiento` y resuelves dudas | Tú | 10 min | WhatsApp |
| 9. Segundo conteo | Lo recuerdas con `/conteo`; la app ya sugiere pedidos | Tú y el dueño | 5 min | WhatsApp |
| 10. Día 7 | Pides el informe con `/informe`. Si hizo 4 conteos, etapa `Usa sin ayuda` | Tú | 5 min | WhatsApp |
| 11. Día 25 | Ofreces el Acompañamiento con `/acompanamiento` | Tú | 5 min | WhatsApp |
| 12. Día 30 | Termina la ayuda incluida. Pides una recomendación con `/referido` | Tú | 2 min | WhatsApp |

Tiempo total por cliente: unas 3 horas y media repartidas en un mes.

## Recorrido de una distribuidora

| Paso | Qué pasa | Tiempo |
|---|---|---|
| 1. Reunión de 20 minutos con las diapositivas | Acepta la prueba de 60 días | 1 h con traslado |
| 2. Te envía su lista de precios, días de entrega y pedido mínimo | | |
| 3. Armas su catálogo con `catalogo.html` y lo publicas | | 1 h |
| 4. Le envías su enlace y su volante con QR | Lo comparte con sus clientes | 15 min |
| 5. Instalas en hasta 5 de sus bodegas el primer mes | | 2 h cada una |
| 6. Cada lunes le pides precios nuevos con `/precios-nuevos` y los publicas | | 15 min por semana |
| 7. Una vez al mes, conversación de 20 minutos | Qué sirve y qué no | 30 min |
| 8. Día 60: empieza a pagar, o se retira sin costo | | |

## Una semana normal

Basada en tu horario de clases. Total: 16 horas.

| Día | Clases | Bloque de Reponer | Qué haces |
|---|---|---|---|
| Lunes | 9–11, 12–2, 3–6 | Ninguno | Solo respondes WhatsApp en los descansos |
| Martes | 8–12 | 2:00–4:30 pm (2,5 h) | Visitas y entrevistas |
| Miércoles | 8–2 | 3:30–5:30 pm (2 h) | Seguimientos y segundas visitas |
| Jueves | 9–1 | 2:00–4:30 pm (2,5 h) | Visitas o instalación corta |
| Viernes | 7–11 | 1:00–5:00 pm (4 h) | Instalaciones |
| Sábado | | 9:00 am–1:00 pm (4 h) | Instalaciones y distribuidoras |
| Domingo | | 1 hora, cuando quieras | Revisión semanal y publicaciones |

Las noches quedan para estudiar. Si un día tienes partido o parcial, ese bloque se cancela y no se repone: la universidad va primero.

## Revisión del domingo (1 hora)

1. **Números (15 min).** Abre el Tablero: cuántos visitados, instalados, usando sin ayuda y cuánto cobraste. Compara con la meta de la semana en el plan de 90 días.
2. **Clientes (15 min).** Revisa la columna "Fecha del próximo paso" y agenda lo de la semana.
3. **Publicaciones (20 min).** Arma las 3 imágenes en Canva y prográmalas.
4. **Una mejora (10 min).** Escribe lo que más confundió a los clientes esta semana. Eso es lo que hay que cambiar en la app o en el guion.

## Estándares de servicio

| Compromiso | Estándar |
|---|---|
| Responder un mensaje | El mismo día; en horas de clase, después de las 2:00 pm |
| Llegar a una cita | Puntual. Si no puedes, avisa con 3 horas de anticipación |
| Resolver una falla de la app | Responder en 24 horas con una solución o una fecha |
| Publicar precios nuevos de una distribuidora | El mismo día que los envía |
| Devolver el dinero por la garantía | En 48 horas, sin discutir |

## Cuando la app falla

1. Pide una captura y qué estaba haciendo (`/error`).
2. Intenta repetir el problema en tu teléfono.
3. Si es un error de la app, abre una sesión con Claude, pega la captura y descríbelo. Cada arreglo pasa por las pruebas automáticas antes de publicarse.
4. Avísale al cliente cuando esté resuelto.

## Tus propios respaldos

- La hoja de clientes vive en Google Drive: ya tiene respaldo.
- El día 15 de cada mes descarga una copia en Excel y guárdala en otro lugar.
- El código está en GitHub: también tiene respaldo.
- Lo único sin respaldo automático son los datos de cada bodega. Recuérdaselo en cada visita.

## Registro de dinero

Anota cada cobro en la columna "Monto cobrado" de la hoja Clientes el mismo día. Anota cada gasto en una hoja aparte con fecha, concepto y monto. Sin eso no sabrás si ganaste o perdiste, y lo vas a necesitar cuando formalices el negocio.

## Calidad: cómo saber que una instalación quedó bien

Antes de irte, comprueba estas 6 cosas:

- [ ] La app abre desde el ícono de la pantalla de inicio.
- [ ] Abre con el modo avión puesto.
- [ ] Hay al menos 10 productos con proveedor, costo y días de entrega.
- [ ] El dueño hizo un conteo sin que tú tocaras el teléfono.
- [ ] El respaldo está pegado en un chat de su WhatsApp.
- [ ] Tiene tu número guardado como "Reponer" y sabe qué día vuelve a contar.
