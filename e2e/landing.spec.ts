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
    await expect(page.getByTestId('hero-description')).toBeVisible();
  });

  test('has navigation with all library links', async ({ page }) => {
    const nav = page.getByRole('navigation');

    await expect(nav.getByRole('link', { name: 'Volt UI' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Quartz' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Movement' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Lumen' })).toBeVisible();
  });

  test('has GitHub link in navigation', async ({ page }) => {
    const githubLink = page.getByRole('navigation').getByRole('link', { name: 'GitHub' });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/Andersseen');
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
    await expect(page.getByRole('button', { name: 'Primary' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Destructive' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Outline' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ghost' })).toBeVisible();
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

test.describe('Demo Pages External Links', () => {
  test('Volt UI page has install command, GitHub and Live Demo links', async ({ page }) => {
    await page.goto('/volt-ui');
    await page.waitForSelector('h1');

    await expect(page.getByText('npm install @voltui/components')).toBeVisible();

    const githubLink = page.locator('a[href="https://github.com/Andersseen/volt-ui"]');
    await expect(githubLink).toBeVisible();

    const demoLink = page.locator('a[href="https://volt-ui.andersseen.dev"]');
    await expect(demoLink).toBeVisible();
  });

  test('Quartz page has install command, GitHub and Live Demo links', async ({ page }) => {
    await page.goto('/quartz');
    await page.waitForSelector('h1');

    await expect(page.getByText('npm install quartz-headless')).toBeVisible();

    const githubLink = page.locator('a[href="https://github.com/Andersseen/quartz"]');
    await expect(githubLink).toBeVisible();

    const demoLink = page.locator('a[href="https://quartz-ui.andersseen.dev"]');
    await expect(demoLink).toBeVisible();
  });

  test('Angular Movement page has install command, GitHub and Live Demo links', async ({ page }) => {
    await page.goto('/angular-movement');
    await page.waitForSelector('h1');

    await expect(page.getByText('npm install angular-movement')).toBeVisible();

    const githubLink = page.locator('a[href="https://github.com/Andersseen/angular-movement"]');
    await expect(githubLink).toBeVisible();

    const demoLink = page.locator('a[href="https://angular-movement.andersseen.dev"]');
    await expect(demoLink).toBeVisible();
  });

  test('Lumen Icons page has install command, GitHub and Live Demo links', async ({ page }) => {
    await page.goto('/lumen-icons');
    await page.waitForSelector('h1');

    await expect(page.getByText('npm install @lumen/icons')).toBeVisible();

    const githubLink = page.locator('a[href="https://github.com/Andersseen/lumen-icons"]');
    await expect(githubLink).toBeVisible();

    const demoLink = page.locator('a[href="https://lumen-icons.andersseen.dev"]');
    await expect(demoLink).toBeVisible();
  });
});
