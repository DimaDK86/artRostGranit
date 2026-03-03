import { Container } from "@/components/ui/Container/Container";
import styles from './GalleryPage.module.scss';

export function GalleryPage() {
  return (
    <div className={styles.galleryPage}>
      <Container size="wide">
        <h1 className={styles.title}>Наши работы</h1>
        <p className={styles.subtitle}>
          Фотогалерея выполненных проектов
        </p>
      </Container>
    </div>
  );
}