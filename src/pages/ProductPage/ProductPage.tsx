// src/pages/ProductPage/ProductPage.tsx
import { useParams, Link } from "react-router-dom";
import { mockProducts } from "@/types/product.types";
import notImage from "@/assets/images/product/not_image.jpg";
import { Container } from "@/components/ui/Container/Container";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import styles from "./ProductPage.module.scss";
import ImageCarousel from "@/components/ui/Carousel/ImageCarousel";

const ProductPage = () => {
  const { id } = useParams();
  const { addItem, isInCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <Container size="wide">
        <div className={styles.notFound}>
          <h2>🔍 Товар не найден</h2>
          <p>Извините, запрашиваемый товар отсутствует в каталоге</p>
          <Link to="/catalog" className={styles.backLink}>
            Вернуться в каталог
          </Link>
        </div>
      </Container>
    );
  }

  const hasImages = product.images && product.images.length > 0;
  const images: string[] =
    product.images && product.images.length > 0
      ? product.images
      : [product.image || notImage];

  const imageSrc = product.image || notImage;
  const inCart = isInCart(product.id);

  const formattedPrice = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(product.price);

  // Единая логика для состояния кнопки
  const getButtonState = () => {
    if (isAdded)
      return { text: "✓ Добавлено!", disabled: true, className: styles.added };
    if (inCart)
      return { text: "В корзине", disabled: true, className: styles.inCart };
    return { text: "Заказать", disabled: false, className: "" };
  };

  const buttonState = getButtonState();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    if (inCart) return;

    addItem({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image || notImage,
      material: product.material,
      sizes: product.sizes,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <Container size="wide">
      <div className={styles.productCard}>
        <h1 className={styles.productTitle}>{product.name}</h1>

        <div className={styles.productCardInfo}>
          {hasImages ? (
            <div className={styles.productCardInfoImage}>
              <ImageCarousel images={images} height={480} />
            </div>
          ) : (
            <div className={styles.productCardInfoImage}>
              <img
                src={imageSrc}
                alt={product.name}
                className={styles.image}
                loading="lazy"
              />
            </div>
          )}

          <div className={styles.productCardInfoDescription}>
            <div className={styles.infoContent}>
              <p>
                Описание
                <strong> {product.description} </strong>
              </p>
              <p>
                Материал
                <strong> {product.material} </strong>
              </p>
              <p>
                Размеры
                <strong> {product.sizes} </strong>
              </p>
            </div>

            <div className={styles.bottomSection}>
              <div className={styles.priceWrapper}>
                Цена:
                <strong>
                  <span className={styles.price}> {formattedPrice}</span>
                </strong>
              </div>
              <button
                className={`${styles.buyBtn} ${buttonState.className}`}
                onClick={handleAddToCart}
                disabled={buttonState.disabled}
              >
                {buttonState.text}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;
