// Client.ParseProxy(<string> proxyStr)
// returns: <proxyObj>

// Converts a proxy string to an axios-compatible proxy object

module.exports = function(proxyStr) {
    if (!proxyStr) throw new TypeError("Argument 1, proxyStr, not provided.");

    const match = proxyStr.match(/(\d+\.\d+\.\d\.\d+):(\d+)/);
    
    if (!match) throw new TypeError(`Can't parse proxy '${proxyStr}'`);

    const proxyObj = {
        host: match[1],
        port: match[2] || null
    };

    return proxyObj;
};