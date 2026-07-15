// src/pages/Cart/Cart.tsx
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container/Container";
import { CheckoutModal } from "@/components/CheckoutModal/CheckoutModal.tsx";
import { useState } from "react";
import styles from "./Cart.module.scss";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCart();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <Container size="wide">
        <div className={styles.emptyCart}>
          <h2>🛒 Корзина пуста</h2>
          <p>Добавьте товары в корзину, чтобы оформить заказ</p>
          <Link to="/catalog" className={styles.continueShopping}>
            Перейти в каталог
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container size="wide">
      <div className={styles.cartPage}>
        <h1 className={styles.cartTitle}>Корзина</h1>

        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />

                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  {item.material && (
                    <p className={styles.itemMaterial}>
                      Материал: {item.material}
                    </p>
                  )}
                  {item.sizes && (
                    <p className={styles.itemSizes}>Размеры: {item.sizes}</p>
                  )}
                  <p className={styles.itemPrice}>
                    {formattedPrice(item.price)}
                  </p>
                </div>

                <div className={styles.itemControls}>
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <h3>Итого</h3>

            <div className={styles.summaryRow}>
              <span>Товаров:</span>
              <span>{items.length} шт.</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Всего:</span>
              <span className={styles.totalPrice}>
                {formattedPrice(totalPrice)}
              </span>
            </div>

            <button
              className={styles.checkoutBtn}
              onClick={() => setIsModalOpen(true)}
            >
              Оформить заказ
            </button>

            <button className={styles.clearCartBtn} onClick={clearCart}>
              Очистить корзину
            </button>

            <Link to="/catalog" className={styles.continueShopping}>
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>

      {/* Модальное окно оформления заказа */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default Cart;
