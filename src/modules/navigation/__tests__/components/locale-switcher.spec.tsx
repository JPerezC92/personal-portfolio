import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { LocaleSwitcher } from '@/modules/navigation/components/LocaleSwitcher';
import { renderWithQueryClient } from '@/shared/__tests__/helpers/renderWithQueryClient';

vi.mock('next/navigation', () => ({ usePathname: () => '/es' }));

describe('LocaleSwitcher', () => {
	it('shows the current locale indicator and renders both links', () => {
		renderWithQueryClient(<LocaleSwitcher />);

		const esLink = screen.getByRole('link', { name: 'ES' });
		const enLink = screen.getByRole('link', { name: 'EN' });

		expect(esLink).toHaveAttribute('href', '/es');
		expect(enLink).toHaveAttribute('href', '/en');
		expect(esLink.querySelector('.bg-secondary-400')).not.toBeNull();
		expect(enLink.querySelector('.bg-secondary-400')).toBeNull();
	});
});
