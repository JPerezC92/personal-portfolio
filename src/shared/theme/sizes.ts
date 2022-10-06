// max-w-0	max-width: 0rem; /* 0px */
// max-w-none	max-width: none;
// max-w-xs	max-width: 20rem; /* 320px */
// max-w-sm	max-width: 24rem; /* 384px */
// max-w-md	max-width: 28rem; /* 448px */
// max-w-lg	max-width: 32rem; /* 512px */
// max-w-xl	max-width: 36rem; /* 576px */
// max-w-2xl	max-width: 42rem; /* 672px */
// max-w-3xl	max-width: 48rem; /* 768px */
// max-w-4xl	max-width: 56rem; /* 896px */
// max-w-5xl	max-width: 64rem; /* 1024px */
// max-w-6xl	max-width: 72rem; /* 1152px */
// max-w-7xl	max-width: 80rem; /* 1280px */
// max-w-full	max-width: 100%;
// max-w-min	max-width: min-content;
// max-w-max	max-width: max-content;
// max-w-fit	max-width: fit-content;
// max-w-prose	max-width: 65ch;
// max-w-screen-sm	max-width: 640px;
// max-w-screen-md	max-width: 768px;
// max-w-screen-lg	max-width: 1024px;
// max-w-screen-xl	max-width: 1280px;
// max-w-screen-2xl	max-width: 1536px;

const maxWidth = {
  'max-w-0': '0rem',
  'max-w-none': 'none',
  'max-w-xs': '20rem',
  'max-w-sm': '24rem',
  'max-w-md': '28rem',
  'max-w-lg': '32rem',
  'max-w-xl': '36rem',
  'max-w-2xl': '42rem',
  'max-w-3xl': '48rem',
  'max-w-4xl': '56rem',
  'max-w-5xl': '64rem',
  'max-w-6xl': '72rem',
  'max-w-7xl': '80rem',
  'max-w-full': '100%',
  'max-w-min': 'min-content',
  'max-w-max': 'max-content',
  'max-w-fit': 'fit-content',
  'max-w-prose': '65ch',
  'max-w-screen-sm': '640px',
  'max-w-screen-md': '768px',
  'max-w-screen-lg': '1024px',
  'max-w-screen-xl': '1280px',
  'max-w-screen-2xl': '1536px',
} as const;

export const sizes = { ...maxWidth } as const;
