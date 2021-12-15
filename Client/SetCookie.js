// Client.SetCookie(<string> cookie)
// returns: null

module.exports = function(cookie) {
    if (!cookie) {
        throw new TypeError("Argument 1, cookie, not provided.");
    };

    this.cookie = cookie;
};