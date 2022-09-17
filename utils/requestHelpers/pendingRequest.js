const Request = require("../../models/Request");

/**
 * @param {{username: String, id: String}} recipiantObj 
 * @param {Number} requestType 
 * @returns {Promise<Array<{username: String, id: String}>>} duelRequests
 * @throws error if no pending request
 */

async function getPendingRequests(recipientObj, requestType) {
    try {
        const requestArr = await Request.find({
            recipient: {
                username: recipientObj.username,
                id: recipientObj.id,
            },
            status: requestType
        });
        if(!requestArr) throw new Error("No requests.");

        return requestArr;
    }
    catch(e) {
        throw Error(e);
    }
}

module.exports = getPendingRequests;