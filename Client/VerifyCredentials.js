// Client.VerifyCredentials()
// returns: <Promise>
// resolves: <bool> success

module.exports = function() {
    return new Promise(async (resolve, reject) => {
        await this.IsCookieValid()
            .then(cookieValid => {
                if (!cookieValid) {
                    reject("Client initialized with invalid or expired cookie.");
                };
            })
            .catch(err => {
                reject(`Error validating cookie: ${err}`);
            });

        await this.GetToken()
            .then(newToken => {
                this.token = newToken;
            })
            .catch(err => {
                reject(`Error getting token: ${err}`);
            });

        resolve(true);
    });
};