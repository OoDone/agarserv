const Commands = require("./src/modules/CommandList");
const index = require("./src/index");
const Logger = require("./src/modules/Logger");
var Entity = require('./src/entity');
var GameMode = require('./src/gamemodes');

module.exports = recievedCmd;
function recievedCmd(cmd) {
}

function lol (msg) {
      const args = msg.content.split(/\s+/g);
      var execute = Commands.list[args[0]];
      execute(index.gameServer, args);
}
