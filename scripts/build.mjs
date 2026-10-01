import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { publishedCases as cases, unpublishedCaseIds } from '../src/cases.mjs';
import { workOrder } from '../src/presentation.mjs';
import { renderHome, renderArchive, renderCase, renderHeader, renderFooter, escapeHtml } from './render.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = path.join(projectRoot, 'dist');
const priorities = new Map(workOrder.map((item, index) => [item.id, index]));
const orderedCases = [...cases].sort((a, b) => (priorities.get(a.id) ?? workOrder.length) - (priorities.get(b.id) ?? workOrder.length));
if (!cases.length || cases.some(study => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(study.id) || study.variants.length !== 3 || study.original.issues?.length !== 3)) {
  throw new Error('Each case needs a safe ID, three selected concepts and three original critiques.');
}
if (new Set(cases.map(study => study.id)).size !== cases.length) throw new Error('Duplicate case IDs.');
const template = await readFile(path.join(projectRoot, 'src/template.html'), 'utf8');
// Only this known build-output directory may be replaced.
if (outputRoot !== path.resolve(projectRoot, 'dist')) throw new Error('Unexpected build output path.');
await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
const withheldAssets = unpublishedCaseIds.map(id => path.join(projectRoot, 'src/assets/cases', id));
await cp(path.join(projectRoot, 'src/assets'), path.join(outputRoot, 'assets'), {
  recursive: true,
  filter: source => !withheldAssets.some(dir => source === dir || source.startsWith(dir + path.sep))
});

/** @param {string} route @param {string} title @param {string} description @param {string} content @param {string} page */
async function writePage(route, title, description, content, page) {
  const depth = route.split('/').filter(Boolean).length;
  const root = depth ? '../'.repeat(depth) : './';
  const values = { ROOT: root, TITLE: title, DESCRIPTION: description, CANONICAL: `https://thecontentoffice.studio/${route}`, PAGE: page };
  const html = template.replace(/\{\{(ROOT|TITLE|DESCRIPTION|CANONICAL|PAGE)\}\}/g, (_, key) => escapeHtml(values[/** @type {keyof typeof values} */ (key)]))
    .replace('<!-- HEADER -->', renderHeader(root, page))
    .replace('<!-- FOOTER -->', renderFooter(root))
    .replace('<!-- CONTENT -->', content);
  if (html.includes('{{') || /<!-- (HEADER|FOOTER|CONTENT) -->/.test(html)) throw new Error('Unfilled document slot.');
  const dir = path.join(outputRoot, route);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}

await writePage('', 'The Content Office — YouTube titles & thumbnails', 'Good video. Easy to miss. We study the video, find the strongest reason to watch, and build the title and thumbnail together.', renderHome(orderedCases), 'home');
await writePage('work/', 'The work — The Content Office', 'Explore title and thumbnail concepts. Browse the original, three selected directions, and the thinking behind each change.', renderArchive(orderedCases), 'work');
for (const [index, study] of orderedCases.entries()) {
  await writePage(`work/${study.id}/`, `${study.topic} — The Content Office`, study.whatChanged, renderCase(study, index, orderedCases), 'case');
}
await writeFile(path.join(outputRoot, '.nojekyll'), '');
console.log(`Built home, work index and ${cases.length} case pages with ${cases.length * 4} source-bound assets.`);
