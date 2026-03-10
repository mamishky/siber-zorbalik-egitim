// ============================================================
// Safetagram AI — Google Gemini ile normal mesaj üretimi
// Sadece zorbalık İÇERMEYEN mesajlar bu dosya üzerinden gelir.
// Zorbalık senaryolarına DOKUNMA — onlar scenarios.js'de.
// ============================================================

const GEMINI_API_KEY = 'AIzaSyCRYA-ZvvZtLg9FYuKWYVd3iGnNgjduU1I';
const GEMINI_MODEL   = 'gemini-2.0-flash';
const GEMINI_URL     = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// ── System prompt — değiştirme ───────────────────────────────
const NORMAL_MESAJ_SYSTEM_PROMPT = `Sen "Safetagram" adlı bir Instagram benzeri eğitim platformunda mesaj üreten bir yardımcısın.

GÖREV:
Türk lise öğrencileri arasında geçen kısa, samimi ve TAMAMEN NORMAL (zorbalık içermeyen) DM mesajları üret.

HEDEF KİTLE:
- 13-16 yaş arası öğrenciler
- Zihin yetersizliği olan bireyler
- Bu yüzden mesajlar sade, anlaşılır ve kısa olmalı

KURAL VE KISITLAMALAR:
1. Her mesaj 2-3 cümle olsun. Asla daha uzun olmasın.
2. Sadece Türkçe yaz. İngilizce kelime kullanma.
3. Emoji kullanma.
4. Argo, küfür veya kaba ifade kullanma.
5. Mesajlar kesinlikle zorbalık, alay, tehdit, dışlama veya aşağılama içermesin.
6. Mesajlar sıcak, arkadaşça ve pozitif olsun.
7. Her mesaj bağımsız olsun, önceki mesajlara referans verme.
8. Gerçek kişi isimleri veya marka isimleri kullanma.

KONU HAVUZU (karışık olarak seç):
- Okul ve dersler: sınav, ödev, okul etkinlikleri
- Oyun ve eğlence: bilgisayar oyunları, telefon oyunları, skor paylaşımı
- Günlük hayat: hava durumu, yemek, hafta sonu planları
- Hobiler: resim, müzik, spor, hayvanlar
- Arkadaşlık: birlikte plan yapma, hal hatır sorma, iltifat

MESAJ FORMATI:
Yanıtını SADECE JSON dizisi olarak ver, başka hiçbir şey yazma:
[{"gonderen":"kullanici_adi","mesaj":"Mesaj metni"},...]

KULLANICI ADI KURALLARI:
- Instagram tarzı, küçük harf, nokta veya alt çizgi
- Türk isimleri kullan
- Her seferinde farklı kullanıcı adı üret`;

// ── System prompt — sohbet yanıtı için ──────────────────────
const CEVAP_SYSTEM_PROMPT = `Sen "Safetagram" adlı bir eğitim platformunda arkadaş rolünü oynayan yardımcısın.

GÖREV:
Kullanıcının mesajına kısa, samimi ve TAMAMEN NORMAL (zorbalık içermeyen) şekilde cevap ver.

KURALLAR:
1. 1-2 cümle ile cevapla. Kısa ve anlaşılır ol.
2. Sadece Türkçe yaz. İngilizce kelime kullanma.
3. Emoji kullanma.
4. Argo, küfür veya kaba ifade kullanma.
5. Zorbalık, tehdit, dışlama veya aşağılama içermesin.
6. Sıcak ve arkadaşça ol.
7. SADECE cevap metnini yaz, başka hiçbir şey ekleme.`;

// ── Yedek mesaj havuzu (API başarısız olursa kullanılır) ─────
const YEDEK_MESAJ_HAVUZU = [
    { gonderen: 'ece.yildiz_',      mesaj: 'Bugün hava çok güzeldi. Okuldan sonra biraz dışarıda oturduk.' },
    { gonderen: 'kaan.futbol07',    mesaj: 'Dün akşam maç izledik. Çok heyecanlı bir maçtı. Sen izledin mi?' },
    { gonderen: 'zeynep.resim_',    mesaj: 'Resim dersinde deniz manzarası çizdim. Öğretmen çok beğendi.' },
    { gonderen: 'ali.oyuncu35',     mesaj: 'Yeni bir oyun indirdim telefona. Çok eğlenceli. Beraber oynayalım mı?' },
    { gonderen: 'elif.muzik_',      mesaj: 'Bugün müzik dersinde şarkı söyledik. Çok eğlenceliydi.' },
    { gonderen: 'can.basket_',      mesaj: 'Yarın okuldan sonra basketbol oynayacağız. Sen de gelir misin?' },
    { gonderen: 'defne.cicek07',    mesaj: 'Anneannemlere gittik hafta sonu. Bahçedeki çiçekler çok güzeldi.' },
    { gonderen: 'berk.bilim_',      mesaj: 'Fen dersinde deney yaptık bugün. Volkan deneyi çok eğlenceliydi.' },
    { gonderen: 'sude.kedi_',       mesaj: 'Kedim bugün çok komik bir şey yaptı. Kutuya girmeye çalıştı ama sığmadı.' },
    { gonderen: 'emre.pizza_',      mesaj: 'Akşam yemeğinde pizza yaptık evde. Çok güzel oldu.' },
    { gonderen: 'yagmur.kitap_',    mesaj: 'Yeni bir kitap okumaya başladım. Çok güzel bir hikaye.' },
    { gonderen: 'arda.gitar35',     mesaj: 'Gitar çalmayı öğreniyorum. İlk şarkımı öğrendim.' },
    { gonderen: 'doga.yuruyus_',    mesaj: 'Hafta sonu ailecek pikniğe gittik. Hava çok güzeldi.' },
    { gonderen: 'mira.boya_',       mesaj: 'Bugün suluboya ile boyama yaptım. Çok rahatlatıcıydı.' },
    { gonderen: 'tuna.kamp_',       mesaj: 'Geçen hafta okul kampına gittik. Çok güzel bir deneyimdi.' },
    { gonderen: 'selin.dans_',      mesaj: 'Dans kursuna başladım bu hafta. Çok eğlenceli geliyor.' },
    { gonderen: 'ahmet.satranc_',   mesaj: 'Satranç turnuvasına katıldım bugün. İkinci oldum.' },
    { gonderen: 'nisan.kek_',       mesaj: 'Annemle birlikte kek yaptık bugün. Çikolatalı oldu, çok güzeldi.' },
    { gonderen: 'furkan.bisiklet_', mesaj: 'Bisikletle parkta tur attık. Hava güzeldi, çok keyifli geçti.' },
    { gonderen: 'lale.origami_',    mesaj: 'Origami yapmayı öğreniyorum. Bugün kurbağa yaptım.' }
];

// ── Yedek mesajlardan rastgele seç ──────────────────────────
function yedekMesajlar(adet) {
    const karistir = [...YEDEK_MESAJ_HAVUZU].sort(() => Math.random() - 0.5);
    return karistir.slice(0, Math.min(adet, karistir.length));
}

// ── Gemini ile normal mesaj üret ────────────────────────────
async function normalMesajlarUret(adet) {
    try {
        const body = {
            system_instruction: { parts: [{ text: NORMAL_MESAJ_SYSTEM_PROMPT }] },
            contents: [{
                role: 'user',
                parts: [{ text: `Tam olarak ${adet} adet farklı normal mesaj üret. Yanıtı SADECE JSON dizisi olarak ver.` }]
            }],
            generationConfig: {
                temperature: 0.9,
                topP: 0.95,
                maxOutputTokens: 1024
            }
        };

        const res = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);

        const data = await res.json();
        let raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Gemini bazen ```json ... ``` ile sarar — temizle
        raw = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error('Beklenen dizi değil');

        // Gerekli alanları doğrula
        return parsed
            .filter(m => m.gonderen && m.mesaj)
            .slice(0, adet);

    } catch (err) {
        console.error('[SafetagAI] normalMesajlarUret hatası, yedeklere düşüldü:', err.message);
        return yedekMesajlar(adet);
    }
}

// ── Gemini ile sohbet yanıtı üret ───────────────────────────
async function geminiCevapUret(kullaniciMesaji, sohbetGecmisi, participantAge) {
    try {
        // Sohbet geçmişini Gemini formatına çevir (son 6 mesaj)
        const gecmis = (sohbetGecmisi || []).slice(-6).map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
        }));

        // Mevcut kullanıcı mesajını ekle
        gecmis.push({ role: 'user', parts: [{ text: kullaniciMesaji }] });

        const body = {
            system_instruction: { parts: [{ text: CEVAP_SYSTEM_PROMPT }] },
            contents: gecmis,
            generationConfig: {
                temperature: 0.8,
                topP: 0.9,
                maxOutputTokens: 256
            }
        };

        const res = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);

        const data = await res.json();
        const cevap = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (!cevap) throw new Error('Boş yanıt');
        return cevap;

    } catch (err) {
        console.error('[SafetagAI] geminiCevapUret hatası, yedeklere düşüldü:', err.message);
        return null; // app.js fallback'e düşer
    }
}

// ── Normal mesaj objesini conversation formatına çevir ───────
// app.js'deki sendConversationMessage() bu formatı kullanıyor
function normalSenaryoyaDonustur(mesajObj) {
    return {
        sender: mesajObj.gonderen,
        avatar: mesajObj.gonderen,
        isNormal: true,
        conversation: [
            {
                incoming: mesajObj.mesaj,
                waitForReply: true,
                endsConversation: false
            }
        ]
    };
}

// ── Kuyruğa normal mesajları karıştır (async) ────────────────
// Mevcut siber zorbalık kuyruğunu alır, 5 normal mesaj üretir,
// ikisini rastgele karıştırarak yeni diziyi döndürür.
async function normalMesajlariKaristir(queue, adet) {
    try {
        const mesajlar = await normalMesajlarUret(adet);
        const senaryolar = mesajlar.map(normalSenaryoyaDonustur);

        const karisik = [...queue];
        senaryolar.forEach(s => {
            const pos = Math.floor(Math.random() * (karisik.length + 1));
            karisik.splice(pos, 0, s);
        });
        return karisik;
    } catch (err) {
        console.error('[SafetagAI] normalMesajlariKaristir hatası:', err.message);
        return queue; // hata olursa saf kuyruk döner
    }
}

// ── Global scope'a aç ────────────────────────────────────────
if (typeof window !== 'undefined') {
    window.normalMesajlarUret      = normalMesajlarUret;
    window.geminiCevapUret         = geminiCevapUret;
    window.normalMesajlariKaristir = normalMesajlariKaristir;
    window.yedekMesajlar           = yedekMesajlar;
}
