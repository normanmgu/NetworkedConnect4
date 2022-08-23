const FriendRequest = require("../models/FriendRequest");
const User = require("../models/User");
const { ObjectId } = require('mongodb');

module.exports = async (req, res) =>{

    const userID = req.user.id.toString();

    //Detect pending request
    let friendRequests = [];
    try {
        friendRequests = await FriendRequest.find( { recipient: userID } );
    }
    catch(e) {
        console.log(e);
    }

    // Render Friend Request to Client
    let users = []
    let i = 0
    friendRequests.forEach(async (request) =>{
        try {
            users.push(await User.findById(request.requester))
            i++;
            if(i === friendRequests.length) {
                return res.render("pendingFriendRequest", {
                    users: users
                })
            }
        }
        catch(e) {
            console.log(e);
            return res.send("<h1>404</h1>");
        }
    })
}