// Yeni Senaryo Yapısı
// Her zorbalık türü için 5 farklı kişiden mesaj gelecek
// 3 mesaj siber zorbalık, 2 mesaj güvenli

const SCENARIOS = {
    // BAŞLAMA DÜZEYİ
    baslama: {
        sozel: [
            { sender: "ali.yilmaz", avatar: "aliyilmaz", messages: [
                { type: "safe", text: "Merhaba! Nasılsın bugün?", response: "text" }
            ]},
            { sender: "ayse.kara", avatar: "aysekara", messages: [
                { type: "cyberbullying", text: "Sen gerçekten çok aptalsın, hiçbir şey bilmiyorsun!", actions: ["report", "block"] }
            ]},
            { sender: "mehmet.demir", avatar: "mehmetdemir", messages: [
                { type: "safe", text: "Yarın sinemaya gidelim mi?", response: "text" }
            ]},
            { sender: "zeynep.tas", avatar: "zeyneptas", messages: [
                { type: "cyberbullying", text: "Seninle kimse arkadaş olmak istemez, çok salaksın!", actions: ["report", "block"] }
            ]},
            { sender: "can.ozturk", avatar: "canozturk", messages: [
                { type: "cyberbullying", text: "Çok çirkinsin, aynaya bakma daha iyi!", actions: ["report", "block"] }
            ]}
        ],
        dislanma: [
            { sender: "selin.yilmaz", avatar: "selinyilmaz", messages: [
                { type: "safe", text: "Bugün ders çalışacak mısın?", response: "text" }
            ]},
            { sender: "cem.aydın", avatar: "cemaydin", messages: [
                { type: "cyberbullying", text: "Seni partiye davet etmedik, kimse seni istemiyor.", actions: ["report", "block"] }
            ]},
            { sender: "gizem.kaya", avatar: "gizemkaya", messages: [
                { type: "safe", text: "Matematik ödevini yaptın mı?", response: "text" }
            ]},
            { sender: "burak.celik", avatar: "burakcelik", messages: [
                { type: "cyberbullying", text: "Bizim gruba katılamazsın, sen uygun değilsin.", actions: ["report", "block"] }
            ]},
            { sender: "elif.yildirim", avatar: "elifyildirim", messages: [
                { type: "cyberbullying", text: "Kimse seninle oturmak istemiyor, başka yere git.", actions: ["report", "block"] }
            ]}
        ],
        tehdit: [
            { sender: "ahmet.polat", avatar: "ahmetpolat", messages: [
                { type: "safe", text: "Yeni oyunu denedin mi?", response: "text" }
            ]},
            { sender: "fatma.arslan", avatar: "fatmaarslan", messages: [
                { type: "safe", text: "O oyun çok eğlenceli!", response: "text" }
            ]},
            { sender: "mustafa.guven", avatar: "mustafaguven", messages: [
                { type: "cyberbullying", text: "Eğer bunu birine söylersen seni döverim!", actions: ["report", "block"] }
            ]},
            { sender: "emine.sen", avatar: "eminesen", messages: [
                { type: "cyberbullying", text: "Yarın para getir yoksa başın belada!", actions: ["report", "block"] }
            ]},
            { sender: "hasan.kurt", avatar: "hasankurt", messages: [
                { type: "cyberbullying", text: "Fotoğraflarını yayarım, kimseye söyleme!", actions: ["report", "block"] }
            ]}
        ],
        iftira: [
            { sender: "hatice.yavuz", avatar: "haticeyavuz", messages: [
                { type: "safe", text: "Bugün hava çok güzel değil mi?", response: "text" }
            ]},
            { sender: "ibrahim.ozkan", avatar: "ibrahimozkan", messages: [
                { type: "cyberbullying", text: "Herkes senin hırsızlık yaptığını söylüyor, doğru mu?", actions: ["report", "block"] }
            ]},
            { sender: "hacer.dogan", avatar: "hacerdogan", messages: [
                { type: "safe", text: "Yeni dizi tavsiyesi var mı?", response: "text" }
            ]},
            { sender: "huseyin.sahin", avatar: "huseyinsahin", messages: [
                { type: "cyberbullying", text: "Sınıfta senin kopya çektiğini söylüyorlar, çok ayıp!", actions: ["report", "block"] }
            ]},
            { sender: "murat.aslan", avatar: "murataslan", messages: [
                { type: "cyberbullying", text: "Senin yalan söylediğini herkese anlattım!", actions: ["report", "block"] }
            ]}
        ],
        kimlik: [
            { sender: "sahte_hesap1", avatar: "sahtehesap1", messages: [
                { type: "safe", text: "Merhaba, tanışalım mı?", response: "text" }
            ]},
            { sender: "fake_profile1", avatar: "fakeprofile1", messages: [
                { type: "cyberbullying", text: "Ben aslında senin arkadaşının hesabını çaldım!", actions: ["report", "block"] }
            ]},
            { sender: "clone_user1", avatar: "cloneuser1", messages: [
                { type: "safe", text: "Ne tür müzikler dinliyorsun?", response: "text" }
            ]},
            { sender: "imposter1", avatar: "imposter1", messages: [
                { type: "cyberbullying", text: "Senin şifreni biliyorum, hesabını ele geçireceğim!", actions: ["report", "block"] }
            ]},
            { sender: "fake_account1", avatar: "fakeaccount1", messages: [
                { type: "cyberbullying", text: "Senin fotoğraflarınla sahte hesap açtım!", actions: ["report", "block"] }
            ]}
        ]
    },
    
    // UYGULAMA
    uygulama: {
        sozel: [
            { sender: "cem.yildiz", avatar: "cemyildiz", messages: [
                { type: "safe", text: "Bugünkü maçı izledin mi?", response: "text" }
            ]},
            { sender: "selin.erdem", avatar: "selinerdem", messages: [
                { type: "cyberbullying", text: "Sen gerçekten çok çirkinsin, aynaya bakma!", actions: ["report", "block"] }
            ]},
            { sender: "can.turan", avatar: "canturan", messages: [
                { type: "safe", text: "Hangi takımı tutuyorsun?", response: "text" }
            ]},
            { sender: "deniz.koç", avatar: "denizkoc", messages: [
                { type: "cyberbullying", text: "Kimse senin gibi birini sevemez, berbatsın!", actions: ["report", "block"] }
            ]},
            { sender: "berk.aydin", avatar: "berkaydin", messages: [
                { type: "cyberbullying", text: "Hiçbir şey başaramazsın, yeteneksizsin!", actions: ["report", "block"] }
            ]}
        ],
        dislanma: [
            { sender: "aleyna.yurt", avatar: "aleynayurt", messages: [
                { type: "safe", text: "Yarın pikniğe geliyor musun?", response: "text" }
            ]},
            { sender: "kaan.ozer", avatar: "kaanozer", messages: [
                { type: "safe", text: "Harika! Çok eğlenceli olacak.", response: "text" }
            ]},
            { sender: "esra.kara", avatar: "esrakara", messages: [
                { type: "cyberbullying", text: "Aslında seni istemiyoruz, gelme daha iyi.", actions: ["report", "block"] }
            ]},
            { sender: "mert.yilmaz", avatar: "mertyilmaz", messages: [
                { type: "cyberbullying", text: "Gruptan çıkardık seni, artık bizden değilsin.", actions: ["report", "block"] }
            ]},
            { sender: "pinar.demir", avatar: "pinardemir", messages: [
                { type: "cyberbullying", text: "Doğum günü partisine çağırmadık, istemiyoruz.", actions: ["report", "block"] }
            ]}
        ],
        tehdit: [
            { sender: "onur.aksoy", avatar: "onuraksoy", messages: [
                { type: "safe", text: "Ödevini bitirdin mi?", response: "text" }
            ]},
            { sender: "ceren.cetin", avatar: "cerencetin", messages: [
                { type: "cyberbullying", text: "Eğer ödevini vermezsen fotoğraflarını yayarım!", actions: ["report", "block"] }
            ]},
            { sender: "serkan.tas", avatar: "serkantas", messages: [
                { type: "safe", text: "Matematik zordu değil mi?", response: "text" }
            ]},
            { sender: "gamze.ozturk", avatar: "gamzeozturk", messages: [
                { type: "cyberbullying", text: "Bana para ver yoksa sırlarını ifşa ederim!", actions: ["report", "block"] }
            ]},
            { sender: "alper.yildirim", avatar: "alperyildirim", messages: [
                { type: "cyberbullying", text: "Kimseye söyleme yoksa çok kötü olur!", actions: ["report", "block"] }
            ]}
        ],
        iftira: [
            { sender: "irem.guven", avatar: "iremguven", messages: [
                { type: "safe", text: "Bugün çok yorgunum.", response: "text" }
            ]},
            { sender: "baris.kaya", avatar: "bariskaya", messages: [
                { type: "safe", text: "Ben de aynı şekilde.", response: "text" }
            ]},
            { sender: "aslı.celik", avatar: "aslicelik", messages: [
                { type: "cyberbullying", text: "Herkes senin yalan söylediğini biliyor, utanmıyor musun?", actions: ["report", "block"] }
            ]},
            { sender: "gorkem.arslan", avatar: "gorkemarslan", messages: [
                { type: "cyberbullying", text: "Senin ailenle ilgili kötü şeyler duydum, doğru mu?", actions: ["report", "block"] }
            ]},
            { sender: "ebru.dogan", avatar: "ebrudogan", messages: [
                { type: "cyberbullying", text: "Duydum ki sen başkalarının eşyalarını çalıyormuşsun!", actions: ["report", "block"] }
            ]}
        ],
        kimlik: [
            { sender: "sahte_hesap2", avatar: "sahtehesap2", messages: [
                { type: "safe", text: "Selam, yeni mi katıldın?", response: "text" }
            ]},
            { sender: "fake_profile2", avatar: "fakeprofile2", messages: [
                { type: "cyberbullying", text: "Senin adınla sahte hesap açtım, herkese mesaj attım!", actions: ["report", "block"] }
            ]},
            { sender: "clone_user2", avatar: "cloneuser2", messages: [
                { type: "safe", text: "Okulda neyi seversin?", response: "text" }
            ]},
            { sender: "imposter2", avatar: "imposter2", messages: [
                { type: "cyberbullying", text: "Senin hesabını ele geçirdim, şifreni değiştirdim!", actions: ["report", "block"] }
            ]},
            { sender: "fake_account2", avatar: "fakeaccount2", messages: [
                { type: "cyberbullying", text: "Senin bilgilerini çaldım, artık kimliğin bende!", actions: ["report", "block"] }
            ]}
        ]
    },
    
    // İZLEME 2. HAFTA
    "izleme-2": {
        sozel: [
            { sender: "tarik.barkan", avatar: "tarikbarkan", messages: [
                { type: "safe", text: "Yeni filmler var mı izledin?", response: "text" }
            ]},
            { sender: "seda.kale", avatar: "sedakale", messages: [
                { type: "safe", text: "Ben de izlemek istiyorum!", response: "text" }
            ]},
            { sender: "umut.tuncer", avatar: "umuttuncer", messages: [
                { type: "cyberbullying", text: "Sen gerçekten hiçbir şey başaramazsın, yeteneksizsin!", actions: ["report", "block"] }
            ]},
            { sender: "neslihan.oz", avatar: "neslihanoz", messages: [
                { type: "cyberbullying", text: "Herkes senden nefret ediyor, kaybol buradan!", actions: ["report", "block"] }
            ]},
            { sender: "kerem.akar", avatar: "keremakar", messages: [
                { type: "cyberbullying", text: "Sen gerçekten çok kötü görünüyorsun, iğrençsin!", actions: ["report", "block"] }
            ]}
        ],
        dislanma: [
            { sender: "dilek.polat", avatar: "dilekpolat", messages: [
                { type: "safe", text: "Bugün ne yapıyorsun?", response: "text" }
            ]},
            { sender: "volkan.sahin", avatar: "volkansahin", messages: [
                { type: "cyberbullying", text: "Seni doğum günü partisine çağırmadık, istemiyoruz.", actions: ["report", "block"] }
            ]},
            { sender: "sebnem.yavuz", avatar: "sebnemyavuz", messages: [
                { type: "safe", text: "Yeni kitap aldın mı?", response: "text" }
            ]},
            { sender: "engin.koç", avatar: "enginkoc", messages: [
                { type: "cyberbullying", text: "Bizim takımda yer yok sana, başka yer bul.", actions: ["report", "block"] }
            ]},
            { sender: "sevgi.aydın", avatar: "sevgiaydin", messages: [
                { type: "cyberbullying", text: "Gezi planlarına dahil değilsin, seni istemiyoruz.", actions: ["report", "block"] }
            ]}
        ],
        tehdit: [
            { sender: "orhan.celik", avatar: "orhancelik", messages: [
                { type: "safe", text: "Bugün hava nasıl?", response: "text" }
            ]},
            { sender: "nihal.demir", avatar: "nihaldemir", messages: [
                { type: "cyberbullying", text: "Kimseye söyleme yoksa çok kötü olur!", actions: ["report", "block"] }
            ]},
            { sender: "erdem.yilmaz", avatar: "erdemyilmaz", messages: [
                { type: "safe", text: "Spor yapmayı sever misin?", response: "text" }
            ]},
            { sender: "ozlem.kaya", avatar: "ozlemkaya", messages: [
                { type: "cyberbullying", text: "Yarın bana 50 lira getir, getirmezsen pişman olursun!", actions: ["report", "block"] }
            ]},
            { sender: "yusuf.ozturk", avatar: "yusufozturk", messages: [
                { type: "cyberbullying", text: "Eğer öğretmene söylersen seni okul çıkışı bulurum!", actions: ["report", "block"] }
            ]}
        ],
        iftira: [
            { sender: "filiz.tas", avatar: "filiztas", messages: [
                { type: "safe", text: "Yeni oyunu aldın mı?", response: "text" }
            ]},
            { sender: "sinan.guven", avatar: "sinanguven", messages: [
                { type: "cyberbullying", text: "Duydum ki sen başkalarının eşyalarını çalıyormuşsun!", actions: ["report", "block"] }
            ]},
            { sender: "songul.arslan", avatar: "songularslan", messages: [
                { type: "safe", text: "Hangi dersi seversin?", response: "text" }
            ]},
            { sender: "levent.dogan", avatar: "leventdogan", messages: [
                { type: "cyberbullying", text: "Herkes senin not çalıp sattığını söylüyor!", actions: ["report", "block"] }
            ]},
            { sender: "nurcan.yildirim", avatar: "nurcanyildirim", messages: [
                { type: "cyberbullying", text: "Duydum ki sen sınıfta başkalarına zarar veriyormuşsun!", actions: ["report", "block"] }
            ]}
        ],
        kimlik: [
            { sender: "sahte_hesap3", avatar: "sahtehesap3", messages: [
                { type: "safe", text: "Selam, nasılsın?", response: "text" }
            ]},
            { sender: "fake_profile3", avatar: "fakeprofile3", messages: [
                { type: "safe", text: "Ben iyiyim teşekkürler!", response: "text" }
            ]},
            { sender: "clone_user3", avatar: "cloneuser3", messages: [
                { type: "cyberbullying", text: "Senin fotoğraflarını kopyaladım, sahte hesap açtım!", actions: ["report", "block"] }
            ]},
            { sender: "imposter3", avatar: "imposter3", messages: [
                { type: "cyberbullying", text: "Senin bilgilerini çaldım, artık kimliğin bende!", actions: ["report", "block"] }
            ]},
            { sender: "fake_account3", avatar: "fakeaccount3", messages: [
                { type: "cyberbullying", text: "Senin adına mesajlar gönderiyorum, kimse fark etmedi!", actions: ["report", "block"] }
            ]}
        ]
    },
    
    // İZLEME 4. HAFTA
    "izleme-4": {
        sozel: [
            { sender: "kadir.cetin", avatar: "kadircetin", messages: [
                { type: "safe", text: "Haftasonu planın var mı?", response: "text" }
            ]},
            { sender: "canan.kara", avatar: "canankara", messages: [
                { type: "cyberbullying", text: "Sen gerçekten çok kötü görünüyorsun, iğrençsin!", actions: ["report", "block"] }
            ]},
            { sender: "serdar.polat", avatar: "serdarpolat", messages: [
                { type: "safe", text: "Ben sinemaya gideceğim.", response: "text" }
            ]},
            { sender: "belgin.sahin", avatar: "belginsahin", messages: [
                { type: "cyberbullying", text: "Hiç kimse seninle olmak istemez, tiksinç birisin!", actions: ["report", "block"] }
            ]},
            { sender: "selim.yavuz", avatar: "selimyavuz", messages: [
                { type: "cyberbullying", text: "Çok salaksın, hiçbir şey yapamazsın!", actions: ["report", "block"] }
            ]}
        ],
        dislanma: [
            { sender: "gulsum.koç", avatar: "gulsumkoc", messages: [
                { type: "safe", text: "Yeni albümü dinledin mi?", response: "text" }
            ]},
            { sender: "ercan.aydın", avatar: "ercanaydin", messages: [
                { type: "safe", text: "Çok güzel şarkılar var!", response: "text" }
            ]},
            { sender: "nurten.celik", avatar: "nurtencelik", messages: [
                { type: "cyberbullying", text: "Gezi planlarına dahil değilsin, seni istemiyoruz.", actions: ["report", "block"] }
            ]},
            { sender: "ismet.demir", avatar: "ismetdemir", messages: [
                { type: "cyberbullying", text: "Arkadaş grubundan çıkarıldın, artık aramıza gelme.", actions: ["report", "block"] }
            ]},
            { sender: "munevver.yilmaz", avatar: "munevveryilmaz", messages: [
                { type: "cyberbullying", text: "Kimse seninle vakit geçirmek istemiyor.", actions: ["report", "block"] }
            ]}
        ],
        tehdit: [
            { sender: "nejat.kaya", avatar: "nejatkaya", messages: [
                { type: "safe", text: "Bugün dersler nasıldı?", response: "text" }
            ]},
            { sender: "perihan.ozturk", avatar: "perihanozturk", messages: [
                { type: "safe", text: "Bence de zordu.", response: "text" }
            ]},
            { sender: "nuri.tas", avatar: "nuritas", messages: [
                { type: "cyberbullying", text: "Eğer öğretmene söylersen seni okul çıkışı bulurum!", actions: ["report", "block"] }
            ]},
            { sender: "saime.guven", avatar: "saimeguven", messages: [
                { type: "cyberbullying", text: "Yarın 100 lira getir, getirmezsen videolarını yayarım!", actions: ["report", "block"] }
            ]},
            { sender: "haluk.arslan", avatar: "halukarslan", messages: [
                { type: "cyberbullying", text: "Sırlarını biliyorum, kimseye söyleme yoksa ifşa ederim!", actions: ["report", "block"] }
            ]}
        ],
        iftira: [
            { sender: "nermin.dogan", avatar: "nermindogan", messages: [
                { type: "safe", text: "Tatil planların nasıl?", response: "text" }
            ]},
            { sender: "cemil.yildirim", avatar: "cemilyildirim", messages: [
                { type: "cyberbullying", text: "Duydum ki sen sınıfta başkalarına zarar veriyormuşsun!", actions: ["report", "block"] }
            ]},
            { sender: "zehra.cetin", avatar: "zehracetin", messages: [
                { type: "safe", text: "Ben denize gideceğim.", response: "text" }
            ]},
            { sender: "riza.kara", avatar: "rizakara", messages: [
                { type: "cyberbullying", text: "Herkes senin aileni kötülediğini söylüyor, ne kadar kötüsün!", actions: ["report", "block"] }
            ]},
            { sender: "fadime.polat", avatar: "fadimepolat", messages: [
                { type: "cyberbullying", text: "Senin hakkında çok kötü dedikodular var, doğru mu?", actions: ["report", "block"] }
            ]}
        ],
        kimlik: [
            { sender: "sahte_hesap4", avatar: "sahtehesap4", messages: [
                { type: "safe", text: "Merhaba, tanışabilir miyiz?", response: "text" }
            ]},
            { sender: "fake_profile4", avatar: "fakeprofile4", messages: [
                { type: "cyberbullying", text: "Senin adına mesajlar gönderiyorum, kimse fark etmedi!", actions: ["report", "block"] }
            ]},
            { sender: "clone_user4", avatar: "cloneuser4", messages: [
                { type: "safe", text: "Hobilerinden bahseder misin?", response: "text" }
            ]},
            { sender: "imposter4", avatar: "imposter4", messages: [
                { type: "cyberbullying", text: "Hesabını hackledim, şimdi senin yerine mesaj atıyorum!", actions: ["report", "block"] }
            ]},
            { sender: "fake_account4", avatar: "fakeaccount4", messages: [
                { type: "cyberbullying", text: "Senin profilini kopyaladım, sahte hesap açtım!", actions: ["report", "block"] }
            ]}
        ]
    },
    
    // İZLEME 8. HAFTA
    "izleme-8": {
        sozel: [
            { sender: "resat.sahin", avatar: "resatsahin", messages: [
                { type: "safe", text: "Bugün çok güzel hava!", response: "text" }
            ]},
            { sender: "fadime.yavuz", avatar: "fadimeyavuz", messages: [
                { type: "cyberbullying", text: "Sen gerçekten berbat birisin, kimse seni sevmiyor!", actions: ["report", "block"] }
            ]},
            { sender: "recep.koç", avatar: "recepkoc", messages: [
                { type: "safe", text: "Yeni hobin ne?", response: "text" }
            ]},
            { sender: "sabiha.aydın", avatar: "sabihaaydin", messages: [
                { type: "cyberbullying", text: "Hiçbir şeye yaramazsın, çok işe yaramazsın!", actions: ["report", "block"] }
            ]},
            { sender: "halil.celik", avatar: "halilcelik", messages: [
                { type: "cyberbullying", text: "Seni hiç kimse istemez, git buradan!", actions: ["report", "block"] }
            ]}
        ],
        dislanma: [
            { sender: "sevim.demir", avatar: "sevimdemir", messages: [
                { type: "safe", text: "Hangi dersi seversin?", response: "text" }
            ]},
            { sender: "ramazan.yilmaz", avatar: "ramazanyilmaz", messages: [
                { type: "safe", text: "Ben de o dersi seviyorum!", response: "text" }
            ]},
            { sender: "aysegul.kaya", avatar: "aysegulkaya", messages: [
                { type: "cyberbullying", text: "Partiye gelmeni istemiyoruz, sen uygun değilsin.", actions: ["report", "block"] }
            ]},
            { sender: "osman.ozturk", avatar: "osmanozturk", messages: [
                { type: "cyberbullying", text: "Bizim grupta yerin yok, başka arkadaş bul.", actions: ["report", "block"] }
            ]},
            { sender: "hanife.tas", avatar: "hanifetas", messages: [
                { type: "cyberbullying", text: "Seninle kimse arkadaş olmak istemiyor.", actions: ["report", "block"] }
            ]}
        ],
        tehdit: [
            { sender: "suleyman.guven", avatar: "suleymangu ven", messages: [
                { type: "safe", text: "Yarın okula gelecek misin?", response: "text" }
            ]},
            { sender: "zeliha.arslan", avatar: "zelihaarslan", messages: [
                { type: "cyberbullying", text: "Bana yardım etmezsen sırlarını herkese söylerim!", actions: ["report", "block"] }
            ]},
            { sender: "yasar.dogan", avatar: "yasardogan", messages: [
                { type: "safe", text: "Ders çalışmak ister misin?", response: "text" }
            ]},
            { sender: "meryem.yildirim", avatar: "meryemyildirim", messages: [
                { type: "cyberbullying", text: "Yarın para getir yoksa fotoğraflarını paylaşırım!", actions: ["report", "block"] }
            ]},
            { sender: "ismail.cetin", avatar: "ismailcetin", messages: [
                { type: "cyberbullying", text: "Susmazsan başına kötü şeyler gelir!", actions: ["report", "block"] }
            ]}
        ],
        iftira: [
            { sender: "serife.kara", avatar: "serifekara", messages: [
                { type: "safe", text: "Yeni albümü beğendin mi?", response: "text" }
            ]},
            { sender: "ahmet.polat", avatar: "ahmetpolat", messages: [
                { type: "safe", text: "Evet çok güzel!", response: "text" }
            ]},
            { sender: "fatma.sahin", avatar: "fatmasahin", messages: [
                { type: "cyberbullying", text: "Herkes senin yalan söylediğini biliyor!", actions: ["report", "block"] }
            ]},
            { sender: "mustafa.yavuz", avatar: "mustafayavuz", messages: [
                { type: "cyberbullying", text: "Duydum ki sen başkalarının eşyalarını alıyormuşsun!", actions: ["report", "block"] }
            ]},
            { sender: "emine.koç", avatar: "eminekoc", messages: [
                { type: "cyberbullying", text: "Senin hakkında çok kötü şeyler duydum, doğru mu?", actions: ["report", "block"] }
            ]}
        ],
        kimlik: [
            { sender: "sahte_hesap5", avatar: "sahtehesap5", messages: [
                { type: "safe", text: "Merhaba, nasıl gidiyor?", response: "text" }
            ]},
            { sender: "fake_profile5", avatar: "fakeprofile5", messages: [
                { type: "cyberbullying", text: "Senin hesabını çaldım, artık benim!", actions: ["report", "block"] }
            ]},
            { sender: "clone_user5", avatar: "cloneuser5", messages: [
                { type: "safe", text: "En sevdiğin renk ne?", response: "text" }
            ]},
            { sender: "imposter5", avatar: "imposter5", messages: [
                { type: "cyberbullying", text: "Senin fotoğraflarınla sahte profil oluşturdum!", actions: ["report", "block"] }
            ]},
            { sender: "fake_account5", avatar: "fakeaccount5", messages: [
                { type: "cyberbullying", text: "Senin yerine mesaj atıyorum, kimse anlamadı!", actions: ["report", "block"] }
            ]}
        ]
    }
};

// Oturum ve zorbalık türü etiketleri
const SESSION_LABELS = {
    baslama: "Başlama Düzeyi",
    uygulama: "Uygulama",
    "izleme-2": "İzleme (2. Hafta)",
    "izleme-4": "İzleme (4. Hafta)",
    "izleme-8": "İzleme (8. Hafta)"
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
