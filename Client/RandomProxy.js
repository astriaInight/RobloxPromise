// Client.RandomProxy()
// Returns a random proxy from this.proxyPool

const rand = require("../Random");

module.exports = function() {
    if (!this.proxyPool) throw new Error("Error choosing proxy: No proxy pool imported.");

    return rand.choose(this.proxyPool);
};