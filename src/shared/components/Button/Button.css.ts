import { tv, type VariantProps } from 'tailwind-variants';

export const ButtonClasses = tv({
	base: 'px-4 py-2 rounded-md border inline-flex justify-center items-center gap-2 transition duration-200 ease-in-out shadow',
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
		size: { sm: '', md: '' },
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
			className: 'text-primary-400 border-primary-400 hover:bg-primary-400/20',
		},
		{
			variant: 'outline',
			colorScheme: 'secondary',
			className:
				'text-secondary-400 border-secondary-400 hover:bg-secondary-400/20',
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

export type ButtonVariants = VariantProps<typeof ButtonClasses>;
