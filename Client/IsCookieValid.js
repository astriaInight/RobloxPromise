// Client.IsCookieValid()
// returns: <Promise>
// resolves: <bool> cookieValid

const axios = require("axios");

module.exports = function() {
    return new Promise((resolve, reject) => {
        axios.post("https://auth.roblox.com/v2/logout", {}, {
            headers: {
                Cookie: `.ROBLOSECURITY=${this.cookie}`
            }})
            .then(res => {
                resolve(true);
            })
            .catch(err => {
                const res = err.response;
                
                if (res.status === 401) {
                    resolve(false);
                } else if (res.status === 403) {
                    resolve(true);
                } else {
                    reject(err);
                };
            });
    });
};