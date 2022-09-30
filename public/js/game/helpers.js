
function appendConnectionElement(users, status, opp_username) {
        let opponent = users.find(user => user.username === opp_username);
        let connectedElement = document.createElement("p");
        connectedElement.id = status;
        connectedElement.innerHTML = `${opponent.username}; connected.`;
        document.body.appendChild(connectedElement);
}