import { tv, VariantProps } from 'tailwind-variants';

export const hr = tv({
	variants: {
		colorScheme: {
			primary: 'border-primary-500',
			secondary: 'border-secondary-500',
		},
	},
	defaultVariants: {
		colorScheme: 'primary',
	},
});

export type HrVariants = VariantProps<typeof hr>;
