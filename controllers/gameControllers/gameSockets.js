const io = require("../../server").io;
const { userJoin, getCurrentUser, userLeave, getUsers, assignChipColor } = require("../../utils/socketusers");

io.on("connection", (socket) =>{
    console.log(`socket ${socket.id} connected.`);

    socket.on("online", (userObj) =>{
        let user = userJoin(userObj);
        console.log("Get users: " + getUsers());

        if(getUsers().length === 2){
            assignChipColor();
            socket.emit("startGame", getUsers());
        }
    })

    socket.on("disconnect", () =>{
        let y = getCurrentUser(socket.id);
        console.log(`Get current user: ${y}`);
        let user = userLeave(socket.id)
        console.log(user);
        console.log(`User ${user.username} disconnected from the game`);
        // TODO: emit event that stops the game and imforms the other user that their opponent disconnected
    })

    socket.on("joinRoom", ({ username, room }) =>{

        console.log(room);
        socket.join(room);           
        socket.broadcast.to(room).emit("joinedRoom", `${username} joined room ${room}`)
    })

})