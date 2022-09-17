const io = require("../../server").io;

module.exports = (req, res) =>{
   //const ROOM = req.query.tranceiver === "requester" ? req.user.id + req.query.opp_id :req.query.opp_id + req.user.id;

    io.on("connection", (socket) =>{
        console.log(`socket ${socket.id} connected.`);

        socket.on("joinRoom", ({ username, room }) =>{

            console.log(room);
            socket.join(room);           
            io.to(room).emit("joinedRoom","HELLO WORLD: " + username);
        }) 

    })

    res.render("game");
}