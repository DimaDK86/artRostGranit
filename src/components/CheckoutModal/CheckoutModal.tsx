// src/components/CheckoutModal/CheckoutModal.tsx
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { sendOrderToTelegram } from "@/services/telegramService";
import styles from "./CheckoutModal.module.scss";

interface CheckoutModalProps {
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

export const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  const { items, totalPrice, clearCart } = useCart();
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
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const formattedPrice = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  }).format(totalPrice);

  // Проверка телефона (только цифры, 11 цифр, начинается с 7, 8 или 9)
  const validatePhone = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, "");
    return digits.length === 11 && ["7", "8", "9"].includes(digits[0]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Оставляем только цифры
      const digits = value.replace(/\D/g, "");
      // Ограничиваем 11 цифрами
      const limited = digits.slice(0, 11);
      setFormData((prev) => ({ ...prev, [name]: limited }));

      // Проверяем валидность при вводе
      if (limited.length === 11) {
        if (!validatePhone(limited)) {
          setPhoneError("Номер должен начинаться с 7, 8 или 9");
        } else {
          setPhoneError(null);
        }
      } else {
        setPhoneError(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем телефон перед отправкой
    if (!validatePhone(formData.phone)) {
      setPhoneError(
        "Введите корректный номер (11 цифр, начинается с 7, 8 или 9)",
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const orderData = {
        ...formData,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          material: item.material,
          sizes: item.sizes,
        })),
        totalPrice,
      };

      console.log("📦 Отправка заказа в Telegram...", orderData);

      await sendOrderToTelegram(orderData);

      console.log("✅ Заказ успешно отправлен!");
      setIsSuccess(true);
      clearCart();

      // Пауза 3 секунды перед закрытием
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
        setPhoneError(null);
        setError(null);
      }, 3000);
    } catch (error) {
      console.error("❌ Ошибка:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при оформлении заказа",
      );
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          disabled={isSubmitting || isSuccess}
        >
          ✕
        </button>

        <h2 className={styles.title}>Оформление заказа</h2>

        {isSuccess ? (
          <div className={styles.success}>
            <h3>✅ Заказ успешно оформлен!</h3>
            <p>Скоро с вами свяжется менеджер для подтверждения.</p>
            <p className={styles.timer}>Закрытие через 3 секунды...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={styles.error}>
                ❌ технические неполадки, Ваш заказ не отправлен... попробуйте
                еще раз...
              </div>
            )}

            <div className={styles.orderSummary}>
              <p>
                Товаров: <strong>{items.length}</strong>
              </p>
              <p>
                Итого: <strong>{formattedPrice}</strong>
              </p>
            </div>

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
                disabled={isSubmitting}
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
                placeholder="89001234567"
                maxLength={11}
                className={phoneError ? styles.errorInput : ""}
                disabled={isSubmitting}
              />
              {phoneError && (
                <span className={styles.errorMessage}>{phoneError}</span>
              )}
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
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Адрес доставки *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="г. Москва, ул. Примерная, д. 1, кв. 1"
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="comment">Комментарий к заказу</label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Дополнительные пожелания..."
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Оформляем..." : "Подтвердить заказ"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
