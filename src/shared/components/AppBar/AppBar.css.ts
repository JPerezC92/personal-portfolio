import { tv } from 'tailwind-variants';

export const header = tv({
	slots: {
		wrapper: 'bg-primary-700/20',
		base: 'max-w-screen-xl mx-auto items-center flex flex-wrap px-4 py-3 md:py-5 xl:px-0 transition-all duration-300 ease-in-out',
	},
});
