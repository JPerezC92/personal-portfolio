import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { createMany } from '@/modules/navigation/__tests__/helpers/nav-section.factory';
import { AppBar } from '@/modules/navigation/components/AppBar';
import { renderWithQueryClient } from '@/shared/__tests__/helpers/renderWithQueryClient';

vi.mock('next/navigation', () => ({ usePathname: () => '/es' }));

describe('AppBar', () => {
	it('renders branding and a link per section', async () => {
		const sections = createMany(3);
		const user = userEvent.setup();

		renderWithQueryClient(<AppBar sections={sections} />);

		expect(screen.getByText('Philip.')).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'Open navigation' }));

		for (const section of sections) {
			const link = await screen.findByRole('link', { name: section.title });
			expect(link).toHaveAttribute('href', section.link);
		}
	});

	it('flips the mobile toggle aria-label after a click', async () => {
		const user = userEvent.setup();

		renderWithQueryClient(<AppBar sections={createMany(3)} />);

		await user.click(screen.getByRole('button', { name: 'Open navigation' }));
		expect(
			screen.getByRole('button', { name: 'Close navigation' }),
		).toBeInTheDocument();

		await user.click(
			screen.getByRole('button', { name: 'Close navigation' }),
		);
		expect(
			screen.getByRole('button', { name: 'Open navigation' }),
		).toBeInTheDocument();
	});
});
