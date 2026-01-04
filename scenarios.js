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
