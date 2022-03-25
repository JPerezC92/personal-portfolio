import type { NextPage } from "next";

import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutMe } from "@/components/AboutMe";
import { Skills } from "@/components/Skills";
import { Proyects } from "@/components/Proyects";
import { Contact } from "@/components/Contact";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Philip Perez Castro | Web Developer | ReactJS</title>
        <meta
          property="og:title"
          content="Philip Perez Castro | Web Developer | ReactJS"
          key="title"
        />
        <meta property="og:image" content="/open-grap.png" key="image" />
      </Head>

      <Header />
      <Hero />

      <main
        style={{
          width: "min(90%, 80rem)",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          rowGap: "4rem",
        }}
      >
        <Contact />
        <AboutMe />
        <Skills />
        <Proyects />
      </main>
    </Layout>
  );
};

export default Home;
