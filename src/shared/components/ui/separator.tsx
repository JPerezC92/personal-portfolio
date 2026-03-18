'use client';

import * as SeparatorPrimitive from '@radix-ui/react-separator';
import React from 'react';

import { cn } from '@/shared/utils/cn';

const Separator = React.forwardRef<
	React.ComponentRef<typeof SeparatorPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
	(
		{ className, orientation = 'horizontal', decorative = true, ...props },
		ref,
	) => (
		<SeparatorPrimitive.Root
			ref={ref}
			decorative={decorative}
			orientation={orientation}
			className={cn(
				'shrink-0 border-primary-500',
				orientation === 'horizontal'
					? 'h-[1px] w-full border-t'
					: 'h-full w-[1px] border-l',
				className,
			)}
			{...props}
		/>
	),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
