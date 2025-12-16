#!/bin/bash

# MySQL'i yeniden kurma script'i

set -e

PROJECT_DIR="/var/www/nesil-bahce-baglar"
DB_PASSWORD="Deneme123!!!"

echo "🛑 MySQL kaldırılıyor..."
sudo systemctl stop mysql
sudo apt-get remove --purge -y mysql-server mysql-client mysql-common mysql-server-core-* mysql-client-core-*
sudo rm -rf /var/lib/mysql
sudo rm -rf /var/log/mysql
sudo rm -rf /etc/mysql

echo "📦 MySQL yeniden kuruluyor..."
sudo apt-get update
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y mysql-server

echo "🚀 MySQL başlatılıyor..."
sudo systemctl start mysql
sudo systemctl enable mysql
sleep 3

echo "🔧 MySQL root şifresi ayarlanıyor..."
sudo mysql << 'MYSQLSCRIPT'
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Deneme123!!!';
FLUSH PRIVILEGES;
MYSQLSCRIPT

echo "✅ MySQL root şifresi ayarlandı"

echo ""
echo "🗄️  Veritabanı oluşturuluyor..."
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

# .env dosyasını güncelle
echo ""
echo "📝 .env dosyası güncelleniyor..."
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

