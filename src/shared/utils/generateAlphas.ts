import hexRgb from 'hex-rgb';

type AlphaScale =
  | 'a5'
  | 'a10'
  | 'a20'
  | 'a30'
  | 'a40'
  | 'a50'
  | 'a60'
  | 'a70'
  | 'a80'
  | 'a90';

export function generateAlphas<
  Obj extends { [K: string]: string },
  T extends keyof Obj & string
>(paletteColor: Obj) {
  const paletteColorAlphas = Object.entries(paletteColor).flatMap(
    ([key, value]) => {
      return [
        [`${key}_a5`, hexRgb(value, { format: 'css', alpha: 0.05 })],
        [`${key}_a10`, hexRgb(value, { format: 'css', alpha: 0.1 })],
        [`${key}_a20`, hexRgb(value, { format: 'css', alpha: 0.2 })],
        [`${key}_a30`, hexRgb(value, { format: 'css', alpha: 0.3 })],
        [`${key}_a40`, hexRgb(value, { format: 'css', alpha: 0.4 })],
        [`${key}_a50`, hexRgb(value, { format: 'css', alpha: 0.5 })],
        [`${key}_a60`, hexRgb(value, { format: 'css', alpha: 0.6 })],
        [`${key}_a70`, hexRgb(value, { format: 'css', alpha: 0.7 })],
        [`${key}_a80`, hexRgb(value, { format: 'css', alpha: 0.8 })],
        [`${key}_a90`, hexRgb(value, { format: 'css', alpha: 0.9 })],
      ] as const;
    }
  );

  return Object.fromEntries(paletteColorAlphas) as {
    [key in `${T}_${AlphaScale}`]: string;
  };
}
