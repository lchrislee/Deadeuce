var React = require('react');
var $ = require('jQuery');

var FeedbackWrong = React.createClass({ 
  render: function() {
    return (
	    <div className="feedbackContent">
            <p className="feedback-header"><br/>SUGGESTION FEEDBACK</p>
            <p>No one had any clues to help you!</p>

            <button className="feedback-button" type="button">DETECTIVE CHECKLIST</button>
            <br/><br/>
            <button className="feedback-button" type="button">RETURN TO GAME</button>
	    </div>
	);
  },
});

module.exports = FeedbackWrong;