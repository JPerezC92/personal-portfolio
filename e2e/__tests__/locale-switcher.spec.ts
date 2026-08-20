import { expect, test } from '@playwright/test';

test.describe('Locale Switcher', () => {
	test('shows ES as active on Spanish page', async ({ page }) => {
		await page.goto('/es');
		await page.waitForSelector('text=Philip.');

		const esLink = page.getByRole('link', { name: 'ES', exact: true });
		const enLink = page.getByRole('link', { name: 'EN', exact: true });

		await expect(esLink).toBeVisible();
		await expect(enLink).toBeVisible();

		// ES should have the animated indicator
		await expect(esLink.locator('span.bg-secondary-400')).toBeAttached();
		// EN should not
		await expect(enLink.locator('span.bg-secondary-400')).not.toBeAttached();
	});

	test('switches to English when EN is clicked', async ({ page }) => {
		await page.goto('/es');
		await page.waitForSelector('text=Philip.');

		await page.getByRole('link', { name: 'EN', exact: true }).click();
		await page.waitForURL(/\/en/);
		await page.waitForSelector('text=Philip.');

		// URL should be English
		expect(page.url()).toContain('/en');

		// EN should now have the indicator
		const enLink = page.getByRole('link', { name: 'EN', exact: true });
		await expect(enLink.locator('span.bg-secondary-400')).toBeAttached();

		// ES should not
		const esLink = page.getByRole('link', { name: 'ES', exact: true });
		await expect(esLink.locator('span.bg-secondary-400')).not.toBeAttached();
	});

	test('switches back to Spanish when ES is clicked', async ({ page }) => {
		await page.goto('/en');
		await page.waitForSelector('text=Philip.');

		await page.getByRole('link', { name: 'ES', exact: true }).click();
		await page.waitForURL(/\/es/);
		await page.waitForSelector('text=Philip.');

		// URL should be Spanish
		expect(page.url()).toContain('/es');

		// ES should now have the indicator
		const esLink = page.getByRole('link', { name: 'ES', exact: true });
		await expect(esLink.locator('span.bg-secondary-400')).toBeAttached();

		// EN should not
		const enLink = page.getByRole('link', { name: 'EN', exact: true });
		await expect(enLink.locator('span.bg-secondary-400')).not.toBeAttached();
	});

	test('EN page shows English navigation labels', async ({ page }) => {
		await page.goto('/en');
		await page.waitForSelector('text=Philip.');

		const nav = page.locator('nav');
		await expect(nav.getByText('About me')).toBeAttached();
		await expect(nav.getByText('Skills')).toBeAttached();
		await expect(nav.getByText('Projects')).toBeAttached();
	});
});
