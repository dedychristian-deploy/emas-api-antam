import express from "express";
import puppeteer from "puppeteer";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/antam", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto("https://www.logammulia.com/id/harga-emas-hari-ini", { waitUntil: "networkidle2" });

    const harga = await page.evaluate(() => {
      const row = [...document.querySelectorAll("table tr")]
        .find(tr => tr.innerText.includes("1 gr"));
      return row ? row.querySelector("td:nth-child(2)")?.innerText : null;
    });

    await browser.close();

    if (harga) {
      const clean = harga.replace(/[^\d]/g, "");
      res.json({ harga: parseInt(clean), sumber: "logammulia" });
    } else {
      res.status(500).json({ error: "Harga tidak ditemukan" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Antam Scraper API is running.");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
