/*
    Client.BotSales(<object> options {
        <int> assetId,
        <int> amount,
        <int> delay,            <- optional, default: 700
        <function> callback     <- optional
    })
*/
// returns: <Promise>
// resolves: <int> purchases

// Buys and removes an asset from the client's inventory.
// Amount determines the goal amount of sales.
// Delay determines how long it waits before purchasing again.
/*
    The callback function is run every time (after) a model is successfully
    purchased and removed from the client's inventory
*/

function sleep(t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, t);
    });
};

module.exports = function(assetId, amount, delay, callback) {
    return new Promise(async(resolve, reject) => {
        if (!assetId) reject("Argument 1, assetId, not provided.");
        if (!amount) reject("Argument 2, amount, not provided.");

        let purchases = 0;
        
        for (let i = 0; i < amount; i++) {
            try {
                await this.BuyModel(assetId);
                await sleep(delay);
                await this.RemoveFromInventory(assetId);
                await sleep(delay);

                if (callback) callback();

                purchases++;
            } catch(err) {
                console.log(`Error botting asset: ${err}`);
            };
        };

        resolve(purchases);
    });
};