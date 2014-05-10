// var mysql = require('mysql');

// var dbConnection = mysql.createConnection({
//   user: "root",
//   database: "chat"
// });

// dbConnection.connect();

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root");

var Users = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    unique: true
  }
});

var Rooms = sequelize.define('Room', {
  name: {
    type: Sequelize.STRING,
    unique: true
  }
});

var Messages = sequelize.define('Message', {
  content: Sequelize.STRING,
  user: {
    type: Sequelize.INTEGER,
    references: Users,
    referencesKey: 'id',
  },
  room: {
    type: Sequelize.INTEGER,
    references: Rooms,
    referencesKey: 'id',
  }
});

Users.hasMany(Messages);
Rooms.hasMany(Messages);
Messages.belongsTo(Users);
Messages.belongsTo(Rooms);

sequelize.sync();

var http = require("http");
var request = require("./request-handler.js");

var port = 3000;

var ip = "127.0.0.1";

var server = http.createServer(request.handler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
