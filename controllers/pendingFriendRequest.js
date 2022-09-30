const User = require("../models/User");
const getPendingRequests = require("../utils/requestHelpers/pendingRequest");

module.exports = async (req, res) =>{

    let pendingRequests;
    try {
        pendingRequests = await getPendingRequests(
            { username: req.user.username, id: req.user.id },
            0
        );
        if(pendingRequests.length === 0) throw new Error("Ne Requests");
    }
    catch(e) {
        console.log(e);
        return res.render("pendingFriendRequest", {
            users: null
        });
    }
    // Render Friend Request to Client
    let users = []
    let i = 0
    pendingRequests.forEach(async (request) =>{
        try {
            users.push(await User.findById(request.requester.id))
            i++;
            if(i === pendingRequests.length) {
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