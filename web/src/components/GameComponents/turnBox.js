var React = require('react');
var $ = require('jQuery');

var TurnBox = React.createClass({
    getInitialState: function() {
        return{
            nickName: sessionStorage.nickName
        };
    },
render: function(){
    var out;
    // console.log("currentTurnID: " + this.props.currentTurnID);
    // console.log("userID: " + sessionStorage.userID);
    // console.log("nickname: " + sessionStorage.nickName);
    if (this.props.currentTurnID == sessionStorage.userID){
        out = <p><span>CURRENT TURN: {this.props.currentTurnNickname}</span> <span>(YOU)</span></p>
    }else{
        out = <p><span>CURRENT TURN: {this.props.currentTurnNickname}</span> <button onClick={this.props.refresh}>Refresh</button></p>
    }
    return(
        <div className="turnBox-wrapper">
            <div className="turnBox-header">
                <div className="current-turn">
                    {out}
                </div>
                <div className="user-nickname">
                    YOU ARE: {this.state.nickName}
                </div>
            </div>

        </div>
      );
    }
});

module.exports = TurnBox;