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
    return {
        "gameID": undefined,
        "userID": 'user1',
        "gamePlayers": [],
        "locations": [
            {"name":"LYON CENTER", "player":""},{"name":"LEAVEY LIBRARY", "player":"EVKitty, George Tirebiter"},{"name":"TRADDIES", "player":""},
            {"name":"GROUND ZERO", "player":""},{"name":"The 90", "player":""},{"name":"BOVARD", "player":"Pete" +
            " Carroll"},
            {"name":"EVK", "player":"Will Ferrell"},{"name":"THE ROW", "player":"President Nikias, Tommy Trojan"},{"name":"CAMPUS CENTER", "player":""}]

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

    retrieveGameLocations: function(e) {
        e.preventDefault();

        var stringified = JSON.stringify(gameID);
        $.ajax({
            url: '/game/checklist',
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            data: stringified,

            success: function(data) {
                console.log(data);
                console.log(data.checklist);
                this.setState({
                    "locations": data.checklist.locations
                });
                assignPlayerLocations();
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
  render: function() {
    return (
     <div>
     <div className="gameContainer">
        <TurnBox />
        <GameMap location= {this.state.locations} /> 
        <SuggestAccuse />
        <Checklist />
        
    </div>
    </div>
    );
  }
});


module.exports = GameHome;
