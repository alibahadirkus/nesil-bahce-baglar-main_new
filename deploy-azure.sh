#!/bin/bash

# Azure Sunucu Deployment Script
# Kullanım: Bu script'i Azure sunucusunda çalıştırın

set -e

SERVER_IP="20.120.226.71"
SERVER_USER="azureuser"
GITHUB_REPO="https://github.com/alibahadirkus/nesil-bahce-baglar-main_new.git"
PROJECT_DIR="/var/www/nesil-bahce-baglar"

echo "🚀 Azure Sunucuya Deployment Başlıyor..."

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Sistem güncellemesi
echo -e "${GREEN}📦 Sistem güncelleniyor...${NC}"
sudo apt-get update -y
sudo apt-get upgrade -y

# 2. Node.js kurulumu
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}📦 Node.js kuruluyor...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi
echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"

# 3. PM2 kurulumu
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}📦 PM2 kuruluyor...${NC}"
    sudo npm install -g pm2
fi
echo -e "${GREEN}✅ PM2 kuruldu${NC}"

# 4. Git kurulumu
if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}📦 Git kuruluyor...${NC}"
    sudo apt-get install -y git
fi

# 5. MySQL kurulumu
if ! command -v mysql &> /dev/null; then
    echo -e "${YELLOW}📦 MySQL kuruluyor...${NC}"
    sudo apt-get install -y mysql-server
    sudo systemctl start mysql
    sudo systemctl enable mysql
    echo -e "${YELLOW}⚠️  MySQL root şifresini ayarlayın:${NC}"
    echo "sudo mysql_secure_installation"
fi

# 6. Nginx kurulumu
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}📦 Nginx kuruluyor...${NC}"
    sudo apt-get install -y nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
fi

# 7. Proje dizinini oluştur
echo -e "${GREEN}📁 Proje dizini oluşturuluyor...${NC}"
sudo mkdir -p $PROJECT_DIR
sudo mkdir -p $PROJECT_DIR/server/uploads
sudo mkdir -p $PROJECT_DIR/whatsapp-session
sudo mkdir -p /var/log/nesil-bahce
sudo chown -R $USER:$USER $PROJECT_DIR
sudo chown -R $USER:$USER /var/log/nesil-bahce

# 8. GitHub'dan projeyi çek
echo -e "${GREEN}📥 GitHub'dan proje çekiliyor...${NC}"
cd /tmp
if [ -d "$PROJECT_DIR/.git" ]; then
    echo -e "${GREEN}🔄 Proje güncelleniyor...${NC}"
    cd $PROJECT_DIR
    git fetch origin
    git reset --hard origin/main
else
    echo -e "${GREEN}📥 Proje klonlanıyor...${NC}"
    sudo rm -rf $PROJECT_DIR 2>/dev/null || true
    sudo git clone $GITHUB_REPO $PROJECT_DIR
    sudo chown -R $USER:$USER $PROJECT_DIR
fi

# 9. Bağımlılıkları yükle
echo -e "${GREEN}📦 Bağımlılıklar yükleniyor...${NC}"
cd $PROJECT_DIR
npm install

# 10. Backend build
echo -e "${GREEN}🔨 Backend build ediliyor...${NC}"
npx tsc --project tsconfig.server.json --outDir dist-server || echo "Build hatası, devam ediliyor..."

# 11. Frontend build
echo -e "${GREEN}🔨 Frontend build ediliyor...${NC}"
npm run build:prod || echo "Build hatası, devam ediliyor..."

# 12. .env dosyası oluştur (eğer yoksa)
if [ ! -f "$PROJECT_DIR/server/.env" ]; then
    echo -e "${YELLOW}📝 .env dosyası oluşturuluyor...${NC}"
    cat > $PROJECT_DIR/server/.env << 'ENVEOF'
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nesil_bahce_baglar
PORT=3001
NODE_ENV=production
BASE_URL=http://20.120.226.71
FRONTEND_URL=http://20.120.226.71
JWT_SECRET=change-this-to-a-secure-random-secret-key-min-32-chars
ENVEOF
    echo -e "${YELLOW}⚠️  Lütfen server/.env dosyasını düzenleyin!${NC}"
fi

# 13. Veritabanını oluştur
echo -e "${GREEN}🗄️  Veritabanı oluşturuluyor...${NC}"
if [ -f "$PROJECT_DIR/server/config/db-init.sql" ]; then
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS nesil_bahce_baglar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" || echo "Veritabanı oluşturma hatası"
    mysql -u root nesil_bahce_baglar < $PROJECT_DIR/server/config/db-init.sql || echo "db-init.sql hatası"
    if [ -f "$PROJECT_DIR/server/config/db-update.sql" ]; then
        mysql -u root nesil_bahce_baglar < $PROJECT_DIR/server/config/db-update.sql || echo "db-update.sql hatası"
    fi
fi

# 14. Firewall ayarları
echo -e "${GREEN}🔥 Firewall ayarlanıyor...${NC}"
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3001/tcp
sudo ufw --force enable || echo "Firewall zaten aktif"

# 15. PM2 ile servisleri başlat
echo -e "${GREEN}🚀 PM2 ile servisler başlatılıyor...${NC}"
cd $PROJECT_DIR
pm2 delete all 2>/dev/null || true
pm2 start ecosystem.config.cjs || echo "PM2 başlatma hatası"
pm2 save

# 16. PM2 startup
pm2 startup systemd -u $USER --hp /home/$USER || echo "PM2 startup hatası"

echo -e "${GREEN}✅ Deployment tamamlandı!${NC}"
echo -e "${YELLOW}Sonraki adımlar:${NC}"
echo "1. server/.env dosyasını düzenle: nano $PROJECT_DIR/server/.env"
echo "2. MySQL şifresini ayarla ve .env dosyasını güncelle"
echo "3. Nginx config'i ayarla"
echo "4. PM2 durumunu kontrol et: pm2 status"
echo "5. PM2 loglarını kontrol et: pm2 logs"

