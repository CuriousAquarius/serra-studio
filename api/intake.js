module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { business_type, has_website, needs, timeline, name, email, notes, website } = req.body;

  // Honeypot — bots fill this, real users never see it
  if (website) {
    return res.status(200).json({ success: true });
  }

  if (!name || !email || !business_type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const strip = s => String(s || '').replace(/<[^>]*>/g, '').trim();
  const safeName         = strip(name).slice(0, 100);
  const safeEmail        = strip(email).slice(0, 200);
  const safeBusinessType = strip(business_type).slice(0, 100);
  const safeHasWebsite   = strip(has_website).slice(0, 10);
  const safeTimeline     = strip(timeline).slice(0, 100);
  const safeNotes        = strip(notes).slice(0, 2000);
  const safeNeeds        = Array.isArray(needs)
    ? needs.map(n => strip(n).slice(0, 100))
    : [strip(needs).slice(0, 100)];

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const message = [
    '🆕 *New Studio Serra Inquiry*',
    '',
    `👤 *Name:* ${safeName}`,
    `📧 *Email:* ${safeEmail}`,
    `🏢 *Business type:* ${safeBusinessType}`,
    `🌐 *Has existing website:* ${safeHasWebsite}`,
    `📋 *Needs:* ${safeNeeds.join(', ')}`,
    `⏰ *Timeline:* ${safeTimeline}`,
    safeNotes ? `📝 *Notes:* ${safeNotes}` : null,
  ].filter(Boolean).join('\n');

  try {
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
  } catch (err) {
    console.error('Telegram fetch error:', err);
    return res.status(500).json({ error: 'Failed to send notification' });
  }
}
