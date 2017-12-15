var express                 = require('express'),
    User                    = require('../models/user'),
    middleware              = require("../middleware");
var router = express.Router({mergeParams: true});

router.get("/", middleware.isAdmin, function(req, res) {
    res.render("admin/index");
});

router.get("/users", middleware.isAdmin, function(req, res) {
    User.find({}, function(err, users){
        if(err){
            console.log("Problems with getting users for admin/users: " + err);
            return res.redirect("back");
        }
        res.render("admin/users", {users: users});
    });
});


//user show edit route

router.get("/users/:id", middleware.isAdmin, function(req, res) {
    User.findById(req.params.id, function(err, user){
        if(err || !user){
            console.log("Problems with getting user for admin/users/id: " + err);
            return res.redirect("/admin/users");
        }
        res.render("admin/user", {user: user});
    });
});

module.exports = router;
