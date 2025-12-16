#!/bin/bash

# MySQL yeni kullanıcı oluşturma script'i

set -e

PROJECT_DIR="/var/www/nesil-bahce-baglar"
DB_USER="nesil_bahce_user"
DB_PASSWORD="Deneme123!!!"
DB_NAME="nesil_bahce_baglar"

echo "🔍 MySQL durumu kontrol ediliyor..."
sudo systemctl status mysql --no-pager | head -5

echo ""
echo "🔧 Yeni MySQL kullanıcısı oluşturuluyor..."

# Önce MySQL'e erişmeyi deneyelim - farklı yöntemler
# Method 1: sudo mysql (auth_socket ile)
sudo mysql << 'MYSQLSCRIPT' || echo "Method 1 başarısız"
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
SELECT 'Kullanıcı oluşturuldu!' as Status;
MYSQLSCRIPT

# Eğer yukarıdaki çalışmazsa, root şifresini değiştirmeyi deneyelim
echo ""
echo "🔧 Root şifresi ayarlanıyor..."
sudo mysql << 'MYSQLSCRIPT' || echo "Root şifre ayarlama başarısız"
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Deneme123!!!';
FLUSH PRIVILEGES;
MYSQLSCRIPT

echo ""
echo "🗄️  Veritabanı oluşturuluyor..."

# Veritabanını oluştur (root ile)
mysql -u root -pDeneme123!!! << EOF 2>/dev/null || mysql -u $DB_USER -p$DB_PASSWORD << EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
EOF

echo "✅ Veritabanı oluşturuldu"

# SQL dosyalarını çalıştır
if [ -f "$PROJECT_DIR/server/config/db-init.sql" ]; then
    echo ""
    echo "📝 db-init.sql çalıştırılıyor..."
    mysql -u root -pDeneme123!!! $DB_NAME < $PROJECT_DIR/server/config/db-init.sql 2>/dev/null || \
    mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME < $PROJECT_DIR/server/config/db-init.sql
    echo "✅ db-init.sql tamamlandı"
fi

if [ -f "$PROJECT_DIR/server/config/db-update.sql" ]; then
    echo ""
    echo "📝 db-update.sql çalıştırılıyor..."
    mysql -u root -pDeneme123!!! $DB_NAME < $PROJECT_DIR/server/config/db-update.sql 2>/dev/null || \
    mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME < $PROJECT_DIR/server/config/db-update.sql
    echo "✅ db-update.sql tamamlandı"
fi

# .env dosyasını güncelle
echo ""
echo "📝 .env dosyası güncelleniyor..."
cat > $PROJECT_DIR/server/.env << ENVEOF
DB_HOST=localhost
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
DB_NAME=$DB_NAME
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

