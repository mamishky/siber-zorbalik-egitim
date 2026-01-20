# 🚀 GitHub Deploy Kılavuzu

## 📋 Ön Gereksinimler

- [x] Local test başarılı (LOCAL_TEST.md)
- [x] GitHub hesabı var
- [x] Git kurulu (`git --version`)

---

## 🔐 Önemli: .env Dosyası

**⚠️ DİKKAT:** `.env` dosyası asla GitHub'a push edilmemeli!

`.gitignore` dosyası zaten `.env`'yi içeriyor, kontrol et:

```bash
cat .gitignore | grep .env
```

**Beklenen çıktı:**
```
.env
.env.local
.env.*.local
```

---

## 📦 1. Git Repo Oluştur

### Yöntem A: GitHub Web'den (Önerilen)

1. **GitHub'a git:** https://github.com
2. **New repository** tıkla
3. **Ayarlar:**
   - Repository name: `siber-zorbalik-egitim`
   - Description: `Siber Zorbalık Eğitim Simülasyonu - Instagram benzeri platform`
   - Visibility: **Public** veya **Private** (istediğin gibi)
   - ❌ **Initialize this repository with:** HİÇBİRİNİ SEÇ (README, .gitignore, license)
4. **Create repository** tıkla

### Yöntem B: Terminal'den

```bash
# GitHub CLI kurulu mu?
gh --version

# Repo oluştur
gh repo create siber-zorbalik-egitim --public --source=. --remote=origin
```

---

## 📤 2. Kodu GitHub'a Push Et

```bash
cd /Users/m.farukerdogan/Desktop/siber-zorbalik-egitim

# 1. Git başlat (eğer yoksa)
git init

# 2. Tüm dosyaları ekle
git add .

# 3. .env dosyasının eklenmediğini kontrol et
git status | grep .env

# Eğer .env görünüyorsa:
git rm --cached .env
echo ".env" >> .gitignore
git add .gitignore

# 4. İlk commit
git commit -m "feat: Gemini AI backend entegrasyonu - API key güvenli hale getirildi

- API key frontend'den kaldırıldı, backend'e (.env) taşındı
- Vercel serverless function eklendi (api/ai/generate.js)
- Express alternatifi eklendi (server.js)
- Rate limiting, input validation, CORS güvenliği eklendi
- OpenAI -> Google Gemini geçişi yapıldı
- Kapsamlı dokümantasyon eklendi"

# 5. Remote ekle (GitHub repo URL'ini kullan)
git remote add origin https://github.com/KULLANICI_ADIN/siber-zorbalik-egitim.git

# 6. Push et
git branch -M main
git push -u origin main
```

**Kontrol et:** https://github.com/KULLANICI_ADIN/siber-zorbalik-egitim adresinde kodun göründüğünü doğrula.

---

## 🌐 3. Vercel'e Deploy

### A) Vercel Hesabı Oluştur

1. **Vercel'e git:** https://vercel.com
2. **Sign Up** → **Continue with GitHub** (GitHub hesabınla giriş yap)
3. **Authorize Vercel** (GitHub'a erişim izni ver)

### B) Proje İçe Aktar

1. **Dashboard'a git:** https://vercel.com/dashboard
2. **Add New...** → **Project** tıkla
3. **Import Git Repository**
4. **GitHub'dan repo seç:** `siber-zorbalik-egitim`
5. **Import** tıkla

### C) Proje Ayarları

**Framework Preset:** Other (veya boş bırak)

**Root Directory:** `./` (varsayılan)

**Build & Output Settings:** (Değiştirme, varsayılan bırak)

**Environment Variables** (ÇOK ÖNEMLİ!):

```
Key: GEMINI_API_KEY
Value: AIzaSyBtSxOOQHN06ON_kgKNIvRPntlYHclJ2cc
Environment: Production, Preview, Development (hepsini seç)
```

**Add** tıkla.

### D) Deploy

**Deploy** butonuna tıkla.

**Beklenen süre:** 1-2 dakika

**Deploy tamamlandı!** 🎉

---

## 🧪 4. Production Test

Deploy tamamlandıktan sonra Vercel sana bir link verecek:

```
https://siber-zorbalik-egitim.vercel.app
```

veya

```
https://siber-zorbalik-egitim-RANDOM.vercel.app
```

### Test Adımları:

1. **Link'i aç:** Tarayıcıda production URL'i aç

2. **Health check:**
```bash
curl https://siber-zorbalik-egitim.vercel.app/api/health
```

**Beklenen:**
```json
{"ok":true,"message":"Backend çalışıyor!","timestamp":"..."}
```

3. **AI endpoint test:**
```bash
curl -X POST https://siber-zorbalik-egitim.vercel.app/api/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"scenarioId":"test","userMessage":"Merhaba","conversation":[],"locale":"tr"}'
```

**Beklenen:**
```json
{"ok":true,"message":"Merhaba! Nasılsın? 😊"}
```

4. **UI Test:**
   - Giriş yap
   - Oturum başlat
   - AI aktif et
   - Mesaj gönder
   - AI yanıtı geldi mi? ✅

---

## 🔍 Production Sorun Giderme

### "GEMINI_API_KEY tanımlı değil"

**Sorun:** Environment variable eksik

**Çözüm:**
1. Vercel Dashboard → Proje seç
2. **Settings** → **Environment Variables**
3. `GEMINI_API_KEY` ekle (yukarıdaki key'i kullan)
4. **Redeploy:** Deployments → En son deploy → **⋯** → **Redeploy**

### CORS Hatası

**Sorun:** Domain izin listesinde değil

**Çözüm:**
1. `api/ai/generate.js` dosyasını aç
2. `allowedOrigins` dizisine production URL'ini ekle:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://siber-zorbalik-egitim.vercel.app', // Buraya ekle
];
```

3. Git commit ve push:
```bash
git add api/ai/generate.js
git commit -m "fix: Production domain CORS'a eklendi"
git push
```

4. Vercel otomatik re-deploy edecek

### 500 Internal Server Error

**Kontrol et:**
1. Vercel Dashboard → Proje → **Deployments** → En son → **View Function Logs**
2. Hata mesajlarını oku
3. Genellikle:
   - API key yanlış/eksik
   - Module import hatası
   - Rate limit aşımı

---

## 📊 Vercel Dashboard

### Önemli Sekmeler:

1. **Overview:** Genel bakış, ziyaretçi sayısı
2. **Deployments:** Tüm deploy'lar, loglar
3. **Analytics:** Trafik istatistikleri (Pro plan)
4. **Settings:**
   - **Environment Variables:** API key burada
   - **Domains:** Custom domain ekle
   - **Git:** GitHub repo ayarları

---

## 🎨 Custom Domain (Opsiyonel)

Kendi domain'ini bağlamak istiyorsan:

1. **Domain satın al:** Namecheap, GoDaddy, vb.
2. **Vercel'de ekle:** Settings → Domains → Add Domain
3. **DNS ayarları:** Vercel'in verdiği nameserver'ları domain'ine ekle
4. **Bekle:** 24-48 saat (DNS propagation)

---

## 🔄 Güncellemeler

Kod değiştirdiğinde:

```bash
# 1. Değişiklik yap
# 2. Test et (local)
npm run start:express

# 3. Git'e push et
git add .
git commit -m "feat: Yeni özellik eklendi"
git push

# 4. Vercel otomatik deploy edecek!
```

**Auto Deploy:** GitHub'a her push'ta Vercel otomatik deploy eder.

---

## 📈 Monitoring

### Logs

**Vercel Dashboard:**
1. **Deployments** → Deploy seç → **View Function Logs**
2. Real-time loglar burada

### Errors

**Sentry entegrasyonu (gelişmiş):**
1. Sentry.io hesap aç
2. Vercel'e entegre et
3. Tüm hatalar Sentry'de

---

## 🎉 Deploy Başarılı!

Tebrikler! Projen artık canlıda:

✅ GitHub'da kayıtlı
✅ Vercel'de deploy edildi
✅ AI backend çalışıyor
✅ API key güvenli (.env)
✅ Auto-deploy aktif

---

## 📋 Final Checklist

- [x] .env GitHub'a push edilmedi
- [x] GitHub repo oluşturuldu
- [x] Kod push edildi
- [x] Vercel hesabı oluşturuldu
- [x] Proje Vercel'e import edildi
- [x] GEMINI_API_KEY environment variable eklendi
- [x] Deploy başarılı
- [x] Production URL açılıyor
- [x] Health check 200 dönüyor
- [x] AI endpoint çalışıyor
- [x] UI test başarılı

---

## 🆘 Yardım

**Sorun yaşarsan:**
1. Vercel Dashboard → Function Logs
2. Browser Console (F12)
3. LOCAL_TEST.md tekrar kontrol et
4. GitHub Issues aç (repo'nda)

---

**Son Güncelleme:** 2026-01-20  
**Deploy Platform:** Vercel  
**Git Hosting:** GitHub
