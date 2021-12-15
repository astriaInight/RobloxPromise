// Client.GetToken()
// returns: <Promise>
// resolves: <string> token

const axios = require("axios");

module.exports = function() {
    return new Promise((resolve, reject) => {
        axios.post("https://auth.roblox.com/v2/logout", {}, {
            headers: {
                Cookie: `.ROBLOSECURITY=${this.cookie}`
            }})
            .then(res => {
                const token = res.headers["x-csrf-token"];

                if (!token) {
                    reject("Can't find token in headers.");
                } else {
                    resolve(token);
                };
            })
            .catch(err => {
                const res = err.response;
                const token = res.headers["x-csrf-token"];

                if (!token) {
                    reject(err);
                } else {
                    resolve(token);
                };
            });
    });
};