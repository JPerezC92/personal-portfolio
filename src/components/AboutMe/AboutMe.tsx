import Image from "next/image";
import { FC } from "react";

import photo from "public/personal-photo.jpg";
import styles from "./AboutMe.module.scss";

type AboutMeProps = {};

export const AboutMe: FC<AboutMeProps> = (props) => {
  return (
    <section id="about-me" className={`${styles.AboutMe}`}>
      <>
        <h2 className={`${styles.AboutMe_title}`}>Sobre mi</h2>
        <span className={`${styles.AboutMe_photo}`}>
          <Image src={photo} alt="Philip photo" layout="responsive" />
        </span>

        <p className={`${styles.AboutMe_text}`}>
          Me llamo Philip Pérez Castro, vivo en Ancash(Perú), curso el segundo
          año de estudio de Desarrollo de software en el Instítuto Educativo
          SENATI. Soy una persona autodidacta y responsable. Actualmente estoy
          aprendiendo NodeJS con el framework Express Puedes descargar mi CV
        </p>
      </>
    </section>
  );
};
