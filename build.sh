#!/bin/sh
# Genera index.html (versión instalable, funciona sin internet) a partir de reponer/app.html
set -e
cd "$(dirname "$0")"
{
  printf '%s\n' '<!doctype html>' '<html lang="es">' '<head>' '<meta charset="utf-8">' \
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' \
    '<meta name="theme-color" content="#0b4fc4">' \
    '<meta name="description" content="Gratis para bodegas y abastos: anota el fiado y REPIQ te dice qué reponer, cuánto y a quién, con la plata que tienes hoy. Funciona sin internet.">' \
    '<meta property="og:title" content="REPIQ">' \
    '<meta property="og:description" content="Qué reponer, cuánto y a quién, con la plata que tienes hoy. Gratis y sin internet.">' \
    '<meta property="og:type" content="website">' \
    '<link rel="apple-touch-icon" href="icon-192.png">' \
    '<link rel="manifest" href="manifest.webmanifest">' '<link rel="icon" href="icon.svg">' '</head>' '<body>' '<script>window.REPONER_SITIO=1</script>' '<script src="contacto.js"></script>'
  cat reponer/app.html
  printf '%s\n' "<script>if('serviceWorker' in navigator && location.protocol==='https:'){navigator.serviceWorker.register('sw.js').catch(function(){});}</script>" '</body>' '</html>'
} > index.html
