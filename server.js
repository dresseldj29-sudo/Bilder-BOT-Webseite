const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'};
const server = http.createServer((req,res) => {
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const requested = pathname === '/' ? '/index.html' : pathname;
  const file = path.resolve(root, '.' + requested);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file,(err,data) => {
    if (err) { res.writeHead(404,{'content-type':'text/plain; charset=utf-8'}); return res.end('Nicht gefunden'); }
    res.writeHead(200,{'content-type':types[path.extname(file)] || 'application/octet-stream','cache-control':'no-store'});
    res.end(data);
  });
});
const port = Number(process.env.PORT || 3000);
server.listen(port,'0.0.0.0',() => console.log('Bilder-BOT-Webseite läuft auf Port ' + port));