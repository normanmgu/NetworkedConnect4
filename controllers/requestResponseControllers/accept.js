const FriendRequest = require("../../models/FriendRequest");
const User = require("../../models/User");

module.exports = async (req, res) =>{
    const currentUserId = req.user.id;
    const requesterId = req.body.id;
    console.log(currentUserId);
    console.log(requesterId)

    let userExists;
    try {
        //First the request must be deleted
        FriendRequest.findOneAndDelete({
            recipient: currentUserId,
            requester: requesterId,
            status: 0
        }, (err, request) =>{

            if(err) console.log(err);
            if(request) console.log(request);
        })
        //ERROR CHECKING
        // if requester does not exist
        userExists = await User.findById(requesterId);
        if(!userExists) throw Error(`User ${requesterId} does not exist`);

        // if user already has the friend
        req.user.friends.forEach((friend) =>{
            if(friend === requesterId) {
                throw Error(`Duplicate friend ${requesterId}`);
            }
        })

        // Add friend to current session user
        User.findByIdAndUpdate(currentUserId,{$push: {friends: requesterId}}, (err, user) =>{
            if(err) console.log(err);
            if(user) console.log(user);
        });

        // Add Friend to requester
        User.findByIdAndUpdate(requesterId,{$push: {friends: currentUserId}}, (err,user) =>{
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
