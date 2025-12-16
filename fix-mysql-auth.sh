#!/bin/bash

# MySQL authentication düzeltme script'i

set -e

PROJECT_DIR="/var/www/nesil-bahce-baglar"
DB_PASSWORD="Deneme123!!!"

echo "🔧 MySQL authentication yöntemi kontrol ediliyor..."

# Önce MySQL'in çalışıp çalışmadığını kontrol et
sudo systemctl status mysql --no-pager | head -3

echo ""
echo "🔧 MySQL root kullanıcısını auth_socket'ten mysql_native_password'e çeviriyoruz..."

# MySQL'e sudo ile bağlan ve authentication methodunu değiştir
sudo mysql << 'MYSQLSCRIPT'
SELECT user, host, plugin FROM mysql.user WHERE user='root';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Deneme123!!!';
FLUSH PRIVILEGES;
SELECT user, host, plugin FROM mysql.user WHERE user='root';
MYSQLSCRIPT

echo ""
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

