import { useParams } from "react-router-dom";
import { mockProducts } from "@/types/product.types";
import notImage from "@/assets/images/product/not_image.jpg";
import { Container } from "@/components/ui/Container/Container";
import styles from "./ProductPage.module.scss";

export function ProductPage() {
  const { id } = useParams();

  // Получаем данные товара по id
  // ...
  // Находим товар по ID
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return <div>Товар не найден</div>;
  }

  const imageSrc = product.image || notImage;

  const formattedPrice = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <Container size="wide">
      <div className={styles.productCard}>
        <h1 className={styles.productTitle}>{product.name}</h1>

        <div className={styles.productCardInfo}>
          <div className={styles.productCardInfoImage}>
            <img
              src={imageSrc}
              alt={product.name}
              className={styles.image}
              loading="lazy"
            />
          </div>

          <div className={styles.productCardInfoDescription}>
            <div>
              <p>{product.description}</p>
              <p>{product.material}</p>
              <p>{product.sizes}</p>
            </div>

            <div style={{ padding: 30, color: "red" }}>
              для разработки
              <pre>{JSON.stringify(product, null, 2)}</pre>
            </div>

            <div className={styles.priceWrapper}>
              <span className={styles.price}>{formattedPrice}</span>
            </div>

            <button
              className={styles.buyBtn}
              onClick={(e) => {
                e.preventDefault(); // Предотвращаем переход по ссылке
                // Здесь будет логика добавления в корзину
                console.log("Добавить в корзину:", product.id);
              }}
            >
              Заказать
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
