export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subscribers, message } = req.body;

  const BOTBEE_API_KEY = process.env.BOTBEE_API_KEY;

  try {
    const results = [];

    for (const subscriber of subscribers) {
      const response = await fetch("https://app.botbee.io/api/v1/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BOTBEE_API_KEY}`,
        },
        body: JSON.stringify({
          phone: subscriber.phone,
          message: message,
        }),
      });

      const data = await response.json();
      results.push(data);
    }

    return res.status(200).json({
      success: true,
      sent: results.length,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
