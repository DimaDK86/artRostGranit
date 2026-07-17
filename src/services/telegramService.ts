// // src/services/telegramService.ts
//
// const TELEGRAM_BOT_TOKEN = "8701146616:AAFzshJbOZp6pnIlJTQ3_0hZA2WTanxF67Q"; // Ваш токен
// // const TELEGRAM_CHAT_ID = "304686431"; // Ваш Chat ID
// const TELEGRAM_CHAT_ID = "-1004361272897"; // Ваш Chat ID
//
// interface OrderData {
//   name: string;
//   phone: string;
//   email?: string;
//   address: string;
//   comment?: string;
//   items: Array<{
//     id: string;
//     name: string;
//     price: number;
//     quantity: number;
//     material?: string;
//     sizes?: string;
//   }>;
//   totalPrice: number;
// }
//
// export const sendOrderToTelegram = async (orderData: OrderData) => {
//   const { name, phone, email, address, comment, items, totalPrice } = orderData;
//
//   // Формируем сообщение
//   const message = `
// 🛒 <b>НОВЫЙ ЗАКАЗ!</b>
//
// <b>👤 Информация о клиенте:</b>
// Имя: ${name}
// Телефон: ${phone}
// Email: ${email || "Не указан"}
// Адрес: ${address}
// Комментарий: ${comment || "Нет"}
//
// <b>📦 Товары:</b>
// ${items
//   .map(
//     (item) =>
//       `${item.name} x${item.quantity} = ${item.price * item.quantity} ₽
//    ${item.material ? `Материал: ${item.material}` : ""}
//    ${item.sizes ? `Размеры: ${item.sizes}` : ""}`,
//   )
//   .join("\n\n")}
//
// <b>💰 Итого: ${totalPrice} ₽</b>
//   `;
//
//   try {
//     const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
//
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         chat_id: TELEGRAM_CHAT_ID,
//         text: message,
//         parse_mode: "HTML",
//       }),
//     });
//
//     const data = await response.json();
//
//     if (!data.ok) {
//       throw new Error(data.description || "Ошибка отправки в Telegram");
//     }
//
//     console.log("✅ Сообщение отправлено в Telegram");
//     return { success: true };
//   } catch (error) {
//     console.error("❌ Ошибка отправки в Telegram:", error);
//     throw error;
//   }
// };

// src/services/telegramService.ts

// ⚠️ Убираем токен из клиентского кода - теперь он только на сервере!
// const TELEGRAM_BOT_TOKEN = "8701146616:AAFzshJbOZp6pnIlJTQ3_0hZA2WTanxF67Q";

// src/services/telegramService.ts

// ❌ УБИРАЕМ прямой запрос к Telegram
// const TELEGRAM_BOT_TOKEN = "8701146616:AAFzshJbOZp6pnIlJTQ3_0hZA2WTanxF67Q";

const TELEGRAM_CHAT_ID = "-1004361272897"; // Ваш Chat ID

interface OrderData {
  name: string;
  phone: string;
  email?: string;
  address: string;
  comment?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    material?: string;
    sizes?: string;
  }>;
  totalPrice: number;
}

export const sendOrderToTelegram = async (orderData: OrderData) => {
  const { name, phone, email, address, comment, items, totalPrice } = orderData;

  // Формируем сообщение
  const message = `
🛒 <b>НОВЫЙ ЗАКАЗ!</b>

<b>👤 Информация о клиенте:</b>
Имя: ${name}
Телефон: ${phone}
Email: ${email || "Не указан"}
Адрес: ${address}
Комментарий: ${comment || "Нет"}

<b>📦 Товары:</b>
${items
  .map(
    (item) =>
      `${item.name} x${item.quantity} = ${item.price * item.quantity} ₽
   ${item.material ? `Материал: ${item.material}` : ""}
   ${item.sizes ? `Размеры: ${item.sizes}` : ""}`,
  )
  .join("\n\n")}

<b>💰 Итого: ${totalPrice} ₽</b>
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
