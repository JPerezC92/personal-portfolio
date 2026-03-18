import React from 'react';

import { cn } from '@/shared/utils/cn';

import { highlight } from './Highlight.css';

type HighlightProps = React.ComponentProps<'b'>;

export const Highlight: React.FC<HighlightProps> = ({
	className,
	...props
}) => {
	return <b className={cn(highlight(), className)} {...props} />;
};
