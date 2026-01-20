# ⚡ Hızlı Başlangıç (5 Dakika)

## 🎯 Hedef

Backend'i çalıştırıp AI özelliklerini test etmek.

---

## 📝 Adımlar

### 1️⃣ Terminal Aç

```bash
cd /Users/m.farukerdogan/Desktop/siber-zorbalik-egitim
```

### 2️⃣ .env Dosyası Oluştur

**Yöntem 1: Script ile (Otomatik)**

```bash
bash ENV_SETUP.sh
```

**Yöntem 2: Manuel**

```bash
echo "GEMINI_API_KEY=AIzaSyBtSxOOQHN06ON_kgKNIvRPntlYHclJ2cc" > .env
```

### 3️⃣ Bağımlılıkları Yükle

```bash
npm install
```

### 4️⃣ Hangisini Kullanacaksın?

#### Seçenek A: Vercel Dev (Önerilen)

```bash
npm run dev
```

**장점:**
- ✅ Production ortamına çok benzer
- ✅ Serverless function testi
- ✅ Otomatik reload

#### Seçenek B: Express Server

```bash
npm run start:express
```

**장점:**
- ✅ Daha basit
- ✅ Daha hızlı başlatma
- ✅ Vercel CLI gerektirmez

### 5️⃣ Tarayıcıda Aç

http://localhost:3000

---

## ✅ Hızlı Test

### Test 1: Backend Çalışıyor mu?

```bash
curl http://localhost:3000/api/health
```

**Beklenen:**
```json
{"ok":true,"message":"Backend çalışıyor!","timestamp":"..."}
```

### Test 2: AI Yanıt Veriyor mu?

```bash
curl -X POST http://localhost:3000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"scenarioId":"test","userMessage":"Merhaba","conversation":[],"locale":"tr"}'
```

**Beklenen:**
```json
{"ok":true,"message":"Merhaba! Nasılsın? 😊"}
```

### Test 3: UI'da Çalışıyor mu?

1. http://localhost:3000 aç
2. Login yap
3. Oturum başlat
4. ✅ **"🤖 Yapay Zeka ile Dinamik Sohbet" aktif et**
5. Mesaj gönder → AI yanıtı gel

---

## 🐛 Hata?

### "npm: command not found"

Node.js yükle: https://nodejs.org/

### "GEMINI_API_KEY tanımlı değil"

```bash
cat .env
```

Boşsa:

```bash
bash ENV_SETUP.sh
```

### "Module not found"

```bash
npm install
```

---

## 🎉 Başarılı!

Eğer tüm testler geçtiyse backend hazır! 🚀

**Sonraki Adım:** Vercel'e deploy et → `vercel --prod`

---

**İletişim:** BACKEND_SETUP.md ve SETUP_CHECKLIST.md dosyalarına bak.
