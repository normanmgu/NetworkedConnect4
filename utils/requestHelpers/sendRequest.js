    const Request = require("../../models/Request");

    /**
     * @param {{username: String, id: String}} recipientObj 
     * @param {{username: String, id: String}} requesterObj 
     * @param {Number} requestType Set to 0 to indicate a Friend Request. Set to 1 to indicate Duel Request
     * @return Returns request object
     * @throws Throws error message if user is not found
     */
    async function sendRequest(recipientObj, requesterObj, requestType) {
        try{
            const request = await Request.create({
                requester: {
                    username: requesterObj.username,
                    id: requesterObj.id
                },
                recipient: {
                    username: recipientObj.username,
                    id: recipientObj.id
                },
                status: requestType
            })

            if(!request) throw new Error("Failed to create request.");

            return request;
        }
        catch(err) {
            throw err;
        }
    }

    module.exports = sendRequest;