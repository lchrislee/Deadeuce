var React = require('react');
var Router = require('react-router');
var $ = require('jQuery');

var FeedbackWrong = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  detectivePad: function(){
    this.context.router.push('game_home/detective_pad');
  },
  gameHomeReturn: function(){
    this.context.router.push('game_home');
  },
  render: function() {
  return (
	  <div className="feedbackContent">
      <p className="feedback-header"><br/>SUGGESTION FEEDBACK</p>
      <p>No one had any clues to help you!</p>
          <br/>
      <button className="feedback-button" type="button" onClick={this.gameHomeReturn}>RETURN TO GAME</button>
	  </div>
	);
  },
});

module.exports = FeedbackWrong;