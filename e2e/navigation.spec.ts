import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('AppBar displays navigation links', async ({ page }) => {
		await expect(page.getByRole('link', { name: 'Sobre mí' })).toBeVisible();
		await expect(
			page.getByRole('link', { name: 'Conocimientos' }),
		).toBeVisible();
		await expect(
			page.getByRole('link', { name: 'Proyectos' }),
		).toBeVisible();
	});

	test('AppBar shows Philip. branding', async ({ page }) => {
		await expect(page.getByText('Philip.')).toBeVisible();
	});

	test('navigation links have anchor hrefs', async ({ page }) => {
		const sobreMi = page.getByRole('link', { name: 'Sobre mí' });
		await expect(sobreMi).toHaveAttribute('href', /#sobre_mi/);
	});
});

test.describe('Theme page', () => {
	test('loads and shows button variants', async ({ page }) => {
		await page.goto('/theme');
		await expect(page.getByRole('heading', { name: 'Buttons' })).toBeVisible();
		const buttons = page.getByRole('button');
		expect(await buttons.count()).toBeGreaterThanOrEqual(8);
	});
});
