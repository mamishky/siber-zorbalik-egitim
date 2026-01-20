# 🤖 Yapay Zeka Entegrasyon Rehberi

Bu rehber, siber zorbalık eğitim uygulamanıza yapay zeka ile dinamik mesaj üretimi eklemeniz için adım adım talimatlar içerir.

## 📋 İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [Seçenekler](#seçenekler)
3. [Kurulum](#kurulum)
4. [Kullanım](#kullanım)
5. [Maliyet Tahmini](#maliyet-tahmini)

## 🎯 Genel Bakış

Şu anda mesajlar `scenarios.js` dosyasında statik olarak tanımlı. Yapay zeka entegrasyonu ile:
- ✅ Her oturum için benzersiz mesajlar
- ✅ Çocuğun yaşına uygun içerik
- ✅ Daha gerçekçi ve doğal diyaloglar
- ✅ Sonsuz varyasyon

## 🔧 Seçenekler

### Seçenek 1: Backend API (Önerilen) ⭐

**Avantajlar:**
- ✅ API key güvenliği
- ✅ Rate limiting
- ✅ Önbellekleme (cache)
- ✅ Maliyet kontrolü

**Dezavantajlar:**
- ❌ Backend sunucu gerektirir
- ❌ Ekstra kurulum

**Kullanım:**
```bash
# Backend'de
npm install express openai cors
node backend-api-example.js

# Frontend'de
const AI_API_ENDPOINT = 'http://localhost:3000/generate-message';
```

### Seçenek 2: Serverless Functions (Vercel/Netlify)

**Avantajlar:**
- ✅ Kolay deploy
- ✅ Otomatik scaling
- ✅ Ücretsiz tier mevcut

**Kurulum:**
```bash
# Vercel için
vercel init
# api/generate-message.js oluştur
vercel deploy
```

### Seçenek 3: Frontend'den Direkt (Önerilmez) ⚠️

**Neden önerilmez:**
- ❌ API key güvenlik riski
- ❌ Rate limiting yok
- ❌ CORS sorunları

## 📦 Kurulum

### 1. OpenAI API Key Al

1. https://platform.openai.com/ adresine git
2. Hesap oluştur / Giriş yap
3. API Keys bölümünden yeni key oluştur
4. Key'i kopyala (bir daha gösterilmez!)

### 2. Backend Kurulumu

```bash
# Proje klasöründe
mkdir backend
cd backend
npm init -y
npm install express openai cors dotenv

# .env dosyası oluştur
echo "OPENAI_API_KEY=sk-..." > .env
echo "PORT=3000" >> .env

# backend-api-example.js dosyasını kopyala
# node backend-api-example.js ile çalıştır
```

### 3. Frontend Entegrasyonu

`app.js` dosyasında mesaj kuyruğu oluşturma kısmını güncelle:

```javascript
// app.js içinde (satır ~365)
async function prepareMessageQueue() {
    currentSession.messageQueue = [];
    
    const participantAge = currentSession.participantAge || 15;
    const sessionType = currentSession.sessionType || 'baslama';
    
    BULLYING_TYPES.forEach(async (bullyingType) => {
        // Siber zorbalık mesajı oluştur
        const cyberbullyingScenario = await generateScenario(
            generateRandomUsername(),
            generateRandomAvatar(),
            bullyingType,
            sessionType,
            participantAge,
            true // isCyberbullying
        );
        currentSession.messageQueue.push({
            ...cyberbullyingScenario,
            _bullyingType: bullyingType
        });
        
        // Güvenli mesaj oluştur
        const safeScenario = await generateScenario(
            generateRandomUsername(),
            generateRandomAvatar(),
            bullyingType,
            sessionType,
            participantAge,
            false // isCyberbullying
        );
        currentSession.messageQueue.push({
            ...safeScenario,
            _bullyingType: bullyingType
        });
    });
    
    // Shuffle
    currentSession.messageQueue.sort(() => Math.random() - 0.5);
}
```

## 💰 Maliyet Tahmini

**OpenAI GPT-4o-mini:**
- Input: $0.15 / 1M tokens
- Output: $0.60 / 1M tokens

**Örnek:**
- 1 mesaj ≈ 500 tokens
- 10 mesaj/oturum × 100 oturum/gün = 1000 mesaj/gün
- 1000 mesaj × 500 token = 500K tokens/gün
- **Maliyet: ~$0.30/gün** (yaklaşık $9/ay)

**Tasarruf İpuçları:**
1. ✅ Önbellekleme (cache) kullan
2. ✅ GPT-3.5-turbo kullan (daha ucuz)
3. ✅ Rate limiting ekle
4. ✅ Günlük limit koy

## 🚀 Hızlı Başlangıç

1. **Backend'i başlat:**
```bash
cd backend
node backend-api-example.js
```

2. **Frontend'de test et:**
```javascript
// Browser console'da
const test = await generateCyberbullyingMessage('sozel', 'baslama', 15);
console.log(test);
```

3. **app.js'e entegre et:**
- `ai-message-generator.js` dosyasını import et
- `prepareMessageQueue` fonksiyonunu güncelle
- Test et!

## 🔒 Güvenlik

- ✅ API key'i **ASLA** frontend'de saklama
- ✅ Environment variables kullan
- ✅ Rate limiting ekle
- ✅ CORS ayarlarını yap
- ✅ Input validation yap

## 📝 Notlar

- İlk mesajlar biraz yavaş olabilir (AI yanıt süresi)
- Önbellekleme ile hızlandırılabilir
- Fallback mesajlar her zaman hazır olmalı
- Test sırasında API key limitlerini kontrol et

## 🆘 Sorun Giderme

**Problem:** API key hatası
- ✅ Key'in doğru olduğundan emin ol
- ✅ Billing ayarlarını kontrol et

**Problem:** CORS hatası
- ✅ Backend'de `cors()` middleware ekle
- ✅ Frontend URL'ini whitelist'e ekle

**Problem:** Yavaş yanıt
- ✅ GPT-3.5-turbo kullan (daha hızlı)
- ✅ Önbellekleme ekle
- ✅ Timeout ayarla

## 📞 Destek

Sorularınız için:
- OpenAI Docs: https://platform.openai.com/docs
- Express Docs: https://expressjs.com/
