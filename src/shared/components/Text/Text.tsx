import { styled } from 'stitches.config';

export const Text = styled('span', {
  color: '$special1_100',
  fontFamily: '$exo2',
  '& strong': {
    $$shadow: '$colors$secondary300',
    fontWeight: '600',
    textShadow: '0 0 .2rem $$shadow',
    color: '$$shadow',
  },
  variants: {
    fontStyle: {
      L1: {
        fontSize: '$base',
        fontWeight: '600',
        letterSpacing: '0',
        lineHeight: '150%',
        '@sm': { fontSize: '$lg' },
      },
      L2: {
        fontSize: '$xs',
        fontWeight: '600',
        letterSpacing: '0',
        lineHeight: '150%',
        '@sm': { fontSize: '$sm' },
      },
    },
    textStyle: {
      allCaps: { textTransform: 'uppercase' },
      lightWeight: { letterSpacing: '0', fontWeight: '500' },
    },
  },
  compoundVariants: [
    {
      fontStyle: 'L1',
      textStyle: 'allCaps',
      css: { letterSpacing: '.24em' },
    },
    {
      fontStyle: 'L2',
      textStyle: 'allCaps',
      css: { letterSpacing: '0', '@sm': { letterSpacing: '.05em' } },
    },
  ],
});
