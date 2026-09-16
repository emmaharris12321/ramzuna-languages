// Rewrite the Astro static build's root-absolute paths ("/about", "/_astro/x.css", ...)
// into depth-correct relative paths, so the whole dist/ folder can be hosted from any
// subpath (e.g. as a set of static files served together, not just from a domain root).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = path.resolve('./dist');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(await walk(full));
    else files.push(full);
  }
  return files;
}

function depthOf(htmlFile) {
  const rel = path.relative(DIST, htmlFile);
  const dir = path.dirname(rel);
  if (dir === '.' || dir === '') return 0;
  return dir.split(path.sep).length;
}

function toRelative(target, depth) {
  let hash = '';
  let p = target;
  const hIdx = p.indexOf('#');
  if (hIdx !== -1) {
    hash = p.slice(hIdx);
    p = p.slice(0, hIdx);
  }
  p = p.slice(1);
  if (p.endsWith('/')) p = p.slice(0, -1);
  if (p === '') {
    p = 'home.html'; // root "/" maps to the renamed home page (avoids clashing with the artifact's own main-slot "index.html")
  } else {
    const lastSeg = p.split('/').pop();
    if (!lastSeg.includes('.')) p = p + '/index.html';
  }
  const prefix = '../'.repeat(depth);
  return prefix + p + hash;
}

async function main() {
  const allFiles = await walk(DIST);
  const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));
  const attrRe = /(href|src)="(\/[^"]*)"/g;

  for (const f of htmlFiles) {
    let content = await readFile(f, 'utf8');
    const depth = depthOf(f);
    content = content.replace(attrRe, (whole, attr, target) => {
      if (target.startsWith('//')) return whole;
      return `${attr}="${toRelative(target, depth)}"`;
    });
    await writeFile(f, content, 'utf8');
  }
  console.log('Rewrote', htmlFiles.length, 'html files to use relative paths.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
