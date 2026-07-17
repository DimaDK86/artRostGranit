// api/telegram.js - улучшенная версия с fallback

const TELEGRAM_API_URLS = [
  "https://api.telegram.org",
  "https://telegram.blast.hk",
  "https://tg.i-c-a.su",
  "https://td.telegram.org",
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { chatId, message } = req.body;
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

  if (!BOT_TOKEN) {
    return res.status(500).json({ error: "TELEGRAM_BOT_TOKEN not configured" });
  }

  let lastError = null;

  // Пробуем отправить через разные URL
  for (const baseUrl of TELEGRAM_API_URLS) {
    try {
      const url = `${baseUrl}/bot${BOT_TOKEN}/sendMessage`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
        signal: AbortSignal.timeout(5000), // Таймаут 5 секунд
      });

      const data = await response.json();

      if (data.ok) {
        console.log(`✅ Успешно через: ${baseUrl}`);
        return res.status(200).json(data);
      } else {
        console.log(`❌ Ошибка через ${baseUrl}:`, data.description);
        lastError = data.description;
      }
    } catch (error) {
      console.log(`❌ Недоступно: ${baseUrl}`, error.message);
      lastError = error.message;
    }
  }

  return res.status(500).json({
    error: lastError || "Failed to send message to Telegram",
  });
}
