const User = require("../../models/User");
const acceptRequest = require("../../utils/requestHelpers/acceptRequest");

module.exports = async (req, res) =>{

    try {

        let requester = await User.findById(req.body.id);
        if(!requester) throw Error(`Requester does not exist`);

        let requestDeleted = acceptRequest(
            { username: req.user.username, id: req.user.id},
            { username: requester.username, id: requester._id.toString()},
            0
        )

        if(!requestDeleted) throw new Error("Something went wrong.");
        // if user already has the friend
        req.user.friends.forEach((friend) =>{
            if(friend.id === requester._id.toString()) {
                throw Error(`Duplicate friend ${requester._id.toString()}`);
            }
        })

        // Add friend to current session user
        User.findByIdAndUpdate(req.user.id,{$push: {friends: {username: requester.username, id: requester._id.toString()}}},
            (err, user) =>{
            if(err) console.log(err);
            if(user) console.log(user);
        });

        // Add Friend to requester
        User.findByIdAndUpdate(requester._id.toString(),{$push: {friends: {username: req.user.username, id: req.user.id}}},
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
