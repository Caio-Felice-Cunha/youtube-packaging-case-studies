import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { cases } from '../src/cases.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const provenance = JSON.parse(await readFile(path.join(root, 'asset-provenance.json'), 'utf8'));

test('six approved cases expose every original and A/B/C pair', () => {
  assert.deepEqual(cases.map(study => study.id), ['seven-platforms', 'canadian-resume', 'first-car', 'starting-over', 'tampa-future', 'two-countries']);
  assert.equal(cases.flatMap(study => [study.original, ...study.variants]).length, 24);
  for (const study of cases) {
    assert.deepEqual(study.variants.map(variant => variant.id), ['a', 'b', 'c']);
    assert.ok(study.whatChanged && study.why);
  }
});

test('every web image is recorded and byte-stable', async () => {
  assert.equal(provenance.length, 24);
  for (const item of provenance) {
    assert.match(item.sourcePath, /^(agency|agency-assets)\//);
    assert.match(item.sourceSha256, /^[0-9a-f]{64}$/);
    assert.match(item.webSha256, /^[0-9a-f]{64}$/);
    const file = path.join(root, item.webPath);
    const digest = createHash('sha256').update(await readFile(file)).digest('hex');
    assert.equal(digest, item.webSha256, item.webPath);
    assert.ok((await stat(file)).size < 400_000, `oversized site image: ${item.webPath}`);
  }
});

test('sensitive source notes and portfolio crossover stay out of public copy', () => {
  assert.match(cases.find(study => study.id === 'canadian-resume').original.note, /localized.*not verified/i);
  assert.match(cases.find(study => study.id === 'two-countries').caveat, /publisher.*not confirmed/i);
  const copy = JSON.stringify(cases);
  assert.doesNotMatch(copy, /CaioFeliceCunha\.github\.io|C:\\Users\\|(?:live[- ]tested|measured (?:lift|improvement))/i);
});
