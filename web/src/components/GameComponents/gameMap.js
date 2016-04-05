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

    render: function(){


        //var data = [];
        //React.Children.map(this.props.location, function(loc){
        //    //code in here is applied to each element in this.props.locations
        //    data.push();
        //});
        return(
        <div className="gameMap-wrapper">
            {this.props.location.map(function(loc){
                return <GameMapContentBox data = {loc} key={loc.name}></GameMapContentBox>;
            })}
        </div>

      );
    }
});

module.exports = GameMap;