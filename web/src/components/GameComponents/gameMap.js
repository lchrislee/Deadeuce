var React = require('react');
var $ = require('jQuery');
var GameMapContentBox = require('./gameMapContentBox.js');

var GameMap = React.createClass({
    getInitialState: function() {
        return{
            "gameID": undefined,
            "userID": 'user1',
            "gamePlayers": [],
            "locations": [],
            "playerLocations": [],
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
    assignPlayerLocations: function(e){
        e.preventDefault();

        for (i = 0; i < 6; i++) {
            var locationIndex = Math.random()*9;
            this.playerLocations[i] = {
                "player": gamePlayers[i],
                "location": this.locations[locationIndex]
            };
        }
    },


    render: function(){
    return(
        <div className="gameMap-wrapper">
            <GameMapContentBox this.playerLocations/>
            <GameMapContentBox />
            <GameMapContentBox />
            <GameMapContentBox />
            <GameMapContentBox />
            <GameMapContentBox />
            <GameMapContentBox />
            <GameMapContentBox />
            <GameMapContentBox />
        </div>

      );
    }
});

module.exports = GameMap;