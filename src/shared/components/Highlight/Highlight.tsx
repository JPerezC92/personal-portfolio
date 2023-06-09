import React from 'react';

import * as HighlightCss from './Highlight.css';

type HighlightProps = React.ComponentProps<'b'>;

export const Highlight: React.FC<HighlightProps> = ({
	className,
	...props
}) => {
	return <b className={HighlightCss.higthlight({ className })} {...props} />;
};
