var React = require('react');
var $ = require('jQuery');
var GameMapContentBox = require('./gameMapContentBox.js');

var GameMap = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return{

        };
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
            <GameMapContentBox />
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