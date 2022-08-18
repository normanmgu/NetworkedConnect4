module.exports = (req, res)  =>{
    console.log(req.session.passport.user);
    let username = req.user.username;
    console.log("username: ", username);
	res.render("index", { username: username });
}