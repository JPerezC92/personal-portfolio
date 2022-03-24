import type { NextPage } from "next";

import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutMe } from "@/components/AboutMe";
import { Skills } from "@/components/Skills";

const Home: NextPage = () => {
  return (
    <Layout>
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
        <AboutMe />
        <Skills />
      </main>
    </Layout>
  );
};

export default Home;
