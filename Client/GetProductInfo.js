// Client.GetProductInfo(<int> assetId)
// returns: <Promise>
// resolves: <bool> success

const axios = require("axios");

module.exports = function(assetId) {
    return new Promise((resolve, reject) => {
        if (!assetId) reject("Argument 1, assetId, not provided.");

        axios.get(`https://api.roblox.com/marketplace/productinfo?assetId=${assetId}`)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(`Error getting product info for ${assetId}: ${err}`);
            }); 
    });
};