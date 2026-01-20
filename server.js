/**
 * Express Backend Alternatifi (Vercel Serverless yerine)
 * 
 * Kullanım:
 * 1. npm install express cors dotenv @google/generative-ai
 * 2. node server.js
 * 3. http://localhost:3000 adresini aç
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8000', 'http://127.0.0.1:3000', 'http://127.0.0.1:8000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// Rate limiting (basit in-memory)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 dakika
const RATE_LIMIT_MAX_REQUESTS = 30;

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitStore.get(ip) || [];
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  return true;
}

// Input validation
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
    }
  }
  
  if (body.locale && !['tr', 'en'].includes(body.locale)) {
    errors.push('locale "tr" veya "en" olmalı');
  }
  
  return errors;
}

// Prompt builder
function buildPrompt(body) {
  const locale = body.locale || 'tr';
  const age = body.participantAge || 15;
  const sender = body.scenarioSender || 'Arkadaşın';
  
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

// AI Generation Endpoint
app.post('/api/ai/generate', async (req, res) => {
  try {
    // Rate limit
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || 
                     req.headers['x-real-ip'] || 
                     req.ip || 
                     'unknown';
    
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ 
        ok: false, 
        error: 'Çok fazla istek. Lütfen 10 dakika sonra tekrar deneyin.' 
      });
    }
    
    // API key check
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY tanımlı değil!');
      return res.status(500).json({ 
        ok: false, 
        error: 'Sunucu yapılandırma hatası' 
      });
    }
    
    // Validation
    const validationErrors = validateInput(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Validation hatası',
        details: validationErrors 
      });
    }
    
    // Gemini AI call
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 200,
      }
    });
    
    const prompt = buildPrompt(req.body);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiMessage = response.text().trim();
    
    // Success
    res.setHeader('Cache-Control', 'no-store');
    res.json({ 
      ok: true, 
      message: aiMessage 
    });
    
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({ 
      ok: false, 
      error: 'AI mesaj oluşturma hatası. Lütfen tekrar deneyin.' 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    ok: true, 
    message: 'Backend çalışıyor!',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║  🚀 Server Başladı!                                      ║
╠══════════════════════════════════════════════════════════╣
║  📍 URL: http://localhost:${PORT}                        ║
║  🤖 AI Endpoint: http://localhost:${PORT}/api/ai/generate║
║  ❤️  Health: http://localhost:${PORT}/api/health         ║
╚══════════════════════════════════════════════════════════╝
  `);
});
