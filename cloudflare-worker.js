// ============================================================
// Safetagram AI — Cloudflare Worker (Groq Proxy)
// Deploy: https://dash.cloudflare.com → Workers → Edit Code
//
// Environment variable olarak ekle:
//   GROQ_API_KEY = gsk_xxxxxxxxxxxxxxxxxxxx
// ============================================================

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const ALLOWED_ORIGINS = [
  'https://safetagram.m-farukerdogan.workers.dev', // gerekirse kendi domain'ini ekle
];

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return corsResponse(null, 204);
    }

    if (request.method !== 'POST') {
      return corsResponse(JSON.stringify({ error: 'Method not allowed' }), 405);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return corsResponse(JSON.stringify({ error: 'Invalid JSON' }), 400);
    }

    // Groq API isteği
    let groqRes;
    try {
      groqRes = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.GROQ_API_KEY}`,
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      return corsResponse(JSON.stringify({ error: 'Groq unreachable', detail: err.message }), 502);
    }

    const data = await groqRes.text();
    return corsResponse(data, groqRes.status, groqRes.headers.get('content-type') || 'application/json');
  }
};

function corsResponse(body, status = 200, contentType = 'application/json') {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
