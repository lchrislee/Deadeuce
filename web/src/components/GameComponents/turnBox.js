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
                <div className="turnBox-content">
                    <button type="button" className="turnButton"><p>DETECTIVE CHECKLIST</p></button>
                    <button type="button" className="turnButton suggestBtn"><p>SUGGEST</p></button>
                    <button type="button" className="turnButton"><p>ACCUSE</p></button>
                </div>
            </div>
        </div>
      );
    }
});

module.exports = TurnBox;