// CONFIG HERE
var host = "localhost";
var port = "8888";
var mongoDB = "mongodb://t0m3k:mithrandir1@ds111876.mlab.com:11876/aurora";
var secret = "some secret sentence";




// END OF CONFIG

var localConf = {};

localConf.HOST = host;

localConf.PORT = port;

localConf.MONGODB = mongoDB;

localConf.SECRET = secret;

module.exports = localConf;