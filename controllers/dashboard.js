const getUsersFromIds = require("../utils/getUsernamesFromId");

module.exports = async (req, res)  =>{
    const  username = req.user.username;
    const friends = req.user.friends

    console.log("username: ", username);
    console.log("current sessions user id: " + req.user._id);
    
    console.log("friends:\n", friends);

	res.render("dashboard", {
        username: username,
        friends: friends
    });
}
