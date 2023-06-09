import React from 'react';

import * as HrCss from './Hr.css';

type HrProps = React.ComponentProps<'hr'> & HrCss.HrVariants;

export const Hr: React.FC<HrProps> = ({ className, ...props }) => {
	return <hr className={HrCss.hr({ className })} {...props} />;
};
