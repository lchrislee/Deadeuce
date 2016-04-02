var React = require('react');
var $ = require('jQuery');

var TurnBox = React.createClass({
    getInitialState: function() {
        return{

        };
    },
render: function(){
    return(
        <div className="turnBox-wrapper">
            <div className="turnBox-header">
                <p>CURRENT TURN: EVKitty (you)</p>
            </div>
        </div>
      );
    }
});

module.exports = TurnBox;