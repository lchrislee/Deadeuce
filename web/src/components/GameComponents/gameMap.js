var React = require('react');
var $ = require('jQuery');
var GameMapContentBox = require('./gameMapContentBox.js');

var GameMap = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    render: function(){
        return(
        <div className="gameMap-wrapper">
            {this.props.locations.map(function(loc, index){
                console.log(index);
                console.log(loc);
                var idInject = "img" + index;
                return <GameMapContentBox num={idInject} data = {loc} key={loc.name}></GameMapContentBox>;
            })}
        </div>

      );
    }
});

module.exports = GameMap;