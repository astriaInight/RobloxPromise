// Client.VerifyCredentials()
// returns: <Promise>
// resolves: <bool> success

/*
    1) Checks if the client's cookie is valid
    2) Tries to get a cross-reference token for the client
        Success = Set the token header in this.reqOptions.headers
        Error   = Throw an error
*/

module.exports = function() {
    return new Promise(async (resolve, reject) => {
        // Validate cookie
        await this.IsCookieValid()
            .then(cookieValid => {
                if (!cookieValid) {
                    reject("Client initialized with invalid or expired cookie.");
                };
            })
            .catch(err => {
                reject(`Error validating cookie: ${err}`);
            });

        // Try to get token
        await this.GetToken()
            .then(newToken => {
                // Set the token header
                this.reqOptions.headers["x-csrf-token"] = newToken;
            })
            .catch(err => {
                reject(`Error getting token: ${err}`);
            });

        // Resolve with true (success)
        resolve(true);
    });
};