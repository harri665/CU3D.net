const express = require('express');
const router = express.Router();
const { sendOrEditDiscordMessage } = require('../../utils/Discord/discordBot'); // Import your sendDiscordMessage function

router.post('/send-or-edit-message', async (req, res) => {
  const { messageId, channelId, content, embeds, components } = req.body;

  try {
    // Use the sendOrEditDiscordMessage function to either send or edit a message
    const result = await sendOrEditDiscordMessage(
      channelId || process.env.DISCORD_CHANNEL_ID, // Use the provided channelId or default one
      messageId,
      content,
      embeds,
      components
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Route to handle contact form submission
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  const discordMessage = `
  **New Contact Form Submission:**
  - **Name:** ${name}
  - **Email:** ${email}
  - **Subject:** ${subject}
  - **Message:** ${message}
`;
  try {
    // Use the sendOrEditDiscordMessage function to either send or edit a message
    const result = await sendOrEditDiscordMessage(
      process.env.DISCORD_CHANNEL_ID || '509513851994374149', // Use environment variable or default
      null,
      discordMessage,
      null,
      null
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
