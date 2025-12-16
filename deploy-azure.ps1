# Azure Sunucu Deployment Script
# Kullanım: .\deploy-azure.ps1

$SERVER_IP = "20.120.226.71"
$SERVER_USER = "azureuser"
$SERVER_PASS = "Deneme123!!!"
$PROJECT_DIR = "/var/www/nesil-bahce-baglar"

Write-Host "🚀 Azure Sunucuya Deployment Başlıyor..." -ForegroundColor Green

# SSH ile bağlan ve komutları çalıştır
$sshCommands = @"
# 1. Sistem güncellemesi
echo '📦 Sistem güncelleniyor...'
sudo apt-get update -y
sudo apt-get upgrade -y

# 2. Node.js kurulumu
if ! command -v node &> /dev/null; then
    echo '📦 Node.js kuruluyor...'
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# 3. PM2 kurulumu
if ! command -v pm2 &> /dev/null; then
    echo '📦 PM2 kuruluyor...'
    sudo npm install -g pm2
fi

# 4. Git kurulumu
if ! command -v git &> /dev/null; then
    echo '📦 Git kuruluyor...'
    sudo apt-get install -y git
fi

# 5. MySQL kurulumu
if ! command -v mysql &> /dev/null; then
    echo '📦 MySQL kuruluyor...'
    sudo apt-get install -y mysql-server
    sudo systemctl start mysql
    sudo systemctl enable mysql
fi

# 6. Nginx kurulumu
if ! command -v nginx &> /dev/null; then
    echo '📦 Nginx kuruluyor...'
    sudo apt-get install -y nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
fi

# 7. Proje dizinini oluştur
echo '📁 Proje dizini oluşturuluyor...'
sudo mkdir -p $PROJECT_DIR
sudo mkdir -p $PROJECT_DIR/server/uploads
sudo mkdir -p $PROJECT_DIR/whatsapp-session
sudo mkdir -p /var/log/nesil-bahce
sudo chown -R $USER:$USER $PROJECT_DIR
sudo chown -R $USER:$USER /var/log/nesil-bahce

# 8. Firewall ayarları
echo '🔥 Firewall ayarlanıyor...'
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3001/tcp
sudo ufw --force enable

echo '✅ Temel kurulum tamamlandı!'
"@

# SSH ile komutları çalıştır
Write-Host "`n📡 Sunucuya bağlanılıyor..." -ForegroundColor Yellow
$sshCommands | sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" bash

Write-Host "`n📤 Proje dosyaları gönderiliyor..." -ForegroundColor Yellow

# Projeyi tar ile sıkıştır ve gönder
$tempTar = "$env:TEMP\nesil-bahce-baglar.tar.gz"
Write-Host "Proje sıkıştırılıyor..." -ForegroundColor Cyan

# Git ignore ve node_modules hariç dosyaları gönder
Get-ChildItem -Path . -Exclude node_modules,.git,dist,dist-server,*.log | Compress-Archive -DestinationPath $tempTar -Force

# SCP ile gönder
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no $tempTar "$SERVER_USER@${SERVER_IP}:/tmp/"

# Sunucuda aç ve kur
$deployCommands = @"
cd /tmp
tar -xzf nesil-bahce-baglar.tar.gz -C $PROJECT_DIR --strip-components=1 || true
cd $PROJECT_DIR

# Bağımlılıkları yükle
echo '📦 Bağımlılıklar yükleniyor...'
npm install

# Backend build
echo '🔨 Backend build ediliyor...'
npx tsc --project tsconfig.server.json --outDir dist-server

# Frontend build
echo '🔨 Frontend build ediliyor...'
npm run build:prod

# .env dosyası oluştur (eğer yoksa)
if [ ! -f "$PROJECT_DIR/server/.env" ]; then
    echo '📝 .env dosyası oluşturuluyor...'
    cat > $PROJECT_DIR/server/.env << 'ENVEOF'
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nesil_bahce_baglar
PORT=3001
NODE_ENV=production
BASE_URL=http://$SERVER_IP
FRONTEND_URL=http://$SERVER_IP
JWT_SECRET=$(openssl rand -hex 32)
ENVEOF
    echo '⚠️  Lütfen server/.env dosyasını düzenleyin!'
fi

# Veritabanını oluştur
echo '🗄️  Veritabanı oluşturuluyor...'
if [ -f "$PROJECT_DIR/server/config/db-init.sql" ]; then
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS nesil_bahce_baglar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" || true
    mysql -u root nesil_bahce_baglar < $PROJECT_DIR/server/config/db-init.sql || true
    mysql -u root nesil_bahce_baglar < $PROJECT_DIR/server/config/db-update.sql || true
fi

# PM2 ile başlat
echo '🚀 PM2 ile servisler başlatılıyor...'
cd $PROJECT_DIR
pm2 delete all 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup

echo '✅ Deployment tamamlandı!'
"@

Write-Host "`n🔧 Sunucuda kurulum yapılıyor..." -ForegroundColor Yellow
$deployCommands | sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_IP" bash

Write-Host "`n✅ Deployment tamamlandı!" -ForegroundColor Green
Write-Host "`n📝 Sonraki adımlar:" -ForegroundColor Yellow
Write-Host "1. SSH ile sunucuya bağlan: ssh $SERVER_USER@$SERVER_IP" -ForegroundColor Cyan
Write-Host "2. .env dosyasını düzenle: nano $PROJECT_DIR/server/.env" -ForegroundColor Cyan
Write-Host "3. MySQL şifresini ayarla ve .env dosyasını güncelle" -ForegroundColor Cyan
Write-Host "4. Nginx config'i ayarla" -ForegroundColor Cyan
Write-Host "5. PM2 durumunu kontrol et: pm2 status" -ForegroundColor Cyan

