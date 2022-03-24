import { FC } from "react";
import styles from "./Layout.module.scss";

type LayoutProps = {};

export const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className={`${styles.Layout}`}>{children}</div>;
};
