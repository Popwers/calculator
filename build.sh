#!/bin/sh
set -eu
cd "$(dirname "$0")"
bunx sass css/style.scss css/style.min.css --style=compressed --no-source-map
bunx esbuild js/index.tsx --minify --target=es2020 --outfile=js/index.min.js
