import { afterEach, describe, expect, it, vi } from 'vitest';

import { sectionList } from '@/modules/navigation/domain/entities/section';
import { navigationService } from '@/modules/navigation/services/navigation.service';

afterEach(() => {
	vi.unstubAllEnvs();
	vi.resetModules();
});

describe('navigationService', () => {
	it('returns the section enum values', () => {
		expect(navigationService.getSections()).toEqual(sectionList);
	});

	it('builds a home section link from the configured WEB_URL', async () => {
		vi.stubEnv('NEXT_PUBLIC_WEB_URL', 'https://example.com');
		vi.resetModules();
		const { navigationService: freshService } = await import(
			'@/modules/navigation/services/navigation.service'
		);

		expect(freshService.homeSection('sobre_mi')).toBe(
			'https://example.com#sobre_mi',
		);
	});

	it('returns NavigationServiceError when WEB_URL is unset', async () => {
		vi.stubEnv('NEXT_PUBLIC_WEB_URL', '');
		vi.resetModules();
		const { navigationService: freshService } = await import(
			'@/modules/navigation/services/navigation.service'
		);
		const {
			NavigationServiceError: freshNavigationServiceError,
		} = await import('@/modules/navigation/domain/errors/navigation-service.error');

		expect(freshService.homeSection('sobre_mi')).toBeInstanceOf(
			freshNavigationServiceError,
		);
	});
});
