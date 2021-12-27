/*
    Client.SetProxyPool(<array> proxies [
        "127.0.0.1:3000",   <- any proxy IPs, any amount of proxy strings
        ...
    ])
*/
// returns: <array> parsedProxies

// Gives the client a list of proxies to randomly choose from whenever needed.
// Proxies are used to prevent ratelimiting.
// You don't need to do anything with the returned array unless you want to.
// Saves parsed proxies to this.proxyPool

module.exports = function(proxies) {
    if (!proxies) throw new TypeError("Argument 1, proxies, not provided.");

    let parsedProxies = [];

    for (proxyStr of proxies) {
        parsedProxies.push(this.ParseProxy(proxyStr));
    };

    this.proxyPool = parsedProxies;
    return parsedProxies;
};