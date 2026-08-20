import { describe, expect, it } from 'vitest';

import { palette } from '@/theme/colors';

describe('palette', () => {
	it('has all 8 color scales', () => {
		const scales = Object.keys(palette);
		expect(scales).toContain('primary');
		expect(scales).toContain('secondary');
		expect(scales).toContain('accent');
		expect(scales).toContain('sepia');
		expect(scales).toContain('success');
		expect(scales).toContain('info');
		expect(scales).toContain('warning');
		expect(scales).toContain('danger');
	});

	it('each scale has a base color', () => {
		for (const scale of Object.values(palette)) {
			expect(scale.base).toBeDefined();
			expect(scale.base).toMatch(/^#[0-9a-fA-F]{6}$/);
		}
	});

	it('each scale has 50-900 shades', () => {
		const requiredShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
		for (const [_name, scale] of Object.entries(palette)) {
			for (const shade of requiredShades) {
				expect(scale).toHaveProperty(shade, expect.stringMatching(/^#/));
			}
		}
	});

	it('primary has 950 shade', () => {
		expect(palette.primary[950]).toBeDefined();
	});
});
