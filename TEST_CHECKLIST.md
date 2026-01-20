# Safetagram Test Checklist

## Güncelleme Sonrası Manuel Test Adımları

### 1. Giriş ve Oturum Başlatma
- [ ] Firebase ile giriş yapın
- [ ] "Beni Hatırla" checkbox'ı çalışıyor mu?
- [ ] Sayfa yenilendiğinde e-posta hatırlanıyor mu?
- [ ] Uygulamaya Giriş butonuna tıklayın
- [ ] AI seçim opsiyonu KALDIRILMIŞ mı? (Olmamalı)
- [ ] Katılımcı bilgilerini girin ve oturumu başlatın

### 2. İlk Mesaj Testi (Madde 4)
- [ ] Ana sayfaya geçtikten sonra 1 saniye içinde ilk mesaj geliyor mu?
- [ ] Bildirim toast'ı görünüyor mu?
- [ ] Bildirim sesi çalıyor mu?
- [ ] "Yeni mesaj" önizlemesi görünüyor mu?

### 3. Inbox Mesaj Kalıcılığı (Madde 5)
- [ ] Inbox'a girin
- [ ] Sadece GELMİŞ mesajlar görünüyor mu? (Gelecek mesajlar YOK)
- [ ] Mesaj zaman etiketleri doğru mu? ("Şimdi" / "X dk önce")
- [ ] Eski mesajlar geçmiş zaman gösteriyor mu?
- [ ] Engellenen kullanıcılar "🔴 ENGELLENDİ" olarak işaretli mi?

### 4. Mesaj Akışı ve Zamanlama (Madde 4)
- [ ] İlk mesajı açın ve cevaplayın
- [ ] Ana sayfaya GERİ DÖNÜN
- [ ] Tam 10 saniye sonra 2. mesaj geliyor mu?
- [ ] Bu akış 10 mesaj boyunca devam ediyor mu?
- [ ] Toplam 5 güvenli + 5 zorbalık mesajı var mı?
- [ ] Her zorbalık türünden (5 tür) 1'er mesaj var mı?

### 5. AI Mesajlaşma (Madde 1, 2, 3)
- [ ] Güvenli mesajlara cevap verdiğinizde AI yanıt veriyor mu?
- [ ] AI yanıtları Türkçe ve doğal mı?
- [ ] AI başlatıldı uyarısı ÇIKIYOR MU? (Çıkmamalı - Madde 2)
- [ ] Mesajlaşma akıcı ve kesintisiz mi?

### 6. Oturum State Sıfırlama (Madde 6)
- [ ] Bir oturumu tamamlayın
- [ ] Panele dönün ve YENİ oturum başlatın
- [ ] Eski mesajlar inbox'ta GÖRÜNMEMELİ
- [ ] Her şey temiz bir şekilde sıfırlanmış mı?
- [ ] Farklı katılımcı adı ile test edin

### 7. Şikayet Türleri (Madde 12)
- [ ] Siber zorbalık mesajı geldiğinde "Şikayet Et" butonuna basın
- [ ] Şikayet türleri güncellenmiş mi?
  - Sözel/Psikolojik Saldırı
  - Dışlama
  - Tehdit/Şantaj
  - Karalama/Aşağılama
  - Kimliğe Bürünme/Taklit
- [ ] Doğru türü seçtiğinizde onaylanıyor mu?

### 8. İpucu Sistemi (Madde 7, 8)
#### İpucu KULLAN modunda:
- [ ] "İpucu Kullan" ve "İpucu Kullanma" butonları HİZALI mı?
- [ ] Yanlış buton tıklanınca doğru buton yanıp sönüyor mu?
- [ ] 5 saniye sonra ipucu veriyor mu?

#### İpucu KULLANMA modunda:
- [ ] Yanlış şikayet türü seçilince HIGHLIGHT OLMAMALI
- [ ] Hiçbir görsel ipucu olmamalı
- [ ] Sadece doğru/yanlış kaydı tutulmalı

### 9. UI Düzenlemeleri (Madde 9, 11)
- [ ] Header'da "Instagram" yerine "SAFETAGRAM" yazıyor mu?
- [ ] Safetagram yazı tipi "Changa One" ve sarı mı?
- [ ] Şikayet/Engelle butonları BÜYÜK mü? (14px padding, 140px min-width)
- [ ] Inbox ekranı DARALMIŞ mı? (max-width: 520px)
- [ ] Mesaj ekranı DARALMIŞ mı? (max-width: 520px)
- [ ] Instagram benzeri dar görünüm var mı?

### 10. Beceri Basamakları (Madde 13)
- [ ] Özet ekranında 7 beceri basamağı görünüyor mu?
  1. Sosyal medya uygulamasında gezinme
  2. Gelen mesajı okuma
  3. Siber zorbalık içermeyen mesajı cevaplama
  4. Siber zorbalık içeren mesajı şikâyet etme
  5. Siber zorbalık şikayet türünü seçme
  6. Siber zorbalık yapan kişiyi engelleme
  7. Yaşadığı olumsuz olayı bir yetişkine bildirme

### 11. Uygulamacı Paneli (Madde 14, 15, 16)
- [ ] Uygulamacı Paneline girin
- [ ] 2 AYRI veri alanı var mı?

#### Alan 1: Beceri Analizi
- [ ] Oturum ID, Katılımcı, Yaş görünüyor mu?
- [ ] Başlangıç/Bitiş zamanları kaydediliyor mu?
- [ ] TOPLAM SÜRE (dakika) görünüyor mu? (Madde 15)
- [ ] Doğru/Yanlış sayısı var mı?
- [ ] Doğru/Yanlış YÜZDE hesaplanmış mı?
- [ ] "Beceri Analizi CSV İndir" butonu çalışıyor mu?

#### Alan 2: Oturum Kayıtları
- [ ] Mesaj bazlı kayıtlar görünüyor mu?
- [ ] Her mesaj için (+/-) sonuç var mı?
- [ ] Zorbalık türü doğru etiketlenmiş mi?
- [ ] CEVAP SÜRESİ alanı YOK mu? (Madde 15 - olmamalı)
- [ ] "Oturum Kayıtları CSV İndir" butonu çalışıyor mu?

### 12. CSV İndirme (Madde 14)
- [ ] "Beceri Analizi CSV İndir" butonuna tıklayın
- [ ] CSV dosyası iniyor mu?
- [ ] Türkçe karakterler doğru görünüyor mu?
- [ ] Başlıklar Türkçe mi?
- [ ] Toplam süre (dk) kolonu var mı?
- [ ] "Oturum Kayıtları CSV İndir" butonuna tıklayın
- [ ] İkinci CSV dosyası iniyor mu?
- [ ] Mesaj bazlı veriler doğru mu?

### 13. Bütünleşik Test
- [ ] BAŞTAN SONA tam bir oturum yapın (10 mesaj)
- [ ] Tüm beceri basamakları ✓ olarak işaretleniyor mu?
- [ ] Özet ekranı doğru istatistikleri gösteriyor mu?
- [ ] Firebase'e veriler kaydediliyor mu?
- [ ] Yeni oturum başlattığınızda eski veriler sızmıyor mu?

### 14. Çoklu Oturum Testi
- [ ] 3 farklı katılımcı ile 3 ayrı oturum yapın
- [ ] Her oturum ayrı kaydediliyor mu?
- [ ] Uygulamacı panelinde 3 oturum görünüyor mu?
- [ ] CSV'lerde 3 oturum var mı?
- [ ] Oturumlar birbirine karışmıyor mu?

### 15. Mobil Uyumluluk
- [ ] Tarayıcıyı mobil boyuta küçültün
- [ ] Butonlar hâlâ tıklanabilir mi?
- [ ] Inbox daraldı mı ama okunabilir mi?
- [ ] Şikayet/Engelle butonları mobilde de büyük mü?
- [ ] Safetagram logosu mobilde görünüyor mu?

### 16. Hata Kontrolleri
- [ ] Console'da hata var mı?
- [ ] Null/undefined hatası çıkıyor mu?
- [ ] Firebase bağlantı hatası var mı?
- [ ] Gemini API çağrısı başarısız olursa fallback çalışıyor mu?

---

## Test Sonuçları

**Tarih:** ___________  
**Test Eden:** ___________  
**Tarayıcı/Sürüm:** ___________  

**Genel Durum:** ☐ Başarılı  ☐ Kısmi Başarı  ☐ Başarısız

**Notlar:**
```
[Test sırasında bulunan sorunlar veya özel notlar buraya yazılabilir]
```

---

## Bilinen Sorunlar

1. **Gemini API Rate Limit:** Backend'de rate limiting var (5 dakikada 15 istek). Çok hızlı test yaparsanız geçici olarak AI yanıt vermeyebilir.

2. **localStorage Temizleme:** Eğer eski veriler görünüyorsa tarayıcı geliştirici araçlarından localStorage'i manuel temizleyin.

3. **Firebase Bağlantı:** İlk yüklemede Firebase bağlantısı kurulması 1-2 saniye sürebilir.

---

## Güncelleme Özeti (16 Madde)

✅ Madde 1: AI seçim opsiyonu kaldırıldı, AI her zaman aktif  
✅ Madde 2: "AI destekli sohbet başlatıldı" uyarısı kaldırıldı  
✅ Madde 3: Gemini AI entegrasyonu aktif (backend üzerinden)  
✅ Madde 4: 10 mesaj sistemi (5 güvenli + 5 tür zorbalık, 10 sn aralık)  
✅ Madde 5: Inbox mesaj kalıcılığı + zaman etiketleri  
✅ Madde 6: Oturum başında state tamamen sıfırlanıyor  
✅ Madde 7: İpucu kullan/kullanma butonları hizalandı  
✅ Madde 8: İpucu kullanma modunda highlight kaldırıldı  
✅ Madde 9: Şikayet/Engelle butonları büyütüldü, Inbox/Mesaj daraltıldı  
✅ Madde 10: "Beni Hatırla" checkbox eklendi (Firebase persistence)  
✅ Madde 11: Header "Instagram" → "Safetagram" güncellendi  
✅ Madde 12: Şikayet türü metinleri güncellendi  
✅ Madde 13: 7 beceri basamağı sistemi eklendi  
✅ Madde 14: Beceri analizi + yüzde + CSV indirme  
✅ Madde 15: Cevap süresi kaldırıldı, oturum toplam süresi eklendi  
✅ Madde 16: Uygulamacı paneli 2 ayrı veri alanı  
