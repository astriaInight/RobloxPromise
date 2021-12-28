// Client.BuyModel(<int> assetId)
// returns: <Promise>
// resolves: <bool> success

const axios = require("axios");

module.exports = function(assetId) {
    return new Promise(async(resolve, reject) => {
        if (!assetId) reject("Argument 1, assetId, not provided.");

        // Get product info
        this.GetProductInfo(assetId)
            .then(product => {
                // Buy
                axios.post(
                    `https://economy.roblox.com/v1/purchases/products/${product.ProductId}`,
                    // Replace with product info
                    {
                        "expectedCurrency": 1, // 1 = bobux
                        "expectedPrice": product.PriceInRobux || 0,
                        "expectedSellerId": product.Creator.Id
                    },
                    this.reqOptions
                )
                .then(res => {
                    resolve(true);
                })
                .catch(err => {
                    reject(err);
                })
            })
            .catch(err => {
                reject(err)
            });
    });
};