// Senaryo ve mesaj yapılandırmaları

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
    { username: "elraenn", avatar: "elraenn", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 125000, type: "video" }, // GTA 6 ilk fragman analizi
    { username: "pqueen", avatar: "pqueen", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 98000, type: "video" }, // The Witcher 4 beklentiler
    { username: "jahrein", avatar: "jahrein", image: "https://picsum.photos/seed/gaming1/600/600", caption: "", likes: 87000, type: "image" }, // En iyi açık dünya oyunları
    { username: "unlost", avatar: "unlost", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 76000, type: "video" }, // Elden Ring boss tier list
    { username: "kendine_muzisyen", avatar: "kendinemuzisyen", image: "https://picsum.photos/seed/gaming2/600/600", caption: "", likes: 65000, type: "image" }, // PS5 vs Xbox
    { username: "wtcn", avatar: "wtcn", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 54000, type: "video" }, // Cyberpunk 2077
    { username: "pinky", avatar: "pinky", image: "https://picsum.photos/seed/gaming3/600/600", caption: "", likes: 43000, type: "image" }, // Red Dead Redemption 2
    { username: "irmak_tuzun", avatar: "irmaktuzun", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 32000, type: "video" }, // FIFA 24
    { username: "xqc", avatar: "xqc", image: "https://picsum.photos/seed/gaming4/600/600", caption: "", likes: 210000, type: "image" }, // Call of Duty
    { username: "pokimane", avatar: "pokimane", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 180000, type: "video" }, // Assassin's Creed
    { username: "ninja", avatar: "ninja", image: "https://picsum.photos/seed/gaming5/600/600", caption: "", likes: 150000, type: "image" }, // Brawl Stars tier list
    { username: "valkyrae", avatar: "valkyrae", image: "https://picsum.photos/seed/gaming6/600/600", caption: "", likes: 120000, type: "image" }, // Clash Royale
    { username: "hasanabi", avatar: "hasanabi", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 110000, type: "video" }, // PUBG Mobile
    { username: "ludwig", avatar: "ludwig", image: "https://picsum.photos/seed/gaming7/600/600", caption: "", likes: 95000, type: "image" }, // Mobile Legends
    { username: "mizkif", avatar: "mizkif", videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1", caption: "", likes: 85000, type: "video" }, // Among Us
    { username: "kai_cenat", avatar: "kaicenat", image: "https://picsum.photos/seed/gaming8/600/600", caption: "", likes: 75000, type: "image" }, // Subway Surfers
    { username: "ishowspeed", avatar: "ishowspeed", image: "https://picsum.photos/seed/gaming9/600/600", caption: "", likes: 65000, type: "image" }, // Stumble Guys
    { username: "adin_ross", avatar: "adinross", image: "https://picsum.photos/seed/gaming10/600/600", caption: "", likes: 55000, type: "image" }, // Clash of Clans
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
    
    // FUTBOL (Fotoğraf: 31-40)
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
    
    // TÜRK ÜNLÜLER (Fotoğraf: 41-50)
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
    
    // ULUSLARARASI ÜNLÜLER (Fotoğraf: 51-60)
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
    
    // TREND & VİRAL İÇERİK (Fotoğraf: 61-70, Video: 71-80)
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
    
    // GENEL EĞLENCE (Fotoğraf: 81-90, Video: 91-100)
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
    window.COMPLAINT_REASONS = COMPLAINT_REASONS;
    window.POSTS_100 = POSTS_100;
    window.STORY_USERS = STORY_USERS;
}
