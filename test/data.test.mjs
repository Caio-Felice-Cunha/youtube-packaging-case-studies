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
    assert.equal(study.original.issues?.length, 3, `${study.id} needs three original critiques`);
    for (const issue of study.original.issues) {
      assert.ok(issue.label && issue.detail);
      for (const point of [issue.arrow.origin, issue.arrow.bend, issue.arrow.target]) {
        assert.ok(point[0] >= 0 && point[0] <= 1280 && point[1] >= 0 && point[1] <= 720, `${study.id} has an off-image critique arrow`);
      }
    }
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

test('Tampa source and selected A/B/C titles stay bound to the exact handoff files', () => {
  const tampa = cases.find(study => study.id === 'tampa-future');
  assert.ok(tampa);
  const expected = [
    ['original', 'youtube-original-2026-09-29.jpg', '17e49dc96cc8085f41d0c2770099814eb817b12ca861b50f880c4699eabaafa3', 'Tampa está mudando: 18 novidades que você precisa conhecer'],
    ['a', 'A_thumbnail.png', '2b9bace9c9de77398c47d94ef69de9c76736fb8d3a0de62864e1275cf94fc5df', 'Você moraria em Tampa Bay sem conhecer estas 18 mudanças?'],
    ['b', 'B_thumbnail.png', '5ee485e7b86efe8cbc389672158a72786a2d88fca265c0552ef3d59803cba12b', 'Tampa Bay está crescendo — mas como fica a vida de quem mora lá?'],
    ['c', 'C_thumbnail.png', 'f3749fb8c5b7bbe6381359968b72deccfc76f99c1cdd19b59cfc054fb1fb12c6', '18 mudanças em Tampa Bay: o que existe além dos novos prédios?']
  ];
  const cards = [tampa.original, ...tampa.variants];
  for (const [index, [role, sourceName, sourceHash, title]] of expected.entries()) {
    const record = provenance.find(item => item.case === tampa.id && item.role === role);
    assert.ok(record, `missing provenance for Tampa ${role}`);
    assert.ok(record.sourcePath.endsWith(`/${sourceName}`));
    assert.equal(record.sourceSha256, sourceHash);
    assert.equal(record.webPath.replace(/^src\//, './'), cards[index].image);
    assert.equal(cards[index].title, title);
  }
  assert.equal(new Set(provenance.map(item => item.webSha256)).size, 24);
  assert.deepEqual(tampa.original.issues?.map(issue => issue.detail), [
    'Orlando leads, but this video is about Tampa’s 18 changes.',
    '“CONHEÇA” is partly covered by the presenters.',
    '“TAMPA 2026” dominates while the 18-change hook is missing.'
  ]);
  assert.match(tampa.caveat, /selected evaluation concepts.*AI-treated portraits.*likeness has not been verified.*not creator-endorsed, uploaded, or live-tested/i);
});

test('sensitive source notes and portfolio crossover stay out of public copy', () => {
  assert.match(cases.find(study => study.id === 'canadian-resume').original.note, /localized.*not verified/i);
  assert.match(cases.find(study => study.id === 'two-countries').caveat, /publisher.*not confirmed/i);
  const copy = JSON.stringify(cases);
  assert.doesNotMatch(copy, /CaioFeliceCunha\.github\.io|C:\\Users\\|measured (?:lift|improvement)/i);
});
