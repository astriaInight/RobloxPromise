// Client.GetUsername()
// returns: <Promise>
// resolves: <string> username

const axios = require("axios");

module.exports = function() {
    return new Promise((resolve, reject) => {
        axios.get("https://users.roblox.com/v1/users/authenticated")
            .then(res => {
                resolve(res.data.name);
            })
            .catch(err => {
                reject(err);
            });
    });
};