import * as ScrollAreaPrimitives from '@radix-ui/react-scroll-area';
import React from 'react';
import { styled } from 'stitches.config';

const ScrollAreaRoot = styled(ScrollAreaPrimitives.Root, {
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  borderRadius: 'inherit',
});

const ScrollAreaViewport = styled(ScrollAreaPrimitives.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
  scrollBehavior: 'smooth',
});

const ScrollAreaScrollAreaThumb = styled(ScrollAreaPrimitives.ScrollAreaThumb, {
  borderRadius: '.5rem',
  width: '1rem',
  height: '1rem',
  backgroundColor: '$secondary300_a50',
  transition: 'background 160ms ease-out',
});

const ScrollAreaScrollbar = styled(ScrollAreaPrimitives.Scrollbar, {
  userSelect: 'none',
  touchAction: 'none',
  width: '.5rem',
  transition: 'background 160ms ease-out',
  backgroundColor: '$primary100_a10',
  [`&:hover ${ScrollAreaScrollAreaThumb}`]: {
    backgroundColor: '$secondary300',
  },
});

const ScrollAreaScrollAreaCorner = styled(
  ScrollAreaPrimitives.ScrollAreaCorner,
  {}
);

interface ScrollAreaProps {
  children?: React.ReactNode;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ children }) => {
  return (
    <ScrollAreaRoot type="scroll">
      <ScrollAreaViewport>{children}</ScrollAreaViewport>

      <ScrollAreaScrollbar orientation="horizontal">
        <ScrollAreaScrollAreaThumb>dasasd</ScrollAreaScrollAreaThumb>
      </ScrollAreaScrollbar>

      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaScrollAreaThumb />
      </ScrollAreaScrollbar>

      <ScrollAreaScrollAreaCorner />
    </ScrollAreaRoot>
  );
};
