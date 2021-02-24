const Tail = require('tail-file');
const Discord = require('discord.js');

const client = new Discord.Client();

require('dotenv/config');

const DISCORD_TOKEN     = process.env.DISCORD_TOKEN;
const DISCORD_CHANNEL   = process.env.DISCORD_CHANNEL;
const VHSERVER_CONSOLE_LOG_PATH = process.env.VHSERVER_CONSOLE_LOG_PATH;

let channel = null;
let message = null;

const online = {};
let lastId = null;

client.login(DISCORD_TOKEN);

client.on('ready', async () => {
    channel = await client.channels.fetch(DISCORD_CHANNEL);

    channel.bulkDelete(100);

    message = await channel.send(`Players Online ${Object.keys(online).length}/10`);
});

const mytail = new Tail(VHSERVER_CONSOLE_LOG_PATH, line => {
    const lastCount = Object.keys(online).length;

    let matches = line.match(/Got session request from (?<id>[\d]+)/);
    if (matches != null) {
        lastId = matches.groups.id;
        return;
    }

    matches = line.match(/Got character ZDOID from (?<name>[\w\s]+) : \d+/);
    if (matches != null && lastId != null) {
        const name = matches.groups.name;
        online[lastId] = name;

        lastId = null;
    }

    matches = line.match(/Closing socket (?<id>[\d]+)/);
    if (matches != null) {
        delete online[matches.groups.id];
    }

    if (lastCount == Object.keys(online).length) {
        return;
    }

    const embed = new Discord.MessageEmbed().setDescription(Object.values(online).join('\n'));
    message.edit(`Players online: ${Object.keys(online).length}/10`, embed);
});
