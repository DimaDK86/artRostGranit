// src/pages/ProductPage/ProductPage.tsx
import { useParams } from "react-router-dom";
import { mockProducts } from "@/types/product.types";
import notImage from "@/assets/images/product/not_image.jpg";
import { Container } from "@/components/ui/Container/Container";
import { useCart } from "@/context/CartContext";
import React, { useState } from "react";
import styles from "./ProductPage.module.scss";
import ImageCarousel from "@/components/ui/Carousel/ImageCarousel";
// import {useBreakpoints} from "@/hooks/useBreakpoints.ts";

export function ProductPage() {
  // const bp = useBreakpoints();
  const { id } = useParams();
  const { addItem, isInCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Находим товар по ID
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return <div>Товар не найден</div>;
  }

  // Проверяем, есть ли массив изображений и не пустой ли он
  const hasImages = product.images && product.images.length > 0;

  // 👇 ГАРАНТИРУЕМ, что images это всегда массив строк
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    console.log("🛒 Добавляем товар в корзину:", product);

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
          {/* 👇 Если есть массив с картинками - показываем карусель */}
          {hasImages ? (
            <div className={styles.productCardInfoImage}>
              <ImageCarousel images={images} height={480} />
            </div>
          ) : (
            // 👇 Если нет массива - показываем одно изображение
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
                className={`${styles.buyBtn} ${isAdded ? styles.added : ""} ${inCart ? styles.inCart : ""}`}
                onClick={handleAddToCart}
                disabled={inCart}
              >
                {isAdded ? "✓ Добавлено!" : inCart ? "В корзине" : "Заказать"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
