// api/index.js
export default async function handler(req, res) {
  try {
    const { action } = req.query;
    if (!action) {
      return res.status(400).json({ error: "Missing action parameter" });
    }

    // Ganti URL di bawah dengan URL Web Apps Script kamu
    const scriptUrl = `https://script.google.com/macros/s/AKfycbyq5JSyO7LBfCxbNxo97yN9i3MdT8TvHhZaT_NKBm7xJjUH0TSUG4gtqlrqlBoY5qs/exec?action=${action}`;

    const response = await fetch(scriptUrl);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Proxy error", detail: error.message });
  }
}
