import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { cases } from '../src/cases.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = path.join(projectRoot, 'dist');

/** @param {string} value */
function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

/** @param {string} value */
function text(value) {
  return escapeHtml(value);
}

/** @param {string} value */
function attribute(value) {
  return escapeHtml(value);
}

/** @param {(typeof cases)[number]} study @param {number} number */
function renderIndexItem(study, number) {
  return `<a href="#${attribute(study.id)}"><span>${String(number + 1).padStart(2, '0')}</span><strong>${text(study.topic)}</strong><small>${text(study.channel)}</small><span class="index-arrow" aria-hidden="true">↗</span></a>`;
}

/** @param {(typeof cases)[number]['variants'][number]} variant @param {number} number */
function renderVariant(variant, number) {
  const arrowPath = variant.arrowSide === 'left'
    ? '<path d="M181 10C145 13 107 22 66 48"/><path d="m65 48 20-3-7-15"/>'
    : '<path d="M9 10c42 2 94 14 156 38"/><path d="m165 48-19-4 9-15"/>';
  return `<article class="pair-card redesign">
    <div class="hand-note ${attribute(variant.arrowSide)}" aria-hidden="true"><span>${text(variant.annotation)}</span><svg viewBox="0 0 192 58" fill="none"><g stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">${arrowPath}</g></svg></div>
    <figure><div class="image-frame"><img src="${attribute(variant.image)}" alt="${attribute(variant.alt)}" width="1280" height="720" loading="lazy" decoding="async"></div><figcaption><div class="pair-eyebrow"><span class="pair-label">CONCEPT ${text(variant.id.toUpperCase())}</span><span>${text(variant.revision)}</span></div><h4>${text(variant.title)}</h4></figcaption></figure>
    <div class="pair-reason"><span class="angle">${text(variant.angle)}</span><p><strong>Change.</strong> ${text(variant.change)}</p><p><strong>Why.</strong> ${text(variant.reason)}</p></div>
  </article>`;
}

/** @param {(typeof cases)[number]} study */
function renderOriginal(study) {
  const original = study.original;
  const annotated = Boolean(original.issues);
  const arrows = annotated ? `<svg class="original-audit-arrows" viewBox="0 0 1280 720" fill="none" aria-hidden="true" focusable="false">
    <g class="audit-arrow" data-issue-arrow="1"><path d="M4 276C72 277 106 250 176 207"/><path d="m147 213 29-6-17 26"/></g>
    <g class="audit-arrow" data-issue-arrow="2"><path d="M555 495C590 488 626 464 670 429"/><path d="m635 433 35-4-18 31"/></g>
    <g class="audit-arrow" data-issue-arrow="3"><path d="M540 714C605 705 653 682 708 648"/><path d="m678 650 30-2-17 25"/></g>
  </svg>` : '';
  const issues = original.issues ? `<ol class="original-issues" aria-label="Three issues in the captured original">${original.issues.map((issue, index) => `<li><span class="issue-number" aria-hidden="true">0${index + 1}</span><div><strong>${text(issue.label)}</strong><p>${text(issue.detail)}</p></div></li>`).join('')}</ol>` : '';
  const image = `<div class="image-frame${annotated ? ' original-audit-image' : ''}"><img src="${attribute(original.image)}" alt="${attribute(original.alt)}" width="1280" height="720" loading="lazy" decoding="async">${arrows}</div>`;
  return `<article class="pair-card original${annotated ? ' annotated-original' : ''}">
    ${annotated ? '' : '<div class="original-spacer" aria-hidden="true"><span>the starting point</span></div>'}
    <figure${annotated ? ' class="original-audit-figure"' : ''}>${image}<figcaption><div class="pair-eyebrow"><span class="pair-label">ORIGINAL</span><span>Captured source</span></div><h4>${text(original.title)}</h4>${original.note ? `<p class="title-note">${text(original.note)}</p>` : ''}${issues}</figcaption></figure>
    <div class="pair-reason original-caption"><span class="angle">Published source video</span><p>The original is shown as captured for comparison. The redesigns are independent proposals.</p></div>
  </article>`;
}

/** @param {(typeof cases)[number]} study @param {number} number */
function renderCase(study, number) {
  return `<article class="case-study${study.original.issues ? ' annotated-case' : ''}" id="${attribute(study.id)}" aria-labelledby="${attribute(study.id)}-title">
    <header class="case-heading"><div class="case-number">${String(number + 1).padStart(2, '0')} <span>/ 06</span></div><div class="case-heading-main"><p class="eyebrow">${text(study.channel)}</p><h3 id="${attribute(study.id)}-title">${text(study.topic)}</h3></div><a class="video-link" href="${attribute(study.videoUrl)}" target="_blank" rel="noopener noreferrer">Watch source video <span aria-hidden="true">↗</span></a></header>
    <div class="case-explainer"><div><span class="explainer-label">WHAT CHANGED</span><p>${text(study.whatChanged)}</p></div><div><span class="explainer-label">WHY</span><p>${text(study.why)}</p></div></div>
    ${study.original.issues && study.caveat ? `<p class="case-caveat">${text(study.caveat)}</p>` : ''}
    <div class="case-columns-label" aria-hidden="true"><span>THE CAPTURED ORIGINAL</span><span>THREE DIRECTIONS <svg viewBox="0 0 60 22" fill="none"><path d="M2 12c18-9 34-9 53 0m-13-10 13 10-13 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
    <div class="pair-grid">${renderOriginal(study)}${study.variants.map(renderVariant).join('')}</div>
    ${!study.original.issues && study.caveat ? `<p class="case-caveat">${text(study.caveat)}</p>` : ''}
  </article>`;
}

if (cases.length !== 6 || cases.some(study => study.variants.length !== 3)) {
  throw new Error('The approved site requires six cases and three redesigns per case.');
}

const template = await readFile(path.join(projectRoot, 'src', 'template.html'), 'utf8');
const html = template
  .replace('<!-- CASE_INDEX -->', cases.map(renderIndexItem).join('\n'))
  .replace('<!-- CASE_STUDIES -->', cases.map(renderCase).join('\n'));
if (html.includes('<!-- CASE_')) throw new Error('An HTML content marker was not replaced.');

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(path.join(projectRoot, 'src', 'assets'), path.join(outputRoot, 'assets'), { recursive: true });
await writeFile(path.join(outputRoot, 'index.html'), html);
await writeFile(path.join(outputRoot, '.nojekyll'), '');
console.log(`Built ${cases.length} case studies and ${cases.length * 4} image cards in dist/.`);
