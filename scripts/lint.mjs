import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { cases } from '../src/cases.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const template = await readFile(path.join(root, 'src', 'template.html'), 'utf8');
const stylesheet = await readFile(path.join(root, 'src', 'assets', 'site.css'), 'utf8');
const provenance = JSON.parse(await readFile(path.join(root, 'asset-provenance.json'), 'utf8'));

/** @param {string} message */
const fail = (message) => { throw new Error(message); };
if (!template.includes('<!-- CONTENT -->') || !template.includes('<!-- HEADER -->') || !template.includes('<!-- FOOTER -->')) fail('Template content slots are missing.');
if (template.includes('CaioFeliceCunha.github.io') || stylesheet.includes('CaioFeliceCunha.github.io')) fail('The data analyst portfolio must remain separate.');
if (!cases.length || cases.some(study => study.variants.length !== 3 || study.original.issues?.length !== 3)) fail('Each case requires three variants and three original critiques.');
if (new Set(cases.map(study => study.id)).size !== cases.length) fail('Duplicate case ID.');
if (provenance.length !== cases.length * 4) fail('Expected four provenance records per case.');
for (const study of cases) {
  if (!/^https:\/\/(www\.)?youtube\.com\/watch\?v=/.test(study.videoUrl)) fail(`Unexpected video URL for ${study.id}.`);
  if (study.variants.map(variant => variant.id).join('') !== 'abc') fail(`A/B/C sequence is missing in ${study.id}.`);
  if (!study.whatChanged || !study.why) fail(`Missing case explanation: ${study.id}.`);
  for (const entry of [study.original, ...study.variants]) {
    if (!entry.title || !entry.alt || !entry.image) fail(`Incomplete title/image pair in ${study.id}.`);
    await access(path.join(root, 'src', entry.image.replace(/^\.\//, '')));
  }
}
if (!stylesheet.includes('prefers-reduced-motion') || !stylesheet.includes('focus-visible')) fail('Accessibility style hooks are missing.');
await access(path.join(root, 'src', 'assets', 'fonts', 'OFL.txt'));
await access(path.join(root, 'src', 'assets', 'fonts', 'Anton-OFL.txt'));
console.log('Static content and asset references passed lint checks.');
