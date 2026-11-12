/**
 * Recordatorios de seguimiento para la hoja "Clientes" de Reponer.
 *
 * Cuando la etapa de un negocio cambia a "Instalado", crea tres eventos en tu
 * Google Calendar: seguimiento (día 2), pedir el informe de uso (día 7) y
 * ofrecer el Acompañamiento (día 25). Cuando cambia a "Interesado", crea un
 * recordatorio para el día siguiente.
 *
 * Instalación: pega este archivo en Extensiones > Apps Script, guarda, elige la
 * función "instalar" y toca Ejecutar. Google pedirá permiso una sola vez.
 */

var HOJA = 'Clientes';
var FILA_TITULOS = 4;
var HORA_RECORDATORIO = 14; // 2:00 pm, después de tus clases

/** Ejecuta esta función una sola vez para activar los recordatorios. */
function instalar() {
  var libro = SpreadsheetApp.getActive();
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'alEditar') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('alEditar').forSpreadsheet(libro).onEdit().create();
  SpreadsheetApp.getUi().alert('Listo. Los recordatorios quedaron activados.');
}

/** Devuelve el número de columna de un título, o 0 si no existe. */
function columna(hoja, titulo) {
  var titulos = hoja.getRange(FILA_TITULOS, 1, 1, hoja.getLastColumn()).getValues()[0];
  return titulos.indexOf(titulo) + 1;
}

function crearEvento(titulo, diasDesdeHoy, detalle) {
  var inicio = new Date();
  inicio.setDate(inicio.getDate() + diasDesdeHoy);
  inicio.setHours(HORA_RECORDATORIO, 0, 0, 0);
  var fin = new Date(inicio.getTime() + 15 * 60 * 1000);
  var evento = CalendarApp.getDefaultCalendar().createEvent(titulo, inicio, fin, { description: detalle });
  evento.addPopupReminder(0);
}

function alEditar(e) {
  if (!e || !e.range) return;
  var hoja = e.range.getSheet();
  if (hoja.getName() !== HOJA) return;
  var fila = e.range.getRow();
  if (fila <= FILA_TITULOS || e.range.getNumRows() > 1) return;

  var colEtapa = columna(hoja, 'Etapa');
  if (!colEtapa || e.range.getColumn() !== colEtapa) return;

  var etapa = String(e.value || '');
  var negocio = hoja.getRange(fila, columna(hoja, 'Negocio')).getValue() || 'Negocio sin nombre';
  var telefono = hoja.getRange(fila, columna(hoja, 'WhatsApp')).getValue() || 'sin número';
  var detalle = 'WhatsApp: ' + telefono + '\nFila ' + fila + ' de la hoja Clientes.';

  if (etapa === 'Instalado') {
    crearEvento('Reponer: seguimiento a ' + negocio, 2, detalle + '\nEnvía la respuesta rápida /seguimiento.');
    crearEvento('Reponer: pedir informe a ' + negocio, 7, detalle + '\nEnvía la respuesta rápida /informe.');
    crearEvento('Reponer: ofrecer Acompañamiento a ' + negocio, 25, detalle + '\nEnvía la respuesta rápida /acompanamiento.');
  } else if (etapa === 'Interesado') {
    crearEvento('Reponer: volver a ' + negocio, 1, detalle + '\nQuedó interesado. Confirma cuándo instalar.');
  }
}
