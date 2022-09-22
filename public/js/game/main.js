
    // Parse usernames etc...
    const { transceiver, opp_username, opp_id, username, id } = Qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const room = transceiver === "requester" ? id + opp_id :opp_id + id;

    // Socketio
    const socket = io();

    socket.emit("joinRoom", { username, room })
    socket.emit("online", {
        username: username,
        id: socket.id,
        room: room,
        player: null
    });

    socket.on("joinedRoom", (msg) =>{
        console.log(msg);
    })

    socket.on("startGame", (users) =>{
        console.log(users);
    })
