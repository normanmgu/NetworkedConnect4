const FriendRequest = require("../models/FriendRequest");
const getUsersFromIds = require("../lib/getUsernamesFromId");

module.exports = async (req, res)  =>{
    const  username = req.user.username;
    const friendsIds = req.user.friends

    console.log("username: ", username);
    console.log("current sessions user id: " + req.user._id);
    
    const friends =  await getUsersFromIds(friendsIds);
    console.log("friends:\n", friends);

	res.render("dashboard", {
        username: username,
        friends: friends
    });
}
