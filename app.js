var express                 = require('express'),
    bodyParser              = require('body-parser'),
    mongoose                = require('mongoose'),
    path                    = require('path'),
    morgan                  = require('morgan')

const LOCALCONF             = require('./local_conf.js')

// ROUTES INIT
var usersRoutes             = require("./src/routes/users")
var poolsRoutes             = require("./src/routes/pools")


var app = express()

mongoose.Promise = global.Promise

// COPY SETTINGS
const PORT = process.env.PORT || LOCALCONF.PORT
const HOST = process.env.HOST || LOCALCONF.HOST
const MONGODB = LOCALCONF.MONGODB

// CUSTOM SETTINGS
mongoose.connect(MONGODB, {
    useMongoClient: true
})

app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client')))


// ROUTES USE
app.use("/api/users", usersRoutes)
app.use("/api/pools", poolsRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/index.html'))
  });

app.listen(PORT, function(){
    console.log('Server is running at');
    console.log(`http://localhost:${PORT}`);
});
