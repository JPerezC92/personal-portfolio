import React from 'react';
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { ReactQuery } from 'src/landing/components/ReactQuery';

export const projectList = [
  {
    image: {
      url: '/projects/rick-morty-challenge.webp',
      width: '750',
      height: '1334',
    },
    title: 'Rick & Morty challenge',
    description: (
      <>
        Reto propuesto por la comunidad de{' '}
        <strong>Gentleman Programming</strong>, aqui podras encontrar
        informacion sobre los personajes de la serie de televisión, las
        temporadas y un minijuego.
      </>
    ),
    site: 'https://rick-morty-app-jet.vercel.app',
    repository: 'https://github.com/JPerezC92/challenge-rick-morty',
    tecnologieList: [
      { name: 'React', icon: SiReact },
      { name: 'Nextjs', icon: SiNextdotjs },
      { name: 'Tailwind', icon: SiTailwindcss },
      { name: 'Typescript', icon: SiTypescript },
      { name: 'React query', icon: ReactQuery },
    ],
  },
  {
    image: {
      url: '/projects/aerolab-frontend-challenge.webp',
      width: '750',
      height: '1334',
    },
    title: 'Aerolab frontend challenge',
    description: (
      <>
        Esta aplicación consta de un catalogo de artículos para el programa de
        fidelización, aqui los usuarios pueden hacer uso de sus puntos gananos
        para adquirir artículos de tecnologia.
      </>
    ),
    site: 'https://aerolab-frontend-challenge-beta.vercel.app/',
    repository: 'https://github.com/JPerezC92/challenge-frontend-aerolab',
    tecnologieList: [
      { name: 'React', icon: SiReact },
      { name: 'Nextjs', icon: SiNextdotjs },
      { name: 'Typescript', icon: SiTypescript },
    ],
  },
  {
    image: {
      url: '/projects/challenge-alkemy.webp',
      width: '720',
      height: '1280',
    },
    title: 'Alkemy Challenge',
    description:
      'Reto propuesto por Alkemy, esta aplicación sirve para administrar nuestro presupuesto personal, permite crear y editar ingresos y egresos de dinero, y mostrar un balance resultante de las operaciones registradas.',
    site: '',
    repository:
      'https://github.com/JPerezC92/challenge-full-stack-alkemy-frontend',
    tecnologieList: [
      { name: 'React', icon: SiReact },
      { name: 'Nextjs', icon: SiNextdotjs },
      { name: 'Tailwind', icon: SiTailwindcss },
      { name: 'Typescript', icon: SiTypescript },
    ],
  },
];
