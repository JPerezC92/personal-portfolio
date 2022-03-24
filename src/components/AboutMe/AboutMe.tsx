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

        <div className={`${styles.AboutMe_content}`}>
          <span className={`${styles.AboutMe_photo}`}>
            {/* <Image src={photo} alt="Philip photo" layout="responsive" /> */}
            <Image
              src="/personal-photo.jpg"
              alt="Philip photo"
              height="1000"
              width="800"
            />
          </span>

          <div className={`${styles.AboutMe_description}`}>
            <p>
              Vivo en <strong>Perú</strong>. Soy desarrollador enfocado a web,
              autodidacta y apasionado por la programación. Acabo de terminar de
              estudiar en el Instítuto Educativo <strong>SENATI</strong>.
            </p>

            <p>
              Actualmente estoy reforzando mis conocimientos en{" "}
              <strong>Python</strong> y aprendiendo sobre el framework{" "}
              <strong>FastApi</strong>
            </p>

            {/* <p>
              Puedes descargar mi
              <a href="./static/CV_2021.pdf" download="Philip_CV_2021">
                <strong>CV</strong>
              </a>
            </p> */}
          </div>
        </div>
      </>
    </section>
  );
};
