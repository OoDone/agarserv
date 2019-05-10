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
        process.setMaxListeners(0)
    };onMessage(message) {
        const args = message.content.split(/\s+/g);
        var execute = Commands.list[args[0]];
        if (typeof execute != 'undefined' && message.member.roles.some(r => [config.role].includes(r.name))) {
            execute(index.gameServer, args);
            message.delete();
            if (message.content.startsWith("s ")) {
                message.channel.send(speed2);
            } else if (message.content == "s") {
                message.channel.send(speed2);
            } else if (message.content.startsWith("help")) {
                message.channel.send(help2);
                message.channel.send(help21);
                message.channel.send(help22);
            } else if (message.content.startsWith("debug")) {
                message.channel.send(debug);
            } else if (message.content.startsWith("shortcuts")) {
                message.channel.send(shortcut2);
            } else if (message.content.startsWith("reset")) {
                if (reset1t = true) {
                    message.channel.send(reset1);
                    reset1t = false;
                } else if (reset2t = true) {
                    message.channel.send(reset2);
                    reset2t = false;
                } else if (reset3t = true) {
                    message.channel.send(reset3);
                    reset3t = false;
                } else if (reset4t = true) {
                    message.channel.send(reset4);
                    reset4t = false;
                }
            } else if (message.content.startsWith("minion")) {
                message.channel.send(minion1);
            } else if (message.content.startsWith("ban") && (!message.content.startsWith("banlist"))) {
                message.channel.send(ban2);
            } else if (message.content.startsWith("banlist")) {
                message.channel.send(banlist1);
                message.channel.send(banlist2);
                message.channel.send(banlist4);
                message.channel.send(banlist3);
            } else if (message.content.startsWith("addbot")) {
                message.channel.send(addbot1);
            } else if (message.content.startsWith("kickbot")) {
                message.channel.send(kickbot1);
            } else if (message.content.startsWith("board")) {
                message.channel.send(board1);
            } else if (message.content.startsWith("change")) {
                message.channel.send(change1);
            } else if (message.content.startsWith("clear")) {
                message.channel.send(clear1);
                message.channel.send(clear2);
                message.channel.send(clear3);
            } else if (message.content.startsWith("color")) {
                message.channel.send(color1);
            } else if (message.content.startsWith("exit")) {
                message.channel.send(exit1);
            } else if (message.content.startsWith("restart")) {
                message.channel.send(restart1);
            } else if ((message.content.startsWith("kick")) && (!message.content.startsWith("kickall"))) {
                message.channel.send(kick1);
            } else if (message.content.startsWith("mute")) {
                message.channel.send(mute1);
            } else if (message.content.startsWith("unmute")) {
                message.channel.send(unmute1);
            } else if (message.content.startsWith("kickall")) {
                message.channel.send(kickall1);
            } else if (message.content.startsWith("kill")) {
                message.channel.send(kill1);
            } else if (message.content.startsWith("killall")) {
                message.channel.send(killall1);
            } else if (message.content.startsWith("mass")) {
                message.channel.send(mass1);
            } else if (message.content.startsWith("playerlist")) {
                message.channel.send(playerlist3);
                message.channel.send(playerlist4);
                message.channel.send(playerlist5);
                message.channel.send(playerlist6);
                if (client.cells.length) {
                    message.channel.send(" " + id + " | " + ip + " | " + protocol + " | " + cells + " | " + score + " | " + position + " | " + nick);
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
