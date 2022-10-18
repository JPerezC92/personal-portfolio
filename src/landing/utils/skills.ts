import { IconType } from 'react-icons';
import { FaGitAlt } from 'react-icons/fa';
import {
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTypescript,
} from 'react-icons/si';
import { TiCss3, TiHtml5 } from 'react-icons/ti';

export interface Skill {
  description: string;
  icon: IconType;
  color: string;
  background?: string;
}

export const skillList: Skill[] = [
  {
    description: 'HTML5',
    icon: TiHtml5,
    color: '#e34f26',
  },
  {
    description: 'CSS',
    icon: TiCss3,
    color: '#264de3',
  },
  {
    description: 'Javascript',
    icon: SiJavascript,
    color: '#f7df1e',
    background: 'black',
  },
  {
    description: 'React',
    icon: SiReact,
    color: '#61dafb',
  },
  {
    description: 'TypeScript',
    icon: SiTypescript,
    color: '#3178c6',
  },
  {
    description: 'NextJs',
    icon: SiNextdotjs,
    color: '#FFFFFF',
  },
  {
    description: 'Git',
    icon: FaGitAlt,
    color: '#f34c27',
  },
  // {
  //   description: "NodeJS",
  //   icon: FaNodeJs,
  //   color: "#026e00",
  // },
  // {
  //   description: "Python",
  //   icon: SiPython,
  //   color: "#3572A5",
  // },
];

