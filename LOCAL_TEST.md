# 🧪 Local Test Adımları

## ⚡ Hızlı Başlangıç

Terminalinde sırayla çalıştır:

```bash
# 1. Proje dizinine git
cd /Users/m.farukerdogan/Desktop/siber-zorbalik-egitim

# 2. .env dosyası oluştur
echo "GEMINI_API_KEY=AIzaSyBtSxOOQHN06ON_kgKNIvRPntlYHclJ2cc" > .env

# 3. .env doğru mu kontrol et
cat .env

# 4. Node.js kurulu mu kontrol et
node --version
npm --version

# Eğer "command not found" hatası alırsan:
# https://nodejs.org/ adresinden Node.js 18+ yükle
# Sonra terminal'i kapat-aç ve tekrar dene

# 5. Bağımlılıkları yükle
npm install

# 6. Backend'i başlat (İKİ SEÇENEK VAR)

## SEÇENEK A: Express Server (Daha Basit - Önerilen)
npm run start:express

## SEÇENEK B: Vercel Dev (Production benzeri)
# Önce Vercel CLI kur:
npm install -g vercel
# Sonra başlat:
npm run dev
```

---

## ✅ Test Checklist

### 1. Backend Çalışıyor mu?

Yeni bir terminal aç:

```bash
# Health check
curl http://localhost:3000/api/health
```

**Beklenen çıktı:**
```json
{"ok":true,"message":"Backend çalışıyor!","timestamp":"2026-01-20T..."}
```

✅ Başarılı!  
❌ Hata alırsan → Server başladı mı kontrol et

---

### 2. AI Endpoint Çalışıyor mu?

```bash
curl -X POST http://localhost:3000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"scenarioId":"test","userMessage":"Merhaba","conversation":[],"scenarioSender":"Ahmet","participantAge":15,"locale":"tr"}'
```

**Beklenen çıktı:**
```json
{"ok":true,"message":"Merhaba! Nasılsın? 😊"}
```

✅ AI yanıt veriyor!  
❌ Hata alırsan:
- `.env` dosyasını kontrol et: `cat .env`
- API key doğru mu?
- Server restart: `Ctrl+C` ve tekrar `npm run start:express`

---

### 3. UI Test

1. **Tarayıcıda aç:** http://localhost:3000

2. **Giriş yap:** Google veya Email ile

3. **Oturum başlat:**
   - İsim: `Test Kullanıcı`
   - Yaş: `15`
   - Oturum Tipi: `Başlama`
   - ✅ **ÖNEMLİ:** "🤖 Yapay Zeka ile Dinamik Sohbet" CHECKBOX'INI AKTİF ET!

4. **Mesaj bekle:** 10 saniye sonra bildirim gelecek

5. **Mesaj aç:** Gelen mesaja tıkla

6. **Cevap yaz:** Örn: "Merhaba, nasılsın?"

7. **AI yanıtı kontrol et:**
   - ✅ Yanıt geldi → Başarılı!
   - ❌ Yanıt gelmedi → Console'u kontrol et (F12 → Console)

---

## 🔍 Browser Console Kontrolü

Tarayıcıda **F12** → **Console**

### Başarılı Durum:
```
✅ Herhangi bir kırmızı hata yok
✅ Network tab'da /api/ai/generate isteği 200 dönüyor
```

### Hata Varsa:

#### "Failed to fetch"
```
❌ Backend çalışmıyor
→ Terminal'de server başladı mı kontrol et
```

#### "GEMINI_API_KEY tanımlı değil"
```
❌ .env dosyası yok veya hatalı
→ cat .env komutuyla kontrol et
→ Server'ı restart et
```

#### CORS hatası
```
❌ CORS sorunu
→ api/ai/generate.js dosyasında allowedOrigins kontrol et
→ localhost:3000 listeye eklenmeli
```

---

## 📊 Başarı Kriterleri

Tüm bunlar ✅ ise local test başarılı:

- [x] Backend başladı (`npm run start:express`)
- [x] Health check 200 dönüyor
- [x] AI endpoint çalışıyor
- [x] UI açılıyor (http://localhost:3000)
- [x] Giriş yapılabiliyor
- [x] Oturum başlatılıyor
- [x] AI checkbox aktif
- [x] Mesaj geliyor
- [x] AI yanıt veriyor
- [x] Console'da hata yok

---

## 🐛 Yaygın Hatalar ve Çözümler

### "npm: command not found"

**Sorun:** Node.js kurulu değil

**Çözüm:**
```bash
# Node.js yükle (macOS - Homebrew)
brew install node

# veya https://nodejs.org/ adresinden indir
```

### "Cannot find module '@google/generative-ai'"

**Sorun:** Bağımlılıklar yüklenmemiş

**Çözüm:**
```bash
npm install
```

### "EADDRINUSE :::3000"

**Sorun:** Port 3000 zaten kullanımda

**Çözüm:**
```bash
# Çalışan process'i bul
lsof -ti:3000

# Öldür
kill -9 $(lsof -ti:3000)

# Veya farklı port kullan
PORT=3001 npm run start:express
```

### AI yanıt gelmiyor ama hata da yok

**Kontrol et:**
1. AI checkbox aktif mi?
2. .env dosyası var mı?
3. Server restart ettik mi?
4. Console'da network isteği gidiyor mu?

**Çözüm:**
```bash
# Server'ı restart et
Ctrl+C
npm run start:express

# Browser cache temizle
Cmd+Shift+R (Mac)
Ctrl+Shift+R (Windows)
```

---

## 🎉 Local Test Başarılı!

Eğer tüm testler geçtiyse artık GitHub'a deploy edebilirsin!

**Sonraki adım:** GITHUB_DEPLOY.md dosyasını aç
