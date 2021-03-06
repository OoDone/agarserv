var figlet = require('figlet');

// Imports
var GameMode = require('../gamemodes');
var Logger = require('./Logger');
var Entity = require('../entity');

function Commands() {
    this.list = {}; // Empty
}


module.exports = Commands;

// Utils
var fillChar = function (data, char, fieldLength, rTL) {
    var result = data.toString();
    if (rTL === true) {
        for (var i = result.length; i < fieldLength; i++)
            result = char.concat(result);
    } else {
        for (var i = result.length; i < fieldLength; i++)
            result = result.concat(char);
    }
    return result;
};

// Commands
Commands.list = {
    help: function (gameServer, split) {
        Logger.print("                       ┌────────────────────────────┐                       \n" +
            "                       │ LIST OF AVAILABLE COMMANDS │                       \n" +
            "┌──────────────────────┴────────────────────────────┴──────────────────────┐\n" +
            "│                         ----Players and AI----                           │\n" +
            "│                                                                          │\n" +
            "│ playerlist                   │ Get list of players, bots, ID's, etc      │\n" +
            "│ minion [PlayerID] [#] [name] │ Adds suicide minions to the server        │\n" +
            "│ addbot [number]              │ Adds bots to the server                   │\n" +
            "│ kickbot [number]             │ Kick a number of bots - No value= all gone│\n" +
            "│ kick [PlayerID]              │ Kick player or bot by client ID           │\n" +
            "│ kickall                      │ Kick all players and bots                 │\n" +
            "│ kill [PlayerID]              │ Kill the player by client ID              │\n" +
            "│ killall                      │ Kills everyone                            │\n" +
            "│                                                                          │\n" +
            "│                          ----Player Commands----                         │\n" +
            "│                                                                          │\n" +
            "│ spawn [entity] [pos] [mass]  │ Spawns an entity                          │\n" +
            "│ mass [PlayerID] [mass]       │ Set cell(s) mass by client ID             │\n" +
            "│ merge [PlayerID]             │ Merge all client's cells                  │\n" +
            "│ spawnmass [PlayerID] [mass]  │ Sets a player's spawn mass                │\n" +
            "│ freeze [PlayerID]            │ Freezes a player                          │\n" +
            "│ speed [PlayerID]             │ Sets a player's base speed                │\n" +
            "│ color [PlayerID] [R] [G] [B] │ Set cell(s) color by client ID            │\n" +
            "│ name [PlayerID] [name]       │ Change cell(s) name by client ID          │\n" +
            "│ skin [PlayerID] [string]     │ Change cell(s) skin by client ID          │\n" +
            "│ rec [PlayerID]               │ Gives a player instant-recombine + more   │\n" +
            "│ split [PlayerID] [Amount]    │ Forces a player to split                  │\n" +
            "│ tp [X] [Y]                   │ Teleports player(s) to XY coordinates     │\n" +
            "│ replace [PlayerID] [entity]  │ Replaces a player with an entity          │\n" +
            "│ pop [PlayerID]               │ Pops a player with a virus                │\n" +
            "| explode [PlayerID]           | Explodes a player into ejected mass       |\n" +
            "│                                                                          │\n" +
            "│                          ----Server Commands----                         │\n" +
            "│                                                                          │\n" +
            "│ pause                        │ Pause game, freeze all nodes              │\n" +
            "│ board [string] [string] ...  │ Set scoreboard text                       │\n" +
            "│ change [setting] [value]     │ Change specified settings                 │\n" +
            "│ reload                       │ Reload config, banlist, and role files    │\n" +
            "│ ban [PlayerID │ IP]          │ Bans a player(s) IP                       │\n" +
            "│ unban [IP]                   │ Unbans an IP                              │\n" +
            "│ banlist                      │ Get list of banned IPs.                   │\n" +
            "│ mute [PlayerID]              │ Mute player from chat by client ID        |\n" +
            "│ unmute [PlayerID]            │ Unmute player from chat by client ID      │\n" +
            "| lms                          | Starts/ends last man standing             |\n" +
            "| chat                         | Sends a server message to all clients     |\n" +
            "│                                                                          │\n" +
            "│                          ----Miscellaneous----                           │\n" +
            "│                                                                          │\n" +
            "│ clear                        │ Clear console output                      │\n" +
            "│ reset                        │ Removes all nodes and reimplement them    │\n" +
            "│ status                       │ Get server status                         │\n" +
            "│ debug                        │ Get/check node lengths                    │\n" +
            "│ exit                         │ Stops the server                          │\n" +
            "│ calc                         │ Get size/mass from a specified value      │\n" +
            "│                                                                          │\n" +
            "├──────────────────────────────────────────────────────────────────────────┤\n" +
            '│         Psst! Do "shortcuts" for a list of command shortcuts!            │\n' +
            "└──────────────────────────────────────────────────────────────────────────┘");
    },
    shortcuts: function (gameServer, split) {
        Logger.print("                       ┌────────────────────────────┐                       \n" +
            "                       │ LIST OF COMMAND SHORTCUTS  │                       \n" +
            "┌──────────────────────┴──────┬─────────────────────┴──────────────────────┐\n" +
            "│ st                          │ Alias for status of server                 │\n" +
            "│ pl                          │ Alias for playerlist                       │\n" +
            "│ m                           │ Alias for mass                             │\n" +
            "│ sm                          │ Alias for spawnmass                        │\n" +
            "│ ka                          │ Alias for killall                          │\n" +
            "│ k                           │ Alias for kill                             │\n" +
            "│ mg                          │ Alias for merge                            │\n" +
            "│ s                           │ Alias for speed                            │\n" +
            "│ mn                          │ Alias for minion                           │\n" +
            "│ f                           │ Alias for freeze                           │\n" +
            "│ ab                          │ Alias for addbot                           │\n" +
            "│ kb                          │ Alias for kickbot                          │\n" +
            "│ c                           │ Alias for change                           │\n" +
            "│ n                           │ Alias for name                             │\n" +
            "│ rep                         │ Alias for replace                          │\n" +
            "| e                           | Alias for explode                          |\n" +
            "└─────────────────────────────┴────────────────────────────────────────────┘");
    },
    chat: function (gameServer, split) {
        for (var i = 0; i < gameServer.clients.length; i++) {
            gameServer.sendChatMessage(null, i, String(split.slice(1, split.length).join(" ")));
            gameServer.sendChatMessage(null, i, "test");
        }
    },
    debug: function (gameServer, split) {
        // Count client cells
        var clientCells = 0;
        for (var i in gameServer.clients) {
            clientCells += gameServer.clients[i].playerTracker.cells.length;
        }
        // Output node information
        global.debug = "Clients:        " + fillChar(gameServer.clients.length, " ", 4, true) + " / " + gameServer.config.serverMaxConnections + " + bots" + "\n" +
            "Total nodes:" + fillChar(gameServer.nodes.length, " ", 8, true) + "\n" +
            "- Client cells: " + fillChar(clientCells, " ", 4, true) + " / " + (gameServer.clients.length * gameServer.config.playerMaxCells) + "\n" +
            "- Ejected cells:" + fillChar(gameServer.nodesEjected.length, " ", 4, true) + "\n" +
            "- Food:        " + fillChar(gameServer.nodesFood.length, " ", 4, true) + " / " + gameServer.config.foodMaxAmount + "\n" +
            "- Viruses:      " + fillChar(gameServer.nodesVirus.length, " ", 4, true) + " / " + gameServer.config.virusMaxAmount + "\n" +
            "Moving nodes:   " + fillChar(gameServer.movingNodes.length, " ", 4, true) + "\n" +
            "Quad nodes:     " + fillChar(scanNodeCount(gameServer.quadTree), " ", 4, true) + "\n" +
            "Quad items:     " + fillChar(scanItemCount(gameServer.quadTree), " ", 4, true);
        Logger.print(global.debug);
    },
    reset: function (gameServer, split) {
        var ent = split[1];
        global.reset2t = false;
        global.reset3t = false;
        global.reset4t = false;
        global.reset1t = false;
        if (ent != "ejected" && ent != "food" && ent != "virus") {
            global.reset1 = "Removed " + gameServer.nodes.length + " nodes";
            reset1t = true;
            for (; gameServer.nodes.length;) gameServer.removeNode(gameServer.nodes[0]);
            Logger.print(global.reset1);
        }
        if (ent == "ejected") {
            global.reset2 = "Removed " + gameServer.nodesEjected.length + " ejected nodes";
            reset2t = true;
            for (; gameServer.nodesEjected.length;) gameServer.removeNode(gameServer.nodesEjected[0]);
            Logger.print(global.reset2);
        }
        if (ent == "food") {
            global.reset3 = "Removed " + gameServer.nodesFood.length + " food nodes";
            reset3t = true;
            for (; gameServer.nodesFood.length;) gameServer.removeNode(gameServer.nodesFood[0]);
            Logger.print(global.reset3);
        }
        if (ent == "virus") {
            global.reset4 = "Removed " + gameServer.nodesVirus.length + " virus nodes";
            reset4t = true;
            for (; gameServer.nodesVirus.length;) gameServer.removeNode(gameServer.nodesVirus[0]);
            Logger.print(global.reset4);
        }
    },
    minion: function (gameServer, split) {
        var id = parseInt(split[1]);
        var add = parseInt(split[2]);
        var name = split.slice(3, split.length).join(' ');

        // Error! ID is NaN
        if (isNaN(id)) {
            var m = "Please specify a valid player id!";
            Logger.print(m);
        }

        // Find ID specified and add/remove minions for them
        for (var i in gameServer.clients) {
            var client = gameServer.clients[i].playerTracker;

            if (client.pID == id) {

                // Prevent the user from giving minions, to minions
                if (client.isMi) {
                    var m1 = "You cannot give minions to a minion!";
                    Logger.print(m1);
                };

                // Remove minions
                if (client.minionControl === true && isNaN(add)) {
                    client.minionControl = false;
                    client.miQ = 0;
                    var m2 = "Successfully removed minions for " + getName(client._name);
                    Logger.print(m2);
                    // Add minions
                } else {
                    client.minionControl = true;
                    // Add minions for client
                    if (isNaN(add)) add = 1;
                    for (var i = 0; i < add; i++) {
                        gameServer.bots.addMinion(client, name);
                    }
                    var m3 = "added " + add + " minions for " + getName(client._name);
                    Logger.print(m3);
                }
                break;
            }
        }
    },
    addbot: function (gameServer, split) {
        var add = parseInt(split[1]);
        if (isNaN(add)) {
            add = 1; // Adds 1 bot if user doesnt specify a number
        }

        for (var i = 0; i < add; i++) {
            gameServer.bots.addBot();
        }
        return "Added " + add + " player bots";
    },
    ban: function (gameServer, split) {
        // Error message
        var logInvalid = "Please specify a valid player ID or IP address!";

        if (split[1] === null || typeof split[1] == "undefined") {
            // If no input is given; added to avoid error
            return "Please specify a valid player ID or IP address!";
            //return;
        }

        if (split[1].indexOf(".") >= 0) {
            // If input is an IP address
            var ip = split[1];
            var ipParts = ip.split(".");

            // Check for invalid decimal numbers of the IP address
            for (var i in ipParts) {
                if (i > 1 && ipParts[i] == "*") {
                    // mask for sub-net
                    continue;
                }
                // If not numerical or if it's not between 0 and 255
                if (isNaN(ipParts[i]) || ipParts[i] < 0 || ipParts[i] >= 256) {
                    return "Please specify a valid player ID or IP address!";
                    //return;
                }
            }
            ban(gameServer, split, ip);
            return;
        }
        // if input is a Player ID
        var id = parseInt(split[1]);
        if (isNaN(id)) {
            // If not numerical
            return "Please specify a valid player ID or IP address!";
            //return;
        }
        var ip = null;
        for (var i in gameServer.clients) {
            var client = gameServer.clients[i];
            if (!client || !client.isConnected)
                continue;
            if (client.playerTracker.pID == id) {
                ip = client._socket.remoteAddress;
                break;
            }
        }
        if (ip) ban(gameServer, split, ip);
        else return "Player ID " + id + " not found!";
    },
    banlist: function (gameServer, split) {
        global.banlist1 = "Showing " + gameServer.ipBanList.length + " banned IPs:  \n" +
        " IP              | IP ";
        global.banlist3 = "───────────────────────────────────";
        for (var i = 0; i < gameServer.ipBanList.length; i += 2) {
            
             global.banlist = " " + fillChar(gameServer.ipBanList[i], " ", 15) + " | " +
                 (gameServer.ipBanList.length === i + 1 ? "" : gameServer.ipBanList[i + 1]) + "";
        }
    },
    kickbot: function (gameServer, split) {
        var toRemove = parseInt(split[1]);
        if (isNaN(toRemove)) {
            // Kick all bots if user doesnt specify a number
            toRemove = gameServer.clients.length;
        }
        var removed = 0;
        for (var i = 0; i < gameServer.clients.length; i++) {
            if (gameServer.clients[i].isConnected != null)
                continue; // verify that the client is a bot
            gameServer.clients[i].close();
            removed++;
            if (removed >= toRemove)
                break;
        }
        if (!removed)
            return "Cannot find any bots";
        else if (toRemove == removed)
            return "Kicked " + removed + " bots";
        else
            return "Only " + removed + " bots were kicked";
    },
    board: function (gameServer, split) {
        var newLB = [];
        var reset = split[1];

        for (var i = 1; i < split.length; i++) {
            if (split[i]) newLB[i - 1] = split[i];
            else newLB[i - 1] = " ";
        }

        // Clears the update leaderboard function and replaces it with our own
        gameServer.gameMode.packetLB = 48;
        gameServer.gameMode.specByLeaderboard = false;
        gameServer.gameMode.updateLB = function (gameServer) {
            gameServer.leaderboard = newLB;
            gameServer.leaderboardType = 48;
        };
        if (reset != "reset") {
            return "Successfully changed leaderboard values \n" + 
            'Do "board reset" to reset leaderboard';
        } else {
            // Gets the current gamemode
            var gm = GameMode.get(gameServer.gameMode.ID);

            // Replace functions
            gameServer.gameMode.packetLB = gm.packetLB;
            gameServer.gameMode.updateLB = gm.updateLB;
            return "Successfully reset leaderboard";
        }
    },
    change: function (gameServer, split) {
        if (split.length < 3) {
            return "Invalid command arguments";
            //return;
        }
        var key = split[1];
        var value = split[2];

        // Check if int/float
        if (value.indexOf('.') != -1) {
            value = parseFloat(value);
        } else {
            value = parseInt(value);
        }

        if (value == null || isNaN(value)) {
            return "Invalid value: " + value;
            //return;
        }
        if (!gameServer.config.hasOwnProperty(key)) {
            return "Unknown config value: " + key;
            //return;
        }
        gameServer.config[key] = value;

        // update/validate
        gameServer.config.playerMinSize = Math.max(32, gameServer.config.playerMinSize);
        Logger.setVerbosity(gameServer.config.logVerbosity);
        Logger.setFileVerbosity(gameServer.config.logFileVerbosity);
        Logger.print("Set " + key + " = " + gameServer.config[key]);
    },
    clear: function (gameServer) {
        process.stdout.write("\u001b[2J\u001b[0;0H");

        figlet(('MultiOgar-Edited  ' + gameServer.version), function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(data)
        });

        return "\u001B[1m\u001B[32mMultiOgar-Edited " + gameServer.version + "\u001B[37m - An open source multi-protocol ogar server\u001B[0m \n" +
        "Listening on port " + gameServer.config.serverPort + "\n" +
        "```Current game mode is " + gameServer.gameMode.name + "\n";
    },
    color: function (gameServer, split) {
        // Validation checks
        var id = parseInt(split[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }
        // Get colors
        var color = {
            r: 0,
            g: 0,
            b: 0
        };
        color.r = Math.max(Math.min(parseInt(split[2]), 255), 0);
        color.g = Math.max(Math.min(parseInt(split[3]), 255), 0);
        color.b = Math.max(Math.min(parseInt(split[4]), 255), 0);

        // Sets color to the specified amount
        for (var i in gameServer.clients) {
            if (gameServer.clients[i].playerTracker.pID == id) {
                var client = gameServer.clients[i].playerTracker;
                if (!client.cells.length) return "That player is either dead or not playing!";
                client.color = color; // Set color
                for (var j in client.cells) {
                    client.cells[j].color = color;
                }
                break;
            }
        }
        if (client == null) {
            return "That player ID is non-existant!";
        }
        return "Changed " + getName(client._name) + "'s color to: " + color.r + ", " + color.g + ", " + color.b + "";
    },
    exit: function (gameServer, split) {
        return "Closing server...";
        gameServer.wsServer.close();
        process.exit(1);
    },
    restart: function (gameServer) {
        var QuadNode = require('./QuadNode.js');
        return "Restarting server...";
        gameServer.httpServer = null;
        gameServer.wsServer = null;
        gameServer.run = true;
        gameServer.lastNodeId = 1;
        gameServer.lastPlayerId = 1;

        for (var i = 0; i < gameServer.clients.length; i++) {
            var client = gameServer.clients[i];
            client.close();
        };

        gameServer.nodes = [];
        gameServer.nodesVirus = [];
        gameServer.nodesFood = [];
        gameServer.nodesEjected = [];
        gameServer.nodesPlayer = [];
        gameServer.movingNodes = [];
        gameServer.commands;
        gameServer.tickCounter = 0;
        gameServer.startTime = Date.now();
        gameServer.setBorder(gameServer.config.borderWidth, gameServer.config.borderHeight);
        gameServer.quadTree = new QuadNode(gameServer.border, 64, 32);

    },
    kick: function (gameServer, split) {
        var id = parseInt(split[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }
        // kick player
        var count = 0;
        gameServer.clients.forEach(function (socket) {
            if (socket.isConnected === false)
                return;
            if (id !== 0 && socket.playerTracker.pID != id)
                return;
            // remove player cells
            Commands.list.kill(gameServer, split);
            // disconnect
            socket.close(1000, "Kicked from server");
            var name = getName(socket.playerTracker._name);
            return "Kicked \"" + name + "\"";
            gameServer.sendChatMessage(null, null, "Kicked \"" + name + "\""); // notify to don't confuse with server bug
            count++;
        }, this);
        if (count) return;
        if (!id) return "No players to kick!";
        else return "That player ID (" + id + ") is non-existant!";
    },
    mute: function (gameServer, args) {
        if (!args || args.length < 2) {
            return "Please specify a valid player ID!";
            //return;
        }
        var id = parseInt(args[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }
        var player = playerById(id, gameServer);
        if (!player) {
            return "That player ID (" + id + ") is non-existant!";
            //return;
        }
        if (player.isMuted) {
            return "That player with ID (" + id + ") is already muted!";
            //return;
        }
        Logger.print("Player \"" + getName(player._name) + "\" was muted");
        player.isMuted = true;
    },
    unmute: function (gameServer, args) {
        if (!args || args.length < 2) {
            return "Please specify a valid player ID!";
            //return;
        }
        var id = parseInt(args[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }
        var player = playerById(id, gameServer);
        if (player === null) {
            return "That player ID (" + id + ") is non-existant!";
            //return;
        }
        if (!player.isMuted) {
            return "Player with id=" + id + " already not muted!";
            r//eturn;
        }
        return "Player \"" + getName(player._name) + "\" was unmuted";
        player.isMuted = false;
    },
    kickall: function (gameServer, split) {
        this.id = 0; //kick ALL players
        // kick player
        var count = 0;
        gameServer.clients.forEach(function (socket) {
            if (socket.isConnected === false)
                return;
            if (this.id != 0 && socket.playerTracker.pID != this.id)
                return;
            // remove player cells
            Commands.list.killall(gameServer, split);
            // disconnect
            socket.close(1000, "Kicked from server.");
            var name = getName(socket.playerTracker._name);
            return "Kicked \"" + name + "\"";
            gameServer.sendChatMessage(null, null, "Kicked \"" + name + "\""); // notify to don't confuse with server bug
            count++;
        }, this);

        if (count) return;
        if (!this.id) return "No players to kick!";
        else return "That player ID (" + this.id + ") is non-existant!";
    },
    kill: function (gameServer, split) {
        var id = parseInt(split[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }

        var count = 0;
        for (var i in gameServer.clients) {
            if (gameServer.clients[i].playerTracker.pID == id) {
                var client = gameServer.clients[i].playerTracker;
                var len = client.cells.length;
                for (var j = 0; j < len; j++) {
                    gameServer.removeNode(client.cells[0]);
                    count++;
                }

                return "Killed " + getName(client._name) + " and removed " + count + " cells";
                break;
            }
        }
        if (client == null) return "That player ID is non-existant!";
    },
    killall: function (gameServer, split) {
        var count = 0;
        for (var i = 0; i < gameServer.clients.length; i++) {
            var playerTracker = gameServer.clients[i].playerTracker;
            while (playerTracker.cells.length > 0) {
                gameServer.removeNode(playerTracker.cells[0]);
                count++;
            }
        }
        if (this.id) return "Removed " + count + " cells";
    },
    mass: function (gameServer, split) {
        // Validation checks
        var id = parseInt(split[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }
        var amount = parseInt(split[2]);
        if (isNaN(amount)) {
            return "Please specify a valid number";
            //return;
        }
        var size = Math.sqrt(amount * 100);

        // Sets mass to the specified amount
        for (var i in gameServer.clients) {
            if (gameServer.clients[i].playerTracker.pID == id) {
                var client = gameServer.clients[i].playerTracker;
                if (!client.cells.length) global.mass1 = "```That player is either dead or not playing!```";
                for (var j in client.cells) {
                    client.cells[j].setSize(size);
                }
                return "Set mass of " + getName(client._name) + " to " + (size * size / 100).toFixed(3) + "";
                break;
            }
        }
        if (client == null) return "That player ID is non-existant!";
    },
    spawnmass: function (gameServer, split) {
        var id = parseInt(split[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }

        var amount = Math.max(parseInt(split[2]), 9);
        var size = Math.sqrt(amount * 100);
        if (isNaN(amount)) {
            return "Please specify a valid mass!";
            //return;
        }

        // Sets spawnmass to the specified amount
        for (var i in gameServer.clients) {
            if (gameServer.clients[i].playerTracker.pID == id) {
                var client = gameServer.clients[i].playerTracker;
                client.spawnmass = size;
                return "Set spawnmass of " + getName(client._name) + " to " + (size * size / 100).toFixed(3);
            }
        }
        if (client == null) return "That player ID is non-existant!";
    },
    speed: function (gameServer, split) {
        var id = parseInt(split[1]);
        var speed = parseInt(split[2]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }

        if (isNaN(speed)) {
            return "Please specify a valid speed!";
            //return;
        }

        for (var i in gameServer.clients) {
            if (gameServer.clients[i].playerTracker.pID == id) {
                var client = gameServer.clients[i].playerTracker;
                client.customspeed = speed;
                // override getSpeed function from PlayerCell
                Entity.PlayerCell.prototype.getSpeed = function (dist) {
                    var speed = 2.2 * Math.pow(this._size, -0.439);
                    speed = this.owner.customspeed ?
                        speed * 40 * this.owner.customspeed : // Set by command
                        speed * 40 * this.gameServer.config.playerSpeed;
                    return Math.min(dist, speed) / dist;
                };
            }
        }
        if (client == null) return void Logger.warn("That player ID is non-existant!");
            return "Set base speed of " + getName(client._name) + " to " + speed + "";
    },
    merge: function (gameServer, split) {
        // Validation checks
        var id = parseInt(split[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }

        // Find client with same ID as player entered
        for (var i = 0; i < gameServer.clients.length; i++) {
            if (id == gameServer.clients[i].playerTracker.pID) {
                var client = gameServer.clients[i].playerTracker;
                if (!client.cells.length) return "That player is either dead or not playing!";
                if (client.cells.length == 1) return "Client already has one cell!";
                // Set client's merge override
                client.mergeOverride = !client.mergeOverride;
                if (client.mergeOverride) return "" + getName(client._name) + " is now force merging";
                else return "" + getName(client._name) + " isn't force merging anymore";
            }
        }
        if (client == null) return "That player ID is non-existant!";
    },
    rec: function (gameServer, split) {
        var id = parseInt(split[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }

        // set rec for client
        for (var i in gameServer.clients) {
            if (gameServer.clients[i].playerTracker.pID == id) {
                var client = gameServer.clients[i].playerTracker;
                client.rec = !client.rec;
                if (client.rec) return "" + getName(client._name) + " is now in rec mode!";
                else return "" + getName(client._name) + " is no longer in rec mode";
            }
        }
        if (client == null) return "That player ID is non-existant!";
    },
    split: function (gameServer, split) {
        var id = parseInt(split[1]);
        var count = parseInt(split[2]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }
        if (isNaN(count)) {
            return "Split player 4 times";
            count = 4;
        }
        if (count > gameServer.config.playerMaxCells) {
            return "Split player to playerMaxCells";
            count = gameServer.config.playerMaxCells;
        }
        for (var i in gameServer.clients) {
            if (gameServer.clients[i].playerTracker.pID == id) {
                var client = gameServer.clients[i].playerTracker;
                if (!client.cells.length) return "That player is either dead or not playing!";
                for (var i = 0; i < count; i++) {
                    gameServer.splitCells(client);
                }
                return "Forced " + getName(client._name) + " to split " + count + " times";
                break;
            }
        }
        if (client == null) return "That player ID is non-existant!";
    },
    name: function (gameServer, split) {
        // Validation checks
        var id = parseInt(split[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }

        var name = split.slice(2, split.length).join(' ');
        if (typeof name == 'undefined') {
            return "Please type a valid name";
            //return;
        }

        // Change name
        for (var i = 0; i < gameServer.clients.length; i++) {
            var client = gameServer.clients[i].playerTracker;
            if (!client.cells.length) global.name1 = "That player is either dead or not playing!";
            if (client.pID == id) {
                return "Changing " + getName(client._name) + " to " + name + "";
                client.setName(name);
                //return;
            }
        }

        // Error
        return "That player ID (" + id + ") is non-existant!";
    },
    skin: function (gameServer, args) {
        if (!args || args.length < 3) {
            global.skin1 = "Please specify a valid player ID and skin name!";
            return;
        }
        var id = parseInt(args[1]);
        if (isNaN(id)) {
            global.skin1 = "Please specify a valid player ID!";
            return;
        }
        var skin = args[2].trim();
        if (!skin) {
            global.skin1 = "Please specify skin name!";
        }
        var player = playerById(id, gameServer);
        if (!player) {
            global.skin1 = "That player ID (" + id + ") is non-existant!";
            return;
        }
        if (player.cells.length) {
            global.skin1 = "Player is alive, skin will not be applied to existing cells!";
        }
        global.skin1 = "Player \"" + getName(player._name) + "\"'s skin is changed to " + skin + "";
        player.setSkin(skin);
    },
    unban: function (gameServer, split) {
        if (split.length < 2 || !split[1] || split[1].trim().length < 1) {
            return "Please specify a valid IP!";
            //return;
        }
        var ip = split[1].trim();
        var index = gameServer.ipBanList.indexOf(ip);
        if (index < 0) {
            return "IP " + ip + " is not in the ban list!";
            //return;
        }
        gameServer.ipBanList.splice(index, 1);
        saveIpBanList(gameServer);
        return "Unbanned IP: " + ip + "";
    },
    playerlist: function (gameServer, split) {
        if (!gameServer.clients.length) return "No bots or players are currently connected to the server!";
        return "\nCurrent players: " + gameServer.clients.length + "\n" +
        'Do "playerlist m" or "pl m" to list minions\n' +
        " ID     | IP              | P | CELLS | SCORE  |   POSITION   | " + fillChar('NICK', ' ', gameServer.config.playerMaxNickLength) + " \n" +
        fillChar('', '─', ' ID     | IP              | CELLS | SCORE  |   POSITION   |   |  '.length + gameServer.config.playerMaxNickLength);
        global.sockets = gameServer.clients.slice(0);
        sockets.sort(function (a, b) {
            return a.playerTracker.pID - b.playerTracker.pID;
        });
        for (global.i = 0; i < sockets.length; i++) {
            global.socket = sockets[i];
            global.client = socket.playerTracker;
            global.type = split[1];

            // ID with 3 digits length
            global.id = fillChar((client.pID), ' ', 6, true);

            // Get ip (15 digits length)
            global.ip = client.isMi ? "[MINION]" : "[BOT]";
            if (socket.isConnected && !client.isMi) {
                ip = socket.remoteAddress;
            } else if (client.isMi && type != "m") {
                continue; // do not list minions
            }
            ip = fillChar(ip, ' ', 15);

            // Get name and data
            global.protocol = gameServer.clients[i].packetHandler.protocol;
            if (!protocol) protocol = "?";
            global.nick = ''
            global.cells = ''
            global.score = ''
            global.position = ''
            global.data = ''
            if (socket.closeReason != null) {
                // Disconnected
                global.reason = "[DISCONNECTED] ";
                if (socket.closeReason.code)
                    reason += "[" + socket.closeReason.code + "] ";
                if (socket.closeReason.message)
                    reason += socket.closeReason.message;
                return " " + id + " | " + ip + " | " + protocol + " | " + reason;
            } else if (!socket.packetHandler.protocol && socket.isConnected && !client.isMi) {
                return " " + id + " | " + ip + " | " + protocol + " | " + "[CONNECTING]";
            } else if (client.spectate) {
                nick = "in free-roam";
                if (!client.freeRoam) {
                    global.target = client.getSpecTarget();
                    if (target) nick = getName(target._name);
                }
                data = fillChar("SPECTATING: " + nick, '-', ' | CELLS | SCORE  | POSITION    '.length + gameServer.config.playerMaxNickLength, true);
                global.playerlist1 = " " + id + " | " + ip + " | " + protocol + " | " + data;
            } else if (client.cells.length) {
                    nick = fillChar(getName(client._name), ' ', gameServer.config.playerMaxNickLength);
                    cells = fillChar(client.cells.length, ' ', 5, true);
                    score = fillChar(getScore(client) >> 0, ' ', 6, true);
                    position = fillChar(getPos(client).x >> 0, ' ', 5, true) + ', ' + fillChar(getPos(client).y >> 0, ' ', 5, true);
                    Logger.info(" " + id + " | " + ip + " | " + protocol + " | " + cells + " | " + score + " | " + position + " | " + nick);
            } else {
                // No cells = dead player or in-menu
                data = fillChar('DEAD OR NOT PLAYING', '-', ' | CELLS | SCORE  | POSITION    '.length + gameServer.config.playerMaxNickLength, true);
                global.pldead = true;
                return " " + id + " | " + ip + " | " + protocol + " | " + data;
            }
        }
        return;
    },
    pause: function (gameServer, split) {
        gameServer.run = !gameServer.run; // Switches the pause state
        var s = gameServer.run ? "Unpaused" : "Paused";
        return "" + s + " the game.";
    },
    freeze: function (gameServer, split) {
        var id = parseInt(split[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }

        for (var i in gameServer.clients) {
            if (gameServer.clients[i].playerTracker.pID == id) {
                var client = gameServer.clients[i].playerTracker;
                if (!client.cells.length) return "That player is either dead or not playing!";
                // set frozen state
                client.frozen = !client.frozen;
                if (client.frozen) return "Froze " + getName(client._name) + "";
                else return "Unfroze " + getName(client._name) + "";
            }
        }
        if (client == null) return "That player ID is non-existant!";
    },
    reload: function (gameServer, split) {
        gameServer.loadFiles();
        return "Reloaded files successfully";
    },
    status: function (gameServer, split) {
        var ini = require('./ini.js');
        // Get amount of humans/bots
        var humans = 0,
            bots = 0;
        for (var i = 0; i < gameServer.clients.length; i++) {
            if ('_socket' in gameServer.clients[i])
                humans++;
            else
                bots++;
        }

        // Get average score of all players
        var scores = [];
        for (var i in gameServer.clients)
            scores.push(getScore(gameServer.clients[i].playerTracker))
        if (!gameServer.clients.length) scores = [0];

        return "Connected players: " + gameServer.clients.length + "/" + gameServer.config.serverMaxConnections +  "\n" +
        "Players: " + humans + " - Bots: " + bots + "\n" +
        "Average score: " + (scores.reduce(function (x, y) {
            return x + y;
        }) / scores.length).toFixed(2) + "\n" +
        "Server has been running for a total of" + Math.floor(process.uptime() / 60) + " minutes\n" +
        "Current memory usage: " + Math.round(process.memoryUsage().heapUsed / 1048576 * 10) / 10 + "/" + Math.round(process.memoryUsage().heapTotal / 1048576 * 10) / 10 + " mb\n" + 
        "Current game mode: " + gameServer.gameMode.name + "\n" +
        "Current update time: " + gameServer.updateTimeAvg.toFixed(3) + " [ms]  (" + ini.getLagMessage(gameServer.updateTimeAvg) + ")";
    },
    tp: function (gameServer, split) {
        var id = parseInt(split[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }

        // Make sure the input values are numbers
        var pos = {
            x: parseInt(split[2]),
            y: parseInt(split[3])
        };
        if (isNaN(pos.x) || isNaN(pos.y)) {
            return "Invalid coordinates";
            //return;
        }

        // Spawn
        for (var i in gameServer.clients) {
            if (gameServer.clients[i].playerTracker.pID == id) {
                var client = gameServer.clients[i].playerTracker;
                if (!client.cells.length) return "That player is either dead or not playing!";
                for (var j in client.cells) {
                    client.cells[j].position.x = pos.x;
                    client.cells[j].position.y = pos.y;
                    gameServer.updateNodeQuad(client.cells[j]);
                }
                return "Teleported " + getName(client._name) + " to (" + pos.x + " , " + pos.y + ")";
                break;
            }
        }
        if (client == null) return "That player ID is non-existant!";
    },
    spawn: function (gameServer, split) {
        var ent = split[1];
        if (ent != "virus" && ent != "food" && ent != "mothercell") {
            return "Please specify either virus, food, or mothercell";
            //return;
        }

        var pos = {
            x: parseInt(split[2]),
            y: parseInt(split[3])
        };
        var mass = parseInt(split[4]);

        // Make sure the input values are numbers
        if (isNaN(pos.x) || isNaN(pos.y)) {
            return "Invalid coordinates";
            //return;
        }

        // Start size for each entity
        if (ent == "virus") {
            var size = gameServer.config.virusMinSize;
        } else if (ent == "mothercell") {
            size = gameServer.config.virusMinSize * 2.5;
        } else if (ent == "food") {
            size = gameServer.config.foodMinMass;
        }

        if (!isNaN(mass)) {
            size = Math.sqrt(mass * 100);
        }

        // Spawn for each entity
        if (ent == "virus") {
            var virus = new Entity.Virus(gameServer, null, pos, size);
            gameServer.addNode(virus);
            return "Spawned 1 virus at (" + pos.x + " , " + pos.y + ")";
        } else if (ent == "food") {
            var food = new Entity.Food(gameServer, null, pos, size);
            food.color = gameServer.getRandomColor();
            gameServer.addNode(food);
            return "Spawned 1 food cell at (" + pos.x + " , " + pos.y + ")";
        } else if (ent == "mothercell") {
            var mother = new Entity.MotherCell(gameServer, null, pos, size);
            gameServer.addNode(mother);
            return "Spawned 1 mothercell at (" + pos.x + " , " + pos.y + ")";
        }
    },
    replace: function (gameServer, split) {
        var id = parseInt(split[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }
        var ent = split[2];
        if (ent != "virus" && ent != "food" && ent != "mothercell") {
            return "Please specify either virus, food, or mothercell";
            //return;
        }
        for (var i in gameServer.clients) {
            if (gameServer.clients[i].playerTracker.pID == id) {
                var client = gameServer.clients[i].playerTracker;
                if (!client.cells.length)return "That player is either dead or not playing!";
                while (client.cells.length > 0) {
                    var cell = client.cells[0];
                    gameServer.removeNode(cell);
                    // replace player with entity
                    if (ent == "virus") {
                        var virus = new Entity.Virus(gameServer, null, cell.position, cell._size);
                        gameServer.addNode(virus);
                    } else if (ent == "food") {
                        var food = new Entity.Food(gameServer, null, cell.position, cell._size);
                        food.color = gameServer.getRandomColor();
                        gameServer.addNode(food);
                    } else if (ent == "mothercell") {
                        var mother = new Entity.MotherCell(gameServer, null, cell.position, cell._size);
                        gameServer.addNode(mother);
                    }
                }
            }
        }
        if (ent == "virus") {
            return "Replaced " + getName(client._name) + " with a virus";
        } else if (ent == "food") {
            return "Replaced " + getName(client._name) + " with a food cell";
        } else if (ent == "mothercell") {
            return "Replaced " + getName(client._name) + " with a mothercell";
        }
        if (client == null) return "That player ID is non-existant!";
    },
    pop: function (gameServer, split) {
        var id = parseInt(split[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }
        for (var i in gameServer.clients) {
            if (gameServer.clients[i].playerTracker.pID == id) {
                var client = gameServer.clients[i].playerTracker;
                if (!client.cells.length) global.pop1 = "That player is either dead or not playing!";
                var virus = new Entity.Virus(gameServer, null, client.centerPos, gameServer.config.virusMinSize);
                gameServer.addNode(virus);
                return "Popped " + getName(client._name) + "";
            }
        }
        if (client == null) return "That player ID is non-existant!";
    },
    explode: function (gameServer, split) {
        var id = parseInt(split[1]);
        if (isNaN(id)) {
            return "Please specify a valid player ID!";
            //return;
        }
        for (var i in gameServer.clients) {
            if (gameServer.clients[i].playerTracker.pID == id) {
                var client = gameServer.clients[i].playerTracker;
                for (var i = 0; i < client.cells.length; i++) {
                    var cell = client.cells[i];
                    while (cell._size > gameServer.config.playerMinSize) {
                        // remove mass from parent cell
                        var angle = 6.28 * Math.random();
                        var loss = gameServer.config.ejectSizeLoss;
                        var size = cell.radius - loss * loss;
                        cell.setSize(Math.sqrt(size));
                        // explode the cell
                        var pos = {
                            x: cell.position.x + angle,
                            y: cell.position.y + angle
                        };
                        var ejected = new Entity.EjectedMass(gameServer, null, pos, gameServer.config.ejectSize);
                        ejected.color = cell.color;
                        ejected.setBoost(gameServer.config.ejectVelocity * Math.random(), angle);
                        gameServer.addNode(ejected);
                    }
                    cell.setSize(gameServer.config.playerMinSize);
                }
                if (!client.cells.length) return "That player is either dead or not playing!";
                return "Successfully exploded " + getName(client._name) + "";
            }
        }
        if (client == null) return "That player ID is non-existant!";
    },
    lms: function (gameServer, split) {
        gameServer.disableSpawn = !gameServer.disableSpawn;
        var s = gameServer.disableSpawn ? "Started" : "Ended";
        return "" + s + " last man standing";
    },
    calc: function (gameServer, split) {
        var num = parseInt(split[1]);
        if (isNaN(num)) {
            return "Please specify a valid number!";
            //return;
        }
        var to = split[2];
        if (to != "toMass" && to != "toSize") {
            return 'Please specify either "toMass" or "toSize"';
            //return;
        }
        if (to == "toMass") return "The specified size is " + num * num / 100 + " in mass";
        else return "The specified mass is " + (Math.sqrt(num * 100)).toFixed(2) + " in size";
    },

    // Aliases for commands

    st: function (gameServer, split) { // Status
        return Commands.list.status(gameServer, split);
    },
    pl: function (gameServer, split) { // Playerlist
        return Commands.list.playerlist(gameServer, split);
    },
    m: function (gameServer, split) { // Mass
        return Commands.list.mass(gameServer, split);
    },
    mn: function (gameServer, split) { // Minion
        return Commands.list.minion(gameServer, split);
    },
    sm: function (gameServer, split) { // Spawnmass
        return Commands.list.spawnmass(gameServer, split);
    },
    ka: function (gameServer, split) { // Killall
        return Commands.list.killall(gameServer, split);
    },
    k: function (gameServer, split) { // Kill
        return Commands.list.kill(gameServer, split);
    },
    mg: function (gameServer, split) { // Merge
        return Commands.list.merge(gameServer, split);
    },
    s: function (gameServer, split) { // Speed
        return Commands.list.speed(gameServer, split);
    },
    f: function (gameServer, split) { // Freeze
        return Commands.list.freeze(gameServer, split);
    },
    ab: function (gameServer, split) { // Addbot
        return Commands.list.addbot(gameServer, split);
    },
    kb: function (gameServer, split) { // Kickbot
        return Commands.list.kickbot(gameServer, split);
    },
    c: function (gameServer, split) { // Change
        return Commands.list.change(gameServer, split);
    },
    n: function (gameServer, split) { // Name
        return Commands.list.name(gameServer, split);
    },
    rep: function (gameServer, split) {
        return Commands.list.replace(gameServer, split);
    },
    e: function (gameServer, split) {
        return Commands.list.explode(gameServer, split);
    }
};

// functions from GameServer

function playerById(id, gameServer) {
    if (!id) return null;
    for (var i = 0; i < gameServer.clients.length; i++) {
        var playerTracker = gameServer.clients[i].playerTracker;
        if (playerTracker.pID == id) {
            return playerTracker;
        }
    }
    return null;
}

function saveIpBanList(gameServer) {
    var fs = require("fs");
    try {
        var blFile = fs.createWriteStream('../src/ipbanlist.txt');
        // Sort the blacklist and write.
        gameServer.ipBanList.sort().forEach(function (v) {
            blFile.write(v + '\n');
        });
        blFile.end();
        Logger.info(gameServer.ipBanList.length + " IP ban records saved.");
    } catch (err) {
        Logger.error(err.stack);
        Logger.error("Failed to save " + '../src/ipbanlist.txt' + ": " + err.message);
    }
}

function ban(gameServer, split, ip) {
    var ipBin = ip.split('.');
    if (ipBin.length != 4) {
        Logger.warn("Invalid IP format: " + ip);
        return;
    }
    gameServer.ipBanList.push(ip);
    if (ipBin[2] == "*" || ipBin[3] == "*") {
        Logger.print("The IP sub-net " + ip + " has been banned");
    } else {
        Logger.print("The IP " + ip + " has been banned");
    }
    gameServer.clients.forEach(function (socket) {
        // If already disconnected or the ip does not match
        if (!socket || !socket.isConnected || !gameServer.checkIpBan(ip) || socket.remoteAddress != ip)
            return;
        // remove player cells
        Commands.list.kill(gameServer, split);
        // disconnect
        socket.close(null, "Banned from server");
        var name = getName(socket.playerTracker._name);
        Logger.print("Banned: \"" + name + "\" with Player ID " + socket.playerTracker.pID);
        gameServer.sendChatMessage(null, null, "Banned \"" + name + "\""); // notify to don't confuse with server bug
    }, gameServer);
    saveIpBanList(gameServer);
}
// functions from PlayerTracker

function getName(name) {
    if (!name.length)
        name = "An unnamed cell";
    return name.trim();
}

function getScore(client) {
    var score = 0; // reset to not cause bugs
    for (var i = 0; i < client.cells.length; i++) {
        if (!client.cells[i]) continue;
        score += client.cells[i]._mass;
    }
    return score;
};

function getPos(client) {
    for (var i = 0; i < client.cells.length; i++) {
        if (!client.cells[i]) continue;
        return {
            x: client.cells[i].position.x / client.cells.length,
            y: client.cells[i].position.y / client.cells.length
        }
    }
}

// functions from QuadNode

function scanNodeCount(quad) {
    var count = 0;
    for (var i = 0; i < quad.childNodes.length; i++) {
        count += scanNodeCount(quad.childNodes[i]);
    }
    return 1 + count;
};

function scanItemCount(quad) {
    var count = 0;
    for (var i = 0; i < quad.childNodes.length; i++) {
        count += scanItemCount(quad.childNodes[i]);
    }
    return quad.items.length + count;
};
