// ============================================================
// Safetagram AI — Cloudflare Worker (Groq Proxy)
// Deploy: https://dash.cloudflare.com → Workers → Edit Code
//
// Settings → Variables → Secret ekle:
//   GROQ_API_KEY = gsk_xxxxxxxxxxxxxxxxxxxx
// ============================================================

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: corsHeaders()
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400, headers: corsHeaders()
    });
  }

  // Groq API isteği
  let groqRes;
  try {
    groqRes = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_API_KEY,
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Groq unreachable', detail: err.message }), {
      status: 502, headers: corsHeaders()
    });
  }

  const data = await groqRes.text();
  const headers = corsHeaders();
  headers['Content-Type'] = groqRes.headers.get('content-type') || 'application/json';
  return new Response(data, { status: groqRes.status, headers });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
