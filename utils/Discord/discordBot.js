const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mst', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Event = require('../../models/Event'); // Assuming your Event model is in models/Event.js

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
 * Function to sync scheduled events with MongoDB.
 * @param {GuildScheduledEvent} discordEvent - The Discord scheduled event.
 */
async function syncEventWithDatabase(discordEvent) {
  try {
    // Find an existing event by title or create a new one
    let event = await Event.findOne({ title: discordEvent.name });
    console.log("image", discordEvent.scheduledStartAt )

    if (!event) {
      // If no event is found, create a new one
      event = new Event({
        date: discordEvent.scheduledStartAt ? discordEvent.scheduledStartAt.toISOString() : 'Unknown',
        title: discordEvent.name,
        location: discordEvent.entityMetadata?.location || 'Unknown', // Map to location
        image: discordEvent.image ? ('https://cdn.discordapp.com/guild-events/1290347959770157107/' + discordEvent.image) : '/logo.png', // Placeholder for event image
        rsvps: [], // Empty RSVPs initially
      });
      await event.save();
      console.log(`New event created: ${discordEvent.name}`);
    } else {
      // Update existing event if necessary
      event.date = discordEvent.scheduledStartTime.toISOString();
      event.location = discordEvent.entityMetadata?.location || 'Unknown';
      await event.save();
      console.log(`Event updated: ${discordEvent.name}`);
    }
  } catch (error) {
    console.error('Error syncing event with MongoDB:', error);
  }
}

/**
 * Fetch and log all scheduled events for a guild and sync them with MongoDB.
 * @param {string} guildId - The ID of the guild to fetch scheduled events from.
 */
async function fetchAndSyncScheduledEvents(guildId) {
  try {
    const guild = await client.guilds.fetch(guildId);

    if (!guild) {
      console.log('Guild not found');
      return;
    }

    const scheduledEvents = await guild.scheduledEvents.fetch();

    if (scheduledEvents.size === 0) {
      console.log('No scheduled events found');
    } else {
      // Sync each event with MongoDB
      scheduledEvents.forEach(event => {
        syncEventWithDatabase(event);
      });
    }
  } catch (error) {
    console.error('Error fetching or syncing scheduled events:', error);
  }
}

/**
 * Event listener for when a guild scheduled event is updated
 * @param {GuildScheduledEvent} oldEvent - The old state of the scheduled event.
 * @param {GuildScheduledEvent} newEvent - The updated state of the scheduled event.
 */
client.on('guildScheduledEventUpdate', (oldEvent, newEvent) => {
  console.log(`Scheduled event updated: ${oldEvent.name} -> ${newEvent.name}`);
  syncEventWithDatabase(newEvent); // Sync updated event with MongoDB
});

// Example usage: Fetch scheduled events for a specific guild when bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  const guildId = '1215926213839945778'; // Replace with your guild ID
  fetchAndSyncScheduledEvents(guildId);
});

module.exports = { syncEventWithDatabase };
