// 100 Türkçe Senaryo: 4 Oturum × 5 Zorbalık Türü × 5 Mesaj
// Her oturum: 5 mesaj (3 güvenli, 2 siber zorbalık)

const SCENARIOS = {
    // BAŞLAMA DÜZEYİ (ÖN-TEST)
    baslama: {
        sozel: [
            {
                sender: "kaan_42",
                avatar: "kaan42",
                messages: [
                    { type: "safe", text: "Merhaba! Nasılsın bugün?", response: "text" },
                    { type: "safe", text: "Ben bugün çok iyiyim, teşekkürler!", response: "text" },
                    { type: "cyberbullying", text: "Sen gerçekten çok aptalsın, hiçbir şey bilmiyorsun!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Yarın sinemaya gidelim mi?", response: "text" },
                    { type: "cyberbullying", text: "Seninle kimse arkadaş olmak istemez, çok salaksın!", actions: ["report", "block", "notify"] }
                ]
            }
        ],
        dislanma: [
            {
                sender: "zeynep_78",
                avatar: "zeynep78",
                messages: [
                    { type: "safe", text: "Bugün ders çalışacak mısın?", response: "text" },
                    { type: "cyberbullying", text: "Seni partiye davet etmedik, kimse seni istemiyor.", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Matematik ödevini yaptın mı?", response: "text" },
                    { type: "cyberbullying", text: "Bizim gruba katılamazsın, sen uygun değilsin.", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Yarın sınıfta görüşürüz.", response: "text" }
                ]
            }
        ],
        tehdit: [
            {
                sender: "emre_56",
                avatar: "emre56",
                messages: [
                    { type: "safe", text: "Yeni oyunu denedin mi?", response: "text" },
                    { type: "safe", text: "O oyun çok eğlenceli!", response: "text" },
                    { type: "cyberbullying", text: "Eğer bunu birine söylersen seni döverim!", actions: ["report", "block", "notify"] },
                    { type: "cyberbullying", text: "Yarın para getir yoksa başın belada!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Yarın spor salonunda görüşürüz.", response: "text" }
                ]
            }
        ],
        iftira: [
            {
                sender: "ayse_91",
                avatar: "ayse91",
                messages: [
                    { type: "safe", text: "Bugün hava çok güzel değil mi?", response: "text" },
                    { type: "cyberbullying", text: "Herkes senin hırsızlık yaptığını söylüyor, doğru mu?", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Yeni dizi tavsiyesi var mı?", response: "text" },
                    { type: "safe", text: "Ben de o diziyi izliyorum!", response: "text" },
                    { type: "cyberbullying", text: "Sınıfta senin kopya çektiğini söylüyorlar, çok ayıp!", actions: ["report", "block", "notify"] }
                ]
            }
        ],
        kimlik: [
            {
                sender: "sahte_hesap_23",
                avatar: "sahte23",
                messages: [
                    { type: "safe", text: "Merhaba, tanışalım mı?", response: "text" },
                    { type: "cyberbullying", text: "Ben aslında senin arkadaşının hesabını çaldım!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Ne tür müzikler dinliyorsun?", response: "text" },
                    { type: "cyberbullying", text: "Senin şifreni biliyorum, hesabını ele geçireceğim!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "İyi günler dilerim.", response: "text" }
                ]
            }
        ]
    },
    
    // UYGULAMA
    uygulama: {
        sozel: [
            {
                sender: "mehmet_34",
                avatar: "mehmet34",
                messages: [
                    { type: "safe", text: "Bugünkü maçı izledin mi?", response: "text" },
                    { type: "cyberbullying", text: "Sen gerçekten çok çirkinsin, aynaya bakma!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Hangi takımı tutuyorsun?", response: "text" },
                    { type: "safe", text: "Ben de aynı takımı tutuyorum!", response: "text" },
                    { type: "cyberbullying", text: "Kimse senin gibi birini sevemez, berbatsın!", actions: ["report", "block", "notify"] }
                ]
            }
        ],
        dislanma: [
            {
                sender: "selin_67",
                avatar: "selin67",
                messages: [
                    { type: "safe", text: "Yarın pikniğe geliyor musun?", response: "text" },
                    { type: "safe", text: "Harika! Çok eğlenceli olacak.", response: "text" },
                    { type: "cyberbullying", text: "Aslında seni istemiyoruz, gelme daha iyi.", actions: ["report", "block", "notify"] },
                    { type: "cyberbullying", text: "Gruptan çıkardık seni, artık bizden değilsin.", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Yarın görüşmek üzere.", response: "text" }
                ]
            }
        ],
        tehdit: [
            {
                sender: "arda_89",
                avatar: "arda89",
                messages: [
                    { type: "safe", text: "Ödevini bitirdin mi?", response: "text" },
                    { type: "cyberbullying", text: "Eğer ödevini vermezsen fotoğraflarını yayarım!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Matematik zordu değil mi?", response: "text" },
                    { type: "cyberbullying", text: "Bana para ver yoksa sırlarını ifşa ederim!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Yarın kütüphanede çalışalım.", response: "text" }
                ]
            }
        ],
        iftira: [
            {
                sender: "busra_45",
                avatar: "busra45",
                messages: [
                    { type: "safe", text: "Bugün çok yorgunum.", response: "text" },
                    { type: "safe", text: "Ben de aynı şekilde.", response: "text" },
                    { type: "cyberbullying", text: "Herkes senin yalan söylediğini biliyor, utanmıyor musun?", actions: ["report", "block", "notify"] },
                    { type: "cyberbullying", text: "Senin ailenle ilgili kötü şeyler duydum, doğru mu?", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "İyi akşamlar!", response: "text" }
                ]
            }
        ],
        kimlik: [
            {
                sender: "fake_profile_67",
                avatar: "fake67",
                messages: [
                    { type: "safe", text: "Selam, yeni mi katıldın?", response: "text" },
                    { type: "cyberbullying", text: "Senin adınla sahte hesap açtım, herkese mesaj attım!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Okulda neyi seversin?", response: "text" },
                    { type: "safe", text: "Çok güzel hobiler bunlar.", response: "text" },
                    { type: "cyberbullying", text: "Senin hesabını ele geçirdim, şifreni değiştirdim!", actions: ["report", "block", "notify"] }
                ]
            }
        ]
    },
    
    // SON-TEST
    "son-test": {
        sozel: [
            {
                sender: "can_21",
                avatar: "can21",
                messages: [
                    { type: "safe", text: "Yeni filmler var mı izledin?", response: "text" },
                    { type: "safe", text: "Ben de izlemek istiyorum!", response: "text" },
                    { type: "safe", text: "Hangi tür filmleri seversin?", response: "text" },
                    { type: "cyberbullying", text: "Sen gerçekten hiçbir şey başaramazsın, yeteneksizsin!", actions: ["report", "block", "notify"] },
                    { type: "cyberbullying", text: "Herkes senden nefret ediyor, kaybol buradan!", actions: ["report", "block", "notify"] }
                ]
            }
        ],
        dislanma: [
            {
                sender: "deniz_53",
                avatar: "deniz53",
                messages: [
                    { type: "safe", text: "Bugün ne yapıyorsun?", response: "text" },
                    { type: "cyberbullying", text: "Seni doğum günü partisine çağırmadık, istemiyoruz.", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Yeni kitap aldın mı?", response: "text" },
                    { type: "cyberbullying", text: "Bizim takımda yer yok sana, başka yer bul.", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Haftaya görüşürüz.", response: "text" }
                ]
            }
        ],
        tehdit: [
            {
                sender: "berk_72",
                avatar: "berk72",
                messages: [
                    { type: "safe", text: "Bugün hava nasıl?", response: "text" },
                    { type: "cyberbullying", text: "Kimseye söyleme yoksa çok kötü olur!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Spor yapmayı sever misin?", response: "text" },
                    { type: "safe", text: "Ben de sporu çok severim.", response: "text" },
                    { type: "cyberbullying", text: "Yarın bana 50 lira getir, getirmezsen pişman olursun!", actions: ["report", "block", "notify"] }
                ]
            }
        ],
        iftira: [
            {
                sender: "elif_38",
                avatar: "elif38",
                messages: [
                    { type: "safe", text: "Yeni oyunu aldın mı?", response: "text" },
                    { type: "cyberbullying", text: "Duydum ki sen başkalarının eşyalarını çalıyormuşsun!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Hangi dersi seversin?", response: "text" },
                    { type: "cyberbullying", text: "Herkes senin not çalıp sattığını söylüyor!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Görüşmek üzere!", response: "text" }
                ]
            }
        ],
        kimlik: [
            {
                sender: "clone_account_88",
                avatar: "clone88",
                messages: [
                    { type: "safe", text: "Selam, nasılsın?", response: "text" },
                    { type: "safe", text: "Ben iyiyim teşekkürler!", response: "text" },
                    { type: "cyberbullying", text: "Senin fotoğraflarını kopyaladım, sahte hesap açtım!", actions: ["report", "block", "notify"] },
                    { type: "cyberbullying", text: "Senin bilgilerini çaldım, artık kimliğin bende!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "İyi günler.", response: "text" }
                ]
            }
        ]
    },
    
    // GENELLEME
    genelleme: {
        sozel: [
            {
                sender: "ali_99",
                avatar: "ali99",
                messages: [
                    { type: "safe", text: "Haftasonu planın var mı?", response: "text" },
                    { type: "cyberbullying", text: "Sen gerçekten çok kötü görünüyorsun, iğrençsin!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Ben sinemaya gideceğim.", response: "text" },
                    { type: "cyberbullying", text: "Hiç kimse seninle olmak istemez, tiksinç birisin!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Haftaya görüşürüz.", response: "text" }
                ]
            }
        ],
        dislanma: [
            {
                sender: "fatma_24",
                avatar: "fatma24",
                messages: [
                    { type: "safe", text: "Yeni albümü dinledin mi?", response: "text" },
                    { type: "safe", text: "Çok güzel şarkılar var!", response: "text" },
                    { type: "cyberbullying", text: "Gezi planlarına dahil değilsin, seni istemiyoruz.", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "En sevdiğin şarkı hangisi?", response: "text" },
                    { type: "cyberbullying", text: "Arkadaş grubundan çıkarıldın, artık aramıza gelme.", actions: ["report", "block", "notify"] }
                ]
            }
        ],
        tehdit: [
            {
                sender: "murat_47",
                avatar: "murat47",
                messages: [
                    { type: "safe", text: "Bugün dersler nasıldı?", response: "text" },
                    { type: "safe", text: "Bence de zordu.", response: "text" },
                    { type: "cyberbullying", text: "Eğer öğretmene söylersen seni okul çıkışı bulurum!", actions: ["report", "block", "notify"] },
                    { type: "cyberbullying", text: "Yarın 100 lira getir, getirmezsen videolarını yayarım!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Yarın görüşürüz.", response: "text" }
                ]
            }
        ],
        iftira: [
            {
                sender: "gizem_62",
                avatar: "gizem62",
                messages: [
                    { type: "safe", text: "Tatil planların nasıl?", response: "text" },
                    { type: "cyberbullying", text: "Duydum ki sen sınıfta başkalarına zarar veriyormuşsun!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Ben denize gideceğim.", response: "text" },
                    { type: "safe", text: "Çok güzel olacak!", response: "text" },
                    { type: "cyberbullying", text: "Herkes senin aileni kötülediğini söylüyor, ne kadar kötüsün!", actions: ["report", "block", "notify"] }
                ]
            }
        ],
        kimlik: [
            {
                sender: "imposter_55",
                avatar: "imposter55",
                messages: [
                    { type: "safe", text: "Merhaba, tanışabilir miyiz?", response: "text" },
                    { type: "cyberbullying", text: "Senin adına mesajlar gönderiyorum, kimse fark etmedi!", actions: ["report", "block", "notify"] },
                    { type: "safe", text: "Hobilerinden bahseder misin?", response: "text" },
                    { type: "cyberbullying", text: "Hesabını hackledim, şimdi senin yerine mesaj atıyorum!", actions: ["report", "block", "notify"] },
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
