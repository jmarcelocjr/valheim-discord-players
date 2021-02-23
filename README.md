# Valheim Discord Players

A simple script to watch logfile and create a message into a discord channel showing who is online.

Only for Valheim Dedicated Server.

### Features

- send and update message into a discord channel (must be a exclusive channel for it)
- show who is online

## Requirements
- Valheim Dedicated Server
- Nodejs
- NPM/Yarn
- Discord channel (exclusive for it)
- Configured bot (more info [here](https://discord.com/developers/applications))

## How to install
- `npm install` / `yarn install`
- rename the `.env.example` to `.env`
- insert your keys and the logfile path
- `node index.js`

That's it!

## TODO
- sync when script start running to check if there's any player online already

## Contributing
Feel free to contribute, you are more than welcome!