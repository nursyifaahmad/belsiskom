#!/bin/sh
set -e

echo "=========================================================="
echo "🚀 Memulai Container BELSISKOM (Port 3000 -> Host 4020)..."
echo "=========================================================="

mkdir -p /app/data

export PRISMA_QUERY_ENGINE_LIBRARY=/app/prisma/engines/libquery_engine-linux-musl-openssl-3.0.x.so.node
export PRISMA_SCHEMA_ENGINE_BINARY=/app/prisma/engines/schema-engine-linux-musl-openssl-3.0.x

echo "==> [1/3] Menyelaraskan skema database SQLite..."
npx prisma db push --skip-generate

echo "==> [2/3] Menjalankan seed inisialisasi akun guru..."
node scripts/seed.js

echo "==> [3/3] Menjalankan server aplikasi BELSISKOM..."
exec node server.js
