#!/usr/bin/env bash
set -euo pipefail

API_URL="http://localhost:3000"

need() { command -v "$1" >/dev/null 2>&1 || { echo "Brak narzędzia: $1" >&2; exit 1; }; }
need curl; need jq

echo "API_URL: $API_URL"
echo

# 10 autorów
AUTHORS=(
  "Adam Mickiewicz"
  "Juliusz Słowacki"
  "Bolesław Prus"
  "Henryk Sienkiewicz"
  "Eliza Orzeszkowa"
  "Maria Konopnicka"
  "Stanisław Lem"
  "Wisława Szymborska"
  "Czesław Miłosz"
  "Olga Tokarczuk"
)

# 15 książek (tytuł|gatunek)
BOOKS=(
  "Pan Tadeusz|Poemat"
  "Dziady|Dramat"
  "Lalka|Powieść"
  "Quo Vadis|Powieść historyczna"
  "Nad Niemnem|Powieść"
  "Opowieści o pilocie Pirxie|SF"
  "Solaris|SF"
  "Wiersze wybrane|Poezja"
  "Ziemia Ulro|Esej"
  "Bieguni|Powieść"
  "Księgi Jakubowe|Powieść historyczna"
  "Balladyna|Dramat"
  "Faraon|Powieść"
  "Krzyżacy|Powieść historyczna"
  "Sto lat samotności (tłum.)|Powieść"
)

author_ids=()
ts="$(date +%s)"

echo "=== 1) Tworzenie autorów ==="
for i in "${!AUTHORS[@]}"; do
  name="${AUTHORS[$i]}"
  email="autor${i}-${ts}@example.com"
  resp=$(curl -s -f -X POST "$API_URL/authors" \
      -H "Content-Type: application/json" \
      -d "{\"name\":\"$name\",\"email\":\"$email\"}")
  id=$(echo "$resp" | jq -r '.id')
  author_ids+=("$id")
  echo "  Dodano autora [$id]: $name"
done
echo

echo "=== 2) Lista autorów ==="
curl -s "$API_URL/authors" | jq .
echo

echo "=== 3) Tworzenie książek ==="
for i in "${!BOOKS[@]}"; do
  title="${BOOKS[$i]%%|*}"
  genre="${BOOKS[$i]##*|}"
  idx=$(( i % ${#author_ids[@]} ))
  author_id="${author_ids[$idx]}"
  resp=$(curl -s -f -X POST "$API_URL/books" \
      -H "Content-Type: application/json" \
      -d "{\"title\":\"$title\",\"genre\":\"$genre\",\"authorId\":$author_id}")
  book_id=$(echo "$resp" | jq -r '.id')
  echo "  Dodano książkę [$book_id]: \"$title\" (autorId=$author_id)"
done
echo

echo "=== 4) Lista książek ==="
curl -s "$API_URL/books" | jq .
echo

echo "Zakończono: dodano ${#AUTHORS[@]} autorów i ${#BOOKS[@]} książek."
