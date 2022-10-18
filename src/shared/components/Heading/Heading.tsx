import { styled } from 'stitches.config';

export const Heading = styled('h1', {
  fontFamily: '$exo2',
  color: '$special1_200',
  fontWeight: '900',
  variants: {
    fontStyle: {
      L1: {
        fontSize: '$8xl',
        lineHeight: '80%',
        letterSpacing: '0',
        textTransform: 'uppercase',
        '@sm': {
          fontSize: '$9xl',
        },
      },
      L2: {
        fontSize: '$5xl',
        lineHeight: '80%',
        letterSpacing: '0',
        textTransform: 'uppercase',
        '@sm': {
          fontSize: '$6xl',
        },
      },
      L3: {
        fontSize: '$4xl',
        lineHeight: '100%',
        letterSpacing: '0',
        textTransform: 'uppercase',
        '@sm': {
          fontSize: '$5xl',
        },
      },
      L4: {
        fontSize: '$3xl',
        lineHeight: '100%',
        letterSpacing: '0',
        textTransform: 'uppercase',
        '@sm': {
          fontSize: '$4xl',
        },
      },
      L5: {
        fontSize: '$2xl',
        lineHeight: '100%',
        letterSpacing: '0',
        textTransform: 'uppercase',
        '@sm': {
          fontSize: '$3xl',
        },
      },
    },
    colorGradient: {
      primary: {
        backgroundImage:
          'linear-gradient(to right, $primary500, $special2_500)',
        backgroundClip: 'text',
        color: 'transparent',
      },
    },
  },
});
