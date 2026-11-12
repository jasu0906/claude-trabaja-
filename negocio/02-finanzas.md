# 2. Finanzas

Todos los números de este documento salen de `negocio/hojas/finanzas.xlsx`. Ábrela con Excel o Google Sheets: si cambias una celda amarilla, todo se recalcula. Montos en dólares.

## Inversión inicial: $60

| Concepto | Monto | Nota |
|---|---|---|
| Impresión de volantes y guías | $10 | Estimación |
| Batería externa para el teléfono | $15 | Opcional, por los cortes de luz |
| Transporte de las primeras 10 entrevistas | $15 | Estimación |
| Reserva para imprevistos | $20 | |
| **Total** | **$60** | Cabe en tu presupuesto de $50–200 |

No gasté en dominio, hosting ni herramientas: la app está en GitHub Pages, que es gratis, y todo lo demás usa planes gratuitos.

## Costos mensuales: $35 fijos

| Concepto | Monto |
|---|---|
| Transporte para visitas y entrevistas | $20 |
| Datos móviles | $10 |
| Impresiones | $5 |
| **Costos fijos** | **$35** |
| Transporte de cada instalación | $3 por instalación |

Son estimaciones mías. Anota tu gasto real el primer mes y corrige la hoja.

## Punto de equilibrio

El punto de equilibrio es cuánto tienes que vender para no perder dinero.

- Cada instalación deja $28,50 (35 − 10 % de devoluciones − 3 de transporte).
- Costos fijos: $35 al mes.
- 35 ÷ 28,50 = 1,23 → **necesitas 2 instalaciones al mes para no perder.**

Es un punto de equilibrio muy bajo porque casi no hay costos. El costo real del negocio es tu tiempo.

## Proyección de 6 meses

### Escenario pesimista

Las bodegas casi no cuentan el estante y ninguna distribuidora firma.

| Mes | 1 | 2 | 3 | 4 | 5 | 6 | Total |
|---|---|---|---|---|---|---|---|
| Instalaciones nuevas | 0 | 0 | 1 | 1 | 1 | 2 | 5 |
| Distribuidoras pagando | 0 | 0 | 0 | 0 | 0 | 0 | |
| Ingresos | $0 | $0 | $31,50 | $31,50 | $31,50 | $63 | $157,50 |
| Costos | $95 | $35 | $38 | $38 | $38 | $41 | $285 |
| Ganancia del mes | −$95 | −$35 | −$6,50 | −$6,50 | −$6,50 | $22 | |
| Ganancia acumulada | −$95 | −$130 | −$136,50 | −$143 | −$149,50 | −$127,50 | |

Pierdes $127,50 en 6 meses. Si vas por este camino al terminar el mes 3, aplica el criterio de salida de `11-riesgos.md`.

### Escenario realista

El piloto funciona en 2 de cada 3 bodegas. Firma una distribuidora por mes desde el mes 2 y cada una empieza a pagar tras 60 días gratis. El 30 % de los instalados contrata Acompañamiento.

| Mes | 1 | 2 | 3 | 4 | 5 | 6 | Total |
|---|---|---|---|---|---|---|---|
| Instalaciones nuevas | 0 | 1 | 2 | 3 | 4 | 4 | 14 |
| Clientes de Acompañamiento | 0 | 0 | 0 | 1 | 2 | 3 | |
| Distribuidoras pagando | 0 | 0 | 0 | 1 | 2 | 3 | |
| Ingresos | $0 | $31,50 | $63 | $123,50 | $184 | $213 | $615 |
| Costos | $95 | $38 | $41 | $44 | $47 | $47 | $312 |
| Ganancia del mes | −$95 | −$6,50 | $22 | $79,50 | $137 | $166 | |
| Ganancia acumulada | −$95 | −$101,50 | −$79,50 | $0 | $137 | $303 | |

Recuperas lo invertido en el mes 4. En el mes 6 ganas $166, que son **$2,40 por hora trabajada**.

### Escenario optimista

Las instalaciones se venden por recomendación y las distribuidoras traen a sus clientes. El 40 % contrata Acompañamiento. Desde la cuarta distribuidora se cobra el precio normal de $39.

| Mes | 1 | 2 | 3 | 4 | 5 | 6 | Total |
|---|---|---|---|---|---|---|---|
| Instalaciones nuevas | 1 | 3 | 5 | 6 | 8 | 8 | 31 |
| Clientes de Acompañamiento | 0 | 0 | 2 | 4 | 6 | 9 | |
| Distribuidoras pagando | 0 | 0 | 1 | 3 | 5 | 7 | |
| Ingresos | $31,50 | $94,50 | $196,50 | $286 | $447 | $555 | $1.610,50 |
| Costos | $98 | $44 | $50 | $53 | $59 | $59 | $363 |
| Ganancia del mes | −$66,50 | $50,50 | $146,50 | $233 | $388 | $496 | |
| Ganancia acumulada | −$66,50 | −$16 | $130,50 | $363,50 | $751,50 | $1.247,50 | |

En el mes 6 ganas $496, que son $7,16 por hora.

## Comparación

| | Pesimista | Realista | Optimista |
|---|---|---|---|
| Ganancia en el mes 6 | $22 | $166 | $496 |
| Ganancia acumulada en 6 meses | −$127,50 | $303 | $1.247,50 |
| Ganancia por hora en el mes 6 | $0,32 | $2,40 | $7,16 |
| Mes en que recuperas lo invertido | No en 6 meses | Mes 4 | Mes 3 |

## Lo que estos números dicen

1. **Ningún escenario llega a $2.000 al mes en 6 meses.** El optimista llega a una cuarta parte.
2. **En el realista ganas $2,40 por hora.** El plan freelance de `plan-negocio.md` apuntaba a $20–40 por hora facturable. Si tu prioridad vuelve a ser ganar dinero pronto, el freelance paga mejor. Elegiste impacto primero, y estos números son el precio de esa decisión.
3. **El riesgo en dinero es pequeño:** lo máximo que pierdes en el peor caso son unos $150. Lo que arriesgas es tiempo: 16 horas a la semana durante 6 meses son unas 415 horas.
4. **Todo depende del Plan Distribuidor.** Las instalaciones no escalan: 8 al mes ya ocupan 24 de tus 69 horas.

## Fuentes

Los precios de referencia están en `01-modelo-de-negocio.md`. Los costos de transporte, datos e impresión son estimaciones propias sin fuente; corrígelas con tus gastos reales.
