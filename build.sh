#!/bin/sh
# Genera index.html (versión instalable, funciona sin internet) a partir de reponer/app.html
set -e
cd "$(dirname "$0")"
{
  printf '%s\n' '<!doctype html>' '<html lang="es">' '<head>' '<meta charset="utf-8">' \
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' \
    '<meta name="theme-color" content="#0b5d4b">' \
    '<meta name="description" content="Gratis para bodegas y abastos: cuenta el estante y Reponer te dice qué pedir, cuánto y a quién. Funciona sin internet.">' \
    '<meta property="og:title" content="Reponer">' \
    '<meta property="og:description" content="Qué pedir hoy, cuánto y a quién. Gratis y sin internet, para bodegas y abastos.">' \
    '<meta property="og:type" content="website">' \
    '<link rel="apple-touch-icon" href="icon-192.png">' \
    '<link rel="manifest" href="manifest.webmanifest">' '<link rel="icon" href="icon.svg">' '</head>' '<body>'
  cat reponer/app.html
  printf '%s\n' "<script>if('serviceWorker' in navigator && location.protocol==='https:'){navigator.serviceWorker.register('sw.js').catch(function(){});}</script>" '</body>' '</html>'
} > index.html
