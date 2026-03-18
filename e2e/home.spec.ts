import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('loads without errors', async ({ page }) => {
		await expect(page).toHaveTitle(/Philip Perez Castro/);
	});

	test('displays hero section with name and headline', async ({ page }) => {
		await expect(page.getByText('Philip Perez Castro,')).toBeVisible();
		await expect(page.getByText('Desarrollador Junior')).toBeVisible();
	});

	test('CV download link has correct href', async ({ page }) => {
		const cvLink = page.getByRole('link', { name: 'CV' });
		await expect(cvLink).toHaveAttribute('href', '/curriculum.pdf');
		await expect(cvLink).toHaveAttribute('download');
	});

	test('social links point to correct URLs', async ({ page }) => {
		const heroLinks = page.locator('#hero a');
		const hrefs = await heroLinks.evaluateAll((els) =>
			els.map((el) => el.getAttribute('href')),
		);

		expect(hrefs).toContain('https://pe.linkedin.com/in/jperezc92');
		expect(hrefs).toContain('https://github.com/JPerezC92');
		expect(hrefs).toContain('mailto:jperez.c92@gmail.com');
	});

	test('displays all three main sections', async ({ page }) => {
		await expect(page.locator('#sobre_mi')).toBeAttached();
		await expect(page.locator('#conocimientos')).toBeAttached();
		await expect(page.locator('#proyectos')).toBeAttached();
	});

	test('renders project cards with images', async ({ page }) => {
		const projectSection = page.locator('#proyectos');
		const images = projectSection.locator('img');
		await expect(images.first()).toBeAttached();
		expect(await images.count()).toBeGreaterThanOrEqual(1);
	});

	test('renders skill icons', async ({ page }) => {
		const skillSection = page.locator('#conocimientos');
		await expect(skillSection.getByText('React')).toBeAttached();
		await expect(skillSection.getByText('TypeScript')).toBeAttached();
		await expect(skillSection.getByText('NextJs')).toBeAttached();
	});

	test('footer has social links', async ({ page }) => {
		const footer = page.locator('footer');
		const links = footer.getByRole('link');
		expect(await links.count()).toBe(3);
	});
});
