var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = mongoose.Schema({
    username: String,
    nickname: String,
    password: String,
    emailConf: Boolean,
    read: Boolean,
    write: Boolean,
    isAdmin: Boolean
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);