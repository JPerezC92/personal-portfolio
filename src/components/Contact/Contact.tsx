import Link from "next/link";
import { FC } from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { SiGmail } from "react-icons/si";

import styles from "./Contact.module.scss";

type ContactProps = {};

export const Contact: FC<ContactProps> = (props) => {
  return (
    <>
      <section className={styles.Contact} id="contact">
        <h2 className={styles.Contact_title}>Contacto</h2>

        <ul className={styles.Contact_list}>
          <li>
            <Link href="https://pe.linkedin.com/in/jperezc92">
              <a target="_blank">
                <i>
                  <AiFillLinkedin />
                </i>
              </a>
            </Link>
          </li>

          <li>
            <Link href="https://github.com/JPerezC92">
              <a target="_blank">
                <i>
                  <AiFillGithub />
                </i>
              </a>
            </Link>
          </li>
          <li>
            <a href="mailto:jperez.c92@gmail.com">
              <i>
                <SiGmail />
              </i>
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};
