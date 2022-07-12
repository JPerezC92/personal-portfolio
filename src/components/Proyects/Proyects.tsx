import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { projects } from "src/utils/projects";

import styles from "./Proyects.module.scss";

type ProyectsProps = {};

export const Proyects: FC<ProyectsProps> = (props) => {
  return (
    <section className={styles.Proyects} id="projects">
      <h2 className={styles.Proyects_title}>Proyectos</h2>

      <ul className={styles.Proyects_list}>
        {projects.map((project) => (
          <li key={project.repository} className={styles.Proyects_card}>
            <h3 className={styles.Card_title}>{project.name}</h3>

            <div className={styles.Card_image}>
              <Image
                src={project.image}
                alt={project.name}
                layout="responsive"
                objectFit="cover"
                objectPosition="top"
              />
            </div>

            <div className={styles.Card_buttons}>
              {project.url && (
                <Link href={project.url} passHref>
                  <a target="_blank">Demo</a>
                </Link>
              )}

              <Link href={project.repository} passHref>
                <a target="_blank">Repositorio</a>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
