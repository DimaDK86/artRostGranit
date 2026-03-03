import { Container } from "@/components/ui/Container/Container";
import styles from './AboutPage.module.scss';

export function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <Container size="narrow">
        <h1 className={styles.title}>О компании</h1>
        <p className={styles.subtitle}>
          История и преимущества компании Арт-Ростов Гранит
        </p>
      </Container>
    </div>
  );
}