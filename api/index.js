export default async function handler(req, res) {
  const APPS_SCRIPT_BASE_URL = 'https://script.google.com/macros/s/AKfycbyq5JSyO7LBfCxbNxo97yN9i3MdT8TvHhZaT_NKBm7xJjUH0TSUG4gtqlrqlBoY5qs/exec';
  try {
    const targetUrl = APPS_SCRIPT_BASE_URL + req.url.replace('/api', '');
    const response = await fetch(targetUrl);
    const data = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Proxy error', error: err.toString() });
  }
}
