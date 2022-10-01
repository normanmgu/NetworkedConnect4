const io = require("../../server").io;
const { userJoin, getCurrentUser, userLeave, getUsers, assignChipColor } = require("../../utils/socketusers");

io.on("connection", (socket) =>{
    console.log(`socket ${socket.id} connected.`);

    socket.on("online", (userObj) =>{
        userObj.id = socket.id;
        let user = userJoin(userObj);

        if(getUsers().length === 2){
            assignChipColor();
            io.to(user.room).emit("startGame", getUsers());
        }
    })

    socket.on("disconnect", () =>{
        let user = getCurrentUser(socket.id);
        console.log("!user disconnected " + user);
        io.to(user.room).emit("disconnected", getUsers());
        user = userLeave(socket.id)
        console.log(`User ${user.username} disconnected from the game`);
    })

    socket.on("joinRoom", ({ username, room }) =>{

        console.log(room);
        socket.join(room);           
        socket.broadcast.to(room).emit("joinedRoom", `${username} joined room ${room}`)
    })

    socket.on("chipPlacedAlert", (data) =>{
        console.log(data);
        socket.broadcast.emit("chipPlaced", data);
    })

    socket.on("detectedWinner", username =>{
        io.emit("winner", username);
    })

})