import React from 'react';
import { Heading } from 'src/shared/components/Heading';
import { Hr } from 'src/shared/components/Hr';

interface SectionTitleProps {
  children?: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return (
    <>
      <Heading as="h2" fontStyle="L3" colorGradient="primary">
        {children}
      </Heading>
      <Hr css={{ marginBlockStart: '$space04', marginBlockEnd: '$space10' }} />{' '}
    </>
  );
};
