import { cva, type VariantProps } from 'class-variance-authority';

export const IconCss = cva('inline-block align-middle', {
	variants: {
		size: {
			xs: 'text-lg md:text-xl',
			md: 'text-lg md:text-xl',
			lg: 'text-2xl md:text-3xl',
			xl: 'text-3xl md:text-4xl',
			'2xl': 'text-4xl md:text-5xl',
			'3xl': 'text-5xl md:text-6xl',
		},
	},
	defaultVariants: {
		size: 'md',
	},
});

export type IconVariants = VariantProps<typeof IconCss>;
