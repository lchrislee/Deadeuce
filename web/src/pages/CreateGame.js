var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;


var CreateGame = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
     	<div>This is the Create Game page!</div>
      <br/>
      <Link to="game_home" activeClassName="active">Game Home</Link>
     </div>
    );
  }
});

module.exports = CreateGame;