import { EnumType, EnumTypeInfer } from '@/shared/utils/enumType';

export const sectionList = EnumType('sobre_mi', 'conocimientos', 'proyectos');
export type SectionList = EnumTypeInfer<typeof sectionList>;
