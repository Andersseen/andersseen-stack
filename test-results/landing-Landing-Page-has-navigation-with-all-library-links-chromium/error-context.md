# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landing.spec.ts >> Landing Page >> has navigation with all library links
- Location: e2e/landing.spec.ts:17:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Volt UI')
Expected: visible
Error: strict mode violation: getByText('Volt UI') resolved to 2 elements:
    1) <a href="/volt-ui" routerlink="/volt-ui" _ngcontent-ng-c4014962607="" routerlinkactive="nav-link-active" class="nav-link rounded-md px-3 py-1.5 transition-all">Volt UI</a> aka getByRole('link', { name: 'Volt UI', exact: true })
    2) <h3 class="text-xl font-semibold">Volt UI</h3> aka getByRole('link', { name: '⚡ Volt UI Componentes UI' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Volt UI')

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
    - generic [ref=e15]:
      - generic [ref=e16]:
        - heading "Andersseen Stack" [level=1] [ref=e17]
        - paragraph [ref=e18]: Un ecosistema de librerías Angular modernas, accesibles y animadas. Inspirado en Tan Stack, construido para Angular.
        - generic [ref=e19]:
          - link "Explorar" [ref=e20] [cursor=pointer]:
            - /url: /volt-ui
            - button "Explorar" [ref=e22]
          - link "GitHub" [ref=e23] [cursor=pointer]:
            - /url: https://github.com/Andersseen
            - button "GitHub" [ref=e25]
      - generic [ref=e26]:
        - link "⚡ Volt UI Componentes UI estilizados y accesibles construidos sobre ng-primitives. Temas, variantes y CLI propio. Explorar →" [ref=e27] [cursor=pointer]:
          - /url: /volt-ui
          - generic [ref=e28]:
            - generic [ref=e29]:
              - generic [ref=e30]: ⚡
              - heading "Volt UI" [level=3] [ref=e31]
            - paragraph [ref=e32]: Componentes UI estilizados y accesibles construidos sobre ng-primitives. Temas, variantes y CLI propio.
            - generic [ref=e33]:
              - generic [ref=e34]: Explorar
              - generic [ref=e35]: →
        - link "💎 Quartz Primitivas UI headless para Angular. Overlays, dialogs, drag-drop, toast, virtual scroll y más. Explorar →" [ref=e36] [cursor=pointer]:
          - /url: /quartz
          - generic [ref=e37]:
            - generic [ref=e38]:
              - generic [ref=e39]: 💎
              - heading "Quartz" [level=3] [ref=e40]
            - paragraph [ref=e41]: Primitivas UI headless para Angular. Overlays, dialogs, drag-drop, toast, virtual scroll y más.
            - generic [ref=e42]:
              - generic [ref=e43]: Explorar
              - generic [ref=e44]: →
        - link "✦ Angular Movement Sistema declarativo de animaciones con WAAPI y springs. Directivas para scroll, hover, parallax y presencia. Explorar →" [ref=e45] [cursor=pointer]:
          - /url: /angular-movement
          - generic [ref=e46]:
            - generic [ref=e47]:
              - generic [ref=e48]: ✦
              - heading "Angular Movement" [level=3] [ref=e49]
            - paragraph [ref=e50]: Sistema declarativo de animaciones con WAAPI y springs. Directivas para scroll, hover, parallax y presencia.
            - generic [ref=e51]:
              - generic [ref=e52]: Explorar
              - generic [ref=e53]: →
        - link "◉ Lumen Icons Iconos SVG como componentes Angular. Tree-shakeable, accesibles y con animaciones integradas. Explorar →" [ref=e54] [cursor=pointer]:
          - /url: /lumen-icons
          - generic [ref=e55]:
            - generic [ref=e56]:
              - generic [ref=e57]: ◉
              - heading "Lumen Icons" [level=3] [ref=e58]
            - paragraph [ref=e59]: Iconos SVG como componentes Angular. Tree-shakeable, accesibles y con animaciones integradas.
            - generic [ref=e60]:
              - generic [ref=e61]: Explorar
              - generic [ref=e62]: →
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
> 18  |     await expect(page.getByText('Volt UI')).toBeVisible();
      |                                             ^ Error: expect(locator).toBeVisible() failed
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
  98  |     await expect(page.getByText('Search')).toBeVisible();
  99  |     await expect(page.getByText('Settings')).toBeVisible();
  100 |   });
  101 | });
  102 | 
```