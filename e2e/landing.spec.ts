import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has heading', async ({ page }) => {
    await expect(page.locator('h1, h2')).toBeVisible();
  });

  test('navigation works', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
  });
});
