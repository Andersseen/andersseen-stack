# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landing.spec.ts >> Page Content >> Lumen Icons page shows icon gallery
- Location: e2e/landing.spec.ts:94:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Search')
Expected: visible
Error: strict mode violation: getByText('Search') resolved to 3 elements:
    1) <span class="text-xs text-white/50">Search</span> aka getByText('Search', { exact: true })
    2) <code>import { LmnSearchIcon } from '@lumen/icons/searc…</code> aka getByText('import { LmnSearchIcon } from')
    3) <code>@lumen/icons/search</code> aka getByText('@lumen/icons/search', { exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Search')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e4]:
    - link "Andersseen Stack Andersseen Stack" [ref=e5] [cursor=pointer]:
      - /url: /
      - img "Andersseen Stack" [ref=e6]
      - generic [ref=e7]: Andersseen Stack
    - generic [ref=e8]:
      - link "Volt UI" [ref=e9] [cursor=pointer]:
        - /url: /volt-ui
      - link "Quartz" [ref=e10] [cursor=pointer]:
        - /url: /quartz
      - link "Movement" [ref=e11] [cursor=pointer]:
        - /url: /angular-movement
      - link "Lumen" [ref=e12] [cursor=pointer]:
        - /url: /lumen-icons
  - main [ref=e13]:
    - generic [ref=e16]:
      - generic [ref=e17]:
        - link "← Volver" [ref=e18] [cursor=pointer]:
          - /url: /
        - heading "Lumen Icons" [level=1] [ref=e19]
        - paragraph [ref=e20]: Iconos SVG como componentes Angular. Tree-shakeable, accesibles y animables.
      - generic [ref=e21]:
        - generic [ref=e22]:
          - heading "Icon Gallery" [level=3] [ref=e23]
          - generic [ref=e24]:
            - generic [ref=e25]:
              - img [ref=e26]
              - generic [ref=e28]: Info
            - generic [ref=e29]:
              - img [ref=e30]
              - generic [ref=e33]: Search
            - generic [ref=e34]:
              - img [ref=e35]
              - generic [ref=e38]: Settings
            - generic [ref=e39]:
              - img [ref=e40]
              - generic [ref=e42]: Check
            - generic [ref=e43]:
              - img [ref=e44]
              - generic [ref=e46]: Left
            - generic [ref=e47]:
              - img [ref=e48]
              - generic [ref=e50]: Right
            - generic [ref=e51]:
              - img [ref=e52]
              - generic [ref=e54]: Alert
            - generic [ref=e55]:
              - img [ref=e56]
              - generic [ref=e59]: Avatar
        - generic [ref=e60]:
          - heading "Usage" [level=3] [ref=e61]
          - code [ref=e63]: "import { LmnSearchIcon } from '@lumen/icons/search'; import { LmnSettingsIcon } from '@lumen/icons/settings'; @Component({ imports: [LmnSearchIcon, LmnSettingsIcon], template: '<lmn-search [size]=\"24\" />' }) export class MyComponent {}"
        - generic [ref=e64]:
          - heading "Features" [level=3] [ref=e65]
          - list [ref=e66]:
            - listitem [ref=e67]: Tree-shakeable — importa solo los iconos que usas
            - listitem [ref=e68]:
              - text: Subpath exports —
              - code [ref=e69]: "@lumen/icons/search"
            - listitem [ref=e70]:
              - text: Accesible —
              - code [ref=e71]: aria-label
              - text: "y"
              - code [ref=e72]: role
              - text: automáticos
            - listitem [ref=e73]:
              - text: Animaciones — integrado con
              - code [ref=e74]: angular-movement
            - listitem [ref=e75]:
              - text: Customizable —
              - code [ref=e76]: size
              - text: ","
              - code [ref=e77]: strokeWidth
              - text: ","
              - code [ref=e78]: color
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Landing Page', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto('/');
  6   |   });
  7   | 
  8   |   test('has main heading with brand name', async ({ page }) => {
  9   |     await expect(page.locator('h1')).toContainText('Andersseen');
  10  |     await expect(page.locator('h1')).toContainText('Stack');
  11  |   });
  12  | 
  13  |   test('has description text', async ({ page }) => {
  14  |     await expect(page.locator('text=Un ecosistema de librerías Angular')).toBeVisible();
  15  |   });
  16  | 
  17  |   test('has navigation with all library links', async ({ page }) => {
  18  |     await expect(page.getByText('Volt UI')).toBeVisible();
  19  |     await expect(page.getByText('Quartz')).toBeVisible();
  20  |     await expect(page.getByText('Movement')).toBeVisible();
  21  |     await expect(page.getByText('Lumen')).toBeVisible();
  22  |   });
  23  | 
  24  |   test('navigates to Volt UI page', async ({ page }) => {
  25  |     await page.getByText('Volt UI').first().click();
  26  |     await expect(page).toHaveURL(/\/volt-ui/);
  27  |     await expect(page.locator('h1')).toContainText('Volt UI');
  28  |   });
  29  | 
  30  |   test('navigates to Quartz page', async ({ page }) => {
  31  |     await page.getByText('Quartz').first().click();
  32  |     await expect(page).toHaveURL(/\/quartz/);
  33  |     await expect(page.locator('h1')).toContainText('Quartz');
  34  |   });
  35  | 
  36  |   test('navigates to Angular Movement page', async ({ page }) => {
  37  |     await page.getByText('Movement').first().click();
  38  |     await expect(page).toHaveURL(/\/angular-movement/);
  39  |     await expect(page.locator('h1')).toContainText('Angular Movement');
  40  |   });
  41  | 
  42  |   test('navigates to Lumen Icons page', async ({ page }) => {
  43  |     await page.getByText('Lumen').first().click();
  44  |     await expect(page).toHaveURL(/\/lumen-icons/);
  45  |     await expect(page.locator('h1')).toContainText('Lumen Icons');
  46  |   });
  47  | 
  48  |   test('can navigate back to home from any page', async ({ page }) => {
  49  |     await page.goto('/volt-ui');
  50  |     await page.getByText('← Volver').click();
  51  |     await expect(page).toHaveURL('/');
  52  |     await expect(page.locator('h1')).toContainText('Andersseen');
  53  |   });
  54  | });
  55  | 
  56  | test.describe('404 Page', () => {
  57  |   test('shows custom 404 for unknown routes', async ({ page }) => {
  58  |     await page.goto('/non-existent-route');
  59  |     await expect(page.locator('text=404')).toBeVisible();
  60  |     await expect(page.locator('text=Página no encontrada')).toBeVisible();
  61  |     await expect(page.getByText('Volver al inicio')).toBeVisible();
  62  |   });
  63  | 
  64  |   test('can navigate home from 404 page', async ({ page }) => {
  65  |     await page.goto('/non-existent-route');
  66  |     await page.getByText('Volver al inicio').click();
  67  |     await expect(page).toHaveURL('/');
  68  |   });
  69  | });
  70  | 
  71  | test.describe('Page Content', () => {
  72  |   test('Volt UI page shows buttons', async ({ page }) => {
  73  |     await page.goto('/volt-ui');
  74  |     await expect(page.getByText('Primary')).toBeVisible();
  75  |     await expect(page.getByText('Destructive')).toBeVisible();
  76  |     await expect(page.getByText('Outline')).toBeVisible();
  77  |     await expect(page.getByText('Ghost')).toBeVisible();
  78  |   });
  79  | 
  80  |   test('Quartz page shows toast buttons', async ({ page }) => {
  81  |     await page.goto('/quartz');
  82  |     await expect(page.getByText('Success')).toBeVisible();
  83  |     await expect(page.getByText('Error')).toBeVisible();
  84  |     await expect(page.getByText('Info')).toBeVisible();
  85  |   });
  86  | 
  87  |   test('Angular Movement page shows animation demos', async ({ page }) => {
  88  |     await page.goto('/angular-movement');
  89  |     await expect(page.getByText('Entrance Animations')).toBeVisible();
  90  |     await expect(page.getByText('Hover & Tap')).toBeVisible();
  91  |     await expect(page.getByText('In View')).toBeVisible();
  92  |   });
  93  | 
  94  |   test('Lumen Icons page shows icon gallery', async ({ page }) => {
  95  |     await page.goto('/lumen-icons');
  96  |     await expect(page.getByText('Icon Gallery')).toBeVisible();
  97  |     await expect(page.getByText('Info')).toBeVisible();
> 98  |     await expect(page.getByText('Search')).toBeVisible();
      |                                            ^ Error: expect(locator).toBeVisible() failed
  99  |     await expect(page.getByText('Settings')).toBeVisible();
  100 |   });
  101 | });
  102 | 
```