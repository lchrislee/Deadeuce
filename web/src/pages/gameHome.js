var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;


var GameHome = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
     	<div>This is the new games page!</div>
     	<Link to="/game_home/detective_pad" activeClassName="active">Detective Pad/Checklist</Link>
      <br/>
      <Link to="/game_home/exit_game" activeClassName="active">Exit Game</Link>
      <br/>
      <Link to="/game_home/review_clues" activeClassName="active">Review Clues</Link>
     </div>
    );
  }
});


module.exports = GameHome;