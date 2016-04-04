var React = require('react');
var $ = require('jQuery');
var GameMapContentBox = require('./gameMapContentBox.js');

var GameMap = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return{
            "locationsSorted": [],
            "playerLocations": [],
            "data": []
        };
    },
    assignPlayerLocations: function(e){
        e.preventDefault();

        for (i = 0; i < 6; i++) {
            var locationIndex = Math.random()*9;
            this.state.playerLocations[i] = {
                "player": this.props.gamePlayers[i],
                "location": this.props.locations[locationIndex]
            }
        };
    },

    sortLocations: function(e){
        e.preventDefault();

        for (i = 0; i < 9; i++) {
            for(k=0; k<6; k++){
                if(this.props.locations[i] == this.state.playerLocations.location[k])
                {
                    this.state.locationsSorted[i] += this.state.playerLocations.player[k];
                }
            }
        };

    },

    render: function(){
        this.assignPlayerLocations();
        this.sortLocations();

        for (i = 0; i < 9; i++) {
            var header = this.props.location[i];
            var playersThere = this.locationsSorted[i];
            this.data = [header, playersThere];
            return(
                data[i].header = header,
                data[i].playersThere = playersThere
            )
        }

        return(
        <div className="gameMap-wrapper">

            {for (i = 0; i < 9; i++) {
                var header = this.props.location[i];
                var playersThere = this.locationsSorted[i];
                var data = [header, playersThere];
                return(
                <GameMapContentBox data = {data} />
                ),

            }}
        </div>

      );
    }
});

module.exports = GameMap;