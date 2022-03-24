import { FC } from "react";
import { skills } from "src/utils/skills";

import styles from "./Skills.module.scss";

type SkillsProps = {};

export const Skills: FC<SkillsProps> = (props) => {
  return (
    <section className={styles.Skills} id="skills">
      <h2 className={styles.Skills_title}>Conocimientos</h2>

      {skills.map((skill) => (
        <span className={styles.Skills_card} key={skill.description}>
          <i style={{ color: skill.color, backgroundColor: skill.background }}>
            <skill.icon />
          </i>
          <p>{skill.description}</p>
        </span>
      ))}
    </section>
  );
};
