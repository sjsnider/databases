// var mysql = require('mysql');

// var dbConnection = mysql.createConnection({
//   user: "root",
//   database: "chat"
// });

// dbConnection.connect();


var http = require("http");
var request = require("./request-handler.js");

var port = 3000;

var ip = "127.0.0.1";

var server = http.createServer(request.handler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
