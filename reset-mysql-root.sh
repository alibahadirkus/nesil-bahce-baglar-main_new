#!/bin/bash

# MySQL root şifresini sıfırlama script'i

set -e

PROJECT_DIR="/var/www/nesil-bahce-baglar"
DB_PASSWORD="Deneme123!!!"

echo "🛑 MySQL servisi durduruluyor..."
sudo systemctl stop mysql

echo "🔧 MySQL güvenli modda başlatılıyor..."
sudo mysqld_safe --skip-grant-tables --skip-networking &

# MySQL'in başlamasını bekle
sleep 5

echo "🔑 Root şifresi ayarlanıyor..."
mysql -u root << 'MYSQLSCRIPT'
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Deneme123!!!';
FLUSH PRIVILEGES;
MYSQLSCRIPT

echo "🛑 MySQL güvenli modda durduruluyor..."
sudo pkill mysqld
sleep 2

echo "🚀 MySQL normal modda başlatılıyor..."
sudo systemctl start mysql
sleep 3

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
mysql -u root -p$DB_PASSWORD -e "SELECT 'MySQL bağlantısı başarılı!' as Status, DATABASE() as CurrentDB;"

