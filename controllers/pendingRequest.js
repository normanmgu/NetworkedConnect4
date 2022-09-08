const Request = require("../models/Request");
const User = require("../models/User");

module.exports = async (req, res) =>{

    const userID = req.user.id.toString();

    //Detect pending request
    let Requests = [];
    try {
        Requests = await Request.find( { recipient: {username: req.user.username, id: userID}, status: 0 } );
        if(Requests.length === 0) throw Error("No Request");
    }
    catch(e) {
        console.log(e);
        res.render("pendingFriendRequest", {
            users: null
        })
    }

    // Render Friend Request to Client
    let users = []
    let i = 0
    Requests.forEach(async (request) =>{
        try {
            users.push(await User.findById(request.requester.id))
            i++;
            if(i === Requests.length) {
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