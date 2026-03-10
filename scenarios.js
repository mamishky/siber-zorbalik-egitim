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
        { messages: [{ type: 'cyberbullying', text: 'Gay mısın oğlum sen?', cyberType: 'sozel', complaintReason: 'sozel' }, { type: 'cyberbullying', text: 'bu kıza da bakmıyorsun?', cyberType: 'sozel', complaintReason: 'sozel' }] }
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
        { messages: [{ type: 'cyberbullying', text: 'adın kötüye çıkmış', cyberType: 'iftira', complaintReason: 'iftira' }, { type: 'cyberbullying', text: 'herkes konuşuyor', cyberType: 'iftira', complaintReason: 'iftira' }] },
        { messages: [{ type: 'cyberbullying', text: 'saç kesimin çok komik olduğunu söylüyorlar.', cyberType: 'iftira', complaintReason: 'iftira' }, { type: 'cyberbullying', text: 'Benden duymuş ol', cyberType: 'iftira', complaintReason: 'iftira' }] },
        { messages: [{ type: 'cyberbullying', text: 'kıtlıktan mı çıktın?', cyberType: 'iftira', complaintReason: 'iftira' }, { type: 'cyberbullying', text: 'yavaş beni de yiyeceksin.', cyberType: 'iftira', complaintReason: 'iftira' }] },
        { messages: [{ type: 'cyberbullying', text: 'kusura bakma da sana bu kilolarla kimse aşık olmaz. Sen git önce bir 20 kilo ver sonra bunları düşün.', cyberType: 'iftira', complaintReason: 'iftira' }] }
    ],
    'kimlik': [
        { messages: [{ type: 'cyberbullying', text: 'merhaba öğrenci ben müdür yardımcısı', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'disiplinle ilgili bir durum var', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'velinin kimlik bilgilerini buraya yaz', cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: 'knk ben emre yeni hesap bu', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'eski hesabımı kapattılar', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'senin hesabın şifresini versene eski mesajlarımıza bi şeylere bakacağım', cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: 'değerli kullanıcı', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'hesabınızla ilgili bir sorun bulunmaktadır', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'hemen hesap bilgilerinizi bizimle paylaşmanız gerekmektedir', cyberType: 'kimlik', complaintReason: 'kimlik' }] },
        { messages: [{ type: 'cyberbullying', text: "selam ben 11'lerden yeliz", cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'seni uzun zamandır beğeniyorum', cyberType: 'kimlik', complaintReason: 'kimlik' }, { type: 'cyberbullying', text: 'bi foto atabilir misin?', cyberType: 'kimlik', complaintReason: 'kimlik' }] },
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
    return data ? JSON.parse(data) : { sozel: [], dislama: [], tehdit: [], iftira: [], kimlik: [] };
}

function saveUsedScenarios(participantName, usedData) {
    const key = `used_scenarios_${participantName.toLowerCase().trim()}`;
    localStorage.setItem(key, JSON.stringify(usedData));
}

// Rastgele senaryo havuzundan kuyruk oluştur
// Her tür için 1 senaryo seçer → toplamda 5 zorbalık mesajı (5 tür × 1)
// Normal mesajlar safetagram-ai.js tarafından ayrıca eklenir (5 adet)
// Toplam: 5 zorbalık + 5 normal = 10 mesaj, tamamı rastgele karışık
function buildMessageQueue(participantName, bullyingType) {
    const used = getUsedScenarios(participantName);
    const queue = [];
    const types = bullyingType === 'all' ? ['sozel', 'dislama', 'tehdit', 'iftira', 'kimlik'] : [bullyingType];
    const scenariosPerType = bullyingType === 'all' ? 1 : 5;

    types.forEach(type => {
        const pool = MESSAGE_POOL[type] || [];
        const usedIndexes = used[type] || [];

        // Kullanılmamış indexler
        let available = pool.map((_, i) => i).filter(i => !usedIndexes.includes(i));

        // Hepsi kullanıldıysa sıfırla
        if (available.length < scenariosPerType) {
            used[type] = [];
            available = pool.map((_, i) => i);
        }

        // Karıştır ve seç
        const shuffled = available.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, Math.min(scenariosPerType, shuffled.length));

        selected.forEach(idx => {
            const scenario = { ...pool[idx] };
            // Rastgele zorba kullanıcı adı ata
            scenario.sender = BULLY_USERNAMES[Math.floor(Math.random() * BULLY_USERNAMES.length)]
                + '_' + Math.floor(Math.random() * 900 + 100);
            // Zorbalık türünü senaryoya ekle (saveMessageData'da kullanılır)
            scenario._bullyingType = type;
            queue.push(scenario);
            used[type].push(idx);
        });
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
    window.SCENARIOS = SCENARIOS;
    window.POSTS_100 = POSTS_100;
    window.STORY_USERS = STORY_USERS;
    window.MESSAGE_POOL = MESSAGE_POOL;
    window.BULLY_USERNAMES = BULLY_USERNAMES;
    window.buildMessageQueue = buildMessageQueue;
    window.getUsedScenarios = getUsedScenarios;
    window.saveUsedScenarios = saveUsedScenarios;
}
