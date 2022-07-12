import { FC } from "react";
import { SiReact, SiTypescript, SiJavascript } from "react-icons/si";

import styles from "./Hero.module.scss";

type HeroProps = {};

export const Hero: FC<HeroProps> = (props) => {
  const reactColor = "#61dafb";
  const javaScriptColor = "#f7df1e";
  const typescriptColor = "#3178c6";

  return (
    <section className={`${styles.Hero}`}>
      <div className={`${styles.Hero_container}`}>
        <h1 className={`${styles.Hero_title}`}>
          <div className={styles.Hero_welcome}>Bienvenido,</div>

          <strong>Soy Philip Perez.</strong>
          <br />

          <span className={`${styles.Hero_subtitle}`}>
            <i style={{ color: reactColor }}>
              <SiReact />
            </i>{" "}
            React developer en entrenamiento, 📚 autodidacta, principalmente
            interesado en ampliar mis conocimientos de{" "}
            <i style={{ color: javaScriptColor }}>
              <SiJavascript />
            </i>{" "}
            JavaScript y{" "}
            <i style={{ color: typescriptColor }}>
              <SiTypescript />
            </i>{" "}
            Typescript.
          </span>
        </h1>

        {/* <button className={styles.Hero_button} type="button">
          Descargar CV
        </button> */}
      </div>
    </section>
  );
};
