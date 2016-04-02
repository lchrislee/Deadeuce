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
    body: String(req.body)
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
  var gameName = request.body.gameName;

  if (hostID === undefined || gameName === undefined)
    response.sendStatus(400);

  var gameInfo = request.body.gameInfo;
var cantCreate = false;
gameInfo= {
      "_id" : "game9"
      ,
      "title": "asdasd",
      "weapons" : ["Knife","Gun","Bow"],
      "locations" : ["THH","EVK","HOH"],
      "turn": "user1",
      "users" : {
          "user1" : {
             "auth": "auth1",
             "hand": ["Knife","Gun"],
             "checkList":{
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
              ]
             }
          },
          "user2":{

          }
      },
      "answer":{
          "location":"loc1",
          "weapon":"weapon1",
          "user":"user1"
      },
      "usersId":["user1","user2"],
      "accuse" : {
           "message": "This ACCUSES in a specific game",
            "user": "user1",
           "weapon": "Knife",
             "location": "THH"
      }
       };

function createGame(){
      db.collection('game').insertOne(
       gameInfo, function(err, resultGame) {
          var result = {};
          if(!err){
              result['gameID'] = resultGame._id;
              response.json(result);
          }else{
              response.json(result);
          }
      });
};




             db.collection('game').find({"title":gameInfo.title}).count(function(err, count) {
            var result = {};
            if(count >= 1){
                cantCreate = true;
            }
            if(cantCreate){
               result['result'] = "failed";
              response.json(result);
            }else{
              createGame();
            }
   });


  // temp_array_games.push(game);
  // temp_game_count++;
  // //this is the database call/logic/everything else
  // response.json({"temp_message": "This CREATES a GAME",
  //                "gameID":temp_array_games[temp_array_games.length-1],
  //                "temp_array": temp_array_games});
});

// JOIN GAME
app.put('/joinGame', function(request, response){
  var gameName = request.body.gameName;
  var userID = request.body.userID;
  if (gameID === undefined || userID === undefined)
    response.sendStatus(400);

    var set = {};
     var cursor = db.collection('game').find( { "_id": gameID } );

    cursor.each(function(err, doc) {
      if (doc != null) {
            var currentUserIDs = doc.usersId;
            currentUserIDs[currentUserIDs.length] = userID;
             set['users.' + userID] = {"_id": userID};
            set['usersId'] = currentUserIDs;

            var cantJoin = false;
            if(doc.usersId != undefined){
                if(doc.usersId.length >= doc.maxUser){
                    cantJoin = true;
                }
            }

            if(cantJoin){
                result['joinSuccess'] = false;
               response.json(result);
            }

            if(!cantJoin){
                db.collection('game').updateOne(
                  { "_id" : gameID  },
                  { $set: set },
                  function(err, results) {
                    console.log(results);
                    if(!err){
                           var cursor = db.collection('user').find( { "_id": userID } );
                              cursor.each(function(err, userdoc) {
                                if (userdoc != null) {
                                      var userGame = userdoc.game;
                                      if(!userGame){
                                        userGame = [];
                                        userGame[userGame.length] = gameID;
                                      }else{
                                        userGame[userGame.length] = gameID;
                                      }
                                      db.collection('user').updateOne(
                                        { "_id" : userID },
                                        { $set: { "game": userGame} },
                                        function(err, results) {
                                       //   console.log(results);
                                          if(!err){
                                            result['joinSuccess'] = true;
                                            result['nextTurn'] = nextTurn;
                                            response.json(result);
                                          }else{
                                           result['joinSuccess'] = false;
                                            response.json(result);
                                          }
                                     });

                                }
                              });

                    }else{
                      //error
                      result['joinSuccess'] = false;
                      response.json(result);
                    }
                });

            }
      } else {
      }
   });
});



/**********************************
*                                 *
*      CALLS FOR INSIDE /GAME     *
*                                 *
***********************************/
// GAME
app.get('/game', function(request, response){
  var gameID = request.body.gameID;
  var gameName = request.body.gameName;
  if (gameID === undefined && gameName === undefined)
    response.sendStatus(400);
  //this is the database call/everything else
   var cursor = db.collection('game').find( { "_id": gameIDFind } );
   cursor.each(function(err, doc) {
      if (doc != null) {

        response.json({"game":doc});
      } else {
        response.json({"game":undefined});
      }
   });
  // for (var i = 0; i < temp_array_games.length; ++i){
  //   if (temp_array_games[i].gameID == gameIDFind){
  //     response.json(temp_array_games[i]);
  //   }
  // }

});

// WEAPONS in a GAME
app.get('/game/weapons', function(request, response){
  var gameIDFind = request.body.gameID;
  if (gameIDFind === undefined)
    response.sendStatus(400);
  //this is the database call/logic/everything else

  var cursor = db.collection('game').find( { "_id": gameIDFind } );
   cursor.each(function(err, doc) {
      if (doc != null) {
        response.json({"weapons":doc.weapons});
      } else {
        response.json({"weapons":undefined});
      }
   });

});

// USERS in a GAME
app.get('/game/users', function(request, response){
  var gameIDFind = request.body.gameID;
  if (gameIDFind === undefined)
    response.sendStatus(400);

  var cursor = db.collection('game').find( { "_id": gameIDFind } );
   cursor.each(function(err, doc) {
      if (doc != null) {

        response.json({"users":doc.usersId});
      } else {
         response.json({"users":undefined});
      }
   });

});

app.get('/game/users/count', function(request, response){
  var gameID = request.body.gameID;
  if (gameID === undefined)
    response.sendStatus(400);

    for (var i = 0; i < temp_array_games.length; ++i){
    if (temp_array_games[i].gameID == gameIDFind){
      response.json({"numberPlayers":temp_array_games[i].users.length});
    }
  }
  response.json({"numberPlayers":undefined});
});

// ACCUSE in a GAME
app.put('/game/accuse', function(request, response){
  var gameID = request.body.gameID;
  var userID = request.body.userID;
  var suggestion = request.body.suggestion;
  if (gameID === undefined || userID === undefined || suggestion === undefined)
    response.sendStatus(400);

  var weapon = suggestion.weapon;
  var suspect = suggestion.suspect;
  var place = suggestion.place;

  if (weapon === undefined || suspect === undefined || place === undefined)
    response.sendStatus(400);

//this is the database call/logic/everything else

  var gameID = request.body.gameID;
  var userID = request.body.userID;
  //var accusation = request.body.accusation;
  var accusation;

  console.log("here");
  accusation = {
    "user": "user1",
    "location": "loc1",
    "weapon" : "weapon1"
  };
  var cursor = db.collection('game').find( { "_id": gameID } );
   cursor.each(function(err, doc) {
      if (doc != null) {
        var answer = doc.answer;
        var set = {};
        var result = {};
        console.log(answer.location + " " + accusation.location + " " +answer.user + " " +accusation.user + " " +answer.weapon + " " +accusation.weapon);
        if(answer.location == accusation.location && answer.user == accusation.user && answer.weapon == accusation.weapon){
          //correct
           set['winner'] =  userID;
           set['gameover'] = true;
           result['correct'] = true;
           result['gameover'] = true;
        }else{
          //incorrect
          set['users.' + userID + ".lose"] = true;
          result['correct'] = false;
        }

           db.collection('game').updateOne(
            { "_id" : gameID  },
            { $set: set },
            function(err, results) {
              if(!err){

                response.json(result);
              }else{
                response.json(result);
              }
          });
      } else {
      }
   });
});

//suggest
app.put('/game/suggest', function(request, response){
  //this is the database call/logic/everything else

  var gameID = request.body.gameID;
  var userID = request.body.userID;
  var suggestion = request.body.suggestion;
  if (gameID === undefined || userID === undefined || suggestion === undefined)
    response.sendStatus(400);

  var weapon = suggestion.weapon;
  var suspect = suggestion.suspect;
  var place = suggestion.place;

  if (weapon === undefined || suspect === undefined || place === undefined)
    response.sendStatus(400);

  var cursor = db.collection('game').find( { "_id": gameID } );
   cursor.each(function(err, doc) {
      if (doc != null) {
        var answer = doc.answer;
        var set = {};
        var result = {};
        if(answer.location == suggestion.location && answer.user == suggestion.user && answer.weapon == suggestion.weapon){
          //correct
           result['correct'] = true;
        }else{
          //incorrect
          result['correct'] = false;
        }

          //next turn
          var nextTurn = doc.users[doc.turn + 1];
          db.collection('game').updateOne(
            { "_id" : gameID },
            { $set: { "turn": doc.turn + 1} },
            function(err, results) {
              console.log(results);
              if(!err){
                result['result'] = "success";
                result['nextTurn'] = nextTurn;
                response.json(result);
              }else{
               result['result'] = "failed";
                response.json(result);
              }
         });


      } else {
      }
   });

});


//  get CHECKLIST in a GAME
app.get('/game/users/checklist', function(request, response){
  //this is the database call/logic/everything else
  var gameIDFind = request.body.gameID;
  var userIDFind = request.body.userID;
  var authIDFind = request.body.authID;
     var cursor = db.collection('game').find( { "_id": gameIDFind } );
     cursor.each(function(err, doc) {
        if (doc != null) {
          console.log(doc.users[userIDFind].checkList);
              response.json({"checklist": doc.users[userIDFind].checkList});
        } else {
            response.json({"checklist": undefined});
        }
     });

});

app.get('/game/checklist', function(request, response){
  //this is the database call/logic/everything else
  response.json(checklist);
});

// update CHECKLIST in a game
app.put('/game/checklist', function(request, response){
  //this is the database call/logic/everything else
 // response.json({"message": "This updates the CHECKLIST in a specific game"});
 var gameIDFind = request.body.gameID;
var userIDFind = request.body.userID;
var check = request.body.check;
check = {
   "locations" : [
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
var path = "users." + userIDFind + ".checkList";
  db.collection('game').updateOne(
            { "_id" : gameIDFind },
            { $set: { path:check} },
            function(err, results) {

              if(!err){
                response.json({"result": "success",
                                          "checklist": check});
              }else{
                response.json({
                                          "checklist": undefined});
              }
   });
});

// starting CLUES in a GAME for a USER
app.get('/game/users/clues', function(request, response){
  //this is the database call/logic/everything else

  var gameIDFind = request.body.gameID;
  var userIDFind = request.body.userID;
  var authIDFind = request.body.authID;
  var cursor = db.collection('game').find( { "_id": gameIDFind } );
   cursor.each(function(err, doc) {
      if (doc != null) {
            response.json({"clues": doc.users[userIDFind].hand});
      } else {
        response.json({"clues": undefined});
      }
   });
  //response.json({"message": "This gets the STARTING CLUES in a specific GAME"});
});

// TURN in a GAME
app.get('/game/users/turn', function(request, response){
  //this is the database call/logic/everything else
 // response.json({"message": "This tells whose turn it is"});

 var gameIDFind = request.body.gameID;

   var cursor = db.collection('game').find( { "_id": gameIDFind } );
   cursor.each(function(err, doc) {
      if (doc != null) {
            response.json({"message": doc.users[doc.turn]});
      } else {
          response.json({"message": undefined});
      }
   });
});

app.put('/game/users/turn', function(request, response){
  //this is the database call/logic/everything else
 var cursor = db.collection('game').find( { "_id": gameIDFind } );
   cursor.each(function(err, doc) {

      if (doc != null) {
          var nextTurn = doc.users[doc.turn + 1];
          db.collection('game').updateOne(
            { "_id" : gameIDFind },
            { $set: { "turn": doc.turn + 1} },
            function(err, results) {
              console.log(results);
              if(!err){
                response.json({"result": "success",
                                          "nextTurn": nextTurn});
              }
         });
      }

    });


});


/**********************************
*                                 *
*      CALLS FOR /USERS           *
*                                 *
***********************************/

// CREATE USER
app.post('/createUser', function(request, response){
  //this is the database call/logic/everything else
 var userinfo = request.body.userInfo;
 userinfo = {
      "_id" : "user5",
      "email": "jun@usc.edu",
      "wins" : 10,
      "losses": 50
   };
var cantCreate = false;

function createUser(){
  db.collection('user').insertOne(userinfo, function(err, resultUser) {
    var result = {};
      if(!err){
          result['userID'] = resultUser._id ;
              response.json(result);
      }else{
          response.json(result);
      }

  });

};


     console.log(userinfo.email);

    db.collection('user').find({"email":userinfo.email}).count(function(err, count) {

            var result = {};
            if(count >= 1){
                cantCreate = true;
            }
            if(cantCreate){
               result['result'] = "failed";
              response.json(result);
            }else{
              createUser();
            }
   });


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
  var userIDFind = request.body.userID;

    console.log(userIDFind);
     var cursor = db.collection('user').find( { "_id": userIDFind } );
     cursor.each(function(err, doc) {
        if (doc != null) {

              response.json({"userInfo": doc});
        } else {
        }
     });
});

// USER WINS
app.get('/user/wins', function(request, response){
  //this is the database call/logic/everything else
    var userID = request.body.userID;
  var cursor = db.collection('user').find( { "_id": userID } );
   cursor.each(function(err, doc) {
      if (doc != null) {

        response.json({"wins":doc.wins});
      } else {
      }
   });
 // response.json({"message": "This RETRIEVES user WINS"});
});

// USER LOSSES
app.get('/user/losses', function(request, response){
  //this is the database call/logic/everything else
  var userID = request.body.userID;
  var cursor = db.collection('user').find( { "_id": userID } );
   cursor.each(function(err, doc) {
      if (doc != null) {
        response.json({"losses":doc.losses});
      } else {
      }
   });
  //response.json({"message": "This RETRIEVES user LOSSES"});
});

// USER get GAME
app.get('/user/game', function(request, response){
  //this is the database call/logic/everything else
  var userID = request.body.userID;
  var cursor = db.collection('user').find( { "_id": userID } );
   cursor.each(function(err, doc) {
      if (doc != null) {

        response.json({"game":doc.game});
      } else {
      }
   });
 // response.json({"message": "This RETRIEVES user's current GAME"});
});

// USER update GAME
app.put('/user/game', function(request, response){
  //this is the database call/logic/everything else
  response.json({"message": "This UPDATES user's current GAME"});
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
MongoClient.connect('mongodb://localhost:27017', function(err, dbConnection) {
 db = dbConnection;
 var server = app.listen(process.env.PORT || 3000, function() {
      var port = server.address().port;
      console.log("Started server at port", port);
      console.log("Started at ", new Date().toUTCString());
 });
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
