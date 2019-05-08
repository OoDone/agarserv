const Discord = require("discord.js");
const Commands = require("../src/modules/CommandList");
const index = require("../src/index");
const Logger = require("../src/modules/Logger");
var fs = require('fs');
var Data = '';
fs.readFile('../src/logs/serverlogs.log', function (err, data) {
  if (err)
    throw err;
  if (data)
    console.log(data.toString('utf8'));
    Data = data.toString('utf8');
});
var spawn = require('child_process').spawn;
var proc = spawn('test.exe');
proc.stdout.on('data', function(data) {
  process.stdout.write(data);
  console.log("it fucking works!")
});
proc.stderr.on('data', function(data) {
  process.stderr.write(data);
});
proc.on('close', function(code, signal) {
  console.log('test.exe closed');
});

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
        if (typeof execute != 'undefined' && message.member.roles.some(r => [config.role].includes(r.name))) {
            execute(index.gameServer, args);
            message.delete();
            message.channel.send(Data);
        } else {
            return;
        }
    };

    onReady() {
        Logger.info(`Successfully logged in.`);
        this.client.user.setGame("Helping players");
    };

    onError(error) {
        Logger.error(`The bot has encountered an error while running:\n${error}`);
    };
};

new Bot;
