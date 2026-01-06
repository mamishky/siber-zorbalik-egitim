// Yeni Senaryo Yapısı
// Her zorbalık türü için 5 farklı kişiden mesaj gelecek
// 3 mesaj siber zorbalık, 2 mesaj güvenli
// Güvenli mesajlar artık SIRAYLA mesajlaşma formatında (conversation)

const SCENARIOS = {
    // BAŞLAMA DÜZEYİ
    baslama: {
        sozel: [
            { sender: "ali.yilmaz", avatar: "aliyilmaz", conversation: [
                { incoming: "Selam! Bu hafta sonu yeni Marvel filmi çıkıyor biliyorsun dimi? 🎬", waitForReply: true },
                { incoming: "Aynen çok iyi olacak! Cumartesi saat 3'te AVM'de buluşalım mı?", waitForReply: true },
                { incoming: "Diğerlerine de haber veriyorum, hep beraber gidelim 🍿", waitForReply: false },
                { incoming: "Tamamdır o zaman, cumartesi görüşürüz! 👋", waitForReply: false, endsConversation: true }
            ]},
            { sender: "ayse.kara", avatar: "aysekara", messages: [
                { type: "cyberbullying", text: "Sen gerçekten çok aptalsın, hiçbir şey bilmiyorsun!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "mehmet.demir", avatar: "mehmetdemir", conversation: [
                { incoming: "Knk matematik ödevini yaptın mı? Şu 3. soruyu bi türlü çözemedim 📚", waitForReply: true },
                { incoming: "Eyvallah! Çok sağol, sen adamsın 💪", waitForReply: true },
                { incoming: "Yarın teneffüste bi anlatsana, hala tam anlamadım", waitForReply: false },
                { incoming: "Hadi görüşürüz, iyi geceler! ✌️", waitForReply: false, endsConversation: true }
            ]},
            { sender: "zeynep.tas", avatar: "zeyneptas", messages: [
                { type: "cyberbullying", text: "Seninle kimse arkadaş olmak istemez, çok salaksın!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "can.ozturk", avatar: "canozturk", messages: [
                { type: "cyberbullying", text: "Çok çirkinsin, aynaya bakma daha iyi!", actions: ["report", "block"], complaintReason: "sozel" }
            ]}
        ],
        dislanma: [
            { sender: "selin.yilmaz", avatar: "selinyilmaz", conversation: [
                { incoming: "Yarın sahada maç var, gelcen mi? ⚽", waitForReply: true },
                { incoming: "Süper! 5'e 5 oynayacağız, takımlar hazır", waitForReply: true },
                { incoming: "Saat 4'te orada ol, geç kalma sakın!", waitForReply: false },
                { incoming: "Görüşürüz, hazır ol! 🏃", waitForReply: false, endsConversation: true }
            ]},
            { sender: "cem.aydın", avatar: "cemaydin", messages: [
                { type: "cyberbullying", text: "Seni partiye davet etmedik, kimse seni istemiyor.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]},
            { sender: "gizem.kaya", avatar: "gizemkaya", conversation: [
                { incoming: "Cuma günü bende parti var, geliyorsun dimi? 🎂", waitForReply: true },
                { incoming: "Harika! Saat 7'de başlıyoruz", waitForReply: true },
                { incoming: "Pizza ve oyun olacak, çok eğleneceğiz 🎮", waitForReply: false },
                { incoming: "Görüşürüz, heyecanla bekliyorum! 🎈", waitForReply: false, endsConversation: true }
            ]},
            { sender: "burak.celik", avatar: "burakcelik", messages: [
                { type: "cyberbullying", text: "Bizim gruba katılamazsın, sen uygun değilsin.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]},
            { sender: "elif.yildirim", avatar: "elifyildirim", messages: [
                { type: "cyberbullying", text: "Kimse seninle oturmak istemiyor, başka yere git.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]}
        ],
        tehdit: [
            { sender: "ahmet.polat", avatar: "ahmetpolat", conversation: [
                { incoming: "Bu akşam PS5'te FIFA oynayak mı? 🎮", waitForReply: true },
                { incoming: "Olur be! Saat 8'de hazır ol", waitForReply: true },
                { incoming: "Sesli konuşalım, daha eğlenceli olur 🎧", waitForReply: false },
                { incoming: "Tamam o zaman, akşam görüşürüz! 👊", waitForReply: false, endsConversation: true }
            ]},
            { sender: "fatma.arslan", avatar: "fatmaarslan", conversation: [
                { incoming: "Bugün yeni albüm çıktı duydun mu? 🎵", waitForReply: true },
                { incoming: "Evet çok iyi şarkılar var!", waitForReply: true },
                { incoming: "En sevdiğim 3. şarkı oldu sanırım 🎶", waitForReply: false },
                { incoming: "Sonra beraber dinleriz, hadi görüşürüz! ✌️", waitForReply: false, endsConversation: true }
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
            { sender: "hatice.yavuz", avatar: "haticeyavuz", conversation: [
                { incoming: "Hoca bugün çok güzel anlattı dimi? 📖", waitForReply: true },
                { incoming: "Evet artık daha iyi anladım konuyu", waitForReply: true },
                { incoming: "Yarın beraber tekrar yapalım mı?", waitForReply: false },
                { incoming: "Tamam görüşürüz, haydi iyi dersler! 📚", waitForReply: false, endsConversation: true }
            ]},
            { sender: "ibrahim.ozkan", avatar: "ibrahimozkan", messages: [
                { type: "cyberbullying", text: "Herkes senin hırsızlık yaptığını söylüyor, doğru mu?", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "hacer.dogan", avatar: "hacerdogan", conversation: [
                { incoming: "Hafta sonu pikniğe gelsene 🌳", waitForReply: true },
                { incoming: "Harika! Pazar günü sabah 10'da", waitForReply: true },
                { incoming: "Top ve frisbee getir, çok eğlenirüz 🏐", waitForReply: false },
                { incoming: "Süper, pazar görüşürüz o zaman! 🙌", waitForReply: false, endsConversation: true }
            ]},
            { sender: "huseyin.sahin", avatar: "huseyinsahin", messages: [
                { type: "cyberbullying", text: "Sınıfta senin kopya çektiğini söylüyorlar, çok ayıp!", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "murat.aslan", avatar: "murataslan", messages: [
                { type: "cyberbullying", text: "Senin yalan söylediğini herkese anlattım!", actions: ["report", "block"], complaintReason: "iftira" }
            ]}
        ],
        kimlik: [
            { sender: "sahte_hesap1", avatar: "sahtehesap1", conversation: [
                { incoming: "Selam! Yeni kursa başladım, sen de gelir misin? 📝", waitForReply: true },
                { incoming: "Güzel! Her salı ve perşembe saat 4'te", waitForReply: true },
                { incoming: "Hem öğreniriz hem eğleniriz 😊", waitForReply: false },
                { incoming: "Harika, salı görüşürüz o zaman! 👋", waitForReply: false, endsConversation: true }
            ]},
            { sender: "fake_profile1", avatar: "fakeprofile1", messages: [
                { type: "cyberbullying", text: "Ben aslında senin arkadaşının hesabını çaldım!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]},
            { sender: "clone_user1", avatar: "cloneuser1", conversation: [
                { incoming: "Bu hafta sonu bisiklet turuna çıkalım mı? 🚴", waitForReply: true },
                { incoming: "Evet park etrafında güzel yol var", waitForReply: true },
                { incoming: "Cumartesi sabah 9'da hazır ol 🌞", waitForReply: false },
                { incoming: "Tamam, görüşürüz haftasonu! 🚴‍♂️", waitForReply: false, endsConversation: true }
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
            { sender: "cem.yildiz", avatar: "cemyildiz", conversation: [
                { incoming: "Bugünkü maçı izledin mi? Çok heyecanlıydı! ⚽", waitForReply: true },
                { incoming: "Evet son dakika golü muhteşemdi!", waitForReply: true },
                { incoming: "Hangi takımı tutuyorsun sen?", waitForReply: false },
                { incoming: "Güzel! Sonraki maçı beraber izleriz, görüşürüz! 👋", waitForReply: false, endsConversation: true }
            ]},
            { sender: "selin.erdem", avatar: "selinerdem", messages: [
                { type: "cyberbullying", text: "Sen gerçekten çok çirkinsin, aynaya bakma!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "can.turan", avatar: "canturan", conversation: [
                { incoming: "Yarın kütüphaneye geliyor musun? 📚", waitForReply: true },
                { incoming: "Harika! Saat 2'de buluşalım", waitForReply: true },
                { incoming: "Fen ödevini bitir beraber yaparız 📝", waitForReply: false },
                { incoming: "Tamam görüşürüz, iyi akşamlar! ✨", waitForReply: false, endsConversation: true }
            ]},
            { sender: "deniz.koç", avatar: "denizkoc", messages: [
                { type: "cyberbullying", text: "Kimse senin gibi birini sevemez, berbatsın!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "berk.aydin", avatar: "berkaydin", messages: [
                { type: "cyberbullying", text: "Hiçbir şey başaramazsın, yeteneksizsin!", actions: ["report", "block"], complaintReason: "sozel" }
            ]}
        ],
        dislanma: [
            { sender: "aleyna.yurt", avatar: "aleynayurt", conversation: [
                { incoming: "Yarın pikniğe geliyor musun? 🌳", waitForReply: true },
                { incoming: "Harika! Çok eğlenceli olacak", waitForReply: true },
                { incoming: "Top ve frisbee getir yanına 🥏", waitForReply: false },
                { incoming: "Süper, yarın görüşürüz! 🌞", waitForReply: false, endsConversation: true }
            ]},
            { sender: "kaan.ozer", avatar: "kaanozer", conversation: [
                { incoming: "Yeni çıkan oyunu aldın mı? 🎮", waitForReply: true },
                { incoming: "Çok iyi oyunmuş duydum!", waitForReply: true },
                { incoming: "Bu hafta sonu online oynayalım mı?", waitForReply: false },
                { incoming: "Tamam Discord'dan yazsana, görüşürüz! 🎧", waitForReply: false, endsConversation: true }
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
            { sender: "onur.aksoy", avatar: "onuraksoy", conversation: [
                { incoming: "Ödevini bitirdin mi? Ben de bitmek üzere 📝", waitForReply: true },
                { incoming: "Güzel! Hangi bölüm en zor geldi sana?", waitForReply: true },
                { incoming: "Evet o kısım gerçekten zordu", waitForReply: false },
                { incoming: "Yarın teneffüste konuşuruz, görüşürüz! 👋", waitForReply: false, endsConversation: true }
            ]},
            { sender: "ceren.cetin", avatar: "cerencetin", messages: [
                { type: "cyberbullying", text: "Eğer ödevini vermezsen fotoğraflarını yayarım!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "serkan.tas", avatar: "serkantas", conversation: [
                { incoming: "Bugün hoca çok iyi anlattı dimi? 👨‍🏫", waitForReply: true },
                { incoming: "Evet artık daha iyi anladım konuyu", waitForReply: true },
                { incoming: "Yarın beraber tekrar yapalım istersen", waitForReply: false },
                { incoming: "Tamam görüşürüz, iyi dersler! 📚", waitForReply: false, endsConversation: true }
            ]},
            { sender: "gamze.ozturk", avatar: "gamzeozturk", messages: [
                { type: "cyberbullying", text: "Bana para ver yoksa sırlarını ifşa ederim!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "alper.yildirim", avatar: "alperyildirim", messages: [
                { type: "cyberbullying", text: "Kimseye söyleme yoksa çok kötü olur!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]}
        ],
        iftira: [
            { sender: "irem.guven", avatar: "iremguven", conversation: [
                { incoming: "Bugün çok yorgunum, sen nasılsın? 😴", waitForReply: true },
                { incoming: "Ben de öyle! Çok ders çalıştım dün", waitForReply: true },
                { incoming: "Hafta sonu dinlenelim artık 🛌", waitForReply: false },
                { incoming: "Evet kesinlikle! Görüşürüz, iyi dinlenmeler! 💤", waitForReply: false, endsConversation: true }
            ]},
            { sender: "baris.kaya", avatar: "bariskaya", conversation: [
                { incoming: "Yeni albümü dinledin mi? Çok güzel! 🎵", waitForReply: true },
                { incoming: "Evet ben de çok beğendim!", waitForReply: true },
                { incoming: "Özellikle 5. şarkı favorim oldu 🎶", waitForReply: false },
                { incoming: "Benimki de! Sonra tekrar dinleriz, görüşürüz! 🎧", waitForReply: false, endsConversation: true }
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
            { sender: "sahte_hesap2", avatar: "sahtehesap2", conversation: [
                { incoming: "Selam, yeni mi katıldın okula? 🏫", waitForReply: true },
                { incoming: "Güzel! Hoş geldin o zaman", waitForReply: true },
                { incoming: "İhtiyacın olursa sor bana 😊", waitForReply: false },
                { incoming: "Tamamdır, görüşürüz! 👋", waitForReply: false, endsConversation: true }
            ]},
            { sender: "fake_profile2", avatar: "fakeprofile2", messages: [
                { type: "cyberbullying", text: "Senin adınla sahte hesap açtım, herkese mesaj attım!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]},
            { sender: "clone_user2", avatar: "cloneuser2", conversation: [
                { incoming: "Okulda hangi kulübe katıldın? 🎨", waitForReply: true },
                { incoming: "Vay be! Çok güzel", waitForReply: true },
                { incoming: "Ben de müzik kulübündeyim 🎸", waitForReply: false },
                { incoming: "Harika! Görüşürüz, iyi eğlenceler! 🎭", waitForReply: false, endsConversation: true }
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
            { sender: "tarik.barkan", avatar: "tarikbarkan", conversation: [
                { incoming: "Yeni filmler var mı izledin? 🎬", waitForReply: true },
                { incoming: "Ben de izlemek istiyorum!", waitForReply: true },
                { incoming: "Hangi tür filmler seversin?", waitForReply: false },
                { incoming: "Harika! Sonra beraber izleriz, görüşürüz! 🍿", waitForReply: false, endsConversation: true }
            ]},
            { sender: "seda.kale", avatar: "sedakale", conversation: [
                { incoming: "Hafta sonu ne planlıyorsun? 🌞", waitForReply: true },
                { incoming: "Vay be! Çok güzel", waitForReply: true },
                { incoming: "Ben de ailemle gezmeye gideceğim 🚗", waitForReply: false },
                { incoming: "Süper! İyi eğlenceler, görüşürüz! 👋", waitForReply: false, endsConversation: true }
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
            { sender: "dilek.polat", avatar: "dilekpolat", conversation: [
                { incoming: "Bugün ne yapıyorsun? 😊", waitForReply: true },
                { incoming: "Güzel! Bende evde dinlenirim", waitForReply: true },
                { incoming: "Haftaya görüşürüz", waitForReply: false },
                { incoming: "Tamam görüşürüz, iyi hafta sonları! ✨", waitForReply: false, endsConversation: true }
            ]},
            { sender: "volkan.sahin", avatar: "volkansahin", messages: [
                { type: "cyberbullying", text: "Seni doğum günü partisine çağırmadık, istemiyoruz.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]},
            { sender: "sebnem.yavuz", avatar: "sebnemyavuz", conversation: [
                { incoming: "Yeni kitap aldın mı? 📖", waitForReply: true },
                { incoming: "Çok güzel! Hangi kitap?", waitForReply: true },
                { incoming: "Vay be! O kitabı ben de okumak istiyorum", waitForReply: false },
                { incoming: "Bitince bana ver okuyayım, görüşürüz! 📚", waitForReply: false, endsConversation: true }
            ]},
            { sender: "engin.koç", avatar: "enginkoc", messages: [
                { type: "cyberbullying", text: "Bizim takımda yer yok sana, başka yer bul.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]},
            { sender: "sevgi.aydın", avatar: "sevgiaydin", messages: [
                { type: "cyberbullying", text: "Gezi planlarına dahil değilsin, seni istemiyoruz.", actions: ["report", "block"], complaintReason: "dislanma" }
            ]}
        ],
        tehdit: [
            { sender: "orhan.celik", avatar: "orhancelik", conversation: [
                { incoming: "Bugün hava nasıl? Çok güzel görünüyor ☀️", waitForReply: true },
                { incoming: "Evet ben de öyle düşünüyorum!", waitForReply: true },
                { incoming: "Dışarı çıkalım mı biraz?", waitForReply: false },
                { incoming: "Tamam görüşürüz o zaman! 🌳", waitForReply: false, endsConversation: true }
            ]},
            { sender: "nihal.demir", avatar: "nihaldemir", messages: [
                { type: "cyberbullying", text: "Kimseye söyleme yoksa çok kötü olur!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "erdem.yilmaz", avatar: "erdemyilmaz", conversation: [
                { incoming: "Spor yapmayı sever misin? 🏃", waitForReply: true },
                { incoming: "Ben de çok severim!", waitForReply: true },
                { incoming: "Yarın jogging yapalım mı?", waitForReply: false },
                { incoming: "Harika! Yarın görüşürüz, hazır ol! 👟", waitForReply: false, endsConversation: true }
            ]},
            { sender: "ozlem.kaya", avatar: "ozlemkaya", messages: [
                { type: "cyberbullying", text: "Yarın bana 50 lira getir, getirmezsen pişman olursun!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "yusuf.ozturk", avatar: "yusufozturk", messages: [
                { type: "cyberbullying", text: "Eğer öğretmene söylersen seni okul çıkışı bulurum!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]}
        ],
        iftira: [
            { sender: "filiz.tas", avatar: "filiztas", conversation: [
                { incoming: "Yeni oyunu aldın mı? 🎮", waitForReply: true },
                { incoming: "Çok iyi oyunmuş!", waitForReply: true },
                { incoming: "Beraber online oynayalım mı?", waitForReply: false },
                { incoming: "Tamam akşam Discord'tan yaz! 🎧", waitForReply: false, endsConversation: true }
            ]},
            { sender: "sinan.guven", avatar: "sinanguven", messages: [
                { type: "cyberbullying", text: "Duydum ki sen başkalarının eşyalarını çalıyormuşsun!", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "songul.arslan", avatar: "songularslan", conversation: [
                { incoming: "Hangi dersi seversin en çok? 📝", waitForReply: true },
                { incoming: "Ben de o dersi severim!", waitForReply: true },
                { incoming: "Yarın beraber ders çalışalım mı?", waitForReply: false },
                { incoming: "Tamam görüşürüz, iyi dersler! 📚", waitForReply: false, endsConversation: true }
            ]},
            { sender: "levent.dogan", avatar: "leventdogan", messages: [
                { type: "cyberbullying", text: "Herkes senin not çalıp sattığını söylüyor!", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "nurcan.yildirim", avatar: "nurcanyildirim", messages: [
                { type: "cyberbullying", text: "Duydum ki sen sınıfta başkalarına zarar veriyormuşsun!", actions: ["report", "block"], complaintReason: "iftira" }
            ]}
        ],
        kimlik: [
            { sender: "sahte_hesap3", avatar: "sahtehesap3", conversation: [
                { incoming: "Selam, nasılsın bugün? 😊", waitForReply: true },
                { incoming: "İyiyim teşekkürler!", waitForReply: true },
                { incoming: "Sen ne yapıyorsun?", waitForReply: false },
                { incoming: "Güzel! Görüşürüz, iyi günler! 👋", waitForReply: false, endsConversation: true }
            ]},
            { sender: "fake_profile3", avatar: "fakeprofile3", conversation: [
                { incoming: "Yeni dizi önerin var mı? 📺", waitForReply: true },
                { incoming: "Evet var çok güzel!", waitForReply: true },
                { incoming: "Hangi tür diziler seversin?", waitForReply: false },
                { incoming: "Anladım, sonra konuşuruz görüşürüz! 🎬", waitForReply: false, endsConversation: true }
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
            { sender: "kadir.cetin", avatar: "kadircetin", conversation: [
                { incoming: "Haftasonu planın var mı?", waitForReply: true, endsConversation: true }
            ]},
            { sender: "canan.kara", avatar: "canankara", messages: [
                { type: "cyberbullying", text: "Sen gerçekten çok kötü görünüyorsun, iğrençsin!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "serdar.polat", avatar: "serdarpolat", conversation: [
                { incoming: "Ben sinemaya gideceğim.", waitForReply: true, endsConversation: true }
            ]},
            { sender: "belgin.sahin", avatar: "belginsahin", messages: [
                { type: "cyberbullying", text: "Hiç kimse seninle olmak istemez, tiksinç birisin!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "selim.yavuz", avatar: "selimyavuz", messages: [
                { type: "cyberbullying", text: "Çok salaksın, hiçbir şey yapamazsın!", actions: ["report", "block"], complaintReason: "sozel" }
            ]}
        ],
        dislanma: [
            { sender: "gulsum.koç", avatar: "gulsumkoc", conversation: [
                { incoming: "Yeni albümü dinledin mi?", waitForReply: true, endsConversation: true }
            ]},
            { sender: "ercan.aydın", avatar: "ercanaydin", conversation: [
                { incoming: "Çok güzel şarkılar var!", waitForReply: true, endsConversation: true }
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
            { sender: "nejat.kaya", avatar: "nejatkaya", conversation: [
                { incoming: "Bugün dersler nasıldı?", waitForReply: true, endsConversation: true }
            ]},
            { sender: "perihan.ozturk", avatar: "perihanozturk", conversation: [
                { incoming: "Bence de zordu.", waitForReply: true, endsConversation: true }
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
            { sender: "nermin.dogan", avatar: "nermindogan", conversation: [
                { incoming: "Tatil planların nasıl?", waitForReply: true, endsConversation: true }
            ]},
            { sender: "cemil.yildirim", avatar: "cemilyildirim", messages: [
                { type: "cyberbullying", text: "Duydum ki sen sınıfta başkalarına zarar veriyormuşsun!", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "zehra.cetin", avatar: "zehracetin", conversation: [
                { incoming: "Ben denize gideceğim.", waitForReply: true, endsConversation: true }
            ]},
            { sender: "riza.kara", avatar: "rizakara", messages: [
                { type: "cyberbullying", text: "Herkes senin aileni kötülediğini söylüyor, ne kadar kötüsün!", actions: ["report", "block"], complaintReason: "iftira" }
            ]},
            { sender: "fadime.polat", avatar: "fadimepolat", messages: [
                { type: "cyberbullying", text: "Senin hakkında çok kötü dedikodular var, doğru mu?", actions: ["report", "block"], complaintReason: "iftira" }
            ]}
        ],
        kimlik: [
            { sender: "sahte_hesap4", avatar: "sahtehesap4", conversation: [
                { incoming: "Merhaba, tanışabilir miyiz?", waitForReply: true, endsConversation: true }
            ]},
            { sender: "fake_profile4", avatar: "fakeprofile4", messages: [
                { type: "cyberbullying", text: "Senin adına mesajlar gönderiyorum, kimse fark etmedi!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]},
            { sender: "clone_user4", avatar: "cloneuser4", conversation: [
                { incoming: "Hobilerinden bahseder misin?", waitForReply: true, endsConversation: true }
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
            { sender: "resat.sahin", avatar: "resatsahin", conversation: [
                { incoming: "Bugün çok güzel hava!", waitForReply: true, endsConversation: true }
            ]},
            { sender: "fadime.yavuz", avatar: "fadimeyavuz", messages: [
                { type: "cyberbullying", text: "Sen gerçekten berbat birisin, kimse seni sevmiyor!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "recep.koç", avatar: "recepkoc", conversation: [
                { incoming: "Yeni hobin ne?", waitForReply: true, endsConversation: true }
            ]},
            { sender: "sabiha.aydın", avatar: "sabihaaydin", messages: [
                { type: "cyberbullying", text: "Hiçbir şeye yaramazsın, çok işe yaramazsın!", actions: ["report", "block"], complaintReason: "sozel" }
            ]},
            { sender: "halil.celik", avatar: "halilcelik", messages: [
                { type: "cyberbullying", text: "Seni hiç kimse istemez, git buradan!", actions: ["report", "block"], complaintReason: "sozel" }
            ]}
        ],
        dislanma: [
            { sender: "sevim.demir", avatar: "sevimdemir", conversation: [
                { incoming: "Hangi dersi seversin?", waitForReply: true, endsConversation: true }
            ]},
            { sender: "ramazan.yilmaz", avatar: "ramazanyilmaz", conversation: [
                { incoming: "Ben de o dersi seviyorum!", waitForReply: true, endsConversation: true }
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
            { sender: "suleyman.guven", avatar: "suleymangu ven", conversation: [
                { incoming: "Yarın okula gelecek misin?", waitForReply: true, endsConversation: true }
            ]},
            { sender: "zeliha.arslan", avatar: "zelihaarslan", messages: [
                { type: "cyberbullying", text: "Bana yardım etmezsen sırlarını herkese söylerim!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "yasar.dogan", avatar: "yasardogan", conversation: [
                { incoming: "Ders çalışmak ister misin?", waitForReply: true, endsConversation: true }
            ]},
            { sender: "meryem.yildirim", avatar: "meryemyildirim", messages: [
                { type: "cyberbullying", text: "Yarın para getir yoksa fotoğraflarını paylaşırım!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]},
            { sender: "ismail.cetin", avatar: "ismailcetin", messages: [
                { type: "cyberbullying", text: "Susmazsan başına kötü şeyler gelir!", actions: ["report", "block"], complaintReason: "tehdit" }
            ]}
        ],
        iftira: [
            { sender: "serife.kara", avatar: "serifekara", conversation: [
                { incoming: "Yeni albümü beğendin mi?", waitForReply: true, endsConversation: true }
            ]},
            { sender: "ahmet.polat", avatar: "ahmetpolat", conversation: [
                { incoming: "Evet çok güzel!", waitForReply: true, endsConversation: true }
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
            { sender: "sahte_hesap5", avatar: "sahtehesap5", conversation: [
                { incoming: "Merhaba, nasıl gidiyor?", waitForReply: true, endsConversation: true }
            ]},
            { sender: "fake_profile5", avatar: "fakeprofile5", messages: [
                { type: "cyberbullying", text: "Senin hesabını çaldım, artık benim!", actions: ["report", "block"], complaintReason: "kimlik" }
            ]},
            { sender: "clone_user5", avatar: "cloneuser5", conversation: [
                { incoming: "En sevdiğin renk ne?", waitForReply: true, endsConversation: true }
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
    "genelleme-on": "Genelleme Ön-Test",
    baslama: "Başlama Düzeyi",
    uygulama: "Uygulama",
    "genelleme-son": "Genelleme Son-Test",
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

// 100 POST - Lise Düzeyi Türkiye Gündemi İçerikleri
const POSTS_100 = [
    // OKUL VE EĞİTİM (15 post)
    { username: "lise_hayati", avatar: "lisehayati", image: "https://picsum.photos/seed/school1/600/600", caption: "Sınav haftası bitti sonunda! 🎉📚 #okul", likes: 342, type: "image" },
    { username: "matematik_aski", avatar: "matematikaski", image: "https://picsum.photos/seed/school2/600/600", caption: "Matematik sınavından 95 aldım! 💪🔥", likes: 567, type: "image" },
    { username: "edebiyat_sevgisi", avatar: "edebiyatsevgisi", image: "https://picsum.photos/seed/school3/600/600", caption: "Sabahattin Ali'nin kitabını bitirdim, harika! 📖✨", likes: 289, type: "image" },
    { username: "kimya_deneyi", avatar: "kimyadeneyi", image: "https://picsum.photos/seed/school4/600/600", caption: "Labaratuvar dersi çok eğlenceli geçti 🧪🔬", likes: 412, type: "image" },
    { username: "fizik_dunyasi", avatar: "fizikdunyasi", image: "https://picsum.photos/seed/school5/600/600", caption: "Newton kanunları çok mantıklı 🍎⚡", likes: 298, type: "image" },
    { username: "tarih_merakli", avatar: "tarihmerakli", image: "https://picsum.photos/seed/school6/600/600", caption: "Osmanlı tarihi projesi hazırladım 🏛️📜", likes: 445, type: "image" },
    { username: "biyoloji_lab", avatar: "biyolojilab", image: "https://picsum.photos/seed/school7/600/600", caption: "Mikroskop altında hücre gözlemledik! 🔬🧬", likes: 356, type: "image" },
    { username: "geometri_asan", avatar: "geometriasan", image: "https://picsum.photos/seed/school8/600/600", caption: "Geometri soruları çözmeyi seviyorum 📐📊", likes: 234, type: "image" },
    { username: "ingilizce_kursu", avatar: "ingilizcekursu", image: "https://picsum.photos/seed/school9/600/600", caption: "IELTS hazırlığı devam ediyor! 🇬🇧📝", likes: 489, type: "image" },
    { username: "odev_takibi", avatar: "odevtakibi", image: "https://picsum.photos/seed/school10/600/600", caption: "Projemi zamanında teslim ettim! ✅📚", likes: 378, type: "image" },
    { username: "karne_gunleri", avatar: "karnegunleri", image: "https://picsum.photos/seed/school11/600/600", caption: "Karne aldım, notlarım güzel! 📋🎯", likes: 521, type: "image" },
    { username: "sinif_baskani", avatar: "sinifbaskani", image: "https://picsum.photos/seed/school12/600/600", caption: "Sınıf toplantısı yapıldı, güzel geçti 👥🗣️", likes: 267, type: "image" },
    { username: "universite_hazirligi", avatar: "universitehazirligi", image: "https://picsum.photos/seed/school13/600/600", caption: "YKS'ye hazırlanıyorum! Hedef mühendislik 🎯📚", likes: 612, type: "image" },
    { username: "edebiyat_okulu", avatar: "edebiyatokulu", image: "https://picsum.photos/seed/school14/600/600", caption: "Nazım Hikmet şiirlerini okuyorum 📖💫", likes: 398, type: "image" },
    { username: "cografya_rehberi", avatar: "cografyarehberi", image: "https://picsum.photos/seed/school15/600/600", caption: "Türkiye haritası çalışması yaptık 🗺️🇹🇷", likes: 334, type: "image" },
    
    // TÜRK FUTBOLU VE SPOR (20 post)
    { username: "galatasaray", avatar: "galatasaray", image: "https://picsum.photos/seed/gs1/600/600", caption: "Şampiyonluk yolunda! 🦁🔴🟡 #cimbom", likes: 18750, type: "image" },
    { username: "fenerbahce", avatar: "fenerbahce", image: "https://picsum.photos/seed/fb1/600/600", caption: "Kadıköy'de muhteşem gece! ⚽💛💙 #fener", likes: 15420, type: "image" },
    { username: "besiktas", avatar: "besiktas", image: "https://picsum.photos/seed/bjk1/600/600", caption: "Kartal uçuyor! 🦅⚫⚪ #besiktas", likes: 12890, type: "image" },
    { username: "trabzonspor", avatar: "trabzonspor", image: "https://picsum.photos/seed/ts1/600/600", caption: "61'in gücü! ⚡🔴🔵 #trabzon", likes: 9870, type: "image" },
    { username: "milli_takim", avatar: "millitakim", image: "https://picsum.photos/seed/milli1/600/600", caption: "Ay yıldızlı formamız! 🇹🇷⚽ #ayyıldız", likes: 22340, type: "image" },
    { username: "voleybol_tr", avatar: "voleyboltr", image: "https://picsum.photos/seed/vball1/600/600", caption: "Sultanlar Ligi maçı heyecanlıydı! 🏐👑", likes: 5670, type: "image" },
    { username: "basketbol_tr", avatar: "basketboltr", image: "https://picsum.photos/seed/basket1/600/600", caption: "Euroleague'de muhteşem galibiyet! 🏀🔥", likes: 7890, type: "image" },
    { username: "futsal_ligi", avatar: "futsalligi", image: "https://picsum.photos/seed/futsal1/600/600", caption: "Okullar arası futsal turnuvasında finaldeyiz! ⚽🏆", likes: 1456, type: "image" },
    { username: "yuzme_merkezi", avatar: "yuzmemerkezi", image: "https://picsum.photos/seed/swim1/600/600", caption: "Yüzme antrenmanı bitti! 🏊‍♂️💪", likes: 892, type: "image" },
    { username: "tenis_kortu", avatar: "teniskortu", image: "https://picsum.photos/seed/tennis1/600/600", caption: "Tenis maçı kazandım! 🎾🏆", likes: 723, type: "image" },
    { username: "halk_oyunlari", avatar: "halkoyunlari", image: "https://picsum.photos/seed/dance2/600/600", caption: "Zeybek gösterisi muhteşem geçti! 💃🕺", likes: 2340, type: "image" },
    { username: "okul_spor_kulubu", avatar: "okulsporkulubu", image: "https://picsum.photos/seed/sport1/600/600", caption: "Spor şenliği hazırlıkları devam ediyor! 🏃‍♀️🤸", likes: 1234, type: "image" },
    { username: "atletizm_takimi", avatar: "atletizmtakimi", image: "https://picsum.photos/seed/track1/600/600", caption: "100 metre yarışında birinci oldum! 🏃💨", likes: 1567, type: "image" },
    { username: "gures_milli", avatar: "guresmilli", image: "https://picsum.photos/seed/wrestling1/600/600", caption: "Güreş turnuvasından madalya ile döndüm! 🤼🥇", likes: 1890, type: "image" },
    { username: "halter_genc", avatar: "haltergenc", image: "https://picsum.photos/seed/weight1/600/600", caption: "Kişisel rekorumu kırdım! 💪🏋️", likes: 934, type: "image" },
    { username: "okculuk_spor", avatar: "okculukspor", image: "https://picsum.photos/seed/archery1/600/600", caption: "Okçuluk antrenmanı çok keyifli! 🏹🎯", likes: 1123, type: "image" },
    { username: "jimnastik_tr", avatar: "jimnastiktr", image: "https://picsum.photos/seed/gym1/600/600", caption: "Jimnastik gösterisine hazırlanıyorum! 🤸‍♀️✨", likes: 2456, type: "image" },
    { username: "masa_tenisi_okul", avatar: "masatenisiokul", image: "https://picsum.photos/seed/pingpong1/600/600", caption: "Masa tenisi turnuvasında finaldeyiz! 🏓🎉", likes: 876, type: "image" },
    { username: "badminton_ligi", avatar: "badmintonligi", image: "https://picsum.photos/seed/badminton1/600/600", caption: "Badminton maçlarımız devam ediyor! 🏸", likes: 645, type: "image" },
    { username: "kros_kosusu", avatar: "kroskosusu", image: "https://picsum.photos/seed/cross1/600/600", caption: "Kros yarışına katıldım, çok eğlenceliydi! 🏃‍♂️🌲", likes: 1098, type: "image" },
    
    // MÜZİK VE TÜRK SANATÇILAR (15 post)
    { username: "reynmen", avatar: "reynmen", image: "https://picsum.photos/seed/rey1/600/600", caption: "Yeni şarkı çok yakında! 🎤🔥 #reynmen", likes: 45600, type: "image" },
    { username: "aleyna.tilki", avatar: "aleynatilki", image: "https://picsum.photos/seed/aleyna1/600/600", caption: "Konser enerjisi 🎵✨ #aleyna", likes: 38900, type: "image" },
    { username: "ezhel", avatar: "ezhel", image: "https://picsum.photos/seed/ezhel1/600/600", caption: "Yeni albüm yolda! 🎧💿", likes: 52300, type: "image" },
    { username: "mabel_matiz", avatar: "mabelmatiz", image: "https://picsum.photos/seed/mabel1/600/600", caption: "Konser öncesi hazırlıklar 🎹🎶", likes: 31200, type: "image" },
    { username: "edis", avatar: "edis", image: "https://picsum.photos/seed/edis1/600/600", caption: "Sahne benim evim! 🎤🎵", likes: 28900, type: "image" },
    { username: "gokhan_turkmen", avatar: "gokhanturkmen", image: "https://picsum.photos/seed/gokhan1/600/600", caption: "Yeni single yayında! 🎸🎵", likes: 23400, type: "image" },
    { username: "okul_korosu", avatar: "okulkorosu", image: "https://picsum.photos/seed/choir1/600/600", caption: "Koro prövası harika geçti! 🎶👥", likes: 1567, type: "image" },
    { username: "muzik_kulubu", avatar: "muzikkulubu", image: "https://picsum.photos/seed/music2/600/600", caption: "Okulumuzda konser veriyoruz! 🎹🎸", likes: 2341, type: "image" },
    { username: "gitar_dersi", avatar: "gitardersi", image: "https://picsum.photos/seed/guitar1/600/600", caption: "İlk şarkımı çaldım! 🎸🎵", likes: 987, type: "image" },
    { username: "piyano_sevgisi", avatar: "pianosevgisi", image: "https://picsum.photos/seed/piano1/600/600", caption: "Beethoven çalışıyorum 🎹🎼", likes: 1234, type: "image" },
    { username: "sarki_sozu", avatar: "sarkisozu", image: "https://picsum.photos/seed/lyrics1/600/600", caption: "İlk şarkı sözümü yazdım! ✍️🎵", likes: 1678, type: "image" },
    { username: "rap_tr", avatar: "raptr", image: "https://picsum.photos/seed/rap1/600/600", caption: "Freestyle çalışmaları devam ediyor! 🎤🔥", likes: 3456, type: "image" },
    { username: "turku_sevgisi", avatar: "turkusevgisi", image: "https://picsum.photos/seed/turku1/600/600", caption: "Türkü dinlemek çok huzur verici 🎵🇹🇷", likes: 2890, type: "image" },
    { username: "muzik_festivali", avatar: "muzikfestivali", image: "https://picsum.photos/seed/festival1/600/600", caption: "Okul müzik festivali başlıyor! 🎪🎶", likes: 4567, type: "image" },
    { username: "keman_dersi", avatar: "kemandersi", image: "https://picsum.photos/seed/violin1/600/600", caption: "Keman çalmayı öğreniyorum 🎻✨", likes: 1345, type: "image" },
    
    // OYUN VE TEKNOLOJİ (15 post)
    { username: "valorant_tr", avatar: "valoranttr", image: "https://picsum.photos/seed/valo1/600/600", caption: "Ace attım! 💥🎮 #valorant", likes: 2340, type: "image" },
    { username: "fifa_turkiye", avatar: "fifaturkiye", image: "https://picsum.photos/seed/fifa1/600/600", caption: "FUT Champions'da Elite! ⚽🏆", likes: 1890, type: "image" },
    { username: "pubg_mobile_tr", avatar: "pubgmobiletr", image: "https://picsum.photos/seed/pubg1/600/600", caption: "Chicken Dinner! 🍗🎮", likes: 3456, type: "image" },
    { username: "minecraft_tr", avatar: "minecrafttr", image: "https://picsum.photos/seed/mc1/600/600", caption: "Survival evimi bitirdim! 🏠⛏️", likes: 2789, type: "image" },
    { username: "league_of_legends_tr", avatar: "loltr", image: "https://picsum.photos/seed/lol1/600/600", caption: "Ranked'de yükseliyorum! 🎮⬆️", likes: 1567, type: "image" },
    { username: "mobile_legends_tr", avatar: "mlbbtr", image: "https://picsum.photos/seed/mlbb1/600/600", caption: "Savage yaptım! 🔥🎮", likes: 2134, type: "image" },
    { username: "roblox_turkiye", avatar: "robloxturkiye", image: "https://picsum.photos/seed/roblox1/600/600", caption: "Yeni oyun modu harika! 🎮✨", likes: 1876, type: "image" },
    { username: "brawl_stars_tr", avatar: "brawlstarstr", image: "https://picsum.photos/seed/brawl1/600/600", caption: "Yeni Brawler aldım! 🎉🎮", likes: 2456, type: "image" },
    { username: "teknoloji_haberleri", avatar: "teknolojihaberleri", image: "https://picsum.photos/seed/tech1/600/600", caption: "Yeni iPhone modeli çıktı! 📱💫", likes: 5678, type: "image" },
    { username: "playstation_tr", avatar: "playstationtr", image: "https://picsum.photos/seed/ps1/600/600", caption: "PS5'te yeni oyun! 🎮🎯", likes: 4321, type: "image" },
    { username: "gaming_setup", avatar: "gamingsetup", image: "https://picsum.photos/seed/setup1/600/600", caption: "Oyun setup'ımı yeniledim! 💻🎮", likes: 3890, type: "image" },
    { username: "esports_tr", avatar: "esportstr", image: "https://picsum.photos/seed/esport1/600/600", caption: "E-spor turnuvasında yer aldık! 🏆🎮", likes: 2987, type: "image" },
    { username: "kodlama_ogreniyorum", avatar: "kodlamaogreniyorum", image: "https://picsum.photos/seed/code1/600/600", caption: "İlk web sitemi yaptım! 💻✨", likes: 1765, type: "image" },
    { username: "robot_programlama", avatar: "robotprogramlama", image: "https://picsum.photos/seed/robot1/600/600", caption: "Robotik yarışmasına hazırlanıyorum! 🤖⚙️", likes: 1543, type: "image" },
    { username: "bilim_teknoloji", avatar: "bilimteknoloji", image: "https://picsum.photos/seed/science1/600/600", caption: "Bilim fuarında projemizi sergiledik! 🔬🎯", likes: 2123, type: "image" },
    
    // FİLM, DİZİ VE EĞLENCE (10 post)
    { username: "netflix_turkiye", avatar: "netflixturkiye", image: "https://picsum.photos/seed/netflix1/600/600", caption: "Yeni Türk dizisi harika! 🎬📺", likes: 8900, type: "image" },
    { username: "marvel_turkiye", avatar: "marvelturkiye", image: "https://picsum.photos/seed/marvel1/600/600", caption: "Yeni Marvel filmi muhteşem! 🦸‍♂️🔥", likes: 12340, type: "image" },
    { username: "sinema_keyfi", avatar: "sinemakeyfi", image: "https://picsum.photos/seed/cinema1/600/600", caption: "Sinemada film izlemek çok keyifli! 🍿🎬", likes: 2345, type: "image" },
    { username: "dizi_onerileri", avatar: "dizionelerileri", image: "https://picsum.photos/seed/series1/600/600", caption: "Bu diziyi mutlaka izleyin! 📺✨", likes: 3456, type: "image" },
    { username: "animasyon_dunyasi", avatar: "animasyondunyasi", image: "https://picsum.photos/seed/anime1/600/600", caption: "Anime izlemeyi çok seviyorum! 🎌📺", likes: 4567, type: "image" },
    { username: "youtuber_tr", avatar: "youtubertr", image: "https://picsum.photos/seed/youtube1/600/600", caption: "Yeni video yayında! 📹🎥", likes: 6789, type: "image" },
    { username: "tiktok_tr", avatar: "tiktoktr", image: "https://picsum.photos/seed/tiktok1/600/600", caption: "Yeni trend çok eğlenceli! 🎵📱", likes: 8901, type: "image" },
    { username: "fotograf_sanatcisi", avatar: "fotografsanatcisi", image: "https://picsum.photos/seed/photo1/600/600", caption: "Günbatımı fotoğrafı çektim! 📸🌅", likes: 3210, type: "image" },
    { username: "video_editor", avatar: "videoeditor", image: "https://picsum.photos/seed/edit1/600/600", caption: "İlk edit çalışmam! 🎬✂️", likes: 2567, type: "image" },
    { username: "podcast_turkiye", avatar: "podcastturkiye", image: "https://picsum.photos/seed/podcast1/600/600", caption: "Yeni podcast bölümü yayında! 🎙️🎧", likes: 1987, type: "image" },
    
    // YEMEK VE TÜRK MUTFAğI (10 post)
    { username: "istanbul_lezzetleri", avatar: "istanbullezzetleri", image: "https://picsum.photos/seed/food1/600/600", caption: "İstanbul usulü döner 🌯😋", likes: 4560, type: "image" },
    { username: "turkiye.kahvesi", avatar: "turkiyekahvesi", image: "https://picsum.photos/seed/coffee1/600/600", caption: "Türk kahvesi keyfi ☕🇹🇷", likes: 3210, type: "image" },
    { username: "lahmacun_aski", avatar: "lahmacunaski", image: "https://picsum.photos/seed/lahmacun1/600/600", caption: "Taze fırından lahmacun! 🍕🔥", likes: 5678, type: "image" },
    { username: "pide_dunyasi", avatar: "pidedunyasi", image: "https://picsum.photos/seed/pide1/600/600", caption: "Kaşarlı pide favorim! 🥖🧀", likes: 3456, type: "image" },
    { username: "baklava_sevenler", avatar: "baklavasevenler", image: "https://picsum.photos/seed/baklava1/600/600", caption: "Fıstıklı baklava 😍🍯", likes: 6789, type: "image" },
    { username: "cay_saati", avatar: "caysaati", image: "https://picsum.photos/seed/tea1/600/600", caption: "Çay molası zamanı! ☕🫖", likes: 2345, type: "image" },
    { username: "simit_sevgisi", avatar: "simitsevgisi", image: "https://picsum.photos/seed/simit1/600/600", caption: "Taze simit keyfi! 🥯😋", likes: 2890, type: "image" },
    { username: "borek_tarifleri", avatar: "borektarifleri", image: "https://picsum.photos/seed/borek1/600/600", caption: "Annemin yaptığı börek! 🥐❤️", likes: 4123, type: "image" },
    { username: "tatli_dunyasi", avatar: "tatlidunyasi", image: "https://picsum.photos/seed/dessert1/600/600", caption: "Ev yapımı kurabiye 🍪✨", likes: 3567, type: "image" },
    { username: "kahvalti_keyfi", avatar: "kahvaltikeyfi", image: "https://picsum.photos/seed/breakfast1/600/600", caption: "Türk kahvaltısı nefis! 🍳🧀🥖", likes: 5432, type: "image" },
    
    // TÜRKİYE GÜNDEMİ VE BAYRAMLAR (5 post)
    { username: "turkiye_gundem", avatar: "turkiyegundem", image: "https://picsum.photos/seed/tr1/600/600", caption: "29 Ekim Cumhuriyet Bayramı kutlu olsun! 🇹🇷🎉", likes: 89000, type: "image" },
    { username: "olimpik_turkiye", avatar: "olimpikturkiye", image: "https://picsum.photos/seed/olympic1/600/600", caption: "Mete Gazoz altın madalya! 🥇🏹", likes: 125000, type: "image" },
    { username: "milli_bayramlar", avatar: "millibayramlar", image: "https://picsum.photos/seed/bayram1/600/600", caption: "23 Nisan coşkusu! 🎊🇹🇷", likes: 67800, type: "image" },
    { username: "19_mayis", avatar: "19mayis", image: "https://picsum.photos/seed/19mayis1/600/600", caption: "19 Mayıs Gençlik ve Spor Bayramı! 🎉🏃", likes: 78900, type: "image" },
    { username: "30_agustos", avatar: "30agustos", image: "https://picsum.photos/seed/30agustos1/600/600", caption: "30 Ağustos Zafer Bayramı kutlu olsun! 🇹🇷🎖️", likes: 92300, type: "image" },
    
    // SEYAHAT VE TÜRKİYE (10 post)
    { username: "istanbul_gezisi", avatar: "istanbulgezisi", image: "https://picsum.photos/seed/istanbul1/600/600", caption: "İstanbul'un güzelliklerinden! 🕌🌉", likes: 8900, type: "image" },
    { username: "antalya_sahilleri", avatar: "antalyasahilleri", image: "https://picsum.photos/seed/antalya1/600/600", caption: "Antalya plajları harika! 🏖️☀️", likes: 12340, type: "image" },
    { username: "kapadokya_balon", avatar: "kapadokyabalon", image: "https://picsum.photos/seed/kapadokya1/600/600", caption: "Kapadokya'da balon turu! 🎈🏔️", likes: 15670, type: "image" },
    { username: "pamukkale_travertenleri", avatar: "pamukkaletravertenleri", image: "https://picsum.photos/seed/pamukkale1/600/600", caption: "Pamukkale beyaz cennet! 🏔️💦", likes: 9870, type: "image" },
    { username: "efes_antik_kent", avatar: "efesantikkent", image: "https://picsum.photos/seed/efes1/600/600", caption: "Efes Antik Kenti gezisi! 🏛️📜", likes: 7650, type: "image" },
    { username: "bodrum_tatili", avatar: "bodrumtatili", image: "https://picsum.photos/seed/bodrum1/600/600", caption: "Bodrum tatil keyfi! 🏖️🌊", likes: 11230, type: "image" },
    { username: "izmir_saat_kulesi", avatar: "izmirsaatkulesi", image: "https://picsum.photos/seed/izmir1/600/600", caption: "İzmir'de güzel bir gün! 🕐🌆", likes: 6780, type: "image" },
    { username: "trabzon_sumela", avatar: "trabzonsumela", image: "https://picsum.photos/seed/trabzon1/600/600", caption: "Sümela Manastırı manzarası! ⛰️🏛️", likes: 8900, type: "image" },
    { username: "nemrut_dagi", avatar: "nemrutdagi", image: "https://picsum.photos/seed/nemrut1/600/600", caption: "Nemrut Dağı gün doğumu! 🌄🗿", likes: 10234, type: "image" },
    { username: "mardin_tarihi", avatar: "mardintarihi", image: "https://picsum.photos/seed/mardin1/600/600", caption: "Mardin'in taş evleri! 🏘️🌅", likes: 7890, type: "image" }
];
