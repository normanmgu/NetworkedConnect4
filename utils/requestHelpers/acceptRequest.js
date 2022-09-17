const Request = require("../../models/Request");

/**
 * @param {{username: String, id: String}} recipientObj 
 * @param {{username: String, id: String}} requesterObj 
 * @param {Number} requestType Set to 0 to indicate a Friend Request. Set to 1 to indicate Duel Request. Set 3 for an accepted Duel Request
 * @return Returns Boolean. If true, request has been succesfully deleted
 * @throws Throws error message if request fails to be created
 */
async function acceptRequest(recipientObj, requesterObj, requestType) {

    Request.findOneAndDelete({
        requester: {
            username: requesterObj.username,
            id: requesterObj.id
        },
        recipient: {
            username: recipientObj.username,
            id: recipientObj.id
        },
        status: requestType
    },(err, docs) =>{
        if(err) {
            console.log(err)
            return false;
        }
        else {
            console.log(
                "Deleted user: " + docs
            );
            return true;
        }
    })
}
module.exports = acceptRequest;