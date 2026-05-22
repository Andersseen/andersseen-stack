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
    const nav = page.getByRole('navigation');

    await expect(nav.getByRole('link', { name: 'Volt UI' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Quartz' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Movement' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Lumen' })).toBeVisible();
  });

  test('navigates to Volt UI page', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'Volt UI' }).click();
    await expect(page).toHaveURL(/\/volt-ui/);
    await expect(page.locator('h1')).toContainText('Volt UI');
  });

  test('navigates to Quartz page', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'Quartz' }).click();
    await expect(page).toHaveURL(/\/quartz/);
    await expect(page.locator('h1')).toContainText('Quartz');
  });

  test('navigates to Angular Movement page', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'Movement' }).click();
    await expect(page).toHaveURL(/\/angular-movement/);
    await expect(page.locator('h1')).toContainText('Angular Movement');
  });

  test('navigates to Lumen Icons page', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'Lumen' }).click();
    await expect(page).toHaveURL(/\/lumen-icons/);
    await expect(page.locator('h1')).toContainText('Lumen Icons');
  });

  test('can navigate back to home from any page', async ({ page }) => {
    await page.goto('/volt-ui');
    await page.getByRole('link', { name: '← Volver' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Andersseen');
  });
});

test.describe('404 Page', () => {
  test('shows custom 404 for unknown routes', async ({ page }) => {
    await page.goto('/non-existent-route');
    await expect(page.getByText('404', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Página no encontrada' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Volver al inicio' })).toBeVisible();
  });

  test('can navigate home from 404 page', async ({ page }) => {
    await page.goto('/non-existent-route');
    await page.getByRole('link', { name: 'Volver al inicio' }).click();
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
    await expect(page.getByRole('heading', { name: 'Icon Gallery' })).toBeVisible();
    await expect(page.getByText('Info', { exact: true })).toBeVisible();
    await expect(page.getByText('Search', { exact: true })).toBeVisible();
    await expect(page.getByText('Settings', { exact: true })).toBeVisible();
  });
});
