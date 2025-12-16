#!/bin/bash

# MySQL ve veritabanı kurulum script'i

set -e

PROJECT_DIR="/var/www/nesil-bahce-baglar"
DB_PASSWORD="Deneme123!!!"

echo "🔧 MySQL root şifresi ayarlanıyor..."

# MySQL root şifresini ayarla
sudo mysql << EOF
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$DB_PASSWORD';
FLUSH PRIVILEGES;
EOF

echo "✅ MySQL root şifresi ayarlandı"

echo "🗄️  Veritabanı oluşturuluyor..."

# Veritabanını oluştur
mysql -u root -p$DB_PASSWORD << EOF
CREATE DATABASE IF NOT EXISTS nesil_bahce_baglar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EOF

echo "✅ Veritabanı oluşturuldu"

# SQL dosyalarını çalıştır
if [ -f "$PROJECT_DIR/server/config/db-init.sql" ]; then
    echo "📝 db-init.sql çalıştırılıyor..."
    mysql -u root -p$DB_PASSWORD nesil_bahce_baglar < $PROJECT_DIR/server/config/db-init.sql
    echo "✅ db-init.sql tamamlandı"
fi

if [ -f "$PROJECT_DIR/server/config/db-update.sql" ]; then
    echo "📝 db-update.sql çalıştırılıyor..."
    mysql -u root -p$DB_PASSWORD nesil_bahce_baglar < $PROJECT_DIR/server/config/db-update.sql
    echo "✅ db-update.sql tamamlandı"
fi

echo "📝 .env dosyası güncelleniyor..."

# .env dosyasını güncelle
cat > $PROJECT_DIR/server/.env << ENVEOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=$DB_PASSWORD
DB_NAME=nesil_bahce_baglar
PORT=3001
NODE_ENV=production
BASE_URL=http://20.120.226.71
FRONTEND_URL=http://20.120.226.71
JWT_SECRET=$(openssl rand -hex 32)
ENVEOF

echo "✅ .env dosyası güncellendi"

echo "🔄 PM2 servisleri yeniden başlatılıyor..."
cd $PROJECT_DIR
pm2 restart all

echo "✅ Tüm işlemler tamamlandı!"
echo ""
echo "📊 PM2 durumu:"
pm2 status

