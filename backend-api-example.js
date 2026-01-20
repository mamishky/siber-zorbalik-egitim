/**
 * BACKEND API ÖRNEĞİ
 * Bu dosya backend'de (Node.js/Express) çalışmalı
 * Frontend'den çağrılacak
 */

const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// OpenAI API key'i environment variable'dan al
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

/**
 * Mesaj oluşturma endpoint'i
 * POST /generate-message
 */
app.post('/generate-message', async (req, res) => {
    try {
        const { prompt, type, bullyingType, level, age, topic } = req.body;

        // OpenAI'ye istek gönder
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // veya "gpt-3.5-turbo" (daha ucuz)
            messages: [
                {
                    role: "system",
                    content: `Sen bir eğitim uygulaması için mesajlar oluşturan bir asistansın. 
                    ${age} yaşındaki lise öğrencileri için uygun, doğal ve gerçekçi mesajlar oluştur.
                    Türkçe yazıyorsun ve çocukların kullandığı dili kullanıyorsun.`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.8, // Yaratıcılık seviyesi
            max_tokens: 500
        });

        const aiResponse = completion.choices[0].message.content;

        // Eğer güvenli konuşma ise JSON parse et
        if (type === 'safe') {
            try {
                // AI'dan gelen JSON'u parse et
                const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const parsed = JSON.parse(jsonMatch[0]);
                    return res.json({ conversation: parsed.conversation });
                }
            } catch (e) {
                console.error('JSON parse hatası:', e);
            }
            
            // JSON parse edilemezse manuel oluştur
            return res.json({
                conversation: [
                    { incoming: aiResponse.split('\n')[0] || aiResponse, waitForReply: true },
                    { incoming: "Harika! Devam edelim 🎉", waitForReply: true },
                    { incoming: "Görüşürüz! 👋", waitForReply: false, endsConversation: true }
                ]
            });
        } else {
            // Siber zorbalık mesajı
            return res.json({ message: aiResponse.trim() });
        }

    } catch (error) {
        console.error('API hatası:', error);
        res.status(500).json({ error: 'Mesaj oluşturulamadı' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`AI API sunucusu ${PORT} portunda çalışıyor`);
});

/**
 * KURULUM:
 * 
 * npm install express openai cors
 * 
 * .env dosyası:
 * OPENAI_API_KEY=sk-...
 * 
 * Çalıştırma:
 * node backend-api-example.js
 */
