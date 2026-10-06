import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exampleCatalog, runExample } from './examples/catalog.mjs';
import { planCleavage } from './adapters/idealized-cleavage.mjs';
import { planFiniteState } from './adapters/finite-state.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, '../web');
const port = Number(process.env.PORT ?? process.argv[2] ?? 8787);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
};

function json(res, status, value) {
  const body = JSON.stringify(value, null, 2);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'content-length': Buffer.byteLength(body),
    'cache-control': 'no-store',
  });
  res.end(body);
}

async function readJson(req, limit = 2_000_000) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw new Error('Request body too large.');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

async function api(req, res, pathname) {
  if (req.method === 'GET' && pathname === '/api/examples') {
    return json(res, 200, { examples: exampleCatalog });
  }
  if (req.method === 'POST' && pathname === '/api/run-example') {
    const body = await readJson(req);
    return json(res, 200, runExample(body.id));
  }
  if (req.method === 'POST' && pathname === '/api/plan-cleavage') {
    const body = await readJson(req);
    const result = planCleavage(body.scenario, body.objective ?? { remove: 'all-nontarget' }, body.options ?? {});
    return json(res, 200, { mode: 'custom-cleavage', result });
  }
  if (req.method === 'POST' && pathname === '/api/plan-transition-network') {
    const body = await readJson(req);
    const result = planFiniteState(body.scenario, body.options ?? {});
    return json(res, 200, { mode: 'custom-transition-network', result });
  }
  return false;
}

async function staticFile(res, pathname) {
  let rel = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  rel = path.normalize(rel).replace(/^\.\.(?:[\\/]|$)/, '');
  const file = path.resolve(webRoot, rel);
  if (!file.startsWith(webRoot + path.sep) && file !== webRoot) return false;
  try {
    const data = await fs.readFile(file);
    res.writeHead(200, {
      'content-type': types[path.extname(file)] ?? 'application/octet-stream',
      'content-length': data.length,
      'cache-control': path.extname(file) === '.html' ? 'no-store' : 'public, max-age=300',
      'x-content-type-options': 'nosniff',
      'referrer-policy': 'no-referrer',
    });
    res.end(data);
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`);
    if (url.pathname.startsWith('/api/')) {
      const handled = await api(req, res, url.pathname);
      if (handled !== false) return;
      return json(res, 404, { error: 'Unknown API endpoint.' });
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { error: 'Method not allowed.' });
    if (await staticFile(res, url.pathname)) return;
    json(res, 404, { error: 'Not found.' });
  } catch (error) {
    json(res, 400, { error: error?.message ?? String(error) });
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Glycan Protocol Planner: http://127.0.0.1:${port}`);
});
