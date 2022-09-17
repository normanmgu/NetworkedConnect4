if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const port = process.env.PORT || 8080
let ip;
if(process.env.LAN === "true") ip = require("ip").address();
else ip = "localhost";

// Dependencies
const express       = require("express");
const http          = require("http");
const session       = require("express-session");
const mongoose      = require("mongoose");
const ejs           = require("ejs");
const User          = require("./models/User");
const passport      = require("passport");
const flash         = require("connect-flash");
const methodOverride= require("method-override");
const socketio      = require("socket.io");
const url           = require("url");
const app           = express();
const httpserver    = http.createServer(app);
const io            = socketio(httpserver);

module.exports = {
    io,
    url,
};


// Establish connection to MongoDB
mongoose.connect("mongodb://localhost/my_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log("connected to my_database... ");
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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
})

// Passport.js Setup
app.use(passport.initialize());
app.use(passport.session());
require("./middleware/passport-config");

// Controllers
const dashboardPageController = require("./controllers/dashboard");
const getLoginPageController = require("./controllers/getLogin");
const getRegisterPageController = require("./controllers/getRegister");
const newUserController = require("./controllers/newUser");
const getAddFriendController = require("./controllers/getAddFriend"); 
const sendFriendRequestController = require("./controllers/sendFriendRequest");
const pendingFriendRequestController = require("./controllers/pendingFriendRequest");
const acceptRequestController = require("./controllers/requestResponseControllers/acceptFriendRequest");
const rejectRequestController = require("./controllers/requestResponseControllers/rejectFriendRequest");
const sendDuelRequestController = require("./controllers/sendDuelRequest");
const acceptDuelRequestController = require("./controllers/requestResponseControllers/acceptDuelRequest");
const gameController = require("./controllers/gameControllers/game");

// CustomMiddleware
const {isLoggedIn, isLoggedOut} = require("./middleware/isLoggedMiddleware");

// ROUTES
app.get('/',isLoggedIn, dashboardPageController);

app.get('/login', isLoggedOut, getLoginPageController);

app.get('/register', getRegisterPageController);

app.get('/pendingRequests', isLoggedIn, pendingFriendRequestController);

app.get('/game', isLoggedIn, gameController);

app.post('/acceptDuelRequest', isLoggedIn, acceptDuelRequestController);

app.post("/users/register", newUserController);

app.post('/users/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login?error=true',
    failureFlash: true
}));

app.delete("/users/logout", (req, res, next) =>{
    req.logout(function(err) {
        if (err) { return next(err)}
        res.redirect("/");
    });
})

app.get("/addFriend", isLoggedIn, getAddFriendController);

app.post("/users/sendFriendRequest", isLoggedIn, sendFriendRequestController);

app.post("/resolveRequest", isLoggedIn, acceptRequestController);

app.delete("/resolveRequest", isLoggedIn, rejectRequestController);

app.post("/sendDuelRequest", isLoggedIn, sendDuelRequestController);

app.use((req, res) =>{
    res.send("<h1>404</h1>");
})

httpserver.listen(port, ip, () =>{
    console.log(`listening on http://${ip}:${port}`);
})
