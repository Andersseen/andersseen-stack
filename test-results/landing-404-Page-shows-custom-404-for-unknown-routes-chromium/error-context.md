# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landing.spec.ts >> 404 Page >> shows custom 404 for unknown routes
- Location: e2e/landing.spec.ts:57:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=404')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=404')

```

```yaml
- navigation:
  - link "Andersseen Stack Andersseen Stack":
    - /url: /
    - img "Andersseen Stack"
    - text: Andersseen Stack
  - link "Volt UI":
    - /url: /volt-ui
  - link "Quartz":
    - /url: /quartz
  - link "Movement":
    - /url: /angular-movement
  - link "Lumen":
    - /url: /lumen-icons
- main
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
> 59  |     await expect(page.locator('text=404')).toBeVisible();
      |                                            ^ Error: expect(locator).toBeVisible() failed
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