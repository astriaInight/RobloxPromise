// new Client(<string> cookie)
// returns: <Client>

const { EventEmitter } = require("events");
const os = require("os");

class Client extends EventEmitter {
    constructor(cookie) {
        super(); // Required for extended class

        if (!cookie) {
            throw new TypeError("Argument 1, Cookie, not provided.");
        };
    
        // Client vars
        this.cookie = cookie;
        this.token = null;
        this.isReady = false;
        this.startTime = os.uptime();

        // Client funcs
        this.ModelLink = require("./Client/ModelLink");
        this.GetToken = require("./Client/GetToken");
        this.IsCookieValid = require("./Client/IsCookieValid");
        this.VerifyCredentials = require("./Client/VerifyCredentials");
        this.OnReady = require("./Client/OnReady");
        this.GetClientData = require("./Client/GetClientData");
        this.GetUptime = require("./Client/GetUptime");
    
        // Auto check cookie & generate token
        this.VerifyCredentials()
            .then(() => {
                this.emit("ready");
                this.isReady = true;
            })
            .catch(err => {
                throw new Error(err);
            });
    }
}

module.exports = Client;