const   jwt         = require('jsonwebtoken'),
        SECRET      = require('../../local_conf.js').SECRET

exports.isLoggedIn = function(req, res, next) {

    console.log(req.headers)
    try {
        const token = req.headers.authorization.split(" ")[1]
        
        jwt.verify(token, SECRET, function(err, decoded) {            
            if(decoded){
                req.userId = decoded._id
                next()
            } else {
                res.status(401).json({message: 'Please log in first'})
            }
        })
        } catch(e){
            res.status(401).json({message: 'Please log in first'})
        }
}

exports.correctUser = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, SECRET, function(err, decoded) {
            if(decoded && (decoded._id === req.params.id)){
                req.userId = decoded._id
                next()
            } else {
                res.status(401).json({message: 'Unauthorised'})
            }
        })
        } catch(e){
        res.status(401).json({message: 'Unauthorised'})
        }
}

exports.message = function(req, res, message = "There was an error") {
    res.json({message: message});
}

 module.exports = exports;
