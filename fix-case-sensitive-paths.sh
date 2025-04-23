#!/bin/bash

# Cambia a la carpeta raíz del proyecto
cd "$(dirname "$0")"

echo "Renombrando archivos problemáticos..."

# Lista de archivos a renombrar: origen y destino
declare -A FILES_TO_RENAME=(
  ["/app/congrats/[resource_id]/components/RRSSButton.tsx"]="/app/congrats/[resource_id]/components/_RRSSButton.tsx"
  #["app/register/[resource_id]/components/splashLoaderModal.tsx"]="app/register/[resource_id]/components/SplashLoaderModal.tsx"
  #["app/register/[resource_id]/components/registerFormScreen.tsx"]="app/register/[resource_id]/components/RegisterFormScreen.tsx"
)

for SRC in "${!FILES_TO_RENAME[@]}"; do
  DEST="${FILES_TO_RENAME[$SRC]}"
  
  if [ -f "$SRC" ]; then
    echo "Moviendo $SRC -> $DEST"
    mv "$SRC" "$DEST"
  else
    echo "Archivo no encontrado: $SRC"
  fi
done

echo "Actualizando git..."
git add .
git commit -m "Fix case-sensitive path issues for Next.js deploy"
#git push

echo "✅ ¡Listo! Ahora hacé deploy nuevamente en Vercel."
