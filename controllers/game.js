module.exports = (req, res) =>{
    io.on("connection", (socket) =>{
        console.log(`socket ${socket.id} connected.`);
        
    })

    res.render("game");
}