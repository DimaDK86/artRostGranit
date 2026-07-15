// src/components/ProductCard/ProductCard.tsx
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import notImage from "@/assets/images/product/not_image.jpg";
import styles from "./ProductCard.module.scss";
import { useState } from "react";
import type { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "detailed";
}

export function ProductCard({
  product,
  variant = "default",
}: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("🃏 Компонент рендерится");
  console.log("🃏 product:", product);
  console.log("🃏 addItem:", typeof addItem);
  console.log("🃏 isInCart:", typeof isInCart);

  const formattedPrice = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(product.price);

  const imageSrc = product.image || notImage;
  const inCart = isInCart(product.id);

  console.log("🃏 inCart:", inCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("🖱️ КЛИК по кнопке!");
    console.log("🖱️ product.id:", product.id);
    console.log("🖱️ product.id тип:", typeof product.id);

    try {
      const itemToAdd = {
        id: String(product.id), // 👈 Принудительно преобразуем в строку
        name: product.name,
        price: product.price,
        image: product.image || notImage,
        material: product.material,
        sizes: product.sizes,
      };

      console.log("🖱️ Добавляем в корзину:", itemToAdd);
      addItem(itemToAdd);
      console.log("✅ Успешно добавлено!");

      setIsAdded(true);
      setError(null);
      setTimeout(() => setIsAdded(false), 1500);
    } catch (err) {
      console.error("❌ Ошибка:", err);
      setError(String(err));
    }
  };

  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      {error && <div style={{ color: "red" }}>Ошибка: {error}</div>}
      <Link to={`/product/${product.id}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <img
            src={imageSrc}
            alt={product.name}
            className={styles.image}
            loading="lazy"
          />
          {product.material && (
            <span className={styles.material}>{product.material}</span>
          )}
        </div>

        <div className={styles.info}>
          <h3 className={styles.name}>{product.name}</h3>

          {product.description && variant === "detailed" && (
            <p className={styles.description}>{product.description}</p>
          )}

          {product.sizes && variant !== "compact" && (
            <p className={styles.sizes}>{product.sizes}</p>
          )}

          <div className={styles.priceWrapper}>
            <span className={styles.price}>{formattedPrice}</span>
            <button
              className={`${styles.buyBtn} ${isAdded ? styles.added : ""}`}
              onClick={handleAddToCart}
              // Убираем disabled для теста
              // disabled={inCart}
            >
              {isAdded ? "✓ Добавлено!" : "Заказать"}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
