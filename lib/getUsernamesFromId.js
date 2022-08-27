const User = require("../models/User");

async function getUsersFromIds(ids) {
  let usernames = [];
  let user;
  for(let i = 0; i < ids.length; i++){
    if(i === ids.length) {
      return usernames;
    }
    user = await User.findById(ids[i]);
    usernames.push({
      username: user.username,
      id: ids[i]
    })
  }
  return usernames;
}

module.exports = getUsersFromIds;
