# SiberGüven - Siber Zorbalık Farkındalık Eğitim Uygulaması

## 📌 Proje Açıklaması

SiberGüven, tez çalışması için geliştirilmiş Instagram benzeri bir siber zorbalık farkındalık eğitim web uygulamasıdır. Uygulama, kullanıcılara gerçekçi sosyal medya senaryoları üzerinden siber zorbalıkla başa çıkma becerilerini öğretir.

## 🎯 Temel Özellikler

### 1. Instagram Benzeri Arayüz
- **Ana Sayfa (Feed)**: Postlar ve beğeniler
- **Hikayeler (Stories)**: Kullanıcı hikayeleri
- **Direkt Mesajlar (DM)**: Asıl eğitim senaryolarının gerçekleştiği alan
- **Profil Sayfası**: Kullanıcı profili
- **Bildirimler**: Sosyal medya bildirimleri
- **Keşfet Sayfası**: İçerik keşfi
- **Alt Navigasyon Barı**: Kolay gezinme

### 2. Oturum Türleri (4 Aşama)

Her oturum 25 mesaj içerir (5 zorbalık türü × 5 mesaj):

1. **Başlama Düzeyi (Ön-Test)**: Katılımcının başlangıç seviyesini ölçer
2. **Uygulama**: Öğrenme ve pratik yapma aşaması
3. **Son-Test**: Öğrenilenlerin değerlendirilmesi
4. **Genelleme**: Becerilerin farklı bağlamlarda uygulanması

**TOPLAM**: 4 oturum × 25 mesaj = **100 benzersiz Türkçe senaryo**

### 3. Siber Zorbalık Türleri

1. **Sözel/Psikolojik Saldırı**: Hakaret, aşağılama
2. **Sosyal Dışlanma**: Gruplara alınmama, dışlanma
3. **Tehdit ve Şantaj**: Zorla bir şey yaptırma
4. **Yanlış Bilgi/İftira/Dedikodu**: Asılsız bilgi yayma
5. **Kimlik Taklidi/Sahte Hesap**: Başkası gibi davranma

### 4. Mesaj Sistemi

- Her oturumda **5 mesaj** (3 güvenli, 2 siber zorbalık)
- Uygulama başladıktan **10 saniye sonra** ilk mesaj gelir
- Her mesaja cevap verildikten **10 saniye sonra** yeni mesaj gelir
- **Güvenli mesajlar**: Serbest metin cevabı (max 180 karakter)
- **Siber zorbalık mesajları**: Sırayla → ŞİKAYET ET → ENGELLE → YETİŞKİNE BİLDİR

### 5. Sabit Bekleme Süreli Öğretim

- **5 saniye** içinde doğru cevap verilmezse ipucu gösterilir
- İpucu: Hem yazılı metin hem buton yanıp söner
- Şikayet etmeden engellemeye izin verilmez (sıralı adımlar)

### 6. Beceri Analizi

Sistem aşağıdaki 6 beceriyi değerlendirir:

1. ✓/✗ Sosyal medya uygulamasında gezinme
2. ✓/✗ Gelen mesajı okuma
3. ✓/✗ Siber zorbalık içermeyen mesajı cevaplama
4. ✓/✗ Siber zorbalık içeren mesajı şikâyet etme
5. ✓/✗ Siber zorbalık yapan kişiyi engelleme
6. ✓/✗ Yaşadığı olumsuz olayı bir yetişkine bildirme

### 7. Veri Kayıt (LocalStorage + Excel Export)

Her etkileşim için kaydedilen bilgiler:
- Katılımcı ID, adı, yaşı
- Oturum türü ve zorbalık türü
- Her beceri için +/- durumu
- Tepki süresi (saniye)
- İpucu kullanımı (Evet/Hayır)
- Tarih ve saat bilgisi

### 8. Akademisyen Kontrol Paneli

- **Şifre**: `akademisyen2024` (Not: Bu demo/tez amaçlı basit bir şifredir. Gerçek kullanımda güvenli kimlik doğrulama kullanılmalıdır.)
- Tüm verileri görüntüleme
- Oturum ve zorbalık türüne göre filtreleme
- Excel (CSV) formatında veri aktarma
- Tüm verileri temizleme

### 9. Özet Ekranı

Her oturum sonunda gösterilen bilgiler:
- Doğru cevap sayısı
- Yanlış cevap sayısı
- İpucu kullanım sayısı
- 6 beceri için detaylı tablo

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
├── scenarios.js        # 100 Türkçe senaryo verisi
├── app.js              # Ana JavaScript uygulama mantığı
└── README.md           # Proje dokümantasyonu
```

## 🎮 Kullanım Kılavuzu

### Katılımcı İçin

1. **Giriş Yapma**:
   - Katılımcı ID, ad ve yaş bilgilerini girin
   - Oturum türünü seçin
   - "Başla" butonuna tıklayın

2. **Ana Ekran**:
   - Instagram benzeri arayüzü keşfedin
   - 10 saniye sonra ilk mesaj gelecektir

3. **Mesajlaşma**:
   - Güvenli mesajlara metin ile cevap verin
   - Siber zorbalık mesajlarında sırasıyla:
     1. ŞİKAYET ET butonuna basın
     2. ENGELLE butonuna basın
     3. YETİŞKİNE BİLDİR butonuna basın
   - İpuçlarını takip edin

4. **Oturum Sonu**:
   - Özet ekranında performansınızı görün
   - "Bitir" butonuyla ana ekrana dönün

### Akademisyen İçin

1. **Giriş**:
   - "Akademisyen Girişi" butonuna tıklayın
   - Şifre: `akademisyen2024`

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
    "participantId": "001",
    "participantName": "Ahmet",
    "participantAge": 14,
    "sessionType": "baslama",
    "sessionLabel": "Başlama Düzeyi (Ön-Test)",
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

1. **Katılımcı ID**: Benzersiz kimlik
2. **Ad**: Katılımcı adı
3. **Yaş**: Katılımcı yaşı
4. **Oturum**: Oturum türü
5. **Zorbalık Türü**: Mesajın zorbalık kategorisi
6. **Mesaj Türü**: safe / cyberbullying
7. **Aksiyon**: reply / report / block / notify
8. **Tepki Süresi (sn)**: Saniye cinsinden
9. **İpucu**: Evet / Hayır
10. **Doğru**: Evet / Hayır
11. **Tarih/Saat**: ISO 8601 formatında

## 🎓 Eğitim Yaklaşımı

### Öğretim Stratejisi

1. **Sabit Bekleme Süreli Öğretim**: 5 saniye içinde tepki yoksa ipucu
2. **Kademeli Destek**: Görsel ve yazılı ipuçları
3. **Pozitif Pekiştirme**: Doğru davranışların ödüllendirilmesi
4. **Tekrarlı Pratik**: 4 farklı oturum ile beceri pekiştirme

### Değerlendirme Kriterleri

- **Doğruluk**: Doğru adımların tamamlanması
- **Hız**: Tepki süresinin kısalması
- **Bağımsızlık**: İpucu ihtiyacının azalması
- **Genelleme**: Farklı senaryolarda başarı

## 🔒 Güvenlik ve Gizlilik

- Veriler sadece tarayıcının LocalStorage'ında saklanır
- Sunucuya veri gönderilmez
- Katılımcı bilgileri şifrelenmemiştir (demo amaçlı)
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
- 100 benzersiz senaryo içerir
- Mobil uyumlu responsive tasarım
- Offline çalışabilir (avatarlar hariç)
- Tarayıcı kapatılsa bile veriler korunur

## 🔄 Güncellemeler

### v1.0.0 (2024)
- İlk sürüm
- 100 Türkçe senaryo
- 6 beceri analizi
- Akademisyen paneli
- Excel export özelliği