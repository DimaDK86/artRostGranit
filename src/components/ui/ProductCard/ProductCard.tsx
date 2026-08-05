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

  const formattedPrice = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(product.price);

  const imageSrc = product.image || notImage;
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inCart) return; // Дополнительная защита

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

  // Определяем текст кнопки и её состояние
  const getButtonState = () => {
    if (isAdded)
      return { text: "✓ Добавлено!", disabled: true, className: styles.added };
    if (inCart)
      return { text: "В корзине", disabled: true, className: styles.inCart };
    return { text: "Заказать", disabled: false, className: "" };
  };

  const buttonState = getButtonState();

  return (
    <div className={`${styles.card} ${styles[variant]}`}>
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
              className={`${styles.buyBtn} ${buttonState.className}`}
              onClick={handleAddToCart}
              disabled={buttonState.disabled}
            >
              {buttonState.text}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
