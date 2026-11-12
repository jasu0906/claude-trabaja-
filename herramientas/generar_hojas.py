"""Genera las hojas de cálculo del negocio. Uso: python3 herramientas/generar_hojas.py"""
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.utils import get_column_letter as L

F = "Arial"
AZUL = Font(name=F, color="0000FF")           # dato que se puede cambiar
NEGRO = Font(name=F)
VERDE = Font(name=F, color="008000")          # viene de otra hoja
NEG = Font(name=F, bold=True)
TIT = Font(name=F, bold=True, size=14)
BLANCO = Font(name=F, bold=True, color="FFFFFF")
CAB = PatternFill("solid", fgColor="0B5D4B")
AMARILLO = PatternFill("solid", fgColor="FFFF00")
GRIS = PatternFill("solid", fgColor="F3F6F4")
USD = '$#,##0.00;($#,##0.00);-'
ENT = '#,##0;(#,##0);-'
PCT = '0.0%;(0.0%);-'
borde = Border(bottom=Side(style="thin", color="D5DDD9"))

def celda(ws, ref, valor, fuente=NEGRO, fmt=None, fill=None, wrap=False):
    c = ws[ref]; c.value = valor; c.font = fuente
    if fmt: c.number_format = fmt
    if fill: c.fill = fill
    if wrap: c.alignment = Alignment(wrap_text=True, vertical="top")
    return c

def anchos(ws, w):
    for i, x in enumerate(w, 1): ws.column_dimensions[L(i)].width = x

# ---------------------------------------------------------------- finanzas
wb = Workbook()
s = wb.active; s.title = "Supuestos"
celda(s, "A1", "Reponer: supuestos del modelo financiero", TIT)
celda(s, "A2", "Cambia solo las celdas con letra azul y fondo amarillo. Todo lo demás se calcula solo. Montos en USD.", NEGRO)
filas = [
    ("Precios", None, None),
    ("Reponer Instalado (pago único)", 35, "Decisión propia. Referencias: LoTuyo cobra unos $14,99 al mes y Loyverse $25 al mes por tienda por su inventario avanzado."),
    ("Acompañamiento (al mes)", 10, "Decisión propia. Por debajo de LoTuyo ($14,99 al mes)."),
    ("Plan Distribuidor, precio fundador (al mes)", 19, "Oferta para las 3 primeras distribuidoras durante 6 meses. Precio normal: $39."),
    ("Plan Distribuidor, precio normal (al mes)", 39, "Se aplica desde la cuarta distribuidora. No se usa en los primeros 6 meses."),
    ("Meses gratis para cada distribuidora nueva", 2, "Oferta de 60 días gratis."),
    ("Costos", None, None),
    ("Costo de cada instalación (transporte)", 3, "Estimación propia de pasaje ida y vuelta. Ajusta con tu gasto real."),
    ("Instalaciones que piden devolución", 0.10, "Garantía de 30 días. Estimación propia; todavía no hay datos."),
    ("Transporte fijo al mes (visitas y entrevistas)", 20, "Estimación propia."),
    ("Datos móviles al mes", 10, "Estimación propia. Revisa las tarifas vigentes de tu operadora."),
    ("Impresiones al mes (volantes)", 5, "Estimación propia."),
    ("Inversión inicial", None, None),
    ("Impresión de volantes y guías", 10, "Estimación propia."),
    ("Batería externa para el teléfono", 15, "Opcional. Útil por los cortes de luz."),
    ("Transporte de las primeras 10 entrevistas", 15, "Estimación propia."),
    ("Reserva para imprevistos", 20, "Margen de seguridad."),
    ("Tiempo", None, None),
    ("Horas de trabajo por semana", 16, "Según tu horario de clases: martes 2,5 h, miércoles 2 h, jueves 2,5 h, viernes 4 h, sábado 4 h, domingo 1 h."),
    ("Semanas por mes", 4.33, "52 semanas entre 12 meses."),
]
celda(s, "A4", "Concepto", BLANCO, fill=CAB); celda(s, "B4", "Valor", BLANCO, fill=CAB); celda(s, "C4", "De dónde sale", BLANCO, fill=CAB)
R = {}
r = 5
for nombre, valor, nota in filas:
    if valor is None:
        celda(s, f"A{r}", nombre, NEG, fill=GRIS); s[f"B{r}"].fill = GRIS; s[f"C{r}"].fill = GRIS
    else:
        celda(s, f"A{r}", nombre)
        fmt = PCT if nombre.startswith("Instalaciones que piden") else (ENT if ("Meses" in nombre or "Horas" in nombre) else ('0.00' if "Semanas" in nombre else USD))
        celda(s, f"B{r}", valor, AZUL, fmt, AMARILLO)
        celda(s, f"C{r}", nota, wrap=True)
        R[nombre] = f"Supuestos!$B${r}"
    r += 1
def loc(k): return R[k].replace("Supuestos!", "")
celda(s, f"A{r}", "Costos fijos al mes (total)", NEG)
celda(s, f"B{r}", "=" + "+".join(loc(k) for k in ["Transporte fijo al mes (visitas y entrevistas)", "Datos móviles al mes", "Impresiones al mes (volantes)"]), NEG, USD); R["fijos"] = f"Supuestos!$B${r}"; r += 1
celda(s, f"A{r}", "Inversión inicial (total)", NEG)
celda(s, f"B{r}", "=" + "+".join(loc(k) for k in ["Impresión de volantes y guías", "Batería externa para el teléfono", "Transporte de las primeras 10 entrevistas", "Reserva para imprevistos"]), NEG, USD); R["inversion"] = f"Supuestos!$B${r}"; r += 1
celda(s, f"A{r}", "Horas de trabajo al mes", NEG)
celda(s, f"B{r}", "=" + loc("Horas de trabajo por semana") + "*" + loc("Semanas por mes"), NEG, '0.0'); R["horas"] = f"Supuestos!$B${r}"
anchos(s, [48, 14, 95])

P = {k: R[k] for k in R}
escenarios = {
    "Pesimista": dict(inst=[0, 0, 1, 1, 1, 2], dist=[0, 0, 0, 0, 0, 0], pct=0.0,
                      nota="Las bodegas casi no cuentan el estante y ninguna distribuidora firma. Solo se venden algunas instalaciones a conocidos."),
    "Realista": dict(inst=[0, 1, 2, 3, 4, 4], dist=[0, 1, 1, 1, 1, 1], pct=0.30,
                     nota="El piloto funciona en 2 de cada 3 bodegas. Se firma una distribuidora por mes desde el mes 2 y empiezan a pagar tras 60 días gratis."),
    "Optimista": dict(inst=[1, 3, 5, 6, 8, 8], dist=[1, 2, 2, 2, 2, 2], pct=0.40,
                      nota="Las instalaciones se venden por recomendación y las distribuidoras traen a sus propios clientes."),
}
for nombre, e in escenarios.items():
    w = wb.create_sheet(nombre)
    celda(w, "A1", f"Escenario {nombre.lower()}: primeros 6 meses", TIT)
    celda(w, "A2", e["nota"])
    celda(w, "A4", "Mes", BLANCO, fill=CAB)
    for m in range(6): celda(w, f"{L(m+2)}4", m + 1, BLANCO, ENT, CAB)
    celda(w, "H4", "Total", BLANCO, fill=CAB)
    def fila(n, etiqueta, formula, fmt=USD, fuente=NEGRO, entrada=None, total=True):
        celda(w, f"A{n}", etiqueta, NEG if fuente is NEG else NEGRO)
        for m in range(6):
            col = L(m + 2); prev = L(m + 1)
            if entrada is not None: celda(w, f"{col}{n}", entrada[m], AZUL, fmt, AMARILLO)
            else: celda(w, f"{col}{n}", formula(col, prev, m), fuente, fmt)
        if total: celda(w, f"H{n}", f"=SUM(B{n}:G{n})", NEG, fmt)
    celda(w, "A5", "Ventas (cambia estas filas)", NEG, fill=GRIS)
    fila(6, "Instalaciones nuevas", None, ENT, entrada=e["inst"])
    fila(7, "Distribuidoras nuevas que firman", None, ENT, entrada=e["dist"])
    celda(w, "A8", "Instalados que contratan Acompañamiento"); celda(w, "B8", e["pct"], AZUL, PCT, AMARILLO)
    celda(w, "A9", "Clientes", NEG, fill=GRIS)
    fila(10, "Instalaciones acumuladas", lambda c, p, m: f"=SUM($B6:{c}6)", ENT, total=False)
    fila(11, "Clientes de Acompañamiento", lambda c, p, m: "=0" if m == 0 else f"=ROUND({p}10*$B$8,0)", ENT, total=False)
    fila(12, "Distribuidoras firmadas acumuladas", lambda c, p, m: f"=SUM($B7:{c}7)", ENT, total=False)
    fila(13, "Distribuidoras que ya pagan", lambda c, p, m: f"=IF({c}$4-{P['Meses gratis para cada distribuidora nueva']}<1,0,INDEX($B12:$G12,{c}$4-{P['Meses gratis para cada distribuidora nueva']}))", ENT, total=False)
    celda(w, "A14", "Ingresos", NEG, fill=GRIS)
    fila(15, "Instalaciones", lambda c, p, m: f"={c}6*{P['Reponer Instalado (pago único)']}*(1-{P['Instalaciones que piden devolución']})", fuente=VERDE)
    fila(16, "Acompañamiento", lambda c, p, m: f"={c}11*{P['Acompañamiento (al mes)']}", fuente=VERDE)
    fila(17, "Plan Distribuidor", lambda c, p, m: f"={c}13*{P['Plan Distribuidor, precio fundador (al mes)']}", fuente=VERDE)
    fila(18, "Ingresos totales", lambda c, p, m: f"=SUM({c}15:{c}17)", fuente=NEG)
    celda(w, "A19", "Costos", NEG, fill=GRIS)
    fila(20, "Transporte de instalaciones", lambda c, p, m: f"={c}6*{P['Costo de cada instalación (transporte)']}", fuente=VERDE)
    fila(21, "Costos fijos", lambda c, p, m: f"={P['fijos']}", fuente=VERDE)
    fila(22, "Inversión inicial", lambda c, p, m: f"={P['inversion']}" if m == 0 else "=0", fuente=VERDE)
    fila(23, "Costos totales", lambda c, p, m: f"=SUM({c}20:{c}22)", fuente=NEG)
    celda(w, "A24", "Resultado", NEG, fill=GRIS)
    fila(25, "Ganancia del mes", lambda c, p, m: f"={c}18-{c}23", fuente=NEG)
    fila(26, "Ganancia acumulada", lambda c, p, m: f"={c}25" if m == 0 else f"={p}26+{c}25", fuente=NEG, total=False)
    fila(27, "Ganancia por hora trabajada", lambda c, p, m: f"=IF({P['horas']}=0,0,{c}25/{P['horas']})", fuente=VERDE, total=False)
    fila(28, "Auxiliar: mes con acumulado positivo", lambda c, p, m: f"=IF({c}26>=0,{c}$4,99)", ENT, total=False)
    anchos(w, [44, 12, 12, 12, 12, 12, 12, 13])

res = wb.create_sheet("Resumen", 0)
celda(res, "A1", "Reponer: resumen financiero de los primeros 6 meses", TIT)
celda(res, "A2", "Todas las cifras salen de las otras hojas. Para probar otros números, cambia las celdas amarillas de Supuestos y de cada escenario.")
for i, t in enumerate(["", "Pesimista", "Realista", "Optimista"]): celda(res, f"{L(i+1)}4", t, BLANCO, fill=CAB)
lineas = [
    ("Ingresos del mes 6", "G18", USD), ("Ganancia del mes 6", "G25", USD), ("Ingresos en 6 meses", "H18", USD),
    ("Costos en 6 meses", "H23", USD), ("Ganancia acumulada en 6 meses", "G26", USD), ("Ganancia por hora en el mes 6", "G27", USD),
    ("Instalaciones vendidas en 6 meses", "H6", ENT), ("Distribuidoras pagando en el mes 6", "G13", ENT),
]
for i, (t, ref, fmt) in enumerate(lineas):
    r = 5 + i; celda(res, f"A{r}", t)
    for j, e in enumerate(escenarios): celda(res, f"{L(j+2)}{r}", f"={e}!{ref}", VERDE, fmt)
r = 5 + len(lineas)
celda(res, f"A{r}", "Mes en que se recupera lo invertido")
for j, e in enumerate(escenarios): celda(res, f"{L(j+2)}{r}", f'=IF(MIN({e}!B28:G28)=99,"No en 6 meses",MIN({e}!B28:G28))', VERDE, ENT)
r += 2
celda(res, f"A{r}", "Punto de equilibrio", NEG, fill=GRIS); res[f"B{r}"].fill = GRIS; res[f"C{r}"].fill = GRIS; res[f"D{r}"].fill = GRIS; r += 1
celda(res, f"A{r}", "Lo que deja cada instalación")
celda(res, f"B{r}", f"={P['Reponer Instalado (pago único)']}*(1-{P['Instalaciones que piden devolución']})-{P['Costo de cada instalación (transporte)']}", VERDE, USD); margen = f"B{r}"; r += 1
celda(res, f"A{r}", "Instalaciones al mes para cubrir los costos fijos")
celda(res, f"B{r}", f"=ROUNDUP({P['fijos']}/{margen},0)", NEGRO, ENT); r += 2
celda(res, f"A{r}", "Camino a $2.000 de ganancia al mes", NEG, fill=GRIS); res[f"B{r}"].fill = GRIS; res[f"C{r}"].fill = GRIS; res[f"D{r}"].fill = GRIS; r += 1
celda(res, f"A{r}", "Meta de ganancia al mes"); celda(res, f"B{r}", 2000, AZUL, USD, AMARILLO); meta = f"B{r}"; r += 1
celda(res, f"A{r}", "Instalaciones al mes que puedes hacer"); celda(res, f"B{r}", 12, AZUL, ENT, AMARILLO); cap = f"B{r}"
celda(res, f"C{r}", "Estimación propia: unas 3 horas cada una, 36 de tus 69 horas al mes."); r += 1
celda(res, f"A{r}", "Clientes de Acompañamiento"); celda(res, f"B{r}", 20, AZUL, ENT, AMARILLO); aco = f"B{r}"
celda(res, f"C{r}", "Estimación propia."); r += 1
celda(res, f"A{r}", "Distribuidoras a precio normal que harían falta")
celda(res, f"B{r}", f"=ROUNDUP(MAX(0,{meta}+{P['fijos']}-{cap}*{margen}-{aco}*{P['Acompañamiento (al mes)']})/{P['Plan Distribuidor, precio normal (al mes)']},0)", NEG, ENT)
celda(res, f"C{r}", "Meta + costos fijos − instalaciones − acompañamiento, dividido entre el precio del plan.")
anchos(res, [50, 16, 16, 16])
wb.save("negocio/hojas/finanzas.xlsx")

# ---------------------------------------------------------------- clientes
wb = Workbook()
e = wb.active; e.title = "Clientes"
celda(e, "A1", "Reponer: clientes y ventas", TIT)
celda(e, "A2", "Una fila por negocio. Llena las columnas de fondo amarillo. La fila 5 es un ejemplo inventado: bórrala cuando cargues tu primer cliente real.")
cols = ["Fecha del primer contacto", "Negocio", "Tipo", "Zona", "Persona", "WhatsApp", "Cómo llegó", "Etapa", "Producto", "Monto cobrado (USD)", "Próximo paso", "Fecha del próximo paso", "Notas"]
for i, c in enumerate(cols): celda(e, f"{L(i+1)}4", c, BLANCO, fill=CAB)
ejemplo = ["2026-11-13", "Abasto El Ejemplo", "Abasto", "Petare", "Sra. Ejemplo", "584120000000", "Visita en frío", "Interesado", "Gratis", 0, "Instalar el martes", "2026-11-17", "Se le agota la harina cada semana. Fila de ejemplo."]
for i, v in enumerate(ejemplo): celda(e, f"{L(i+1)}5", v, AZUL, USD if i == 9 else None, AMARILLO)
for r in range(6, 206):
    for i in range(len(cols)): e[f"{L(i+1)}{r}"].fill = AMARILLO; e[f"{L(i+1)}{r}"].font = AZUL
    e[f"J{r}"].number_format = USD
listas = {
    "C": ["Bodega", "Abasto", "Minimarket", "Licorería", "Ferretería", "Farmacia", "Distribuidora", "Otro"],
    "G": ["Visita en frío", "Recomendación", "Instagram", "WhatsApp", "Distribuidora", "Volante", "Otro"],
    "H": ["Contactado", "Entrevistado", "Interesado", "Instalado", "Usa sin ayuda", "Pagó", "Perdido"],
    "I": ["Gratis", "Instalado", "Acompañamiento", "Distribuidor"],
}
for col, ops in listas.items():
    dv = DataValidation(type="list", formula1='"' + ",".join(ops) + '"', allow_blank=True); e.add_data_validation(dv); dv.add(f"{col}5:{col}205")
anchos(e, [16, 26, 14, 16, 18, 16, 16, 15, 16, 14, 26, 16, 44]); e.freeze_panes = "C5"

t = wb.create_sheet("Tablero")
celda(t, "A1", "Embudo de ventas", TIT)
celda(t, "A2", "Se calcula solo con lo que escribas en la hoja Clientes. Cada etapa cuenta también a quienes ya pasaron por ella.")
for i, c in enumerate(["Etapa", "Negocios en esta etapa", "Llegaron al menos hasta aquí", "De la etapa anterior pasaron"]): celda(t, f"{L(i+1)}4", c, BLANCO, fill=CAB)
orden = ["Contactado", "Entrevistado", "Interesado", "Instalado", "Usa sin ayuda", "Pagó"]
for i, et in enumerate(orden):
    r = 5 + i
    celda(t, f"A{r}", et)
    celda(t, f"B{r}", f'=COUNTIF(Clientes!$H$5:$H$205,A{r})', VERDE, ENT)
    celda(t, f"C{r}", f"=SUM(B{r}:B{4+len(orden)})", NEGRO, ENT)
    celda(t, f"D{r}", "" if i == 0 else f"=IF(C{r-1}=0,0,C{r}/C{r-1})", NEGRO, PCT)
r = 5 + len(orden)
celda(t, f"A{r}", "Perdido"); celda(t, f"B{r}", '=COUNTIF(Clientes!$H$5:$H$205,A%d)' % r, VERDE, ENT); r += 2
celda(t, f"A{r}", "Ingresos cobrados (USD)", NEG); celda(t, f"B{r}", "=SUM(Clientes!$J$5:$J$205)", VERDE, USD); r += 1
for prod in listas["I"][1:]:
    celda(t, f"A{r}", f"Cobrado por {prod}"); celda(t, f"B{r}", f'=SUMIF(Clientes!$I$5:$I$205,"{prod}",Clientes!$J$5:$J$205)', VERDE, USD); r += 1
r += 1
celda(t, f"A{r}", "Negocios por tipo", NEG); r += 1
for tp in listas["C"]:
    celda(t, f"A{r}", tp); celda(t, f"B{r}", f'=COUNTIF(Clientes!$C$5:$C$205,A{r})', VERDE, ENT); r += 1
anchos(t, [30, 24, 28, 28])
wb.save("negocio/hojas/clientes-y-ventas.xlsx")
print("hojas generadas")
