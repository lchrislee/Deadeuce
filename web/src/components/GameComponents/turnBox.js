var React = require('react');
var $ = require('jQuery');

var TurnBox = React.createClass({
    getInitialState: function() {
        return{

        };
    },
render: function(){
    var out;
    console.log("currentTurnID: " + this.props.currentTurnID);
    console.log("userID: " + localStorage.userID);
    if (this.props.currentTurnID == localStorage.userID){
        out = <p>CURRENT TURN: {this.props.currentTurn} (YOU) <button onClick={this.props.refresh}>Refresh</button></p>
    }else{
        out = <p>CURRENT TURN: {this.props.currentTurn} <button onClick={this.props.refresh}>Refresh</button></p>
    }
    return(
        <div className="turnBox-wrapper">
            <div className="turnBox-header">
                {out}

            </div>
        </div>
      );
    }
});

module.exports = TurnBox;