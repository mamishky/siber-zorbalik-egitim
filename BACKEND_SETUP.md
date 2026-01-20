# Backend Kurulum ve Kullanım Kılavuzu

## 🎯 Genel Bakış

Bu proje, Google Gemini AI kullanarak güvenli bir şekilde AI mesaj üretimi yapan backend'e sahiptir.
API key frontend'de değil, backend'de (.env) güvenli bir şekilde saklanır.

---

## 📋 Gereksinimler

- **Node.js:** 18.x veya üstü
- **npm:** 8.x veya üstü
- **Gemini API Key:** [Google AI Studio](https://makersuite.google.com/app/apikey)'dan ücretsiz alınabilir

---

## 🚀 Kurulum Adımları

### 1. Bağımlılıkları Yükle

```bash
cd /Users/m.farukerdogan/Desktop/siber-zorbalik-egitim
npm install
```

### 2. .env Dosyası Oluştur

Proje kökünde `.env` dosyası oluşturun (`.env.example` dosyasını kopyalayabilirsiniz):

```bash
# .env dosyası oluştur
touch .env
```

İçeriği:

```env
GEMINI_API_KEY=AIzaSyBtSxOOQHN06ON_kgKNIvRPntlYHclJ2cc
```

**ÖNEMLİ:** `.env` dosyası `.gitignore`'a eklenmiştir, Git'e push edilmeyecek.

### 3. Vercel CLI Kurulumu (Opsiyonel - Lokal Test İçin)

```bash
npm install -g vercel
```

---

## 🏃 Çalıştırma

### Lokal Geliştirme (Vercel Dev)

```bash
npm run dev
```

veya

```bash
vercel dev
```

Bu komut:
- Lokal bir server başlatır (genellikle http://localhost:3000)
- Backend API endpoint'i `/api/ai/generate` üzerinden erişilebilir olur
- Frontend static dosyalar sunulur
- Hot reload destekler

### Alternatif: Python SimpleHTTPServer ile Frontend

Eğer sadece frontend'i test etmek istiyorsanız (backend olmadan):

```bash
python3 -m http.server 8000
```

**NOT:** Bu yöntemde AI özellikleri çalışmaz (backend yok).

---

## 🧪 Test

### 1. Backend Endpoint Testi (Terminal)

```bash
curl -X POST http://localhost:3000/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{
    "scenarioId": "test",
    "userMessage": "Merhaba, nasılsın?",
    "conversation": [],
    "scenarioSender": "Ahmet",
    "participantAge": 15,
    "locale": "tr"
  }'
```

Beklenen yanıt:

```json
{
  "ok": true,
  "message": "Merhaba! İyiyim, teşekkürler 😊 Sen nasılsın?"
}
```

### 2. Frontend Test

1. http://localhost:3000 adresini aç
2. Oturum formu doldur
3. "🤖 Yapay Zeka ile Dinamik Sohbet" seçeneğini aktif et
4. Bir mesaja gir, cevap ver
5. AI yanıtının geldiğini gör

---

## 📁 Dosya Yapısı

```
siber-zorbalik-egitim/
├── api/
│   └── ai/
│       └── generate.js          # Vercel serverless function (AI endpoint)
├── app.js                        # Frontend ana JS (AI çağrısı backend'e yönlendirildi)
├── index.html                    # Frontend (API key input kaldırıldı)
├── styles.css                    # Stiller
├── scenarios.js                  # Senaryo verileri
├── package.json                  # Node bağımlılıkları
├── vercel.json                   # Vercel yapılandırması
├── .env                          # API key (GİT'E EKLENMEMELİ)
├── .env.example                  # Örnek env dosyası
├── .gitignore                    # Git ignore (node_modules, .env)
└── BACKEND_SETUP.md              # Bu dosya
```

---

## 🔒 Güvenlik

### ✅ Yapılanlar

1. **API Key Backend'de:** `.env` dosyasında, frontend'den tamamen kaldırıldı
2. **Rate Limiting:** IP bazlı basit rate limit (30 req / 10 dk)
3. **Input Validation:** Tüm girişler doğrulanıyor
4. **CORS:** Sadece izin verilen origin'lerden istek kabul edilir
5. **Error Handling:** Stack trace frontend'e dönmüyor
6. **No-Store Cache:** AI yanıtları cache'lenmiyor

### 🚧 Üretim İçin Ek Öneriler

1. **Daha Güçlü Rate Limiting:** Redis veya harici servis kullan
2. **Authentication:** Kullanıcı kimlik doğrulama ekle
3. **Request Logging:** Tüm istekleri logla
4. **API Key Rotation:** Periyodik olarak key'i yenile
5. **WAF:** Web Application Firewall kullan

---

## 📦 Vercel'e Deploy

### 1. Vercel Hesabı Oluştur

https://vercel.com adresine git, ücretsiz hesap aç.

### 2. Proje Bağla

```bash
vercel
```

Komutlar:
- "Set up and deploy?" → **Yes**
- "Which scope?" → Hesabını seç
- "Link to existing project?" → **No**
- "Project name?" → `siber-zorbalik-egitim`
- "Directory?" → `./`
- "Override settings?" → **No**

### 3. Environment Variables Ekle

Vercel Dashboard'da:
1. Projeyi aç
2. **Settings** → **Environment Variables**
3. Ekle:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `AIzaSyBtSxOOQHN06ON_kgKNIvRPntlYHclJ2cc`
   - **Environment:** Production, Preview, Development

### 4. Deploy

```bash
vercel --prod
```

Canlı link: `https://siber-zorbalik-egitim.vercel.app`

---

## 🐛 Sorun Giderme

### "Module not found: @google/generative-ai"

```bash
npm install @google/generative-ai
```

### "GEMINI_API_KEY tanımlı değil"

`.env` dosyasını kontrol et, key doğru mu?

```bash
cat .env
```

### CORS Hatası

`api/ai/generate.js` içinde `allowedOrigins` dizisine domain'ini ekle:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://siber-zorbalik-egitim.vercel.app'
];
```

### Rate Limit

10 dakikada 30'dan fazla istek atıyorsan, `RATE_LIMIT_MAX_REQUESTS` değerini artır.

---

## 📊 API Endpoint Detayları

### POST /api/ai/generate

**Request Body:**

```typescript
{
  scenarioId: string;          // Senaryo ID (zorunlu)
  userMessage: string;         // Kullanıcı mesajı (1-500 karakter, zorunlu)
  conversation?: Array<{       // Önceki konuşma (max 50 mesaj, opsiyonel)
    sender: string;
    text: string;
  }>;
  scenarioSender?: string;     // Senaryo gönderici adı (opsiyonel)
  participantAge?: number;     // Katılımcı yaşı (opsiyonel, varsayılan: 15)
  locale?: 'tr' | 'en';        // Dil (opsiyonel, varsayılan: 'tr')
  scenarioContext?: string;    // Senaryo bağlamı (max 2000 karakter, opsiyonel)
}
```

**Response (Başarılı):**

```json
{
  "ok": true,
  "message": "Merhaba! İyiyim, teşekkürler 😊 Sen nasılsın?"
}
```

**Response (Hata):**

```json
{
  "ok": false,
  "error": "Hata mesajı",
  "details": ["detay1", "detay2"]  // Sadece validation hatalarında
}
```

**HTTP Status Kodları:**

- `200` - Başarılı
- `400` - Geçersiz input (validation hatası)
- `405` - Method Not Allowed (sadece POST kabul edilir)
- `429` - Too Many Requests (rate limit)
- `500` - Sunucu hatası

---

## 🎓 Nasıl Çalışır?

### Frontend → Backend Akışı

1. **Kullanıcı mesaj yazar**
   - `app.js` içinde `generateAIMessage()` fonksiyonu tetiklenir

2. **Backend'e istek gönderilir**
   - `fetch('/api/ai/generate', { ... })` çağrısı yapılır
   - JSON body ile senaryo, mesaj, geçmiş gönderilir

3. **Backend işler**
   - `api/ai/generate.js` çalışır
   - Rate limit kontrol edilir
   - Input validasyonu yapılır
   - Gemini AI'a prompt gönderilir

4. **AI yanıt üretir**
   - Google Gemini API çağrılır
   - Yanıt alınır, temizlenir

5. **Frontend'e dönüş**
   - JSON yanıt frontend'e gönderilir
   - Mesaj UI'da gösterilir

---

## 📝 Notlar

- **API Limitleri:** Gemini free tier günde 60 istek/dakika (daha fazlası için ücretli plan)
- **Model:** `gemini-1.5-flash` kullanılıyor (hızlı ve ucuz)
- **Fallback:** Backend erişilemezse statik fallback mesajlar kullanılır
- **Locale:** Şu an sadece Türkçe (tr) ve İngilizce (en) destekleniyor

---

## 🆘 Destek

Sorularınız için:
- GitHub Issues: Proje repo'suna issue açın
- Email: [Ekip email adresi]

---

**Son Güncelleme:** 2026-01-20
