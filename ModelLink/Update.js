const axios = require("axios");

module.exports = function() {
    if (!this.assetid) {
        throw new TypeError("ModelLink is missing assetid.");
    };

    axios.get()
};