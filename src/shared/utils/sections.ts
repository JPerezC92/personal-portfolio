import { EnumType, EnumTypeInfer } from '@/shared/utils';

export const sectionList = EnumType('sobre_mi', 'conocimientos', 'proyectos');
export type SectionList = EnumTypeInfer<typeof sectionList>;
