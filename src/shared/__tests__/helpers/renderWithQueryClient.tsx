import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { type ReactElement, type ReactNode } from 'react';

import esMessages from '../../../../messages/es.json';

type RenderWithQueryClientOptions = Parameters<typeof render>[1] & {
	locale?: string;
	messages?: typeof esMessages;
};

export function renderWithQueryClient(
	ui: ReactElement,
	{
		locale = 'es',
		messages = esMessages,
		...renderOptions
	}: RenderWithQueryClientOptions = {},
) {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false } },
	});

	const wrapper = ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={queryClient}>
			<NextIntlClientProvider locale={locale} messages={messages}>
				{children}
			</NextIntlClientProvider>
		</QueryClientProvider>
	);

	return render(ui, { wrapper, ...renderOptions });
}
