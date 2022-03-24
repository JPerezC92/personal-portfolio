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
          <li
            key={project.url}
            className={styles.Proyects_card}
            // width="min(100%, 20rem)"
            // border="1px solid black"
            // borderRadius="xl"
            // overflow="hidden"
            // boxShadow="0 0 0.5rem gray"
            // margin="0"
            // padding="0"
          >
            <h3
              className={styles.Card_title}
              // as="header"
              // background="black"
              // color="white"
              // paddingBlock="0.5rem"
              // paddingInline="1rem"
              // textAlign="center"
              // fontSize="1.5rem"
              // fontWeight="bold"
            >
              {project.name}
            </h3>

            <div
              className={styles.Card_image}

              // as="div"
              // borderRadius="1rem"
              // height="22rem"
              // overflow="hidden"
              // marginBlock="0.2rem"
            >
              <Image
                src={project.image}
                alt={project.name}
                layout="responsive"
                objectFit="cover"
                objectPosition="top"
              />
            </div>

            <div
              className={styles.Card_buttons}
              // isAttached
              // width="100%"
              // display="grid"
              // gridTemplateColumns="repeat(auto-fill, 50%)"
            >
              <Link href={project.url} passHref>
                <a
                // as="a"
                // background="black"
                // color="white"
                // target="_blank"
                // borderRadius="0"
                // transition="all 0.5s ease-in-out"
                // _hover={{ background: "rgb(185, 90, 49)" }}
                >
                  Demo
                </a>
              </Link>
              <Link href={project.repository} passHref>
                <a
                // as="a"
                // background="black"
                // color="white"
                // target="_blank"
                // borderRadius="0"
                // transition="all 0.5s ease-in-out"
                // _hover={{ background: "rgb(185, 90, 49)" }}
                >
                  Repositorio
                </a>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
