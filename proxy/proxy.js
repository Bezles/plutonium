const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/", (req, res) => {
  res.send("Proxy ready. Use: /proxy?url=https://example.com");
});

app.get("/proxy", async (req, res) => {
  const { url } = req.query;

  if (!url || !url.startsWith("http")) {
    return res.status(400).send("Missing or invalid URL");
  }

  try {
    const result = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"
      }
    });

    const html = await result.text();
    const contentType = result.headers.get("content-type") || "text/html";

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", contentType);
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching page");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
