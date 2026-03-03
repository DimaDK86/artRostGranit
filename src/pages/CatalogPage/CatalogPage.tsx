import { Container } from "@/components/ui/Container/Container";
import styles from './CatalogPage.module.scss';

export function CatalogPage() {
  return (
    <div className={styles.catalogPage}>
      <Container size="normal">
        <h1 className={styles.title}>Каталог памятников</h1>
        <p className={styles.subtitle}>
          Здесь будет каталог с фильтрами и товарами
        </p>
      </Container>
    </div>
  );
}