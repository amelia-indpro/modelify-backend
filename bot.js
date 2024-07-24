import { Client, GatewayIntentBits, InteractionType, Events } from 'discord.js';
import { config } from 'dotenv';

config();

const token = process.env.BOT_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ApplicationCommand) return;

    const { commandName, options } = interaction;

    if (commandName === 'imagine') {
        const prompt = options.getString('prompt');
        await interaction.reply(`/imagine ${prompt}`);
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'imagine') {
        const prompt = options.getString('prompt');

        // Replace this with your logic to handle the prompt
        await interaction.reply(`Imagine command received with prompt: ${prompt}`);
    }

    if (commandName === 'imagine') {
        const prompt = options.getString('prompt');

        try {
            // Example of sending the prompt to an external service
            const response = await axios.post('https://api.midjourney.com/generate', { prompt });
            console.log('response',response);

            // Handle the response from the external service
            await interaction.reply(`Image generated: ${response.data.imageUrl}`);
        } catch (error) {
            console.error('Error generating image:', error);
            await interaction.reply('Failed to generate image.');
        }
    }
});



client.login(token);
