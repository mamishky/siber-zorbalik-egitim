// ============================================================
// Safetagram AI — OpenRouter API ile normal mesaj üretimi
// Sadece zorbalık İÇERMEYEN mesajlar bu dosya üzerinden gelir.
// Zorbalık senaryolarına DOKUNMA — onlar scenarios.js'de.
// ============================================================

// API anahtarı config.js'den okunur (gitignored) — sabit yazmayın
const OR_API_KEY = (typeof window !== 'undefined' && window.OPENROUTER_API_KEY) || '';
const OR_MODEL   = 'openai/gpt-4o-mini';
const OR_URL     = 'https://openrouter.ai/api/v1/chat/completions';

// ── System prompt — ilk normal mesajlar için ─────────────────
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

// ── Bağlam-duyarlı yerel fallback (API tamamen çevrimdışı) ───
function baglamliYedekCevap(kullaniciMesaji, sohbetGecmisi) {
    const u = kullaniciMesaji.toLowerCase();
    const sonBotMesaj = (sohbetGecmisi || [])
        .filter(m => m.sender !== 'user')
        .slice(-1)[0]?.text?.toLowerCase() || '';

    if (u.includes('?')) {
        if (sonBotMesaj.includes('kedi') || u.includes('kedi'))   return 'Kedi konusu çok eğlenceli. Bizde de kedi var.';
        if (sonBotMesaj.includes('oyun') || u.includes('oyun'))   return 'Ben de o oyunu oynamak istiyorum.';
        if (sonBotMesaj.includes('ders') || u.includes('ders'))   return 'Bence o ders aslında ilginç.';
        if (sonBotMesaj.includes('yemek') || u.includes('yemek')) return 'Evde yapılan yemekler hep daha güzel oluyor.';
        if (sonBotMesaj.includes('çiçek') || u.includes('çiçek')) return 'Rengarenk çiçekler çok güzel görünüyor.';
        return 'Bilmiyorum ama merak ettim. Sen nasıl buldun?';
    }

    const kisaYanitlar = [
        'Gerçekten mi? Çok ilginç.',
        'Ben de benzer şeyler yaşadım.',
        'Anlıyorum seni.',
        'Kulağa çok güzel geliyor.',
        'Bence de öyle.'
    ];
    return kisaYanitlar[Math.floor(Math.random() * kisaYanitlar.length)];
}

// ── OpenRouter API isteği (retry destekli) ───────────────────
async function orIstekAt(messages, maxTokens, deneme = 0) {
    const res = await fetch(OR_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OR_API_KEY}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Safetagram'
        },
        body: JSON.stringify({
            model: OR_MODEL,
            messages,
            max_tokens: maxTokens,
            temperature: 0.8
        })
    });

    if (res.status === 429 && deneme < 2) {
        console.warn('[SafetagAI] 429 kota aşımı, 4sn sonra tekrar deneniyor...');
        await new Promise(r => setTimeout(r, 4000));
        return orIstekAt(messages, maxTokens, deneme + 1);
    }

    if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        console.error('[SafetagAI] OpenRouter HTTP', res.status, errBody.slice(0, 200));
        throw new Error(`OpenRouter HTTP ${res.status}`);
    }

    return res.json();
}

// ── OpenRouter ile normal mesaj üret ────────────────────────
async function normalMesajlarUret(adet) {
    try {
        const messages = [
            { role: 'system',  content: NORMAL_MESAJ_SYSTEM_PROMPT },
            { role: 'user',    content: `Tam olarak ${adet} adet farklı normal mesaj üret. Yanıtı SADECE JSON dizisi olarak ver.` }
        ];

        const data = await orIstekAt(messages, 1024);
        let raw = data?.choices?.[0]?.message?.content || '';

        // Model bazen ```json ... ``` ile sarar — temizle
        raw = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error('Beklenen dizi değil');

        return parsed
            .filter(m => m.gonderen && m.mesaj)
            .slice(0, adet);

    } catch (err) {
        console.error('[SafetagAI] normalMesajlarUret hatası, yedeklere düşüldü:', err.message);
        return yedekMesajlar(adet);
    }
}

// ── OpenRouter ile sohbet yanıtı üret ───────────────────────
async function geminiCevapUret(kullaniciMesaji, sohbetGecmisi, participantAge) {
    try {
        if (!OR_API_KEY) throw new Error('API anahtarı yok');

        // Sohbet geçmişini OpenAI formatına çevir (son 6 mesaj).
        // sohbetGecmisi DOM'dan geliyor — son eleman kullanıcının mesajı, slice(0,-1) ile çıkar.
        const eskiMesajlar = (sohbetGecmisi || []).slice(0, -1).slice(-6);
        const gecmis = eskiMesajlar.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
        }));

        // Geçmiş 'assistant' ile başlıyorsa (ilk mesaj karşı taraftan) önüne boş user turu koy
        if (gecmis.length > 0 && gecmis[0].role === 'assistant') {
            gecmis.unshift({ role: 'user', content: '.' });
        }

        // Mevcut kullanıcı mesajını ekle (tek sefer)
        gecmis.push({ role: 'user', content: kullaniciMesaji });

        const messages = [
            { role: 'system', content: CEVAP_SYSTEM_PROMPT },
            ...gecmis
        ];

        const data = await orIstekAt(messages, 128);
        const cevap = data?.choices?.[0]?.message?.content?.trim();
        if (!cevap) throw new Error('Boş yanıt');
        return cevap;

    } catch (err) {
        console.error('[SafetagAI] geminiCevapUret hatası:', err.message);
        return baglamliYedekCevap(kullaniciMesaji, sohbetGecmisi);
    }
}

// ── Normal mesaj objesini conversation formatına çevir ───────
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
async function normalMesajlariKaristir(queue, adet) {
    let mesajlar;
    try {
        mesajlar = await normalMesajlarUret(adet);
    } catch (err) {
        console.warn('[SafetagAI] API ulaşılamadı, yedek mesajlar kullanılıyor:', err.message);
        mesajlar = yedekMesajlar(adet);
    }

    const senaryolar = mesajlar.map(normalSenaryoyaDonustur);
    const karisik = [...queue];
    senaryolar.forEach(s => {
        const pos = Math.floor(Math.random() * (karisik.length + 1));
        karisik.splice(pos, 0, s);
    });
    return karisik;
}

// ── Global scope'a aç ────────────────────────────────────────
if (typeof window !== 'undefined') {
    window.normalMesajlarUret      = normalMesajlarUret;
    window.geminiCevapUret         = geminiCevapUret;
    window.normalMesajlariKaristir = normalMesajlariKaristir;
    window.yedekMesajlar           = yedekMesajlar;
}
