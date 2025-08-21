#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-http://localhost:3000}"

need() { command -v "$1" >/dev/null 2>&1 || { echo "Brak narzędzia: $1" >&2; exit 1; }; }
need curl; need jq;

echo "API_URL: $API_URL"
echo

# Pomocnicza funkcja POST z pełnym logowaniem błędów
post_json_diag() {
  # $1 = endpoint, $2 = json
  local endpoint="$1" json="$2"
  local tmp_resp
  tmp_resp="$(mktemp)"
  local code
  code=$(curl -sS -o "$tmp_resp" -w "%{http_code}" -H "Content-Type: application/json" \
              -X POST "$API_URL$endpoint" -d "$json" || true)
  echo "HTTP $code"
  echo "Body:"
  cat "$tmp_resp"; echo
  echo "$tmp_resp"
}

echo "=== 0) Szybki GET /authors (czy endpoint istnieje?) ==="
curl -sS "$API_URL/authors" | jq . || true
echo

echo "=== 1) Próba utworzenia autora (diagnostyka) ==="
ts="$(date +%s)"
EMAIL="adam-${ts}@example.com"
JSON_AUTHOR="$(jq -cn --arg name "Adam Mickiewicz" --arg email "$EMAIL" \
               '{name:$name, email:$email}')"
tmpfile="$(post_json_diag "/authors" "$JSON_AUTHOR")"
echo

echo "=== 2) Jeżeli 400 – spróbujmy minimalny payload tylko z name ==="
JSON_AUTHOR_MIN="$(jq -cn --arg name "Adam Mickiewicz" '{name:$name}')"
post_json_diag "/authors" "$JSON_AUTHOR_MIN" >/dev/null
echo

echo "=== 3) A może inna ścieżka? /api/authors ==="
post_json_diag "/api/authors" "$JSON_AUTHOR" >/dev/null
echo

echo "=== 4) Wypisz nagłówki serwera (OPTIONS) ==="
curl -sS -i -X OPTIONS "$API_URL/authors" || true
echo
