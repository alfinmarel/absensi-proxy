export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const action = req.method === 'POST' ? req.body?.action : req.query.action;
    if (!action) {
      return res.status(400).json({ error: 'Missing action parameter' });
    }
    // Ganti URL di bawah dengan URL Web Apps Script kamu
    const scriptUrl = `https://script.google.com/macros/s/AKfycbwOR7PqwXYJJY-s2jsucRLwTXKPMYGKRoiVYWUjYWd6rNFSPNSL5TuAzJUKzICdtkj-/exec?action=${action}`;
    const response = await fetch(scriptUrl, {
      method: 'GET',
    });
    const text = await response.text();
    if (text.trim().startsWith('<')) {
      return res.status(502).json({ error: 'Apps Script error', detail: text });
    }
    const data = JSON.parse(text);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Proxy error', detail: error.message });
  }
} 
