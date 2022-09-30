const users = [];

// Join user to chat
function userJoin(userObj) {
    const user = userObj;
    users.push(user); 

    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id)
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
  
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
}

function getUsers() {
    return users;
}

function assignChipColor() {
    users[0].player = 2;
    users[1].player = 1;
}

module.exports = { userJoin, getCurrentUser, userLeave, getUsers, assignChipColor };