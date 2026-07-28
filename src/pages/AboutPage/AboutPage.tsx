import { Container } from "@/components/ui/Container/Container";
import styles from "./AboutPage.module.scss";
import { About } from "@/components/sections/About/About";

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      <Container>
        <About />
      </Container>
    </div>
  );
};

export default AboutPage;
