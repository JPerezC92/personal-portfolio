import clsx from 'clsx';
import React from 'react';

import * as ButtonCss from './Button.css';

type ButtonProps = React.ComponentProps<'button'> & ButtonCss.ButtonVariants;

export const Button: React.FC<ButtonProps> = ({
	colorScheme,
	size,
	variant,
	...props
}) => {
	return (
		<button
			className={clsx([
				ButtonCss.ButtonClasses({ colorScheme, variant, size }),
			])}
			{...props}
		/>
	);
};
