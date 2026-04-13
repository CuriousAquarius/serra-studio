export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { business_type, has_website, needs, timeline, name, email, notes } = req.body;

  if (!name || !email || !business_type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const needsList = Array.isArray(needs) ? needs.join(', ') : needs;

  const message = [
    '🆕 *New Serra Studio Inquiry*',
    '',
    `👤 *Name:* ${name}`,
    `📧 *Email:* ${email}`,
    `🏢 *Business type:* ${business_type}`,
    `🌐 *Has existing website:* ${has_website}`,
    `📋 *Needs:* ${needsList}`,
    `⏰ *Timeline:* ${timeline}`,
    notes ? `📝 *Notes:* ${notes}` : null,
  ].filter(Boolean).join('\n');

  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('Telegram error:', err);
    return res.status(500).json({ error: 'Failed to send notification' });
  }

  return res.status(200).json({ success: true });
}
