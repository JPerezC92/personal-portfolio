import Image from "next/image";
import { FC } from "react";

import styles from "./AboutMe.module.scss";

type AboutMeProps = {};

export const AboutMe: FC<AboutMeProps> = (props) => {
  return (
    <section className={`${styles.AboutMe}`}>
      {/* <Box background="linear-gradient(to bottom, hsla(24, 69%, 67%, 1) 0, hsla(148, 62%, 64%, 1) 100%)"> */}
      <div
      // as="section"
      // id="about-me"
      // alignItems="center"
      // columnGap="5rem"
      // display="flex"
      // flexWrap="wrap"
      // justifyContent="center"
      // paddingBlock="5rem"
      // paddingInline="1rem"
      // rowGap="2rem"
      >
        <span
        // as="span"
        // width="min(100%, 15rem)"
        // borderRadius="1rem"
        // overflow="hidden"
        >
          <Image src={photo} alt="Philip photo" layout="responsive" />
        </span>
        <p
        //  width="min(100%, 25rem)"
        >
          Me llamo Philip Pérez Castro, vivo en Ancash(Perú), curso el segundo
          año de estudio de Desarrollo de software en el Instítuto Educativo
          SENATI. Soy una persona autodidacta y responsable. Actualmente estoy
          aprendiendo NodeJS con el framework Express Puedes descargar mi CV
        </p>
      </div>
      {/* </Box> */}
    </section>
  );
};
