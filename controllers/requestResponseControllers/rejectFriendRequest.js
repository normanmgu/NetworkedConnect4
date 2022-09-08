const Request = require("../../models/Request");
const User = require("../../models/User");

module.exports = async (req, res) =>{
    const currentUserId = req.user.id
    const requesterId = req.body.id

    let userExists;
    //ERROR CHECKING
    // if requester does not exist
    userExists = await User.findById(requesterId);
    if(!userExists) throw Error(`User ${requesterId} does not exist`);
    // Delete request
    let request;
    try{
        request = await Request.findOneAndDelete({
            recipient: {
                username: req.user.username,
                id: currentUserId
            },
            requester: {
                username: userExists.username,
                id: requesterId
            },
            status: 0,
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
