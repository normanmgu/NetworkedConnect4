const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");

module.exports = async (req, res) =>{

    const errors = []; // All errors to be displayed to client are pushed here

    // GET RECIPIENT
    let recipient = {};
    try {
        recipient = await User.findOne({username: req.body.username});
        console.log(recipient._id)
    }
    catch(e) {
        // If fail to look up recipient
        console.log(e);
        errors.push({ msg: "Failed to find username."});

        return res.render("addFriend", {
            errors: errors
        });
    }

    // CREATE REQUEST
    try {
        const request =  await FriendRequest.create({
            requester: req.user.id,
            recipient: recipient._id.toString(),
            status: 0 // status: pending
        })
        console.log(request);
        return res.redirect("/");
    }
    catch(e) {
        console.log(e)
        errors.push({ msg: "Server Error: Please try again later." });
        return res.render("addFriend",{
            errors: errors
        })
    }
}
            