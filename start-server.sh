#!/bin/bash

# Safetagram Test Server
# Bu script'i çalıştırarak local test server'ı başlatabilirsiniz

echo "🚀 Safetagram Test Server başlatılıyor..."
echo "📡 Server: http://localhost:8000"
echo "🔧 Dev mod (formu atla): http://localhost:8000/?dev=1"
echo "⏹️  Durdurmak için: Ctrl+C"
echo ""

# Python3 HTTP Server başlat
python3 -m http.server 8000
