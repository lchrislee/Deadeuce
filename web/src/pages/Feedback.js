var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;
var Feedback = require('../components/Feedback/Feedback');


var Feedback = React.createClass({
  render: function() {
    return (
      <div>
      <Feedback />
      <Link to="game_home" activeClassName="active">Game Home</Link>
      </div>
  );
  },
});

module.exports = Feedback;