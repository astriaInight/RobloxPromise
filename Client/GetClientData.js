// Client.GetClientData()
// returns: <Promise>
/* resolves: <object>
{
    <int> gender,
    <string> description,
    <object> birthdate {
        <int> birthMonth,
        <int> birthDay,
        <int> birthYear
    },
    <string> phone,
    <object> socialmedia {
        <string> promotionChannelsVisibilityPrivacy,
        <string> facebook,
        <string> twitter,
        <string> youtube,
        <string> twitch,
        <string> guilded
    }
}
*/

const axios = require("axios");

module.exports = function() {
    return new Promise(async (resolve, reject) => {
        let userInfo = {
            gender: null,
            description: null,
            birthdate: null,
            phone: null,
            socialmedia: null,
            hasConnectedXboxAccount: null
        };

        // Gather info
        await axios.get("https://accountinformation.roblox.com/v1/gender", this.reqOptions)
            .then(res => {
                userInfo.gender = res.data.gender;
            })
            .catch(err => {
                reject(err);
            });

        await axios.get("https://accountinformation.roblox.com/v1/description", this.reqOptions)
            .then(res => {
                userInfo.description = res.data.description;
            })
            .catch(err => {
                reject(err);
            });

        await axios.get("https://accountinformation.roblox.com/v1/birthdate", this.reqOptions)
            .then(res => {
                userInfo.birthdate = res.data;
            })
            .catch(err => {
                reject(err);
            });

        await axios.get("https://accountinformation.roblox.com/v1/phone", this.reqOptions)
            .then(res => {
                userInfo.phone = res.data.phone;
            })
            .catch(err => {
                reject(err);
            });

        await axios.get("https://accountinformation.roblox.com/v1/promotion-channels", this.reqOptions)
            .then(res => {
                userInfo.socialmedia = res.data;
            })
            .catch(err => {
                reject(err);
            });

        await axios.get("https://auth.roblox.com/v1/xbox/connection", this.reqOptions)
            .then(res => {
                userInfo.hasConnectedXboxAccount = res.data.hasConnectedXboxAccount;
            })
            .catch(err => {
                reject(err);
            });

        // Return data
        resolve(userInfo);
    });
};