const mongoose = require("mongoose");

/**
 * status: 0 == pending
 * status: 1 == accepted
 * status: 3 == rejected
 */
const FriendsListSchema = new mongoose.Schema({
    requester: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    },
    status: 0
})

const FriendRequest = mongoose.model("FriendRequest", FriendsListSchema);

module.exports = FriendRequest;