// new Client(<string> cookie)
// returns: <Client>

// A class representing a logged-in Roblox account.
// It contains various functions and properties.

const { EventEmitter } = require("events");
const os = require("os");

class Client extends EventEmitter {
    // Client functions
    GetToken            = require("./GetToken");
    IsCookieValid       = require("./IsCookieValid");
    VerifyCredentials   = require("./VerifyCredentials");
    OnReady             = require("./OnReady");
    GetClientData       = require("./GetClientData");
    GetUptime           = require("./GetUptime");
    UploadModel         = require("./UploadModel");
    GetProductInfo      = require("./GetProductInfo");
    BuyModel            = require("./BuyModel");
    RemoveFromInventory = require("./RemoveFromInventory");
    BotSales            = require("./BotSales");
    ParseProxy          = require("./ParseProxy");
    SetProxyPool        = require("./SetProxyPool");
    ImportProxies       = require("./ImportProxies");
    RandomProxy         = require("./RandomProxy");
    GetUsername         = require("./GetUsername");

    // Constructor
    constructor(cookie) {
        super(); // Required for extended class

        if (!cookie) {
            throw new TypeError("Argument 1, Cookie, not provided.");
        };
    
        // Client vars
        this.isReady = false;
        this.startTime = os.uptime();

        // Generate the options to be used for web requests
        // Token will be set later (this.VerifyCredentials())
        this.reqOptions = {
            headers: {
                "Cookie": `.ROBLOSECURITY=${cookie}`,
                "x-csrf-token": null
            }
        };
    
        // Auto check cookie & get token
        this.VerifyCredentials()
            .then(() => {
                // Tell everything that the client is ready
                this.emit("ready");
                // This property isn't really used for anything yet
                this.isReady = true;
            })
            .catch(err => {
                // An error occurred while verifying the cookie or token
                throw new Error(err);
            });
    }
}

module.exports = Client;