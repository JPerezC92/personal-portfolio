import type { NextPage } from 'next';
import { Heading } from 'src/shared/components/Heading';
import { Text } from 'src/shared/components/Text';
import { css, styled } from 'stitches.config';

const NextPageStyled = styled('div', {
  paddingInline: '$space03',
});

const HomePage: NextPage = () => {
  return (
    <NextPageStyled>
      <main
        className={css({
          maxWidth: '$max-w-screen-2xl',
          margin: 'auto',
        })()}
      >
        <Heading
          css={{
            margin: 'auto',
            maxWidth: '$max-w-xl',
            paddingBlock: '$space08',
          }}
        >
          <Text fontStyle="L1">Bienvenido, soy</Text>

          <Heading fontStyle="L2" as="div" css={{ marginBlock: '$space02' }}>
            Philip Perez Castro,
          </Heading>

          <Text fontStyle="L1">
            React developer en entrenamiento, 📚 autodidacta, principalmente
            interesado en ampliar mis conocimientos en JavaScript y Typescript.
          </Text>
        </Heading>

        <section id="about-me" className={css({ paddingBlock: '$space08' })()}>
          <Heading as="h2" fontStyle="L2">
            Sobre mí
          </Heading>

          <hr
            className={css({
              borderColor: '$secondary600',
              marginBlock: '$space04',
              borderWidth: '1px',
              borderStyle: 'solid',
            })()}
          />

          <div
            className={css({ '& p + p': { marginBlockStart: '$space08' } })()}
          >
            <Text as="p">
              Vivo en <strong>Perú</strong>. Soy desarrollador enfocado a web,
              autodidacta y apasionado por la programación. Acabo de terminar de
              estudiar en el Instituto <strong>SENATI</strong>.
            </Text>

            <Text as="p">
              Actualmente estoy reforzando mis conocimientos en{' '}
              <strong>Css</strong> y aprendiendo a usar la biblioteca{' '}
              <strong>Styled components</strong>.
            </Text>
          </div>
        </section>
      </main>
    </NextPageStyled>
  );
};

export default HomePage;
