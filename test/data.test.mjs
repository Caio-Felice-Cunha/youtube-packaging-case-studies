import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { cases } from '../src/cases.mjs';
import { selectResults } from '../src/assets/site.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const provenance = JSON.parse(await readFile(path.join(root, 'asset-provenance.json'), 'utf8'));

test('an archive of 100 cases stays bounded, combines filters and normalizes accents', () => {
  const fixture = Array.from({ length: 100 }, (_, index) => ({ search: `Case ${index} Canadá résumé`, topic: index % 2 ? 'Work' : 'Life' }));
  assert.equal(selectResults(fixture, '', '', 1).visible.length, 12);
  assert.equal(selectResults(fixture, '', '', 2).visible.length, 24);
  assert.equal(selectResults(fixture, '', '', 99).visible.length, 100);
  assert.equal(selectResults(fixture, '', '', 99).hasMore, false);
  const filtered = selectResults(fixture, 'canada resume', 'Work', 1);
  assert.equal(filtered.matches.length, 50);
  assert.equal(filtered.visible.length, 12);
  assert.equal(selectResults(fixture, 'no-match', '', 1).matches.length, 0);
  assert.equal(selectResults(fixture, '', '', NaN).page, 1);
});

test('eleven curated cases expose every original and A/B/C pair', () => {
  assert.deepEqual(cases.map(study => study.id), ['start-before-ready', 'cost-of-overtime', 'halloween-at-home', 'autumn-colour-plan', 'florida-seed-starts', 'seven-platforms', 'canadian-resume', 'first-car', 'starting-over', 'tampa-future', 'two-countries']);
  assert.equal(cases.flatMap(study => [study.original, ...study.variants]).length, 44);
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
  assert.equal(provenance.length, 44);
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
  assert.equal(new Set(provenance.map(item => item.webSha256)).size, 44);
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


test('English pairs retain the exact captured titles, selected revisions and source bindings', () => {
  const selected = [
    ['start-before-ready', 'a', 'A-thumbnail-r05.jpg', '99c143c3aabd600df1e979ac8966fd001dcef69e96556fa348214a49dc9c6dc5'],
    ['cost-of-overtime', 'a', 'A-r23.jpg', 'b6f237a79ea7f9f70a797924e203b8fcdb1f325591f791f03b9484cb6cccb87c'],
    ['halloween-at-home', 'a', 'A-final-background-r16.png', 'e75ece5159ddb3e87091cf132fa544fbbb6fa291049d44ed689aba2c60d5f20c'],
    ['halloween-at-home', 'b', 'B-final-r02.png', '5454575c0197810f807b5961129de848fce1659a83a0c51e01e5594c158f19e7'],
    ['autumn-colour-plan', 'b', 'B-recording-room-preview.jpg', 'f755190d1b51890237c8ca018c7823e3df3478d625096837534fa5f4f501a1e5'],
    ['autumn-colour-plan', 'c', 'C-thumbnail-r05.jpg', '9518cb9e87f334c97c9d6a0f81db50b62ea7f5c0b291435d1af510008c4a9be0'],
    ['florida-seed-starts', 'a', 'A.png', '1e0b8beb63424cf0e8e27dc40f2e052d90618b0e1f5384fcc75c3f7ec0ecf532'],
    ['florida-seed-starts', 'c', 'C.png', 'e794a80edd9fb321cbccdf38ce727d5e1749ea30ec89a42b770cf27f48d22489'],
    ['florida-seed-starts', 'b', 'B-v2.png', 'e9ba5543f27d14290403e20c02849edb22103f7adc097d3f9b4306aff81372a8']
  ];
  for (const [id, role, filename, digest] of selected) {
    const study = cases.find(s => s.id === id);
    assert.equal(study.language, 'en');
    for (const [index, card] of [study.original, ...study.variants].entries()) {
      const record = provenance.find(item => item.case === id && item.role === ['original', 'a', 'b', 'c'][index]);
      assert.ok(record);
      assert.equal(card.image, record.webPath.replace(/^src\//, './'));
      assert.equal(card.title, record.pairedTitle);
      if (index) assert.equal(card.revision, record.sourceRevision);
    }
    const cover = provenance.find(item => item.case === id && item.role === role);
    assert.ok(cover.sourcePath.endsWith('/' + filename));
    assert.equal(cover.sourceSha256, digest);
  }
  const hero = cases.find(s => s.id === 'start-before-ready');
  assert.equal(cases.find(s => s.id === 'cost-of-overtime').variants[2].title, 'This Changed What Overtime Was Worth');
  assert.equal(cases.find(s => s.id === 'autumn-colour-plan').variants[2].title, 'Starting Over: The First Step In My Autumn Capsule');
  assert.equal(hero.original.title, 'Give me 104 seconds... I’ll DELETE your need to feel ready');
  const original = provenance.find(item => item.case === hero.id && item.role === 'original');
  assert.ok(original.sourcePath.endsWith('/channel-dGCgbkmr69k.jpg'));
  assert.equal(original.sourceSha256, '53ab33b6e03ce1fdeccde4e6be29056077544f4a65adbf16fc6862417d6ec7e5');
  assert.deepEqual(original.webSize, [480, 270]);
  assert.ok(hero.variants[0].annotationPath);
});
