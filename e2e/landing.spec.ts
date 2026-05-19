import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has main heading with brand name', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Andersseen');
    await expect(page.locator('h1')).toContainText('Stack');
  });

  test('has description text', async ({ page }) => {
    await expect(page.locator('text=Un ecosistema de librerías Angular')).toBeVisible();
  });

  test('has navigation with all library links', async ({ page }) => {
    await expect(page.getByText('Volt UI')).toBeVisible();
    await expect(page.getByText('Quartz')).toBeVisible();
    await expect(page.getByText('Movement')).toBeVisible();
    await expect(page.getByText('Lumen')).toBeVisible();
  });

  test('navigates to Volt UI page', async ({ page }) => {
    await page.getByText('Volt UI').first().click();
    await expect(page).toHaveURL(/\/volt-ui/);
    await expect(page.locator('h1')).toContainText('Volt UI');
  });

  test('navigates to Quartz page', async ({ page }) => {
    await page.getByText('Quartz').first().click();
    await expect(page).toHaveURL(/\/quartz/);
    await expect(page.locator('h1')).toContainText('Quartz');
  });

  test('navigates to Angular Movement page', async ({ page }) => {
    await page.getByText('Movement').first().click();
    await expect(page).toHaveURL(/\/angular-movement/);
    await expect(page.locator('h1')).toContainText('Angular Movement');
  });

  test('navigates to Lumen Icons page', async ({ page }) => {
    await page.getByText('Lumen').first().click();
    await expect(page).toHaveURL(/\/lumen-icons/);
    await expect(page.locator('h1')).toContainText('Lumen Icons');
  });

  test('can navigate back to home from any page', async ({ page }) => {
    await page.goto('/volt-ui');
    await page.getByText('← Volver').click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Andersseen');
  });
});

test.describe('404 Page', () => {
  test('shows custom 404 for unknown routes', async ({ page }) => {
    await page.goto('/non-existent-route');
    await expect(page.locator('text=404')).toBeVisible();
    await expect(page.locator('text=Página no encontrada')).toBeVisible();
    await expect(page.getByText('Volver al inicio')).toBeVisible();
  });

  test('can navigate home from 404 page', async ({ page }) => {
    await page.goto('/non-existent-route');
    await page.getByText('Volver al inicio').click();
    await expect(page).toHaveURL('/');
  });
});

test.describe('Page Content', () => {
  test('Volt UI page shows buttons', async ({ page }) => {
    await page.goto('/volt-ui');
    await expect(page.getByText('Primary')).toBeVisible();
    await expect(page.getByText('Destructive')).toBeVisible();
    await expect(page.getByText('Outline')).toBeVisible();
    await expect(page.getByText('Ghost')).toBeVisible();
  });

  test('Quartz page shows toast buttons', async ({ page }) => {
    await page.goto('/quartz');
    await expect(page.getByText('Success')).toBeVisible();
    await expect(page.getByText('Error')).toBeVisible();
    await expect(page.getByText('Info')).toBeVisible();
  });

  test('Angular Movement page shows animation demos', async ({ page }) => {
    await page.goto('/angular-movement');
    await expect(page.getByText('Entrance Animations')).toBeVisible();
    await expect(page.getByText('Hover & Tap')).toBeVisible();
    await expect(page.getByText('In View')).toBeVisible();
  });

  test('Lumen Icons page shows icon gallery', async ({ page }) => {
    await page.goto('/lumen-icons');
    await expect(page.getByText('Icon Gallery')).toBeVisible();
    await expect(page.getByText('Info')).toBeVisible();
    await expect(page.getByText('Search')).toBeVisible();
    await expect(page.getByText('Settings')).toBeVisible();
  });
});
