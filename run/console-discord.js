const Discord = require("discord.js");
const Commands = require("../src/modules/CommandList");
const index = require("../src/index");
const Logger = require("../src/modules/Logger");


var fs = require('fs');

const config = {
    role: "owner",
    token: "NTY4Nzc1OTU3NDkwNjk2MTky.XLm_8g.QABmXoQkLG1_YZE3WPVudVwsejk"
};

class Bot {
    constructor() {
        this.client = new Discord.Client();
        global.client2 = this.client;
        this.client.on("message", this.onMessage.bind(this));
        this.client.on("ready", this.onReady.bind(this));
        process.on("error", this.onError.bind(this));
        this.client.login(config.token);
    };
    onMessage(message) {
        const args = message.content.split(/\s+/g);
        var execute = Commands.list[args[0]];
        if (typeof execute != 'undefined' && message.member.roles.some(r => [config.role].includes(r.name))) {
            execute(index.gameServer, args);
            message.delete();
            if (message.content.startsWith("s")) {
                message.channel.send(speed2);
            } else if (message.content.startsWith("help")) {
                message.channel.send(help2);
                message.channel.send(help21);
                message.channel.send(help22);
            } else if (message.content.startsWith("debug")) {
                message.channel.send(debug);
            }
            if (message.content.startsWith("pl")) {
                if (message.content == 'pl') {
                   message.channel.send("Playerlist Discord In Progress");
               }
            }
        } else {
            return;
        }
    };
    onReady() {
        Logger.info(`Successfully logged in.`);
        this.client.user.setGame("Agario");
    };

    onError(error) {
        Logger.error(`The bot has encountered an error while running:\n${error}`);
    };
};

new Bot;
