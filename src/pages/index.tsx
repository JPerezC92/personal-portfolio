import type { NextPage } from 'next';
import { AboutMe } from 'src/landing/components/AboutMe';
import { Footer } from 'src/landing/components/Footer';
import { Hero } from 'src/landing/components/Hero';
import { Navbar } from 'src/landing/components/Navbar';
import { Projects } from 'src/landing/components/Projects';
import { Skills } from 'src/landing/components/Skills';
import { Box } from 'src/shared/components/Box';
import { Image } from 'src/shared/components/Image';
import { ScrollArea } from 'src/shared/components/ScrollArea';
import { Section } from 'src/shared/components/Section';
import { SEO } from 'src/shared/components/SEO';
import { rgbDataURL } from 'src/shared/utils/rgbDataURL';
import { styled } from 'stitches.config';

const NextPageStyled = styled('div', {
  position: 'relative',
  backgroundColor: '$special2_900_a90',

  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    height: '100%',
    width: '100%',
    background: 'url(/body-bg.webp)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'blur(.125rem)',
    zIndex: '-1',
  },
});

const HomePage: NextPage = () => {
  return (
    <ScrollArea>
      <SEO
        title="Philip Perez Castro"
        siteTitle="Frontend developer"
        description="Aquí puedes encontrar información sobre Philip Perez Castro"
      />

      <NextPageStyled>
        <Navbar />

        <Box
          as="main"
          css={{
            maxWidth: '$max-w-screen-lg',
            marginInline: 'auto',
            paddingInline: '$space04',
            paddingBottom: '$space20',
            [`& ${Section} + ${Section}`]: { paddingTop: '$space20' },
            '@lg': {
              paddingInline: '$space00',
              [`& ${Section} + ${Section}`]: { paddingTop: '$space30' },
            },
          }}
        >
          <Hero id="hero" />

          <AboutMe id="about-me" />

          <Skills id="skills" />

          <Projects id="projects" />
        </Box>

        <Box as="picture" css={{ display: 'flex' }}>
          <Image
            src="/playful-cat.svg"
            width="0"
            height="0"
            alt="playful cat"
            placeholder="blur"
            blurDataURL={rgbDataURL(43, 432, 21)}
            css={{
              width: 'auto',
              height: 'auto',
              marginInline: 'auto',
              '@md': { maxWidth: '$max-w-md' },
            }}
          />
        </Box>

        <Footer />
      </NextPageStyled>
    </ScrollArea>
  );
};

export default HomePage;
