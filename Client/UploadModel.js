/*
Client.UploadModel(<string> modelData, <object> modelOptions {
    <string> name,
    <string> description,   <- optional, default = ''
    <bool> onSale,
    <bool> allowComments,   <- optional, default = true
    <int> groupId           <- optional, default = ''
}, <int> assetid)           <- optional, default = 0
*/
// returns: <Promise>
// resolves: <string> modelUrl

const axios = require("axios");

module.exports = function(modelData, modelOptions, assetid) {
    return new Promise((resolve, reject) => {
        if (!modelData) reject("Argument 1, modelData, not provided.");
        if (!modelOptions) reject("Argument 2, modelOptions, not provided.");
        if (!modelOptions.name) reject("modelOptions.name not provided.");
        if (!modelOptions.onSale) reject("modelOptions.onSale not provided.");

        const headers = {
            "Cookie": `.ROBLOSECURITY=${this.cookie}`,
            "x-csrf-token": this.token,
            "Content-Type": 'application/xml'
        };

        const onSale = modelOptions.onSale;
        const allowComments = (modelOptions.allowComments || true);

        const uploadUrl = 'https://data.roblox.com/Data/Upload.ashx?json=1&assetid=' + (assetid || 0)
            + '&type=Model&genreTypeId=1&name='
            + modelOptions.name

            + '&description='
            + (modelOptions.description || '')

            +'&ispublic='
            + (onSale != null ? onSale : true)

            + '&allowComments='
            + (allowComments != null ? allowComments : true)

            + '&groupId='
            + (modelOptions.groupId || '');

        axios.post(uploadUrl, modelData, {headers: headers})
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(`Error uploading model: ${err}`);
            });
    });
};