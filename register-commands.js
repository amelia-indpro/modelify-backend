import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';

config();

const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commands = [
    {
        name: 'imagine',
        description: 'Send an imagine prompt',
        options: [
            {
                name: 'prompt',
                type: 3, // String type
                description: 'The prompt to imagine',
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
