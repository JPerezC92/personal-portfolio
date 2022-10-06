import { generateAlphas } from 'src/shared/utils/generateAlphas';
import { generatePallete } from 'src/shared/utils/generatePallete';

const primary = generatePallete('#2EC4B6', 'primary');
const primaryAlphas = generateAlphas(primary);

const secondary = generatePallete('#FF8A5B', 'secondary');
const secondaryAlphas = generateAlphas(secondary);

const success = generatePallete('#1A936F', 'success');
const successAlphas = generateAlphas(success);

const info = generatePallete('#20A4F3', 'info');
const infoAlphas = generateAlphas(info);

const danger = generatePallete('#E71D36', 'danger');
const dangerAlphas = generateAlphas(danger);

const warning = generatePallete('#FF9F1C', 'warning');
const warningAlphas = generateAlphas(warning);

const neutralDark = generatePallete('#011627', 'neutral_dark');
const neutralDarkAlphas = generateAlphas(neutralDark);

const neutralMedium = generatePallete('#465775', 'neutral_medium');
const neutralMediumAlphas = generateAlphas(neutralMedium);

const neutralLigth = generatePallete('#231651', 'neutral_ligth');
const neutralLigthAlphas = generateAlphas(neutralLigth);

const special1 = generatePallete('#E9D8A5', 'special1_');
const special1Alphas = generateAlphas(special1);

const special2 = generatePallete('#8B26C0', 'special2_');
const special2Alphas = generateAlphas(special2);

export const colors = {
  ...primary,
  ...primaryAlphas,

  ...secondary,
  ...secondaryAlphas,

  ...success,
  ...successAlphas,

  ...info,
  ...infoAlphas,

  ...warning,
  ...warningAlphas,

  ...danger,
  ...dangerAlphas,

  ...neutralDark,
  ...neutralDarkAlphas,

  ...neutralMedium,
  ...neutralMediumAlphas,

  ...neutralLigth,
  ...neutralLigthAlphas,

  ...special1,
  ...special1Alphas,

  ...special2,
  ...special2Alphas,
};
