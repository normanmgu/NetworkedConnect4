// Dependencies
const express       = require("express");
const session       = require("express-session");
const mongoose      = require("mongoose");
const ejs           = require("ejs");
const User          = require("./models/User");
const passport      = require("passport");
const flash         = require("connect-flash");
const methodOverride= require("method-override");
const app           = express();

// Establish connection to MongoDB
mongoose.connect("mongodb://localhost/my_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log("connected... ");
})
.catch(err =>{
    if(err) console.log(err);
}) 

// Middleware Stack
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(session({
    secret: "biscuit",
    resave: false,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Passport.js Setup
app.use(passport.initialize());
app.use(passport.session());
require("./middleware/passport-config");

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect("/login");
}
function isLoggedOut(req, res, next) {
    if(!req.isAuthenticated()) return next();
    res.redirect("/");
}

// Controllers
const homePageController = require("./controllers/home");
const getLoginPageController = require("./controllers/getLogin");
const getRegisterPageController = require("./controllers/getRegister");
const newUserController = require("./controllers/newUser");

// ROUTES
app.get('/',isLoggedIn, homePageController);

app.get('/login', isLoggedOut, getLoginPageController);

app.get('/register', getRegisterPageController);

app.post("/users/register", newUserController);

app.post('/users/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login?error=true'
}));

app.delete("/users/logout", (req, res, next) =>{
    req.logout(function(err) {
        if (err) { return next(err)}
        res.redirect("/");
    });
})

app.listen(3000, () =>{
    console.log("app listening on port 3000")
})
