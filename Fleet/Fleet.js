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
    OnReady = require("./OnReady");

    // Constructor
    constructor(cookies) {
        // TRASH!!!!
        // MAKE THIS A PROMISE YOU FUCKIGN IDIOT
        super(); // Required for extended class

        if (!cookies) throw new TypeError("Argument 1, cookies, not provided.");

        // Create & run unnamed async function
        // So we can use await to wait for each client
        (async function() {
            let readyClients = [];

            for (cookie of cookies) {
                // Ignore empty lines
                if (cookie === "") continue;

                const account = new Client(cookie);

                // 1) Wait for login
                await account.OnReady();
                
                // 2) Add it to the list
                readyClients.push(account);
            };

            this.clients = readyClients;
            this.emit("ready");
        })()
        
    };
};

module.exports = Fleet;