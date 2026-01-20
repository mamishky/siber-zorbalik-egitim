/**
 * Yapay Zeka Mesaj Üretici
 * OpenAI API kullanarak siber zorbalık ve güvenli mesajlar oluşturur
 */

// API endpoint'i - Backend'de olmalı (güvenlik için)
const AI_API_ENDPOINT = 'https://your-backend-api.com/generate-message';

/**
 * Siber zorbalık mesajı oluştur
 * @param {string} bullyingType - Zorbalık türü (sozel, dislanma, tehdit, iftira, kimlik)
 * @param {string} level - Seviye (baslama, orta, ileri, uzman)
 * @param {number} age - Çocuğun yaşı
 * @returns {Promise<Object>} Mesaj objesi
 */
async function generateCyberbullyingMessage(bullyingType, level, age) {
    const prompt = `Sen bir lise öğrencisisin. ${age} yaşındaki bir arkadaşına ${bullyingType} türünde siber zorbalık içeren bir mesaj gönderiyorsun. 

Zorbalık türü: ${bullyingType}
Seviye: ${level}
Yaş: ${age}

Mesaj:
- Doğal ve gerçekçi olmalı
- Çocukların kullandığı dilde olmalı
- Aşırı sert veya şiddet içermemeli (eğitim amaçlı)
- Türkçe olmalı
- Emoji kullanma

Sadece mesaj metnini döndür, başka açıklama yapma.`;

    try {
        const response = await fetch(AI_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                type: 'cyberbullying',
                bullyingType: bullyingType,
                level: level,
                age: age
            })
        });

        const data = await response.json();
        
        return {
            type: "cyberbullying",
            text: data.message,
            actions: ["report", "block"],
            complaintReason: bullyingType
        };
    } catch (error) {
        console.error('AI mesaj oluşturma hatası:', error);
        // Fallback: Varsayılan mesaj
        return getFallbackCyberbullyingMessage(bullyingType);
    }
}

/**
 * Güvenli mesaj konuşması oluştur (2-3 cevaplık)
 * @param {string} bullyingType - Zorbalık türü (bağlam için)
 * @param {string} level - Seviye
 * @param {number} age - Çocuğun yaşı
 * @returns {Promise<Array>} Conversation array
 */
async function generateSafeConversation(bullyingType, level, age) {
    const topics = [
        "okul dersleri ve ödevler",
        "hobiler ve ilgi alanları",
        "oyunlar ve teknoloji",
        "spor ve aktiviteler",
        "müzik ve sanat",
        "arkadaşlık ve sosyal aktiviteler",
        "film ve dizi önerileri",
        "yemek ve tarifler"
    ];
    
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    const prompt = `Sen bir lise öğrencisisin. ${age} yaşındaki bir arkadaşınla ${randomTopic} hakkında doğal bir sohbet başlatıyorsun.

Yaş: ${age}
Konu: ${randomTopic}

2-3 mesajlık bir konuşma oluştur:
1. İlk mesaj: Konuyu açan, cevap bekleyen bir soru veya öneri
2. İkinci mesaj: Arkadaşının cevabına göre devam eden, yine cevap bekleyen
3. Üçüncü mesaj (opsiyonel): Konuşmayı bitiren, kapanış mesajı

Özellikler:
- Doğal ve samimi dil
- Çocukların kullandığı ifadeler
- Emoji kullan (ama abartma)
- Türkçe
- Pozitif ve arkadaşça ton

JSON formatında döndür:
{
  "conversation": [
    { "incoming": "mesaj 1", "waitForReply": true },
    { "incoming": "mesaj 2", "waitForReply": true },
    { "incoming": "mesaj 3", "waitForReply": false, "endsConversation": true }
  ]
}`;

    try {
        const response = await fetch(AI_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: prompt,
                type: 'safe',
                bullyingType: bullyingType,
                level: level,
                age: age,
                topic: randomTopic
            })
        });

        const data = await response.json();
        return data.conversation || getFallbackSafeConversation();
    } catch (error) {
        console.error('AI konuşma oluşturma hatası:', error);
        return getFallbackSafeConversation();
    }
}

/**
 * Fallback: Varsayılan siber zorbalık mesajı
 */
function getFallbackCyberbullyingMessage(bullyingType) {
    const fallbacks = {
        sozel: "Sen gerçekten çok aptalsın, hiçbir şey bilmiyorsun!",
        dislanma: "Seni partiye davet etmedik, kimse seni istemiyor.",
        tehdit: "Eğer bunu birine söylersen seni döverim!",
        iftira: "Herkes senin hırsızlık yaptığını söylüyor, doğru mu?",
        kimlik: "Ben aslında senin arkadaşının hesabını çaldım!"
    };
    
    return {
        type: "cyberbullying",
        text: fallbacks[bullyingType] || fallbacks.sozel,
        actions: ["report", "block"],
        complaintReason: bullyingType
    };
}

/**
 * Fallback: Varsayılan güvenli konuşma
 */
function getFallbackSafeConversation() {
    return [
        { incoming: "Selam! Bu hafta sonu yeni Marvel filmi çıkıyor biliyorsun dimi? 🎬", waitForReply: true },
        { incoming: "Aynen çok iyi olacak! Cumartesi saat 3'te AVM'de buluşalım mı?", waitForReply: true },
        { incoming: "Diğerlerine de haber veriyorum, hep beraber gidelim 🍿", waitForReply: false },
        { incoming: "Tamamdır o zaman, cumartesi görüşürüz! 👋", waitForReply: false, endsConversation: true }
    ];
}

/**
 * Senaryo oluştur (AI ile)
 * @param {string} sender - Gönderen kullanıcı adı
 * @param {string} avatar - Avatar seed
 * @param {string} bullyingType - Zorbalık türü
 * @param {string} level - Seviye
 * @param {number} age - Yaş
 * @param {boolean} isCyberbullying - Siber zorbalık mı güvenli mi
 */
async function generateScenario(sender, avatar, bullyingType, level, age, isCyberbullying) {
    if (isCyberbullying) {
        const message = await generateCyberbullyingMessage(bullyingType, level, age);
        return {
            sender: sender,
            avatar: avatar,
            messages: [message]
        };
    } else {
        const conversation = await generateSafeConversation(bullyingType, level, age);
        return {
            sender: sender,
            avatar: avatar,
            conversation: conversation
        };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateCyberbullyingMessage,
        generateSafeConversation,
        generateScenario
    };
}
