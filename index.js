// Dependencies

const express = require('express');
const axios = require('axios');
const nodecron = require('node-cron');

// Variables and Configuration

const ExpressApp = express();
const ExpressPort = 3000;
const GuildIdentifier = '765601732368531466';

let CurrentEmbedData = null;

// Primary Fetch Function

const DownloadEmbedFile = async () => {
  try {
    const response = await axios.get('https://discordapp.com/api/guilds/' + GuildIdentifier + '/embed.json');
    CurrentEmbedData = response.data;

    console.log('Embed data fetched successfully');
  } catch (error) {
    console.error('Error fetching embed data:', error);
  }
};

// Initially fetch the embed.json file from the Discord API and then schedule cron to fetch it every 5 minutes

DownloadEmbedFile();
nodecron.schedule('*/5 * * * *', DownloadEmbedFile);

// Set up Express /embed.json endpoint for clients to fetch it

ExpressApp.get('/embed.json', (Request, Response) => {
  if (CurrentEmbedData) {
    Response.json(CurrentEmbedData);
  } else {
    Response.status(404).send('Embed data is not available yet');
  }
});

// Start the Express Server

ExpressApp.listen(ExpressPort, () => {
  console.log(`sfcore_embedcache is running on port ${ExpressPort}`);
});