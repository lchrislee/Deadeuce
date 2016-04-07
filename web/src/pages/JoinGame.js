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
     </div>
    );
  }
});


module.exports = JoinGame;