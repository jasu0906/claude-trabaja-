# Cómo funciona mi negocio

Una guía para entender Reponer de principio a fin, escrita para alguien que nunca ha tenido un negocio. No hace falta leerla de una vez: la primera página te da el panorama y cada sección se puede leer sola.

Las palabras en **negrita** son términos de negocios. Se explican la primera vez que aparecen y están todas en el glosario del final.

---

## El negocio en una página

**El problema.** El dueño de una bodega decide de memoria qué comprar. A veces se queda sin harina un jueves y pierde ventas; otras veces compra de más y su dinero queda parado en el estante.

**Lo que ofreces.** Una app llamada Reponer. El dueño cuenta su estante dos veces por semana, y la app le dice qué pedir, cuánto y a quién, y le deja el pedido escrito para enviarlo por WhatsApp.

**Quién paga.** La app es gratis. El dinero viene de dos tipos de cliente:

1. **Negocios con algo más de tamaño** (un abasto con empleados, una licorería) que prefieren pagarte $35 para que vayas, cargues sus productos y les enseñes. Algunos siguen pagando $10 al mes para que los revises.
2. **Distribuidoras**, que son las empresas que les venden a las bodegas. Te pagan $39 al mes para que sus clientes reciban su lista de precios dentro de la app y les pidan a tiempo y por escrito.

**Cómo consigues clientes.** Caminando. Visitas negocios, preguntas cómo compran, muestras la app y la dejas instalada. Quien la usa y le sirve te recomienda o te presenta a su distribuidor.

**Cómo entregas.** Con una visita de 2 horas para la instalación, y con un archivo que publicas en internet para el catálogo de cada distribuidora.

**Cuánto ganas.** Al principio, muy poco: el cálculo realista da $166 de ganancia en el sexto mes. El negocio solo se vuelve interesante si las distribuidoras pagan, porque una distribuidora te deja $39 cada mes por unas 2 horas de trabajo.

**Qué puede salir mal.** Que los bodegueros no cuenten el estante. Si no cuentan, la app no calcula nada y no hay negocio. Por eso las primeras 4 semanas se dedican solo a comprobar eso.

**Tu trabajo, semana a semana.** Unas 16 horas: 10 visitando negocios, 2 en WhatsApp, 2 con distribuidoras, 1,5 en redes y media hora pidiendo recomendaciones.

Si solo recuerdas una cosa: **primero comprueba que la gente usa lo que hiciste; después preocúpate por cobrar.**

---

## 1. Finanzas

### Qué es

Las finanzas son llevar la cuenta del dinero que entra y del que sale, para saber si el negocio te deja algo.

### Por qué importa

Un negocio puede tener muchos clientes y aun así perder plata. Sin números no te enteras hasta que ya es tarde. Y con números puedes decidir cosas como "¿me conviene esto o lo dejo?".

### Los términos básicos

- **Ingreso:** el dinero que te pagan los clientes. Si haces 2 instalaciones de $35, tu ingreso es $70.
- **Costo:** lo que gastas para poder trabajar. Hay dos tipos:
  - **Costo fijo:** lo pagas vendas o no vendas. En tu caso, unos $35 al mes entre transporte, datos e impresiones.
  - **Costo variable:** aparece solo cuando vendes. Cada instalación te cuesta $3 de pasaje.
- **Ganancia:** ingreso menos costos. Es lo que de verdad te queda.
- **Margen:** qué parte de cada venta es ganancia, en porcentaje. De una instalación de $35 te quedan $28,50, así que tu margen es 28,50 ÷ 35 = 81 %.
- **Punto de equilibrio:** cuánto tienes que vender para no perder. Tú necesitas 2 instalaciones al mes para cubrir tus $35 de costos fijos.
- **Ingreso recurrente:** dinero que entra todos los meses sin tener que volver a vender. El Acompañamiento y el Plan Distribuidor son recurrentes; la instalación no.
- **Flujo de caja:** el orden en que entra y sale el dinero. Puedes ganar en el mes y aun así quedarte sin efectivo si te pagan el día 30 y tú gastas el día 5.

### Cómo funciona en tu negocio

Casi no tienes costos, y eso es raro y bueno: para perder dinero tendrías que no vender nada durante meses. Lo que sí gastas es **tiempo**. Por eso el número que más debes mirar es la ganancia por hora.

En el escenario realista ganas $2,40 por hora en el mes 6. Es poco. Sube si consigues ingresos recurrentes, porque una distribuidora te paga cada mes aunque ese mes no la visites.

### Qué haces tú y qué hace la automatización

| Tú | La automatización |
|---|---|
| Anotas cada cobro en la hoja Clientes | La hoja suma cuánto has cobrado y por qué producto |
| Anotas cada gasto | |
| Cambias un supuesto en `finanzas.xlsx` | La hoja recalcula los tres escenarios |

### Ejemplo

En enero haces 4 instalaciones, tienes 2 clientes de Acompañamiento y 1 distribuidora que paga $19.

- Ingresos: 4 × 35 = 140, más 2 × 10 = 20, más 19. Total: $179.
- Costos: 35 fijos más 4 × 3 = 12 de pasajes. Total: $47.
- Ganancia: 179 − 47 = **$132**.
- Trabajaste 69 horas: 132 ÷ 69 = $1,91 por hora.

De esos $179, solo $39 son recurrentes. En febrero empiezas con $39 seguros; lo demás hay que volver a venderlo.

### Para aprender más

- La sección de finanzas personales de Khan Academy explica interés, presupuesto y ahorro. Casi todo está en inglés.
- En YouTube, busca "punto de equilibrio explicado" y "costos fijos y variables". Son temas que cualquier canal de contabilidad básica explica en 10 minutos.

---

## 2. Marketing

### Qué es

El marketing es todo lo que haces para que las personas correctas se enteren de que existes y les interese lo que ofreces. No es solo publicidad.

### Por qué importa

Puedes tener la mejor app del mundo y que nadie la use porque nadie sabe que existe. El marketing decide cuánta gente llega a tu puerta.

### Los términos básicos

- **Cliente ideal:** la descripción del cliente al que más le sirves. El tuyo: un abasto o licorería con 1 a 4 personas, entre 60 y 300 productos, que pide por WhatsApp a 3 o más proveedores.
- **Propuesta de valor:** la frase que explica por qué deberían elegirte. La tuya: "que no te falte lo que más vendes".
- **Canal:** el camino por el que llegas al cliente. Tus canales son la visita en persona, WhatsApp, la recomendación, las distribuidoras y las redes.
- **Cliente potencial:** alguien que mostró interés pero todavía no compra.
- **Embudo:** el recorrido desde que alguien te conoce hasta que paga. Se llama así porque en cada paso se queda gente: de 20 negocios que visitas, 12 te responden, 6 quieren probar, 5 instalan, 3 la usan y 1 paga.
- **Conversión:** el porcentaje que pasa de un paso al siguiente. Si de 12 entrevistados 6 quieren probar, tu conversión en ese paso es 50 %.
- **CAC (costo de adquisición de cliente):** cuánto te cuesta conseguir un cliente que paga. Si gastas $10 en pasajes para visitar 20 negocios y 1 paga, tu CAC es $10.
- **Contenido:** lo que publicas en redes para enseñar algo útil, no para vender directamente.

### Cómo funciona en tu negocio

Tu marketing principal es caminar. Un bodeguero no instala una app por un anuncio; la prueba porque alguien se la enseñó en su mostrador.

Las redes tienen otro papel: credibilidad. Cuando un distribuidor te busque en Instagram después de conocerte, tiene que encontrar una cuenta seria con consejos útiles.

### Qué haces tú y qué hace la automatización

| Tú | La automatización |
|---|---|
| Visitas negocios | |
| Preparas 3 publicaciones el domingo (1 hora) | Meta Business Suite las publica lunes, miércoles y viernes |
| Respondes comentarios | El mensaje de bienvenida de WhatsApp responde al primer contacto |
| Anotas cada negocio en la hoja | La hoja calcula tu embudo y tus conversiones |

### Ejemplo

En noviembre visitas 30 negocios. Tu Tablero muestra: 18 entrevistados, 7 interesados, 5 instalados, 2 usando sin ayuda, 0 pagando.

La conversión de entrevistado a interesado es 7 ÷ 18 = 39 %, por debajo de la meta de 50 %. Eso te dice dónde mirar: algo en la demostración no convence. Si en cambio el problema estuviera entre instalado y usa sin ayuda, mirarías la app, no el guion.

Esa es la utilidad del embudo: te dice en qué paso está el problema.

### Para aprender más

- **HubSpot Academy** tiene un curso gratuito de marketing digital en español, con certificado.
- **Google Actívate** ofrece cursos gratuitos de marketing digital en español.
- En YouTube, busca "embudo de ventas explicado" y "cliente ideal buyer persona".

---

## 3. Ventas

### Qué es

Vender es la conversación en la que una persona decide pagarte. El marketing trae a la persona hasta la conversación; la venta ocurre dentro de ella.

### Por qué importa

Sin ventas no hay negocio. Y vender es una habilidad que se aprende practicando: las primeras 10 conversaciones salen mal y eso es normal.

### Los términos básicos

- **Guion de ventas:** el orden de lo que vas a decir y preguntar. El tuyo está en `negocio/listo-para-usar/guion-de-ventas.md`.
- **Demostración:** mostrar el producto funcionando.
- **Oferta:** qué das, cuánto cuesta y qué garantía tiene.
- **Objeción:** la razón que da el cliente para no comprar. "No tengo tiempo", "es caro", "ya tengo un sistema".
- **Cierre:** el momento en que pides la decisión: "¿le queda bien el viernes a las 2?".
- **Seguimiento:** volver a contactar a quien no decidió. La mayoría de las ventas se cierran en el segundo o tercer contacto.
- **Validación:** comprobar con hechos, y no con opiniones, que la gente quiere lo que ofreces.

### Cómo funciona en tu negocio

La regla más importante: **pregunta antes de mostrar.** Si empiezas hablando de la app, el dueño te escucha por cortesía. Si empiezas preguntando qué se le agotó la semana pasada, él mismo describe el problema, y después tu app es la respuesta a algo que acaba de decir.

Hay una trampa conocida: la gente es amable y dice "qué buena idea" aunque no piense usarla. No te fíes de los elogios; fíate de lo que hacen. Que un bodeguero cuente su estante el jueves sin que estés ahí vale más que diez "me encanta".

A los negocios pequeños les ofreces la app gratis. A los que tienen empleados, o dicen que no tienen tiempo, les ofreces la instalación de $35. A las distribuidoras solo les hablas cuando ya tengas 3 negocios usándola.

### Qué haces tú y qué hace la automatización

| Tú | La automatización |
|---|---|
| Conversas, preguntas y escuchas | |
| Muestras la app en tu teléfono | La bodega de ejemplo ya viene cargada |
| Envías `/cita` y `/recordatorio` | Las respuestas rápidas escriben el mensaje completo |
| Cambias la etapa en la hoja | El script crea tus recordatorios de seguimiento |

### Ejemplo

Entras a un abasto. La dueña dice que el aceite se le acabó el sábado y que "eso pasa a cada rato". Le muestras la bodega de ejemplo, donde justo el aceite sale como "Pedir hoy". Dice: "Sí, pero yo no tengo tiempo de meter todo eso".

Esa es una objeción, y te está pidiendo la instalación sin saberlo. Respondes: "Usted me dijo que el aceite se le acaba a cada rato. Yo vengo, le cargo sus productos y le enseño. Son $35 una sola vez, y si al mes no le sirve se los devuelvo". Y te quedas callado.

### Para aprender más

- **Startup School de Y Combinator** es gratis y tiene una clase llamada "How to talk to users" (cómo hablar con usuarios). Está en inglés. Es lo mejor que puedes ver esta semana.
- El libro **The Mom Test**, de Rob Fitzpatrick, enseña a hacer preguntas que no inviten a mentirte por cortesía. Hay resúmenes en español y un curso en Platzi basado en él; Platzi es de pago.

---

## 4. Operaciones

### Qué es

Las operaciones son todo lo que pasa después de la venta para que el cliente reciba lo que pagó, igual de bien cada vez.

### Por qué importa

Vender una vez es fácil; cumplir siempre es lo que hace que te recomienden. Además, si cada instalación la haces distinto, nunca vas a poder enseñarle a otra persona a hacerla por ti.

### Los términos básicos

- **Proceso:** los pasos fijos para hacer algo. Tu instalación tiene 9 pasos, escritos en `docs/guia-instalacion.md`.
- **Lista de verificación:** las cosas que revisas antes de dar un trabajo por terminado.
- **Estándar de servicio:** una promesa medible. "Respondo el mismo día".
- **Capacidad:** cuánto trabajo puedes hacer. Con 16 horas a la semana, unas 12 instalaciones al mes como máximo.
- **Cuello de botella:** el paso que limita todo lo demás. Hoy eres tú: nada avanza si no vas.

Y los términos de inventario, que son el corazón de tu producto y de tu carrera:

- **Inventario:** la mercancía que el negocio tiene para vender.
- **Proveedor:** quien le vende la mercancía al negocio.
- **Rotación:** qué tan rápido se vende un producto.
- **Punto de pedido:** la cantidad a la que hay que pedir para que no se acabe antes de que llegue lo nuevo.
- **Días de cobertura:** para cuántos días de venta alcanza lo que hay.

### Cómo funciona en tu negocio

Tienes dos procesos. El de un negocio: contacto, cita, instalación, cobro, seguimiento a los 2, 7 y 25 días. Y el de una distribuidora: reunión, catálogo, enlace, instalación en sus clientes, precios cada lunes.

Los dos están paso a paso en `negocio/07-operaciones.md`. Tu semana tiene bloques fijos: martes y jueves visitas, viernes y sábado instalaciones, domingo revisión.

### Qué haces tú y qué hace la automatización

| Tú | La automatización |
|---|---|
| Haces la instalación | La app calcula todo desde el segundo conteo |
| Publicas los precios nuevos de una distribuidora (15 min) | Las bodegas los reciben solas al abrir la app |
| Revisas los 6 puntos antes de irte | Las pruebas automáticas revisan la app antes de cada cambio |

### Ejemplo

Así calcula la app, y es bueno que lo sepas explicar. Una bodega tenía 40 harinas el lunes. El jueves le llegaron 20. El lunes siguiente cuenta 20.

- Vendió 40 + 20 − 20 = 40 en 7 días: unas 5,7 por día.
- Su proveedor tarda 2 días. Punto de pedido: 5,7 × (2 + 2 de seguridad) = 23. Tiene 20, menos de 23, así que toca pedir hoy.
- Cuánto pedir: lo necesario para 2 días de entrega más 7 de venta: 5,7 × 9 = 51, menos las 20 que tiene = 31. El bulto trae 20, así que pide 40.

Eso es logística de verdad, la misma que verás en tu carrera.

### Para aprender más

- En YouTube, busca "punto de reorden inventario" y "gestión de inventarios para pequeños negocios".
- Tus materias de operaciones cubren esto con más profundidad. Pregúntale a un profesor por el modelo de revisión periódica: es el que usa Reponer.

---

## 5. Automatización

### Qué es

Automatizar es hacer que una herramienta haga sola una tarea que se repite, para que tú uses tu tiempo en lo que solo una persona puede hacer.

### Por qué importa

Tienes 16 horas a la semana. Cada tarea repetida que haces a mano le quita tiempo a visitar negocios, que es lo único que hace crecer esto.

### Los términos básicos

- **Respuesta rápida:** un mensaje guardado en WhatsApp que aparece al escribir un atajo.
- **Script:** un programa corto que hace una tarea. El tuyo crea recordatorios en tu calendario.
- **Disparador:** el evento que pone en marcha una automatización. En tu script, cambiar la etapa a `Instalado`.
- **Repositorio:** la carpeta en GitHub donde vive todo el código y los documentos.
- **Rama:** una copia de trabajo del repositorio. `main` es la versión publicada.
- **Pull request:** la propuesta de pasar cambios de una rama a `main`. Al unirla, se publican.
- **Prueba automática:** un programa que usa la app como lo haría una persona y comprueba que los resultados sean correctos.
- **Alojamiento (hosting):** el servicio que mantiene tu página disponible en internet. El tuyo es GitHub Pages y es gratis.
- **Respaldo:** una copia de los datos por si se pierden.

### Cómo funciona en tu negocio

Hay tres niveles:

1. **La app es la automatización principal.** Hace las cuentas que el bodeguero no hace.
2. **Las herramientas de alrededor** (WhatsApp Business, la hoja, el calendario, el programador de publicaciones) te ahorran el trabajo repetido.
3. **Lo que no se automatiza:** hablar con la gente. Al principio conviene hacerlo a mano porque cada conversación te enseña algo.

Una regla útil: no automatices algo hasta haberlo hecho a mano al menos 10 veces. Antes de eso no sabes bien cómo debe funcionar.

### Qué haces tú y qué hace la automatización

Está detallado en `negocio/06-automatizacion.md`, con los pasos para configurar cada herramienta. En resumen: tú hablas, instalas y cobras; el sistema calcula, recuerda, publica y cuenta.

### Ejemplo

Instalas Reponer en una licorería un viernes. Cambias su etapa a `Instalado` en la hoja. Sin hacer nada más:

- El domingo tu teléfono te recuerda: "seguimiento a Licorería X".
- El viernes siguiente: "pedir informe".
- A los 25 días: "ofrecer Acompañamiento".

Con 3 clientes lo recordarías de memoria. Con 20, no.

### Para aprender más

- La documentación de Google sobre Apps Script tiene guías para principiantes. Como ya ves Programación 1, la vas a entender.
- En YouTube, busca "WhatsApp Business respuestas rápidas" y "programar publicaciones Meta Business Suite".

---

## 6. Atención al cliente

### Qué es

Es todo lo que haces por el cliente después de que compró: responder dudas, resolver problemas y asegurarte de que le sirva lo que pagó.

### Por qué importa

Conseguir un cliente nuevo te cuesta unas 10 horas de visitas. Conservar uno te cuesta 10 minutos al mes. Y un cliente contento te trae a otro sin que camines.

### Los términos básicos

- **Retención:** qué porcentaje de tus clientes sigue contigo después de un tiempo.
- **Abandono:** lo contrario: quienes dejan de usar o de pagar. En inglés se dice *churn*.
- **Valor de vida del cliente:** todo lo que te paga un cliente mientras lo es. Una instalación de $35 más 6 meses de Acompañamiento son $95.
- **Recomendación o referido:** un cliente que llega porque otro le habló de ti.
- **Garantía:** tu compromiso si el cliente no queda conforme. La tuya: devolver los $35 dentro de los 30 días.

### Cómo funciona en tu negocio

Tu atención tiene tres momentos fijos: a los 2 días (¿entendió?), a los 7 (¿está contando?) y a los 25 (¿quiere seguir?). Más las dudas que lleguen por WhatsApp, que respondes el mismo día.

Lo que más cuida la relación es lo que haces cuando algo sale mal. Si la app falla o el cliente no queda conforme, responde rápido, dale la razón en lo que la tenga y, si pide el dinero, devuélvelo sin discutir. Un cliente al que le devolviste $35 sin pelear habla mejor de ti que uno al que le fue regular.

### Qué haces tú y qué hace la automatización

| Tú | La automatización |
|---|---|
| Respondes dudas | El mensaje de ausencia avisa cuando estás en clase |
| Envías `/seguimiento`, `/informe`, `/conteo` | El calendario te dice cuándo |
| Resuelves las fallas | El informe de uso te muestra quién dejó de contar |

### Ejemplo

Una dueña te escribe un martes a las 10 am: "se me borraron los productos". Estás en Álgebra. El mensaje de ausencia le responde que le escribes después de las 2. A las 2:10 le envías `/error`, te manda una captura y resulta que abrió la app en otro navegador. Le explicas cómo volver al ícono de la pantalla de inicio y le recuerdas el respaldo. Tardaste 8 minutos y conservaste una clienta.

### Para aprender más

- En YouTube, busca "retención de clientes pequeños negocios" y "cómo pedir recomendaciones a clientes".
- El curso de HubSpot Academy incluye una parte sobre servicio al cliente.

---

## 7. Legal

### Qué es

Es cumplir con las reglas del país para poder cobrar, firmar acuerdos y crecer sin problemas con las autoridades ni con los clientes.

### Por qué importa

Mientras regalas una app no pasa nada. Pero cuando una distribuidora te pida una factura o un contrato, necesitas existir legalmente. Y hacerlo tarde suele salir más caro.

### Los términos básicos

- **RIF:** el Registro Único de Información Fiscal. Es tu número ante el SENIAT, la autoridad de impuestos de Venezuela.
- **RNE:** el Registro Nacional de Emprendimientos. Un registro simplificado para negocios nuevos, con vigencia de 3 años.
- **Firma personal:** el registro de un comerciante individual. No te separa del negocio: respondes con lo tuyo.
- **Factura:** el documento legal de una venta.
- **IGTF:** el Impuesto a las Grandes Transacciones Financieras, de 3 % sobre pagos en divisas fuera del sistema bancario nacional.
- **Condiciones de servicio:** el acuerdo escrito de qué entregas, qué no y qué pasa si algo falla.
- **Habeas data:** el derecho de cada persona a saber qué datos suyos tiene otro y pedir que los corrija o los borre.

### Cómo funciona en tu negocio

Va por etapas:

1. **Piloto gratis:** no necesitas nada.
2. **Primeros cobros:** RIF y registro como emprendedor.
3. **Ingresos mensuales:** facturación y un contador.
4. **Comisiones con distribuidoras:** firma personal o empresa, y contratos.

Hay una duda sin resolver: si un emprendedor pequeño debe cobrar el IGTF cuando le pagan por Zelle. Las fuentes no coinciden. Es la primera pregunta para el contador. Mientras tanto, cobrar por pago móvil en bolívares evita esa duda.

Y un punto personal: si tienes menos de 18 años, no puedes registrarte como comerciante por tu cuenta. Háblalo en casa antes de cobrar.

### Qué haces tú y qué hace la automatización

Aquí casi todo es tuyo: los trámites, las firmas y la consulta con el contador no se pueden delegar a una herramienta. Lo que ya está hecho son los textos: el modelo de recibo y las condiciones de servicio.

### Ejemplo

Una distribuidora acepta el plan y a los 60 días te pide factura para pagarte. Si ya tienes RIF y estás en el RNE, se la das. Si no, pierdes el cobro o lo retrasas semanas. Por eso el plan pone esos trámites en las semanas 7 y 8, antes de que firme la primera distribuidora.

### Para aprender más

- El portal del SENIAT y `emprenderjuntos.gob.ve` son las fuentes oficiales.
- Pregunta en tu universidad si ofrecen asesoría a estudiantes emprendedores.
- Una hora con un contador vale más que cualquier video en este tema.

---

## Glosario

| Término | Significado |
|---|---|
| Abandono | Clientes que dejan de usar o pagar. En inglés, *churn* |
| Alojamiento | Servicio que mantiene una página disponible en internet. En inglés, *hosting* |
| CAC | Costo de adquisición de cliente: cuánto cuesta conseguir un cliente que paga |
| Canal | Camino por el que llegas a tus clientes |
| Canal tradicional | Negocios de barrio: bodegas, abastos, panaderías y farmacias |
| Capacidad | Cuánto trabajo puedes hacer en un tiempo dado |
| Catálogo | Lista de productos de un proveedor, con precio y empaque |
| Cierre | Momento de la venta en que pides la decisión |
| Cliente ideal | Descripción del cliente al que más le sirves |
| Cliente potencial | Alguien interesado que todavía no compra |
| Condiciones de servicio | Acuerdo escrito de qué entregas y qué no |
| Contenido | Publicaciones que enseñan algo útil |
| Conversión | Porcentaje que pasa de un paso del embudo al siguiente |
| Costo fijo | Gasto que pagas vendas o no |
| Costo variable | Gasto que aparece solo cuando vendes |
| Cuello de botella | El paso que limita todo lo demás |
| Demostración | Mostrar el producto funcionando |
| Días de cobertura | Para cuántos días de venta alcanza lo que hay |
| Disparador | Evento que pone en marcha una automatización |
| Embudo | Recorrido desde que alguien te conoce hasta que paga |
| Escenario | Una versión posible del futuro, con sus supuestos |
| Estándar de servicio | Promesa medible al cliente |
| Factura | Documento legal de una venta |
| Flujo de caja | Orden en que entra y sale el dinero |
| Ganancia | Ingresos menos costos |
| Garantía | Compromiso si el cliente no queda conforme |
| Guion de ventas | Orden de lo que dices y preguntas al vender |
| Habeas data | Derecho a saber qué datos tuyos tiene otro y corregirlos |
| IGTF | Impuesto de 3 % a pagos en divisas fuera del sistema bancario nacional |
| Ingreso | Dinero que pagan los clientes |
| Ingreso recurrente | Dinero que entra cada mes sin volver a vender |
| Inventario | Mercancía disponible para vender |
| Margen | Porcentaje de cada venta que es ganancia |
| Objeción | Razón que da el cliente para no comprar |
| Oferta | Qué das, cuánto cuesta y con qué garantía |
| Piloto | Prueba pequeña antes de crecer |
| Proceso | Pasos fijos para hacer algo |
| Propuesta de valor | Frase que explica por qué elegirte |
| Proveedor | Quien le vende la mercancía al negocio |
| Prueba automática | Programa que comprueba que la app funciona bien |
| Pull request | Propuesta de pasar cambios a la versión publicada |
| Punto de equilibrio | Ventas necesarias para no perder dinero |
| Punto de pedido | Cantidad a la que hay que pedir para no quedarse sin producto |
| Rama | Copia de trabajo de un repositorio |
| Referido | Cliente que llega por recomendación |
| Repositorio | Carpeta en GitHub con el código y los documentos |
| Respaldo | Copia de los datos por si se pierden |
| Respuesta rápida | Mensaje guardado en WhatsApp que aparece con un atajo |
| Retención | Porcentaje de clientes que sigue contigo |
| RIF | Registro Único de Información Fiscal, ante el SENIAT |
| RNE | Registro Nacional de Emprendimientos |
| Rotación | Qué tan rápido se vende un producto |
| Script | Programa corto que hace una tarea |
| Seguimiento | Volver a contactar a quien no decidió |
| Supuesto | Un número que eliges porque todavía no lo puedes medir |
| Validación | Comprobar con hechos que la gente quiere lo que ofreces |
| Valor de vida del cliente | Todo lo que paga un cliente mientras lo es |

---

## Dónde aprender, por orden de utilidad

No pude abrir YouTube desde mi entorno, así que no recomiendo videos sueltos que no he podido comprobar. Estos son recursos cuya existencia sí confirmé, más las búsquedas que te llevan a buenos videos.

| Recurso | Área | Idioma | Costo |
|---|---|---|---|
| [Startup School, de Y Combinator](https://www.startupschool.org/) | Ventas, validación, hablar con usuarios | Inglés | Gratis |
| [HubSpot Academy: marketing digital](https://academy.hubspot.com/es/courses/digital-marketing) | Marketing, contenido | Español | Gratis, con certificado |
| Google Actívate | Marketing digital | Español | Gratis |
| Khan Academy, finanzas personales | Finanzas | Sobre todo inglés | Gratis |
| [The Mom Test, de Rob Fitzpatrick](https://www.shortform.com/es/summary/the-mom-test-summary-rob-fitzpatrick) | Entrevistas a clientes | Resúmenes en español | Libro de pago; resumen parcial gratis |
| [Curso de Platzi sobre hablar con usuarios](https://platzi.com/cursos/habla-con-usuarios/prologo-por-rob-fitzpatrick/) | Entrevistas a clientes | Español | De pago |

**Si solo tienes una hora esta semana:** mira la clase "How to talk to users" de Startup School antes de tus entrevistas del viernes.

**Búsquedas para YouTube:** "punto de equilibrio explicado", "embudo de ventas explicado", "punto de reorden inventario", "WhatsApp Business respuestas rápidas", "cómo hacer entrevistas a clientes".

### Fuentes de esta sección

- [Startup School: preguntas frecuentes](https://startupschool.org/faq)
- [TechCrunch: relanzamiento de Startup School](https://techcrunch.com/?p=2004613)
- [Tiendanube: cursos de emprendimiento en español](https://www.tiendanube.com/blog/mejores-cursos-de-emprendimiento/)
- [Holded: cursos gratis para emprendedores](https://www.holded.com/es/blog/cursos-gratis-emprendedores-empresarios)
- [Soporte de Khan Academy: unidades de educación financiera](https://support.khanacademy.org/hc/es/community/posts/28529144180621-Content-Update-4-new-financial-literacy-units)
