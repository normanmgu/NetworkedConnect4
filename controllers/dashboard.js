module.exports = (req, res)  =>{
    let username = req.user.username;
    let friends = req.user.friends

    console.log("username: ", username);
    console.log("current sessions user id: " + req.user._id);
	res.render("dashboard", {
        username: username,
        friends: friends
    });
}