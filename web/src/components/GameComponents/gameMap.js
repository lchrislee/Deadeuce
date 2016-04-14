var React = require('react');
var $ = require('jQuery');
var GameMapContentBox = require('./gameMapContentBox.js');

var GameMap = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        console.log( " I R HERE");
        var gameID = "abcdeg";
        this.retrieveGameMap(gameID);
        return {
            gameID: gameID,
            gameName: "",
            "locations": []
        };
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
                this.setState({
                    "locations": data.locations
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
                console.log(xhr);
                this.setState({
                    "serverStatus" : "Error in server request."
                });
            }.bind(this)
        })
    },

    render: function(){
        //var data = [];
        //React.Children.map(this.props.location, function(loc){
        //    //code in here is applied to each element in this.props.locations
        //    data.push();
        //});
        return(
        <div className="gameMap-wrapper">
            {this.state.locations.map(function(loc){
                return <GameMapContentBox data = {loc} key={loc.name}></GameMapContentBox>;
            })}
        </div>

      );
    }
});

module.exports = GameMap;