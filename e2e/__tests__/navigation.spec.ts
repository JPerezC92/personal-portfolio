import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		await page.waitForSelector('text=Philip.');
	});

	test('AppBar displays navigation links', async ({ page }) => {
		const nav = page.locator('nav');
		const links = nav.getByRole('link');
		expect(await links.count()).toBe(3);
	});

	test('AppBar shows Philip. branding', async ({ page }) => {
		await expect(page.getByText('Philip.')).toBeVisible();
	});

	test('navigation links have anchor hrefs', async ({ page }) => {
		const nav = page.locator('nav');
		const links = nav.getByRole('link');
		const firstHref = await links.first().getAttribute('href');
		expect(firstHref).toContain('#');
	});
});

test.describe('Theme page', () => {
	test('loads and shows button variants', async ({ page }) => {
		await page.goto('/es/theme');
		await expect(
			page.getByRole('heading', { name: 'Buttons' }),
		).toBeVisible();
		const buttons = page.getByRole('button');
		expect(await buttons.count()).toBeGreaterThanOrEqual(8);
	});
});
