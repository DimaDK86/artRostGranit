const TELEGRAM_CHAT_ID = "-1004361272897"; // Ваш Chat ID

interface OrderData {
  name: string;
  phone: string;
  email?: string;
  comment?: string;
}

export const sendOrderCall = async (orderData: OrderData) => {
  const { name, phone, email, comment } = orderData;

  // Формируем сообщение
  const message = `
🛒 <b>ПРОСЬБА ПЕРЕЗВОНИТЬ</b>

<b>👤 Информация о клиенте:</b>
Имя: ${name}
Телефон: ${phone}
Email: ${email || "Не указан"}
Комментарий: ${comment || "Нет"}
  `;

  try {
    // ✅ Отправляем через наш прокси на Vercel
    const response = await fetch("/api/telegram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: TELEGRAM_CHAT_ID,
        message: message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Ошибка отправки в Telegram");
    }

    console.log("✅ Сообщение отправлено в Telegram через прокси");
    return { success: true };
  } catch (error) {
    console.error("❌ Ошибка отправки в Telegram:", error);
    throw error;
  }
};
