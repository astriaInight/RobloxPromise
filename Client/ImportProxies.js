// Client.ImportProxies(<filestream> proxyFile)

// Similar to Client.SetProxyPool()
// Does the same thing, but directly imports the proxies from a file instead
// Returns the same thing as Client.SetProxyPool()

module.exports = function(fileStream) {
    // Allows string methods to be used on the file stream
    const fileContent = fileStream.toString();

    let proxies = [];

    for (proxyStr of fileContent.split("\n")) {
        // Exclude any "accidental" or empty lines
        // I just felt like adding this.
        if (proxyStr === "" || proxyStr === " ") continue;

        proxies.push(proxyStr);
    };

    return this.SetProxyPool(proxies);
};