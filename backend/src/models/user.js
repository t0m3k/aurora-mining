var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = mongoose.Schema({
    username: {
        type: String
    },
    address: {
        type: String
    },
    email: String,
    currency: {
        type: String,
        default: "GBP"
    },
    pools: [{
        _id: {
            address: {
                type: String,
                required: true
            },
            pool: {
                type: String,
                required: true
            }
        },
        name: String
    }],
    isAdmin: Boolean
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);