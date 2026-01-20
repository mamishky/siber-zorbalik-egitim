#!/bin/bash

# .env Dosyası Oluşturma Script'i
# Kullanım: bash ENV_SETUP.sh

echo "🔑 .env dosyası oluşturuluyor..."

# .env dosyası var mı kontrol et
if [ -f .env ]; then
    echo "⚠️  .env dosyası zaten mevcut!"
    echo "Üzerine yazmak ister misiniz? (y/n)"
    read -r response
    if [ "$response" != "y" ]; then
        echo "❌ İşlem iptal edildi."
        exit 0
    fi
fi

# .env dosyası oluştur
cat > .env << 'EOF'
# Google Gemini API Key
GEMINI_API_KEY=AIzaSyBtSxOOQHN06ON_kgKNIvRPntlYHclJ2cc
EOF

echo "✅ .env dosyası başarıyla oluşturuldu!"
echo ""
echo "📄 İçerik:"
cat .env
echo ""
echo "🔒 NOT: Bu dosya .gitignore'a eklenmiştir, Git'e push edilmeyecek."
