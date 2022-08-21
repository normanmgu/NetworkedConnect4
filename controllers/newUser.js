const User = require("../models/User");

module.exports = (req, res) =>{
    const { username, password } = req.body;

    let errors = []; // Holds an array of all errors to display if needed
    if(!username || !password) {
        errors.push({ msg: "Please fill in all fields." });
    }
    if(password.length < 5) {
        errors.push({ msg: "Password needs to be atleast 5 characters long." }); 
    }
    if(errors.length > 0) {
        console.log("made it in here");
        return res.render("register", {
            errors: errors
        })
    }

    User.findOne({ username:username }, (err, user) =>{
        console.log(user);
        if(user) {
            console.log("user already exists");
            return res.redirect("/register");
        }
        else {
            User.create(req.body, (err, user) =>{
                console.log("User: ", user);
                if(err) console.log(err);
            })

            return res.redirect("/");
        }
    })
}