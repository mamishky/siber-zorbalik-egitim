# Safetagram - Deployment ve Kurulum Notları

## 🚀 Güncellemeler (2026-01-20)

Bu versiyon **16 maddelik kapsamlı güncelleme** içermektedir. Tüm değişiklikler production'a alınmadan önce **TEST_CHECKLIST.md** dosyasındaki adımların tamamlanması GEREKLİDİR.

---

## 📋 Ön Koşullar

### 1. Firebase Konfigürasyonu
- Firebase projesi aktif olmalı
- Firestore Database aktif edilmiş olmalı
- Firebase Authentication (Email/Password) etkin olmalı
- `firebaseConfig` değerleri `app.js`'te doğru olmalı

### 2. Gemini AI Backend
- `/api/ai/generate.js` endpoint'i çalışır durumda olmalı
- `GEMINI_API_KEY` environment variable tanımlanmış olmalı
- Backend CORS ayarları doğru yapılandırılmış olmalı

### 3. Vercel/GitHub Pages Deployment
- Vercel kullanıyorsanız: `vercel.json` dosyası mevcut
- GitHub Pages kullanıyorsanız: `CNAME` dosyası mevcut

---

## 🔧 Environment Variables

### Vercel Deployment için:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

**NOT:** API anahtarını ASLA frontend koduna koymayın! Backend environment variables kullanın.

---

## 🗂️ Dosya Yapısı

```
siber-zorbalik-egitim-main/
├── index.html               # Ana HTML dosyası (güncellenmiş)
├── app.js                   # Ana uygulama mantığı (KAPSAMLI GÜNCELLENDİ)
├── styles.css               # Stil dosyası (güncellenmiş)
├── scenarios.js             # Senaryo verileri (güncellenmiş)
├── ai-message-generator.js  # AI mesaj üretici (referans)
├── api/ai/generate.js       # Backend AI endpoint (GEREKLİ)
├── TEST_CHECKLIST.md        # Manuel test adımları (YENİ)
├── DEPLOYMENT_NOTES.md      # Bu dosya (YENİ)
├── vercel.json              # Vercel config
└── package.json             # Node dependencies
```

---

## 📝 Kritik Değişiklikler

### 1. Session State Yönetimi
- **ÖNEMLI:** Her oturum başlangıcında state tamamen sıfırlanıyor
- localStorage ve sessionStorage temizleniyor
- Eski veriler yeni oturumlara ASLA sızmamalı

### 2. Mesaj Zamanlama Sistemi
- Tam 10 mesaj gönderilir (5 güvenli + 5 zorbalık)
- Her zorbalık türünden mutlaka 1 mesaj vardır
- Ana sayfaya döndükten sonra 10 saniye bekler
- İlk mesaj oturum başladıktan 1 saniye sonra gelir

### 3. AI Entegrasyonu
- AI artık opsiyonel DEĞİL, her zaman aktif
- Backend endpoint `/api/ai/generate` kullanılıyor
- Fallback mekanizması mevcut (API hatası durumunda)

### 4. Firebase Persistence
- "Beni Hatırla" seçilirse: `LOCAL` persistence
- Seçilmezse: `SESSION` persistence
- E-posta adresi localStorage'de saklanıyor (güvenli)

### 5. Veri Kayıt Yapısı
- Cevap süresi artık KAYDEDILMIYOR
- Oturum toplam süresi eklendi (saniye + dakika)
- 2 ayrı veri alanı: Beceri Analizi + Oturum Kayıtları

---

## 🧪 Deployment Öncesi Kontrol Listesi

- [ ] `TEST_CHECKLIST.md`'deki tüm testler başarılı
- [ ] Firebase credentials doğru
- [ ] Gemini API key environment variable olarak tanımlı
- [ ] Backend endpoint'i test edildi
- [ ] Console'da hata yok
- [ ] Mobil responsive test yapıldı
- [ ] Çoklu oturum testi başarılı
- [ ] CSV indirme çalışıyor
- [ ] "Beni Hatırla" özelliği test edildi

---

## 🚨 Bilinen Limitasyonlar

### 1. Gemini API Rate Limiting
- Backend'de 5 dakikada 15 istek limiti var
- Çok hızlı mesajlaşma durumunda geçici olarak AI yanıt vermeyebilir
- Production'da bu limiti artırmak gerekebilir

### 2. localStorage Boyutu
- Mesaj geçmişi localStorage'de saklanıyor
- Çok fazla oturum durumunda localStorage dolabilir
- Periyodik temizleme önerilir

### 3. Firebase Free Tier
- Firestore günlük okuma/yazma limitleri var
- Yoğun kullanımda kotalar kontrol edilmeli

### 4. Browser Compatibility
- Modern tarayıcılar destekleniyor (Chrome, Firefox, Safari, Edge)
- IE desteği YOK
- JavaScript aktif olmalı

---

## 🔄 Update/Rollback Prosedürü

### Deployment
```bash
# Vercel deployment (otomatik)
git push origin main

# Manuel deployment
vercel --prod
```

### Rollback (Acil Durum)
```bash
# Vercel'de önceki deployment'a dön
vercel rollback

# veya commit'i geri al
git revert HEAD
git push origin main
```

---

## 📊 Monitoring

### Kontrol Edilmesi Gerekenler
1. Firebase Console → Firestore → Data kayıtları
2. Vercel Dashboard → Functions → `/api/ai/generate` logları
3. Browser Console → JavaScript hataları
4. CSV export dosyaları → Veri bütünlüğü

### Önerilen İzleme Metrikleri
- Oturum başarı oranı (tamamlanan/başlatılan)
- AI API başarı oranı
- Firebase yazma/okuma sayıları
- Ortalama oturum süresi
- Beceri basamaklarında başarı oranları

---

## 🆘 Sorun Giderme

### Problem: AI mesajlar gelmiyor
**Çözüm:**
1. Backend endpoint'i kontrol et: `/api/ai/generate`
2. `GEMINI_API_KEY` environment variable var mı?
3. CORS ayarları doğru mu?
4. Rate limit aşıldı mı? (5 dk bekle)

### Problem: Eski mesajlar yeni oturumda görünüyor
**Çözüm:**
1. localStorage'i temizle: `localStorage.clear()`
2. `currentSession` objesi doğru sıfırlanıyor mu?
3. `sessionForm` submit handler'ı kontrol et

### Problem: Firebase'e veri kaydedilmiyor
**Çözüm:**
1. Firebase credentials doğru mu?
2. Firestore rules ayarları kontrol et
3. Internet bağlantısı var mı?
4. Browser console'da Firebase hatası var mı?

### Problem: CSV indirme çalışmıyor
**Çözüm:**
1. Popup blocker kapalı mı?
2. Download izinleri verildi mi?
3. Console'da hata var mı?
4. Firestore'da veri var mı?

### Problem: "Beni Hatırla" çalışmıyor
**Çözüm:**
1. localStorage destekli mi? (Incognito modda çalışmaz)
2. Cookies aktif mi?
3. Firebase persistence set ediliyor mu?
4. Browser storage temizlenmiş mi?

---

## 📞 İletişim

Sorun durumunda:
1. `TEST_CHECKLIST.md` dosyasını kontrol edin
2. Browser console loglarını inceleyin
3. Firebase/Vercel loglarına bakın
4. Gerekirse commit geçmişinden önceki sürüme dönün

---

## 📅 Version History

**v2.0.0** (2026-01-20)
- 16 maddelik kapsamlı güncelleme
- AI her zaman aktif
- 10 mesaj sistemi (5 güvenli + 5 zorbalık)
- 7 beceri basamağı
- 2 ayrı veri alanı (Beceri + Oturum)
- Inbox zaman etiketleri
- Beni hatırla özelliği
- Safetagram branding

**v1.0.0** (Önceki versiyon)
- Temel Instagram simülasyonu
- Firebase entegrasyonu
- Senaryo bazlı mesajlaşma

---

## ✅ Production Checklist

Canlıya almadan önce:

- [ ] Tüm testler geçti
- [ ] Firebase production DB kullanılıyor
- [ ] Gemini API key production key
- [ ] CORS ayarları production domain'i içeriyor
- [ ] Error handling test edildi
- [ ] Fallback mekanizmaları çalışıyor
- [ ] Analytics kuruldu (opsiyonel)
- [ ] Backup alındı
- [ ] Rollback planı hazır
- [ ] Kullanıcı dökümantasyonu güncellendi
- [ ] README.md güncellendi

---

**Son Güncelleme:** 2026-01-20  
**Versiyon:** 2.0.0  
**Durum:** Production Ready (Test Sonrası)
