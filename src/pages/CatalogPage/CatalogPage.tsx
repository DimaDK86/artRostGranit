import { Container } from "@/components/ui/Container/Container";
import { ProductCard } from "@/components/ui/ProductCard/ProductCard";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { mockProducts } from "@/types/product.types";
import styles from './CatalogPage.module.scss';

export function CatalogPage() {
  const bp = useBreakpoints();
  
  // Определяем количество колонок в сетке
  const getGridColumns = () => {
    if (bp.isMobileSmall) return 1;
    if (bp.isMobile) return 2;
    if (bp.isTablet) return 3;
    return 4; // desktop и wide
  };
  
  // Определяем вариант карточки
  const getCardVariant = () => {
    if (bp.isMobileSmall) return 'compact';
    if (bp.isMobile) return 'compact';
    return 'default';
  };
  
  return (
    <div className={styles.catalogPage}>
      
      {/* Заголовок */}
      <section className={styles.hero}>
        <Container size="normal">
          <h1 className={styles.title}>Каталог памятников</h1>
          <p className={styles.subtitle}>
            Изготовим памятник любой сложности из натурального гранита
          </p>
        </Container>
      </section>
      
      {/* Фильтры (пока заглушка) */}
      <section className={styles.filters}>
        <Container size="normal">
          <div className={styles.filterBar}>
            <div className={styles.filterTabs}>
              <button className={`${styles.filterTab} ${styles.active}`}>Все</button>
              <button className={styles.filterTab}>Вертикальные</button>
              <button className={styles.filterTab}>Горизонтальные</button>
              <button className={styles.filterTab}>Семейные</button>
            </div>
            
            <select className={styles.sortSelect}>
              <option>По умолчанию</option>
              <option>По цене (возрастание)</option>
              <option>По цене (убывание)</option>
              <option>По названию</option>
            </select>
          </div>
        </Container>
      </section>
      
      {/* Сетка товаров */}
      <section className={styles.products}>
        <Container size="wide">
          <div 
            className={styles.productGrid}
            style={{ 
              gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`
            }}
          >
            {mockProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                variant={getCardVariant()}
              />
            ))}
          </div>
        </Container>
      </section>
      
      {/* Пагинация (пока заглушка) */}
      <section className={styles.pagination}>
        <Container size="normal">
          <div className={styles.paginationControls}>
            <button className={styles.paginationBtn} disabled>←</button>
            <button className={`${styles.paginationBtn} ${styles.active}`}>1</button>
            <button className={styles.paginationBtn}>2</button>
            <button className={styles.paginationBtn}>3</button>
            <button className={styles.paginationBtn}>→</button>
          </div>
        </Container>
      </section>
      
    </div>
  );
}