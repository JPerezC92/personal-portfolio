import React from 'react';

import * as HeadingCss from './Heading.css';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';

type HeadingProps<T extends Readonly<Tag>> = {
	component?: T | 'h1';
} & React.ComponentProps<T> &
	HeadingCss.HeadingVariants;

export const Heading = React.forwardRef(function Heading<T extends Tag>(
	{
		component: Component = 'h1',
		fontSize,
		className,
		...props
	}: HeadingProps<T>,
	ref: React.ComponentProps<T>['ref'],
) {
	return (
		<Component
			className={HeadingCss.headingVariants({ fontSize, className })}
			{...props}
			ref={ref as any}
		/>
	);
});
