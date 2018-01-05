var express                 = require('express'),
    bodyParser              = require('body-parser'),
    passport                = require('passport'),
    LocalStrategy           = require('passport-local'),
    mongoose                = require('mongoose'),
    path                    = require('path')

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
const MONGODB = LOCALCONF.MONGODB;
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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client')));


// ROUTES USE

app.use("/api/users", usersRoutes);
app.use("/api/pools", poolsRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/index.html'));
  });

app.listen(PORT, HOST, function(){
    console.log('Server is running at');
    console.log(`http://${HOST}:${PORT}`);
});
