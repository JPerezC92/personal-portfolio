import { VariantProps } from '@stitches/react';
import { motion } from 'framer-motion';
import { styled } from 'stitches.config';

export type SectionProps = VariantProps<typeof Section> &
  Parameters<typeof Section>[0];

export const Section = styled(motion.section);
