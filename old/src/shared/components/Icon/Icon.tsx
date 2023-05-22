import React from 'react';
import { css, styled } from 'stitches.config';

type IconBaseProps = {
  asIcon: React.FC<React.ComponentProps<'svg'>>;
} & React.ComponentProps<'i'>;

const IconBase: React.FC<IconBaseProps> = ({ asIcon: Icon, ...props }) => {
  return (
    <i {...props}>
      <Icon className={css({ pointerEvents: 'none' })()} />
    </i>
  );
};

export const Icon = styled(IconBase, {
  display: 'inline-block',
  lineHeight: '0',
  '& > svg': {
    display: 'inline-block',
    stroke: 'CurrentColor',
    fill: 'CurrentColor',
  },
  variants: {
    size: {
      xs: { fontSize: '$lg', '@sm': { fontSize: 'xl' } },
      sm: { fontSize: '$xl', '@sm': { fontSize: '2xl' } },
      md: { fontSize: '$2xl', '@sm': { fontSize: '3xl' } },
      lg: { fontSize: '$3xl', '@sm': { fontSize: '4xl' } },
      xl: { fontSize: '$5xl', '@sm': { fontSize: '6xl' } },
    },
  },
});
