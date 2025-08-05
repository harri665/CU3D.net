const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

// Note: MongoDB connection is handled in server.js
// No need to connect again here to avoid duplicate connection errors

const Event = require('../../models/Event'); // Ensure your Event model includes 'discordEventId'

// Initialize Discord bot
let client = null;
let discordEnabled = false;

// Discord login using environment variable
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

if (DISCORD_TOKEN && DISCORD_TOKEN !== 'your_discord_token_here' && DISCORD_TOKEN !== 'disabled') {
  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.login(DISCORD_TOKEN)
    .then(() => {
      discordEnabled = true;
      console.log('Discord bot connected successfully');
    })
    .catch(error => {
      console.warn('Failed to login to Discord:', error.message);
      console.warn('Discord features will be disabled. Please check your DISCORD_TOKEN.');
      client = null;
      discordEnabled = false;
    });
} else {
  console.warn('DISCORD_TOKEN not found or invalid in environment variables. Discord bot will not start.');
}

/**
 * Function to sync a single Discord event with MongoDB.
 * @param {GuildScheduledEvent} discordEvent - The Discord scheduled event.
 */
async function syncEventWithDatabase(discordEvent) {
  try {
    // Find an existing event by Discord event ID
    let event = await Event.findOne({ discordEventId: discordEvent.id });
    console.log(discordEvent)
    if (!event) {
      // If no event is found, create a new one
      event = new Event({
        discordEventId: discordEvent.id,
        date: discordEvent.scheduledStartAt ? discordEvent.scheduledStartAt.toISOString() : 'Unknown',
        title: discordEvent.name,
        location: discordEvent.entityMetadata?.location || 'Unknown',
        image: discordEvent.image
          ? `https://cdn.discordapp.com/guild-events/${discordEvent.guildId}/${discordEvent.id}/${discordEvent.image}`
          : '/logo.png',
        description: discordEvent.description || 'No description provided',
        rsvps: [],
      });
      await event.save();
      console.log(`New event created: ${discordEvent.name}`);
    } else {
      // Update existing event if necessary
      event.date = discordEvent.scheduledStartAt ? discordEvent.scheduledStartAt.toISOString() : 'Unknown';
      event.title = discordEvent.name;
      event.location = discordEvent.entityMetadata?.location || 'Unknown';
      event.image = discordEvent.image
        ? `https://cdn.discordapp.com/guild-events/${discordEvent.guildId}/${discordEvent.id}/${discordEvent.image}`
        : '/logo.png';
      event.description = discordEvent.description || 'No description provided';
      await event.save();
      console.log(`Event updated: ${discordEvent.name}`);
    }
  } catch (error) {
    console.error('Error syncing event with MongoDB:', error);
  }
}

/**
 * Fetch and synchronize all scheduled events for a guild with MongoDB.
 * @param {string} guildId - The ID of the guild to fetch scheduled events from.
 */
async function fetchAndSyncScheduledEvents(guildId) {
  if (!client || !discordEnabled) {
    console.warn('Discord client not available. Skipping event sync.');
    return;
  }

  try {
    const guild = await client.guilds.fetch(guildId);

    if (!guild) {
      console.log('Guild not found');
      return;
    }

    const scheduledEvents = await guild.scheduledEvents.fetch();

    // Get all Discord event IDs from the server
    const discordEventIds = scheduledEvents.map(event => event.id);

    // Get all events from MongoDB
    const dbEvents = await Event.find({});

    // Sync each Discord event with MongoDB
    for (const [id, event] of scheduledEvents) {
      await syncEventWithDatabase(event);
    }

    // Delete events from MongoDB that no longer exist on Discord
    for (const event of dbEvents) {
      if (!discordEventIds.includes(event.discordEventId)) {
        await Event.deleteOne({ discordEventId: event.discordEventId });
        console.log(`Deleted event from MongoDB: ${event.title}`);
      }
    }
  } catch (error) {
    console.error('Error fetching or syncing scheduled events:', error);
  }
}

/**
 * Event listener for when a guild scheduled event is created.
 */
if (client) {
  client.on('guildScheduledEventCreate', (event) => {
    console.log(`Scheduled event created: ${event.name}`);
    syncEventWithDatabase(event); // Sync new event with MongoDB
  });

  /**
   * Event listener for when a guild scheduled event is updated.
   */
  client.on('guildScheduledEventUpdate', (oldEvent, newEvent) => {
    console.log(`Scheduled event updated: ${oldEvent.name} -> ${newEvent.name}`);
    syncEventWithDatabase(newEvent); // Sync updated event with MongoDB
  });

  /**
   * Event listener for when a guild scheduled event is deleted.
   */
  client.on('guildScheduledEventDelete', async (event) => {
    console.log(`Scheduled event deleted: ${event.name}`);
    // Remove the event from MongoDB
    try {
      await Event.deleteOne({ discordEventId: event.id });
      console.log(`Event deleted from MongoDB: ${event.name}`);
    } catch (error) {
      console.error('Error deleting event from MongoDB:', error);
    }
  });
}


async function sendOrEditDiscordMessage(channelId, messageId, content, embeds, components) {
  if (!client || !discordEnabled) {
    console.warn('Discord client not available. Cannot send message.');
    throw new Error('Discord client not available');
  }

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

// Start synchronization when the bot is ready
if (client) {
  client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    discordEnabled = true;

    const guildId = process.env.DISCORD_GUILD_ID || '1215926213839945778';
    fetchAndSyncScheduledEvents(guildId);
  });
}

module.exports = { syncEventWithDatabase, sendOrEditDiscordMessage };
