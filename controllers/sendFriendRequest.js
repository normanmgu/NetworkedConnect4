const User = require("../models/User");
const Request = require("../models/Request");
const sendRequest = require("../utils/requestHelpers/sendRequest");

module.exports = async (req, res) =>{

    const errors = []; // All errors to be displayed to client are pushed here

    try {
        // Get recipient
        let recipient = await User.findOne({username: req.body.username});
        if(!recipient) {
            errors.push({ msg: "Failed to find username."});
            throw new Error("User not found");
        }

        // Send Request
        let request = await sendRequest(
            { username: recipient.username, id: recipient._id.toString()},
            { username: req.user.username, id: req.user.id},
            0);

        console.log(request);
        res.redirect("/");
    }
    catch(err) {
        console.log(err);
        res.render("addFriend", {
            errors: errors
        });
    }
}
            
