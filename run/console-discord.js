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
        this.client.on("message", this.onMessage.bind(this));
        this.client.on("ready", this.onReady.bind(this));
        process.on("error", this.onError.bind(this));
        this.client.login(config.token);
    };
    onMessage(message) {
        const args = message.content.split(/\s+/g);
        var execute = Commands.list[args[0]];
        var path = "../src/logs/ServerLogs.log";
        if (typeof execute != 'undefined' && message.member.roles.some(r => [config.role].includes(r.name))) {
            execute(index.gameServer, args);
            message.delete();
            const stream = fs.createReadableStream(path);
            stream.pipe(process.stdout);
            let data = ''; stream.on('data', chunk => data += chunk);
            Logger.info("Data: " + data);
            stream.on('end', () => message.channel.send(data));
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
