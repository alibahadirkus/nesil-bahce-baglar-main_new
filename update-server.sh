#!/bin/bash

# Sunucu güncelleme scripti
# GitHub'dan güncel kodu çek, build et ve servisleri yeniden başlat

set -e

echo "🚀 Sunucu güncelleme başlatılıyor..."

# Proje dizinine git
cd /var/www/nesil-bahce-baglar || {
    echo "❌ Proje dizini bulunamadı!"
    exit 1
}

echo "📥 GitHub'dan güncel kodu çekiliyor..."
git pull origin main || {
    echo "❌ Git pull başarısız!"
    exit 1
}

echo "📦 Backend bağımlılıkları güncelleniyor..."
cd server
npm install

echo "🔨 Backend build ediliyor..."
npm run build

echo "📦 Frontend bağımlılıkları güncelleniyor..."
cd ..
npm install

echo "🔨 Frontend build ediliyor..."
npm run build

echo "🗄️ Veritabanı güncellemeleri kontrol ediliyor..."
# Veritabanı güncellemelerini çalıştır (eğer varsa)
if [ -f "server/config/db-update.sql" ]; then
    echo "Veritabanı güncellemeleri uygulanıyor..."
    mysql -u nesil_bahce_user -p'Deneme123!!!' nesil_bahce_baglar < server/config/db-update.sql || {
        echo "⚠️ Veritabanı güncellemesi başarısız olabilir (tablolar zaten var olabilir)"
    }
fi

echo "🔄 PM2 servisleri yeniden başlatılıyor..."
pm2 restart nesil-bahce-backend
pm2 restart nesil-bahce-frontend

echo "✅ Güncelleme tamamlandı!"
echo "📊 PM2 durumu:"
pm2 status
