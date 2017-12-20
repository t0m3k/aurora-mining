var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: String,
    address: {
        type: String,
        unique: true
    },
    email: String,
    currency: String,
    pools: [{
        _id: {
            type: String,
            required: true
        },
        name: String,
        pool: {
            type: String,
            required: true
        }
    }],
    isAdmin: Boolean
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);