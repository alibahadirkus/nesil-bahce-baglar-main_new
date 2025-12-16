#!/bin/bash

# Nginx yapılandırma script'i

set -e

PROJECT_DIR="/var/www/nesil-bahce-baglar"

echo "🌐 Nginx yapılandırması ayarlanıyor..."

# Nginx config dosyasını kopyala
sudo cp $PROJECT_DIR/nginx.conf /etc/nginx/sites-available/nesil-bahce-baglar

# Eski default site'ı devre dışı bırak
sudo rm -f /etc/nginx/sites-enabled/default

# Yeni site'ı aktif et
sudo ln -sf /etc/nginx/sites-available/nesil-bahce-baglar /etc/nginx/sites-enabled/

# Nginx config'i test et
echo "🔍 Nginx yapılandırması test ediliyor..."
sudo nginx -t

# Nginx'i yeniden yükle
echo "🔄 Nginx yeniden yükleniyor..."
sudo systemctl reload nginx

echo "✅ Nginx yapılandırması tamamlandı!"
echo ""
echo "📊 Servis durumları:"
echo "PM2:"
pm2 status
echo ""
echo "Nginx:"
sudo systemctl status nginx --no-pager | head -5

