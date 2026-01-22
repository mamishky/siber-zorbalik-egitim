# 🔧 Firebase ERR_BLOCKED_BY_CLIENT Hatası Çözümü

## ❌ Hata
```
net::ERR_BLOCKED_BY_CLIENT
POST https://firestore.googleapis.com/google.firestore.v1/firestore/Listen/...
```

## 🔍 Hatanın Nedeni

Bu hata **tarayıcı uzantıları** (özellikle reklam engelleyiciler) tarafından Firestore API isteklerinin engellenmesinden kaynaklanır.

### Yaygın Nedenler:
1. **Ad Blocker (Reklam Engelleme)** - En yaygın neden
2. **Privacy Badger** gibi gizlilik uzantıları
3. **uBlock Origin** gibi içerik engelleyiciler
4. **Tarayıcı güvenlik ayarları**

---

## ✅ Çözümler

### Çözüm 1: Ad Blocker'ı Devre Dışı Bırak (Hızlı Test)

#### Chrome/Edge:
1. Ad blocker uzantısına tıklayın
2. "Bu sitede devre dışı bırak" seçeneğini seçin
3. Sayfayı yenileyin (F5)

#### Firefox:
1. Ad blocker uzantısına tıklayın
2. "Bu sitede devre dışı bırak" seçeneğini seçin
3. Sayfayı yenileyin (F5)

#### Safari:
1. Safari > Ayarlar > Uzantılar
2. Ad blocker'ı geçici olarak kapatın
3. Sayfayı yenileyin

---

### Çözüm 2: Firestore Domain'ini Whitelist'e Ekle (Kalıcı)

#### uBlock Origin:
1. uBlock Origin ikonuna tıklayın
2. ⚙️ Ayarlar (Settings) > Filtre listeleri
3. "Whitelist" bölümüne şunu ekleyin:
   ```
   firestore.googleapis.com
   ```

#### AdBlock Plus:
1. AdBlock Plus ikonuna tıklayın
2. "Bu site için devre dışı bırak" seçeneğini seçin
   VEYA
3. Ayarlar > Gelişmiş > İzin verilen domainler
4. `firestore.googleapis.com` ekleyin

#### Privacy Badger:
1. Privacy Badger ikonuna tıklayın
2. `firestore.googleapis.com` için "İzin ver" seçeneğini seçin

---

### Çözüm 3: Gizli Modda Test Et

1. **Chrome:** `Cmd+Shift+N` (Mac) veya `Ctrl+Shift+N` (Windows)
2. **Firefox:** `Cmd+Shift+P` (Mac) veya `Ctrl+Shift+P` (Windows)
3. **Safari:** `Cmd+Shift+N`

Gizli modda uzantılar genellikle devre dışıdır.

---

### Çözüm 4: Tarayıcı Uzantılarını Kontrol Et

1. Tarayıcı ayarlarına gidin
2. Uzantılar/Add-ons bölümüne gidin
3. Şu uzantıları geçici olarak kapatın:
   - Ad blocker'lar
   - Privacy uzantıları
   - Tracking engelleyiciler
4. Sayfayı yenileyin

---

## 🧪 Test Etme

Çözümü uyguladıktan sonra:

1. **Console'u açın** (F12)
2. **Network sekmesine** gidin
3. **Sayfayı yenileyin** (F5)
4. `firestore.googleapis.com` isteklerinin **başarılı** olduğunu kontrol edin
5. Console'da **hata olmadığını** doğrulayın

---

## 📋 Hızlı Kontrol Listesi

- [ ] Ad blocker devre dışı mı?
- [ ] Firestore domain whitelist'te mi?
- [ ] Gizli modda çalışıyor mu?
- [ ] Console'da hata var mı?
- [ ] Network sekmesinde istekler başarılı mı?

---

## 🔄 Alternatif: Kod Tarafında Hata Yakalama

Eğer hata devam ederse, kod tarafında hata yakalama ekleyebiliriz:

```javascript
// Firestore bağlantısı için retry mekanizması
// veya kullanıcıya bilgilendirme mesajı
```

---

## ⚠️ Önemli Notlar

1. **Production'da sorun olmaz** - Bu hata sadece local test sırasında uzantılardan kaynaklanır
2. **Firebase yapılandırması doğru** - Sorun kodda değil, tarayıcı uzantılarında
3. **Gizli mod en hızlı çözüm** - Test için en pratik yöntem

---

## 🆘 Hala Çalışmıyorsa

1. **Farklı tarayıcı** deneyin (Chrome, Firefox, Safari)
2. **Tüm uzantıları** geçici olarak kapatın
3. **Tarayıcı cache'ini** temizleyin
4. **Hard refresh** yapın: `Cmd+Shift+R` (Mac) veya `Ctrl+Shift+R` (Windows)

---

## 📞 Destek

Eğer sorun devam ederse:
- Console'daki tam hata mesajını paylaşın
- Hangi tarayıcı ve uzantıları kullandığınızı belirtin
- Network sekmesindeki başarısız istekleri kontrol edin
