const mongoose = require("mongoose");

/**
 * status: 0 == Friend Request
 * status: 1 == Duel Request
 */
const RequestSchema = new mongoose.Schema({
    requester: {
        username: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    recipient: {
        username: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    status: {
        type: Number,
        required: true
    }
})

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
