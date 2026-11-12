"""Genera el volante imprimible con el enlace y el código QR de una distribuidora.

Uso: python3 herramientas/generar_volante.py <nombre-corto>
Ejemplo: python3 herramientas/generar_volante.py lacentral
Lee catalogos/<nombre-corto>.json y escribe docs/volantes/<nombre-corto>.pdf y .html.
Necesita los paquetes qrcode (Python) y playwright (Node), disponibles en una sesión de Claude.
"""
import html, io, json, os, re, subprocess, sys
import qrcode, qrcode.image.svg

BASE = "https://jasu0906.github.io/claude-trabaja-/"

def qr_svg(url):
    img = qrcode.make(url, image_factory=qrcode.image.svg.SvgPathImage, box_size=10, border=2)
    b = io.BytesIO(); img.save(b); svg = b.getvalue().decode()
    svg = re.sub(r"<\?xml[^>]*\?>\s*", "", svg)
    return re.sub(r'width="[^"]*" height="[^"]*"', 'width="100%" height="100%"', svg, count=1)

def main():
    if len(sys.argv) != 2 or not re.fullmatch(r"[a-z0-9-]{1,40}", sys.argv[1]):
        sys.exit("Uso: python3 herramientas/generar_volante.py <nombre-corto>")
    slug = sys.argv[1]
    raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    cat = json.load(open(os.path.join(raiz, "catalogos", slug + ".json"), encoding="utf-8"))
    url = BASE + "?d=" + slug
    nombre = html.escape(cat["nombre"])
    detalles = [f"{len(cat['productos'])} productos con sus precios"]
    if cat.get("entrega"): detalles.append(f"entrega en {cat['entrega']} día" + ("" if cat["entrega"] == 1 else "s"))
    if cat.get("minimo"): detalles.append(f"pedido mínimo ${cat['minimo']:g}")
    pagina = f"""<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Reponer: volante de {nombre}</title>
<style>
@page{{size:letter;margin:14mm}}
*{{box-sizing:border-box}}
body{{margin:0 auto;max-width:180mm;padding:8mm;font:15px/1.45 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#14231f;background:#fff}}
.marca{{font-size:22px;font-weight:800;margin:0}} .marca span{{background:#ffd84a;padding:0 .2em;border-radius:4px}}
h1{{font-size:34px;line-height:1.15;margin:10px 0 6px;letter-spacing:-.01em}}
.sub{{font-size:19px;margin:0 0 18px;font-weight:600;color:#0b5d4b}}
.fila{{display:flex;gap:22px;align-items:center;border:2px solid #0b5d4b;border-radius:10px;padding:16px;margin-bottom:18px}}
.qr{{width:52mm;height:52mm;flex:none}} .url{{font:600 13px ui-monospace,Menlo,Consolas,monospace;word-break:break-all}}
h2{{font-size:18px;margin:18px 0 8px;color:#0b5d4b}}
ol{{margin:0;padding-left:1.3em}} li{{margin-bottom:7px}}
.caja{{background:#f3f6f4;border-radius:8px;padding:12px 14px;margin-top:16px}}
</style></head><body>
<p class="marca">Re<span>poner</span></p>
<h1>Pídale a {nombre} sin que se le acabe nada</h1>
<p class="sub">{html.escape(", ".join(detalles).capitalize())}.</p>
<div class="fila"><div class="qr">{qr_svg(url)}</div><div>
<p style="margin:0 0 6px;font-size:18px;font-weight:700">Escanee con la cámara del teléfono</p>
<p style="margin:0 0 8px">o escriba esta dirección en el navegador:</p><p class="url" style="margin:0">{html.escape(url)}</p></div></div>
<h2>Cómo se usa</h2>
<ol>
<li><b>Toque "Agregar a mi bodega".</b> Los productos de {nombre} quedan cargados con su precio y su empaque.</li>
<li><b>Cuente el estante dos veces por semana.</b> Escriba cuántas unidades hay de cada producto. Son unos 2 minutos.</li>
<li><b>Mire la pestaña Pedido.</b> Le dice qué pedir y cuánto. Toque "Enviar por WhatsApp" y el pedido sale escrito.</li>
<li><b>Toque "Ya lo pedí".</b> Cuando llegue la mercancía, toque "Llegó".</li>
</ol>
<div class="caja"><b>Es gratis y sus datos son suyos.</b> Todo se guarda solo en su teléfono. Ni {nombre} ni nadie más ve su inventario ni sus ventas.</div>
<div class="caja">Agréguela a la pantalla de inicio: menú del navegador, "Agregar a pantalla de inicio". Después abre sin internet.</div>
</body></html>"""
    destino = os.path.join(raiz, "docs", "volantes"); os.makedirs(destino, exist_ok=True)
    ruta_html = os.path.join(destino, slug + ".html"); ruta_pdf = os.path.join(destino, slug + ".pdf")
    open(ruta_html, "w", encoding="utf-8").write(pagina)
    js = ("const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();"
          "await p.goto('file://'+process.argv[1]);await p.pdf({path:process.argv[2],format:'Letter',printBackground:true});await b.close();})()")
    subprocess.run(["node", "-e", js, ruta_html, ruta_pdf], check=True, cwd=raiz)
    print("Volante listo:", os.path.relpath(ruta_pdf, raiz))

if __name__ == "__main__":
    main()
