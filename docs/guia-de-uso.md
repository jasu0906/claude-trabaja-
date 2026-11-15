# Guía de uso de Reponer

Para ti, antes de salir a la calle. Explica cómo funciona la app pantalla por pantalla, cómo calcula, qué se hace en una instalación, qué se cobra y cómo responder las preguntas que te van a hacer.

La mejor forma de leerla es con la app abierta al lado: `https://jasu0906.github.io/claude-trabaja-/`. Abre con una bodega de ejemplo, así que puedes tocar todo sin dañar nada.

---

## 1. La app en 30 segundos

El dueño cuenta cuántas unidades tiene de cada producto, dos veces por semana. Con dos conteos, la app sabe cuánto vende por día. Con eso le dice qué productos pedir hoy, cuántas unidades y a qué proveedor, y le deja el mensaje escrito para enviarlo por WhatsApp.

No registra ventas, no cobra, no factura. Hace una sola cosa: el pedido.

---

## 2. Pantalla por pantalla

### La parte de arriba, siempre visible

| Qué ves | Qué significa |
|---|---|
| Aviso amarillo "Estás viendo una bodega de ejemplo" | Los datos son inventados. El botón **Empezar con mi bodega** los borra y deja la app vacía |
| Aviso "Tu último conteo fue hace N días" | Aparece si pasan 5 días sin contar. El botón **Contar ahora** lleva a la pestaña Conteo |
| Tres recuadros | Cuántos productos hay que pedir hoy, cuántos están agotados y cuánto cuesta el pedido completo |
| Cuatro pestañas | Pedido, Conteo, Productos y Ajustes |

### Pestaña Pedido

Es la pantalla principal: la lista de lo que hay que pedir hoy, agrupada por proveedor.

Cada producto muestra su estado, cuánto queda aproximadamente, para cuántos días alcanza, la cantidad a pedir y lo que cuesta.

Debajo de cada proveedor hay tres botones:

| Botón | Qué hace |
|---|---|
| **Enviar por WhatsApp** | Abre WhatsApp con el pedido ya escrito. Si guardaste el número del proveedor, abre directo su chat. El dueño revisa y envía |
| **Copiar pedido** | Copia el mismo texto, para pegarlo donde quiera |
| **Ya lo pedí** | Marca esos productos como pedidos. Pasan a la sección "En camino" y dejan de sugerirse |

Más abajo pueden aparecer otras secciones:

- **En camino:** lo que ya se pidió y no ha llegado. Cada producto tiene dos botones: **Llegó** (suma esa cantidad al inventario) y **Cancelar** (si al final no se pidió). Si pasa más tiempo del que tarda el proveedor, aparece "debió llegar hace N días".
- **Se acaban esta semana:** productos que todavía no hay que pedir, pero pronto.
- **Pedido mínimo:** si el proveedor exige un mínimo y el pedido no llega, avisa cuánto falta.

### Pestaña Conteo

La lista de productos con dos casillas cada uno:

- **Hay:** cuántas unidades hay ahora en el estante.
- **Llegó:** cuántas unidades llegaron desde el último conteo. Si tocaste "Llegó" en la pestaña Pedido, ya viene lleno.

Se toca **Guardar conteo**. No hace falta contar todo: solo se guardan los productos donde se escribió algo en "Hay".

Si se cuenta dos veces el mismo día, el segundo conteo reemplaza al primero. Sirve para corregir errores.

### Pestaña Productos

Arriba, el formulario para agregar un producto:

| Campo | Qué poner |
|---|---|
| Nombre | Como lo conoce el dueño: "Harina de maíz 1 kg" |
| Proveedor | A quién se lo compra. Los productos se agrupan por este nombre, así que hay que escribirlo siempre igual |
| Costo por unidad (USD) | Lo que le cuesta a él cada unidad, no el precio de venta |
| Días que tarda en llegar | Desde que pide hasta que llega. Si va él mismo al mayorista, 0 o 1 |
| Unidades por empaque | De cuántas unidades es el bulto. Si compra por unidad, 1 |
| Cuántas hay hoy | El primer conteo |

Debajo está **Agregar de la lista rápida**: 26 productos comunes que se agregan con un toque. Después hay que editar cada uno para ponerle proveedor y costo.

Más abajo, la lista de productos con su estado, su proveedor, su costo y cuánto vende por semana. Cada uno tiene **Editar** y **Borrar**. Borrar pide tocar dos veces para confirmar.

### Pestaña Ajustes

| Sección | Para qué |
|---|---|
| Nombre de la bodega | Aparece en el mensaje del pedido |
| Tasa del día | Bolívares por dólar. Con la tasa puesta, los totales salen también en bolívares. La escribe el dueño; la app no la busca |
| Días de venta que cubre cada pedido | Viene en 7. Si se sube, los pedidos son más grandes y menos frecuentes |
| WhatsApp de los proveedores | El número de cada uno, con código de país |
| Respaldo | **Copiar respaldo** copia todos los datos como texto. **Restaurar lo pegado** los recupera |
| Informe de uso | Cuántos conteos y pedidos se han hecho. No trae precios ni productos. **Copiar informe** para enviártelo |
| Tenerla a la mano | Cómo ponerla en la pantalla de inicio |
| Borrar todos los datos | Empieza de cero. Pide tocar dos veces |

Después de cambiar algo en Ajustes hay que tocar **Guardar ajustes**.

---

## 3. Un ejemplo completo, de principio a fin

Un abasto vende harina. Su proveedor tarda 2 días y el bulto trae 20.

| Día | Qué hace el dueño | Qué pasa en la app |
|---|---|---|
| Lunes 2 | Agrega "Harina de maíz 1 kg" y escribe que hay 40 | Estado: "Falta otro conteo". Con un solo conteo no puede calcular |
| Jueves 5 | Le llegan 20. No toca nada todavía | |
| Lunes 9 | En Conteo escribe: Hay 20, Llegó 20. Guarda | Calcula: 40 + 20 − 20 = 40 vendidas en 7 días, 5,7 por día |
| Lunes 9 | Mira la pestaña Pedido | Harina: "Pedir hoy", quedan ~20, alcanza para 4 días. Pedir 40 |
| Lunes 9 | Toca "Enviar por WhatsApp" y envía. Toca "Ya lo pedí" | La harina pasa a "En camino: 40 pedidas el 9" |
| Miércoles 11 | Llega el pedido. Toca "Llegó" | Suma 40 a lo que estima que hay |
| Jueves 12 | Cuenta el estante: Hay 43. "Llegó" ya dice 40. Guarda | Ajusta el cálculo con el dato nuevo |

Desde ahí el ciclo se repite: contar, mirar el pedido, enviar, marcar.

---

## 4. Cómo calcula, exactamente

Apréndete estas cuatro cuentas. Con ellas puedes explicar cualquier número que aparezca en pantalla.

**1. Cuánto vende por día**

> (lo que había + lo que llegó − lo que hay) ÷ los días entre un conteo y otro

Usa los últimos cuatro períodos entre conteos, para no guiarse por una sola semana rara.

**2. Cuánto queda hoy**

> el último conteo − lo que vende por día × los días que pasaron

Por eso en pantalla dice "quedan ~14" con el símbolo de aproximado: es una estimación hasta el próximo conteo.

**3. Cuándo pedir**

> pide cuando lo que queda sea igual o menor que: ventas por día × (días que tarda el proveedor + 2 de seguridad)

Los 2 días de seguridad cubren atrasos del proveedor o un día de ventas altas.

**4. Cuánto pedir**

> ventas por día × (días que tarda el proveedor + días de cobertura) − lo que queda

Y se redondea hacia arriba al bulto completo. Nunca sugiere menos de un bulto.

**El ejemplo de la harina con estas cuentas:**

1. Vende 40 ÷ 7 = 5,7 por día.
2. Quedan 20.
3. Punto de pedido: 5,7 × (2 + 2) = 23. Tiene 20, que es menos: toca pedir.
4. Cantidad: 5,7 × (2 + 7) = 51, menos 20 = 31. El bulto es de 20, así que pide 40.

## 5. Qué significa cada estado

| Estado | Cuándo aparece |
|---|---|
| **Falta otro conteo** | Solo hay un conteo. Necesita dos, en días distintos |
| **Agotado** | La estimación dice que ya no queda nada |
| **Pedir hoy** | Lo que queda no alcanza para esperar al proveedor más 2 días |
| **Pedir esta semana** | Todavía alcanza, pero habrá que pedir en unos 3 días |
| **Bien** | Hay suficiente |
| **En camino** | Ya se pidió y no ha llegado |

Si un producto dice "sin ventas recientes", entre los últimos conteos no se vendió ninguna unidad. La app no lo sugiere.

---

## 6. Las preguntas que te van a hacer

### Sobre el uso

**¿Tengo que anotar cada venta?**
No. Solo cuentas el estante dos veces por semana. Es la diferencia principal con un punto de venta.

**¿Cuánto tiempo me quita?**
Unos 2 minutos por conteo si empiezas con los 10 o 15 productos que más vendes.

**¿Tengo que contar todo el negocio?**
No. Cuentas solo los productos que cargaste, y de esos, los que quieras ese día.

**¿Qué pasa si se me olvida contar?**
La app sigue estimando con lo último que sabe, pero cada día es menos precisa. A los 5 días te lo recuerda.

**¿Y si me equivoco al contar?**
Cuentas otra vez el mismo día y el conteo nuevo reemplaza al anterior.

**¿Qué pasa si se me olvida anotar que llegó mercancía?**
La app creerá que vendiste menos de lo real y va a pedir de menos. Por eso conviene tocar "Llegó" cuando llega el pedido.

**¿Sirve para productos que vendo por peso, como queso o jamón?**
Sí. Puedes escribir cantidades con decimales, por ejemplo 2,5 kilos.

**¿Puedo cambiar la cantidad que me sugiere?**
La sugerencia es una guía. Cuando se abre WhatsApp, puedes editar el mensaje antes de enviarlo. La decisión siempre es tuya.

**La cantidad me parece muy alta (o muy baja).**
En Ajustes, cambia "Días de venta que cubre cada pedido". Con menos días, pedidos más pequeños y más seguidos.

**En diciembre vendo mucho más. ¿La app lo sabe?**
No adivina. Se ajusta sola a medida que cuentas, porque usa las últimas semanas. En temporada alta cuenta más seguido y sube los días de cobertura.

### Sobre el teléfono y los datos

**¿Necesito internet?**
Solo la primera vez que la abres. Después funciona sin conexión, también cuando se va la luz. Enviar el pedido por WhatsApp sí necesita conexión, como cualquier mensaje.

**¿Hay que descargarla de la tienda de aplicaciones?**
No. Se abre desde un enlace en el navegador y se agrega a la pantalla de inicio. Queda con su ícono, como cualquier app.

**¿Funciona en iPhone?**
Sí, en Safari. En Android, en Chrome.

**¿Quién ve mis datos?**
Nadie. Se guardan solo en tu teléfono. La app no tiene servidor ni cuentas, así que ni yo puedo verlos.

**¿Y si se me daña o me roban el teléfono?**
Si hiciste el respaldo, lo pegas en el teléfono nuevo y recuperas todo. Si no lo hiciste, se pierde. Por eso se hace una vez por semana.

**¿Puedo usarla en dos teléfonos a la vez, yo y mi empleado?**
Todavía no. Los datos viven en un solo teléfono. Puedes pasar los datos de uno a otro con el respaldo, pero no se sincronizan solos.

**¿Tiene costo? ¿Después me van a cobrar?**
La app es gratis y lo va a seguir siendo. Lo que se cobra es el servicio de instalación, si lo quieres.

### Sobre lo que no hace

**¿Me lleva las ventas, los fiados o la caja?**
No. Solo el pedido. Si necesitas eso, puedes usar otro sistema junto con Reponer.

**¿Lee códigos de barras?**
No.

**¿Me dice cuánto gano con cada producto?**
No. Guarda lo que te cuesta, no a cuánto vendes.

**¿Busca la tasa del dólar sola?**
No. La escribes tú en Ajustes.

**¿Le hace el pedido al proveedor automáticamente?**
No. Te deja el mensaje escrito y tú decides si lo envías.

### Sobre ti y el proyecto

**¿Quién hizo esto?**
Tú, como estudiante de Ingeniería de Operaciones y Logística, con ayuda de un asistente de inteligencia artificial. Dilo así: es verdad y genera confianza.

**¿Cuántos negocios la usan?**
Di el número real, aunque sea cero. "Estoy empezando; usted sería de los primeros, y por eso lo voy a atender personalmente."

**¿Y si usted desaparece?**
La app sigue funcionando en el teléfono sin depender de ti ni de ningún servidor.

### Si no sabes la respuesta

Di: "No lo sé. Lo averiguo y le escribo hoy". Anota la pregunta y tráemela. Es mejor que inventar, y cada pregunta nueva mejora esta guía.

---

## 7. Qué se hace en una instalación

Dura unas 2 horas. La regla más importante: **el teléfono lo maneja el dueño, no tú.** Si lo haces tú, él no aprende.

### Antes de ir

| Tú llevas | El dueño debe tener |
|---|---|
| Tu teléfono con la app, para mostrar | El teléfono donde la va a usar, con carga |
| Un volante impreso con tu WhatsApp | Los nombres y teléfonos de sus proveedores |
| Batería externa | Las últimas facturas o notas de entrega, para ver los costos |

### Paso a paso

| # | Tiempo | Qué se hace |
|---|---|---|
| 1 | 5 min | **Abrir la app.** El dueño escanea el código del volante. Es el único momento en que hace falta internet |
| 2 | 5 min | **Ponerla en la pantalla de inicio.** Menú del navegador → "Agregar a pantalla de inicio". Cerrar el navegador y abrir desde el ícono |
| 3 | 1 min | **Empezar.** Tocar "Empezar con mi bodega" para borrar el ejemplo |
| 4 | 10 min | **Elegir los productos.** Los 10 a 15 que más vende, con la lista rápida. El resto se agrega después |
| 5 | 45 min | **Completar cada producto.** Proveedor, costo, días que tarda y unidades por bulto. Es la parte más larga; las facturas ayudan |
| 6 | 20 min | **Primer conteo.** Van juntos al estante. Él cuenta y escribe |
| 7 | 10 min | **Ajustes.** Nombre del negocio, tasa del día y el WhatsApp de cada proveedor |
| 8 | 5 min | **Respaldo.** "Copiar respaldo" y pegarlo en un chat de WhatsApp consigo mismo |
| 9 | 10 min | **Ensayo.** Le muestras en tu teléfono, con la bodega de ejemplo, cómo se verá su pedido |
| 10 | 5 min | **Acuerdo.** Qué día vuelve a contar y qué día pasas tú |
| 11 | 5 min | **Cobro**, si es instalación paga, y entrega del recibo |

Con hasta 60 productos, el paso 5 se alarga y la visita llega a las 2 horas.

### Lo que el dueño no verá ese día

Con un solo conteo la app todavía no sugiere pedidos: todos los productos dirán "Falta otro conteo". Díselo antes de irte para que no piense que no funciona: "Con el segundo conteo, el jueves, ya le dice qué pedir".

### Antes de irte, comprueba

- [ ] La app abre desde el ícono de la pantalla de inicio.
- [ ] Abre con el modo avión puesto.
- [ ] Hay al menos 10 productos con proveedor, costo y días de entrega.
- [ ] El dueño hizo un conteo sin que tú tocaras el teléfono.
- [ ] El respaldo está pegado en un chat de su WhatsApp.
- [ ] Tiene tu número guardado y sabe qué día vuelve a contar.

### Las visitas siguientes

| Cuándo | Qué haces |
|---|---|
| A los 2 o 3 días | Segundo conteo. Aparece su primera lista de pedido. Es el momento en que entiende para qué sirve |
| A la semana | Le pides el informe de uso y resuelves dudas |
| A los 25 días | Le ofreces el Acompañamiento y le pides una recomendación |

---

## 8. Qué se cobra y qué recibe el cliente

**No existe un "Plan Pro".** En las primeras diapositivas apareció como una idea para el futuro, y después lo reemplacé por los productos de abajo. Hoy se venden tres cosas, y la app es gratis.

### Reponer (la app): gratis

Todo lo que describe esta guía. Sin límite de tiempo, de productos ni de proveedores. El dueño la instala y la carga por su cuenta.

### Reponer Instalado: $35, pago único

Para el negocio que prefiere que alguien se lo deje listo.

| Qué recibe | Por qué le sirve |
|---|---|
| Una visita de unas 2 horas | No tiene que aprender solo |
| Hasta 60 productos cargados con proveedor, costo, empaque y días de entrega | Es la parte tediosa, la que casi nadie termina por su cuenta |
| El primer conteo hecho contigo | Aprende haciéndolo |
| El WhatsApp de cada proveedor y la tasa configurados | El pedido sale directo al chat correcto |
| El respaldo configurado | No pierde los datos si cambia de teléfono |
| 30 días de ayuda por WhatsApp | Tiene a quién preguntar |
| Garantía: si a los 30 días no le sirve, se devuelven los $35 | No arriesga nada |

Es la misma app que la gratuita. Lo que paga es tu trabajo.

### Acompañamiento: $10 al mes, opcional

Para quien ya tiene la instalación y quiere seguir con apoyo.

| Qué recibe | Por qué le sirve |
|---|---|
| Una revisión al mes, en persona o por WhatsApp | Alguien mira que los números tengan sentido |
| Ajuste de las cantidades sugeridas | Si pide de más o de menos, se corrige |
| Productos nuevos cargados | No tiene que hacerlo él |
| Costos actualizados | Los totales del pedido salen bien |
| Verificación del respaldo | Se confirma que no va a perder los datos |

Se puede cancelar en cualquier momento con un mensaje.

### Plan Distribuidor: $39 al mes

No es para la bodega: es para la distribuidora que le vende.

| Qué recibe | Por qué le sirve |
|---|---|
| Su catálogo en un enlace propio, hasta 150 productos | Sus clientes cargan todos sus productos con un toque |
| Precios actualizados una vez por semana | Cuando cambia un precio, lo ven todas sus bodegas |
| Días de entrega y pedido mínimo configurados | La app avisa a la bodega a tiempo y le dice cuánto le falta para el mínimo |
| Un volante con su enlace y código QR | Lo reparte entre sus clientes |
| Instalación en hasta 5 de sus bodegas el primer mes | Arranca con clientes usándola |
| Soporte por WhatsApp | |

Oferta para las 3 primeras distribuidoras: 60 días gratis y después $19 al mes durante 6 meses.

### Si un cliente pregunta "¿y cuál es la versión paga de la app?"

"No hay versión paga. La app es una sola y es gratis. Lo que cobro es ir a su negocio a dejársela funcionando."

### Lo que todavía no se ofrece

Un plan con respaldo automático en la nube y varios teléfonos sincronizados. Es lo que más se parecería a un "plan pro", y varios clientes lo van a pedir. No existe todavía: anota cada vez que alguien lo pida, porque con 10 pedidos vale la pena construirlo.
