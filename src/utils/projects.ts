import connect4 from "public/projects/connect4.png";
import quizAgainstTime from "public/projects/quiz-against-time.png";

export interface Project {
  name: string;
  description?: string;
  url?: string;
  repository: string;
  image: StaticImageData;
}

export const projects: Project[] = [
  {
    name: "Conecta 4",
    url: "https://connect4-steel.vercel.app/",
    repository: "https://github.com/JPerezC92/connect4",
    image: connect4,
  },
  {
    name: "Quiz against time",
    url: "https://quiz-against-time.vercel.app/",
    repository: "https://github.com/JPerezC92/quiz-against-time",
    image: quizAgainstTime,
  },
];
