# SiberGüven - Siber Zorbalık Farkındalık Eğitim Uygulaması

## 📌 Proje Açıklaması

SiberGüven, tez çalışması için geliştirilmiş Instagram benzeri bir siber zorbalık farkındalık eğitim web uygulamasıdır. Uygulama, kullanıcılara gerçekçi sosyal medya senaryoları üzerinden siber zorbalıkla başa çıkma becerilerini öğretir.

## 🎯 Temel Özellikler

### 1. Instagram Benzeri Arayüz
- **Ana Sayfa (Feed)**: Çocuk dostu 35+ post (kediler, köpekler, tavşanlar, kelebekler, gökkuşağı, balonlar, pastalar, dondurma, oyunlar, sporlar, sanat, müzik, plaj, lunapark, sirk, hayvanat bahçesi hayvanları ve daha fazlası)
- **Hikayeler (Stories)**: Kullanıcı hikayeleri
- **Mesaj Kutusu/Inbox**: Mesaj listesi görünümü, okunmamış mesaj göstergeleri
- **Direkt Mesajlar (DM)**: Asıl eğitim senaryolarının gerçekleştiği alan
- **Modern Tasarım**: Instagram web arayüzüne benzer, ortalanmış feed (max 470px), temiz ve kompakt görünüm
- **Alt Navigasyon Barı**: Kolay gezinme

### 2. Oturum Türleri (5 Farklı Oturum)

Her oturum seçilen zorbalık türü için 5 mesaj içerir (3 siber zorbalık + 2 güvenli mesaj):

1. **Başlama Düzeyi**: Katılımcının başlangıç seviyesini ölçer (ön-test verisi otomatik alınır)
2. **Uygulama**: Öğrenme ve pratik yapma aşaması (son-test verisi otomatik alınır)
3. **İzleme (2. Hafta)**: 2 hafta sonra veri toplama
4. **İzleme (4. Hafta)**: 4 hafta sonra veri toplama
5. **İzleme (8. Hafta)**: 8 hafta sonra veri toplama

### 3. Siber Zorbalık Türleri

Her oturum başlangıcında tek bir zorbalık türü seçilir:

1. **Sözel/Psikolojik Saldırı**: Hakaret, aşağılama
2. **Sosyal Dışlanma**: Gruplara alınmama, dışlanma
3. **Tehdit ve Şantaj**: Zorla bir şey yaptırma
4. **Yanlış Bilgi/İftira/Dedikodu**: Asılsız bilgi yayma
5. **Kimlik Taklidi/Sahte Hesap**: Başkası gibi davranma

### 4. Mesaj Sistemi

**Mesaj Dağılımı (Her Zorbalık Türü İçin):**
- **5 farklı kişiden mesaj** gelir
- **3 mesaj siber zorbalık** içerir
- **2 mesaj güvenli/normal** mesajdır

**Mesaj Kutusu Akışı:**
1. Kullanıcı 10 saniye sonra mesaj bildirimi alır
2. Mesaj ikonuna tıklandığında **mesaj listesi/inbox** açılır
3. Okunmamış mesajlar **mavi nokta** ile işaretli görünür
4. Kullanıcı hangi mesaja tıklarsa **o sohbet açılır**
5. Sohbette cevap yazar VEYA şikayet et/engelle butonlarını kullanır

**Mesaj Özellikleri:**
- **Güvenli mesajlar**: Serbest metin cevabı (max 180 karakter)
- **Siber zorbalık mesajları**: Sırayla → ŞİKAYET ET → ENGELLE

### 5. Sabit Bekleme Süreli Öğretim - Yeni İpucu Sistemi

**İpucu Sistemi Özellikleri:**
- **Yazılı ipucu metni KALDIRILDI** (overlay metin yok)
- **5 saniye** içinde doğru cevap verilmezse **sadece butonlar yanıp söner**
- Yanlış butona tıklandığında **doğru buton yanıp söner** (metin yok, sadece animasyon)
- Yanıp sönme animasyonu dikkat çekici (pulse/blink efekti)
- Şikayet etmeden engellemeye izin verilmez (sıralı adımlar)

### 6. Beceri Analizi

Sistem aşağıdaki 5 beceriyi değerlendirir:

1. ✓/✗ Sosyal medya uygulamasında gezinme
2. ✓/✗ Gelen mesajı okuma
3. ✓/✗ Siber zorbalık içermeyen mesajı cevaplama
4. ✓/✗ Siber zorbalık içeren mesajı şikâyet etme
5. ✓/✗ Siber zorbalık yapan kişiyi engelleme

### 7. Veri Kayıt (LocalStorage + Excel Export)

Her etkileşim için kaydedilen bilgiler:
- Katılımcı ID (otomatik oluşturulur), adı, yaşı
- Oturum türü ve zorbalık türü
- Her beceri için +/- durumu
- Tepki süresi (saniye)
- İpucu kullanımı (Evet/Hayır)
- Tarih ve saat bilgisi

### 8. Akademisyen Kontrol Paneli

- **Şifre**: `06112002`
- Tüm verileri görüntüleme
- Oturum ve zorbalık türüne göre filtreleme
- Excel (CSV) formatında veri aktarma
- Tüm verileri temizleme

**Not**: Bu demo/tez amaçlı basit bir şifredir. Gerçek kullanımda güvenli kimlik doğrulama kullanılmalıdır.

### 9. Özet Ekranı

Her oturum sonunda gösterilen bilgiler:
- Doğru cevap sayısı
- Yanlış cevap sayısı
- İpucu kullanım sayısı
- 5 beceri için detaylı tablo

## 🚀 Kurulum ve Kullanım

### Gereksinimler
- Modern web tarayıcı (Chrome, Firefox, Safari, Edge)
- JavaScript etkin olmalı
- İnternet bağlantısı (Font Awesome ve DiceBear avatarları için)

### Çalıştırma

1. Repoyu klonlayın:
```bash
git clone https://github.com/mamishky/siber-zorbalik-egitim.git
```

2. Dizine gidin:
```bash
cd siber-zorbalik-egitim
```

3. `index.html` dosyasını bir web tarayıcısında açın:
```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

### GitHub Pages ile Yayınlama

1. Repository settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` / Root
4. Save

Uygulama şu adreste yayınlanacaktır:
`https://mamishky.github.io/siber-zorbalik-egitim/`

## 📁 Dosya Yapısı

```
siber-zorbalik-egitim/
│
├── index.html          # Ana HTML dosyası (tüm ekranlar)
├── styles.css          # CSS stilleri (Instagram benzeri tasarım)
├── scenarios.js        # Yeni senaryo yapısı (5 oturum × 5 zorbalık türü × 5 kişi)
├── app.js              # Ana JavaScript uygulama mantığı
└── README.md           # Proje dokümantasyonu
```

## 🎮 Kullanım Kılavuzu

### Katılımcı İçin

1. **Giriş Yapma**:
   - Adınızı ve yaşınızı girin
   - Oturum türünü seçin (Başlama Düzeyi, Uygulama, İzleme 2/4/8. Hafta)
   - Zorbalık türünü seçin (Sözel, Dışlanma, Tehdit, İftira, Kimlik)
   - "Başla" butonuna tıklayın

2. **Ana Ekran**:
   - Instagram benzeri arayüzü keşfedin
   - Çocuk dostu postları görün
   - 10 saniye sonra mesaj bildirimi gelecektir

3. **Mesajlaşma**:
   - Mesaj ikonuna tıklayın
   - Mesaj listesinde (inbox) okunmamış mesajları görün
   - Mesaja tıklayarak sohbeti açın
   - Güvenli mesajlara metin ile cevap verin
   - Siber zorbalık mesajlarında sırasıyla:
     1. ŞİKAYET ET butonuna basın
     2. ENGELLE butonuna basın
   - 5 saniye beklerseniz butonlar yanıp sönecek (ipucu)
   - Yanlış butona basarsanız doğru buton yanıp sönecek

4. **Oturum Sonu**:
   - Özet ekranında performansınızı görün
   - "Bitir" butonuyla ana ekrana dönün

### Akademisyen İçin

1. **Giriş**:
   - "Akademisyen Girişi" butonuna tıklayın
   - Şifre: `06112002`

2. **Veri Görüntüleme**:
   - Tüm katılımcı verilerini tabloda görün
   - Filtreleme yapın (oturum türü, zorbalık türü)

3. **Veri Aktarma**:
   - "Excel'e Aktar" butonu ile CSV dosyası indirin
   - Excel veya Google Sheets ile açın

4. **Veri Yönetimi**:
   - "Tüm Verileri Temizle" ile tüm kayıtları silin
   - Dikkat: Bu işlem geri alınamaz!

## 🛠️ Teknik Detaylar

### Kullanılan Teknolojiler

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Veri Depolama**: Browser LocalStorage
- **İkonlar**: Font Awesome 6.4.0
- **Avatarlar**: DiceBear Avataaars API
- **Export**: CSV formatında veri aktarma

### Tarayıcı Desteği

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### LocalStorage Kullanımı

Veriler tarayıcının LocalStorage'ında `siberguven_data` anahtarı altında JSON formatında saklanır:

```javascript
[
  {
    "participantId": "P1704388245123",
    "participantName": "Ahmet",
    "participantAge": 14,
    "sessionType": "baslama",
    "sessionLabel": "Başlama Düzeyi",
    "bullyingType": "sozel",
    "bullyingLabel": "Sözel/Psikolojik Saldırı",
    "messageType": "cyberbullying",
    "action": "report",
    "reactionTime": "3.45",
    "hintUsed": false,
    "correct": true,
    "timestamp": "2024-01-15T10:30:45.123Z"
  }
]
```

## 📊 Veri Analizi

CSV dosyasında yer alan sütunlar:

1. **Katılımcı ID**: Otomatik oluşturulan benzersiz kimlik
2. **Ad**: Katılımcı adı
3. **Yaş**: Katılımcı yaşı
4. **Oturum**: Oturum türü
5. **Zorbalık Türü**: Mesajın zorbalık kategorisi
6. **Mesaj Türü**: safe / cyberbullying
7. **Aksiyon**: reply / report / block
8. **Tepki Süresi (sn)**: Saniye cinsinden
9. **İpucu**: Evet / Hayır
10. **Doğru**: Evet / Hayır
11. **Tarih/Saat**: ISO 8601 formatında

## 🎓 Eğitim Yaklaşımı

### Öğretim Stratejisi

1. **Sabit Bekleme Süreli Öğretim**: 5 saniye içinde tepki yoksa ipucu (sadece buton animasyonu)
2. **Görsel İpuçları**: Yanıp sönen butonlar (metin ipucu kaldırıldı)
3. **Kademeli Destek**: İlk yanlış adımda ipucu
4. **Pozitif Pekiştirme**: Doğru davranışların ödüllendirilmesi
5. **Tekrarlı Pratik**: 5 farklı oturum ile beceri pekiştirme

### Değerlendirme Kriterleri

- **Doğruluk**: Doğru adımların tamamlanması
- **Hız**: Tepki süresinin kısalması
- **Bağımsızlık**: İpucu ihtiyacının azalması
- **Genelleme**: Farklı senaryolarda başarı

## 🔒 Güvenlik ve Gizlilik

- Veriler sadece tarayıcının LocalStorage'ında saklanır
- Sunucuya veri gönderilmez
- Katılımcı ID otomatik oluşturulur (timestamp bazlı)
- Akademisyen şifresi basit bir demo şifresidir (tez/eğitim amaçlı)
- **Önemli**: Gerçek kullanımda:
  - Sunucu taraflı kimlik doğrulama kullanılmalıdır
  - Veriler güvenli bir veritabanında saklanmalıdır
  - HTTPS protokolü kullanılmalıdır
  - Katılımcı verileri şifrelenmelidir

## 🤝 Katkıda Bulunma

Bu bir tez projesidir. Öneriler için issue açabilirsiniz.

## 📄 Lisans

Bu proje eğitim amaçlıdır.

## 👥 İletişim

Proje Sahibi: [mamishky](https://github.com/mamishky)

## 📝 Notlar

- Uygulama tamamen Türkçe dilindedir
- 5 oturum × 5 zorbalık türü × 5 mesaj = 125 benzersiz senaryo
- Mobil uyumlu responsive tasarım
- Offline çalışabilir (avatarlar hariç)
- Tarayıcı kapatılsa bile veriler korunur
- Çocuk dostu içerik ve renkli tasarım

## 🔄 Güncellemeler

### v2.0.0 (2024)
- ✨ Yeni mesaj inbox/liste sistemi
- 🎨 35+ çocuk dostu post eklendi
- 🔔 Okunmamış mesaj göstergeleri
- 💡 İpucu sistemi güncellendi (sadece buton animasyonu, metin kaldırıldı)
- 📊 5 oturum türü (Başlama, Uygulama, İzleme 2/4/8. Hafta)
- 🎯 Her zorbalık türü için 5 farklı kişiden mesaj
- 🔒 Akademisyen şifresi güncellendi (06112002)
- 📱 Modern Instagram web tasarımı (ortalanmış, max 470px feed)
- 🎨 Daha kompakt ve temiz post görünümleri

### v1.0.0 (2024)
- İlk sürüm
- Temel özellikler
- Akademisyen paneli
- Excel export özelliği