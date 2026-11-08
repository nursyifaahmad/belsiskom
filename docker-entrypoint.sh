#!/bin/sh
set -e

echo "=========================================================="
echo "🚀 Memulai Container BELSISKOM (Port 3000 -> Host 4020)..."
echo "=========================================================="

mkdir -p /app/data

echo "==> [1/3] Menyelaraskan skema database SQLite..."
npx prisma db push --skip-generate

echo "==> [2/3] Menjalankan seed inisialisasi akun guru..."
node scripts/seed.js

echo "==> [3/3] Menjalankan server aplikasi BELSISKOM..."
exec node server.js
