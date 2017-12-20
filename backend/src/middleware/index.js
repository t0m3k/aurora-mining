 
 exports.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    exports.message(req, res, "You need to login first!");
}; 

exports.isAdmin = function(req, res, next) {
    exports.isLoggedIn(req, res, function(){
        if(req.user.isAdmin === true) {
            return next();
        }
        exports.message(req, res, "You don't have permission to do that!");
    });
}; 

exports.canRead = function(req, res, next) {
    exports.isLoggedIn(req, res, function(){
        if(req.user.read === true) {
            return next();
        }
        exports.message(req, res, "You don't have permission to do that!");
    });
}; 

exports.canWrite = function(req, res, next) {
    exports.isLoggedIn(req, res, function(){
        if(req.user.write === true) {
            return next();
        }
        exports.message(req, res, "You don't have permission to do that!");
    });
}; 

exports.message = function(req, res, message = "There was an error") {
    console.log(message)
    res.json({message: message});
}

 module.exports = exports;
