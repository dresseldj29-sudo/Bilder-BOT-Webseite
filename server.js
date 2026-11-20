const http = require("node:http");
const https = require("node:https");

const PORT = Number(process.env.PORT || 3000);
const TARGET = process.env.BOT_DASHBOARD_URL || "https://dc-bilder-production.up.railway.app";

let target;
try {
  target = new URL(TARGET);
  if (!["http:", "https:"].includes(target.protocol)) throw new Error("Nur HTTP(S) ist erlaubt.");
} catch (error) {
  console.error("[PROXY] BOT_DASHBOARD_URL ist ungültig:", error.message);
  process.exit(1);
}

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
    return res.end(JSON.stringify({ ok: true, service: "bilder-bot-webseite", proxyTarget: target.host }));
  }

  const transport = target.protocol === "https:" ? https : http;
  const headers = { ...req.headers, host: target.host };
  delete headers.connection;
  headers["x-forwarded-host"] = req.headers.host || "";
  headers["x-forwarded-proto"] = "https";

  const upstream = transport.request({
    protocol: target.protocol,
    hostname: target.hostname,
    port: target.port || (target.protocol === "https:" ? 443 : 80),
    method: req.method,
    path: req.url,
    headers,
    timeout: 30000
  }, upstreamRes => {
    res.writeHead(upstreamRes.statusCode || 502, upstreamRes.headers);
    upstreamRes.pipe(res);
  });

  upstream.on("timeout", () => upstream.destroy(new Error("Zeitüberschreitung beim Bot-Server.")));
  upstream.on("error", error => {
    console.error("[PROXY] Verbindung zum Bot fehlgeschlagen:", error.message);
    if (!res.headersSent) res.writeHead(502, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "Der Bilder-BOT ist gerade nicht erreichbar. Bitte später erneut versuchen." }));
  });
  req.pipe(upstream);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("[PROXY] Bilder-BOT-Webseite läuft auf Port " + PORT + " und leitet an " + target.origin + " weiter.");
});
