"""Genera el código QR de la app: una imagen para compartir y el dibujo que la app lleva dentro.

Uso: python3 herramientas/generar_qr.py
- Escribe docs/artes/repiq-qr.png (tarjeta con el código, lista para enviar o imprimir).
- Actualiza el símbolo del QR dentro de reponer/app.html, entre las marcas <!--qr--> y <!--/qr-->.
Después hay que correr ./build.sh. Necesita qrcode (Python) y playwright (Node).
"""
import io, os, re, subprocess
import qrcode, qrcode.image.svg

URL = "https://jasu0906.github.io/claude-trabaja-/"
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

img = qrcode.make(URL, image_factory=qrcode.image.svg.SvgPathImage, box_size=10, border=0,
                  error_correction=qrcode.constants.ERROR_CORRECT_M)
b = io.BytesIO(); img.save(b); svg = b.getvalue().decode()
caja = re.search(r'viewBox="([^"]+)"', svg).group(1)
trazo = re.search(r'<path[^>]* d="([^"]+)"', svg).group(1)

# 1. El símbolo dentro de la app
app = os.path.join(RAIZ, "reponer", "app.html")
s = open(app, encoding="utf-8").read()
simbolo = f'<!--qr--><symbol id="i-qr" viewBox="{caja}"><path d="{trazo}" fill="#0b1230" stroke="none"/></symbol><!--/qr-->'
assert "<!--qr-->" in s and "<!--/qr-->" in s, "faltan las marcas del QR en reponer/app.html"
s = re.sub(r"<!--qr-->.*?<!--/qr-->", lambda m: simbolo, s, flags=re.S)
open(app, "w", encoding="utf-8").write(s)

# 2. La imagen para compartir
logo = open(os.path.join(RAIZ, "icon.svg"), encoding="utf-8").read()
pagina = f"""<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
*{{box-sizing:border-box;margin:0}}
body{{width:1080px;height:1350px;background:#0b4fc4;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;display:flex;align-items:center;justify-content:center}}
.tarjeta{{width:900px;background:#fff;border-radius:56px;padding:64px;display:flex;flex-direction:column;align-items:center;gap:36px;color:#0b1230;text-align:center}}
.marca{{display:flex;align-items:center;gap:18px;font-size:56px;font-weight:800;letter-spacing:-.02em}}
.marca svg{{width:76px;height:76px}}
.qr{{width:640px;height:640px}}
h1{{font-size:54px;line-height:1.1;letter-spacing:-.02em}}
p{{font-size:32px;color:#4f5a78;line-height:1.3}}
.url{{font-size:30px;font-weight:700;color:#0b4fc4}}
</style></head><body><div class="tarjeta">
<div class="marca">{logo}<span>REPI<span style="color:#c4f27e">Q</span></span></div>
<svg class="qr" viewBox="{caja}"><path d="{trazo}" fill="#0b1230"/></svg>
<h1>Escanea y abre la app</h1>
<p>Gratis para bodegas y abastos.<br>Fiado digital y pedido según tu plata del día.</p>
<p class="url">jasu0906.github.io/claude-trabaja-</p>
</div></body></html>"""
destino = os.path.join(RAIZ, "docs", "artes"); os.makedirs(destino, exist_ok=True)
tmp = os.path.join(destino, "_qr.html"); open(tmp, "w", encoding="utf-8").write(pagina)
js = ("const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});"
      "await p.goto('file://'+process.argv[1]);await p.screenshot({path:process.argv[2]});await b.close();})()")
subprocess.run(["node", "-e", js, tmp, os.path.join(destino, "repiq-qr.png")], check=True, cwd=RAIZ)
os.remove(tmp)
print("QR listo: docs/artes/repiq-qr.png y símbolo actualizado en reponer/app.html")
