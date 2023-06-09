import React from 'react';

import * as TextCss from './Text.css';

type Tag = 'span' | 'p' | 'div' | 'blockquote';

type TextProps<T extends Tag> = {
	component?: T | 'p';
} & React.ComponentProps<T> &
	TextCss.TextVariants;

export const Text = React.forwardRef(function Text<T extends Tag>(
	{ component: Component = 'p', fontSize, className, ...props }: TextProps<T>,
	ref: React.ForwardedRef<React.ElementRef<T>>,
) {
	return (
		<Component
			className={TextCss.textVariants({
				fontSize,
				className,
			})}
			{...(props as any)}
			ref={ref}
		/>
	);
});
