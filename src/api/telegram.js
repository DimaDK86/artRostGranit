// api/telegram.js (для Vercel Serverless Functions)

export default async function handler(req, res) {
  // Разрешаем только POST запросы
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { chatId, message } = req.body;
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

  // Проверяем наличие токена
  if (!BOT_TOKEN) {
    return res.status(500).json({ error: "TELEGRAM_BOT_TOKEN not configured" });
  }

  try {
    // Пробуем отправить через основной API
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      },
    );

    const data = await response.json();

    if (!data.ok) {
      console.error("Telegram API error:", data);
      return res.status(400).json({
        error: data.description || "Telegram API error",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
}
