/**************************************************************
*
*
*               THINGS WE REALLY NEED TO DO
*
*
**************************************************************/
/*
we need to change the navbar based on the user's game status, 
they cant try to create a game if they're already in a game,
they cant try to join a game if they're already in a game

AND

if user is already in a game there is a GAME PAGE button on 
the nav to take them to the game.

AND

if user isnt logged in, there are only buttons for Home and Log In/Profile page

*/
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var User = require("./models/user.js");
var Game = require("./models/game.js");

mongoose.connect('mongodb://localhost:27017/deadeuce_db');

var app = express();
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  var newUser = new User({ 
    name: 'Omar',
    email: 'testing@test.com',
    password: 'swag'
  });
  newUser.save(function (err, newUser) {
    if (err) return console.error(err);
    console.log(newUser.name);
  });
  // we're connected!
});

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
    body: JSON.stringify(req.body)
  };
  res.json(payload);
});

/**********************************
*                                 *
*     GAMES on GAMES on GAMES     *
*                                 *
***********************************/

/****************************\
 *           GET            *
\****************************/
var GameGetFunctions = require('./scripts/game/GameGetFunctions.js');

/* 
  Returns Object to Client
  {gamesList: [{gameName, numberOfPlayers}, ...]}
  MICHAEL

  LOGIC:
    - retrieve list of all games
      |-> game.Name, game.numPlayers -> displayed on join games page
*/  
app.get('/game/all', function(request, response){
  response.json(GameGetFunctions.getAllGames());
});

/****************************\
 *           POST           *
\****************************/
var GamePostFunctions = require ('./scripts/game/GamePostFunctions.js');

// TODO THIS IS INCOMPLETE -Chris
/*
  Logic:
    - add game to db
      |-> set turnPlayer to gameCreater
      |-> randomly select 1 Weapon/Location/Suspect to be the murderer/weapon/location
      |-> each player gets 18/(# number of players) pieces of the remaining info
    - # of players (2-6)
    - Chosen Character (or auto chosen based on when users join) for user creating game

    to DELETE on React component
      -Theme, Privacy, (character?)
*/

app.post('/createGame', function(request, response){
 var hostID = request.body.hostID;
 var gameName = request.body.gameName;
 var gameInfo = request.body.gameInfo;

  if (hostID === undefined || gameName === undefined)
    response.sendStatus(400);
  response.json(GamePostFunctions.createGame(db));
});

/*
  Takes in gameID
  {gameID:}
  Returns game feed, and turn player
  {feed:[{accuser:,suspect:,weapon:,location:}],
   turnPlayer:}
   MICHAEL

   LOGIC:
    - get turnplayer
    - get game.feed
    - get checklist

*/
app.post('/game/status', function(request, response){
  var gameID = request.body.gameID;
  if (gameID === undefined){
    response.sendStatus(400);
  }
  response.json(GamePostFunctions.getStatus(gameID));
});

/*
  Takes in gameID
  {gameID:}
  Returns checklist of game
  {checkList:{locations:[],weapons:[],suspects:[]}}
  MICHAEL

  LOGIC:
    - get checklist
    - mark known info for each user based on info they've seen
    - keep track of checked checkboxes for each user
*/
app.post('/game/checklist', function(request, response){
  var gameID = request.body.gameID;
  if (gameID === undefined){
    response.sendStatus(400);
  }
  response.json(GamePostFunctions.getChecklist(gameID));
});

/*
  Takes in gameID
  {gameID:}
  Returns game name and a map of location names to players in the location
  {gameName:, locations:[{name:,players:[]},...]}
  MICHAEL
  
  LOGIC:
    -get Location
      |-> get suspects in each location

*/
app.post('/game/map', function(request, response){
  var gameID = request.body.gameID;
  if (gameID === undefined){
    response.sendStatus(400);
  }
  response.json(GamePostFunctions.getMap(gameID));
});

/****************************\
 *           PUT            *
\****************************/
var GamePutFunctions = require('./scripts/game/GamePutFunctions.js');

// JOIN GAME
/*
  MICHAEL
  Logic:
    -get game.Name
    -check to make sure user has no gameID already
      |->if user.gameID == true -> alert that they can't join another game
      |->if user.gameID == false -> Add user.Email and user.Name to game.users
    -return joinSuccess and send user to the next page
    

  Takes in gamename and user id.
  Returns:
  {gameID, joinSuccess}
*/
app.put('/joinGame', function(request, response){
  var gameName = request.body.gameName;
  var userID = request.body.userID;
  if (gameName === undefined || userID === undefined){
    response.sendStatus(400);
  }
  response.json(GamePutFunctions.joinGame());
});

/*
  Takes in gameID, userID, weapon, suspect, location, and the action (suggest/accuse)
  {gameID:,userID:,weapon:,suspect:,location:,action:}
  Returns feedback (only on suggest) and correctness
  {correct:, feedback:}
  MICHAEL

  LOGIC:
    -if Accusation
      |-> check if accusation is correct
        |-> if accusation == true -> user wins game (game over)
        |-> if accusation == false -> user loses game (game over? or they dont get any more turns?)
    -if suggestion
      |-> return a random piece of information from the 3 pieces suggested (that isnt the true weapon/suspect/location)
        |-> update checklist with the "found" information
        |-> update feed with the suggestion
*/
app.put('/game/action', function(request, response){
 var gameID = request.body.gameID;
 var userID = request.body.userID;
 var weapon = request.body.weapon;
 var suspect = request.body.suspect;
 var location = request.body.location;
 var action = request.body.action;

 if (gameID === undefined || userID === undefined || action === undefined){
   response.sendStatus(400);
 }else if (weapon === undefined || suspect === undefined || location === undefined){
   response.sendStatus(400);
 }else if (action != "suggest" && action != "accuse"){
   response.sendStatus(400);
 }
 
 response.json(GamePutFunctions.takeAction(gameID, userID, weapon, suspect, location, action));
});

/**********************************
*                                 *
*      CALLS FOR /USERS           *
*                                 *
***********************************/

/****************************\
 *           GET            *
\****************************/
var UserGetFunctions = require('./scripts/user/UserGetFunctions.js');

// USER INFORMATION
/*
  LOGIC:
    -Get user.name and game.name
*/
app.get('/user', function(request, response){
  response.json(UserGetFunctions.getUser());
});

// DEFUNCT for MVP
// // USER WINS AND LOSSES
// app.get('/user/stats', function(request, response){
//   response.json(UserGetFunctions.getUserStats());
// });

// USER get GAME
app.get('/user/game', function(request, response){
  response.json(UserGetFunctions.getUserCurrentGame());
});

/****************************\
 *           POST           *
\****************************/
var UserPostFunctions = require('./scripts/user/UserPostFunctions.js');
// CREATE USER
app.post('/createUser', function(request, response){
  var userinfo = request.body.userInfo;
  response.json()
});

/****************************\
 *           PUT            *
\****************************/
var UserPutFunctions = require('./scripts/user/UserPutFunctions.js');

// UPDATE USER
app.put('/updateUser', function(request, response){
  //this is the database call/logic/everything else
  response.json(UserPutFunctions.updateUser());
});

// USER update GAME
app.put('/user/game', function(request, response){
  //this is the database call/logic/everything else
  response.json(UserPutFunctions.updateUserGame());
});



/* This actually starts up the server while trying to connect to the
 * database.
 */
//MongoClient.connect('mongodb://localhost:27017', function(err, dbConnection) {
// db = dbConnection;
 var server = app.listen(process.env.PORT || 4000, function() {
      var port = server.address().port;
      console.log("Started server at port", port);
      console.log("Started at ", new Date().toUTCString());
 });
//});
