var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;
var CreateGameForm = require('../components/CreateGame/CreateGameForm');

var CreateGame = React.createClass({
  render: function() {
    return (
      <div>
        <CreateGameForm />
      </div>
  );
  },
});

module.exports = CreateGame;