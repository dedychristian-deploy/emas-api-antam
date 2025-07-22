export default async function handler(req, res) {
  const response = await fetch("https://www.logammulia.com/id/harga-emas-hari-ini");
  const html = await response.text();

  const match = html.match(/1 gr<\/td>\s*<td[^>]*>(.*?)<\/td>/);

  if (match) {
    const harga = match[1].replace(/[^\d]/g, ""); // bersihin Rp & titik
    res.status(200).json({ harga: parseInt(harga), sumber: "logammulia" });
  } else {
    res.status(500).json({ error: "Gagal ambil harga" });
  }
}
