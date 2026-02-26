# 🔥 Firebase Firestore Yeniden Aktif Etme Rehberi

## 📋 Mevcut Durum Kontrolü

### 1. Tarayıcı Konsolunu Kontrol Et
1. Uygulamayı açın: `http://localhost:8000`
2. Tarayıcıda **F12** veya **Cmd+Option+I** (Mac) tuşlarına basın
3. **Console** sekmesine gidin
4. Giriş yapmayı deneyin ve şu hatalardan birini görüyor musunuz kontrol edin:
   - `❌ Firebase Firestore hatası`
   - `permission-denied`
   - `quota-exceeded`
   - `unavailable`

### 2. Firebase Proje Bilgileri
- **Proje ID:** `safestagram-a458a`
- **Auth Domain:** `safestagram-a458a.firebaseapp.com`
- **Firestore Database:** `(default)` database

---

## 🔧 Firebase Firestore'u Yeniden Aktif Etme Adımları

### ADIM 1: Firebase Console'a Giriş Yapın

1. **Firebase Console**'a gidin: https://console.firebase.google.com/
2. Google hesabınızla giriş yapın
3. Proje listesinden **"safestagram-a458a"** projesini seçin

---

### ADIM 2: Firestore Database Durumunu Kontrol Edin

1. Sol menüden **"Firestore Database"** (veya **"Build" > "Firestore Database"**) seçin
2. Şu durumlardan biri görünebilir:
   - ✅ **"Database oluşturuldu"** → Aktif, sorun yok
   - ⚠️ **"Database oluştur"** → Database henüz oluşturulmamış
   - 🚫 **"Paused"** veya **"Suspended"** → Database duraklatılmış
   - 💳 **"Quota exceeded"** → Kotası aşılmış

---

### ADIM 3: Firestore Database'i Oluştur/Aktif Et

#### Senaryo A: Database Henüz Oluşturulmamışsa

1. **"Database oluştur"** butonuna tıklayın
2. **"Test modunda başlat"** seçeneğini seçin (geliştirme için)
   - ⚠️ **ÖNEMLİ:** Production'da mutlaka güvenlik kuralları ekleyin!
3. **Bölge seçin:** `europe-west` veya `us-central` (Türkiye için `europe-west` önerilir)
4. **"Etkinleştir"** butonuna tıklayın

#### Senaryo B: Database Duraklatılmışsa (Paused/Suspended)

1. Database sayfasında üstte **"Resume"** veya **"Resume Database"** butonunu görün
2. Tıklayın ve onaylayın
3. Database birkaç dakika içinde aktif hale gelir

#### Senaryo C: Kotası Aşılmışsa (Quota Exceeded)

1. **Firebase Console** > **"Usage and billing"** (veya **"Kullanım ve faturalandırma"**) sekmesine gidin
2. **"Upgrade to Blaze Plan"** (Ücretli plana geç) seçeneğini seçin
   - ⚠️ **NOT:** Blaze planı "pay as you go" modelidir - sadece kullandığınız kadar ödersiniz
   - Ücretsiz kotanın üzerine çıkmadığınız sürece ücret ödemezsiniz
3. Ödeme bilgilerinizi girin (kredi kartı)
4. Database otomatik olarak aktif hale gelir

---

### ADIM 4: Güvenlik Kurallarını Ayarlayın

1. Firestore Database sayfasında **"Rules"** sekmesine gidin
2. Şu kuralları ekleyin (test modu için):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kullanıcılar sadece kendi verilerini okuyup yazabilir
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Oturumlar - kullanıcılar sadece kendi oturumlarını okuyup yazabilir
    match /sessions/{sessionId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Test modu - HERKES okuyup yazabilir (sadece geliştirme için!)
    // Production'da bu kuralı KALDIRIN!
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. **"Publish"** butonuna tıklayın

---

### ADIM 5: Authentication'ı Kontrol Edin

1. Sol menüden **"Authentication"** seçin
2. **"Sign-in method"** sekmesine gidin
3. **"Email/Password"** metodunun aktif olduğundan emin olun
   - Aktif değilse **"Enable"** butonuna tıklayın
4. **"Save"** butonuna tıklayın

---

### ADIM 6: Uygulamayı Test Edin

1. Tarayıcıda uygulamayı açın: `http://localhost:8000`
2. **F12** ile konsolu açın
3. Giriş yapmayı deneyin:
   - Eğer kayıtlı kullanıcınız yoksa önce **"Üye Ol"** ile kayıt olun
   - Sonra giriş yapın
4. Konsolda şu mesajları görmelisiniz:
   - ✅ `Firebase initialized successfully`
   - ✅ `Firebase Auth and Firestore ready`
   - ✅ `Login successful: [user-id]`

---

## 🚨 Yaygın Hatalar ve Çözümleri

### Hata 1: "permission-denied"
**Çözüm:** Firestore Rules'da kullanıcıya izin verilmemiş. ADIM 4'teki kuralları ekleyin.

### Hata 2: "quota-exceeded"
**Çözüm:** Ücretsiz kotası aşılmış. ADIM 3C'deki Blaze planına geçin.

### Hata 3: "unavailable" veya "network-error"
**Çözüm:** 
- İnternet bağlantınızı kontrol edin
- Ad blocker'ı devre dışı bırakın
- Tarayıcıyı yenileyin (Ctrl+F5 veya Cmd+Shift+R)

### Hata 4: "auth/user-not-found"
**Çözüm:** Kullanıcı kayıtlı değil. Önce "Üye Ol" ile kayıt olun.

---

## 📊 Firebase Kullanımını İzleme

1. Firebase Console > **"Usage and billing"** sekmesine gidin
2. **"Firestore"** bölümünden:
   - Günlük okuma/yazma sayısını görebilirsiniz
   - Depolama kullanımını kontrol edebilirsiniz
   - Ücretsiz kotanın ne kadarını kullandığınızı görebilirsiniz

**Ücretsiz Kotanın Limitleri:**
- 📖 **Okuma:** 50,000/gün
- ✍️ **Yazma:** 20,000/gün
- 💾 **Depolama:** 1 GB

---

## ✅ Başarı Kontrolü

Firestore başarıyla aktif edildiyse:
- ✅ Firebase Console'da database görünür
- ✅ Uygulamada giriş yapabilirsiniz
- ✅ Veriler Firestore'a kaydedilir
- ✅ Konsolda hata mesajı görünmez

---

## 📞 Destek

Sorun devam ederse:
1. Firebase Console > **"Support"** sekmesinden destek talebi açın
2. Hata mesajlarını ve konsol loglarını ekleyin
3. Proje ID'nizi belirtin: `safestagram-a458a`

---

**Son Güncelleme:** 2026-01-30
