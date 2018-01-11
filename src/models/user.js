const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    address: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        default: "GBP"
    },
    pools: [{
        address: {
            type: String,
            required: true
        },
        pool: {
            type: String,
            required: true
        },
        name: String
    }],
    isAdmin: Boolean
})

userSchema.pre('save', function(next) {
    const user = this
    if(!user.isModified('password')) return next()

    bcrypt.hash(user.password, 10)
    .then(h => {
        user.password = h
        next()
    }, err => next(err))
})

userSchema.methods.comparePassword = function(password, next) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err) return next(err)
        next(null, isMatch)
    })
}

module.exports = mongoose.model("User", userSchema)
