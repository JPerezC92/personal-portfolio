import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/shared/utils/cn';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-exo2 font-semibold tracking-wider transition duration-200 ease-in-out border disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				solid: 'text-neutral-900 hover:shadow-xs',
				outline: 'hover:shadow-xs',
				ghost: 'border-transparent',
				link: 'border-transparent relative before:content-[""] before:absolute before:inset-0 before:border-b before:bottom-1 before:scale-x-0 before:hover:scale-x-100 before:mx-auto overflow-hidden before:duration-300 before:ease-in-out before:transition-all px-0',
			},
			colorScheme: {
				primary: '',
				secondary: '',
			},
			size: {
				sm: 'px-3 py-1 text-sm',
				md: 'px-4 py-1 text-base md:text-lg',
				lg: 'px-6 py-2 text-lg',
				icon: 'p-2 aspect-square shadow-sm',
			},
		},
		compoundVariants: [
			// solid
			{
				variant: 'solid',
				colorScheme: 'primary',
				className:
					'bg-primary-400 hover:bg-primary-500 border-primary-400 hover:border-primary-500',
			},
			{
				variant: 'solid',
				colorScheme: 'secondary',
				className:
					'bg-secondary-400 hover:bg-secondary-500 border-secondary-400',
			},
			// outline
			{
				variant: 'outline',
				colorScheme: 'primary',
				className:
					'text-primary-400 border-primary-400 hover:bg-primary-400/20',
			},
			{
				variant: 'outline',
				colorScheme: 'secondary',
				className:
					'text-secondary-400 border-secondary-400 hover:bg-secondary-400/20',
			},
			// ghost
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
			// link
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
			// icon outline
			{
				variant: 'outline',
				size: 'icon',
				colorScheme: 'primary',
				className:
					'text-primary-400 border-primary-400/50 hover:bg-primary-400/20 hover:text-primary-500',
			},
			{
				variant: 'outline',
				size: 'icon',
				colorScheme: 'secondary',
				className:
					'text-secondary-400 border-secondary-400/50 hover:bg-secondary-400/20 hover:text-secondary-500',
			},
		],
		defaultVariants: {
			variant: 'solid',
			colorScheme: 'primary',
			size: 'md',
		},
	},
);

type ButtonProps = React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, variant, colorScheme, size, asChild = false, ...props },
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(
					buttonVariants({ variant, colorScheme, size }),
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = 'Button';

export { Button, buttonVariants };
