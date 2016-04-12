var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;
var JoinGameModalContent = require('../components/JoinGame/JoinGameModalContent.js')
var AvailableGames = require('../components/GameComponents/availableGames.js')


var JoinGame = React.createClass({
  getInitialState: function() {
    return {


    };
  },
  render: function() {
    return (
     <div>
      <br/>
         <div className="outercontainer">
             <div className="hero_img">
                 <h1 className="center">Come on in!</h1>
             </div>
             <div className="primary_content">
                 <AvailableGames />
             </div>

             <div className="secondary_content">
                 <form className="center" onSubmit={this.handleCreateGameSubmit}>
                     You are about to join this game. Would you like to continue?
                     <br/>
                     <input type="submit" name="submitJoinGame"/>
                 </form>
             </div>
         </div>
     </div>
    );
  }
});


module.exports = JoinGame;