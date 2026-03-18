import React from 'react';

import { cn } from '@/shared/utils/cn';

import * as TextCss from './Text.css';

type Tag = 'span' | 'p' | 'div' | 'blockquote';

type TextProps<T extends Tag> = {
	component?: T | 'p';
} & React.ComponentProps<T> &
	TextCss.TextVariants;

export function Text<T extends Tag>({
	component: Component = 'p',
	fontSize,
	className,
	...props
}: TextProps<T>) {
	return (
		<Component
			className={cn(TextCss.textVariants({ fontSize }), className)}
			{...(props as any)}
		/>
	);
}
