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
    }
