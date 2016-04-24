var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;

var GameFeed = require('../components/GameComponents/gameFeed.js');
var GameMap = require('../components/GameComponents/gameMap.js');
var TurnBox = require('../components/GameComponents/turnBox.js');
var Checklist = require('../components/checklist.js')
var SuggestAccuse = require('../components/Accuse/SuggestAccuse.js');

var GameHome = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        var gameID = sessionStorage.gameID;
        console.log("gameID: " + gameID);
        if (gameID === undefined){
            console.log("go home");
            this.context.router.push('home');
        }
        this.retrieveCheckList(gameID);
        this.findGameFeed(gameID);
        this.retrieveGameMap(gameID);
        return {
            "gameID": gameID,
            "userID": sessionStorage.userID,
            "gamePlayers": [],
            "currentTurnNickname": 'Michelle',
            "currentTurnID":'test',
            "gameWinner": undefined,
            "suspects": [],
            "weapons": [],
            "locations": [],
            "map":[],
            "gameFeed": [{accuser:"EVKitty", suspect:"George Tirebiter", weapon:"soda cans", location:"EVK", time:"4-13-16"},
                {accuser:"Tommy Trojan", suspect:"George Tirebiter", weapon:"free weight", location:"Lyon Center", time:"4-14-16"}]
        };
    },
    findGameFeed: function(gameID) {
        var input = {'gameID': gameID};
        var stringified = JSON.stringify(input);
        $.ajax({
            url: '/game/status',
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: stringified,

            success: function(data) {
                this.setState({
                    "gameFeed": data.feed,
                    "currentTurnNickname": data.turnPlayerNickname,
                    "currentTurnID": data.turnPlayerID,
                    "gameWinner":data.gameWinner
                });
            }.bind(this),
            error: function(xhr, status, err) {
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
                var checkList = data.checkList;
                console.log("retrieveCheckList " + data.checkList);
                this.setState({
                    "locations": checkList.locations,
                    "weapons": checkList.weapons,
                    "suspects": checkList.suspects
                });
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({
                    "serverStatus" : "Error in server request."
                });
            }.bind(this)
        });
    },

    retrieveGameMap: function(gameID) {
        var out = {"gameID":gameID};
        var stringified = JSON.stringify(out);
        $.ajax({
            url: '/game/map',
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: stringified,

            success: function(data) {
                console.log("retrieveGameMap locations: " + data.locations);
                this.setState({
                    "map": data.locations
                });
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({
                    "serverStatus" : "Error in server request."
                });
            }.bind(this)
        })
    },

    refreshGame: function(){
        this.retrieveCheckList(this.state.gameID);
        this.findGameFeed(this.state.gameID);
        this.retrieveGameMap(this.state.gameID);
    },

    render: function() {
        var suspects = this.state.suspects;
        var weapons = this.state.weapons;
        var locations = this.state.locations;
        return (
            <div>
                <div className="gameContainer">
                    <TurnBox currentTurnNickname = {this.state.currentTurnNickname} currentTurnID = {this.state.currentTurnID} refresh={this.refreshGame}/>
                    <GameFeed gameFeed = {this.state.gameFeed}/>
                    <SuggestAccuse suspects = {suspects} weapons = {weapons} locations = {locations} gameID = {this.state.gameID} userID = {this.state.userID}/>
                    <GameMap locations = {this.state.map}/>
                    <Checklist suspects = {suspects} weapons = {weapons} locations = {locations} />
                </div>
            </div>
        );
    }
});


module.exports = GameHome;