var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;


var JoinGame = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
      <div>This is the join game page!</div>
      <br/>
      <Link to="game_home" activeClassName="active">Game Home</Link>
      
      

     </div>
    );
  }
});


module.exports = JoinGame;