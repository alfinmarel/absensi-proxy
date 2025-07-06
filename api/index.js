export default async function handler(req, res) {
  try {
    const { action } = req.query;
    if (!action) {
      return res.status(400).json({ error: "Missing action parameter" });
    }
    // Ganti URL di bawah dengan URL Web Apps Script kamu
    const scriptUrl = `https://script.google.com/macros/s/AKfycbwOR7PqwXYJJY-s2jsucRLwTXKPMYGKRoiVYWUjYWd6rNFSPNSL5TuAzJUKzICdtkj-/exec?action=${action}`;
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
}
