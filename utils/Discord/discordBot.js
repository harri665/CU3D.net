const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Initialize Discord bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Discord login
client.login("MTI4MzIxOTI0MDg5MTE5MTM1Nw.GzA-Tf.DiasUefxkSqBfWd7BZ_RfLf814vFKThCgfEksA");

/**
 * Function to either edit an existing message or send a new one if no messageId is provided.
 * @param {string} channelId - The ID of the Discord channel.
 * @param {string} messageId - The ID of the message to edit (optional).
 * @param {string} content - The new content for the message.
 * @param {Array} embeds - Array of new embeds for the message.
 * @param {Array} components - Array of components (e.g., buttons) for the message.
 */
async function sendOrEditDiscordMessage(channelId, messageId, content, embeds, components) {
  try {
    // Fetch the channel
    const channel = await client.channels.fetch(channelId);

    if (messageId) {
      // If messageId is provided, edit the existing message
      const message = await channel.messages.fetch(messageId);
      await message.edit({
        content: content || message.content,
        embeds: embeds || message.embeds,
        components: components || message.components,
      });
      return { success: true, message: 'Message updated successfully' };
    } else {
      // If no messageId is provided, send a new message
      await channel.send({
        content: content,
        embeds: embeds,
        components: components,
      });
      return { success: true, message: 'New message sent successfully' };
    }
  } catch (error) {
    console.error('Error sending or editing message:', error);
    throw new Error('Failed to send or edit message');
  }
}

module.exports = { sendOrEditDiscordMessage };
