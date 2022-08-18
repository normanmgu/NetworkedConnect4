const User          = require("../models/User");
const passport      = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt        = require("bcrypt");

passport.serializeUser((user, done) =>{
    done(null, user.id);
})

passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) =>{
        done(err, user);
    })
})

passport.use(new localStrategy((username, password, done) =>{
    User.findOne({ username:username }, (error, user) =>{
        if(error) return done(err);
        if(!user) return done(null, false, { message: "Incorrect username." })

        bcrypt.compare(password, user.password, (err, res) => {
            if (err) return done(err);
            if (res === false) return done(null, false , { message: "Incorrect passworld."})
            
            return done(null, user);
        })
    })
}))