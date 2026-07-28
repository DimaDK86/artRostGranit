// src/components/CheckoutModal/CheckoutModal.tsx
import { useState } from "react";
// import { useCart } from "@/context/CartContext";
import { sendOrderCall } from "@/services/telegramServiceOrderCall.ts";
import styles from "./OrderCallModal.module.scss";

interface CheckoutCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  comment: string;
}

export const OrderCallModal = ({ isOpen, onClose }: CheckoutCallModalProps) => {
  // const { items, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState<OrderFormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //
  // const formattedPrice = new Intl.NumberFormat("ru-RU", {
  //   style: "currency",
  //   currency: "RUB",
  //   minimumFractionDigits: 0,
  // }).format(totalPrice);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const orderData = {
        ...formData,
        // items: items.map((item) => ({
        //   id: item.id,
        //   name: item.name,
        //   price: item.price,
        //   quantity: item.quantity,
        //   material: item.material,
        //   sizes: item.sizes,
        // })),
        // totalPrice,
      };

      console.log("📦 Отправка заявки на звонок в Telegram...", orderData);

      // Отправляем в Telegram
      await sendOrderCall(orderData);

      console.log("✅ ожидайте обратного звонка!");
      setIsSuccess(true);
      // clearCart();

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          comment: "",
        });
      }, 3000);
    } catch (error) {
      console.error("❌ Ошибка:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при оформлении заявки на звонок",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <h2 className={styles.title}>Мы Вам перезвоним!</h2>

        {isSuccess ? (
          <div className={styles.success}>
            <h3>✅ заявка успешно отправлена!</h3>
            <p>Скоро с вами свяжется менеджер.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>❌ {error}</div>}

            {/*<div className={styles.orderSummary}>*/}
            {/*  /!*<p>*!/*/}
            {/*  /!*  Товаров: <strong>{items.length}</strong>*!/*/}
            {/*  /!*</p>*!/*/}
            {/*  /!*<p>*!/*/}
            {/*  /!*  Итого: <strong>{formattedPrice}</strong>*!/*/}
            {/*  /!*</p>*!/*/}
            {/*</div>*/}

            <div className={styles.formGroup}>
              <label htmlFor="name">ФИО *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Иванов Иван Иванович"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Телефон *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.ru"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Адрес доставки</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                // required
                placeholder="г. Москва, ул. Примерная, д. 1, кв. 1"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="comment">Комментарий</label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Дополнительные пожелания..."
                rows={3}
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "ищем оператора..." : "Заказать обратный звонок"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
