/**
 * Vercel Serverless Function - AI Message Generation
 * 
 * Güvenli AI mesaj üretimi endpoint'i (Google Gemini kullanarak)
 * Frontend'den API key'i kaldırıp backend'de tutar
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Rate limiting için basit in-memory store (serverless'ta sınırlı koruma)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 dakika
const RATE_LIMIT_MAX_REQUESTS = 30; // 10 dakikada max 30 istek

/**
 * Rate limit kontrolü (IP bazlı)
 */
function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitStore.get(ip) || [];
  
  // Eski istekleri temizle
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  return true;
}

/**
 * CORS headers
 */
function getCorsHeaders(origin) {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8000',
  ];
  
  // Production'da tüm originlere izin (veya spesifik domain ekle)
  const isAllowed = allowedOrigins.includes(origin) || process.env.NODE_ENV === 'production';
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? (origin || '*') : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

/**
 * Input validasyonu
 */
function validateInput(body) {
  const errors = [];
  
  if (!body.scenarioId || typeof body.scenarioId !== 'string') {
    errors.push('scenarioId gerekli (string)');
  }
  
  if (!body.userMessage || typeof body.userMessage !== 'string') {
    errors.push('userMessage gerekli (string)');
  } else if (body.userMessage.length < 1 || body.userMessage.length > 500) {
    errors.push('userMessage 1-500 karakter olmalı');
  }
  
  if (body.scenarioContext && body.scenarioContext.length > 2000) {
    errors.push('scenarioContext max 2000 karakter olmalı');
  }
  
  if (body.conversation) {
    if (!Array.isArray(body.conversation)) {
      errors.push('conversation array olmalı');
    } else if (body.conversation.length > 50) {
      errors.push('conversation max 50 mesaj içerebilir');
    } else {
      // Her mesajın yapısını kontrol et
      for (const msg of body.conversation) {
        if (!msg.sender || !msg.text) {
          errors.push('conversation içindeki her mesajın sender ve text olmalı');
          break;
        }
      }
    }
  }
  
  if (body.locale && !['tr', 'en'].includes(body.locale)) {
    errors.push('locale "tr" veya "en" olmalı');
  }
  
  return errors;
}

/**
 * Prompt oluştur
 */
function buildPrompt(body) {
  const locale = body.locale || 'tr';
  const age = body.participantAge || 15;
  const sender = body.scenarioSender || 'Arkadaşın';
  
  // Conversation history'yi formatla
  let historyText = '';
  if (body.conversation && body.conversation.length > 0) {
    historyText = body.conversation.map(msg => {
      const role = msg.sender === 'user' ? 'Kullanıcı' : sender;
      return `${role}: ${msg.text}`;
    }).join('\n');
  }
  
  if (locale === 'tr') {
    return `Sen ${sender} adında bir lise öğrencisisin. ${age} yaşındaki bir arkadaşınla doğal, samimi ve pozitif bir sohbet yapıyorsun.

BAĞLAM: Bu bir eğitim simülasyonudur. Amacı çocuklara güvenli iletişimi öğretmektir.

${body.scenarioContext ? `SENARYO: ${body.scenarioContext}\n` : ''}
${historyText ? `ÖNCEKİ KONUŞMA:\n${historyText}\n` : ''}
KULLANICI: ${body.userMessage}

ŞİMDİ SEN NE DERSİN?
- Kısa, doğal ve samimi bir cevap ver (1-3 cümle)
- Türkçe yaz, gençlerin kullandığı dili kullan
- Emoji kullanabilirsin ama abartma (max 2 emoji)
- Sadece cevabını yaz, başka açıklama yapma
- Pozitif ve destekleyici ol`;
  } else {
    return `You are ${sender}, a high school student. You're having a natural, friendly, and positive conversation with a ${age}-year-old friend.

CONTEXT: This is an educational simulation aimed at teaching safe communication to children.

${body.scenarioContext ? `SCENARIO: ${body.scenarioContext}\n` : ''}
${historyText ? `PREVIOUS CONVERSATION:\n${historyText}\n` : ''}
USER: ${body.userMessage}

YOUR RESPONSE:
- Keep it short, natural, and friendly (1-3 sentences)
- Use language that teens use
- You can use emojis but don't overdo it (max 2 emojis)
- Only write your response, no additional explanation
- Be positive and supportive`;
  }
}

/**
 * Main handler
 */
module.exports = async (req, res) => {
  const origin = req.headers.origin || req.headers.referer || '';
  const corsHeaders = getCorsHeaders(origin);
  
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }
  
  // Sadece POST kabul et
  if (req.method !== 'POST') {
    res.writeHead(405, { ...corsHeaders, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, error: 'Method Not Allowed' }));
    return;
  }
  
  try {
    // Rate limit kontrolü
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || 
                     req.headers['x-real-ip'] || 
                     req.connection?.remoteAddress || 
                     'unknown';
    
    if (!checkRateLimit(clientIp)) {
      res.writeHead(429, { ...corsHeaders, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        ok: false, 
        error: 'Çok fazla istek. Lütfen 10 dakika sonra tekrar deneyin.' 
      }));
      return;
    }
    
    // API key kontrolü
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY tanımlı değil!');
      res.writeHead(500, { ...corsHeaders, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        ok: false, 
        error: 'Sunucu yapılandırma hatası' 
      }));
      return;
    }
    
    // Body'yi parse et
    let body;
    try {
      if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
      } else {
        body = req.body;
      }
    } catch (e) {
      res.writeHead(400, { ...corsHeaders, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Geçersiz JSON' }));
      return;
    }
    
    // Input validasyonu
    const validationErrors = validateInput(body);
    if (validationErrors.length > 0) {
      res.writeHead(400, { ...corsHeaders, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        ok: false, 
        error: 'Validation hatası',
        details: validationErrors 
      }));
      return;
    }
    
    // Gemini AI çağrısı
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 200,
      }
    });
    
    const prompt = buildPrompt(body);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiMessage = response.text().trim();
    
    // Başarılı yanıt
    res.writeHead(200, { 
      ...corsHeaders, 
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    });
    res.end(JSON.stringify({ 
      ok: true, 
      message: aiMessage 
    }));
    
  } catch (error) {
    console.error('AI generation error:', error);
    
    // Hata yanıtı (stack trace gönderme!)
    res.writeHead(500, { ...corsHeaders, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      ok: false, 
      error: 'AI mesaj oluşturma hatası. Lütfen tekrar deneyin.' 
    }));
  }
};
