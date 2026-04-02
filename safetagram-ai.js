// ============================================================
// Safetagram AI — Groq API ile normal mesaj üretimi
// Sadece zorbalık İÇERMEYEN mesajlar bu dosya üzerinden gelir.
// Zorbalık senaryolarına DOKUNMA — onlar scenarios.js'de.
// ============================================================

// API anahtarı Cloudflare Worker'da tutuluyor — burada anahtar yok
const OR_API_KEY = ''; // Artık kullanılmıyor, Worker hallediyor
// Groq modelleri — ücretsiz, 30 istek/dakika, çok hızlı yanıt süresi
const OR_MODEL_PRIMARY = 'llama-3.3-70b-versatile';
const OR_MODEL_FALLBACKS = [
    'llama3-70b-8192',
    'llama3-8b-8192',
];
const OR_URL     = 'https://safetagramai.m-farukerdogan.workers.dev';
const OR_TIMEOUT_MS = 8000;

/**
 * Olumlu (güvenli) DM'lerde gönderen yalnızca bu listeden seçilir — yabancı / tanınmayan hesap adı gösterilmez.
 * Siber zorbalık mesajları scenarios.js / BULLY_USERNAMES ile ayrı kalır.
 */
const TANIDIK_ARKADAS_GONDERENLER = [
    'can_okul_arkadas',
    'elif_sinif_10a',
    'burak_beraber_ders',
    'zeynep_sinif',
    'emre_takim'
];

function tanidikArkadasGonderen(sira) {
    const i = Math.abs(Number(sira)) || 0;
    return TANIDIK_ARKADAS_GONDERENLER[i % TANIDIK_ARKADAS_GONDERENLER.length];
}

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
8. Gerçek ünlü / marka ismi kullanma.
9. Mesajı tanıdık bir sınıf arkadaşının yazdığını varsay; karşı tarafta "yabancı biri" izlenimi verme.

KONU HAVUZU (karışık olarak seç):
- Okul ve dersler: sınav, ödev, okul etkinlikleri
- Oyun ve eğlence: bilgisayar oyunları, telefon oyunları, skor paylaşımı
- Günlük hayat: hava durumu, yemek, hafta sonu planları
- Hobiler: resim, müzik, spor, hayvanlar
- Arkadaşlık: birlikte plan yapma, hal hatır sorma, iltifat

MESAJ FORMATI:
Yanıtını SADECE JSON dizisi olarak ver, başka hiçbir şey yazma:
[{"mesaj":"Mesaj metni"},...]

ÖNEMLİ: JSON içinde "gonderen" veya kullanıcı adı alanı ekleme. Uygulama göndereni otomatik olarak tanıdık arkadaş olarak atar.`;

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

// ── Yedek mesaj havuzu (API başarısız olursa kullanılır) — gönderen uygulama tarafından atanır ─────
const YEDEK_MESAJ_HAVUZU = [
    { mesaj: 'Bugün hava çok güzeldi. Okuldan sonra biraz dışarıda oturduk.' },
    { mesaj: 'Dün akşam maç izledik. Çok heyecanlı bir maçtı. Sen izledin mi?' },
    { mesaj: 'Resim dersinde deniz manzarası çizdim. Öğretmen çok beğendi.' },
    { mesaj: 'Yeni bir oyun indirdim telefona. Çok eğlenceli. Beraber oynayalım mı?' },
    { mesaj: 'Bugün müzik dersinde şarkı söyledik. Çok eğlenceliydi.' },
    { mesaj: 'Yarın okuldan sonra basketbol oynayacağız. Sen de gelir misin?' },
    { mesaj: 'Anneannemlere gittik hafta sonu. Bahçedeki çiçekler çok güzeldi.' },
    { mesaj: 'Fen dersinde deney yaptık bugün. Volkan deneyi çok eğlenceliydi.' },
    { mesaj: 'Kedim bugün çok komik bir şey yaptı. Kutuya girmeye çalıştı ama sığmadı.' },
    { mesaj: 'Akşam yemeğinde pizza yaptık evde. Çok güzel oldu.' },
    { mesaj: 'Yeni bir kitap okumaya başladım. Çok güzel bir hikaye.' },
    { mesaj: 'Gitar çalmayı öğreniyorum. İlk şarkımı öğrendim.' },
    { mesaj: 'Hafta sonu ailecek pikniğe gittik. Hava çok güzeldi.' },
    { mesaj: 'Bugün suluboya ile boyama yaptım. Çok rahatlatıcıydı.' },
    { mesaj: 'Geçen hafta okul kampına gittik. Çok güzel bir deneyimdi.' },
    { mesaj: 'Dans kursuna başladım bu hafta. Çok eğlenceli geliyor.' },
    { mesaj: 'Satranç turnuvasına katıldım bugün. İkinci oldum.' },
    { mesaj: 'Annemle birlikte kek yaptık bugün. Çikolatalı oldu, çok güzeldi.' },
    { mesaj: 'Bisikletle parkta tur attık. Hava güzeldi, çok keyifli geçti.' },
    { mesaj: 'Origami yapmayı öğreniyorum. Bugün kurbağa yaptım.' }
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

// Son 429 zamanı — kısa sürede tekrar denemeyi atla, hemen yerel yedeğe düş
let _last429At = 0;
const _429_COOLDOWN_MS = 300000; // 5 dk 429 sonrası API atlanır, yerel mesaj kullanılır

// ── OpenRouter API isteği (timeout + 429'da hemen yedek modele geç) ─
async function orIstekAt(messages, maxTokens, modelIndex = 0) {
    // Son 1 dakikada 429 alındıysa API'yi atla, çağıran yedek kullanacak
    if (Date.now() - _last429At < _429_COOLDOWN_MS && modelIndex === 0) {
        throw new Error('OpenRouter HTTP 429 (cooldown)');
    }

    const models = [OR_MODEL_PRIMARY, ...OR_MODEL_FALLBACKS];
    const model = models[Math.min(modelIndex, models.length - 1)];

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), OR_TIMEOUT_MS);

    let res;
    try {
        res = await fetch(OR_URL, {
            method: 'POST',
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model,
                messages,
                max_tokens: maxTokens,
                temperature: 0.8
            })
        });
    } finally {
        clearTimeout(timer);
    }

    // 429: Aynı modelle bekleyip tekrar deneme — hemen yedek modele geç
    if (res.status === 429) {
        _last429At = Date.now();
        if (modelIndex < models.length - 1) {
            console.warn('[SafetagAI] 429 — yedek modele geçiliyor:', models[modelIndex + 1]);
            await new Promise(r => setTimeout(r, 1000)); // 1sn kısa bekleme
            return orIstekAt(messages, maxTokens, modelIndex + 1);
        }
        console.warn('[SafetagAI] Tüm modeller 429 — yerel yedek kullanılacak');
        throw new Error('OpenRouter HTTP 429');
    }

    if (!res.ok) {
        const errBody = await res.text().catch(() => '');
        console.error('[SafetagAI] OpenRouter HTTP', res.status, errBody.slice(0, 300));
        throw new Error(`OpenRouter HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log('[SafetagAI] OpenRouter OK, model:', data?.model || model);
    return data;
}

// ── OpenRouter ile normal mesaj üret ────────────────────────
async function normalMesajlarUret(adet) {
    try {
        // Gemma system prompt desteklemediği için talimatı user mesajına göm
        const messages = [
            { role: 'user', content: NORMAL_MESAJ_SYSTEM_PROMPT + `\n\nTam olarak ${adet} adet farklı normal mesaj üret. Yanıtı SADECE JSON dizisi olarak ver, başka hiçbir şey yazma.` }
        ];

        const data = await orIstekAt(messages, 1024);
        let raw = data?.choices?.[0]?.message?.content || '';

        // Model bazen ```json ... ``` ile sarar — temizle
        raw = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error('Beklenen dizi değil');

        return parsed
            .map((m, i) => {
                const text = (m && (m.mesaj != null ? m.mesaj : m.message)) ? String(m.mesaj != null ? m.mesaj : m.message).trim() : '';
                if (!text) return null;
                return {
                    gonderen: tanidikArkadasGonderen(i),
                    mesaj: text
                };
            })
            .filter(Boolean)
            .slice(0, adet);

    } catch (err) {
        console.error('[SafetagAI] normalMesajlarUret hatası, yedeklere düşüldü:', err.message);
        return yedekMesajlar(adet);
    }
}

// ── OpenRouter ile sohbet yanıtı üret ───────────────────────
async function geminiCevapUret(kullaniciMesaji, sohbetGecmisi, participantAge) {
    try {
        console.log('[SafetagAI] Worker üzerinden istek atılıyor, model:', OR_MODEL_PRIMARY);

        // Sohbet geçmişini OpenAI formatına çevir (son 6 mesaj).
        // sohbetGecmisi DOM'dan geliyor — son eleman kullanıcının mesajı, slice(0,-1) ile çıkar.
        const eskiMesajlar = (sohbetGecmisi || []).slice(0, -1).slice(-6);
        const gecmis = eskiMesajlar.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
        }));

        // Mevcut kullanıcı mesajını ekle (tek sefer)
        gecmis.push({ role: 'user', content: kullaniciMesaji });

        // Gemma system prompt desteklemediği için talimatı ilk user mesajına göm.
        // Geçmiş yoksa doğrudan user mesajına ekle; varsa ilk user mesajının başına ekle.
        let messages;
        if (gecmis.length === 1) {
            // Sadece mevcut kullanıcı mesajı var — talimatı başa ekle
            messages = [{ role: 'user', content: CEVAP_SYSTEM_PROMPT + '\n\nKullanıcı mesajı: ' + kullaniciMesaji }];
        } else {
            // Geçmiş var — ilk user mesajının başına talimatı ekle, sıra korunsun
            messages = gecmis.map((m, i) => {
                if (i === 0 && m.role === 'user') {
                    return { role: 'user', content: CEVAP_SYSTEM_PROMPT + '\n\nKullanıcı mesajı: ' + m.content };
                }
                return m;
            });
            // Geçmiş assistant ile başlıyorsa (ilk mesaj karşı taraftan) önüne boş user turu ekle
            if (messages[0].role === 'assistant') {
                messages.unshift({ role: 'user', content: CEVAP_SYSTEM_PROMPT + '\n\n.' });
            }
        }

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
function normalSenaryoyaDonustur(mesajObj, arkadasSira) {
    const sender = tanidikArkadasGonderen(arkadasSira != null ? arkadasSira : 0);
    const incoming = mesajObj && mesajObj.mesaj != null ? String(mesajObj.mesaj).trim() : '';
    return {
        sender,
        avatar: sender,
        isNormal: true,
        conversation: [
            {
                incoming,
                waitForReply: true,
                endsConversation: false
            }
        ]
    };
}

// ── Kuyruğa normal mesajları karıştır (sync) ─────────────────
// Simülasyon açılışını bloke etmemek için API çağrısı yapılmaz,
// yedek havuzdan anında seçilir.
function normalMesajlariKaristir(queue, adet) {
    const mesajlar = yedekMesajlar(adet);
    const senaryolar = mesajlar.map((m, i) => normalSenaryoyaDonustur(m, i));
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
