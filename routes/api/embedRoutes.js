const express = require('express');
const router = express.Router();
const { sendOrEditDiscordMessage  } = require('../../utils/Discord/discordBot'); // Import your sendDiscordMessage function

router.post('/send-or-edit-message', async (req, res) => {
  const { messageId, channelId, content, embeds, components } = req.body;

  try {
    // Use the sendOrEditDiscordMessage function to either send or edit a message
    const result = await sendOrEditDiscordMessage(
      channelId || process.env.CHANNEL_ID, // Use the provided channelId or default one
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

module.exports = router;
