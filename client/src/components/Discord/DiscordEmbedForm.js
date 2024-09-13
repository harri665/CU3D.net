import React, { useState } from 'react';

const DiscordEmbedEditor = () => {
  const [jsonInput, setJsonInput] = useState(''); // Stores the input JSON
  const [parsedJson, setParsedJson] = useState(null); // Stores the parsed JSON
  const [messageId, setMessageId] = useState(''); // Stores the message ID for editing
  const [channelId, setChannelId] = useState(''); // Stores the channel ID for sending new messages or editing

  // Handle JSON input change and parse it
  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setParsedJson(parsed);
    } catch (error) {
      setParsedJson(null);
    }
  };

  // Send or update the message on Discord
  const handleSendOrEditMessage = async () => {
    if (!parsedJson || !channelId) {
      return alert('Please provide valid JSON input and a channel ID.');
    }

    try {
      const response = await fetch('/api/discord/send-or-edit-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId: messageId || null, // If messageId is provided, use it; otherwise null
          channelId: channelId, // Use the provided channelId
          content: parsedJson.content,
          embeds: parsedJson.embeds,
          components: parsedJson.components,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send or edit message');
      }

      const result = await response.json();
      console.log('Operation successful:', result);
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send or edit the message');
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Discord Embed Editor (JSON Input)</h1>

      {/* Channel ID */}
      <div className="mb-4">
        <label className="block font-bold">Channel ID</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={channelId}
          onChange={(e) => setChannelId(e.target.value)}
          placeholder="Enter Channel ID"
        />
      </div>

      {/* Message ID */}
      <div className="mb-4">
        <label className="block font-bold">Message ID (Optional)</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={messageId}
          onChange={(e) => setMessageId(e.target.value)}
          placeholder="Enter Message ID (Leave blank for new message)"
        />
      </div>

      {/* JSON Input */}
      <div className="mb-4">
        <label className="block font-bold">JSON Input</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          value={jsonInput}
          onChange={handleJsonChange}
          placeholder='Paste your JSON here'
          rows="10"
        />
      </div>

      {/* Parsed JSON Display */}
      <div className="mb-4">
        <h2 className="font-bold">Parsed JSON</h2>
        <pre className="p-2 bg-gray-200 rounded">
          {parsedJson ? JSON.stringify(parsedJson, null, 2) : 'Invalid JSON'}
        </pre>
      </div>

      {/* Button to send or edit message */}
      <button
        className="p-2 bg-green-500 text-white rounded"
        onClick={handleSendOrEditMessage}
      >
        {messageId ? 'Edit Message' : 'Send New Message'}
      </button>
      <div className='h-screen'></div>
    </div>
  );
};

export default DiscordEmbedEditor;
