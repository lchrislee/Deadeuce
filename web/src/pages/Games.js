var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;
var AvailableGames = require('../components/GameComponents/availableGames');


var Games = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
      <div className="outercontainer">
        <div className="hero_img"> 
          <h1 className="center">What would you like to do?</h1>        
        </div>
        <div className="center">
         	<Link to="create_game" activeClassName="active" className="link">Create Game</Link>
         	<Link to="join_game" activeClassName="active" className="link">Join Game</Link>
          <Link to="game_home" activeClassName="active" className="link">Current Game</Link>
        </div>
        <br/>
        <div className="center">
        </div>
      </div>
     </div>
    );
  }
});


module.exports = Games;