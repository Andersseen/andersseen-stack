import { test, expect, type Locator, type Page } from '@playwright/test';

/**
 * Returns whatever currently holds the library links, opening the drawer first
 * on small viewports. The drawer renders in an overlay outside `<nav>`, so the
 * scope differs per breakpoint.
 */
async function navScope(page: Page): Promise<Locator> {
  // `isVisible()` does not wait, so let the nav render before probing it —
  // otherwise this silently no-ops while the app is still bootstrapping.
  await page.getByRole('navigation').waitFor();
  const toggle = page.getByRole('button', { name: 'Open menu' });

  if (await toggle.isVisible()) {
    await toggle.click();
    const drawer = page.getByTestId('mobile-menu');
    await drawer.waitFor();
    return drawer;
  }

  return page.getByRole('navigation');
}

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
    const nav = await navScope(page);

    await expect(nav.getByRole('link', { name: 'Volt UI' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Quartz' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Movement' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Lumen' })).toBeVisible();
  });

  test('has GitHub link in navigation', async ({ page }) => {
    const githubLink = (await navScope(page)).getByRole('link', { name: 'GitHub' });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/Andersseen');
  });

  test('navigates to Volt UI page', async ({ page }) => {
    await (await navScope(page)).getByRole('link', { name: 'Volt UI' }).click();
    await expect(page).toHaveURL(/\/volt-ui/);
    await expect(page.locator('h1')).toContainText('Volt UI');
  });

  test('navigates to Quartz page', async ({ page }) => {
    await (await navScope(page)).getByRole('link', { name: 'Quartz' }).click();
    await expect(page).toHaveURL(/\/quartz/);
    await expect(page.locator('h1')).toContainText('Quartz');
  });

  test('navigates to Angular Movement page', async ({ page }) => {
    await (await navScope(page)).getByRole('link', { name: 'Movement' }).click();
    await expect(page).toHaveURL(/\/angular-movement/);
    await expect(page.locator('h1')).toContainText('Angular Movement');
  });

  test('navigates to Lumen Icons page', async ({ page }) => {
    await (await navScope(page)).getByRole('link', { name: 'Lumen' }).click();
    await expect(page).toHaveURL(/\/lumen-icons/);
    await expect(page.locator('h1')).toContainText('Lumen Icons');
  });

  test('can navigate back to home from any page', async ({ page }) => {
    await page.goto('/volt-ui');
    await page.getByRole('link', { name: '← Back' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Andersseen');
  });
});

test.describe('Language switching', () => {
  test('switches the whole page and persists across reloads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    await page.selectOption('select[id^="language-switcher"]', 'es');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByTestId('hero-description')).toContainText('ecosistema');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.locator('select[id^="language-switcher"]')).toHaveValue('es');
  });

  test('translates page metadata, not just the body', async ({ page }) => {
    await page.goto('/volt-ui');
    await page.selectOption('select[id^="language-switcher"]', 'uk');

    await expect(page.locator('html')).toHaveAttribute('lang', 'uk');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /[а-яіїєґ]/i
    );
  });

  test('offers all three locales', async ({ page }) => {
    await page.goto('/');
    const options = page.locator('select[id^="language-switcher"] option');
    await expect(options).toHaveCount(3);
    await expect(options).toHaveText(['English', 'Español', 'Українська']);
  });
});

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 375, height: 780 } });

  test('page never scrolls horizontally', async ({ page }) => {
    for (const path of ['/', '/volt-ui', '/quartz', '/angular-movement', '/lumen-icons']) {
      await page.goto(path);
      await page.waitForSelector('h1');
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(overflows, `${path} scrolls horizontally at 375px`).toBe(false);
    }
  });

  test('drawer is an accessible modal dialog', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();

    const drawer = page.getByTestId('mobile-menu');
    await expect(drawer).toBeVisible();
    await expect(drawer).toHaveAttribute('role', 'dialog');
    await expect(drawer).toHaveAttribute('aria-modal', 'true');

    // Labelled by its own heading, and focus moved inside.
    const labelledBy = await drawer.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    await expect(page.locator(`#${labelledBy}`)).toHaveText('Menu');
    expect(await drawer.evaluate((el) => el.contains(document.activeElement))).toBe(true);

    // The page behind must not scroll while the drawer is open.
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).overflow)
    ).toBe('hidden');
  });

  test('drawer animates in and out instead of popping', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    const drawer = page.getByTestId('mobile-menu');
    await expect(drawer).toBeVisible();

    expect(await drawer.evaluate((el) => getComputedStyle(el).animationName)).toBe(
      'app-drawer-panel-in'
    );

    await page.keyboard.press('Escape');
    // The exit animation must actually run; ng-primitives awaits it before disposing.
    await expect
      .poll(async () =>
        drawer
          .evaluate((el) => el.hasAttribute('data-exit') && getComputedStyle(el).animationName)
          .catch(() => null)
      )
      .toBe('app-drawer-panel-out');

    await expect(drawer).toHaveCount(0);
  });

  test.describe('closing the drawer', () => {
    for (const [name, close] of [
      ['Escape', async (page: Page) => page.keyboard.press('Escape')],
      ['the close button', async (page: Page) => page.getByRole('button', { name: 'Close menu' }).click()],
      // Via a locator, not raw coordinates: Playwright waits for the enter
      // animation to settle before clicking, otherwise this races it.
      [
        'clicking the scrim',
        async (page: Page) => page.locator('.app-drawer-scrim').click({ position: { x: 15, y: 400 } }),
      ],
    ] as const) {
      test(`closes via ${name} and restores scrolling`, async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Open menu' }).click();
        await expect(page.getByTestId('mobile-menu')).toBeVisible();

        await close(page);

        await expect(page.getByTestId('mobile-menu')).toHaveCount(0);
        expect(
          await page.evaluate(() => getComputedStyle(document.documentElement).overflow)
        ).not.toBe('hidden');
      });
    }
  });

  test('menu closes after navigating', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByTestId('mobile-menu')).toBeVisible();

    await page.getByTestId('mobile-menu').locator('a[href="/quartz"]').click();
    await expect(page).toHaveURL(/\/quartz/);
    await expect(page.getByTestId('mobile-menu')).toHaveCount(0);
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).overflow)
    ).not.toBe('hidden');
  });
});

test.describe('Page layout', () => {
  const routes = ['/', '/volt-ui', '/quartz', '/angular-movement', '/lumen-icons', '/no-such-route'];

  test('footer always ends at the bottom of the document', async ({ page }) => {
    for (const route of routes) {
      await page.goto(route);
      await page.waitForSelector('footer');
      const gap = await page.evaluate(() => {
        const f = document.querySelector('footer')!.getBoundingClientRect();
        return document.documentElement.scrollHeight - (f.bottom + window.scrollY);
      });
      // Sub-pixel rounding only; no dead space under the footer on any route.
      expect(Math.abs(gap), `${route} leaves a gap under the footer`).toBeLessThan(2);
    }
  });

  test('footer is pinned to the viewport when content is short', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 1600 });
    await page.goto('/no-such-route');
    await page.waitForSelector('footer');

    const m = await page.evaluate(() => ({
      footerBottom: document.querySelector('footer')!.getBoundingClientRect().bottom,
      viewport: document.documentElement.clientHeight,
      scrolls: document.documentElement.scrollHeight > document.documentElement.clientHeight + 1,
    }));
    expect(Math.abs(m.viewport - m.footerBottom)).toBeLessThan(2);
    expect(m.scrolls, 'short page should not scroll').toBe(false);
  });

  test('nav stays pinned while scrolling', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('nav');
    await page.evaluate(() => window.scrollTo(0, 1200));
    await expect
      .poll(() => page.evaluate(() => Math.round(document.querySelector('nav')!.getBoundingClientRect().top)))
      .toBe(0);
  });
});

test.describe('404 Page', () => {
  test('shows custom 404 for unknown routes', async ({ page }) => {
    await page.goto('/non-existent-route');
    await expect(page.getByText('404', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to home' })).toBeVisible();
  });

  test('can navigate home from 404 page', async ({ page }) => {
    await page.goto('/non-existent-route');
    await page.getByRole('link', { name: 'Back to home' }).click();
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
