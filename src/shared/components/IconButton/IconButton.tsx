import Link from 'next/link';
import React from 'react';

import * as IconButtonCss from './IconButton.css';

type Tag = 'button' | 'a';

type IconButtonProps<T extends Tag> = {
	component?: T | string;
	icon: React.ReactElement;
} & (T extends 'a' ? Parameters<typeof Link>[0] : React.ComponentProps<T>) &
	IconButtonCss.IconButtonVariants;

export const IconButton = React.forwardRef(function IconButton<T extends Tag>(
	{
		icon: Icon,
		className,
		component = 'button',
		colorScheme,
		variant,
		size,
		...props
	}: IconButtonProps<T>,
	ref: React.ComponentProps<T>['ref'],
) {
	const Component = component === 'a' ? Link : component;

	return (
		<Component
			className={IconButtonCss.iconButtonVariants({
				colorScheme,
				size,
				variant,
				className,
			})}
			{...(props as any)}
			ref={ref as any}
		>
			{Icon}
		</Component>
	);
});
