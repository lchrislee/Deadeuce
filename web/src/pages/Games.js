var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;


var Games = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
     	<div>This is the new games page!</div>
     	<Link to="create_game" activeClassName="active">Create Game</Link>
     	<br/>
     	<Link to="join_game" activeClassName="active">Join Game</Link>

     </div>
    );
  }
});


module.exports = Games;