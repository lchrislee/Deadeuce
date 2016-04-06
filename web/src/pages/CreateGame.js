var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;
<<<<<<< HEAD
var CreateGameForm = require('../components/CreateGame/CreateGameForm');

=======
var CreateGameForm = require('../components/CreateGame/CreateGameForm.js');
>>>>>>> d8608f73ccce6fab131b858c094e2c009e9b1358

var CreateGame = React.createClass({
  render: function() {
    return (
      <div>
        <CreateGameForm />
        <Link to="game_home" activeClassName="active">Game Home</Link>
      </div>
  );
  },
});

module.exports = CreateGame;