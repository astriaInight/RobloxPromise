// Fleet.forEach(<function> callback(client))

// Does something for every client in the fleet

module.exports = function(callback) {
    const clients = this.clients;

    for (client of clients) {
        callback(client);
    };
};