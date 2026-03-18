import React from 'react';

import { cn } from '@/shared/utils/cn';

import * as IconCss from './Icon.css';

type IconProps = {
	icon: React.ReactElement;
} & React.ComponentProps<'i'> &
	IconCss.IconVariants;

export const Icon: React.FC<IconProps> = ({
	icon,
	size,
	className,
	...props
}) => {
	return (
		<i className={cn(IconCss.IconCss({ size }), className)} {...props}>
			{icon}
		</i>
	);
};
