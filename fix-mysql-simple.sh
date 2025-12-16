#!/bin/bash

# MySQL basit düzeltme script'i

set -e

PROJECT_DIR="/var/www/nesil-bahce-baglar"
DB_PASSWORD="Deneme123!!!"

echo "🔧 MySQL socket dizini oluşturuluyor..."
sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld

echo "🚀 MySQL servisi başlatılıyor..."
sudo systemctl start mysql
sleep 3

echo "🔧 MySQL root şifresi ayarlanıyor (sudo ile)..."
# Ubuntu'da MySQL 8.0+ için farklı bir yöntem
sudo mysql << 'MYSQLSCRIPT'
USE mysql;
UPDATE user SET plugin='mysql_native_password', authentication_string=PASSWORD('Deneme123!!!') WHERE User='root' AND Host='localhost';
FLUSH PRIVILEGES;
MYSQLSCRIPT

# Eğer yukarıdaki çalışmazsa, ALTER USER deneyelim
sudo mysql << 'MYSQLSCRIPT'
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Deneme123!!!';
FLUSH PRIVILEGES;
MYSQLSCRIPT

echo "✅ MySQL root şifresi ayarlandı"

echo ""
echo "🗄️  Veritabanı oluşturuluyor..."

# Veritabanını oluştur
mysql -u root -p$DB_PASSWORD << EOF
CREATE DATABASE IF NOT EXISTS nesil_bahce_baglar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
EOF

echo "✅ Veritabanı oluşturuldu"

# SQL dosyalarını çalıştır
if [ -f "$PROJECT_DIR/server/config/db-init.sql" ]; then
    echo ""
    echo "📝 db-init.sql çalıştırılıyor..."
    mysql -u root -p$DB_PASSWORD nesil_bahce_baglar < $PROJECT_DIR/server/config/db-init.sql
    echo "✅ db-init.sql tamamlandı"
fi

if [ -f "$PROJECT_DIR/server/config/db-update.sql" ]; then
    echo ""
    echo "📝 db-update.sql çalıştırılıyor..."
    mysql -u root -p$DB_PASSWORD nesil_bahce_baglar < $PROJECT_DIR/server/config/db-update.sql
    echo "✅ db-update.sql tamamlandı"
fi

echo ""
echo "✅ Veritabanı kurulumu tamamlandı!"

echo ""
echo "🔄 PM2 servisleri yeniden başlatılıyor..."
cd $PROJECT_DIR
pm2 restart all

echo ""
echo "✅ Tüm işlemler tamamlandı!"
echo ""
echo "📊 PM2 durumu:"
pm2 status

echo ""
echo "🔍 MySQL bağlantı testi:"
mysql -u root -p$DB_PASSWORD -e "SELECT 'MySQL bağlantısı başarılı!' as Status;"

