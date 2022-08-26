const FriendRequest = require("../../models/FriendRequest");

module.exports = async (req, res) =>{
    const currentUserId = req.user.id
    const requesterId = req.body.id
    // Delete request
    let request;
    try{
        request = await FriendRequest.findOneAndDelete({
            recipient: currentUserId,
            requester: requesterId,
        });
        if(!request) {
            console.log("successfully deleted")
        }
        else {
            throw Error("Request was unable to delete")
        }
    }
    catch(e) {
        console.log(e);
    }

    res.redirect("/pendingRequest");
}
