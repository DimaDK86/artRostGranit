import { Container } from "@/components/ui/Container/Container";
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
  return (
    <div className={styles.notFound}>
      <Container size="narrow">
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Страница не найдена</h2>
        <p className={styles.text}>
          Извините, запрашиваемая страница не существует или была перемещена.
        </p>
        <Link to="/" className={styles.homeLink}>
          Вернуться на главную
        </Link>
      </Container>
    </div>
  );
}