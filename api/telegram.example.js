/*
  Netlify/Node serverless example for /api/telegram
  - Dán BOT_TOKEN và CHAT_ID vào biến môi trường khi deploy.
  - Endpoint này dùng để tránh lỗi CORS khi gọi Telegram từ trình duyệt.
*/

const buildMessage = (payload) => {
  const lines = [
    `Thiệp mời: ${payload.page}`,
    `Gửi cho: ${payload.toSide}`,
    `Họ tên: ${payload.name}`,
    `SĐT: ${payload.phone || "Không cung cấp"}`,
    `Tham dự: ${payload.attend}`,
    `Lời nhắn: ${payload.message}`,
    `Thời gian: ${payload.timestamp}`
  ];
  return lines.join("\n");
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return { statusCode: 500, body: "Missing BOT_TOKEN or CHAT_ID" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: buildMessage(payload)
    })
  });

  if (!response.ok) {
    return { statusCode: 502, body: "Telegram request failed" };
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({ ok: true })
  };
};
