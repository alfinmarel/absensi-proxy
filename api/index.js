const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const PORT = 3000;

// Proxy endpoint
app.get('/api', async (req, res) => {
  const { action } = req.query;
  if (!action) {
    return res.status(400).json({ error: 'Missing action parameter' });
  }
  // Ganti URL di bawah dengan URL Web Apps Script kamu
  const scriptUrl = `https://script.google.com/macros/s/AKfycbyq5JSyO7LBfCxbNxo97yN9i3MdT8TvHhZaT_NKBm7xJjUH0TSUG4gtqlrqlBoY5qs/exec?action=${action}`;
  try {
    const response = await fetch(scriptUrl);
    const text = await response.text();
    if (text.trim().startsWith('<')) {
      return res.status(502).json({ error: "Apps Script error", detail: text });
    }
    const data = JSON.parse(text);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Proxy error", detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on http://localhost:${PORT}`);
});
