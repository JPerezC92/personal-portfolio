import { tv, type VariantProps } from 'tailwind-variants';

export const ButtonClasses = tv({
	base: 'px-4 py-1 relative font-exo2 tracking-wider font-semibold  rounded border inline-flex justify-center items-center gap-2 transition duration-200 ease-in-out',
	variants: {
		colorScheme: {
			primary: '',
			secondary: '',
		},
		variant: {
			solid: 'text-neutral-900 hover:shadow-sm',
			outline: 'border-neutral-900 hover:shadow-sm',
			ghost: 'border-transparent',
			link: 'border-transparent before:content-[""] before:absolute before:inset-0 before:border-b before:bottom-1 before:scale-x-0 before:hover:scale-x-100 before:mx-auto overflow-hidden before:duration-300 before:ease-in-out before:transition-all px-0',
		},
		size: { sm: '', md: 'text-base md:text-lg' },
	},
	compoundVariants: [
		{
			variant: 'solid',
			colorScheme: 'primary',
			className:
				'bg-primary-400 hover:bg-primary-500 border-primary-400 hover:border-primary-500',
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
			className: 'text-primary-400 before:border-primary-400',
		},
		{
			variant: 'link',
			colorScheme: 'secondary',
			className: 'text-secondary-400 before:border-secondary-400',
		},
	],
	defaultVariants: {
		colorScheme: 'primary',
		variant: 'solid',
		size: 'md',
	},
});

export type ButtonVariants = VariantProps<typeof ButtonClasses>;
