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
     	<Link to="create_game" activeClassName="active">Create Game</Link>
     	<br/>
     	<Link to="join_game" activeClassName="active">Join Game</Link>
      <br/>
      <Link to="game_home" activeClassName="active">Current Game</Link>
     </div>
    );
  }
});


module.exports = Games;