var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

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
*/  
app.get('/game/all', function(request, response){
  response.json(GameGetFunctions.getAllGames());
});

/*
  Takes in gameID
  {gameID:}
  Returns checklist of game
  {checkList:{locations:[],weapons:[],suspects:[]}}
*/
app.post('/game/checklist', function(request, response){
  var gameID = request.body.gameID;
  if (gameID === undefined){
    response.sendStatus(400);
  }
  response.json(GameGetFunctions.getChecklist(gameID));
});

/*
  Takes in gameID
  {gameID:}
  Returns game name and a map of location names to players in the location
  {gameName:, locations:[{name:,players:[]},...]}
*/
app.post('/game/map', function(request, response){
  var gameID = request.body.gameID;
  if (gameID === undefined){
    response.sendStatus(400);
  }
  response.json(GameGetFunctions.getMap(gameID));
});

// every GET request below this line may not be necessary
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*
  Takes in a gameID or a gameName
  {gameName:}
  {gameID:}
  Returns a single Game Object
  {game:{}} // i don't know how the Game object is structured yet
*/
app.get('/game', function(request, response){
  var gameID = request.body.gameID;
  var gameName = request.body.gameName;
  if (gameID === undefined && gameName === undefined){
    response.sendStatus(400);
  }
  response.json(GameGetFunctions.getGame(db));
});

app.get('/game/locations', function(request, response){
  var gameID = request.body.gameID;
  if (gameID === undefined){
    response.sendStatus(400);
  }
  response.json(GameGetFunctions.getLocations());
});

// WEAPONS in a GAME
app.get('/game/weapons', function(request, response){
  var gameIDFind = request.body.gameID;
  if (gameIDFind === undefined){
    response.sendStatus(400);
  }
  response.json(GameGetFunctions.getWeapons(db));
});

// USERS in a GAME
app.get('/game/users', function(request, response){
  var gameIDFind = request.body.gameID;
  if (gameIDFind === undefined){
    response.sendStatus(400);
  }
  response.json(GameGetFunctions.getUsers(db));
});

app.get('/game/users/count', function(request, response){
  var gameID = request.body.gameID;
  if (gameID === undefined){
    response.sendStatus(400);
  }
  response.json(GameGetFunctions.getUsersCount());
});

// starting CLUES in a GAME for a USER
app.get('/game/users/clues', function(request, response){
  var gameIDFind = request.body.gameID;
  var userIDFind = request.body.userID;
  var authIDFind = request.body.authID;
  
  return GameGetFunctions.getUserClues(db);
});

//  get CHECKLIST in a GAME
app.get('/game/users/checklist', function(request, response){
  //this is the database call/logic/everything else
  var gameIDFind = request.body.gameID;
  var userIDFind = request.body.userID;
  var authIDFind = request.body.authID;

  response.json(GameGetFunctions.getUserChecklist(db));
});

// TURN in a GAME
app.get('/game/users/turn', function(request, response){
  var gameIDFind = request.body.gameID;
  return GameGetFunctions.getUserTurn(db);
});

/****************************\
 *           POST           *
\****************************/
var GamePostFunctions = require ('./scripts/game/GamePostFunctions.js');

// CREATE GAME
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
*/
app.post('/game/status', function(request, response){
  var gameID = request.body.gameID;
  if (gameID === undefined){
    response.sendStatus(400);
  }
  response.json(GamePostFunctions.getStatus(gameID));
});

/****************************\
 *           PUT            *
\****************************/
var GamePutFunctions = require('./scripts/game/GamePutFunctions.js');

// JOIN GAME
/*
  TODO
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

// ACCUSE in a GAME
app.put('/game/accuse', function(request, response){
  var gameID = request.body.gameID;
  var userID = request.body.userID;
  var accusation = request.body.suggestion;
  console.log(gameID);
  console.log(userID);
  console.log(accusation);
  if (gameID === undefined || userID === undefined || suggestion === undefined){
    response.sendStatus(400);
  }

  var weapon = accusation.weapon;
  var suspect = accusation.suspect;
  var place = accusation.place;

  if (weapon === undefined || suspect === undefined || place === undefined){
    response.sendStatus(400);
  }

  response.json(GamePutFunctions.accuse());
});

//suggest
app.put('/game/suggest', function(request, response){
  var gameID = request.body.gameID;
  var userID = request.body.userID;
  var suggestion = request.body.suggestion;
  if (gameID === undefined || userID === undefined || suggestion === undefined){
    response.sendStatus(400);
  }

  var weapon = suggestion.weapon;
  var suspect = suggestion.suspect;
  var place = suggestion.place;

  if (weapon === undefined || suspect === undefined || place === undefined){
    response.sendStatus(400);
  }
  response.json(GamePutFunctions.suggest());
});

// update CHECKLIST in a game
app.put('/game/checklist', function(request, response){
  var gameIDFind = request.body.gameID;
  var userIDFind = request.body.userID;
  var check = request.body.check;
  check = {"locations" : [
                          "test",
                          "success",
                          "location3",
                          "location4",
                          "location5",
                          "location6",
                          "location7",
                          "location8",
                          "location9"
                        ]
          };
  response.json(GamePutFunctions.updateChecklist());
});

app.put('/game/users/turn', function(request, response){
  response.json(GamePutFunctions.updateTurn());
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
app.get('/user', function(request, response){
  response.json(UserGetFunctions.getUser());
});

// USER WINS AND LOSSES
app.get('/user/stats', function(request, response){
  response.json(UserGetFunctions.getUserStats());
});

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
