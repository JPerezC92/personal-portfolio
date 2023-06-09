import { tv, VariantProps } from 'tailwind-variants';

export const headingVariants = tv({
	base: 'dark:text-sepia-200 text-2xl font-bold uppercase font-exo2',
	variants: {
		fontSize: {
			xs: 'text-xs md:text-sm font-black',
			sm: 'text-sm md:text-base font-black',
			md: 'text-md md:text-lg font-black',
			lg: 'text-lg md:text-xl font-black',
			xl: 'text-xl md:text-2xl font-black',
			'2xl': 'text-2xl md:text-3xl font-black',
			'3xl': 'text-3xl md:text-4xl font-black',
			'4xl': 'text-4xl md:text-5xl font-black',
			'5xl': 'text-5xl md:text-6xl leading-[80%] font-black',
			'6xl': 'text-6xl md:text-7xl leading-[80%] font-black',
		},
	},
	defaultVariants: {
		fontSize: '6xl',
	},
});

export type HeadingVariants = VariantProps<typeof headingVariants>;
