import Stitches from '@stitches/react';
import { IntrinsicElementsKeys } from '@stitches/react/types/styled-component';
import React from 'react';
import { Icon } from 'src/shared/components/Icon';
import { CSSThemeProperties, styled } from 'stitches.config';

export const IconButtonStyled = styled('button', {
  lineHeight: '0',
  display: 'inline-block',
  padding: '$space02',
  transition: 'filter .2s ease-out, background .2s ease-out',
  borderRadius: '.25rem',
  '&:hover': { filter: 'brightness(.9)' },
  variants: {
    colorScheme: {
      primary: {
        $$solidColor: '$colors$neutral_dark700',
        $$solidBackgroundColor: '$colors$primary300',
        $$backgroundColor: '$colors$primary300_a10',
        $$color: '$colors$primary300',
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

type IconButtonProps<Tag extends IntrinsicElementsKeys> =
  React.ComponentProps<Tag> &
    Stitches.VariantProps<typeof Icon> &
    Stitches.VariantProps<typeof IconButtonStyled> & {
      asIcon: React.FC;
      as?: Tag;
      css?: CSSThemeProperties;
    };

type IconButtonElement = <Tag extends IntrinsicElementsKeys = 'button'>(
  props: IconButtonProps<Tag>
) => React.ReactElement<IconButtonProps<Tag>, Tag>;

export const IconButton = React.forwardRef(function IconButton(
  { asIcon, size, ...props },
  ref
) {
  return (
    <IconButtonStyled {...props} ref={ref}>
      <Icon size={size} asIcon={asIcon} />
    </IconButtonStyled>
  );
}) as IconButtonElement;

IconButton.toString = () => IconButtonStyled.toString();
