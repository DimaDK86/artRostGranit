// src/components/OrderCallModal/OrderCallModal.tsx
import { useState } from "react";
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
  comment: string;
}

export const OrderCallModal = ({ isOpen, onClose }: CheckoutCallModalProps) => {
  const [formData, setFormData] = useState<OrderFormData>({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

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

    setError(null);
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
      };

      console.log("📦 Отправка заявки на звонок в Telegram...", orderData);

      // Отправляем в Telegram
      await sendOrderCall(orderData);

      console.log("✅ ожидайте обратного звонка!");
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({
          name: "",
          phone: "",
          email: "",
          comment: "",
        });
        setPhoneError(null);
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
        <button
          className={styles.closeBtn}
          onClick={onClose}
          disabled={isSubmitting || isSuccess}
        >
          ✕
        </button>

        <h2 className={styles.title}>Мы Вам перезвоним!</h2>

        {isSuccess ? (
          <div className={styles.success}>
            <h3>✅ Заявка успешно отправлена!</h3>
            <p>Скоро с вами свяжется менеджер.</p>
            <p className={styles.timer}>Закрытие через 3 секунды...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={styles.error}>
                ❌ технические неполадки, Ваша заявка на обратный звонок не
                отправлена... попробуйте еще раз...
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="name">
                ФИО <span className={styles.required}>*</span>
              </label>
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
              <label htmlFor="phone">
                Телефон <span className={styles.required}>*</span>
              </label>
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
              <label htmlFor="comment">Комментарий</label>
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
              {isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  Ищем оператора...
                </>
              ) : (
                "Заказать обратный звонок"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
