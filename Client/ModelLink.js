// new Client.ModelLink(<int> assetid)
// returns: <ModelLink>

module.exports = function(assetid) {
    if (!assetid) {
        throw new TypeError("Argument 1, assetid, not provided.");
    };

    this.assetid = assetid;

    this.Update = require("../ModelLink/Update");
};