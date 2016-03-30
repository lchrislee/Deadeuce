'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var path = require('path');
var ObjectId = require('mongodb').ObjectID;

require('ssl-root-cas')
  .inject()
  .addFile(path.join(__dirname, 'certs', 'server', 'my-root-ca.crt.pem'))
  ;

var options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'my-server.key.pem'))
// You don't need to specify `ca`, it's done by `ssl-root-cas`
//, ca: [ fs.readFileSync(path.join(__dirname, 'certs', 'server', 'my-root-ca.crt.pem'))]
, cert: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'my-server.crt.pem'))
};

var app = express();
var db;

app.use(express.static('static'));
app.use(bodyParser.json()); // allows req.body to be parsed in application/json
app.use(bodyParser.urlencoded({'extended':false})); // allows req.body to be parsed in application/x-www-form-urlencoded

/*
 * Want to test one of these rest calls? Use cURL.
 * Format is:
 *
 *      curl -H 'Content-Type: application/json' {URL} -X {GET or POST or PUT or DELETE} {if GET, add -g} -d {data goes here}
 *
 * for example, use this to POST "CHEESE" to /test_slice running on localhost
 *
 *      curl -H 'Content-Type: application/json' localhost:3000/test_slice -X POST -d 'CHEESE'
 *
 * Use this to POST this JSON: {"name":"Chris", "role": "SUPREME LEADER"} to /test_slice running on localhost
 *
 *      curl -H 'Content-Type: application/json' localhost:3000/test_slice -X POST -d '{"name":"Chris","role":"SUPREME LEADER"}'
 *
 * Notice that you must wrap the key in quotes as well as the value in the JSON. If you want to send a GET with data,
 * it looks like this:
 *
 *      curl -H 'Content-Type: application/json' localhost:3000/ -X GET -g -d '{"name":"Chris","role":"SUPREME LEADER"}'
 */

//Sample express route
app.post('/test_slice', function(req, res){
  var payload = {
    test: "Test is successful!",
    body: req.body
  };
  res.json(payload);
});

/**********************************
*                                 *
*     GAMES on GAMES on GAMES     *
*                                 *
***********************************/

var temp_array_games = [];
var temp_game_count = 0;

// CREATE GAME
app.post('/createGame', function(request, response){
  var hostID = request.body.hostID;
  if (hostID === undefined)
    response.sendStatus(400);

  var game = {
    "gameID": temp_game_count,
    "hostID": request.body.hostID,
    "weapons":[
                "undefined",
                "Finals",
                "Dirty Spoon",
                "Neck tie",
                "Taco Bell",
                "Gravity",
              ],
    "users":[
              hostID
            ]
  };

  temp_array_games.push(game);
  temp_game_count++;
  //this is the database call/logic/everything else
  response.json({"temp_message": "This CREATES a GAME",
                 "gameID":temp_array_games[temp_array_games.length-1],
                 "temp_array": temp_array_games});
});

// JOIN GAME
app.put('/joinGame', function(request, response){
  var gameID = request.body.gameID;
  var userID = request.body.userID;
  if (gameID === undefined || userID === undefined)
    response.sendStatus(400);
//this is the database call/everything else
  for (var i = 0; i < temp_array_games.length; ++i){
    if (temp_array_games[i].gameID == gameID){
      temp_array_games[i].users.push(userID.toString());
      response.json({"joinSuccess":true});
    }
  }
  response.json({"joinSuccess":false});
});



/**********************************
*                                 *
*      CALLS FOR INSIDE /GAME     *
*                                 *
***********************************/
// GAME
app.get('/game', function(request, response){
  var gameIDFind = request.body.gameID;
  if (gameIDFind === undefined)
    response.sendStatus(400);
  //this is the database call/everything else
  for (var i = 0; i < temp_array_games.length; ++i){
    if (temp_array_games[i].gameID == gameIDFind){
      response.json(temp_array_games[i]);
    }
  }
  response.json({"game":undefined});
});

// WEAPONS in a GAME
app.get('/game/weapons', function(request, response){
  var gameIDFind = request.body.gameID;
  if (gameIDFind === undefined)
    response.sendStatus(400);
  //this is the database call/logic/everything else

  for (var i = 0; i < temp_array_games.length; ++i){
    if (temp_array_games[i].gameID == gameIDFind){
      response.json({"weapons":temp_array_games[i].weapons});
    }
  }
  response.json({"weapons":undefined});
});

// USERS in a GAME
app.get('/game/users', function(request, response){
  var gameIDFind = request.body.gameID;
  if (gameIDFind === undefined)
    response.sendStatus(400);
  //this is the database call/logic/everything else

  for (var i = 0; i < temp_array_games.length; ++i){
    if (temp_array_games[i].gameID == gameIDFind){
      response.json({"users":temp_array_games[i].users});
    }
  }
  response.json({"users":undefined});
});

// ACCUSE in a GAME
app.put('/game/accuse', function(request, response){
  //this is the database call/logic/everything else

  var accuse = {
    "message": "This ACCUSES in a specific game",
    "user": "user_ID",
    "weapon": "weapon_ID",
    "location": "location_ID"
  }

  response.json(accuse);
});

//  get CHECKLIST in a GAME
app.get('/game/checklist', function(request, response){
  //this is the database call/logic/everything else

  var checklist = {
    "locations" : [
      "location1", 
      "location2",
      "location3", 
      "location4",
      "location5", 
      "location6",
      "location7", 
      "location8",
      "location9"
    ],

    "weapons": [
      "weapon1",
      "weapon2",
      "weapon3",
      "weapon4",
      "weapon5",
      "weapon6"
    ],

    "users": [
      "user1_ID",
      "user2_ID",
      "user3_ID",
      "user4_ID",
      "user5_ID",
      "user6_ID"
    ]
  }

  response.json(checklist);
});

// update CHECKLIST in a game
app.put('/game/checklist', function(request, response){
  //this is the database call/logic/everything else
  response.json({"message": "This updates the CHECKLIST in a specific game"});
});

// starting CLUES in a GAME for a USER
app.get('/game/users/clues', function(request, response){
  //this is the database call/logic/everything else

  var clues = {
    "clue1": "clue1"

  }

  response.json({"message": "This gets the STARTING CLUES in a specific GAME"});
});

// TURN in a GAME
app.get('/game/users/turn', function(request, response){
  //this is the database call/logic/everything else
  response.json({"message": "This tells whose turn it is"});
});

app.put('/game/users/turn', function(request, response){
  //this is the database call/logic/everything else
  response.json({"message": "This updates whose turn it is"});
});


/**********************************
*                                 *
*      CALLS FOR /USERS           *
*                                 *
***********************************/

// CREATE USER
app.post('/createUser', function(request, response){
  //this is the database call/logic/everything else
  response.json({"message": "This CREATES a USER"});
});

// UPDATE USER
app.put('/updateUser', function(request, response){
  //this is the database call/logic/everything else
  response.json({"message": "This CREATES a USER"});
});

/**********************************
*      USER INFORMATION           *
***********************************/

// USER INFORMATION
app.get('/user', function(request, response){
  //this is the database call/logic/everything else
  response.json({"message": "This RETRIEVES USER information"});
});

// USER WINS
app.get('/user/wins', function(request, response){
  //this is the database call/logic/everything else
  response.json({"message": "This RETRIEVES user WINS"});
});

// USER LOSSES
app.get('/user/losses', function(request, response){
  //this is the database call/logic/everything else
  response.json({"message": "This RETRIEVES user LOSSES"});
});

// USER get GAME
app.get('/user/game', function(request, response){
  //this is the database call/logic/everything else
  response.json({"message": "This RETRIEVES user's current GAME"});
});

// USER update GAME
app.put('/user/game', function(request, response){
  //this is the database call/logic/everything else
  response.json({"message": "This UPDATES user's current GAME"});
});

var server = app.listen(process.env.PORT || process.argv[2], function() {
      var port = server.address().port;
      console.log("Started server at port", port);
      console.log("Started at ", new Date().toUTCString());
 });

/**********************************
*           BUGS R SCRY           *
***********************************/

/*
  Use everything below this as a reference for REST endpoints,
  MongoDB connections, Node.JS logic.
*/


/* This actually starts up the server while trying to connect to the
 * database. Cannot remove without copying the contents of the
 * function outside as standalone Node.JS code.
 */
MongoClient.connect('mongodb://localhost:3000/bugsdb', function(err, dbConnection) {
 db = dbConnection;
 // var server = app.listen(process.env.PORT || process.argv[2], function() {
 //      var port = server.address().port;
 //      console.log("Started server at port", port);
 //      console.log("Started at ", new Date().toUTCString());
 // });
});

/* Get a list of filtered records */
app.get('/api/bugs', function(req, res) {
 console.log("Query string", req.query);
 var filter = {};
 if (req.query.priority)
   filter.priority = req.query.priority;
 if (req.query.status)
   filter.status = req.query.status;

 db.collection("bugs").find(filter).toArray(function(err, docs) {
   res.json(docs);
 });
});

// app.use(bodyParser.json());

/* Insert a record */
app.post('/api/bugs/', function(req, res) {
 console.log("Req body:", req.body);
 var newBug = req.body;
 db.collection("bugs").insertOne(newBug, function(err, result) {
   var newId = result.insertedId;
   db.collection("bugs").find({_id: newId}).next(function(err, doc) {
     res.json(doc);
   });
 });
});

/* Get a single record */
app.get('/api/bugs/:id', function(req, res) {
 db.collection("bugs").findOne({_id: ObjectId(req.params.id)}, function(err, bug) {
   res.json(bug);
 });
});

/* Modify one record, given its ID */
app.put('/api/bugs/:id', function(req, res) {
 var bug = req.body;
 console.log("Modifying bug:", req.params.id, bug);
 var oid = ObjectId(req.params.id);
 db.collection("bugs").updateOne({_id: oid}, bug, function(err, result) {
   db.collection("bugs").find({_id: oid}).next(function(err, doc) {
     res.send(doc);
   });
 });
});
