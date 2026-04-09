// Senaryo ve mesaj yapılandırmaları

// ✅ OPTİMİZASYON: Sayfa yüklenirken Cloudinary CDN'e erken bağlantı kur
// Bu, videoların daha hızlı yüklenmesini sağlar (DNS lookup + TLS handshake önceden yapılır)
(function addEarlyPreconnectHints() {
    const origins = [
        'https://player.cloudinary.com',
        'https://res.cloudinary.com'
    ];
    origins.forEach(origin => {
        // Preconnect
        const preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = origin;
        preconnect.crossOrigin = 'anonymous';
        document.head.appendChild(preconnect);
        
        // DNS Prefetch (fallback)
        const dnsPrefetch = document.createElement('link');
        dnsPrefetch.rel = 'dns-prefetch';
        dnsPrefetch.href = origin;
        document.head.appendChild(dnsPrefetch);
    });
})();

// Siber zorbalık türleri (5 tür - Madde 4)
const BULLYING_TYPES = ['sozel', 'dislama', 'tehdit', 'iftira', 'kimlik'];

// Siber zorbalık türleri ve şikayet sebepleri
const COMPLAINT_REASONS = [
    { id: 'sozel',   label: 'Kötü Söz',        icon: 'fas fa-comment-slash' },
    { id: 'dislama', label: 'Yalnız Bırakma',   icon: 'fas fa-user-slash'   },
    { id: 'tehdit',  label: 'Tehdit',            icon: 'fas fa-exclamation-triangle' },
    { id: 'iftira',  label: 'Yalan Yaymak',      icon: 'fas fa-bullhorn'     },
    { id: 'kimlik',  label: 'Sahte Hesap',       icon: 'fas fa-user-secret'  }
];

// 100 POST - Gerçek Ünlüler ve Influencerlar ile Güncel İçerikler
// 70 Fotoğraf + 30 Video
const POSTS_100 = [
    // OYUNLAR & GAMING (Video: 1-10, Fotoğraf: 11-30)
    { username: "elraenn", avatar: "elraenn", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=elraeen_1_ui7yb6", caption: "kadın erkek farkı :)))", likes: 125000, type: "video" }, 
    { username: "pqueen", avatar: "pqueen", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=pqueen_1_eld6eg", caption: "yemekten sonra babayı görünce", likes: 98000, type: "video" }, 
    { username: "kadıköy_boğası", avatar: "kadıköy_boğası", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=kadikoybogasi_1_yr6guv", caption: "herkesin bilgisayarı odasında olur demiş", likes: 87000, type: "video" }, 
    { username: "kedikolik", avatar: "kedikolik", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=cat_1_rwflbp", caption: "meraklı kediler", likes: 76000, type: "video" },
    { username: "kendine_muzisyen", avatar: "kendinemuzisyen", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=kendinemu%CC%88zisyen_1_jhp09g", caption: "ödemeyeceeeek", likes: 65000, type: "video" }, 
    { username: "köpekgiller", avatar: "köpekgiller", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=dog_1_l47b5f", caption: "fail köpekler", likes: 54000, type: "video" }, 
    { username: "gamingtv", avatar: "gamingtv", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1769107138/gta6_a3peuf.jpg", caption: "GTA 6 2027 yılına ertelenebilir", likes: 43000, type: "image" }, 
    { username: "oyundelisi", avatar: "oyundelisi", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1769107139/sonicmario_xytcjv.jpg", caption: "Eski SEGA yapımcısı Ryoichi Hasegawa, Mario & Sonic at the Olympic Games için hazırlanan görsellerde Sonic’in ayağının Mario’nun önünde konumlandırılması nedeniyle Nintendo’nun müdahalede bulunduğunu açıkladı. 🤔", likes: 32000, type: "image" },
    { username: "taklacı", avatar: "taklacı", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=gu%CC%88vercinadam_uzptts", caption: "o kadar çok kaydırdın ki orijinaline denk geldin", likes: 210000, type: "video" },
    { username: "demarke", avatar: "demarke", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1769107139/fenerbahc%CC%A7e_1_gy0vjc.jpg", caption: "Kadıköy'de her yer kırmızı-beyaz! 🇹🇷", likes: 150000, type: "image" },
    { username: "hanimisigutti", avatar: "hanimisigutti", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=hanimisiguttimontisi_h3cesd", caption: "hanimişiguttimontişi ballışı da ballışı", likes: 120000, type: "video" },
    { username: "türkiye_voleybol", avatar: "türkiye_voleybol", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1769108850/trvoleybol_kzglk2.jpg", caption: "Türkiye Kadın Voleybol Takımı, dünya sıralamasında 1. sırada yer alıyor.", likes: 110000, type: "image" },
    { username: "sadettin_tezcan_mo", avatar: "sadettin_tezcan_mo", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1769109056/tezcan29ekim_enzp1e.jpg", caption: "29 Ekim Cumhuriyet Bayramı için okulumuzda bir tören düzenlendi. Saygı duruşu ve ardından okunan İstiklal Marşı ile başlayan tören, okul müdürümüz Sayın Hakan Emrah BODUR' un konuşması, öğretmen ve öğrencilerimizin günün anlam ve önemine yönelik yazı ve şiirleri okumaları ile devam etti. Okulumuz öğrencilerinin söyledikleri cumhuriyet marşları ile sona erdi.", likes: 95000, type: "image" },
    { username: "ishowspeed", avatar: "ishowspeed", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1769109252/%C4%B1showspeed_ag8dsj.jpg", caption: "IShowSpeed'in Türkiye'de yaptığı 8 saatlik yayın YouTube'da 9 milyon izlendi.", likes: 65000, type: "image" },
    { username: "demeköyleymiş", avatar: "demeköyleymiş", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=bal%C4%B1kkaydetme_fqzroe", caption: "200 yıllık dahice balık kaydetme yöntemi", likes: 55000, type: "video" }, 
    { username: "raaene", avatar: "raaene", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=raaene_1_zenmlp", caption: "Raaene arabayla makas atıyor", likes: 45000, type: "video" },
    { username: "ruhicenet", avatar: "ruhicenet", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=ruhic%CC%A7enet_1_jny3af", caption: "Bu madde beni su geçirmez yaptı", likes: 35000, type: "video" },
    { username: "brawlstars", avatar: "brawlstars", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=brawlstars_1_yfufxl", caption: "brawlstars en bozuk savaşçı", likes: 25000, type: "video" },
    { username: "kendine_muzisyen", avatar: "kendinemuzisyen", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=kendinemu%CC%88zisyen_2_vsezhy", caption: "kendine müzisyen zorluk seviyesi seçiyor", likes: 18000, type: "video" },
    { username: "wtcn", avatar: "wtcn", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=wtcn_1_uwqj0i", caption: "wTcn isim şehir oynuyor", likes: 16000, type: "video" },
    { username: "ninja", avatar: "ninja", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=ninja_1_gfgrp3", caption: "yaşlı usta ders veriyor", likes: 8000, type: "video" },
    { username: "messi", avatar: "messi", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=messi_1_fddj7r", caption: "messi durdurulamıyor", likes: 2500000, type: "video" },
    { username: "ronaldo", avatar: "ronaldo", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774191357/ronaldo_1_onncsh.png", caption: "portekiz efsanesi ronaldo", likes: 2300000, type: "image" },
    { username: "haaland", avatar: "haaland", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774191551/haaland_kur2zz.png", caption: "güzel oyun güzel galibiyet", likes: 1800000, type: "image" },
    { username: "baris_ozcan", avatar: "barisozcan", videoEmbedUrl: "https://player.cloudinary.com/embed/?cloud_name=dcfhch5tq&public_id=barisozcan_1_ola1jm", caption: "ben minecraftçıyım", likes: 320000, type: "video" },
];


// Story üretimi için gerçek ünlü isimleri (STORY_ITEMS yoksa veya boşsa kullanılır)
const STORY_USERS = [
    "elraenn", "pqueen", "jahrein", "unlost", "kendine_muzisyen", "wtcn", "pinky", "irmak_tuzun",
    "xqc", "pokimane", "ninja", "valkyrae", "hasanabi", "ludwig", "mizkif", "kai_cenat", "ishowspeed", "adin_ross",
    "messi", "ronaldo", "haaland",
    "cem_yilmaz", "hadise", "acun_ilicali", "aleyna_tilki", "kenan_imirzalioglu", "demet_ozdemir", "baris_arduc", "hande_ercel", "cagatay_ulusoy", "serenay_sarikaya",
    "elonmusk", "therock", "kyliejenner", "travisscott", "kimkardashian", "badbunny", "margotrobbie", "ryangosling", "zendaya", "timotheechalamet",
    "netflix", "instagram", "tiktok", "youtube", "twitter", "spotify", "snapchat", "bereal", "disney", "hbo", "marvel", "crunchyroll", "amc"
];

/**
 * 25 story — gerçek fotoğraflar için URL girin (tercihen Cloudinary / CDN).
 * - image: Tam ekran story fotoğrafı (zorunlu alan; boşsa geçici Picsum kullanılır).
 * - thumb: Üstteki yuvarlak halka (opsiyonel; boşsa önce image, o da yoksa çizim avatarı).
 * - avatar: DiceBear seed yedeği (opsiyonel; yoksa username kullanılır).
 */
const STORY_ITEMS = [
    { username: "elraenn", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346384/maxresdefault_w95rb2.jpg", thumb: "" },
    { username: "pqueen", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346383/maxresdefault_1_ndl2ru.jpg", thumb: "" },
    { username: "jahrein", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346383/maxresdefault_2_zwfzb8.jpg", thumb: "" },
    { username: "unlost", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346383/maxresdefault_3_uhwscn.jpg", thumb: "" },
    { username: "kendine_muzisyen", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346382/hq720_j7rsub.jpg", thumb: "" },
    { username: "wtcn", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346382/hq720_1_zfszx6.jpg", thumb: "" },
    { username: "pinky", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346382/hq720_2_yzbz3x.jpg", thumb: "" },
    { username: "brawl_stars", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346385/2d4a84ea793583ba450dda689550a164_zcnqhd.png", thumb: "" },
    { username: "xqc", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346385/hq720_3_kqe6tz.jpg", thumb: "" },
    { username: "spiderman", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346385/91BPTaok5JL_i3mf2a.jpg", thumb: "" },
    { username: "ninja", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346385/i1579474773225723_ipahc2.jpg", thumb: "" },
    { username: "fenerbahce", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346385/kupa-beko_xzxy1j.jpg", thumb: "" },
    { username: "galatasaray", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346384/thumbs_b_c_9384214392a686573fad9fb2b41bfba4_fjhect.jpg", thumb: "" },
    { username: "besiktas", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346384/thumbs_b_c_faf9e0fe279a029970affe243953786d_vzxwxt.jpg", thumb: "" },
    { username: "trazonspor", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346384/thumbs_b_c_2fde338162320fb58db46b27a8196655_rgzrq9.jpg", thumb: "" },
    { username: "goztepe", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346385/thumbs_b_c_c7c3dfc6035dc9f1ef8a11e3785cc97d_iqgded.jpg", thumb: "" },
    { username: "ishowspeed", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346383/maxresdefault_4_ytbdj5.jpg", thumb: "" },
    { username: "keduuu", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346383/desktop-wallpaper-confused-cat-meme-funny-cat-memes_ofry9u.jpg", thumb: "" },
    { username: "messi", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346382/3b191483ea22c0713c36b7115cf9b7a31e3f7911-1671392200-128ef057-960x640_oclasn.jpg", thumb: "" },
    { username: "ronaldo", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346382/103536483-9bf5d5a4-375c-4f70-93e6-3c8015fb5405_rcpyjj.jpg", thumb: "" },
    { username: "turkiye_milli", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346382/007_2025_02_KASIM_29_AA-39744232_izyemv.jpg", thumb: "" },
    { username: "orkun_isitmak", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346382/maxresdefault_5_y6wydn.jpg", thumb: "" },
    { username: "enes_bautr", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346382/maxresdefault_6_ujfvlf.jpg", thumb: "" },
    { username: "roblox", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346383/robloxxjpg-1_wu1ote.jpg", thumb: "" },
    { username: "minecraft", image: "https://res.cloudinary.com/dcfhch5tq/image/upload/v1774346384/maxresdefault_7_uw6ywa.jpg", thumb: "" }
];

// Rastgele zorba kullanıcı adları havuzu
const BULLY_USERNAMES = [
    'burak.king61', 'kaansen.style', 'ceren_darkx', 'toxic.emirr', 'melis.savage_', 
    'deniz.cold99', 'real.oguz_35', 'arda.nofilter', 'batu_firex', 'yagmur.zehir_', 
    'bizim.ekip35', 'vip.squad_izmir', 'enes.kaptan07', 'sude.queenbee', 'sadece.biz_', 
    'ozel.grup_34', 'pelin.ceo_', 'takim.lideri_', 'parti.krali_', 'bff.zone_only', 
    'gece.kurdu_06', 'ss.koleksiyonu', 'gizli.hesap_x', 'karanlik.mod_', 'sessiz.izci_', 
    'anonim.gorucu', 'ekran.gorusu_', 'sifre.avcisi_', 'golgede.olan_', 'uyari.son_kez', 
    'herkes.diyor_', 'olay.patlak35', 'duydum.ki_', 'laf.makinesi07', 'millet.konusuyor', 
    'itiraf.kutusu_', 'berk.expose_', 'dedikodu.ruzgari', 'okul.haber_', 'fistik.troll_', 
    'mudur.yrd_resmi', 'emre.yenihesap_', 'destek.merkezi_', 'yeliz.11sinif', 'mert.acildurum', 
    'izmir.odul_', 'merve.ogretmen_', 'brawlstars.ali', 'goztepe.burs_', 'kargo.teslimat_'
];

// Tüm zorbalık senaryoları havuzu — her oturumda rastgele seçilir
const MESSAGE_POOL = {
    'sozel': [
        { messages: [{ type: 'cyberbullying', text: 'kanka bu attığın foto çok kötü', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'kendini bi gör', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'cidden komik duruyorsun', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: 'ya sen niye hep böyle saçma şeyler paylaşıyorsun', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'millet seninle dalga geçiyor', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'farkında değilsin', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: 'bunu paylaşman hata olmuş', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'herkes görüyor', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'sil bence', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: 'sen bu kafayla zor ya', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'her şeyi yanlış yapıyorsun', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'kimse seni ciddiye almıyor', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: "story'ni gördüm", cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'çok utanç verici', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'niye attın ki', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: 'sen konuşunca ortam bozuluyor', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'insanlar rahatsız oluyor', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'biraz sus bence', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: 'ya gerçekten çok garipsin', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'herkes seninle dalga geçiyor', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'haberin olsun', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: 'seni izlerken utanıyorum', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'kendin fark etmiyorsun ama', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'komik duruyorsun', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: 'kim sana gaz veriyor da bunları paylaşıyorsun', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'kendini rezil ediyorsun', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'yazık', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: 'ya bi sus artık', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'her yerde saçma şeyler yapıyorsun', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'millet bıktı senden', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: 'Çok çirkinsin', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'aynada kendine bakmıyor musun?', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'seninle mi dolaşacağımı sanıyorsun?', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: 'kanka bu müziği mi dinliyorsun ya.', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'Aş artık kendini biraz.', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: 'Gay mısın oğlum sen?', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'bu kıza da bakmıyorsun?', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: 'saç kesimin çok komik olduğunu söylüyorlar.', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'Benden duymuş ol', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: 'kıtlıktan mı çıktın?', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'yavaş beni de yiyeceksin.', cyberType: 'sozel', complaintReason: 'sozel' }] },
        { messages: [{ type: 'cyberbullying', text: 'kusura bakma da sana bu kilolarla kimse aşık olmaz. Sen git önce bir 20 kilo ver sonra bunları düşün.', cyberType: 'sozel', complaintReason: 'sozel' }] }
    ],
    'dislama': [
        { messages: [{ type: 'cyberbullying', text: 'bugün dışarı çıkıyoruz', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'ama sen gelme', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'biz bizeyiz', cyberType: 'dislama', complaintReason: 'dislama' }] },
        { messages: [{ type: 'cyberbullying', text: 'oyuna giriyoruz', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'ama seni almıyoruz', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'başka zaman', cyberType: 'dislama', complaintReason: 'dislama' }] },
        { messages: [{ type: 'cyberbullying', text: 'yeni grup kurduk', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'seni eklemedik', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'karışıklık olmasın', cyberType: 'dislama', complaintReason: 'dislama' }] },
        { messages: [{ type: 'cyberbullying', text: 'bugün maç var', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'seni yazmadık', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'kadro dolu', cyberType: 'dislama', complaintReason: 'dislama' }] },
        { messages: [{ type: 'cyberbullying', text: 'biz artık kendi aramızda takılıyoruz', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'sen başka arkadaşlarla takıl', cyberType: 'dislama', complaintReason: 'dislama' }] },
        { messages: [{ type: 'cyberbullying', text: 'doğum gününe çağırmayacağız', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'kalabalık olmasın istiyoruz', cyberType: 'dislama', complaintReason: 'dislama' }] },
        { messages: [{ type: 'cyberbullying', text: 'bugün bizimle oturma', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'yer yok', cyberType: 'dislama', complaintReason: 'dislama' }] },
        { messages: [{ type: 'cyberbullying', text: 'seni çağırmadık', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'çünkü seni istemiyoruz', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'açık söyleyeyim', cyberType: 'dislama', complaintReason: 'dislama' }] },
        { messages: [{ type: 'cyberbullying', text: 'teneffüste bizim yanımıza gelme', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'biz başka yere geçiyoruz', cyberType: 'dislama', complaintReason: 'dislama' }] },
        { messages: [{ type: 'cyberbullying', text: 'artık seni gruba almayacağız', cyberType: 'dislama', complaintReason: 'dislama' }] },
        { messages: [{ type: 'cyberbullying', text: 'sinemaya gideceğiz ama senin paran yoktur gelemezsin.', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'başka sefere artık.', cyberType: 'dislama', complaintReason: 'dislama' }] },
        { messages: [{ type: 'cyberbullying', text: 'şu gruptaki kızlar gibi değilsin.', cyberType: 'dislama', complaintReason: 'dislama' }, { type: 'cyberbullying', text: 'artık ben de o gruptayım. Seninle takılmak zaten çok ezikçeydi.', cyberType: 'dislama', complaintReason: 'dislama' }] }
    ],
    'tehdit': [
        { messages: [{ type: 'cyberbullying', text: "elimde senin mesajların ss'i var", cyberType: 'tehdit', complaintReason: 'tehdit' }, { type: 'cyberbullying', text: 'yayılmasını istemiyorsan dediğimi yap', cyberType: 'tehdit', complaintReason: 'tehdit' }] },
        { messages: [{ type: 'cyberbullying', text: 'beni kızdırma', cyberType: 'tehdit', complaintReason: 'tehdit' }, { type: 'cyberbullying', text: 'bunu herkese yollarım', cyberType: 'tehdit', complaintReason: 'tehdit' }] },
        { messages: [{ type: 'cyberbullying', text: 'şifreni ver', cyberType: 'tehdit', complaintReason: 'tehdit' }, { type: 'cyberbullying', text: 'yoksa hesabını bozarım', cyberType: 'tehdit', complaintReason: 'tehdit' }] },
        { messages: [{ type: 'cyberbullying', text: 'bu fotoğrafi sakladım', cyberType: 'tehdit', complaintReason: 'tehdit' }, { type: 'cyberbullying', text: 'istersem herkese atarım', cyberType: 'tehdit', complaintReason: 'tehdit' }] },
        { messages: [{ type: 'cyberbullying', text: 'bana para at', cyberType: 'tehdit', complaintReason: 'tehdit' }, { type: 'cyberbullying', text: 'yoksa rezil olursun', cyberType: 'tehdit', complaintReason: 'tehdit' }] },
        { messages: [{ type: 'cyberbullying', text: 'beni engellersen', cyberType: 'tehdit', complaintReason: 'tehdit' }, { type: 'cyberbullying', text: 'daha kötü şeyler yaparım', cyberType: 'tehdit', complaintReason: 'tehdit' }] },
        { messages: [{ type: 'cyberbullying', text: 'dediğimi yapmazsan', cyberType: 'tehdit', complaintReason: 'tehdit' }, { type: 'cyberbullying', text: 'seni şikayet ederim', cyberType: 'tehdit', complaintReason: 'tehdit' }] },
        { messages: [{ type: 'cyberbullying', text: 'bu konuşmaları ailene atarım', cyberType: 'tehdit', complaintReason: 'tehdit' }, { type: 'cyberbullying', text: 'sonra düşünürsün', cyberType: 'tehdit', complaintReason: 'tehdit' }] },
        { messages: [{ type: 'cyberbullying', text: 'son kez söylüyorum', cyberType: 'tehdit', complaintReason: 'tehdit' }, { type: 'cyberbullying', text: 'yoksa paylaşırım', cyberType: 'tehdit', complaintReason: 'tehdit' }] },
        { messages: [{ type: 'cyberbullying', text: 'benimle uğraşma', cyberType: 'tehdit', complaintReason: 'tehdit' }, { type: 'cyberbullying', text: 'elime koz verme', cyberType: 'tehdit', complaintReason: 'tehdit' }] },
        { messages: [{ type: 'cyberbullying', text: 'bana dokundun.', cyberType: 'tehdit', complaintReason: 'tehdit' }, { type: 'cyberbullying', text: 'taciz ettiğini söylerim.', cyberType: 'tehdit', complaintReason: 'tehdit' }] },
        { messages: [{ type: 'cyberbullying', text: 'Annen baban bu yaptıklarını biliyor mu?', cyberType: 'tehdit', complaintReason: 'tehdit' }, { type: 'cyberbullying', text: 'Onların duymasını ister misin?', cyberType: 'tehdit', complaintReason: 'tehdit' }] },
        { messages: [{ type: 'cyberbullying', text: 'ondan hoşlanıyorsun biliyorum.', cyberType: 'tehdit', complaintReason: 'tehdit' }, { type: 'cyberbullying', text: 'harçlığını vermezsen sosyal medyada her yere yazarım.', cyberType: 'tehdit', complaintReason: 'tehdit' }] }
    ],
    'iftira': [
        { messages: [{ type: 'cyberbullying', text: 'herkes senin hırsızlık yaptığını konuşuyor', cyberType: 'iftira', complaintReason: 'iftira' }, { type: 'cyberbullying', text: 'ben demiyorum onlar diyor', cyberType: 'iftira', complaintReason: 'iftira' }] },
        { messages: [{ type: 'cyberbullying', text: "sınıfta 'bu çocuk sorunlu' diyorlar", cyberType: 'iftira', complaintReason: 'iftira' }, { type: 'cyberbullying', text: 'adın çıkmış', cyberType: 'iftira', complaintReason: 'iftira' }] },
        { messages: [{ type: 'cyberbullying', text: 'senin kopya çektiğini yaymışlar', cyberType: 'iftira', complaintReason: 'iftira' }, { type: 'cyberbullying', text: 'öğretmenler de duymuş', cyberType: 'iftira', complaintReason: 'iftira' }] },
        { messages: [{ type: 'cyberbullying', text: 'kızlara rahatsız edici mesaj atıyormuşsun diyorlar', cyberType: 'iftira', complaintReason: 'iftira' }, { type: 'cyberbullying', text: 'haberin olsun', cyberType: 'iftira', complaintReason: 'iftira' }] },
        { messages: [{ type: 'cyberbullying', text: 'kantindeki olayı sen yapmışsın diye anlatıyorlar', cyberType: 'iftira', complaintReason: 'iftira' }] },
        { messages: [{ type: 'cyberbullying', text: 'senin birini dövdüğünü söylüyorlar', cyberType: 'iftira', complaintReason: 'iftira' }, { type: 'cyberbullying', text: 'millet korkuyor senden', cyberType: 'iftira', complaintReason: 'iftira' }] },
        { messages: [{ type: 'cyberbullying', text: "senin birinin parasını aldığını konuşuyorlar", cyberType: 'iftira', complaintReason: 'iftira' }] },
        { messages: [{ type: 'cyberbullying', text: 'herkes senden uzak dur diyor', cyberType: 'iftira', complaintReason: 'iftira' }, { type: 'cyberbullying', text: 'kötü şeyler anlatıyorlar senin hakkında', cyberType: 'iftira', complaintReason: 'iftira' }] },
        { messages: [{ type: 'cyberbullying', text: 'senin hakkında şikayet varmış', cyberType: 'iftira', complaintReason: 'iftira' }, { type: 'cyberbullying', text: 'kimden bilmiyorum', cyberType: 'iftira', complaintReason: 'iftira' }] },
        { messages: [{ type: 'cyberbullying', text: 'adın kötüye çıkmış', cyberType: 'iftira', complaintReason: 'iftira' }, { type: 'cyberbullying', text: 'herkes konuşuyor', cyberType: 'iftira', complaintReason: 'iftira' }] }
    ],
    'kimlik': [
        { messages: [{ type: 'cyberbullying', text: 'merhaba öğrenci ben müdür yardımcısı', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'disiplinle ilgili bir durum var', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'velinin kimlik bilgilerini buraya yaz', cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: 'knk ben emre yeni hesap bu', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'eski hesabımı kapattılar', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'senin hesabın şifresini versene eski mesajlarımıza bi şeylere bakacağım', cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: 'değerli kullanıcı', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'hesabınızla ilgili bir sorun bulunmaktadır', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'hemen hesap bilgilerinizi bizimle paylaşmanız gerekmektedir', cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: "selam ben 11'lerden yeliz", cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'seni bugün de okulda gördüm, mesaj atmaya karar verdim', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'bi foto atabilir misin?', cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: 'ben mert yeni hesap açtım', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'acil 500 tl atabilir misin?', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'okulda geri vericem', cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: 'izmir belediyesinden hediye kazandın', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: "hediyenin gelmesi için ev adresini ve tc'ni yazman gerekiyor", cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: 'öğrenci müdür emrah hoca hakkında işlem başlattı', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'ne yaptığını önce buraya yaz', cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: 'ben brawl starstan ali', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'hesabın çalınmış olabilir', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'kontrol etmem için şifreni at', cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: 'tebrikler öğrenci Göztepe vakfından burs kazandın', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'ödeme yapmamız için fotoğraflarını bize atman gerekiyor', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'bugün son gün', cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: 'öğrenci ben merve öğretmenin', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'seninle ilgili şikayet var', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: "tüm konuşmaların ss'ini bana buradan at", cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: 'sayın müşterimiz satın almış olduğunuz biletinize ilişkin fatura oluşturabilmemiz için lütfen TC kimlik no ve adresinizi paylaşınız.', cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: 'Semicenk konser bileti var elimde. Sana yarı fiyatına verebilirim. Hesabıma 1000 TL atman yeterli.', cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: 'Adınıza düzenlenen 3566 numaralı kargonun adresinize teslim edilebilmesi için lütfen adres bilgilerinizi yazınız.', cyberType: 'kimlik', complaintReason: 'kimlik' }] }
    ]
};

// Öğrenciye özgü kullanılmış senaryo indekslerini yönet
function getUsedScenarios(participantName) {
    const key = `used_scenarios_${participantName.toLowerCase().trim()}`;
    const data = localStorage.getItem(key);
    if (!data) return { sozel: [], dislama: [], tehdit: [], iftira: [], kimlik: [] };
    try {
        return JSON.parse(data);
    } catch (e) {
        console.warn('[getUsedScenarios] localStorage bozuk, sıfırlanıyor:', e);
        return { sozel: [], dislama: [], tehdit: [], iftira: [], kimlik: [] };
    }
}

function saveUsedScenarios(participantName, usedData) {
    const key = `used_scenarios_${participantName.toLowerCase().trim()}`;
    localStorage.setItem(key, JSON.stringify(usedData));
}

// Rastgele senaryo havuzundan kuyruk oluştur
// 'all' modunda: 5 türden 3 rastgele tür seçilir, her türden 1 senaryo → 3 zorbalık mesajı
// Normal mesajlar safetagram-ai.js tarafından ayrıca eklenir (2 adet)
// Toplam: 3 zorbalık + 2 normal = 5 mesaj, tamamı rastgele karışık
// Önceki oturumla aynı 3-tür kombinasyonu tekrarlanmaz (localStorage takibi)
function buildMessageQueue(participantName, bullyingType) {
    const used = getUsedScenarios(participantName);
    const queue = [];

    let selectedTypes;
    if (bullyingType === 'all') {
        const CYBER_TYPES = ['sozel', 'dislama', 'tehdit', 'iftira', 'kimlik'];
        const lastTypes = used._lastSessionTypes || [];

        // İlk karıştırma
        let shuffled = [...CYBER_TYPES].sort(() => Math.random() - 0.5);
        let candidate = shuffled.slice(0, 3);

        // Önceki oturumla tam aynıysa tekrar karıştır (en fazla 10 deneme)
        for (let attempt = 0; attempt < 10; attempt++) {
            const sameAsLast = lastTypes.length === 3 &&
                [...candidate].sort().join(',') === [...lastTypes].sort().join(',');
            if (!sameAsLast) break;
            shuffled = [...CYBER_TYPES].sort(() => Math.random() - 0.5);
            candidate = shuffled.slice(0, 3);
        }

        selectedTypes = candidate;
        used._lastSessionTypes = selectedTypes;
    } else {
        selectedTypes = [bullyingType];
    }

    selectedTypes.forEach(type => {
        const pool = MESSAGE_POOL[type] || [];
        const usedIndexes = used[type] || [];

        // Kullanılmamış indexler
        let available = pool.map((_, i) => i).filter(i => !usedIndexes.includes(i));

        // Hepsi kullanıldıysa sıfırla
        if (available.length < 1) {
            used[type] = [];
            available = pool.map((_, i) => i);
        }

        // Karıştır ve 1 tane seç
        const shuffledPool = available.sort(() => Math.random() - 0.5);
        const idx = shuffledPool[0];

        const scenario = {
            ...pool[idx],
            messages: pool[idx].messages ? [...pool[idx].messages] : undefined
        };
        // Rastgele zorba kullanıcı adı ata
        const bullyName = BULLY_USERNAMES[Math.floor(Math.random() * BULLY_USERNAMES.length)]
            + '_' + Math.floor(Math.random() * 900 + 100);
        scenario.sender = bullyName;
        scenario.avatar = bullyName;
        scenario._bullyingType = type;
        queue.push(scenario);
        used[type].push(idx);
    });

    // Kuyruğu karıştır (farklı türler iç içe gelsin)
    const shuffledQueue = queue.sort(() => Math.random() - 0.5);

    saveUsedScenarios(participantName, used);
    return shuffledQueue;
}

// Global scope'a atama (script tag ile yüklendiğinde erişilebilir olması için)
if (typeof window !== 'undefined') {
    window.BULLYING_TYPES = BULLYING_TYPES;
    window.COMPLAINT_REASONS = COMPLAINT_REASONS;
    window.POSTS_100 = POSTS_100;
    window.STORY_USERS = STORY_USERS;
    window.MESSAGE_POOL = MESSAGE_POOL;
    window.BULLY_USERNAMES = BULLY_USERNAMES;
    window.buildMessageQueue = buildMessageQueue;
    window.getUsedScenarios = getUsedScenarios;
    window.saveUsedScenarios = saveUsedScenarios;
}
