export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, message } = req.body;

  // ⚠️ Replace with your BotBee API key later
  const BOTBEE_API_KEY = process.env.BOTBEE_API_KEY;

  try {
    const response = await fetch("https://app.botbee.io/api/v1/message/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BOTBEE_API_KEY}`,
      },
      body: JSON.stringify({
        channel: "whatsapp",
        phone: phone,
        message: message,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
}
