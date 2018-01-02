var express                 = require('express'),
    bodyParser              = require('body-parser'),
    passport                = require('passport'),
    LocalStrategy           = require('passport-local'),
    mongoose                = require('mongoose');

const LOCALCONF             = require('./local_conf.js');


// MODELS
var User                    = require('./src/models/user');

// ROUTES INIT
var usersRoutes             = require("./src/routes/users");
var poolsRoutes             = require("./src/routes/pools");


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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ROUTES USE

app.use("/api/users", usersRoutes);
app.use("/api/pools", poolsRoutes);

app.listen(PORT, HOST, function(){
    console.log('Server is running at');
    console.log(`http://${HOST}:${PORT}`);
});
