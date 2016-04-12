var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;

var GameFeed = require('../components/GameComponents/gameFeed.js');
var GameMap = require('../components/GameComponents/gameMap.js');
var TurnBox = require('../components/GameComponents/turnBox.js');
var Checklist = require('../components/checklist.js')
var SuggestAccuse = require('../components/Accuse/SuggestAccuse.js');
var GameMapContentBox = require('../components/GameComponents/gameMapContentBox.js')
var GameMap = require('../components/GameComponents/gameMap.js')

var GameHome = React.createClass({
	getInitialState: function() {
    var gameID = "abcdeg";
    this.retrieveCheckList(gameID);
    return {
        "gameID": gameID,
        "userID": 'user1',
        "gamePlayers": [],
        "currentTurn": 'Michelle',
        "suspects": [],
        "weapons": [],
        "locations": []
    };
  },
    findPlayerGame: function(e) {
        e.preventDefault();

        var stringified = JSON.stringify(userID);
        $.ajax({
            url: '/user/game',
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            data: stringified,

            success: function(data) {
                console.log(data);
                console.log(data.gameID);
                this.setState({
                    "gameID": data.gameID
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
                console.log(xhr);
                this.setState({
                    "serverStatus" : "Error in server request."
                });
            }.bind(this)
        });
    },

    retrieveGamePlayers: function(e) {
        e.preventDefault();

        var stringified = JSON.stringify(gameID);
        $.ajax({
            url: '/game/users',
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            data: stringified,

            success: function(data) {
                console.log(data);
                console.log(data.users);
                this.setState({
                    "gamePlayers": data.users
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
                console.log(xhr);
                this.setState({
                    "serverStatus" : "Error in server request."
                });
            }.bind(this)
        });
    },

    retrieveCheckList: function(gameID) {
      var out = {"gameID":gameID};
        var stringified = JSON.stringify(out);
        $.ajax({
            url: '/game/checklist',
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: stringified,

            success: function(data) {
                console.log(data);
                var checkList = data.checkList;
                this.setState({
                    "locations": checkList.locations,
                    "weapons": checkList.weapons,
                    "suspects": checkList.suspects
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
                console.log(xhr);
                this.setState({
                    "serverStatus" : "Error in server request."
                });
            }.bind(this)
        });
    },

    retrieveCurrentPlayer: function(e) {
        e.preventDefault();

        var stringified = JSON.stringify(gameID);
        $.ajax({
            url: '/game/users/turn',
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            data: stringified,

            success: function(data) {
                console.log(data);
                console.log(data.turnBox);
                this.setState({
                    "currentTurn": data.turnBox
                });
            },
            error: function(xhr, status, err) {
                console.log(err);
                console.log(xhr);
                this.setState({
                    "serverStatus": "Error in server request."
                });
            }.bind(this)
        });
    },

  render: function() {
    var suspects = this.state.suspects;
    var weapons = this.state.weapons;
    var locations = this.state.locations;
    return (
     <div>
     <div className="gameContainer">
        <TurnBox currentTurn = {this.state.currentTurn} />
        <GameMap />
        <SuggestAccuse suspects = {suspects} weapons = {weapons} locations = {locations} />
        <Checklist suspects = {suspects} weapons = {weapons} locations = {locations} />
    </div>
    </div>
    );
  }
});


module.exports = GameHome;
