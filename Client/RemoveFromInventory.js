// Client.RemoveFromInventory(<int> assetId)
// returns: <Promise>
// resolves: <bool> success

// Removes a specified asset from the client's inventory

const axios = require("axios");

module.exports = function(assetId) {
    return new Promise((resolve, reject) => {
        if (!assetId) reject("Argument 1, assetId, not provided.");

        // Set required content type
        let newReqOptions = this.reqOptions;
        newReqOptions["content-type"] = "application/x-www-form-urlencoded; charset=UTF-8";

        // Delete asset from inventory
        axios.post(
            "https://www.roblox.com/asset/delete-from-inventory",
            `assetId=${assetId}`,
            newReqOptions
        )
        .then(res => {
            resolve(true);
        })
        .catch(err => {
            reject(`Error removing asset ${assetId} from inventory: ${err}`);
        });
    });
};