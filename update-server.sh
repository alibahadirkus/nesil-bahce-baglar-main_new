#!/bin/bash

# Sunucu güncelleme script'i

set -e

PROJECT_DIR="/var/www/nesil-bahce-baglar"

echo "🔄 Sunucu güncelleniyor..."

cd $PROJECT_DIR

echo "📥 GitHub'dan güncel kod çekiliyor..."
git fetch origin
git reset --hard origin/main

echo "📦 Bağımlılıklar kontrol ediliyor..."
npm install

echo "🔨 Backend build ediliyor..."
npx tsc --project tsconfig.server.json --outDir dist-server

echo "🔨 Frontend build ediliyor..."
npm run build:prod

echo "📝 .env dosyası kontrol ediliyor..."
if [ ! -f "$PROJECT_DIR/dist-server/.env" ]; then
    cp $PROJECT_DIR/server/.env $PROJECT_DIR/dist-server/.env
    echo "✅ .env dosyası kopyalandı"
fi

echo "🔄 PM2 servisleri yeniden başlatılıyor..."
pm2 restart all

echo "✅ Güncelleme tamamlandı!"
echo ""
echo "📊 PM2 durumu:"
pm2 status

echo ""
echo "🔍 Son loglar:"
pm2 logs --lines 5 --nostream

