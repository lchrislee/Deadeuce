var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;
var JoinGameModalContent = require('../components/JoinGame/JoinGameModalContent.js')


var JoinGame = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
      <br/>
      <JoinGameModalContent />
      <Link to="game_home" activeClassName="active">Game Home</Link>
     </div>
    );
  }
});


module.exports = JoinGame;