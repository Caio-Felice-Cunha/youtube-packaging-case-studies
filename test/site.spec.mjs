import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('all cases, title pairs, images and links load from a project subpath', async ({ page }) => {
  const failed = [];
  page.on('response', response => { if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`); });
  await page.goto('./');
  await expect(page).toHaveTitle(/Packaging by Caio/);
  await expect(page.locator('.case-study')).toHaveCount(6);
  await expect(page.locator('.pair-card')).toHaveCount(24);
  await expect(page.locator('.pair-card.redesign')).toHaveCount(18);
  await expect(page.locator('.video-link')).toHaveCount(6);
  await expect(page.locator('a[href="mailto:caiofcunha@hotmail.com"]')).toHaveCount(2);
  await expect(page.getByText('Localized title captured at the source snapshot')).toBeVisible();
  for (const image of await page.locator('.pair-card img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty('complete', true);
    expect(await image.evaluate(element => element.naturalWidth)).toBeGreaterThan(0);
    expect(await image.getAttribute('alt')).toBeTruthy();
  }
  expect(failed).toEqual([]);
});

test('navigation, keyboard skip link and responsive layout work', async ({ page }, testInfo) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.locator('.case-index a').first().click();
  await expect(page).toHaveURL(/#seven-platforms$/);
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(testInfo.project.use.viewport?.width ?? 1440);
  if (testInfo.project.name === 'mobile') {
    await expect(page.locator('.hand-note').first()).toBeHidden();
    await expect(page.locator('.case-explainer').first()).toBeVisible();
  }
});

test('Tampa uses the selected pairings and keeps three original critiques visible on small screens', async ({ page }) => {
  await page.goto('./#tampa-future');
  const tampa = page.locator('#tampa-future');
  await expect(tampa.locator('.pair-card h4')).toHaveText([
    'Tampa está mudando: 18 novidades que você precisa conhecer',
    'Você moraria em Tampa Bay sem conhecer estas 18 mudanças?',
    'Tampa Bay está crescendo — mas como fica a vida de quem mora lá?',
    '18 mudanças em Tampa Bay: o que existe além dos novos prédios?'
  ]);
  await expect(tampa.locator('.original-audit-arrows .audit-arrow')).toHaveCount(3);
  await expect(tampa.locator('.annotated-original .original-issues li')).toHaveCount(3);
  await expect(tampa.locator('.original-audit-arrows .audit-marker')).toHaveCount(3);
  await expect(tampa.locator('.original-audit-arrows .audit-number')).toHaveText(['1', '2', '3']);
  await expect(tampa.locator('.case-caveat')).toContainText('AI-treated portraits whose likeness has not been verified');
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(tampa.locator('.original-audit-arrows')).toBeVisible();
    await expect(tampa.locator('.annotated-original .original-issues li')).toHaveCount(3);
    for (const item of await tampa.locator('.original-issues li').all()) await expect(item).toBeVisible();
    const originalImage = await tampa.locator('.original-audit-image').boundingBox();
    const aImage = await tampa.locator('.redesign .image-frame').first().boundingBox();
    expect(originalImage).not.toBeNull();
    expect(aImage).not.toBeNull();
    expect(Math.abs(originalImage.width - aImage.width)).toBeLessThan(1);
    expect(Math.abs(originalImage.height - aImage.height)).toBeLessThan(1);
    if (width === 1440) {
      const cards = await Promise.all((await tampa.locator('.pair-card').all()).map(card => card.boundingBox()));
      expect(cards.every(card => card && Math.abs(card.width - cards[0].width) < 1 && Math.abs(card.y - cards[0].y) < 1)).toBe(true);
    }
    const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(documentWidth, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(width);
  }
});

test('every captured original has three red arrows and in-card mistake notes', async ({ page }) => {
  await page.goto('./');
  const studies = page.locator('.case-study');
  await expect(studies).toHaveCount(6);
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const study of await studies.all()) {
      const original = study.locator('.pair-card.original');
      await expect(original.locator('.audit-arrow')).toHaveCount(3);
      await expect(original.locator('.audit-number')).toHaveText(['1', '2', '3']);
      await expect(original.locator('.original-issues li')).toHaveCount(3);
      await expect(original.locator('.audit-line').first()).toHaveCSS('stroke', 'rgb(180, 35, 45)');
      await expect(original.locator('.original-issues strong').first()).toHaveCSS('color', 'rgb(180, 35, 45)');
      for (const note of await original.locator('.original-issues li').all()) await expect(note).toBeVisible();
      const originalImage = await original.locator('.image-frame').boundingBox();
      const redesignImage = await study.locator('.pair-card.redesign .image-frame').first().boundingBox();
      expect(Math.abs(originalImage.width - redesignImage.width)).toBeLessThan(1);
      expect(Math.abs(originalImage.height - redesignImage.height)).toBeLessThan(1);
      if (width === 1440) {
        const originalCard = await original.boundingBox();
        const redesignCard = await study.locator('.pair-card.redesign').first().boundingBox();
        expect(Math.abs(originalCard.width - redesignCard.width)).toBeLessThan(1);
        expect(Math.abs(originalCard.y - redesignCard.y)).toBeLessThan(1);
        await expect(study.locator('.hand-note').first()).toHaveCSS('color', 'rgb(49, 86, 237)');
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});

test('reduced motion avoids smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const behavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
  expect(behavior).toBe('auto');
});

test('case page has no automated accessibility violations', async ({ page }) => {
  await page.goto('./');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
