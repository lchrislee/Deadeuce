var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var app = express();
var db;

app.use(express.static('static'));

//Sample express route
app.post('/test_slice', function(req, res){
  console.log(req.data);
  var payload = {
    test: "Test is successful!"
  };
  res.json(payload);
});

/**********************************
*                                 *
*     GAMES on GAMES on GAMES     *
*                                 *
***********************************/

// CREATE GAME
app.post('/createGame', function(request, response){
  //this is the database call/logic/everything else
  response.json({"message": "This CREATES a GAME"});
});

// JOIN GAME
app.put('/joinGame', function(request, response){
  //this is the database call/logic/everything else
  response.json({"message": "This JOINS a GAME"});
});



/**********************************
*                                 *
*      CALLS FOR INSIDE /GAME     *
*                                 *
***********************************/
// GAME
app.get('/game', function(request, response){
  //this is the database call/everything else

  var game = {
    "message": "This gets a specific game",
    "game_ID": "1111",
    "game_theme": "USC"
  }

  response.json(game);
});

// WEAPONS in a GAME
app.get('/game/weapons', function(request, response){
  //this is the database call/logic/everything else

  var weapons = {
   "message": "This gets the WEAPONS in a specific game",
   "weapon_1": "weapon1", 
   "weapon_2": "weapon2", 
   "weapon_3": "weapon3", 
   "weapon_4": "weapon4", 
   "weapon_5": "weapon5", 
   "weapon_6": "weapon6", 
   "weapon_7": "weapon7"
  }

  response.json(weapons);
});

// USERS in a GAME
app.get('/game/users', function(request, response){
  //this is the database call/logic/everything else

  var users = {
    "message": "This gets the USERS in a specific game",
    "user_1": "user1_ID",
    "user_2": "user2_ID",
    "user_3": "user3_ID",
    "user_4": "user4_ID",
    "user_5": "user5_ID",
    "user_6": "user6_ID"
  }

  response.json(users);
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

app.use(bodyParser.json());

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

MongoClient.connect('mongodb://54.193.7.18:3000/bugsdb', function(err, dbConnection) {
 db = dbConnection;
 var server = app.listen(3000, function() {
      var port = server.address().port;
      console.log("Started server at port", port);
 });
});
