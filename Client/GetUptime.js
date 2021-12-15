// Client.GetUptime()
// returns: <int> uptimeSeconds

const os = require("os");

module.exports = function() {
    return os.uptime() - this.startTime;
};