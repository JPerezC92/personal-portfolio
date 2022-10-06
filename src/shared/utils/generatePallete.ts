import { generate } from 'smart-swatch/lib/generate';

function renamePalleteKeys<
  Obj extends PaletteColor,
  RR extends keyof Obj & string,
  Prefix extends Readonly<string>,
  Result extends { [k in `${Prefix}${RR}`]: string }
>(pallete: Obj, prefix: Prefix): Result {
  const renamedPallete = Object.entries(pallete).map(([key, v]) => [
    (prefix + key) as `${Prefix}${RR}`,
    v,
  ]);

  return Object.fromEntries(renamedPallete) as Result;
}

export type ColorScale =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

type PaletteColor = {
  [K in ColorScale]: string;
};

export function generatePallete<
  Color extends Readonly<string>,
  Prefix extends Readonly<string>
>(color: Color, prefix: Prefix) {
  return renamePalleteKeys(generate(color) as PaletteColor, prefix);
}
