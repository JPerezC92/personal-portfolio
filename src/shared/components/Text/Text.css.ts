import { tv, VariantProps } from 'tailwind-variants';

export const textVariants = tv({
	base: 'dark:text-sepia-100 font-exo2 tracking-wide',
	variants: {
		fontSize: {
			xs: 'text-xs md:text-sm font-semibold leading-6',
			sm: 'text-sm md:text-base font-semibold leading-6',
			md: 'text-base md:text-lg font-semibold leading-6',
			lg: 'text-lg md:text-xl font-semibold leading-6',
			xl: 'text-xl md:text-2xl font-semibold leading-6',
			'2xl': 'text-2xl md:text-3xl font-semibold leading-6',
			'3xl': 'text-3xl md:text-4xl font-semibold leading-6',
		},
	},
	defaultVariants: {
		fontSize: 'md',
	},
});

export type TextVariants = VariantProps<typeof textVariants>;
