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
            " Carroll"}, {"name":"EVK", "player":"Will Ferrell"},{"name":"THE ROW", "player":"President Nikias," +
            " Tommy Trojan"},{"name":"CAMPUS CENTER", "player":""}],
        "suspect": [
            {"name":"EVKitty"}, {"name":"George Tirebiter"}, {"name":"Will Ferrell"}, {"name":"Pete" + " Carroll"}, {"name":"President Nikias"}, {"name":"Tommy Trojan"}],
        "weapon": [
            {"name":"U-lock"}, {"name":"Tommy Trojan's Sword"}, {"name":"Empty soda cans"}, {"name":"Longboard"}, {"name":"Viterbi" + " classes"}, {"name":"Dining" + " hall food"}],
        "place": [
            {"name":"Traddies"}, {"name":"The 90"}, {"name":"Ground Zero"}, {"name":"Lyon Center"}, {"name":"The" +
            " Row"}, {"name":"Leavey Library"}, {"name":"Bovard"}, {"name":"EVK"}, {"name":"Campus Center"}]
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
        <Checklist suspect={this.state.suspect} weapon={this.state.weapon} place={this.state.place}/>
        <GameMap location= {this.state.locations} />
        <SuggestAccuse />
    </div>
    </div>
    );
  }
});


module.exports = GameHome;
