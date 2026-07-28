import React from "react";
import { Hero } from "../../components/sections/Hero/Hero";
import { About } from "../../components/sections/About/About";
import styles from "./HomePage.module.scss";

export const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <Hero />
      <About />
    </div>
  );
};
