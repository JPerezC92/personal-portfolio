import { styled } from 'stitches.config';

export const Button = styled('button', {
  fontFamily: '$sans',
  fontWeight: '400',
  backgroundColor: '$primary400',
  borderRadius: '.2rem',
  borderWidth: '0',
  paddingBlock: '$',
  paddingInline: '$space02',
  transition: 'all 150ms ease-in-out',
  '&:hover': {
    filter: 'saturate(2)',
  },

  '&:disabled': {
    opacity: '0',
  },

  ['&[aria-busy=true]']: {
    opacity: '0.5',
    pointerEvents: 'none',
  },

  // variants: {
  //   vari: {
  //     unstyled: {},
  //     primary: {
  //       backgroundColor: '$',
  //       color: '$white',
  //     },
  //   },
  // },
  // compoundVariants: [],
  // defaultVariants: {
  //   vari: 'primary',
  // },
});
