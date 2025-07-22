export default async function handler(req, res) {
  const response = await fetch("https://www.logammulia.com/id/harga-emas-hari-ini");
  const html = await response.text();

  const match = html.match(/1 gr<\/td>\s*<td[^>]*>(.*?)<\/td>/);

  if (match) {
    const harga = match[1].replace(/[^\d]/g, "");
    res.status(200).json({ harga: parseInt(harga), sumber: "logammulia" });
  } else {
    // Debug: kirim sebagian isi HTML biar bisa dicek
    res.status(500).json({ error: "Gagal ambil harga", preview: html.slice(0, 1000) });
  }
}
