import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const prefix = '/youtube-packaging-case-studies';
const mime = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.css', 'text/css; charset=utf-8'],
  ['.svg', 'image/svg+xml'], ['.webp', 'image/webp'], ['.ttf', 'font/ttf'],
  ['.txt', 'text/plain; charset=utf-8']
]);

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', 'http://127.0.0.1');
    if (!url.pathname.startsWith(`${prefix}/`) && url.pathname !== prefix) {
      response.writeHead(404).end('Not found');
      return;
    }
    const relative = decodeURIComponent(url.pathname.slice(prefix.length)).replace(/^\/+/, '') || 'index.html';
    const file = path.resolve(root, relative);
    if (!file.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': mime.get(path.extname(file)) ?? 'application/octet-stream', 'Cache-Control': 'no-store' }).end(body);
  } catch {
    response.writeHead(404).end('Not found');
  }
});

server.listen(4191, '127.0.0.1', () => console.log(`Serving ${prefix}/ at http://127.0.0.1:4191${prefix}/`));
