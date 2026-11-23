"""Genera las piezas promocionales de REPIQ: un teléfono con la app y un código QR.

Uso: python3 herramientas/generar_artes.py
Escribe en docs/artes/: cuadrada (1080x1080), vertical (1080x1920) y hoja carta (PNG y PDF).
Necesita los paquetes qrcode (Python) y playwright (Node), disponibles en una sesión de Claude.
"""
import base64, io, os, re, subprocess, sys
import qrcode, qrcode.image.svg

URL = "https://jasu0906.github.io/claude-trabaja-/"
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, "docs", "artes")

def qr_svg(url):
    img = qrcode.make(url, image_factory=qrcode.image.svg.SvgPathImage, box_size=10, border=1,
                      error_correction=qrcode.constants.ERROR_CORRECT_M)
    b = io.BytesIO(); img.save(b); svg = b.getvalue().decode()
    svg = re.sub(r"<\?xml[^>]*\?>\s*", "", svg)
    return re.sub(r'width="[^"]*" height="[^"]*"', 'width="100%" height="100%"', svg, count=1)

LOGO = open(os.path.join(RAIZ, "icon.svg"), encoding="utf-8").read()

CSS = """
*{box-sizing:border-box;margin:0}
body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;background:#0b4fc4;color:#fff;overflow:hidden;-webkit-font-smoothing:antialiased}
.lienzo{position:relative;width:var(--w);height:var(--h);padding:var(--p);display:flex;gap:var(--g);background:radial-gradient(circle at 85% 10%,#1f63e0 0,#0b4fc4 55%)}
.marca{display:flex;align-items:center;gap:calc(var(--u)*14);font-weight:800;font-size:calc(var(--u)*40);letter-spacing:-.02em}
.marca svg{width:calc(var(--u)*56);height:calc(var(--u)*56)}
.marca svg rect:first-child{fill:#08368a}
h1{font-size:calc(var(--u)*var(--t,86));line-height:1.03;letter-spacing:-.035em;font-weight:800}
h1 em{white-space:nowrap;font-style:normal;background:#c4f27e;color:#11240a;padding:0 .14em;border-radius:calc(var(--u)*10);-webkit-box-decoration-break:clone;box-decoration-break:clone}
.sub{font-size:calc(var(--u)*34);line-height:1.3;color:#d3defb;font-weight:500}
.puntos{display:flex;flex-wrap:wrap;gap:calc(var(--u)*12)}
.puntos span{font-size:calc(var(--u)*25);font-weight:700;padding:calc(var(--u)*10) calc(var(--u)*20);border-radius:99px;background:rgba(255,255,255,.14)}
.telefono{flex:none;width:var(--tw);border-radius:calc(var(--tw)*.12);background:#050a1c;padding:calc(var(--tw)*.028);box-shadow:0 calc(var(--u)*30) calc(var(--u)*70) rgba(0,0,0,.4)}
.telefono img{display:block;width:100%;border-radius:calc(var(--tw)*.095)}
.qr{flex:none;background:#fff;color:#0b1230;border-radius:calc(var(--u)*30);padding:calc(var(--u)*24);display:flex;align-items:center;gap:calc(var(--u)*26);box-shadow:0 calc(var(--u)*16) calc(var(--u)*40) rgba(0,0,0,.25)}
.qr .codigo{width:var(--q);height:var(--q);flex:none}
.qr b{display:block;font-size:calc(var(--u)*36);line-height:1.1;letter-spacing:-.02em}
.qr p{font-size:calc(var(--u)*23);color:#4f5a78;margin-top:calc(var(--u)*8);line-height:1.3}
.qr .url{font-size:calc(var(--u)*19);font-weight:700;color:#0b4fc4;margin-top:calc(var(--u)*10)}
.texto{display:flex;flex-direction:column;gap:calc(var(--u)*26);min-width:0}

/* Cuadrada: texto y QR a la izquierda, teléfono a la derecha asomando por abajo */
.cuadrada{--w:1080px;--h:1080px;--u:1px;--p:64px;--g:44px;--tw:400px;--q:190px;--t:74}
.cuadrada .texto{flex:1;justify-content:space-between}
.cuadrada .telefono{align-self:flex-start;margin-top:36px}
.cuadrada .qr{flex-direction:row}

/* Vertical: todo en columna, con margen para los controles de las historias */
.vertical{--w:1080px;--h:1920px;--u:1.05px;--p:200px 76px 170px;--g:44px;--tw:500px;--q:220px;--t:88;flex-direction:column;align-items:center}
.vertical .texto{align-self:stretch}
.vertical .telefono{height:740px;overflow:hidden;border-bottom-left-radius:0;border-bottom-right-radius:0;padding-bottom:0}
.vertical .qr{align-self:stretch}

/* Hoja carta a 150 puntos por pulgada: 1275 x 1650 */
.carta{--w:1275px;--h:1650px;--u:1.15px;--p:84px;--g:50px;--tw:480px;--q:300px;--t:80;flex-direction:column}
.carta .fila{display:flex;gap:50px;flex:1;min-height:0}
.carta .telefono{height:830px;overflow:hidden;border-bottom-left-radius:0;border-bottom-right-radius:0;padding-bottom:0;align-self:flex-end}
.carta .lado{flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:30px;min-width:0}
.carta .qr{flex-direction:column;align-items:flex-start}
.carta ol{list-style:none;padding:0;display:flex;flex-direction:column;gap:14px}
.carta ol li{display:flex;gap:16px;align-items:center;font-size:30px;font-weight:600;line-height:1.25;color:#fff}
.carta ol li i{font-style:normal;flex:none;width:52px;height:52px;border-radius:16px;background:#c4f27e;color:#11240a;font-weight:800;display:flex;align-items:center;justify-content:center}
"""

def pagina(clase, captura_b64, qr):
    texto = f"""<div class="texto">
    <div class="marca">{LOGO}<span>REPI<span style="color:#c4f27e">Q</span></span></div>
    <h1>Que no te falte lo que <em>más vendes</em></h1>
    <p class="sub">Anota tu fiado y REPIQ te dice qué reponer, cuánto y a quién, con la plata que tienes hoy.</p>
    <div class="puntos"><span>Gratis</span><span>Fiado digital</span><span>Sin internet</span><span>Bs y $</span></div>
    {bloque_qr(qr) if clase == 'cuadrada' else ''}
  </div>"""
    telefono = f'<div class="telefono"><img alt="" src="data:image/png;base64,{captura_b64}"></div>'
    if clase == "carta":
        pasos = ('<ol><li><i>1</i>Escanea el código con la cámara del teléfono.</li><li><i>2</i>Agrégala a tu pantalla de inicio.</li>'
                 '<li><i>3</i>Cuenta tu estante y mira qué pedir.</li></ol>')
        cuerpo = f'{texto}<div class="fila">{telefono}<div class="lado">{pasos}{bloque_qr(qr)}</div></div>'
    elif clase == "vertical":
        cuerpo = f"{texto}{telefono}{bloque_qr(qr)}"
    else:
        cuerpo = f"{texto}{telefono}"
    return f"""<!doctype html><html lang="es"><head><meta charset="utf-8"><style>{CSS}</style></head><body>
<div class="lienzo {clase}">{cuerpo}</div></body></html>"""

def bloque_qr(qr):
    return (f'<div class="qr"><div class="codigo">{qr}</div><div><b>Escanea y pruébala</b>'
            f'<p>Para bodegas y abastos. Se instala desde el navegador.</p><p class="url">jasu0906.github.io/<wbr>claude-trabaja-</p></div></div>')

JS = r"""
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [raiz,salida]=process.argv.slice(1);
(async()=>{
  const b=await chromium.launch();
  // 1. Captura real de la app con la bodega de ejemplo
  const c=await b.newContext({viewport:{width:390,height:800},deviceScaleFactor:3});
  const p=await c.newPage();
  await p.addInitScript(()=>{ try{ localStorage.setItem('reponer.bienvenida','1'); }catch(e){} });
  await p.goto('file://'+path.join(raiz,'index.html'));
  await p.evaluate(()=>{ document.getElementById('avisoEjemplo').hidden=true; document.querySelectorAll('#vista>*').forEach(e=>e.style.animation='none'); });
  await p.waitForTimeout(300);
  fs.writeFileSync(path.join(salida,'_captura.b64'),(await p.screenshot()).toString('base64'));
  await c.close();
  await b.close();
})()
"""
JS2 = r"""
const {chromium}=require('playwright');const path=require('path');
const salida=process.argv[1];
(async()=>{
  const b=await chromium.launch();
  for(const [clase,w,h] of [['cuadrada',1080,1080],['vertical',1080,1920],['carta',1275,1650]]){
    const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:clase==='carta'?2:1});
    await p.goto('file://'+path.join(salida,'_'+clase+'.html'));
    await p.screenshot({path:path.join(salida,'repiq-'+clase+'.png')});
    if(clase==='carta') await p.pdf({path:path.join(salida,'repiq-carta.pdf'),width:'8.5in',height:'11in',printBackground:true,scale:0.64,pageRanges:'1',margin:{top:0,right:0,bottom:0,left:0}});
  }
  await b.close();
})()
"""

def main():
    os.makedirs(SALIDA, exist_ok=True)
    subprocess.run(["node", "-e", JS, RAIZ, SALIDA], check=True, cwd=RAIZ)
    b64 = open(os.path.join(SALIDA, "_captura.b64")).read()
    qr = qr_svg(URL)
    for clase in ("cuadrada", "vertical", "carta"):
        open(os.path.join(SALIDA, f"_{clase}.html"), "w", encoding="utf-8").write(pagina(clase, b64, qr))
    subprocess.run(["node", "-e", JS2, SALIDA], check=True, cwd=RAIZ)
    for f in os.listdir(SALIDA):
        if f.startswith("_"): os.remove(os.path.join(SALIDA, f))
    print("Artes listos en docs/artes/:", ", ".join(sorted(os.listdir(SALIDA))))

if __name__ == "__main__":
    main()
