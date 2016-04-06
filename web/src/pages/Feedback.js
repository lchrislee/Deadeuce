var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;
var FeedbackPage = require('../components/Feedback/Feedback.js');


var Feedback = React.createClass({
  render: function() {
    return (
      <div>
      <FeedbackPage />
      <Link to="game_home" activeClassName="active">Game Home</Link>
      </div>
  );
  },
});

module.exports = Feedback;