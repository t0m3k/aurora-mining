var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: String,
    email: String,
    pools: [{
        _id: string,
        name: string,
        pool: string
    }],
    isAdmin: Boolean
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);