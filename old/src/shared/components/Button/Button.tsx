import { styled } from 'stitches.config';

export const Button = styled('button', {
  borderRadius: '.2rem',
  borderWidth: '0',
  display: 'flex',
  fontFamily: '$exo2',
  fontWeight: '500',
  lineHeight: '100%',
  paddingBlock: '$space02',
  paddingInline: '$space04',
  transition: 'all 150ms ease-in-out',
  fontSize: '$base',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$space02',
  '@sm': { fontSize: '$lg' },

  '&:hover': { filter: 'brightness(.9)' },

  '&:disabled': { opacity: '0' },

  ['&[aria-busy=true]']: { opacity: '0.5', pointerEvents: 'none' },

  variants: {
    colorScheme: {
      primary: {
        $$solidColor: '$colors$neutral_dark700',
        $$solidBackgroundColor: '$colors$primary400',
        $$backgroundColor: '$colors$primary400_a10',
        $$color: '$colors$primary400',
        $$bordeColor: '$colors$primary300_a40',
      },
      secondary: {
        $$solidColor: '$colors$neutral_dark700',
        $$solidBackgroundColor: '$colors$secondary200',
        $$backgroundColor: '$colors$secondary200_a10',
        $$color: '$colors$secondary200',
        $$bordeColor: '$colors$secondary200_a40',
      },
    },
    variant: {
      solid: {
        backgroundColor: '$$solidBackgroundColor',
        color: '$$solidColor',
      },
      outline: {
        border: '1px solid $$bordeColor',
        color: '$$color',
        '&:hover': { backgroundColor: '$$backgroundColor' },
      },
      ghost: {
        color: '$$color',
        '&:hover': { backgroundColor: '$$backgroundColor' },
      },
      unstyled: {},
    },
  },

  defaultVariants: {
    colorScheme: 'primary',
    variant: 'solid',
  },
});
