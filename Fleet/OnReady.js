// Fleet.OnReady()
// returns: <Promise>
// resolves: <bool> ready

module.exports = function() {
    return new Promise((resolve, reject) => {
        this.on("ready", function() {
            resolve(true);
        });
    });
};