// src/pages/CatalogPage/CatalogPage.tsx
import { Container } from "@/components/ui/Container/Container";
import { ProductCard } from "@/components/ui/ProductCard/ProductCard";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { mockProducts } from "@/types/product.types";
import { useState, useMemo } from "react";
import styles from "./CatalogPage.module.scss";

type FilterType = "all" | "va" | "fl";

const CatalogPage = () => {
  const bp = useBreakpoints();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Определяем количество колонок в сетке
  const getGridColumns = () => {
    if (bp.isMobileSmall) return 1;
    if (bp.isMobile) return 2;
    if (bp.isTablet) return 3;
    return 4; // desktop и wide
  };

  // Определяем вариант карточки
  const getCardVariant = () => {
    if (bp.isMobileSmall) return "compact";
    if (bp.isMobile) return "compact";
    return "default";
  };

  // Фильтрация товаров
  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") {
      return mockProducts;
    }
    return mockProducts.filter((product) => product.type === activeFilter);
  }, [activeFilter]);

  // Подсчет количества товаров в каждой категории
  const getCount = (type: FilterType) => {
    if (type === "all") return mockProducts.length;
    return mockProducts.filter((product) => product.type === type).length;
  };

  // Обработчик смены фильтра
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  return (
    <div className={styles.catalogPage}>
      {/* Заголовок */}
      <section className={styles.hero}>
        <Container size="normal">
          <h1 className={styles.title}>Каталог изделий</h1>
          <p className={styles.subtitle}>
            Цветники и вазы из литьевого мрамора. Литьевой мрамор — это
            искусственный камень из смолы и мраморной крошки. Он не впитывает
            влагу, не боится морозов, не выгорает и не трескается. Смотрится как
            натуральный гранит, но стоит дешевле.
          </p>
        </Container>
      </section>

      {/* Фильтры */}
      <section className={styles.filters}>
        <Container size="normal">
          <div className={styles.filterBar}>
            <div className={styles.filterTabs}>
              <button
                className={`${styles.filterTab} ${activeFilter === "all" ? styles.active : ""}`}
                onClick={() => handleFilterChange("all")}
              >
                Все
                <span className={styles.count}>{getCount("all")}</span>
              </button>
              <button
                className={`${styles.filterTab} ${activeFilter === "va" ? styles.active : ""}`}
                onClick={() => handleFilterChange("va")}
              >
                Вазы
                <span className={styles.count}>{getCount("va")}</span>
              </button>
              <button
                className={`${styles.filterTab} ${activeFilter === "fl" ? styles.active : ""}`}
                onClick={() => handleFilterChange("fl")}
              >
                Цветники
                <span className={styles.count}>{getCount("fl")}</span>
              </button>
            </div>

            {/* Информация о количестве товаров */}
            <div className={styles.filterInfo}>
              <span>
                Найдено: <strong>{filteredProducts.length}</strong> товаров
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Сетка товаров */}
      <section className={styles.products}>
        <Container size="wide">
          {filteredProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>Товары не найдены</h3>
              <p>Попробуйте изменить фильтр</p>
            </div>
          ) : (
            <div
              className={styles.productGrid}
              style={{
                gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={getCardVariant()}
                />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Пагинация (пока заглушка) */}
      {/*<section className={styles.pagination}>*/}
      {/*  <Container size="normal">*/}
      {/*    <div className={styles.paginationControls}>*/}
      {/*      <button className={styles.paginationBtn} disabled>*/}
      {/*        ←*/}
      {/*      </button>*/}
      {/*      <button className={`${styles.paginationBtn} ${styles.active}`}>*/}
      {/*        1*/}
      {/*      </button>*/}
      {/*      <button className={styles.paginationBtn}>2</button>*/}
      {/*      <button className={styles.paginationBtn}>3</button>*/}
      {/*      <button className={styles.paginationBtn}>→</button>*/}
      {/*    </div>*/}
      {/*  </Container>*/}
      {/*</section>*/}
    </div>
  );
};

export default CatalogPage;
