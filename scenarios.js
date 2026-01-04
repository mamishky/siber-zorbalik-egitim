// 100+ Benzersiz Türk İsimleri
const TURKISH_NAMES = [
    "Ali Yılmaz", "Ayşe Demir", "Mehmet Kaya", "Zeynep Öztürk", "Ahmet Şahin",
    "Fatma Çelik", "Mustafa Aydın", "Emine Yıldız", "Hasan Arslan", "Hatice Doğan",
    "İbrahim Kılıç", "Elif Avcı", "Hüseyin Aslan", "Hacer Koç", "Murat Özdemir",
    "Fadime Şimşek", "Ramazan Yılmaz", "Ayşegül Kara", "Osman Çetin", "Hanife Kurt",
    "Süleyman Özkan", "Zeliha Özer", "Yaşar Polat", "Meryem Turan", "İsmail Demirci",
    "Şerife Erdoğan", "Halil Yavuz", "Sevim Çakır", "Recep Güneş", "Sabiha Aksoy",
    "Cem Yıldız", "Can Yılmaz", "Tarık Barkan", "Barkan Taş", "Aleyna Tilkici",
    "Aleyda Tilki", "Nadise Güzel", "Hadide Kaya", "Arda Turan", "Burak Özkan",
    "Ece Demir", "Deniz Akar", "Gizem Şen", "Kaan Yurt", "Berk Öztürk",
    "Selin Yıldırım", "Emre Koçak", "Ceren Arslan", "Onur Demirtaş", "Merve Karataş",
    "Tolga Aydın", "Neslihan Çelik", "Kerem Yılmaz", "Pınar Özer", "Serkan Aksoy",
    "Aslı Güven", "Görkem Taş", "Ebru Kale", "Mert Çetin", "Seda Tuncer",
    "Umut Kara", "Esra Öz", "Alper Kılıç", "İrem Ateş", "Barış Türk",
    "Gamze Akın", "Tuncay Erdoğan", "Derya Çakır", "Ferhat Özdemir", "Dilek Yıldız",
    "Volkan Doğan", "Şebnem Sarı", "Engin Kaya", "Sevgi Tekin", "Orhan Polat",
    "Nihal Avcı", "Erdem Şahin", "Özlem Arslan", "Yusuf Koç", "Filiz Demirci",
    "Sinan Yavuz", "Songül Güneş", "Levent Çelik", "Nurcan Özkan", "Kadir Aydın",
    "Canan Öztürk", "Serdar Yılmaz", "Belgin Demir", "Selim Kara", "Gülsüm Aksoy",
    "Ercan Turan", "Nurten Erdoğan", "İsmet Çakır", "Münevver Yıldırım", "Nejat Özdemir",
    "Perihan Kaya", "Nuri Taş", "Saime Çetin", "Haluk Özer", "Nermin Yavuz",
    "Cemil Güneş", "Zehra Polat", "Rıza Arslan", "Fadime Koç", "Reşat Demirci"
];

// 100 Türkçe Senaryo: 4 Oturum × 5 Zorbalık Türü × 5 Mesaj
// Her oturum: 5 mesaj (3 güvenli, 2 siber zorbalık)

const SCENARIOS = {
    // BAŞLAMA DÜZEYİ (ÖN-TEST)
    baslama: {
        sozel: [
            {
                sender: "ali.yilmaz",
                avatar: "aliyilmaz",
                messages: [
                    { type: "safe", text: "Merhaba! Nasılsın bugün?", response: "text" },
                    { type: "safe", text: "Ben bugün çok iyiyim, teşekkürler!", response: "text" },
                    { type: "cyberbullying", text: "Sen gerçekten çok aptalsın, hiçbir şey bilmiyorsun!", actions: ["report", "block"] },
                    { type: "safe", text: "Yarın sinemaya gidelim mi?", response: "text" },
                    { type: "cyberbullying", text: "Seninle kimse arkadaş olmak istemez, çok salaksın!", actions: ["report", "block"] }
                ]
            }
        ],
        dislanma: [
            {
                sender: "ayse.demir",
                avatar: "aysedemir",
                messages: [
                    { type: "safe", text: "Bugün ders çalışacak mısın?", response: "text" },
                    { type: "cyberbullying", text: "Seni partiye davet etmedik, kimse seni istemiyor.", actions: ["report", "block"] },
                    { type: "safe", text: "Matematik ödevini yaptın mı?", response: "text" },
                    { type: "cyberbullying", text: "Bizim gruba katılamazsın, sen uygun değilsin.", actions: ["report", "block"] },
                    { type: "safe", text: "Yarın sınıfta görüşürüz.", response: "text" }
                ]
            }
        ],
        tehdit: [
            {
                sender: "mehmet.kaya",
                avatar: "mehmetkaya",
                messages: [
                    { type: "safe", text: "Yeni oyunu denedin mi?", response: "text" },
                    { type: "safe", text: "O oyun çok eğlenceli!", response: "text" },
                    { type: "cyberbullying", text: "Eğer bunu birine söylersen seni döverim!", actions: ["report", "block"] },
                    { type: "cyberbullying", text: "Yarın para getir yoksa başın belada!", actions: ["report", "block"] },
                    { type: "safe", text: "Yarın spor salonunda görüşürüz.", response: "text" }
                ]
            }
        ],
        iftira: [
            {
                sender: "zeynep.ozturk",
                avatar: "zeynepozturk",
                messages: [
                    { type: "safe", text: "Bugün hava çok güzel değil mi?", response: "text" },
                    { type: "cyberbullying", text: "Herkes senin hırsızlık yaptığını söylüyor, doğru mu?", actions: ["report", "block"] },
                    { type: "safe", text: "Yeni dizi tavsiyesi var mı?", response: "text" },
                    { type: "safe", text: "Ben de o diziyi izliyorum!", response: "text" },
                    { type: "cyberbullying", text: "Sınıfta senin kopya çektiğini söylüyorlar, çok ayıp!", actions: ["report", "block"] }
                ]
            }
        ],
        kimlik: [
            {
                sender: "sahte_hesap",
                avatar: "sahtehesap",
                messages: [
                    { type: "safe", text: "Merhaba, tanışalım mı?", response: "text" },
                    { type: "cyberbullying", text: "Ben aslında senin arkadaşının hesabını çaldım!", actions: ["report", "block"] },
                    { type: "safe", text: "Ne tür müzikler dinliyorsun?", response: "text" },
                    { type: "cyberbullying", text: "Senin şifreni biliyorum, hesabını ele geçireceğim!", actions: ["report", "block"] },
                    { type: "safe", text: "İyi günler dilerim.", response: "text" }
                ]
            }
        ]
    },
    
    // UYGULAMA
    uygulama: {
        sozel: [
            {
                sender: "cem.yildiz",
                avatar: "cemyildiz",
                messages: [
                    { type: "safe", text: "Bugünkü maçı izledin mi?", response: "text" },
                    { type: "cyberbullying", text: "Sen gerçekten çok çirkinsin, aynaya bakma!", actions: ["report", "block"] },
                    { type: "safe", text: "Hangi takımı tutuyorsun?", response: "text" },
                    { type: "safe", text: "Ben de aynı takımı tutuyorum!", response: "text" },
                    { type: "cyberbullying", text: "Kimse senin gibi birini sevemez, berbatsın!", actions: ["report", "block"] }
                ]
            }
        ],
        dislanma: [
            {
                sender: "selin.yildirim",
                avatar: "selinyildirim",
                messages: [
                    { type: "safe", text: "Yarın pikniğe geliyor musun?", response: "text" },
                    { type: "safe", text: "Harika! Çok eğlenceli olacak.", response: "text" },
                    { type: "cyberbullying", text: "Aslında seni istemiyoruz, gelme daha iyi.", actions: ["report", "block"] },
                    { type: "cyberbullying", text: "Gruptan çıkardık seni, artık bizden değilsin.", actions: ["report", "block"] },
                    { type: "safe", text: "Yarın görüşmek üzere.", response: "text" }
                ]
            }
        ],
        tehdit: [
            {
                sender: "can.yilmaz",
                avatar: "canyilmaz",
                messages: [
                    { type: "safe", text: "Ödevini bitirdin mi?", response: "text" },
                    { type: "cyberbullying", text: "Eğer ödevini vermezsen fotoğraflarını yayarım!", actions: ["report", "block"] },
                    { type: "safe", text: "Matematik zordu değil mi?", response: "text" },
                    { type: "cyberbullying", text: "Bana para ver yoksa sırlarını ifşa ederim!", actions: ["report", "block"] },
                    { type: "safe", text: "Yarın kütüphanede çalışalım.", response: "text" }
                ]
            }
        ],
        iftira: [
            {
                sender: "gizem.sen",
                avatar: "gizemsen",
                messages: [
                    { type: "safe", text: "Bugün çok yorgunum.", response: "text" },
                    { type: "safe", text: "Ben de aynı şekilde.", response: "text" },
                    { type: "cyberbullying", text: "Herkes senin yalan söylediğini biliyor, utanmıyor musun?", actions: ["report", "block"] },
                    { type: "cyberbullying", text: "Senin ailenle ilgili kötü şeyler duydum, doğru mu?", actions: ["report", "block"] },
                    { type: "safe", text: "İyi akşamlar!", response: "text" }
                ]
            }
        ],
        kimlik: [
            {
                sender: "fake_profile",
                avatar: "fakeprofile",
                messages: [
                    { type: "safe", text: "Selam, yeni mi katıldın?", response: "text" },
                    { type: "cyberbullying", text: "Senin adınla sahte hesap açtım, herkese mesaj attım!", actions: ["report", "block"] },
                    { type: "safe", text: "Okulda neyi seversin?", response: "text" },
                    { type: "safe", text: "Çok güzel hobiler bunlar.", response: "text" },
                    { type: "cyberbullying", text: "Senin hesabını ele geçirdim, şifreni değiştirdim!", actions: ["report", "block"] }
                ]
            }
        ]
    },
    
    // SON-TEST
    "son-test": {
        sozel: [
            {
                sender: "tarik.barkan",
                avatar: "tarikbarkan",
                messages: [
                    { type: "safe", text: "Yeni filmler var mı izledin?", response: "text" },
                    { type: "safe", text: "Ben de izlemek istiyorum!", response: "text" },
                    { type: "safe", text: "Hangi tür filmleri seversin?", response: "text" },
                    { type: "cyberbullying", text: "Sen gerçekten hiçbir şey başaramazsın, yeteneksizsin!", actions: ["report", "block"] },
                    { type: "cyberbullying", text: "Herkes senden nefret ediyor, kaybol buradan!", actions: ["report", "block"] }
                ]
            }
        ],
        dislanma: [
            {
                sender: "aleyna.tilkici",
                avatar: "aleynatilkici",
                messages: [
                    { type: "safe", text: "Bugün ne yapıyorsun?", response: "text" },
                    { type: "cyberbullying", text: "Seni doğum günü partisine çağırmadık, istemiyoruz.", actions: ["report", "block"] },
                    { type: "safe", text: "Yeni kitap aldın mı?", response: "text" },
                    { type: "cyberbullying", text: "Bizim takımda yer yok sana, başka yer bul.", actions: ["report", "block"] },
                    { type: "safe", text: "Haftaya görüşürüz.", response: "text" }
                ]
            }
        ],
        tehdit: [
            {
                sender: "berk.ozturk",
                avatar: "berkozturk",
                messages: [
                    { type: "safe", text: "Bugün hava nasıl?", response: "text" },
                    { type: "cyberbullying", text: "Kimseye söyleme yoksa çok kötü olur!", actions: ["report", "block"] },
                    { type: "safe", text: "Spor yapmayı sever misin?", response: "text" },
                    { type: "safe", text: "Ben de sporu çok severim.", response: "text" },
                    { type: "cyberbullying", text: "Yarın bana 50 lira getir, getirmezsen pişman olursun!", actions: ["report", "block"] }
                ]
            }
        ],
        iftira: [
            {
                sender: "nadise.guzel",
                avatar: "nadiseguzel",
                messages: [
                    { type: "safe", text: "Yeni oyunu aldın mı?", response: "text" },
                    { type: "cyberbullying", text: "Duydum ki sen başkalarının eşyalarını çalıyormuşsun!", actions: ["report", "block"] },
                    { type: "safe", text: "Hangi dersi seversin?", response: "text" },
                    { type: "cyberbullying", text: "Herkes senin not çalıp sattığını söylüyor!", actions: ["report", "block"] },
                    { type: "safe", text: "Görüşmek üzere!", response: "text" }
                ]
            }
        ],
        kimlik: [
            {
                sender: "clone_account",
                avatar: "cloneaccount",
                messages: [
                    { type: "safe", text: "Selam, nasılsın?", response: "text" },
                    { type: "safe", text: "Ben iyiyim teşekkürler!", response: "text" },
                    { type: "cyberbullying", text: "Senin fotoğraflarını kopyaladım, sahte hesap açtım!", actions: ["report", "block"] },
                    { type: "cyberbullying", text: "Senin bilgilerini çaldım, artık kimliğin bende!", actions: ["report", "block"] },
                    { type: "safe", text: "İyi günler.", response: "text" }
                ]
            }
        ]
    },
    
    // GENELLEME
    genelleme: {
        sozel: [
            {
                sender: "barkan.tas",
                avatar: "barkantas",
                messages: [
                    { type: "safe", text: "Haftasonu planın var mı?", response: "text" },
                    { type: "cyberbullying", text: "Sen gerçekten çok kötü görünüyorsun, iğrençsin!", actions: ["report", "block"] },
                    { type: "safe", text: "Ben sinemaya gideceğim.", response: "text" },
                    { type: "cyberbullying", text: "Hiç kimse seninle olmak istemez, tiksinç birisin!", actions: ["report", "block"] },
                    { type: "safe", text: "Haftaya görüşürüz.", response: "text" }
                ]
            }
        ],
        dislanma: [
            {
                sender: "hadide.kaya",
                avatar: "hadidekaya",
                messages: [
                    { type: "safe", text: "Yeni albümü dinledin mi?", response: "text" },
                    { type: "safe", text: "Çok güzel şarkılar var!", response: "text" },
                    { type: "cyberbullying", text: "Gezi planlarına dahil değilsin, seni istemiyoruz.", actions: ["report", "block"] },
                    { type: "safe", text: "En sevdiğin şarkı hangisi?", response: "text" },
                    { type: "cyberbullying", text: "Arkadaş grubundan çıkarıldın, artık aramıza gelme.", actions: ["report", "block"] }
                ]
            }
        ],
        tehdit: [
            {
                sender: "murat.demirtas",
                avatar: "muratdemirtas",
                messages: [
                    { type: "safe", text: "Bugün dersler nasıldı?", response: "text" },
                    { type: "safe", text: "Bence de zordu.", response: "text" },
                    { type: "cyberbullying", text: "Eğer öğretmene söylersen seni okul çıkışı bulurum!", actions: ["report", "block"] },
                    { type: "cyberbullying", text: "Yarın 100 lira getir, getirmezsen videolarını yayarım!", actions: ["report", "block"] },
                    { type: "safe", text: "Yarın görüşürüz.", response: "text" }
                ]
            }
        ],
        iftira: [
            {
                sender: "aleyda.tilki",
                avatar: "aleydatilki",
                messages: [
                    { type: "safe", text: "Tatil planların nasıl?", response: "text" },
                    { type: "cyberbullying", text: "Duydum ki sen sınıfta başkalarına zarar veriyormuşsun!", actions: ["report", "block"] },
                    { type: "safe", text: "Ben denize gideceğim.", response: "text" },
                    { type: "safe", text: "Çok güzel olacak!", response: "text" },
                    { type: "cyberbullying", text: "Herkes senin aileni kötülediğini söylüyor, ne kadar kötüsün!", actions: ["report", "block"] }
                ]
            }
        ],
        kimlik: [
            {
                sender: "imposter_hesap",
                avatar: "imposterhesap",
                messages: [
                    { type: "safe", text: "Merhaba, tanışabilir miyiz?", response: "text" },
                    { type: "cyberbullying", text: "Senin adına mesajlar gönderiyorum, kimse fark etmedi!", actions: ["report", "block"] },
                    { type: "safe", text: "Hobilerinden bahseder misin?", response: "text" },
                    { type: "cyberbullying", text: "Hesabını hackledim, şimdi senin yerine mesaj atıyorum!", actions: ["report", "block"] },
                    { type: "safe", text: "Görüşmek üzere.", response: "text" }
                ]
            }
        ]
    }
};

// Oturum ve zorbalık türü etiketleri
const SESSION_LABELS = {
    baslama: "Başlama Düzeyi (Ön-Test)",
    uygulama: "Uygulama",
    "son-test": "Son-Test",
    genelleme: "Genelleme"
};

const BULLYING_TYPE_LABELS = {
    sozel: "Sözel/Psikolojik Saldırı",
    dislanma: "Sosyal Dışlanma",
    tehdit: "Tehdit ve Şantaj",
    iftira: "Yanlış Bilgi/İftira/Dedikodu",
    kimlik: "Kimlik Taklidi/Sahte Hesap"
};

// Tüm zorbalık türlerinin listesi
const BULLYING_TYPES = ["sozel", "dislanma", "tehdit", "iftira", "kimlik"];
