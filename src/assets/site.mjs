export const PAGE_SIZE = 12;
/** @param {string} value */
export function normalize(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
/** @template {{search: string, topic: string}} T @param {T[]} items @param {string} query @param {string} topic @param {number} page */
export function selectResults(items, query, topic, page = 1) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const matches = items.filter(item => (!topic || item.topic === topic) && words.every(word => normalize(item.search).includes(word)));
  const pages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const currentPage = Math.min(pages, Math.max(1, Number.isFinite(page) ? Math.floor(page) : 1));
  return { matches, visible: matches.slice(0, currentPage * PAGE_SIZE), page: currentPage, hasMore: currentPage < pages };
}

function enhanceArchive() {
  const form = document.querySelector('.archive-controls');
  const search = document.querySelector('#search');
  const topic = document.querySelector('#topic');
  const count = document.querySelector('.result-count');
  const empty = document.querySelector('.empty-state');
  const more = document.querySelector('.show-more');
  if (!(form instanceof HTMLFormElement) || !(search instanceof HTMLInputElement) || !(topic instanceof HTMLSelectElement) || !(count instanceof HTMLElement) || !(empty instanceof HTMLElement) || !(more instanceof HTMLButtonElement)) return;
  const items = Array.from(document.querySelectorAll('.archive-grid .work-card')).filter((card) => card instanceof HTMLElement).map(card => ({ card, search: card.dataset.search ?? '', topic: card.dataset.topic ?? '' }));
  let currentPage = 1;

  /** @param {boolean} updateUrl */
  const update = (updateUrl = true) => {
    const result = selectResults(items, search.value, topic.value, currentPage);
    currentPage = result.page;
    const visible = new Set(result.visible);
    for (const item of items) item.card.hidden = !visible.has(item);
    count.textContent = `${result.matches.length} ${result.matches.length === 1 ? 'case' : 'cases'}${result.matches.length > PAGE_SIZE ? ` · showing ${result.visible.length}` : ''}`;
    empty.hidden = result.matches.length !== 0;
    more.hidden = !result.hasMore;
    const params = new URLSearchParams();
    if (search.value.trim()) params.set('q', search.value.trim());
    if (topic.value) params.set('topic', topic.value);
    if (currentPage > 1) params.set('page', String(currentPage));
    const query = params.toString();
    if (updateUrl) history.replaceState(null, '', location.pathname + (query ? `?${query}` : ''));
    // Carry only the archive's known filters into the case URL, so All work restores the view.
    for (const item of items) {
      const link = item.card.querySelector('a');
      if (link) { const url = new URL(link.href); url.search = query; link.href = url.href; }
    }
    return result;
  };

  const fromUrl = () => {
    const params = new URLSearchParams(location.search);
    search.value = params.get('q') ?? '';
    const filter = params.get('topic') ?? '';
    topic.value = Array.from(topic.options).some(option => option.value === filter) ? filter : '';
    currentPage = Number(params.get('page') ?? 1);
    update(false);
  };
  const reset = () => { search.value = ''; topic.value = ''; currentPage = 1; update(); };
  search.addEventListener('input', () => { currentPage = 1; update(); });
  topic.addEventListener('change', () => { currentPage = 1; update(); });
  form.addEventListener('submit', event => { event.preventDefault(); currentPage = 1; update(); });
  form.addEventListener('reset', event => { event.preventDefault(); reset(); search.focus(); });
  document.querySelector('[data-clear]')?.addEventListener('click', () => { reset(); search.focus(); });
  more.addEventListener('click', () => {
    const previousCount = selectResults(items, search.value, topic.value, currentPage).visible.length;
    currentPage += 1;
    const result = update();
    result.visible[previousCount]?.card.querySelector('a')?.focus();
  });
  window.addEventListener('popstate', fromUrl);
  fromUrl();
  form.hidden = false;
}

function enhanceCaseLinks() {
  const current = new URLSearchParams(location.search);
  const params = new URLSearchParams();
  for (const key of ['q', 'topic', 'page']) { const value = current.get(key); if (value) params.set(key, value); }
  for (const link of Array.from(document.querySelectorAll('.back-to-work'))) {
    if (link instanceof HTMLAnchorElement) { const url = new URL(link.href); url.search = params.toString(); link.href = url.href; }
  }
}

function enhanceThumbnailWall() {
  const wall = document.querySelector('.thumbnail-wall');
  const toggle = wall?.querySelector('.motion-toggle');
  if (!(wall instanceof HTMLElement) || !(toggle instanceof HTMLButtonElement)) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  let inView = false;
  let ready = false;
  /** @type {Promise<void> | undefined} */
  let loading;
  wall.dataset.images = 'loading';
  const update = () => {
    wall.dataset.motion = !ready || paused || reducedMotion.matches || !inView ? 'paused' : 'running';
    toggle.textContent = paused ? 'Resume motion' : 'Pause motion';
    toggle.hidden = reducedMotion.matches;
  };
  const prepareImages = async () => {
    const images = Array.from(wall.querySelectorAll('img'));
    const results = await Promise.all(images.map(async img => {
      img.loading = 'eager';
      try { await img.decode(); return true; } catch { return false; }
    }));
    const failed = new Set(images.filter((_, index) => !results[index]).map(img => img.src));
    for (const row of Array.from(wall.querySelectorAll('.thumbnail-row'))) {
      const rowImages = Array.from(row.querySelectorAll('img'));
      const fallback = rowImages.find(img => !failed.has(img.src));
      if (!fallback) { row.remove(); continue; }
      for (const img of rowImages) if (failed.has(img.src)) img.src = fallback.src;
    }
    await Promise.all(Array.from(wall.querySelectorAll('img')).map(img =>
      img.decode().catch(() => img.closest('.thumbnail-row')?.remove())));
    ready = true;
    wall.dataset.images = 'ready';
    update();
  };
  toggle.addEventListener('click', () => { paused = !paused; update(); });
  reducedMotion.addEventListener('change', update);
  new IntersectionObserver(entries => {
    inView = entries.some(entry => entry.isIntersecting);
    if (inView && !loading) loading = prepareImages();
    update();
  }, { rootMargin: '300px' }).observe(wall);
  update();
}

if (typeof document !== 'undefined') {
  const legacy = document.querySelector('#legacy-cases');
  const fragment = location.hash.slice(1);
  if (legacy instanceof HTMLElement && legacy.dataset.ids?.split(',').includes(fragment)) {
    location.replace(new URL(`work/${fragment}/`, location.href).href);
  } else {
    enhanceArchive();
    enhanceCaseLinks();
    enhanceThumbnailWall();
  }
}
