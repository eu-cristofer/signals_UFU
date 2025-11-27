#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status, 
# treat unset variables as an error, and fail if any command in a pipeline fails
set -euo pipefail

# Get the absolute path to the directory containing this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if command -v mmdc >/dev/null 2>&1; then
  MERMAID_CMD=(mmdc)
elif command -v npx >/dev/null 2>&1; then
  MERMAID_CMD=(npx @mermaid-js/mermaid-cli)
else
  echo "Install mmdc globally or ensure npx is available." >&2
  exit 1
fi

shopt -s nullglob
for mermaid_file in *.mermaid; do
  output_file="${mermaid_file%.mermaid}.png"
  echo "Rendering $mermaid_file -> $output_file"
  "${MERMAID_CMD[@]}" -i "$mermaid_file" -o "$output_file"
done

# Disable nullglob to return shell behavior to default
shopt -u nullglob
