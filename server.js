import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import cors from "cors";

config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const token = process.env.BOT_TOKEN;
const channelId = process.env.CHANNEL_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Discord bot is online!');
});

client.login(token);

app.post('/send-command', async (req, res) => {
    const { prompt } = req.body;

    try {
        const channel = await client.channels.fetch(channelId);
        //const channel = client.channels.cache.get(channelId);
        if (channel) {
            await channel.send(`/imagine ${prompt}`);
            res.status(200).send('Command sent successfully');
        } else {
            res.status(404).send('Channel not found');
        }
    } catch (error) {
        console.error('Error sending command:', error);
        res.status(500).send('Failed to send command');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
