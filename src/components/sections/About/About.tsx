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
              <strong>Безупречное качество на всех этапах.</strong> Мы лично
              контролируем производственный цикл — от замеса смолы до финишной
              полировки. Каждое изделие проходит проверку на сколы, воздушные
              пузыри и цветовую однородность, поэтому мы даем гарантию на все
              работы.
            </p>
            <p>
              <strong>Цены без посредников.</strong> В отличие от
              мастерских-перекупщиков, мы работаем напрямую с поставщиками
              мраморной крошки и полимеров. Это позволяет нам удерживать цены на
              15–20% ниже рыночных без потери качества. Вы платите только за
              материал и работу, а не за аренду витрин и наценки салонов.
            </p>
            <p>
              <strong>Главная цель — ваше спокойствие.</strong> Мы создаем не
              просто бетонные формы, а достойные памятные элементы, которые
              выдержат и южную жару, и Сибирские морозы. Чтобы вы могли быть
              уверены: спустя десятилетия памятник будет выглядеть так же, как в
              день установки.
            </p>
          </div>
        </div>

        {/* Статистика может быть отдельно, но внутри того же контейнера */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>5+</div>
            <div className={styles.statLabel}>лет безупречной работы</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>5000+</div>
            <div className={styles.statLabel}>
              изготовленных цветников и ваз
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>98%</div>
            <div className={styles.statLabel}>клиентов рекомендуют нас</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
