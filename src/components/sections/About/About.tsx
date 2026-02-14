import { Container } from "../../ui/Container/Container";
import styles from "./About.module.scss";

export function About() {
  return (
    <section className={styles.about}>
      {/* Для текстового контента можно использовать narrow */}
      <Container size="narrow">
        <h2 className={styles.title}>О компании</h2>

        <div className={styles.content}>
          <div className={styles.text}>
            <p>
              Компания «Арт-Ростов Гранит» более 10 лет занимается изготовлением
              памятников и мемориальных комплексов из натурального гранита.
            </p>
            <p>
              Мы работаем напрямую с месторождениями, поэтому можем предложить
              лучшие цены и широкий выбор камня. Все работы выполняются опытными
              мастерами-камнерезами.
            </p>
            <p>
              Наша цель — создать достойный памятник, который будет хранить
              память о ваших близких долгие годы.
            </p>
          </div>
        </div>

        {/* Статистика может быть отдельно, но внутри того же контейнера */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>10+</div>
            <div className={styles.statLabel}>лет на рынке</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>изготовленных памятников</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>видов гранита</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
