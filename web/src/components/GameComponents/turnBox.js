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
    console.log("userID: " + sessionStorage.userID);
    if (this.props.currentTurnID == sessionStorage.userID){
        out = <p><span>CURRENT TURN: {this.props.currentTurnNickname}</span> <span>(YOU)</span> <button onClick={this.props.refresh}>Refresh</button></p>
    }else{
        out = <p><span>CURRENT TURN: {this.props.currentTurnNickname}</span> <button onClick={this.props.refresh}>Refresh</button></p>
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