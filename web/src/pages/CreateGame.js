var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;
var CreateGameForm = require('../components/CreateGame/CreateGameForm.js');

var CreateGame = React.createClass({
  render: function() {
    return (
      <div>
        <CreateGameForm />
       <br/> 
        <Link to="game_home" activeClassName="active">Game Home</Link>
      </div>
  );
  },
});

module.exports = CreateGame;