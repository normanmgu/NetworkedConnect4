const FriendRequest = require("../../models/FriendRequest");
const User = require("../../models/User");

module.exports = async (req, res) =>{
    const currentUserId = req.user.id;
    const requesterId = req.body.id;

    let userExists;
    try {
        userExists = await User.findById(requesterId);
        if(!userExists) throw Error(`User ${requesterId} does not exist`);

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

        FriendRequest.findOneAndDelete({
            recipient: currentUserId,
            requester: requesterId,
            status: 0
        }, (err, request) =>{

            if(err) console.log(err);
            if(request) console.log(request);
        })
    }
    catch(e){
        console.log(e)
    }

    res.render("pendingFriendRequest");
}
