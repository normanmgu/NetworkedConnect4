const Request = require("../models/Request");

module.exports = async (req, res)  =>{
    const friends = req.user.friends

    const duelRequests = await Request.find({
        recipient: {
            username: req.user.username,
            id:  req.user.id
        },
        status: 1
    })
    if(!duelRequests) {
        console.log("error");
    }

    console.log("username: ", req.user.username);
    console.log("current sessions user id: " + req.user._id);

	res.render("dashboard", {
        username: req.user.username,
        friends: friends,
        duelRequests: duelRequests
    });
}
