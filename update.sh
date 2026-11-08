#!/bin/bash
set -e

echo "=========================================================="
echo "🚀 [1/3] Menarik pembaruan kode terbaru BELSISKOM dari GitHub..."
echo "=========================================================="
git pull origin main

echo ""
echo "=========================================================="
echo "📦 [2/3] Membangun ulang dan me-restart container BELSISKOM..."
echo "=========================================================="
docker compose up -d --build

echo ""
echo "=========================================================="
echo "🧹 [3/3] Membersihkan image cache yang tidak terpakai..."
echo "=========================================================="
docker image prune -f

echo ""
echo "=========================================================="
echo "✨ SUKSES! BELSISKOM berhasil diperbarui di Mini PC!"
echo "🌐 URL Akses: https://belsiskom.an.my.id (Port Host: 4020)"
echo "=========================================================="
