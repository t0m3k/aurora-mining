// CONFIG HERE
const   host = "localhost",
        port = "8080",
        mongoDB = "mongodb://localhost/user",
        secret = "some secret sentence";





// END OF CONFIG

const localConf = {};

localConf.HOST = host;

localConf.PORT = port;

localConf.MONGODB = mongoDB;

localConf.SECRET = secret;

module.exports = localConf;