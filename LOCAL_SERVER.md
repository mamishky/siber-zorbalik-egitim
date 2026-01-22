# 🚀 Safetagram Local Test Server

## Hızlı Başlatma

### Yöntem 1: Script ile (Önerilen)
```bash
./start-server.sh
```

### Yöntem 2: Manuel
```bash
python3 -m http.server 8000
```

## Server Bilgileri

- **URL:** http://localhost:8000
- **Port:** 8000
- **Durdurma:** `Ctrl+C` tuşlarına basın

## Tarayıcıda Açma

1. Server'ı başlatın (yukarıdaki komutlardan biriyle)
2. Tarayıcınızda şu adresi açın: **http://localhost:8000**
3. `index.html` otomatik olarak yüklenecek

## Önemli Notlar

⚠️ **Firebase Bağlantısı:**
- Firebase API key'lerinin doğru yapılandırıldığından emin olun
- `app.js` içindeki `firebaseConfig` kontrol edin

⚠️ **CORS Sorunları:**
- Local server'dan çalışırken bazı API çağrıları CORS hatası verebilir
- Bu normaldir, production'da sorun olmaz

⚠️ **Gemini API:**
- Backend API (`/api/ai/generate`) Vercel'de çalışıyor
- Local test için Vercel deployment gerekli

## Test Adımları

1. ✅ Server'ı başlatın
2. ✅ Tarayıcıda http://localhost:8000 açın
3. ✅ Giriş yapın
4. ✅ Simülasyonu test edin
5. ✅ Console'u açık tutun (F12)

## Sorun Giderme

**Port 8000 kullanımda:**
```bash
# Farklı port kullanın
python3 -m http.server 8080
```

**Script çalışmıyor:**
```bash
# Çalıştırma izni verin
chmod +x start-server.sh
```

**Module bulunamadı:**
- Python3 yüklü olduğundan emin olun
- macOS'ta genellikle varsayılan olarak yüklüdür
