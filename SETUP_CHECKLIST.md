# ✅ Kurulum Kontrol Listesi

## 📦 1. Bağımlılıkları Yükle

Terminal'de proje dizinine git:

```bash
cd /Users/m.farukerdogan/Desktop/siber-zorbalik-egitim
npm install
```

Beklenen çıktı:
```
added 1 package, and audited 2 packages in 3s
```

---

## 🔑 2. .env Dosyası Oluştur

### Manuel Oluşturma:

Proje kökünde `.env` dosyası oluştur:

```bash
touch .env
```

Sonra text editor ile aç ve şunu ekle:

```env
GEMINI_API_KEY=AIzaSyBtSxOOQHN06ON_kgKNIvRPntlYHclJ2cc
```

**Kaydet ve kapat.**

### Kontrol:

```bash
cat .env
```

Çıktı:
```
GEMINI_API_KEY=AIzaSyBtSxOOQHN06ON_kgKNIvRPntlYHclJ2cc
```

---

## 🚀 3. Vercel CLI Kur (Opsiyonel - Lokal Test İçin)

```bash
npm install -g vercel
```

---

## 🏃 4. Lokal Çalıştırma

### Yöntem 1: Vercel Dev (Önerilen - Backend + Frontend)

```bash
npm run dev
```

veya

```bash
vercel dev
```

Beklenen çıktı:
```
Vercel CLI 28.x.x
> Ready! Available at http://localhost:3000
```

Tarayıcıda aç: http://localhost:3000

### Yöntem 2: Python SimpleHTTPServer (Sadece Frontend - AI Çalışmaz)

```bash
python3 -m http.server 8000
```

Tarayıcıda aç: http://localhost:8000

**NOT:** Bu yöntemde backend yok, AI özellikleri çalışmaz.

---

## 🧪 5. Test

### A) Backend Endpoint Testi

Yeni bir terminal aç:

```bash
curl -X POST http://localhost:3000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "scenarioId": "test",
    "userMessage": "Merhaba",
    "conversation": [],
    "scenarioSender": "Test",
    "participantAge": 15,
    "locale": "tr"
  }'
```

**✅ Başarılı yanıt:**

```json
{
  "ok": true,
  "message": "Merhaba! Nasılsın? 😊"
}
```

**❌ Hata (API key yok):**

```json
{
  "ok": false,
  "error": "Sunucu yapılandırma hatası"
}
```

→ `.env` dosyasını kontrol et!

### B) Frontend UI Testi

1. http://localhost:3000 aç
2. Giriş yap (Google veya Email)
3. Oturum başlat:
   - İsim: Test
   - Yaş: 15
   - Oturum Tipi: Başlama
   - ✅ "🤖 Yapay Zeka ile Dinamik Sohbet" seçeneğini AKTİF ET
4. Mesaj gelince tıkla
5. Bir cevap yaz (örn: "Merhaba, nasılsın?")
6. **AI yanıtı geldi mi?** → ✅ Başarılı!

---

## 🔍 6. Kontrol: API Key Frontend'de Yok mu?

### A) HTML Kontrolü

```bash
grep -i "openai-api-key" index.html
```

**Beklenen:** Hiçbir sonuç dönmemeli (veya sadece yorum satırı)

### B) JS Kontrolü

```bash
grep -i "OPENAI_API_KEY\|apiKey.*openai" app.js
```

**Beklenen:** Sadece eski yorumlar veya hiç sonuç yok

### C) Browser DevTools

1. Tarayıcıda F12 → Console
2. `OPENAI_API_KEY` yaz
3. **Beklenen:** `undefined` veya `ReferenceError`

---

## 🐛 7. Sorun Giderme

### "Cannot find module '@google/generative-ai'"

```bash
npm install @google/generative-ai
```

### "GEMINI_API_KEY tanımlı değil"

`.env` dosyası var mı? İçeriği doğru mu?

```bash
cat .env
```

Yok ise:

```bash
echo "GEMINI_API_KEY=AIzaSyBtSxOOQHN06ON_kgKNIvRPntlYHclJ2cc" > .env
```

### Backend 404 hatası

`vercel dev` çalışıyor mu? Kontrol et:

```bash
curl http://localhost:3000/api/ai/generate
```

Beklenen: `{"ok":false,"error":"Method Not Allowed"}` (405)

### CORS Hatası

`api/ai/generate.js` dosyasındaki `allowedOrigins` dizisine kendi domain'ini ekle.

---

## 📊 8. Dosya Değişiklikleri Özeti

### ✅ Eklenen Dosyalar

- `package.json` - Node bağımlılıkları
- `vercel.json` - Vercel yapılandırması
- `api/ai/generate.js` - Backend AI endpoint
- `.gitignore` - Git ignore listesi
- `.env` - API key (GİT'E EKLENMEMELİ)
- `.env.example` - Örnek env dosyası
- `BACKEND_SETUP.md` - Detaylı kurulum kılavuzu
- `SETUP_CHECKLIST.md` - Bu dosya

### 🔧 Değiştirilen Dosyalar

#### `index.html`
**Kaldırılanlar:**
- API key input alanı (`<input id="openai-api-key">`)
- API key uyarı metni

**Eklenenler:**
- "✅ AI mesajları güvenli backend üzerinden üretiliyor" bilgi metni

#### `app.js`
**Kaldırılanlar:**
- `let OPENAI_API_KEY = '';` (global değişken)
- `const apiKey = document.getElementById('openai-api-key').value.trim();`
- OpenAI API fetch kodu
- API key validation kodları

**Değiştirileler:**
- `generateAIMessage()` fonksiyonu → Backend endpoint'ine bağlandı
- Session başlatma → API key kontrolü kaldırıldı
- AI aktif kontrolü → `OPENAI_API_KEY` yerine sadece `currentSession.aiEnabled`

---

## 📋 9. Final Checklist

- [ ] `npm install` çalıştırıldı
- [ ] `.env` dosyası oluşturuldu, API key eklendi
- [ ] `vercel dev` veya `npm run dev` çalıştırıldı
- [ ] http://localhost:3000 açıldı
- [ ] Backend endpoint test edildi (curl)
- [ ] UI'da AI aktif edildi, mesaj gönderildi
- [ ] AI yanıtı başarıyla geldi
- [ ] Browser DevTools'da API key görünmüyor
- [ ] `.gitignore` dosyası `.env` içeriyor

---

## 🎉 Başarı Kriterleri

Tüm bunlar çalışıyorsa **backend entegrasyonu başarılı!** ✅

1. ✅ Backend endpoint 200 dönüyor
2. ✅ AI mesajlar geliyor (Gemini)
3. ✅ API key frontend'de yok
4. ✅ CORS çalışıyor
5. ✅ Rate limiting aktif
6. ✅ Hata durumunda fallback mesajlar

---

## 🚀 Sonraki Adımlar

1. **Vercel'e Deploy:** `vercel --prod`
2. **Production Testing:** Canlı sitede test et
3. **Monitoring:** Hata loglarını takip et
4. **Optimizasyon:** Rate limit ayarlarını ince ayar

---

**Son Güncelleme:** 2026-01-20
