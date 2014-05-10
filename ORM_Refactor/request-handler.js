var http = require('http');
var querystring = require('querystring');
// var mysql = require('mysql');

// var dbConnection = mysql.createConnection({
//   user: "root",
//   database: "chat"
// });

// dbConnection.connect();

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root");

var Users = sequelize.define('User', {
  name: Sequelize.STRING,
});

var Rooms = sequelize.define('Room', {
  name: Sequelize.STRING,
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

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var headers = defaultCorsHeaders;
headers['Content-Type'] = "application/json";

var sendResponse = function(response, data, status){
  status = status || 200;
  response.writeHead(status, headers);
  response.end(data);
};

var results = [];
var handleRequest = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);
  if(request.method==='GET'){
    if(request.url !== '/classes/messages' && request.url !== '/classes/room1'){
      sendResponse(response,"Not Found",404);
    }else {
      Messages
      .findAll()
      .complete(function(err,messages){
        // console.log(messages);
        sendResponse(response,JSON.stringify(messages),200);
      });
      // dbConnection.query("SELECT * FROM messages",function(err,rows,fields){
      // dbConnection.query("SELECT users.name, messages.content FROM messages INNER JOIN users ON users.ID=messages.userID",function(err,rows,fields){
      //   if(err) {
      //    console.log('error');
      //   }
      //   sendResponse(response,JSON.stringify(rows),200);
      // });
    }
  };

  if (request.method === 'OPTIONS'){
    sendResponse(response,"Not Found",201);
  }

  var userName, text;
  if(request.method==='POST'){
    console.log('in POst');
    var body = "";
    var userID;
    request.on('data', function (chunk) {
      body += chunk;
      console.log(body);
      var messageObj = JSON.parse(body);
      console.log(messageObj);
      // var messageObj = querystring.parse(body);
      userName = messageObj.username;
      text = messageObj.text;
      console.log(userName);
      console.log(text);
      Users.create({name:userName}).complete(function(err,userData){
        if (err) {}
        Users.find({where: {name: userName}}).complete(function(err,userData){
          // console.log(userData.id);
          Messages.create({content:text, user:userData.id}).complete(function(err,data){
            // console.log(data);
          });
        });
      });
      // dbConnection.query('INSERT INTO users (name) VALUES (?)', userName, function(err,rows,fields){
      //   if (err) {
      //     console.log('do nothing');
      //   }
      //   dbConnection.query('SELECT ID FROM users WHERE name = ?', userName, function(err,rows,fields){
      //     console.log(rows);
      //     userID = rows[0].ID;
      //     dbConnection.query('INSERT INTO messages (content, userID, roomID) VALUES (?, ?, ?)', [text, userID, 1], function(err,rows,fields){
      //       if (err) {
      //         console.log('error');
      //       }
      //     });
      //   });
      // });
    });
    request.on('end',function(){});
    sendResponse(response,"Not Found",200);
  }

};

exports.handler = handleRequest;
