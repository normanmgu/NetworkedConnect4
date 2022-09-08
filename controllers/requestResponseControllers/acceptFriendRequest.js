const Request = require("../../models/Request");
const User = require("../../models/User");

module.exports = async (req, res) =>{
    const currentUserId = req.user.id;
    const requesterId = req.body.id;

    let userExists;
    //ERROR CHECKING
    // if requester does not exist
    userExists = await User.findById(requesterId);
    if(!userExists) throw Error(`User ${requesterId} does not exist`);
    try {
        //First the request must be deleted
        Request.findOneAndDelete({
            recipient: {
                username: req.user.username,
                id: currentUserId
            },
            requester: {
                username: userExists.username,
                id: requesterId
            },
            status: 0
        }, (err, request) =>{

            if(err) console.log(err);
            if(request) console.log(request);
        })

        // if user already has the friend
        req.user.friends.forEach((friend) =>{
            if(friend.id === requesterId) {
                throw Error(`Duplicate friend ${requesterId}`);
            }
        })

        // Add friend to current session user
        User.findByIdAndUpdate(currentUserId,{$push: {friends: {username: userExists.username, id: requesterId}}},
            (err, user) =>{
            if(err) console.log(err);
            if(user) console.log(user);
        });

        // Add Friend to requester
        User.findByIdAndUpdate(requesterId,{$push: {friends: {username: req.user.username, id: currentUserId}}},
            (err,user) =>{
            if(err) console.log(err);
            if(user) console.log(user);
        })
        return res.redirect("/pendingRequest");

    }
    catch(e){
        console.log(e)
        return res.redirect("/pendingRequest");
    }
}
