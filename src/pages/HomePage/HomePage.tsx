import React from "react";
// import { Header } from '../../components/layout/Header/Header';
// import { Footer } from '../../components/layout/Footer/Footer';
import { Hero } from "../../components/sections/Hero/Hero";
import { About } from "../../components/sections/About/About";
import styles from "./HomePage.module.scss";

export const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      {/*<Header />*/}
      <main>
        <Hero />
        <About />
        {/* Здесь будут другие секции */}
      </main>

      {/*<Footer />*/}
    </div>
  );
};
