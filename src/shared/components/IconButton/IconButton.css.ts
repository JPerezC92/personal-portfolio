import { tv, VariantProps } from 'tailwind-variants';

export const iconButtonVariants = tv({
	base: 'p-2 rounded border inline-flex justify-center items-center transition duration-200 ease-in-out shadow aspect-square',
	variants: {
		colorScheme: {
			primary: '',
			secondary: '',
		},
		variant: {
			solid: 'text-neutral-900 hover:shadow-sm',
			outline: 'border-neutral-900 hover:shadow-sm',
			ghost: 'border-transparent',
			link: 'border-transparent',
		},
		size: {
			xs: 'text-base md:text-lg w-8 h-8 md:w-9 md:h-9',
			sm: 'text-lg md:text-xl w-9 h-9 md:w-10 md:h-10',
			md: 'text-2xl md:text-3xl w-10 h-10 md:w-11 md:h-11',
			lg: 'text-3xl md:text-4xl w-11 h-11 md:w-12 md:h-12',
			xl: 'text-4xl md:text-5xl w-12 h-12 md:w-14 md:h-14',
		},
	},
	compoundVariants: [
		{
			variant: 'solid',
			colorScheme: 'primary',
			className: 'bg-primary-400 hover:bg-primary-500 border-primary-400',
		},
		{
			variant: 'solid',
			colorScheme: 'secondary',
			className: 'bg-secondary-400 hover:bg-secondary-500 border-secondary-400',
		},
		{
			variant: 'outline',
			colorScheme: 'primary',
			className:
				'text-primary-400 border-primary-400/50 hover:bg-primary-400/20 hover:text-primary-500',
		},
		{
			variant: 'outline',
			colorScheme: 'secondary',
			className:
				'text-secondary-400 border-secondary-400/50 hover:bg-secondary-400/20 hover:text-secondary-500',
		},
		{
			variant: 'ghost',
			colorScheme: 'primary',
			className: 'text-primary-400 hover:bg-primary-400/20',
		},
		{
			variant: 'ghost',
			colorScheme: 'secondary',
			className: 'text-secondary-400 hover:bg-secondary-400/20',
		},
		{
			variant: 'link',
			colorScheme: 'primary',
			className: 'text-primary-400',
		},
		{
			variant: 'link',
			colorScheme: 'secondary',
			className: 'text-secondary-400',
		},
	],
	defaultVariants: {
		colorScheme: 'primary',
		variant: 'solid',
		size: 'md',
	},
});

export type IconButtonVariants = VariantProps<typeof iconButtonVariants>;
