 
 exports.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    exports.message(req, res, "You need to login first!", "/login");
}; 

exports.isAdmin = function(req, res, next) {
    exports.isLoggedIn(req, res, function(){
        if(req.user.isAdmin === true) {
            return next();
        }
        exports.message(req, res, "You don't have permission to do that!", "/");
    });
}; 

exports.canRead = function(req, res, next) {
    exports.isLoggedIn(req, res, function(){
        if(req.user.read === true) {
            return next();
        }
        exports.message(req, res, "You don't have permission to do that!", "/");
    });
}; 

exports.canWrite = function(req, res, next) {
    exports.isLoggedIn(req, res, function(){
        if(req.user.write === true) {
            return next();
        }
        exports.message(req, res, "You don't have permission to do that!", "/");
    });
}; 

exports.message = function(req, res, message = "There was an error", red = "/") {
    if(req.originalUrl.slice(1,4) === "api"){
        res.json({message: message});
    } else {
        req.flash("error", message);
        res.redirect(red);
    }
}

 module.exports = exports;