import {
  createStitches,
  defaultThemeMap,
  PropertyValue,
} from '@stitches/react';
import { colors } from 'src/shared/theme/colors';
import { fonts } from 'src/shared/theme/fonts';
import { fontSizes } from 'src/shared/theme/fontSizes';
import { media } from 'src/shared/theme/media';
import { sizes } from 'src/shared/theme/sizes';
import { space } from 'src/shared/theme/space';

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  theme,
} = createStitches({
  themeMap: { ...defaultThemeMap },
  theme: {
    colors,
    fonts,
    fontSizes,
    sizes,
    space,
  },
  media,
  utils: {
    coloWithOpacity: (value: PropertyValue<'color'>) => ({
      color: `${value}`,
    }),
  },
});

export const globalStyles = globalCss({
  '@import': [
    "url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')",
  ],
  html: {
    backgroundColor: '$info900',
  },
  '#__next': {
    minHeight: '100vh',
    display: 'grid',
  },
});
