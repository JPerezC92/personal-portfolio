import React from 'react';

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
		<i className={IconCss.IconCss({ className, size })} {...props}>
			{icon}
		</i>
	);
};
