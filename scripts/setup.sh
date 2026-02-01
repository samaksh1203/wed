#!/usr/bin/env bash
set -euo pipefail
ACTION="${1:-dev}"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js not found. Install Node >= 18." >&2; exit 1
fi

VER=$(node -v | sed 's/^v//')
MAJOR=${VER%%.*}
if (( MAJOR < 18 )); then
  echo "Node.js $VER found. Need >= 18" >&2; exit 1
fi

if [ ! -f package.json ]; then
  echo "package.json missing. Scaffolding Vite + React..."
  npm create vite@latest . -- --template react
fi

echo "Installing dependencies..."
npm install

case "$ACTION" in
  dev) echo "Starting dev server..."; npm run dev;;
  build) echo "Building..."; npm run build;;
  preview) echo "Previewing build..."; npm run preview;;
  deploy) echo "Deploying..."; npm run deploy;;
  check) echo "Environment OK. Node $VER";;
  *) echo "Unknown action: $ACTION"; exit 2;;
esac
