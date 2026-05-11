import { Skill } from '@/modules/skills/domain/entities/skill';

export const skillList: Skill[] = [
  { description: 'HTML5', icon: 'TiHtml5', color: '#e34f26' },
  { description: 'CSS', icon: 'TiCss3', color: '#264de3' },
  {
    description: 'JavaScript',
    icon: 'SiJavascript',
    color: '#f7df1e',
    background: 'black',
  },
  { description: 'React', icon: 'SiReact', color: '#61dafb' },
  { description: 'TypeScript', icon: 'SiTypescript', color: '#3178c6' },
  { description: 'Next.js', icon: 'SiNextdotjs', color: '#FFFFFF' },
  { description: 'Git', icon: 'FaGitAlt', color: '#f34c27' },
  { description: 'Node.js', icon: 'FaNodeJs', color: '#026e00' },
  { description: 'Express.js', icon: 'SiExpress', color: '#8cbf3d' },
  { description: 'NestJS', icon: 'SiNestjs', color: '#e0234e' },
  { description: 'Prisma', icon: 'SiPrisma', color: '#2d3748' },
];
