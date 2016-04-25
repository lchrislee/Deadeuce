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
  var gameCollection = db.collection('games');
  gameCollection.find().toArray(function(err, games){
    var outputList = [];
    for (var i = 0; i < games.length; i++){
      var g = games[i];
      outputList.push({"gameName":g.name, "numberOfPlayers": g.numPlayers});
    }
    if (err){
      response.json({"gamesList":undefined});
      return;
    }else{
      response.json({"gamesList":outputList});
      return;
    }
  });
});

/****************************\
 *           POST           *
\****************************/
var GamePostFunctions = require ('./scripts/game/GamePostFunctions.js');

var checkList = {
  "locations":[
    "Lyon Center",
    "Leavey Library",
    "Traddies",
    "Ground Zero",
    "The 90",
    "Bovard",
    "EVK",
    "The Row",
    "Campus Center"
  ],
  "weapons":[
    "U-Lock",
    "Tommy Trojan's Sword",
    "overly sharp Skittles wrapper",
    "Freshman on a longboard",
    "Viterbi Finals",
    "Taco Bell's deal of the week"
  ],
  "suspects":[
    "President Nikias",
    "Traveler",
    "George Tirebiter",
    "Will Ferrell",
    "Tommy Trojan",
    "Pete Caroll"
  ]
};

var initialMap = [
          {"name": "Lyon Center", "players":["President Nikias"]},
          {"name": "Leavey Library", "players":[]},
          {"name": "Traddies", "players": []},
          {"name": "Ground Zero", "players": []},
          {"name": "The 90", "players": []},
          {"name": "Bovard", "players": []},
          {"name": "EVK", "players": []},
          {"name": "The Row", "players": []},
          {"name": "Campus Center", "players": []}
        ];

// TODO THIS IS INCOMPLETE -Chris
/*
  Logic:
    - add game to db
      |-> set turnPlayerNickname to gameCreater
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
  if (hostID === undefined || gameName === undefined){
    response.sendStatus(400);
    return;
  }
  var query = User.where({'email':hostID});
  query.findOne(function(err, user){
    if (err || user == undefined){
      response.json({"gameID":undefined});
      return;
    }else{
      var removedLocations = checkList.locations.slice(0);
      var removedWeapons = checkList.weapons.slice(0);
      var removedSuspects = checkList.suspects.slice(0);

      var answerLocationNum = Math.floor(Math.random() * 9);
      var answerLocation = checkList.locations[answerLocationNum];
      var answerSuspectNum = Math.floor(Math.random() * 6);
      var answerSuspect = checkList.suspects[answerSuspectNum];
      var answerWeaponNum = Math.floor(Math.random() * 6);
      var answerWeapon = checkList.weapons[answerWeaponNum];

      removedLocations.splice(answerLocationNum, 1);
      removedWeapons.splice(answerWeaponNum, 1);
      removedSuspects.splice(answerSuspectNum, 1);

      var possibleList = removedSuspects.concat(removedWeapons, removedLocations);
      var number1 = Math.floor(Math.random()*18);
      var number2 = Math.floor(Math.random()*18);
      while (number2 == number1){
        number2 = Math.floor(Math.random()*18);
      }
      var number3 = Math.floor(Math.random()*18);
      while (number3 == number1 || number3 == number2){
        number3 = Math.floor(Math.random()*18);
      }

      var userCard1 = possibleList[number1];
      var userCard2 = possibleList[number2];
      var userCard3 = possibleList[number3];

      var newGame = new Game({
        'name':gameName,
        'numPlayers':1,
        'turnPlayerNickname':"President Nikias",
        'turnPlayerEmail':user.email,
        "checklist":checkList,
        "map":initialMap,
        "users":[{"name":"President Nikias","email":hostID, "hand":[userCard1, userCard2, userCard3]}],
        "answer":{"murderer":answerSuspect, "weapon":answerWeapon, "location":answerLocation},
        "potentialCards":possibleList
      });

      newGame.save(function(err, game){
        if (err){
          response.json({"gameID":undefined});
          return;
        }else{
          User.update({"email":hostID}, {"gameID":game.name, "nickName":"President Nikias"}, function(err, raw){
            if (err){
              response.json({"gameID":undefined});
              return;
            }else{
              response.json({"gameID":game.name, "nickName":"President Nikias"});
              return;
            }
          });
        }
      });
    }
  });
});

/*
  Takes in gameID
  {gameID:}
  Returns game feed, and turn player
  {feed:[{accuser:,suspect:,weapon:,location:}],
   turnPlayerNickname:,
   turnPlayerEmail:}
   MICHAEL

   LOGIC:
    - get turnPlayerNickname
    - get turnPlayerEmail
    - get game.feed

*/
app.post('/game/status', function(request, response){
  var gameID = request.body.gameID;
  if (gameID === undefined){
    response.sendStatus(400);
    return;
  }
  var query = Game.where({"name":gameID});
  query.findOne(function(err, game){
    if (err || game == undefined){
      response.json({"feed":undefined});
      return;
    }else{
      var gamePlayerID = undefined;
      if (game.numPlayers == 6){
      	gamePlayerID = game.turnPlayerEmail;
      }
      response.json({
        "gameName":game.name,
        "feed":game.feed,
        "turnPlayerNickname":game.turnPlayerNickname,
        "turnPlayerID":gamePlayerID,
        "gameWinner":game.gameWinner});
      return;
    }
  });
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
    - keep track of checked checkboxes for each user          <----- lets keep it local for now, don't store - Chris
*/
app.post('/game/checklist', function(request, response){
  var gameID = request.body.gameID;
  if (gameID === undefined){
    response.sendStatus(400);
    return;
  }
  var query = Game.where({"name":gameID});
  query.findOne(function(err, game){
    if (err || game == undefined){
      response.json({"checkList":undefined});
      return;
    }else{
      response.json({"checkList":game.checklist});
      return;
    }
  });
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
    return;
  }

  var query = Game.where({"name":gameID});
  query.findOne(function(err, game){
    if (err || game == undefined){
      response.json({"gameName":undefined, "locations":undefined});
      return;
    } else{
      response.json({"gameName": game.name, "locations":game.map});
      return;
    }
  });
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
    -return joinSuccess and send user to the next page      <----- assign player to suspect? Chris
    

  Takes in gamename and user id.
  Returns:
  {gameID, joinSuccess}
*/
app.put('/joinGame', function(request, response){
  var gameName = request.body.gameName;
  var name = request.body.name; //TODO push up to server on ios
  var email = request.body.email;

  if (gameName === undefined || email === undefined){
    response.sendStatus(400);
    return;
  }

  var gameModel = db.model('Game', Game);
  var query = gameModel.where({"name":gameName});
  query.findOne(function(err, game) {
    if (err || game == undefined){
      response.json({error:err});
      return;
    } else {
      if(game.numPlayers >= 6) {
        response.json({
          joinSuccess: false
        });
        return;
      } else {
        game.save(function(err, game){
	  var playerNickName = game.checklist.suspects[game.numPlayers];
          game.addPlayer({name:playerNickName, email:email}, function(){
            User.update({"email":email}, {"gameID":game.name, "nickName":playerNickName}, function(err, raw){
              if (err){
                response.json({
                  joinSuccess: false
                });
                return;
              } else {
                response.json({
                  joinSuccess: true,
                  gameID: gameName,
                  nickName: playerNickName
                });
                return;
              }
            });
          });
        });
      }
    }
  });
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
        |-> if accusation == false -> user loses game (game over? or they dont get any more turns?) <- player taken out - Chris
    -if suggestion
      |-> return a random piece of information from the 3 pieces suggested (that isnt the true weapon/suspect/location)
        |-> update checklist with the "found" information   <- let user do that - Chris
        |-> update feed with the suggestion
        |-> update turnPlayerNickname to next player
        |-> update turnPlayerEmail to next player
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
    return;
  }else if (weapon === undefined || suspect === undefined || location === undefined){
    response.sendStatus(400);
    return;
  }else if (action != "suggest" && action != "accuse"){
    response.sendStatus(400);
    return;
  }

  var query = Game.where({"name":gameID});
  query.findOne(function(err, game){
    if (err || game == undefined){
      response.json({"action":action, "correct":undefined, "feedback":undefined});
      return;
    }else{
      if (game.gameWinner !== undefined){
        game.removePlayer(userID, function(){
          User.update({"email":userID}, {"gameID":undefined}, function(err, raw){
            response.json({"action":action,"correct": false, "feedback": game.gameWinner + " has found the murderer!", "gameWinner":game.gameWinner});
          });
        });
      }else if (game.numPlayers < 6){
        response.json({"action":action, "correct":false, "feedback": "There are not enough players!"});
        return;
      }

      var selectedUser = undefined;
      var selectedUserIndex = -1;
      var usersLength = game.users.length;

      for (var i = 0; i < usersLength; i++){
        var temp = game.users[i];
        if (temp.email == userID){
          selectedUser = temp;
          selectedUserIndex = i;
          break;
        }
      }

      if (selectedUser === undefined){ // not in game
        response.sendStatus(400);
        return;
      }else if (game.turnPlayerNickname != selectedUser.name){
        response.json({"action":action,"correct":false, "feedback": "Not your turn!"});
        return;
      }

      var answer = game.answer;
      var nextPlayer = "";
      if (selectedUserIndex == game.users.length - 1){
        nextPlayer = game.users[0];
      }else{
        nextPlayer = game.users[selectedUserIndex + 1];
      }

      var outputOptions = []; // the next 3 should not be else-if
      if (answer.weapon != weapon){
        outputOptions.push(weapon);
      }
      if (answer.murderer != suspect){
        outputOptions.push(suspect);
      }
      if (answer.location != location){
        outputOptions.push(location);
      }

      var feedInput = {
          "accuser": selectedUser.name,
          "suspect": suspect,
          "weapon": weapon,
          "location": location,
	  "action": action,
          "time": Date.now(),
	  "win": false
      };
      var newFeed = game.feed.slice(0);
      newFeed.unshift(feedInput);

      if (action == "accuse"){
        if (outputOptions.length == 0){ // correct accusation
	  newFeed[0].win = true;
          Game.update({"name":gameID}, {"gameWinner":selectedUser.name, "feed":newFeed}, function(err, raw){
            if (err){
              response.sendStatus(400);
            }else{
              game.removePlayer(userID, function(){
                User.update({"email":userID}, {"gameID":undefined, "nickName":undefined}, function(err, raw){
                  response.json({"action":action,"correct":true, "gameWinner":selectedUser.name}); // won!
                });
              });
            }
          });
        }else{ // wrong accusation
          var updatedArray = game.users.slice(0);
          updatedArray.splice(selectedUserIndex, 1);
          Game.update({"name":gameID}, {"feed":newFeed,"turnPlayerNickname":nextPlayer.name, "turnPlayerEmail":nextPlayer.email, "users":updatedArray}, function(err, raw){
            if (err){
              response.sendStatus(400);
              return;
            }else{
              game.removePlayer(userID, function(){
                User.update({"email":userID}, {"gameID":undefined, "nickName":undefined}, function(err, raw){
                  response.json({"action":action,"correct":false}); // lost!
                });
              });
            }
          });
        }
      }else if (action == "suggest"){
        Game.update({"name":gameID}, {"feed":newFeed, "turnPlayerNickname":nextPlayer.name, "turnPlayerEmail":nextPlayer.email}, function(err, raw){
          if (err){
            response.sendStatus(400);
            return;
          }else{
            if (outputOptions.length == 0){ // correct suggestion
              response.json({"action":action,"correct":true, "feedback":"Accuse this on your next turn!"});
              return;
            }else{ // incorrect
              var outPutHint = Math.floor(Math.random()*outputOptions.length);
              response.json({"action":action,"correct":false, "feedback":"It is not " + outputOptions[outPutHint] + "."});
              return;
            }
          }
        });
      }
    }
  });
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
  Input: 
    userID: String
  Output:
    user: {} (user object)

  General Logic:
    -Get user.name and game.name
*/
app.get('/user', function(request, response){
  var email = request.userID;
  var user = db.collection('users').findOne({"email": email}, function(err, doc){
    if(doc !== null){
      response.json({"email":doc.email});
      return;
    } else {
      response.json({err});
      return;
    }
  });
  //response.json(UserGetFunctions.getUser(request.userID));
});

// DEFUNCT for MVP
// // USER WINS AND LOSSES
// app.get('/user/stats', function(request, response){
//   response.json(UserGetFunctions.getUserStats());
// });

// USER get GAME
app.get('/user/game', function(request, response){
  var name = request.body.gameID;
  var cursor = db.collection('games').findOne( { "name": name }, function(err, doc){
    if (doc != null) {
      response.json({"game":doc.game});
      return;
    } else {
      response.json({"err":err});
      return;
    }
  });
  //response.json(UserGetFunctions.getUserCurrentGame());
});

/****************************\
 *           POST           *
\****************************/
var UserPostFunctions = require('./scripts/user/UserPostFunctions.js');
// CREATE USER
//input userInfo {name, email, password}
//output userID (user email)
app.post('/createUser', function(request, response){
  var userinfo = request.body.userInfo;
  var newUser = new User({ 
    name: userinfo.name,
    email: userinfo.email,
    password: userinfo.password
  });
  newUser.save(function (err, newUser) {
    if (err) return console.error(err);
    response.json({
      userID: newUser.email
    });
    return;
  });
});

//Login user
//Input: userID: String (email address)
//Output: loginSuccess: boolean (says if login was success or not)
app.post('/loginUser', function(request, response){
  var email = request.body.userID;
  var password = request.body.password;
  var cursor = db.collection('users').findOne({"email": email}, function(err, doc){
    if (doc != undefined && doc.password == password) {
      response.json({"nickName":doc.nickName,"loginSuccess":true, "gameID":doc.gameID});
    } else {
      response.json({"loginSuccess":false, "gameID":""});
    }
  });
});

/****************************\
 *           PUT            *
\****************************/
var UserPutFunctions = require('./scripts/user/UserPutFunctions.js');

// UPDATE USER
app.put('/updateUser', function(request, response){
  //this is the database call/logic/everything else
  response.json(UserPutFunctions.updateUser());
  return;
});

// USER update GAME
app.put('/user/game', function(request, response){
  //this is the database call/logic/everything else
  response.json(UserPutFunctions.updateUserGame());
  return;
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
