import type { NextPage } from "next";

import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutMe } from "@/components/AboutMe";

const Home: NextPage = () => {
  return (
    <Layout>
      <Header />
      <Hero />
      <AboutMe />
    </Layout>
  );
};

export default Home;
