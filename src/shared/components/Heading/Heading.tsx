import React from 'react';
import { styled } from 'stitches.config';

export const Heading = styled('h1', {
  fontFamily: '$exo2',

  color: '$special1_100',
  fontWeight: '900',
  variants: {
    fontStyle: {
      L1: {
        fontSize: '$8xl',
        lineHeight: '80%',
        letterSpacing: '0',
        textTransform: 'uppercase',
        '@bp1': {
          fontSize: '$9xl',
        },
      },
      L2: {
        fontSize: '$4xl',
        lineHeight: '80%',
        letterSpacing: '0',
        textTransform: 'uppercase',
        '@bp1': {
          fontSize: '$5xl',
        },
      },
      L3: {
        fontSize: '$2xl',
        lineHeight: '100%',
        letterSpacing: '0',
        textTransform: 'uppercase',
        '@bp1': {
          fontSize: '$4xl',
        },
      },
    },
  },
});
