/*
    Client.BotSales(<int> assetId, <object> options {
        <int> amount,
        <int> delay (ms)        <- optional, default: 5000
        <bool> useProxyPool     <- optional, default: false
    }, <function> callback (optional))
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

const rand = require("../Random");
const errors = require("./Errors");

function sleep(t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, t);
    });
};  

module.exports = function(assetId, options, callback) {
    return new Promise(async(resolve, reject) => { 
        if (!assetId) reject("Argument 1, assetId, not provided.");
        if (!options.amount) reject("Argument options.amount, not provided.");

        const delay = options.delay || 5000;
        const amount = options.amount;
        const useProxyPool = options.useProxyPool;

        if ((!useProxyPool) && (useProxyPool != false)) {
            useProxyPool = true;
        };
        
        let purchases = 0;
        
        for (let i = 0; i < amount; i++) {
            // Give the client a random proxy, but only if one exists
            if (useProxyPool && this.proxyPool) {
                this.reqOptions["proxy"] = this.RandomProxy();
                console.log(this.reqOptions["proxy"]);
            };

            // Buy & "un-buy"
            // This is rlly weird code
            try {
                await this.BuyModel(assetId)
                    .catch(err => {
                        // Warn, don't error
                        console.log(errors.RATELIMITED);

                        // Allow the next catch to happen
                        throw new Error(err);
                    });
            } catch(err) {
                // Continue bc you can't remove it from the inventory if it isn't there
                // I did it here bc you can't continue in a promise's catch block
                // - it's its own function, unlike a normal try/catch statement
                continue;
            };

            await sleep(delay);

            // "Un-buy"
            await this.RemoveFromInventory(assetId)
                .catch(err => {
                    // Warn, don't error
                    console.log(errors.RATELIMITED);
                });
                
            await sleep(delay);

            // Run the callback function if it exists
            if (callback) callback();

            purchases++;
        };

        resolve(purchases);
    });
};