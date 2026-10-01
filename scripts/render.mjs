import { featured, mainComparison, workOrder, topics } from '../src/presentation.mjs';

/** @typedef {import('../src/cases.mjs').CaseStudy} Study */
/** @typedef {import('../src/cases.mjs').Variant} Variant */
/** @param {string} value */
export function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}
const e = escapeHtml;
const arrow = '<span aria-hidden="true">↗</span>';
const email = 'mailto:caiofcunha@hotmail.com';


/** @param {string} root @param {string} page */
export function renderHeader(root, page) {
  return `<header class="site-header" id="top"><div class="wrap header-inner"><a class="brand" href="${root}" aria-label="The Content Office, home">THE<br>CONTENT<br>OFFICE</a><nav aria-label="Main navigation"><a href="${root}work/"${page === 'work' ? ' aria-current="page"' : ''}>Work</a><a class="approach-link" href="${root}#approach">Approach</a><a class="button header-contact" href="${email}">Send your video ${arrow}</a></nav></div></header>`;
}

/** @param {string} root */
export function renderFooter(root) {
  return `<footer class="site-footer"><div class="wrap"><div class="contact-block" id="contact"><div><p class="eyebrow">YOUR NEXT VIDEO</p><h2>LET’S FIND THE<br>REASON TO WATCH.</h2></div><div class="contact-copy"><p>Share your video or channel link and what you want to change.</p><a class="button" href="${email}">Send your video ${arrow}</a><a class="email-address" href="${email}">caiofcunha@hotmail.com</a></div></div><div class="footer-meta"><p>The Content Office<br><span>YouTube titles &amp; thumbnails.</span></p><a href="${root}work/">Explore the work ${arrow}</a></div></div></footer>`;
}

/** @param {Study['original'] | Variant} item @param {string} root @param {boolean} eager */
function image(item, root, eager = false) {
  return `<img src="${root}${e(item.image.replace(/^\.\//, ''))}" alt="${e(item.alt)}" width="1280" height="720" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
}

/** @param {Study} study */
function originalArrows(study) {
  return `<svg class="original-audit-arrows" viewBox="0 0 1280 720" fill="none" aria-hidden="true" focusable="false">${study.original.issues?.map((issue, index) => {
    const [ox, oy] = issue.arrow.origin;
    const [bx, by] = issue.arrow.bend;
    const [tx, ty] = issue.arrow.target;
    const length = Math.hypot(tx - ox, ty - oy);
    const sx = ox + (tx - ox) * 47 / length;
    const sy = oy + (ty - oy) * 47 / length;
    const tangent = Math.hypot(tx - bx, ty - by);
    const ux = (tx - bx) / tangent;
    const uy = (ty - by) / tangent;
    return `<g class="audit-arrow"><path class="audit-line" d="M${sx} ${sy} Q${bx} ${by} ${tx} ${ty}"/><path class="audit-line" d="M${tx - ux * 37 - uy * 22} ${ty - uy * 37 + ux * 22} ${tx} ${ty} ${tx - ux * 37 + uy * 22} ${ty - uy * 37 - ux * 22}"/><circle class="audit-marker" cx="${ox}" cy="${oy}" r="43"/><text class="audit-number" x="${ox}" y="${oy}">${index + 1}</text></g>`;
  }).join('')}</svg>`;
}

/** @param {Study} study @param {string} root @param {boolean} compact */
function renderOriginal(study, root, compact = false) {
  return `<article class="pair-card original" id="original"><h2 class="pair-label">Original <span>Captured source</span></h2><figure><div class="image-frame original-audit-image">${image(study.original, root, compact)}${originalArrows(study)}</div><figcaption><h3 class="paired-title" lang="${study.language ?? (study.original.note ? 'en' : 'pt-BR')}">${e(study.original.title)}</h3></figcaption></figure><ol class="original-issues" aria-label="Three issues in the original">${study.original.issues?.map((issue, i) => `<li><span class="issue-number" aria-hidden="true">${i + 1}</span><div><strong>${e(issue.label)}</strong>${compact ? '' : `<p>${e(issue.detail)}</p>`}</div></li>`).join('')}</ol></article>`;
}

/** @param {Variant} variant @param {string} root @param {boolean} hero @param {string} language */
function renderVariant(variant, root, hero = false, language = 'pt-BR') {
  const blueArrow = hero && variant.annotationPath ? `<div class="concept-annotation" aria-hidden="true"><span>${e(variant.annotation)}</span><svg viewBox="0 0 1280 720" fill="none"><path d="${e(variant.annotationPath)}"/></svg></div>` : '';
  return `<article class="pair-card redesign" id="concept-${e(variant.id)}"><h2 class="pair-label">Selected concept ${e(variant.id.toUpperCase())}<span>${hero ? '' : e(variant.revision)}</span></h2><figure><div class="image-frame">${image(variant, root, hero)}${blueArrow}</div><figcaption><h3 class="paired-title" lang="${e(language)}">${e(variant.title)}</h3></figcaption></figure>${hero ? '' : `<div class="pair-reason"><p class="concept-note">${e(variant.annotation)}</p><h3>${e(variant.angle)}</h3><p><strong>What changed.</strong> ${e(variant.change)}</p><p><strong>Why.</strong> ${e(variant.reason)}</p></div>`}</article>`;
}

/** @param {Study} study @param {string} root @param {string} variantId @param {2 | 3} heading */
function renderWorkCard(study, root, variantId = 'a', heading = 3) {
  const variant = study.variants.find(item => item.id === variantId) ?? study.variants[0];
  const search = [study.topic, study.channel, study.original.title, study.whatChanged, ...study.variants.map(v => v.title)].join(' ');
  return `<article class="work-card" data-topic="${e(topics[study.id] ?? study.topic)}" data-search="${e(search)}"><a class="work-card-link" href="${root}work/${e(study.id)}/"><div class="image-frame">${image(variant, root)}</div><div class="work-card-heading"><h${heading}>${e(study.topic)}</h${heading}>${arrow}</div><p>${e(study.channel)}</p><span class="view-case">View case</span></a></article>`;
}

/** @param {Study[]} studies */
export function renderHome(studies) {
  const study = studies.find(s => s.id === mainComparison.id);
  if (!study) throw new Error('The featured comparison is missing.');
  const variant = study.variants.find(v => v.id === mainComparison.variant);
  if (!variant) throw new Error('The featured concept is missing.');
  return `<section class="hero" aria-labelledby="hero-title"><div class="wrap"><div class="hero-copy"><div><p class="eyebrow">YOUTUBE TITLES + THUMBNAILS</p><h1 id="hero-title"><span>GOOD VIDEO.</span><span>EASY TO MISS.</span></h1></div><div class="hero-pitch"><p>If the title and thumbnail hide the story, viewers can move on before it starts.</p><p>We study the video, find the strongest reason to watch, and build the title and thumbnail together.</p><a class="button" href="#work">Explore the work <span aria-hidden="true">↓</span></a></div></div><div class="hero-comparison"><div class="comparison-grid">${renderOriginal(study, './', true)}${renderVariant(variant, './', true, study.language)}</div><div class="comparison-bottom"><span>${e(study.topic)}</span><a class="text-link" href="./work/${e(study.id)}/">View the full case ${arrow}</a></div></div></div></section>
    <section class="section wrap" id="work" aria-labelledby="work-title"><span id="case-studies"></span><div class="section-heading"><h2 id="work-title">THE WORK</h2><a class="text-link" href="./work/">View all ${studies.length} cases ${arrow}</a></div><div class="work-grid featured-grid">${featured.map(item => { const s = studies.find(c => c.id === item.id); if (!s) throw new Error('Missing featured case.'); return renderWorkCard(s, './', item.variant); }).join('')}</div></section>
    <section class="approach wrap" id="approach" aria-labelledby="approach-title"><div><p class="eyebrow">THE APPROACH</p><h2 id="approach-title">ONE VIDEO.<br>THREE WAYS IN.</h2></div><ol><li><span>01</span><div><h3>Find the story.</h3><p>Study the source video and identify the strongest reason for its intended viewer to watch.</p></div></li><li><span>02</span><div><h3>Build the pair.</h3><p>Explore three title and thumbnail directions, each grounded in a different part of the video.</p></div></li><li><span>03</span><div><h3>Show the thinking.</h3><p>Explain what changed, why it matters, and how each direction frames the same story.</p></div></li></ol></section><div id="legacy-cases" hidden data-ids="${e(studies.map(s => s.id).join(','))}"></div>`;
}

/** @param {Study[]} studies */
export function renderArchive(studies) {
  const filters = [...new Set(studies.map(s => topics[s.id] ?? s.topic))];
  return `<section class="page-intro wrap"><p class="eyebrow">THE CONTENT OFFICE / SELECTED CONCEPTS</p><h1>THE WORK</h1><p>Start with the idea. See the original, three directions, and the reasoning behind each change.</p></section><section class="archive section wrap" aria-label="Case study archive"><form class="archive-controls" role="search" hidden><div><label for="search">Search the work</label><input id="search" name="q" type="search" placeholder="Try overtime, autumn, Florida…" autocomplete="off"></div><div><label for="topic">Topic</label><select id="topic" name="topic"><option value="">All topics</option>${filters.map(t => `<option>${e(t)}</option>`).join('')}</select></div><button type="reset" class="reset-button">Clear filters</button></form><p class="result-count" role="status" aria-live="polite" aria-atomic="true">${studies.length} cases</p><div class="work-grid archive-grid">${studies.map(s => renderWorkCard(s, '../', workOrder.find(f => f.id === s.id)?.variant, 2)).join('')}</div><div class="empty-state" hidden><h2>No matching cases.</h2><p>Try a different search or clear the filters to see all the work.</p><button class="button button-dark" type="button" data-clear>Show all cases</button></div><button type="button" class="button button-dark show-more" hidden>Show more cases</button><noscript><p>All cases are shown. Search and topic filtering are available with JavaScript enabled.</p></noscript></section>`;
}

/** @param {Study} study @param {number} index @param {Study[]} studies */
export function renderCase(study, index, studies) {
  const next = studies[(index + 1) % studies.length];
  return `<article class="case-study wrap" id="${e(study.id)}"><header class="case-intro"><a class="back-to-work text-link" href="../">← All work</a><p class="eyebrow">${String(index + 1).padStart(2, '0')} / ${String(studies.length).padStart(2, '0')} &nbsp; ${e(study.channel)}</p><h1>${e(study.topic)}</h1><a class="video-link text-link" href="${e(study.videoUrl)}" target="_blank" rel="noopener noreferrer">Watch source video ${arrow}</a></header><div class="case-explainer"><div><h2>What changed</h2><p>${e(study.whatChanged)}</p></div><div><h2>Why</h2><p>${e(study.why)}</p></div></div><nav class="case-jumps" aria-label="Jump to a comparison"><a href="#original">Original</a>${study.variants.map(v => `<a href="#concept-${v.id}">Concept ${v.id.toUpperCase()}</a>`).join('')}</nav><div class="pair-grid">${renderOriginal(study, '../../')}${study.variants.map(v => renderVariant(v, '../../', false, study.language)).join('')}</div><nav class="case-next" aria-label="More case studies"><a class="back-to-work text-link" href="../">← All work</a><a class="text-link" href="../${e(next.id)}/">Next: ${e(next.topic)} ${arrow}</a></nav><p class="portfolio-notice">This channel is not a client of The Content Office. This project is for portfolio purposes only.</p></article>`;
}
