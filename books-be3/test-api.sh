#!/bin/bash
set -e

API_URL="http://localhost:3000"

echo "=== 1. Dodaj autora ==="
EMAIL="test$(date +%s)@example.com"
AUTHOR=$(curl -s -X POST "$API_URL/authors" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Adam Mickiewicz\", \"email\": \"$EMAIL\"}")

echo "Response: $AUTHOR"

AUTHOR_ID=$(echo $AUTHOR | jq -r '.id')

echo "Utworzony autor ma ID: $AUTHOR_ID"
echo

echo "=== 2. Lista autorów ==="
curl -s "$API_URL/authors" | jq .
echo

echo "=== 3. Dodaj książkę ==="
BOOK=$(curl -s -X POST "$API_URL/books" \
  -H "Content-Type: application/json" \
  -d "{\"title\": \"Pan Tadeuszz\", \"genre\": \"Poemat\", \"authorId\": $AUTHOR_ID}")

echo "Response: $BOOK"
echo

echo "=== 4. Lista książek ==="
curl -s "$API_URL/books" | jq .
echo

