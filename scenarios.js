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
    { id: 'sozel', label: 'Sözel/Psikolojik Saldırı' },
    { id: 'dislama', label: 'Dışlama' },
    { id: 'tehdit', label: 'Tehdit/Şantaj' },
    { id: 'iftira', label: 'Karalama/Aşağılama' },
    { id: 'kimlik', label: 'Kimliğe Bürünme/Taklit' }
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
    { username: "elraenn", avatar: "elraenn", image: "https://picsum.photos/seed/gaming11/600/600", caption: "", likes: 45000, type: "image" }, // Free Fire
    { username: "pqueen", avatar: "pqueen", image: "https://picsum.photos/seed/gaming12/600/600", caption: "", likes: 35000, type: "image" }, // Candy Crush
    { username: "jahrein", avatar: "jahrein", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 25000, type: "video" }, // Minecraft hayatta kalma
    { username: "unlost", avatar: "unlost", image: "https://picsum.photos/seed/gaming13/600/600", caption: "", likes: 20000, type: "image" }, // Roblox popüler oyunlar
    { username: "kendine_muzisyen", avatar: "kendinemuzisyen", image: "https://picsum.photos/seed/gaming14/600/600", caption: "", likes: 18000, type: "image" }, // Minecraft yapı
    { username: "wtcn", avatar: "wtcn", image: "https://picsum.photos/seed/gaming15/600/600", caption: "", likes: 16000, type: "image" }, // Roblox avatar
    { username: "pinky", avatar: "pinky", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 14000, type: "video" }, // Minecraft redstone
    { username: "irmak_tuzun", avatar: "irmaktuzun", image: "https://picsum.photos/seed/gaming16/600/600", caption: "", likes: 12000, type: "image" }, // Roblox korku
    { username: "xqc", avatar: "xqc", image: "https://picsum.photos/seed/gaming17/600/600", caption: "", likes: 10000, type: "image" }, // Minecraft seed
    { username: "pokimane", avatar: "pokimane", image: "https://picsum.photos/seed/gaming18/600/600", caption: "", likes: 9000, type: "image" }, // Roblox roleplay
    { username: "ninja", avatar: "ninja", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 8000, type: "video" }, // Minecraft PvP
    { username: "valkyrae", avatar: "valkyrae", image: "https://picsum.photos/seed/gaming19/600/600", caption: "", likes: 7000, type: "image" }, // Roblox obby
    { username: "messi", avatar: "messi", image: "https://picsum.photos/seed/football1/600/600", caption: "", likes: 2500000, type: "image" }, // Messi vs Ronaldo
    { username: "ronaldo", avatar: "ronaldo", image: "https://picsum.photos/seed/football2/600/600", caption: "", likes: 2300000, type: "image" }, // Premier League
    { username: "haaland", avatar: "haaland", image: "https://picsum.photos/seed/football3/600/600", caption: "", likes: 1800000, type: "image" }, // Şampiyonlar Ligi
    { username: "messi", avatar: "messi", image: "https://picsum.photos/seed/football4/600/600", caption: "", likes: 1500000, type: "image" }, // Futbol efsaneleri
    { username: "ronaldo", avatar: "ronaldo", image: "https://picsum.photos/seed/football5/600/600", caption: "", likes: 1200000, type: "image" }, // Galatasaray
    { username: "haaland", avatar: "haaland", image: "https://picsum.photos/seed/football6/600/600", caption: "", likes: 1000000, type: "image" }, // Fenerbahçe
    { username: "messi", avatar: "messi", image: "https://picsum.photos/seed/football7/600/600", caption: "", likes: 900000, type: "image" }, // Beşiktaş
    { username: "ronaldo", avatar: "ronaldo", image: "https://picsum.photos/seed/football8/600/600", caption: "", likes: 800000, type: "image" }, // Süper Lig
    { username: "haaland", avatar: "haaland", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 700000, type: "video" }, // Dünya Kupası
    { username: "messi", avatar: "messi", image: "https://picsum.photos/seed/football9/600/600", caption: "", likes: 600000, type: "image" }, // Genç futbolcu
    { username: "cem_yilmaz", avatar: "cemyilmaz", image: "https://picsum.photos/seed/celebrity1/600/600", caption: "", likes: 450000, type: "image" }, // Cem Yılmaz replikleri
    { username: "hadise", avatar: "hadise", image: "https://picsum.photos/seed/celebrity2/600/600", caption: "", likes: 380000, type: "image" }, // Hadise paylaşımları
    { username: "acun_ilicali", avatar: "acunilicali", image: "https://picsum.photos/seed/celebrity3/600/600", caption: "", likes: 320000, type: "image" }, // Acun projeleri
    { username: "aleyna_tilki", avatar: "aleynatilki", image: "https://picsum.photos/seed/celebrity4/600/600", caption: "", likes: 280000, type: "image" }, // Aleyna tarz
    { username: "kenan_imirzalioglu", avatar: "kenanimirzalioglu", image: "https://picsum.photos/seed/celebrity5/600/600", caption: "", likes: 240000, type: "image" }, // Kenan rol
    { username: "demet_ozdemir", avatar: "demetozdemir", image: "https://picsum.photos/seed/celebrity6/600/600", caption: "", likes: 200000, type: "image" }, // Demet dizi
    { username: "baris_arduc", avatar: "barisarduc", image: "https://picsum.photos/seed/celebrity7/600/600", caption: "", likes: 180000, type: "image" }, // Barış stil
    { username: "hande_ercel", avatar: "handeercel", image: "https://picsum.photos/seed/celebrity8/600/600", caption: "", likes: 160000, type: "image" }, // Hande makyaj
    { username: "cagatay_ulusoy", avatar: "cagatayulusoy", image: "https://picsum.photos/seed/celebrity9/600/600", caption: "", likes: 140000, type: "image" }, // Çağatay transformasyon
    { username: "serenay_sarikaya", avatar: "serenaysarikaya", image: "https://picsum.photos/seed/celebrity10/600/600", caption: "", likes: 120000, type: "image" }, // Serenay moda
    { username: "elonmusk", avatar: "elonmusk", image: "https://picsum.photos/seed/international1/600/600", caption: "", likes: 5000000, type: "image" }, // Elon tweet
    { username: "therock", avatar: "therock", image: "https://picsum.photos/seed/international2/600/600", caption: "", likes: 4500000, type: "image" }, // The Rock motivasyon
    { username: "kyliejenner", avatar: "kyliejenner", image: "https://picsum.photos/seed/international3/600/600", caption: "", likes: 4000000, type: "image" }, // Kylie beauty
    { username: "travisscott", avatar: "travisscott", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 3500000, type: "video" }, // Travis konser
    { username: "kimkardashian", avatar: "kimkardashian", image: "https://picsum.photos/seed/international4/600/600", caption: "", likes: 3000000, type: "image" }, // Kim kariyer
    { username: "badbunny", avatar: "badbunny", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 2800000, type: "video" }, // Bad Bunny müzik
    { username: "margotrobbie", avatar: "margotrobbie", image: "https://picsum.photos/seed/international5/600/600", caption: "", likes: 2500000, type: "image" }, // Margot film
    { username: "ryangosling", avatar: "ryangosling", image: "https://picsum.photos/seed/international6/600/600", caption: "", likes: 2200000, type: "image" }, // Ryan meme
    { username: "zendaya", avatar: "zendaya", image: "https://picsum.photos/seed/international7/600/600", caption: "", likes: 2000000, type: "image" }, // Zendaya stil
    { username: "timotheechalamet", avatar: "timotheechalamet", image: "https://picsum.photos/seed/international8/600/600", caption: "", likes: 1800000, type: "image" }, // Timothée transformasyon
    { username: "tiktok", avatar: "tiktok", image: "https://picsum.photos/seed/trend1/600/600", caption: "", likes: 1500000, type: "image" }, // 2024 özeti
    { username: "instagram", avatar: "instagram", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 1200000, type: "video" }, // Viral TikTok dansları
    { username: "twitter", avatar: "twitter", image: "https://picsum.photos/seed/trend2/600/600", caption: "", likes: 1000000, type: "image" }, // Popüler meme'ler
    { username: "youtube", avatar: "youtube", image: "https://picsum.photos/seed/trend3/600/600", caption: "", likes: 900000, type: "image" }, // Nostaljik 2000'ler
    { username: "snapchat", avatar: "snapchat", image: "https://picsum.photos/seed/trend4/600/600", caption: "", likes: 800000, type: "image" }, // Gen Z vs Millennial
    { username: "spotify", avatar: "spotify", image: "https://picsum.photos/seed/trend5/600/600", caption: "", likes: 700000, type: "image" }, // Spotify wrapped
    { username: "bereal", avatar: "bereal", image: "https://picsum.photos/seed/trend6/600/600", caption: "", likes: 600000, type: "image" }, // BeReal günlük
    { username: "tiktok", avatar: "tiktok", image: "https://picsum.photos/seed/trend7/600/600", caption: "", likes: 500000, type: "image" }, // Instagram vs TikTok
    { username: "instagram", avatar: "instagram", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 400000, type: "video" }, // AI sanat
    { username: "twitter", avatar: "twitter", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 300000, type: "video" }, // Viral challenge
    { username: "netflix", avatar: "netflix", image: "https://picsum.photos/seed/entertainment1/600/600", caption: "", likes: 250000, type: "image" }, // Netflix dizi
    { username: "disney", avatar: "disney", image: "https://picsum.photos/seed/entertainment2/600/600", caption: "", likes: 200000, type: "image" }, // En iyi anime
    { username: "hbo", avatar: "hbo", image: "https://picsum.photos/seed/entertainment3/600/600", caption: "", likes: 180000, type: "image" }, // Komedi filmleri
    { username: "spotify", avatar: "spotify", image: "https://picsum.photos/seed/entertainment4/600/600", caption: "", likes: 160000, type: "image" }, // Spotify playlist
    { username: "netflix", avatar: "netflix", image: "https://picsum.photos/seed/entertainment5/600/600", caption: "", likes: 140000, type: "image" }, // Türk dizileri
    { username: "marvel", avatar: "marvel", image: "https://picsum.photos/seed/entertainment6/600/600", caption: "", likes: 120000, type: "image" }, // Marvel vs DC
    { username: "netflix", avatar: "netflix", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 100000, type: "video" }, // Stranger Things
    { username: "crunchyroll", avatar: "crunchyroll", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 90000, type: "video" }, // One Piece
    { username: "amc", avatar: "amc", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 80000, type: "video" }, // Breaking Bad
    { username: "hbo", avatar: "hbo", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 70000, type: "video" } // The Last of Us
];

// Senaryo yapısı - Her oturum türü için zorbalık türlerine göre mesajlar
// AI tarafından dinamik olarak oluşturulacak
const SCENARIOS = {
    'baslama': {
        'sozel': [
            { sender: 'ahmet_123', messages: [{ type: 'cyberbullying', text: 'Sen çok aptalsın', cyberType: 'sozel' }] },
            { sender: 'mehmet_456', conversation: [{ type: 'safe', text: 'Merhaba, nasılsın?' }] }
        ],
        'dislama': [
            { sender: 'ayse_789', messages: [{ type: 'cyberbullying', text: 'Seni gruba almıyoruz', cyberType: 'dislama' }] },
            { sender: 'fatma_012', conversation: [{ type: 'safe', text: 'Bugün hava çok güzel' }] }
        ],
        'tehdit': [
            { sender: 'ali_345', messages: [{ type: 'cyberbullying', text: 'Seni şikayet edeceğim', cyberType: 'tehdit' }] },
            { sender: 'veli_678', conversation: [{ type: 'safe', text: 'Ödevini yaptın mı?' }] }
        ],
        'iftira': [
            { sender: 'zeynep_901', messages: [{ type: 'cyberbullying', text: 'Herkes senin hakkında kötü konuşuyor', cyberType: 'iftira' }] },
            { sender: 'elif_234', conversation: [{ type: 'safe', text: 'Yarın sinemaya gidelim mi?' }] }
        ],
        'kimlik': [
            { sender: 'can_567', messages: [{ type: 'cyberbullying', text: 'Ben senin arkadaşınım, şifreni ver', cyberType: 'kimlik' }] },
            { sender: 'deniz_890', conversation: [{ type: 'safe', text: 'Bu oyunu denedin mi?' }] }
        ]
    },
    'uygulama': {
        'sozel': [
            { sender: 'user_001', messages: [{ type: 'cyberbullying', text: 'Gerçekten çok kötüsün', cyberType: 'sozel' }] },
            { sender: 'user_002', conversation: [{ type: 'safe', text: 'Selam, nasıl gidiyor?' }] }
        ],
        'dislama': [
            { sender: 'user_003', messages: [{ type: 'cyberbullying', text: 'Seni istemiyoruz', cyberType: 'dislama' }] },
            { sender: 'user_004', conversation: [{ type: 'safe', text: 'Bugün çok güzelsin' }] }
        ],
        'tehdit': [
            { sender: 'user_005', messages: [{ type: 'cyberbullying', text: 'Dikkat et kendine', cyberType: 'tehdit' }] },
            { sender: 'user_006', conversation: [{ type: 'safe', text: 'Dersler nasıl gidiyor?' }] }
        ],
        'iftira': [
            { sender: 'user_007', messages: [{ type: 'cyberbullying', text: 'Herkes seni sevmiyor', cyberType: 'iftira' }] },
            { sender: 'user_008', conversation: [{ type: 'safe', text: 'Hafta sonu planın var mı?' }] }
        ],
        'kimlik': [
            { sender: 'user_009', messages: [{ type: 'cyberbullying', text: 'Ben öğretmenim, bilgilerini ver', cyberType: 'kimlik' }] },
            { sender: 'user_010', conversation: [{ type: 'safe', text: 'Yeni oyunu gördün mü?' }] }
        ]
    },
    'genelleme-on': {
        'sozel': [
            { sender: 'test_001', messages: [{ type: 'cyberbullying', text: 'Sen hiçbir işe yaramazsın', cyberType: 'sozel' }] },
            { sender: 'test_002', conversation: [{ type: 'safe', text: 'Merhaba, iyi misin?' }] }
        ],
        'dislama': [
            { sender: 'test_003', messages: [{ type: 'cyberbullying', text: 'Seni davet etmeyeceğiz', cyberType: 'dislama' }] },
            { sender: 'test_004', conversation: [{ type: 'safe', text: 'Hava gerçekten güzel' }] }
        ],
        'tehdit': [
            { sender: 'test_005', messages: [{ type: 'cyberbullying', text: 'Bunu yaparsan kötü olur', cyberType: 'tehdit' }] },
            { sender: 'test_006', conversation: [{ type: 'safe', text: 'Ödev bitti mi?' }] }
        ],
        'iftira': [
            { sender: 'test_007', messages: [{ type: 'cyberbullying', text: 'Senin hakkında yalan söylüyorlar', cyberType: 'iftira' }] },
            { sender: 'test_008', conversation: [{ type: 'safe', text: 'Sinemaya gider misin?' }] }
        ],
        'kimlik': [
            { sender: 'test_009', messages: [{ type: 'cyberbullying', text: 'Ben arkadaşınım, şifreyi söyle', cyberType: 'kimlik' }] },
            { sender: 'test_010', conversation: [{ type: 'safe', text: 'Oyun oynuyor musun?' }] }
        ]
    },
    'genelleme-son': {
        'sozel': [
            { sender: 'son_001', messages: [{ type: 'cyberbullying', text: 'Çok saçmasın', cyberType: 'sozel' }] },
            { sender: 'son_002', conversation: [{ type: 'safe', text: 'Nasılsın bugün?' }] }
        ],
        'dislama': [
            { sender: 'son_003', messages: [{ type: 'cyberbullying', text: 'Grupta yerin yok', cyberType: 'dislama' }] },
            { sender: 'son_004', conversation: [{ type: 'safe', text: 'İyi günler dilerim' }] }
        ],
        'tehdit': [
            { sender: 'son_005', messages: [{ type: 'cyberbullying', text: 'Sana zarar veririm', cyberType: 'tehdit' }] },
            { sender: 'son_006', conversation: [{ type: 'safe', text: 'Nasıl geçiyor günün?' }] }
        ],
        'iftira': [
            { sender: 'son_007', messages: [{ type: 'cyberbullying', text: 'Seni kimse sevmiyor', cyberType: 'iftira' }] },
            { sender: 'son_008', conversation: [{ type: 'safe', text: 'Gezmeye çıkalım mı?' }] }
        ],
        'kimlik': [
            { sender: 'son_009', messages: [{ type: 'cyberbullying', text: 'Hesabını kontrol etmem lazım', cyberType: 'kimlik' }] },
            { sender: 'son_010', conversation: [{ type: 'safe', text: 'Yeni film izledin mi?' }] }
        ]
    },
    'izleme-2': {
        'sozel': [
            { sender: 'izleme2_001', messages: [{ type: 'cyberbullying', text: 'Berbatsın', cyberType: 'sozel' }] },
            { sender: 'izleme2_002', conversation: [{ type: 'safe', text: 'Selamlar!' }] }
        ],
        'dislama': [
            { sender: 'izleme2_003', messages: [{ type: 'cyberbullying', text: 'Seni aramaya gerek yok', cyberType: 'dislama' }] },
            { sender: 'izleme2_004', conversation: [{ type: 'safe', text: 'Harikasın!' }] }
        ],
        'tehdit': [
            { sender: 'izleme2_005', messages: [{ type: 'cyberbullying', text: 'Pişman olursun', cyberType: 'tehdit' }] },
            { sender: 'izleme2_006', conversation: [{ type: 'safe', text: 'Derste görüşürüz' }] }
        ],
        'iftira': [
            { sender: 'izleme2_007', messages: [{ type: 'cyberbullying', text: 'Herkes senden nefret ediyor', cyberType: 'iftira' }] },
            { sender: 'izleme2_008', conversation: [{ type: 'safe', text: 'Güzel bir gün' }] }
        ],
        'kimlik': [
            { sender: 'izleme2_009', messages: [{ type: 'cyberbullying', text: 'Benim, parolanı unuttum', cyberType: 'kimlik' }] },
            { sender: 'izleme2_010', conversation: [{ type: 'safe', text: 'Spor yapıyor musun?' }] }
        ]
    },
    'izleme-4': {
        'sozel': [
            { sender: 'izleme4_001', messages: [{ type: 'cyberbullying', text: 'Hiçbir şey beceremezsin', cyberType: 'sozel' }] },
            { sender: 'izleme4_002', conversation: [{ type: 'safe', text: 'Hayırlı günler' }] }
        ],
        'dislama': [
            { sender: 'izleme4_003', messages: [{ type: 'cyberbullying', text: 'Bizimle olma', cyberType: 'dislama' }] },
            { sender: 'izleme4_004', conversation: [{ type: 'safe', text: 'Neşeli görünüyorsun' }] }
        ],
        'tehdit': [
            { sender: 'izleme4_005', messages: [{ type: 'cyberbullying', text: 'Sana kötü şeyler olacak', cyberType: 'tehdit' }] },
            { sender: 'izleme4_006', conversation: [{ type: 'safe', text: 'Yardım ister misin?' }] }
        ],
        'iftira': [
            { sender: 'izleme4_007', messages: [{ type: 'cyberbullying', text: 'Kimse seni sevmiyor', cyberType: 'iftira' }] },
            { sender: 'izleme4_008', conversation: [{ type: 'safe', text: 'Müzik dinliyor musun?' }] }
        ],
        'kimlik': [
            { sender: 'izleme4_009', messages: [{ type: 'cyberbullying', text: 'Sistem kontrolü için şifreni ver', cyberType: 'kimlik' }] },
            { sender: 'izleme4_010', conversation: [{ type: 'safe', text: 'Kitap okur musun?' }] }
        ]
    },
    'izleme-8': {
        'sozel': [
            { sender: 'izleme8_001', messages: [{ type: 'cyberbullying', text: 'Gerçekten değersizsin', cyberType: 'sozel' }] },
            { sender: 'izleme8_002', conversation: [{ type: 'safe', text: 'İyi akşamlar' }] }
        ],
        'dislama': [
            { sender: 'izleme8_003', messages: [{ type: 'cyberbullying', text: 'Gruba alınmayacaksın', cyberType: 'dislama' }] },
            { sender: 'izleme8_004', conversation: [{ type: 'safe', text: 'Seni çok seviyorum' }] }
        ],
        'tehdit': [
            { sender: 'izleme8_005', messages: [{ type: 'cyberbullying', text: 'Dikkatli ol', cyberType: 'tehdit' }] },
            { sender: 'izleme8_006', conversation: [{ type: 'safe', text: 'Bugün çok mutluyum' }] }
        ],
        'iftira': [
            { sender: 'izleme8_007', messages: [{ type: 'cyberbullying', text: 'Arkadaşların senden hoşlanmıyor', cyberType: 'iftira' }] },
            { sender: 'izleme8_008', conversation: [{ type: 'safe', text: 'Harika bir günün olsun' }] }
        ],
        'kimlik': [
            { sender: 'izleme8_009', messages: [{ type: 'cyberbullying', text: 'Ben yöneticiyim, bilgilerini kontrol et', cyberType: 'kimlik' }] },
            { sender: 'izleme8_010', conversation: [{ type: 'safe', text: 'Resim çekmeyi sever misin?' }] }
        ]
    }
};

// Story üretimi için gerçek ünlü isimleri
const STORY_USERS = [
    "elraenn", "pqueen", "jahrein", "unlost", "kendine_muzisyen", "wtcn", "pinky", "irmak_tuzun",
    "xqc", "pokimane", "ninja", "valkyrae", "hasanabi", "ludwig", "mizkif", "kai_cenat", "ishowspeed", "adin_ross",
    "messi", "ronaldo", "haaland",
    "cem_yilmaz", "hadise", "acun_ilicali", "aleyna_tilki", "kenan_imirzalioglu", "demet_ozdemir", "baris_arduc", "hande_ercel", "cagatay_ulusoy", "serenay_sarikaya",
    "elonmusk", "therock", "kyliejenner", "travisscott", "kimkardashian", "badbunny", "margotrobbie", "ryangosling", "zendaya", "timotheechalamet",
    "netflix", "instagram", "tiktok", "youtube", "twitter", "spotify", "snapchat", "bereal", "disney", "hbo", "marvel", "crunchyroll", "amc"
];

// Global scope'a atama (script tag ile yüklendiğinde erişilebilir olması için)
if (typeof window !== 'undefined') {
    window.BULLYING_TYPES = BULLYING_TYPES;
    window.COMPLAINT_REASONS = COMPLAINT_REASONS;
    window.SCENARIOS = SCENARIOS;
    window.POSTS_100 = POSTS_100;
    window.STORY_USERS = STORY_USERS;
}
