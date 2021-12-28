/*
new Fleet(<array> cookies [
    <string> cookie     <- any amount of cookies
])
*/

// Fleet represents a large group of logged-in clients

const { EventEmitter } = require("events");
const Client = require("../Client/Client");

class Fleet extends EventEmitter {
    // Functions
    forEach = require("./forEach");

    // Constructor
    constructor(cookies) {
        // TRASH!!!!
        // MAKE THIS A PROMISE YOU FUCKIGN IDIOT
        super(); // Required for extended class

        if (!cookies) throw new TypeError("Argument 1, cookies, not provided.");

        let readyClients = [];

        for (cookie of cookies) {
            // Ignore empty lines
            if (cookie === "") continue;

            const account = new Client(cookie);

            account.on("ready", function() {
                readyClients.push(account);
            });
        };

        this.clients = readyClients;
        this.emit("ready");
    };
};

module.exports = Fleet;