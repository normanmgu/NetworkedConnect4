const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log("connected to testing server... ");
})
.catch(err =>{
    if(err) console.log(err);
}) 

const FriendRequest = require("./models/FriendRequest");

FriendRequest.find({
    recipient: '62fea8237a3bacb3dc010f1e'
},
(err, req) =>{
    console.log(err);
    console.log(req);
})