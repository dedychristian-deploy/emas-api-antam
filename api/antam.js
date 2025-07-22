export default async function handler(req, res) {
  const response = await fetch("https://harga-emas.org/");
  const html = await response.text();

  const match = html.match(/Antam 1 gram(?:.*?)<strong>(.*?)<\/strong>/i);

  if (match) {
    const harga = match[1].replace(/[^\d]/g, "");
    res.status(200).json({ harga: parseInt(harga), sumber: "harga-emas.org" });
  } else {
    res.status(500).json({ error: "Gagal ambil harga", preview: html.slice(0, 1000) });
  }
}
