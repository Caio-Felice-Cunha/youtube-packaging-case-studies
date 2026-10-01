import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { cases } from '../src/cases.mjs';

const expectedOrder = ['start-before-ready', 'cost-of-overtime', 'halloween-at-home', 'autumn-colour-plan', 'florida-seed-starts', 'tampa-future', 'starting-over', 'two-countries', 'first-car', 'seven-platforms', 'canadian-resume'];

test('Working Wall home leads with Kyle original/A and the selected English cards', async ({ page }) => {
  const hero = cases.find(study => study.id === 'start-before-ready');
  await page.goto('./');
  await expect(page.locator('#hero-title')).toHaveText('GOOD VIDEO.EASY TO MISS.');
  await expect(page.locator('.hero-pitch')).toContainText('We study the video');
  await expect(page.locator('.featured-grid .work-card')).toHaveCount(3);
  await expect(page.locator('.hero-comparison .paired-title')).toHaveText([hero.original.title, hero.variants[0].title]);
  await expect(page.locator('.hero-comparison img').nth(0)).toHaveAttribute('src', hero.original.image);
  await expect(page.locator('.hero-comparison img').nth(1)).toHaveAttribute('src', hero.variants[0].image);
  await expect(page.locator('.case-caveat, .work-disclosure, .concept-status, .title-note')).toHaveCount(0);
  await expect(page.locator('.concept-annotation')).toContainText(hero.variants[0].annotation);
  await expect(page.getByRole('link', { name: 'View the full case' })).toHaveAttribute('href', './work/start-before-ready/');
  await expect(page.locator('.featured-grid h3')).toHaveText(['The cost of one more shift', 'When Halloween takes over', 'A wardrobe that feels like you']);
  expect(await page.locator('.featured-grid .work-card-link').evaluateAll(links => links.map(link => link.getAttribute('href')))).toEqual(expectedOrder.slice(1, 4).map(id => './work/' + id + '/'));
  expect(await page.locator('.featured-grid img').evaluateAll(images => images.map(img => img.getAttribute('src')))).toEqual(['./assets/cases/cost-of-overtime/a.webp', './assets/cases/halloween-at-home/b.webp', './assets/cases/autumn-colour-plan/b.webp']);
  await expect(page.locator('.hero-comparison .audit-arrow')).toHaveCount(3);
  await expect(page.locator('.hero-comparison .original-issues li')).toHaveCount(3);
  await expect(page.locator('.header-contact')).toBeVisible();
  await expect(page.locator('.header-contact')).toHaveAttribute('href', 'mailto:caiofcunha@hotmail.com');
  await expect(page.locator('.hero-comparison .original')).not.toContainText('Independent concept');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => innerWidth));
});

test('all eleven direct cases retain their pairs and a discreet portfolio notice', async ({ page }, testInfo) => {
  const failed = [];
  page.on('response', response => { if (response.status() >= 400) failed.push(response.url()); });
  for (const study of cases) {
    await page.goto('work/' + study.id + '/');
    await expect(page.locator('.paired-title')).toHaveText([study.original.title, ...study.variants.map(v => v.title)]);
    await expect(page.locator('.pair-card')).toHaveCount(4);
    const expectedLanguages = [study.language ?? (study.original.note ? 'en' : 'pt-BR'), ...study.variants.map(() => study.language ?? 'pt-BR')];
    expect(await page.locator('.paired-title').evaluateAll(titles => titles.map(title => title.lang))).toEqual(expectedLanguages);
    const position = expectedOrder.indexOf(study.id);
    await expect(page.locator('.case-intro .eyebrow')).toContainText(String(position + 1).padStart(2, '0') + ' / 11');
    await expect(page.locator('.case-next a').last()).toHaveAttribute('href', '../' + expectedOrder[(position + 1) % expectedOrder.length] + '/');
    await expect(page.locator('.audit-arrow')).toHaveCount(3);
    await expect(page.locator('.audit-number')).toHaveText(['1', '2', '3']);
    await expect(page.locator('.original-issues li')).toHaveCount(3);
    await expect(page.locator('.audit-line').first()).toHaveCSS('stroke', 'rgb(180, 35, 45)');
    await expect(page.locator('.video-link')).toHaveAttribute('href', study.videoUrl);
    await expect(page.locator('.case-caveat, .case-disclosure, .concept-status, .title-note')).toHaveCount(0);
    await expect(page.locator('.case-next + .portfolio-notice')).toHaveText('This channel is not a client of The Content Office. This project is for portfolio purposes only.');
    const pairs = [study.original, ...study.variants];
    for (const [index, img] of (await page.locator('.pair-card img').all()).entries()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveAttribute('src', '../../' + pairs[index].image.slice(2));
      await expect(img).toHaveAttribute('alt', pairs[index].alt);
      await expect(img).toHaveJSProperty('complete', true);
      expect(await img.evaluate(el => el.naturalWidth)).toBeGreaterThan(0);
      const box = await img.boundingBox();
      expect(Math.abs(box.width / box.height - 16 / 9)).toBeLessThan(.015);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => innerWidth));
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: testInfo.outputPath(study.id + '.png'), fullPage: true });
  }
  expect(failed).toEqual([]);
});

test('archive search, topic, empty state and return filters work', async ({ page }) => {
  await page.goto('work/');
  await expect(page.locator('.work-card:visible')).toHaveCount(11);
  expect(await page.locator('.archive-grid .work-card-link').evaluateAll(links => links.map(link => link.href))).toEqual(expectedOrder.map(id => new URL(id + '/', page.url()).href));
  await page.getByLabel('Search the work').fill('resume');
  await expect(page.locator('.work-card:visible')).toHaveCount(1);
  await expect(page.getByRole('status')).toHaveText('1 case');
  await page.locator('.work-card:visible a').click();
  await expect(page).toHaveURL(/canadian-resume\/\?q=resume$/);
  await page.locator('.back-to-work').first().click();
  await expect(page.getByLabel('Search the work')).toHaveValue('resume');
  await expect(page.locator('.work-card:visible')).toHaveCount(1);
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await page.getByLabel('Topic', { exact: true }).selectOption('Life abroad');
  await expect(page.locator('.work-card:visible')).toHaveCount(2);
  await page.getByLabel('Search the work').fill('zz-no-match');
  await expect(page.getByRole('heading', { name: 'No matching cases.' })).toBeVisible();
  await page.getByRole('button', { name: 'Show all cases', exact: true }).click();
  await expect(page.locator('.work-card:visible')).toHaveCount(11);
  await expect(page.getByLabel('Search the work')).toBeFocused();
});

test('archive reveal control handles a large fixture without publishing fake work', async ({ page }) => {
  await page.route('**/work/', async route => {
    const response = await route.fetch();
    let html = await response.text();
    const firstCard = html.match(/<article class="work-card"[\s\S]*?<\/article>/)[0];
    html = html.replace('<div class="work-grid archive-grid">', '<div class="work-grid archive-grid">' + firstCard.repeat(20));
    await route.fulfill({ response, body: html });
  });
  await page.goto('work/');
  await expect(page.locator('.work-card:visible')).toHaveCount(12);
  await page.getByRole('button', { name: 'Show more cases' }).click();
  await expect(page.locator('.work-card:visible')).toHaveCount(24);
  await expect(page.locator('.work-card').nth(12).locator('a')).toBeFocused();
  await page.getByRole('button', { name: 'Show more cases' }).click();
  await expect(page.locator('.work-card:visible')).toHaveCount(cases.length + 20);
  await expect(page.getByRole('button', { name: 'Show more cases' })).toBeHidden();
});

test('keyboard navigation and reduced motion work', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await expect(page.locator('.thumbnail-track').first()).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.motion-toggle')).toBeHidden();
  await page.getByRole('link', { name: 'View the full case' }).click();
  await expect(page).toHaveURL(/work\/start-before-ready\/$/);
  await page.getByRole('link', { name: 'Concept C', exact: true }).click();
  await expect(page.locator('#concept-c')).toBeInViewport();
});

test('home, archive and each detail have no automated accessibility violations', async ({ page }, testInfo) => {
  for (const route of ['./', 'work/', ...cases.map(s => 'work/' + s.id + '/')]) {
    await page.goto(route);
    await expect(page.locator('body')).not.toContainText(/independent concept|independent portfolio|not (?:uploaded|live-tested|verified|confirmed)|not proof of|not measured|not creator-endorsed|likeness has not|no performance result|guaranteed outcome|job guarantee|provisional concept|selected evaluation concepts/i);
    await expect(page.locator('.portfolio-notice')).toHaveCount(route === './' || route === 'work/' ? 0 : 1);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, route).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth), route).toBeLessThanOrEqual(await page.evaluate(() => innerWidth));
  }
  await page.goto('./');
  for (const img of await page.locator('img:not(.thumbnail-wall img)').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(el => el.decode()); }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: testInfo.outputPath('home.png'), fullPage: true });
  await page.goto('work/');
  for (const img of await page.locator('img').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(el => el.decode()); }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: testInfo.outputPath('work.png'), fullPage: true });
});

test('one build serves root and project paths, including directory redirects and legacy links', async ({ page, request }) => {
  const origin = 'http://127.0.0.1:4191';
  for (const mount of ['/', '/youtube-packaging-case-studies/']) {
    for (const route of ['', 'work/', ...cases.map(s => 'work/' + s.id + '/')]) {
      const response = await page.goto(origin + mount + route);
      expect(response.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      for (const asset of await page.locator('link[rel="stylesheet"], script[src]').all()) {
        const value = await asset.getAttribute('href') ?? await asset.getAttribute('src');
        expect((await request.get(new URL(value, page.url()).href)).status()).toBe(200);
      }
    }
    const redirect = await request.get(origin + mount + 'work', { maxRedirects: 0 });
    expect(redirect.status()).toBe(301);
    await page.goto(origin + mount + '#tampa-future');
    await expect(page).toHaveURL(new RegExp(mount + 'work/tampa-future/$'));
    expect((await request.get(origin + mount + 'not-a-case/')).status()).toBe(404);
  }
});

test('all work and case details remain accessible without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4191/youtube-packaging-case-studies/');
  await expect(page.locator('.motion-toggle')).toBeHidden();
  await expect(page.locator('.thumbnail-track').first()).toHaveCSS('animation-play-state', 'paused');
  await expect(page.locator('#packaging-title')).toBeVisible();
  await page.goto('http://127.0.0.1:4191/youtube-packaging-case-studies/work/');
  await expect(page.locator('.work-card:visible')).toHaveCount(11);
  await expect(page.locator('.archive-controls')).toBeHidden();
  await page.locator('.work-card a').first().click();
  await expect(page.locator('.pair-card')).toHaveCount(4);
  await context.close();
});

test('redesign wall moves right, left, right and pauses with sourced packaging notes', async ({ page }, testInfo) => {
  await page.goto('./');
  const wall = page.locator('.thumbnail-wall');
  await expect(wall.locator('.thumbnail-row')).toHaveCount(3);
  const redesigns = new Set(cases.flatMap(study => study.variants.map(v => v.image)));
  const sources = await wall.locator('img').evaluateAll(images => images.map(img => img.getAttribute('src')));
  expect(sources.length).toBe(66);
  expect(new Set(sources)).toEqual(redesigns);
  await expect(wall.locator('a, button')).toHaveCount(2);
  await expect(wall.locator('.thumbnail-rows')).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('.packaging-notes')).toContainText('A useful starting point, not a fixed formula.');
  await expect(page.locator('.expert-notes a')).toHaveCount(0);
  await expect(page.locator('.expert-notes blockquote')).toHaveText([
    '“I often actually say that it’s 50% of the game.”',
    '“The difference between 10,000 views and 100,000 views.”'
  ]);
  expect(await page.locator('.expert-notes img').evaluateAll(images => images.map(img => img.getAttribute('src')))).toEqual([
    'assets/experts/paddy-galloway-white.jpg', 'assets/experts/jacob-bryant-engaged.jpg'
  ]);
  await page.locator('.expert-notes').scrollIntoViewIfNeeded();
  await page.locator('.expert-notes img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
  const durations = await wall.locator('.thumbnail-track').evaluateAll(tracks => tracks.map(el => parseFloat(getComputedStyle(el).animationDuration)));
  const previousDuration = page.viewportSize().width <= 740 ? 17.142857 : 21.428571;
  for (const [row, speed] of [0.9, 0.6, 0.8].entries()) {
    expect(previousDuration / durations[row]).toBeCloseTo(speed, 5);
  }
  await wall.scrollIntoViewIfNeeded();
  await expect(wall).toHaveAttribute('data-motion', 'running');
  await expect(wall.locator('img').first()).toHaveJSProperty('complete', true);
  const directions = await wall.locator('.thumbnail-track').evaluateAll(tracks => tracks.map(track => {
    const animation = track.getAnimations()[0];
    animation.currentTime = 1000;
    const before = new DOMMatrix(getComputedStyle(track).transform).m41;
    animation.currentTime = 1250;
    const after = new DOMMatrix(getComputedStyle(track).transform).m41;
    return Math.sign(after - before);
  }));
  expect(directions).toEqual([1, -1, 1]);
  const toggle = page.getByRole('button', { name: 'Pause motion' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(wall).toHaveAttribute('data-motion', 'paused');
  const track = wall.locator('.thumbnail-track').first();
  await expect(track).toHaveCSS('animation-play-state', 'paused');
  const position = await track.evaluate(el => getComputedStyle(el).transform);
  await page.waitForTimeout(150);
  await expect(track).toHaveCSS('transform', position);
  await page.keyboard.press('Enter');
  await expect(wall).toHaveAttribute('data-motion', 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(track).toHaveCSS('animation-name', 'none');
  await expect(page.getByRole('button', { name: /motion/ })).toBeHidden();
  await expect(wall).toHaveAttribute('data-motion', 'paused');
  const gap = await page.evaluate(() => document.querySelector('.site-footer').getBoundingClientRect().top - document.querySelector('.thumbnail-wall').getBoundingClientRect().bottom);
  expect(Math.abs(gap)).toBeLessThan(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => innerWidth));
  await wall.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
  await wall.screenshot({ path: testInfo.outputPath('thumbnail-wall.png') });
  await page.locator('.packaging-notes').screenshot({ path: testInfo.outputPath('packaging-notes.png') });
});
