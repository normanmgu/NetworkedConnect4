const User = require("../models/User");
const Request = require("../models/Request");

function parseInput(input) {
    let inputArr = input.trim().split(/\s+/);
    let username = inputArr[0];
    let id = inputArr[1]; 
    return { username, id };
}

module.exports = (req, res) =>{

    const {username, id} = parseInput(req.body.friend);



    const errors = []; // All errors to be displayed to client are pushed here

    // // GET RECIPIENT
    // let recipient = {};
    // try {
    //     recipient = await User.findOne({username: req.body.username});
    // }
    // catch(e) {
    //     // If fail to look up recipient
    //     console.log(e);
    //     errors.push({ msg: "Failed to find username."});

    //     return res.redirect("/"); // }

    // // CREATE REQUEST
    // try {
    //     const request =  await Request.create({
    //         requester: req.user.id,
    //         recipient: recipient._id.toString(),
    //         status: 0 // status: FriendRequest
    //     })
    //     console.log(request);
    //     return res.redirect("/");
    // }
    // catch(e) {
    //     console.log(e)
    //     errors.push({ msg: "Server Error: Please try again later." });
    //     return res.render("addFriend",{
    //         errors: errors
    //     })
    // }
}
      