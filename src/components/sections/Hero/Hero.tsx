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
        <div>ИСПРАВИТЬ ИНФО</div>
        <div>
          Что такое литьевой мрамор? Литьевой мрамор — это искусственный камень,
          изготовленный путем литья полиэфирной смолы и мраморной крошки
          (кварцевого песка). Не содержит пор, не впитывает влагу, легко
          переносит жару и мороз.
        </div>
        <div>
          Литьевой мрамор — это популярный искусственный композитный материал,
          который внешне напоминает натуральный камень, но при этом лишен многих
          его недостатков и стоит дешевле. Его часто можно встретить в виде
          кухонных столешниц, подоконников, раковин и ванн
        </div>

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
