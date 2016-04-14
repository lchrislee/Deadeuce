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
         <div className="outercontainer tallHeight">
             <div className="hero_img">
                 <h1 className="center">Come on in!</h1>
             </div>
             <div className="only_content">
                <h3> Choose a game from the list below:</h3>
                 <AvailableGames />
                 <form className="center" onSubmit={this.handleCreateGameSubmit}>
                     You are about to join this game. Would you like to continue?
                     <br/>
                     <br/>
                     <input type="submit" className="submit" name="submitJoinGame" value="Continue"/>
                 </form>
             </div>
         </div>
     </div>
    );
  }
});


module.exports = JoinGame;