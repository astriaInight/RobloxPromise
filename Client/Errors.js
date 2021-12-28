// Main error handler

// Config
const errors = {
    RATELIMITED: "RATELIMITED: Request ratelimited, try increasing delay between requests or using more proxies.",
    UNAUTHORIZED: "UNAUTHORIZED: Please make sure you are using a valid cookie.",
    BAD_REQUEST: "BAD_REQUEST: Bad or incorrect data provided in request."
};

// Module
module.exports = errors;