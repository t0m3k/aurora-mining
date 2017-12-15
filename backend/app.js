var express                 = require('express'),
    passport                = require('passport'),
    LocalStrategy           = require('passport-local'),
    mongoose                = require('mongoose'),
    methodOverride          = require('method-override');

const LOCALCONF             = require('./local_conf.js');


// MODELS
var User                    = require('./src/models/userModel');

// ROUTES INIT
var usersRoutes             = require("./src/routes/usersRoutes");


var app = express();

mongoose.Promise = global.Promise;

// COPY SETTINGS

const PORT = process.env.PORT || LOCALCONF.PORT;
const HOST = process.env.HOST || LOCALCONF.HOST;
const MONGODB = process.env.MONGODB || LOCALCONF.MONGODB;
const SECRET = LOCALCONF.SECRET;

// passport configuration
app.use(require("express-session")({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

// EXPOSE FILES IN 'public' TO USERS
app.use(express.static(__dirname +"/public"));

// CUSTOM SETTINGS
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

mongoose.connect(MONGODB, {
    useMongoClient: true
});

// ROUTES USE

app.use("/users", usersRoutes);

app.listen(PORT, HOST, function(){
    console.log('Server is running!');
});
