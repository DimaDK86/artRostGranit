import { Container } from "../../ui/Container/Container";
import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <section className={styles.hero}>
      {/* Указываем size="normal" для контейнера */}
      <Container size="normal">
        <h1 className={styles.title}>
          Памятники из гранита
          <span>в Ростове-на-Дону</span>
        </h1>

        <p className={styles.subtitle}>
          Изготовление и установка памятников любой сложности. Собственное
          производство, гарантия на лучших месторождений.
        </p>

        <div className={styles.buttons}>
          <a href="/catalog" className={styles.primaryBtn}>
            Смотреть каталог
          </a>
          <a href="/contacts" className={styles.secondaryBtn}>
            Связаться с нами
          </a>
        </div>
      </Container>
    </section>
  );
}
