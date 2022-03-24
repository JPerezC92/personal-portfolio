import { FC } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDeveloperMode } from "react-icons/md";

import { useWindowSize } from "@/hooks/useWindowSize";
import { useToggle } from "@/hooks/useToggle";
import styles from "./Header.module.scss";

type HeaderProps = {};

const NavItem: FC<{ href: string }> = ({ children, href }) => {
  return (
    <>
      <li>
        <a href={href}>{children}</a>
      </li>
    </>
  );
};

export const Header: FC<HeaderProps> = ({}) => {
  const { isActive, toggle } = useToggle(false);
  const { width } = useWindowSize();

  const isTablet = width && width < 900;

  return (
    <>
      <header className={`${styles.Header}`}>
        {/* <span className={styles.Brand}>Philip Perez Castro</span> */}
        <span className={styles.Brand}>
          <i>
            <MdOutlineDeveloperMode />
          </i>
        </span>

        {isTablet ? (
          <nav className={`${styles.Navigation} ${styles.Navigation__mobile}`}>
            <button type="button" onClick={toggle}>
              <i className={`${styles.ToogleButton}`}>
                {!isActive ? <GiHamburgerMenu /> : <IoMdClose />}
              </i>
            </button>

            {isActive && (
              <>
                <ul className={styles.Navigation_mobile_list} onClick={toggle}>
                  <NavItem href="#about-me">Sobre mi</NavItem>
                  <hr />
                  <NavItem href="#contact">Contacto</NavItem>
                  <hr />
                  <NavItem href="#skills">Conocimientos</NavItem>
                  <hr />
                  <NavItem href="#projects">Proyectos</NavItem>
                </ul>
              </>
            )}
          </nav>
        ) : (
          <nav className={`${styles.Navigation}`}>
            <ul className={styles.Navigation_list}>
              <NavItem href="#about-me">Sobre mi</NavItem>
              <NavItem href="#contact">Contacto</NavItem>
              <NavItem href="#skills">Conocimientos</NavItem>
              <NavItem href="#projects">Proyectos</NavItem>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};
