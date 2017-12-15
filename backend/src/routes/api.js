var express                 = require('express'),
    User                    = require('../models/user'),
    middleware              = require("../middleware");

var router = express.Router({mergeParams: true});

router.get("/", function(req, res) {
    var priv = {};
    priv.description = "Your privileges";
    priv.isAdmin = req.user ? req.user.isAdmin : false;
    priv.read = req.user ? req.user.read : false;
    priv.write = req.user ? req.user.write : false;
    res.json(priv);
});

// all users

router.get("/users", middleware.isAdmin, function(req, res) {
    User.find({}, function(err, users){
        if(err || !users){
            console.log("Problems with getting users for admin/users: " + err);
            return res.redirect("back");
        }
        res.json(users);
    });
});

// show user
router.get("/users/:id", middleware.isAdmin, function(req, res) {
    User.findById(req.params.id, function(err, user){
        if(err || !user){
            console.log("Problems with getting user for api/users/id: " + err);
            return res.json({messgae: "Couldn't find the user!"});
        }
        res.json(user);
    });
});

// user edit route
router.put("/users/:id", middleware.isAdmin, function(req, res) {
    User.findById(req.params.id, function(err, user){
        if(err || !user){
            console.log("Problems with getting user for api/user: " + err);
            return res.json({message: "couldn't edit user"});
        }
        var newU = req.body.user;
        var priv = ["isAdmin", "read", "write"]; // privileges that can be edited by admin
        for(var prop in newU){
            if(priv.includes(prop)){
                user[prop] = newU[prop];
            }
        }
        User.findByIdAndUpdate(user._id, user, err =>{
            if(err){
                console.log(err);
                return res.json({message: "Couldn't save the user!"});
            }
            res.json(user);
        });
    });
});

// USER DELETE ROUTE

router.delete("/users/:id", middleware.isAdmin, function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log("Problems with getting user for admin/user: " + err);
            return res.redirect("/admin/users");
        }
        req.flash("success", "User removed!");
        res.redirect("/admin/users");
    });
});

router.get("*", function(req, res){
    res.send({message: "this api doesn't exist!"});
});

module.exports = router;
