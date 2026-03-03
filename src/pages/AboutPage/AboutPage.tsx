import { Container } from "@/components/ui/Container/Container";
import styles from './AboutPage.module.scss';
import { About } from "@/components/sections/About/About";

export function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <Container>
        <About />
      </Container>
    </div>
  );
}