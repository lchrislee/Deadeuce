var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;
var CreateGame2 = require('../CreateGame/CreateGameForm')


var CreateGame = React.createClass({
  mixins: [
    require('react-onclickoutside')
  ],
  handleClickOutside: function(evt) {
    this.props.closeModal(evt);
  },
  closeModal: function(evt) {
    this.props.closeModal(evt);
  },
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