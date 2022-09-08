const mongoose  = require("mongoose");
const bcrypt    = require("bcrypt"); 

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friends: [{
        username: String,
        id: String
    }]
});

UserSchema.pre("save", function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) =>{
        user.password = hash;
        next();
    })
})
const User = mongoose.model('User', UserSchema);

module.exports = User;
