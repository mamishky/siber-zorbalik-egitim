// Yeni Senaryo Yapısı
// Her zorbalık türü için 5 farklı kişiden mesaj gelecek
// 3 mesaj siber zorbalık, 2 mesaj güvenli

const SCENARIOS = {
    // BAŞLAMA DÜZEYİ
    baslama: {
        sozel: [
            { sender: "ali.yilmaz", avatar: "aliyilmaz", messages: [
                { type: "safe", text: "Selam! Bu hafta sonu yeni Marvel filmi çıkıyor biliyorsun dimi? 🎬" },
                { type: "safe", text: "Aynen çok iyi olacak! Cumartesi saat 3'te AVM'de buluşalım mı?" },
                { type: "safe", text: "Diğerlerine de haber veriyorum, hep beraber gidelim 🍿" },
                { type: "safe", text: "Tamamdır o zaman, cumartesi görüşürüz! 👋" }
            ]},
            { sender: "ayse.kara", avatar: "aysekara", messages: [
                { type: "cyberbullying", text: "Sen gerçekten çok aptalsın, hiçbir şey bilmiyorsun!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "mehmet.demir", avatar: "mehmetdemir", messages: [
                { type: "safe", text: "Knk matematik ödevini yaptın mı? Şu 3. soruyu bi türlü çözemedim 📚" },
                { type: "safe", text: "Eyvallah! Çok sağol, sen adamsın 💪" },
                { type: "safe", text: "Yarın teneffüste bi anlatsana, hala tam anlamadım" },
                { type: "safe", text: "Hadi görüşürüz, iyi geceler! ✌️" }
            ]},
            { sender: "zeynep.tas", avatar: "zeyneptas", messages: [
                { type: "cyberbullying", text: "Seninle kimse arkadaş olmak istemez, çok salaksın!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "can.ozturk", avatar: "canozturk", messages: [
                { type: "cyberbullying", text: "Çok çirkinsin, aynaya bakma daha iyi!", actions: ["report", "block"], complaintReason: "sozel" }
            ]}
        ],
        dislanma: [
            { sender: "selin.yilmaz", avatar: "selinyilmaz", messages: [
                { type: "safe", text: "Yarın sahada maç var, gelcen mi? ⚽" },
                { type: "safe", text: "Süper! 5'e 5 oynayacağız, takımlar hazır" },
                { type: "safe", text: "Saat 4'te orada ol, geç kalma sakın!" },
                { type: "safe", text: "Görüşürüz, hazır ol! 🏃" }
            ]},
            { sender: "cem.aydın", avatar: "cemaydin", messages: [
                { type: "cyberbullying", text: "Seni partiye davet etmedik, kimse seni istemiyor.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]},
            { sender: "gizem.kaya", avatar: "gizemkaya", messages: [
                { type: "safe", text: "Cuma günü bende parti var, geliyorsun dimi? 🎂" },
                { type: "safe", text: "Harika! Saat 7'de başlıyoruz" },
                { type: "safe", text: "Pizza ve oyun olacak, çok eğleneceğiz 🎮" },
                { type: "safe", text: "Görüşürüz, heyecanla bekliyorum! 🎈" }
            ]},
            { sender: "burak.celik", avatar: "burakcelik", messages: [
                { type: "cyberbullying", text: "Bizim gruba katılamazsın, sen uygun değilsin.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]},
            { sender: "elif.yildirim", avatar: "elifyildirim", messages: [
                { type: "cyberbullying", text: "Kimse seninle oturmak istemiyor, başka yere git.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]}
        ],
        tehdit: [
            { sender: "ahmet.polat", avatar: "ahmetpolat", messages: [
                { type: "safe", text: "Bu akşam PS5'te FIFA oynayak mı? 🎮" },
                { type: "safe", text: "Olur be! Saat 8'de hazır ol" },
                { type: "safe", text: "Sesli konuşalım, daha eğlenceli olur 🎧" },
                { type: "safe", text: "Tamam o zaman, akşam görüşürüz! 👊" }
            ]},
            { sender: "fatma.arslan", avatar: "fatmaarslan", messages: [
                { type: "safe", text: "Bugün yeni albüm çıktı duydun mu? 🎵" },
                { type: "safe", text: "Evet çok iyi şarkılar var!" },
                { type: "safe", text: "En sevdiğim 3. şarkı oldu sanırım 🎶" },
                { type: "safe", text: "Sonra beraber dinleriz, hadi görüşürüz! ✌️" }
            ]},
            { sender: "mustafa.guven", avatar: "mustafaguven", messages: [
                { type: "cyberbullying", text: "Eğer bunu birine söylersen seni döverim!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "emine.sen", avatar: "eminesen", messages: [
                { type: "cyberbullying", text: "Yarın para getir yoksa başın belada!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "hasan.kurt", avatar: "hasankurt", messages: [
                { type: "cyberbullying", text: "Fotoğraflarını yayarım, kimseye söyleme!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]}
        ],
        iftira: [
            { sender: "hatice.yavuz", avatar: "haticeyavuz", messages: [
                { type: "safe", text: "Hoca bugün çok güzel anlattı dimi? 📖" },
                { type: "safe", text: "Evet artık daha iyi anladım konuyu" },
                { type: "safe", text: "Yarın beraber tekrar yapalım mı?" },
                { type: "safe", text: "Tamam görüşürüz, haydi iyi dersler! 📚" }
            ]},
            { sender: "ibrahim.ozkan", avatar: "ibrahimozkan", messages: [
                { type: "cyberbullying", text: "Herkes senin hırsızlık yaptığını söylüyor, doğru mu?", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "hacer.dogan", avatar: "hacerdogan", messages: [
                { type: "safe", text: "Hafta sonu pikniğe gelsene 🌳" },
                { type: "safe", text: "Harika! Pazar günü sabah 10'da" },
                { type: "safe", text: "Top ve frisbee getir, çok eğlenirüz 🏐" },
                { type: "safe", text: "Süper, pazar görüşürüz o zaman! 🙌" }
            ]},
            { sender: "huseyin.sahin", avatar: "huseyinsahin", messages: [
                { type: "cyberbullying", text: "Sınıfta senin kopya çektiğini söylüyorlar, çok ayıp!", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "murat.aslan", avatar: "murataslan", messages: [
                { type: "cyberbullying", text: "Senin yalan söylediğini herkese anlattım!", actions: ["report", "block"], complaintReason: "iftira" }
            ]}
        ],
        kimlik: [
            { sender: "sahte_hesap1", avatar: "sahtehesap1", messages: [
                { type: "safe", text: "Selam! Yeni kursa başladım, sen de gelir misin? 📝" },
                { type: "safe", text: "Güzel! Her salı ve perşembe saat 4'te" },
                { type: "safe", text: "Hem öğreniriz hem eğleniriz 😊" },
                { type: "safe", text: "Harika, salı görüşürüz o zaman! 👋" }
            ]},
            { sender: "fake_profile1", avatar: "fakeprofile1", messages: [
                { type: "cyberbullying", text: "Ben aslında senin arkadaşının hesabını çaldım!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]},
            { sender: "clone_user1", avatar: "cloneuser1", messages: [
                { type: "safe", text: "Bu hafta sonu bisiklet turuna çıkalım mı? 🚴" },
                { type: "safe", text: "Evet park etrafında güzel yol var" },
                { type: "safe", text: "Cumartesi sabah 9'da hazır ol 🌞" },
                { type: "safe", text: "Tamam, görüşürüz haftasonu! 🚴‍♂️" }
            ]},
            { sender: "imposter1", avatar: "imposter1", messages: [
                { type: "cyberbullying", text: "Senin şifreni biliyorum, hesabını ele geçireceğim!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]},
            { sender: "fake_account1", avatar: "fakeaccount1", messages: [
                { type: "cyberbullying", text: "Senin fotoğraflarınla sahte hesap açtım!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]}
        ]
    },
    
    // UYGULAMA
    uygulama: {
        sozel: [
            { sender: "cem.yildiz", avatar: "cemyildiz", messages: [
                { type: "safe", text: "Bugünkü maçı izledin mi? Çok heyecanlıydı! ⚽" },
                { type: "safe", text: "Evet son dakika golü muhteşemdi!" },
                { type: "safe", text: "Hangi takımı tutuyorsun sen?" },
                { type: "safe", text: "Güzel! Sonraki maçı beraber izleriz, görüşürüz! 👋" }
            ]},
            { sender: "selin.erdem", avatar: "selinerdem", messages: [
                { type: "cyberbullying", text: "Sen gerçekten çok çirkinsin, aynaya bakma!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "can.turan", avatar: "canturan", messages: [
                { type: "safe", text: "Yarın kütüphaneye geliyor musun? 📚" },
                { type: "safe", text: "Harika! Saat 2'de buluşalım" },
                { type: "safe", text: "Fen ödevini bitir beraber yaparız 📝" },
                { type: "safe", text: "Tamam görüşürüz, iyi akşamlar! ✨" }
            ]},
            { sender: "deniz.koç", avatar: "denizkoc", messages: [
                { type: "cyberbullying", text: "Kimse senin gibi birini sevemez, berbatsın!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "berk.aydin", avatar: "berkaydin", messages: [
                { type: "cyberbullying", text: "Hiçbir şey başaramazsın, yeteneksizsin!", actions: ["report", "block"], complaintReason: "sozel" }
            ]}
        ],
        dislanma: [
            { sender: "aleyna.yurt", avatar: "aleynayurt", messages: [
                { type: "safe", text: "Yarın pikniğe geliyor musun? 🌳" },
                { type: "safe", text: "Harika! Çok eğlenceli olacak" },
                { type: "safe", text: "Top ve frisbee getir yanına 🥏" },
                { type: "safe", text: "Süper, yarın görüşürüz! 🌞" }
            ]},
            { sender: "kaan.ozer", avatar: "kaanozer", messages: [
                { type: "safe", text: "Yeni çıkan oyunu aldın mı? 🎮" },
                { type: "safe", text: "Çok iyi oyunmuş duydum!" },
                { type: "safe", text: "Bu hafta sonu online oynayalım mı?" },
                { type: "safe", text: "Tamam Discord'dan yazsana, görüşürüz! 🎧" }
            ]},
            { sender: "esra.kara", avatar: "esrakara", messages: [
                { type: "cyberbullying", text: "Aslında seni istemiyoruz, gelme daha iyi.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]},
            { sender: "mert.yilmaz", avatar: "mertyilmaz", messages: [
                { type: "cyberbullying", text: "Gruptan çıkardık seni, artık bizden değilsin.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]},
            { sender: "pinar.demir", avatar: "pinardemir", messages: [
                { type: "cyberbullying", text: "Doğum günü partisine çağırmadık, istemiyoruz.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]}
        ],
        tehdit: [
            { sender: "onur.aksoy", avatar: "onuraksoy", messages: [
                { type: "safe", text: "Ödevini bitirdin mi? Ben de bitmek üzere 📝" },
                { type: "safe", text: "Güzel! Hangi bölüm en zor geldi sana?" },
                { type: "safe", text: "Evet o kısım gerçekten zordu" },
                { type: "safe", text: "Yarın teneffüste konuşuruz, görüşürüz! 👋" }
            ]},
            { sender: "ceren.cetin", avatar: "cerencetin", messages: [
                { type: "cyberbullying", text: "Eğer ödevini vermezsen fotoğraflarını yayarım!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "serkan.tas", avatar: "serkantas", messages: [
                { type: "safe", text: "Bugün hoca çok iyi anlattı dimi? 👨‍🏫" },
                { type: "safe", text: "Evet artık daha iyi anladım konuyu" },
                { type: "safe", text: "Yarın beraber tekrar yapalım istersen" },
                { type: "safe", text: "Tamam görüşürüz, iyi dersler! 📚" }
            ]},
            { sender: "gamze.ozturk", avatar: "gamzeozturk", messages: [
                { type: "cyberbullying", text: "Bana para ver yoksa sırlarını ifşa ederim!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "alper.yildirim", avatar: "alperyildirim", messages: [
                { type: "cyberbullying", text: "Kimseye söyleme yoksa çok kötü olur!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]}
        ],
        iftira: [
            { sender: "irem.guven", avatar: "iremguven", messages: [
                { type: "safe", text: "Bugün çok yorgunum, sen nasılsın? 😴" },
                { type: "safe", text: "Ben de öyle! Çok ders çalıştım dün" },
                { type: "safe", text: "Hafta sonu dinlenelim artık 🛌" },
                { type: "safe", text: "Evet kesinlikle! Görüşürüz, iyi dinlenmeler! 💤" }
            ]},
            { sender: "baris.kaya", avatar: "bariskaya", messages: [
                { type: "safe", text: "Yeni albümü dinledin mi? Çok güzel! 🎵" },
                { type: "safe", text: "Evet ben de çok beğendim!" },
                { type: "safe", text: "Özellikle 5. şarkı favorim oldu 🎶" },
                { type: "safe", text: "Benimki de! Sonra tekrar dinleriz, görüşürüz! 🎧" }
            ]},
            { sender: "aslı.celik", avatar: "aslicelik", messages: [
                { type: "cyberbullying", text: "Herkes senin yalan söylediğini biliyor, utanmıyor musun?", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "gorkem.arslan", avatar: "gorkemarslan", messages: [
                { type: "cyberbullying", text: "Senin ailenle ilgili kötü şeyler duydum, doğru mu?", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "ebru.dogan", avatar: "ebrudogan", messages: [
                { type: "cyberbullying", text: "Duydum ki sen başkalarının eşyalarını çalıyormuşsun!", actions: ["report", "block"], complaintReason: "iftira" }
            ]}
        ],
        kimlik: [
            { sender: "sahte_hesap2", avatar: "sahtehesap2", messages: [
                { type: "safe", text: "Selam, yeni mi katıldın okula? 🏫" },
                { type: "safe", text: "Güzel! Hoş geldin o zaman" },
                { type: "safe", text: "İhtiyacın olursa sor bana 😊" },
                { type: "safe", text: "Tamamdır, görüşürüz! 👋" }
            ]},
            { sender: "fake_profile2", avatar: "fakeprofile2", messages: [
                { type: "cyberbullying", text: "Senin adınla sahte hesap açtım, herkese mesaj attım!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]},
            { sender: "clone_user2", avatar: "cloneuser2", messages: [
                { type: "safe", text: "Okulda hangi kulübe katıldın? 🎨" },
                { type: "safe", text: "Vay be! Çok güzel" },
                { type: "safe", text: "Ben de müzik kulübündeyim 🎸" },
                { type: "safe", text: "Harika! Görüşürüz, iyi eğlenceler! 🎭" }
            ]},
            { sender: "imposter2", avatar: "imposter2", messages: [
                { type: "cyberbullying", text: "Senin hesabını ele geçirdim, şifreni değiştirdim!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]},
            { sender: "fake_account2", avatar: "fakeaccount2", messages: [
                { type: "cyberbullying", text: "Senin bilgilerini çaldım, artık kimliğin bende!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]}
        ]
    },
    
    // İZLEME 2. HAFTA
    "izleme-2": {
        sozel: [
            { sender: "tarik.barkan", avatar: "tarikbarkan", messages: [
                { type: "safe", text: "Yeni filmler var mı izledin? 🎬" },
                { type: "safe", text: "Ben de izlemek istiyorum!" },
                { type: "safe", text: "Hangi tür filmler seversin?" },
                { type: "safe", text: "Harika! Sonra beraber izleriz, görüşürüz! 🍿" }
            ]},
            { sender: "seda.kale", avatar: "sedakale", messages: [
                { type: "safe", text: "Hafta sonu ne planlıyorsun? 🌞" },
                { type: "safe", text: "Vay be! Çok güzel" },
                { type: "safe", text: "Ben de ailemle gezmeye gideceğim 🚗" },
                { type: "safe", text: "Süper! İyi eğlenceler, görüşürüz! 👋" }
            ]},
            { sender: "umut.tuncer", avatar: "umuttuncer", messages: [
                { type: "cyberbullying", text: "Sen gerçekten hiçbir şey başaramazsın, yeteneksizsin!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "neslihan.oz", avatar: "neslihanoz", messages: [
                { type: "cyberbullying", text: "Herkes senden nefret ediyor, kaybol buradan!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "kerem.akar", avatar: "keremakar", messages: [
                { type: "cyberbullying", text: "Sen gerçekten çok kötü görünüyorsun, iğrençsin!", actions: ["report", "block"], complaintReason: "sozel" }
            ]}
        ],
        dislanma: [
            { sender: "dilek.polat", avatar: "dilekpolat", messages: [
                { type: "safe", text: "Bugün ne yapıyorsun? 😊" },
                { type: "safe", text: "Güzel! Bende evde dinlenirim" },
                { type: "safe", text: "Haftaya görüşürüz" },
                { type: "safe", text: "Tamam görüşürüz, iyi hafta sonları! ✨" }
            ]},
            { sender: "volkan.sahin", avatar: "volkansahin", messages: [
                { type: "cyberbullying", text: "Seni doğum günü partisine çağırmadık, istemiyoruz.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]},
            { sender: "sebnem.yavuz", avatar: "sebnemyavuz", messages: [
                { type: "safe", text: "Yeni kitap aldın mı? 📖" },
                { type: "safe", text: "Çok güzel! Hangi kitap?" },
                { type: "safe", text: "Vay be! O kitabı ben de okumak istiyorum" },
                { type: "safe", text: "Bitince bana ver okuyayım, görüşürüz! 📚" }
            ]},
            { sender: "engin.koç", avatar: "enginkoc", messages: [
                { type: "cyberbullying", text: "Bizim takımda yer yok sana, başka yer bul.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]},
            { sender: "sevgi.aydın", avatar: "sevgiaydin", messages: [
                { type: "cyberbullying", text: "Gezi planlarına dahil değilsin, seni istemiyoruz.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]}
        ],
        tehdit: [
            { sender: "orhan.celik", avatar: "orhancelik", messages: [
                { type: "safe", text: "Bugün hava nasıl? Çok güzel görünüyor ☀️" },
                { type: "safe", text: "Evet ben de öyle düşünüyorum!" },
                { type: "safe", text: "Dışarı çıkalım mı biraz?" },
                { type: "safe", text: "Tamam görüşürüz o zaman! 🌳" }
            ]},
            { sender: "nihal.demir", avatar: "nihaldemir", messages: [
                { type: "cyberbullying", text: "Kimseye söyleme yoksa çok kötü olur!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "erdem.yilmaz", avatar: "erdemyilmaz", messages: [
                { type: "safe", text: "Spor yapmayı sever misin? 🏃" },
                { type: "safe", text: "Ben de çok severim!" },
                { type: "safe", text: "Yarın jogging yapalım mı?" },
                { type: "safe", text: "Harika! Yarın görüşürüz, hazır ol! 👟" }
            ]},
            { sender: "ozlem.kaya", avatar: "ozlemkaya", messages: [
                { type: "cyberbullying", text: "Yarın bana 50 lira getir, getirmezsen pişman olursun!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "yusuf.ozturk", avatar: "yusufozturk", messages: [
                { type: "cyberbullying", text: "Eğer öğretmene söylersen seni okul çıkışı bulurum!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]}
        ],
        iftira: [
            { sender: "filiz.tas", avatar: "filiztas", messages: [
                { type: "safe", text: "Yeni oyunu aldın mı? 🎮" },
                { type: "safe", text: "Çok iyi oyunmuş!" },
                { type: "safe", text: "Beraber online oynayalım mı?" },
                { type: "safe", text: "Tamam akşam Discord'tan yaz! 🎧" }
            ]},
            { sender: "sinan.guven", avatar: "sinanguven", messages: [
                { type: "cyberbullying", text: "Duydum ki sen başkalarının eşyalarını çalıyormuşsun!", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "songul.arslan", avatar: "songularslan", messages: [
                { type: "safe", text: "Hangi dersi seversin en çok? 📝" },
                { type: "safe", text: "Ben de o dersi severim!" },
                { type: "safe", text: "Yarın beraber ders çalışalım mı?" },
                { type: "safe", text: "Tamam görüşürüz, iyi dersler! 📚" }
            ]},
            { sender: "levent.dogan", avatar: "leventdogan", messages: [
                { type: "cyberbullying", text: "Herkes senin not çalıp sattığını söylüyor!", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "nurcan.yildirim", avatar: "nurcanyildirim", messages: [
                { type: "cyberbullying", text: "Duydum ki sen sınıfta başkalarına zarar veriyormuşsun!", actions: ["report", "block"], complaintReason: "iftira" }
            ]}
        ],
        kimlik: [
            { sender: "sahte_hesap3", avatar: "sahtehesap3", messages: [
                { type: "safe", text: "Selam, nasılsın bugün? 😊" },
                { type: "safe", text: "İyiyim teşekkürler!" },
                { type: "safe", text: "Sen ne yapıyorsun?" },
                { type: "safe", text: "Güzel! Görüşürüz, iyi günler! 👋" }
            ]},
            { sender: "fake_profile3", avatar: "fakeprofile3", messages: [
                { type: "safe", text: "Yeni dizi önerin var mı? 📺" },
                { type: "safe", text: "Evet var çok güzel!" },
                { type: "safe", text: "Hangi tür diziler seversin?" },
                { type: "safe", text: "Anladım, sonra konuşuruz görüşürüz! 🎬" }
            ]},
            { sender: "clone_user3", avatar: "cloneuser3", messages: [
                { type: "cyberbullying", text: "Senin fotoğraflarını kopyaladım, sahte hesap açtım!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]},
            { sender: "imposter3", avatar: "imposter3", messages: [
                { type: "cyberbullying", text: "Senin bilgilerini çaldım, artık kimliğin bende!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]},
            { sender: "fake_account3", avatar: "fakeaccount3", messages: [
                { type: "cyberbullying", text: "Senin adına mesajlar gönderiyorum, kimse fark etmedi!", actions: ["report", "block"], complaintReason: "kimlik" }
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
                { type: "cyberbullying", text: "Sen gerçekten çok kötü görünüyorsun, iğrençsin!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "serdar.polat", avatar: "serdarpolat", messages: [
                { type: "safe", text: "Ben sinemaya gideceğim.", response: "text" }
            ]},
            { sender: "belgin.sahin", avatar: "belginsahin", messages: [
                { type: "cyberbullying", text: "Hiç kimse seninle olmak istemez, tiksinç birisin!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "selim.yavuz", avatar: "selimyavuz", messages: [
                { type: "cyberbullying", text: "Çok salaksın, hiçbir şey yapamazsın!", actions: ["report", "block"], complaintReason: "sozel" }
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
                { type: "cyberbullying", text: "Gezi planlarına dahil değilsin, seni istemiyoruz.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]},
            { sender: "ismet.demir", avatar: "ismetdemir", messages: [
                { type: "cyberbullying", text: "Arkadaş grubundan çıkarıldın, artık aramıza gelme.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]},
            { sender: "munevver.yilmaz", avatar: "munevveryilmaz", messages: [
                { type: "cyberbullying", text: "Kimse seninle vakit geçirmek istemiyor.", actions: ["report", "block"], complaintReason: "dislanma" }
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
                { type: "cyberbullying", text: "Eğer öğretmene söylersen seni okul çıkışı bulurum!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "saime.guven", avatar: "saimeguven", messages: [
                { type: "cyberbullying", text: "Yarın 100 lira getir, getirmezsen videolarını yayarım!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "haluk.arslan", avatar: "halukarslan", messages: [
                { type: "cyberbullying", text: "Sırlarını biliyorum, kimseye söyleme yoksa ifşa ederim!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]}
        ],
        iftira: [
            { sender: "nermin.dogan", avatar: "nermindogan", messages: [
                { type: "safe", text: "Tatil planların nasıl?", response: "text" }
            ]},
            { sender: "cemil.yildirim", avatar: "cemilyildirim", messages: [
                { type: "cyberbullying", text: "Duydum ki sen sınıfta başkalarına zarar veriyormuşsun!", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "zehra.cetin", avatar: "zehracetin", messages: [
                { type: "safe", text: "Ben denize gideceğim.", response: "text" }
            ]},
            { sender: "riza.kara", avatar: "rizakara", messages: [
                { type: "cyberbullying", text: "Herkes senin aileni kötülediğini söylüyor, ne kadar kötüsün!", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "fadime.polat", avatar: "fadimepolat", messages: [
                { type: "cyberbullying", text: "Senin hakkında çok kötü dedikodular var, doğru mu?", actions: ["report", "block"], complaintReason: "iftira" }
            ]}
        ],
        kimlik: [
            { sender: "sahte_hesap4", avatar: "sahtehesap4", messages: [
                { type: "safe", text: "Merhaba, tanışabilir miyiz?", response: "text" }
            ]},
            { sender: "fake_profile4", avatar: "fakeprofile4", messages: [
                { type: "cyberbullying", text: "Senin adına mesajlar gönderiyorum, kimse fark etmedi!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]},
            { sender: "clone_user4", avatar: "cloneuser4", messages: [
                { type: "safe", text: "Hobilerinden bahseder misin?", response: "text" }
            ]},
            { sender: "imposter4", avatar: "imposter4", messages: [
                { type: "cyberbullying", text: "Hesabını hackledim, şimdi senin yerine mesaj atıyorum!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]},
            { sender: "fake_account4", avatar: "fakeaccount4", messages: [
                { type: "cyberbullying", text: "Senin profilini kopyaladım, sahte hesap açtım!", actions: ["report", "block"], complaintReason: "kimlik" }
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
                { type: "cyberbullying", text: "Sen gerçekten berbat birisin, kimse seni sevmiyor!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "recep.koç", avatar: "recepkoc", messages: [
                { type: "safe", text: "Yeni hobin ne?", response: "text" }
            ]},
            { sender: "sabiha.aydın", avatar: "sabihaaydin", messages: [
                { type: "cyberbullying", text: "Hiçbir şeye yaramazsın, çok işe yaramazsın!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "halil.celik", avatar: "halilcelik", messages: [
                { type: "cyberbullying", text: "Seni hiç kimse istemez, git buradan!", actions: ["report", "block"], complaintReason: "sozel" }
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
                { type: "cyberbullying", text: "Partiye gelmeni istemiyoruz, sen uygun değilsin.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]},
            { sender: "osman.ozturk", avatar: "osmanozturk", messages: [
                { type: "cyberbullying", text: "Bizim grupta yerin yok, başka arkadaş bul.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]},
            { sender: "hanife.tas", avatar: "hanifetas", messages: [
                { type: "cyberbullying", text: "Seninle kimse arkadaş olmak istemiyor.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]}
        ],
        tehdit: [
            { sender: "suleyman.guven", avatar: "suleymangu ven", messages: [
                { type: "safe", text: "Yarın okula gelecek misin?", response: "text" }
            ]},
            { sender: "zeliha.arslan", avatar: "zelihaarslan", messages: [
                { type: "cyberbullying", text: "Bana yardım etmezsen sırlarını herkese söylerim!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "yasar.dogan", avatar: "yasardogan", messages: [
                { type: "safe", text: "Ders çalışmak ister misin?", response: "text" }
            ]},
            { sender: "meryem.yildirim", avatar: "meryemyildirim", messages: [
                { type: "cyberbullying", text: "Yarın para getir yoksa fotoğraflarını paylaşırım!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "ismail.cetin", avatar: "ismailcetin", messages: [
                { type: "cyberbullying", text: "Susmazsan başına kötü şeyler gelir!", actions: ["report", "block"], complaintReason: "tehdit" }
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
                { type: "cyberbullying", text: "Herkes senin yalan söylediğini biliyor!", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "mustafa.yavuz", avatar: "mustafayavuz", messages: [
                { type: "cyberbullying", text: "Duydum ki sen başkalarının eşyalarını alıyormuşsun!", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "emine.koç", avatar: "eminekoc", messages: [
                { type: "cyberbullying", text: "Senin hakkında çok kötü şeyler duydum, doğru mu?", actions: ["report", "block"], complaintReason: "iftira" }
            ]}
        ],
        kimlik: [
            { sender: "sahte_hesap5", avatar: "sahtehesap5", messages: [
                { type: "safe", text: "Merhaba, nasıl gidiyor?", response: "text" }
            ]},
            { sender: "fake_profile5", avatar: "fakeprofile5", messages: [
                { type: "cyberbullying", text: "Senin hesabını çaldım, artık benim!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]},
            { sender: "clone_user5", avatar: "cloneuser5", messages: [
                { type: "safe", text: "En sevdiğin renk ne?", response: "text" }
            ]},
            { sender: "imposter5", avatar: "imposter5", messages: [
                { type: "cyberbullying", text: "Senin fotoğraflarınla sahte profil oluşturdum!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]},
            { sender: "fake_account5", avatar: "fakeaccount5", messages: [
                { type: "cyberbullying", text: "Senin yerine mesaj atıyorum, kimse anlamadı!", actions: ["report", "block"], complaintReason: "kimlik" }
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

// Kapanış mesajları (güvenli mesajlar için rastgele seçilecek)
const CLOSING_MESSAGES = [
    "Tamam anlaştık! Görüşürüz 👋",
    "Harika! Sonra konuşuruz 😊",
    "Süper! Görüşmek üzere ✌️",
    "Oldu! Sonra yazışırız 🙌",
    "Tamamdır! Hoşça kal 👋"
];

// Şikayet nedenleri
const COMPLAINT_REASONS = [
    { id: 'sozel', label: 'Sözel/Psikolojik Saldırı' },
    { id: 'dislanma', label: 'Sosyal Dışlanma' },
    { id: 'tehdit', label: 'Tehdit ve Şantaj' },
    { id: 'iftira', label: 'Yanlış Bilgi/İftira/Dedikodu' },
    { id: 'kimlik', label: 'Kimlik Taklidi/Sahte Hesap' }
];
