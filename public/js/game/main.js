// initialize websocket
const socket = io();

// helpers
function appendConnectionElement(users, status, opp_username) {
    let opponent = users.find(user => user.username === opp_username);
    let connectedElement = document.createElement("p");
    connectedElement.id = status;
    connectedElement.innerHTML = `${opponent.username} ${status}.`;
    document.body.appendChild(connectedElement);
}

/* _________________________________OBJECT DEFINITIONS ____________________________ */
function Player(username, id, room, player){
    return {
        username: username,
        id: id,
        room: room,
        player: player
    }
}

const ROWS = 6
const COLUMNS = 7
let P1 = null;
let P2 = null;
let round = 0;

// initilize array
let board = new Array(ROWS);
for(let i = 0; i < ROWS; i++) {
    board[i] = new Array(COLUMNS)
}

function createBoard() {
    for(let i = 0; i < ROWS; i++) {
        for(let j = 0; j < COLUMNS; j++) {

            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");

            tile.addEventListener("click", function() {
                addTileEventListener(tile);
            })
            document.getElementById("board").append(tile);
        }
    }
}

function resetGame() {
    for(let i = 0; i < ROWS; i++) {
        for(let j = 0; j < COLUMNS; j++) {
            board[i][j] = -1
        }
    }
    const tiles = document.querySelectorAll(".tile");
    if(tiles) tiles.forEach(tile => tile.remove());

    createBoard();
}


/* _________________________________________ MAIN ________________________________ */

/* *********** PREPARATION *********** */

// Parse usernames etc...
const { transceiver, opp_username, opp_id, username, id } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
const room = transceiver === "requester" ? id + opp_id :opp_id + id;

// Initialize main Game object
let currentPlayer = new Player(username, id, room, null);
console.log(currentPlayer);

socket.emit("joinRoom", { username, room })
socket.emit("online", currentPlayer);

socket.on("joinedRoom", (msg) =>{
    console.log(msg);
})

/* ********** ACTUALLY STARTING THE GAME LOGIC ********** */
socket.on("startGame", (users) =>{

    // set currentPlayers player status
    let temp = users.find(user => user.username === currentPlayer.username);
    currentPlayer.player = temp.player
    currentPlayer.id = temp.id;
    console.log(currentPlayer);

    // Add user is connected document element
    appendConnectionElement(users, "connected", opp_username) 
    
    let player1 = users.find(user => user.player === 1);
    let player2 = users.find(user => user.player === 2);

    P1 = player1;
    P2 = player2;
    console.log(`P1: ${P1}`);
    console.log(`P2: ${P2}`);

    resetGame();
})

socket.on("chipPlaced", (data) =>{
    console.log(data);
    round++;
    let tileId = data.row.toString() + "-" + data.col.toString();
    let tile = document.getElementById(tileId);
    tile.classList.add(data.chip);
    // tile.classList.add("fall");
    board[data.row][data.col] = data.player;
})

socket.on("disconnected", (users) =>{
    appendConnectionElement(users, "disconnected", opp_username);
})

// returns new placement coordinates
let isWin = {
    horizontalCase: function(board, player) {
        let count = 0;
        for(let row = 0; row < ROWS; row++) {
            count = 0;
            for(let col = 0; col < COLUMNS; col++) {
                if(board[row][col] === player) {
                    count++;
                }       
                else count = 0;
                if(count === 4) {
                    return true
                }
            }
        }
        return false;
    },

    verticalCase: function(board, player) {
        let count = 0;
        for(let col = 0; col < COLUMNS; col++) {
            count = 0;
            for(let row = 0; row < ROWS; row++) {
                if(board[row][col] === player) {
                    count++;
                }
                else {
                    count = 0;
                }
                if(count === 4) {
                    return true;
                }
            }
        }
        return false;
    },
    diagnolAscendingCase: function(board, player) {
        console.log("Made it in diagnolAscendingCase()");
        let count = 0;
        for(let k = 0; k < ROWS; k++) {
            let i = k;
            let j = 0;

            while(i >= 0) {
                if(board[i][j] === player) count++;
                else count = 0;
                if(count === 4) return true;
                i--;
                j++;
            }
            count = 0;
        }

        for(let k = 1; k < COLUMNS; k++) {
            let i = ROWS - 1;
            let j = k;

            while(j < COLUMNS - 1) {
                if(board[i][j] === player) count++;
                else count = 0;
                if(count === 4) return true;
                i--;
                j++;
            }
            count = 0;
        }
        return false;
    }
}

function addTileEventListener(tile) {
    console.log(round);
    console.log(currentPlayer);

    let chip;
    let cp;
    if(round % 2 === 0) {
        chip = "red-piece";
        cp = 1;
    }
    else {
        chip = "yellow-piece"
        cp = 2
    }

    if(currentPlayer.player !== cp) return;


    let coord = tile.id.split("-");
    let row = parseInt(coord[0]);
    let col = parseInt(coord[1]);

    let r, c;
    try {
        let coordArr = placeChipPhysics(col);
        r = coordArr[0];
        c = coordArr[1];
        
    }
    catch(e) {
        console.log(e);
        return;
    }

    board[r][c] = currentPlayer.player;
    // change id of tile to correspond to coords returned by chip physics function
    tile = document.getElementById(r.toString() + "-" + c.toString());
    tile.classList.add(chip);
    // tile.classList.add("fall");

    round++; // INCREMENT ROUND

    let data = {
        row: r,
        col: c,
        chip: chip,
        player: currentPlayer.player 
    };
    if(/*isWin.horizontalCase(board, currentPlayer.player) || isWin.verticalCase(board, currentPlayer.player
        || */ isWin.diagnolAscendingCase(board, currentPlayer.player)) {
        console.log(currentPlayer.username + " won!");
    }
    socket.emit("chipPlacedAlert", data);
}

// Returns the coordinates of where a chip would fall in place
function placeChipPhysics(col) {

    let row = ROWS - 1 // start scan at the bottom of the board

    do {
        if(board[row][col] === 1 || board[row][col] === 2) row--;
        else {
            if(board[row][col] === -1) {
                //console.log(`IN FUNC: (row, col): (${row}, ${col})`)
                return [row, col];
            }
        }
    } while(row >= 0);

    throw new Error("Column is already filled up to the max");
}
