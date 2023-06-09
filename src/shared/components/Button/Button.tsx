import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import * as ButtonCss from './Button.css';

type Tag = 'button' | 'a';

type ButtonProps<T extends Tag> = {
	component?: T | 'button';
} & (T extends 'a' ? Parameters<typeof Link>[0] : React.ComponentProps<T>) &
	ButtonCss.ButtonVariants;

export const Button = React.forwardRef(function Button<
	T extends Tag = 'button',
>(
	{
		component = 'button',
		colorScheme,
		size,
		variant,
		className,
		...props
	}: ButtonProps<T>,
	ref: React.ComponentProps<T>['ref'],
) {
	const Component = component === 'a' ? Link : component;

	return (
		<Component
			className={clsx([
				ButtonCss.ButtonClasses({ colorScheme, variant, size, className }),
			])}
			{...(props as any)}
			ref={ref}
		/>
	);
});
