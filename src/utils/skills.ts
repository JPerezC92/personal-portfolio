import { IconType } from "react-icons";
import { TiCss3, TiHtml5 } from "react-icons/ti";
import { SiJavascript, SiPython, SiReact, SiTypescript } from "react-icons/si";
import { FaGitAlt, FaNodeJs } from "react-icons/fa";

export interface Skill {
  description: string;
  icon: IconType;
  color: string;
  background?: string;
}

export const skills: Skill[] = [
  {
    description: "HTML5",
    icon: TiHtml5,
    color: "#e34f26",
  },
  {
    description: "CSS",
    icon: TiCss3,
    color: "#264de3",
  },
  {
    description: "Javascript",
    icon: SiJavascript,
    color: "#f7df1e",
    background: "black",
  },
  {
    description: "React",
    icon: SiReact,
    color: "#61dafb",
  },
  {
    description: "TypeScript",
    icon: SiTypescript,
    color: "#3178c6",
  },
  {
    description: "NodeJS",
    icon: FaNodeJs,
    color: "#026e00",
  },
  {
    description: "Git",
    icon: FaGitAlt,
    color: "#f34c27",
  },
  {
    description: "Python",
    icon: SiPython,
    color: "#3572A5",
  },
];
