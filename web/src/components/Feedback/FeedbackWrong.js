var React = require('react');
var $ = require('jQuery');

var FeedbackWrong = React.createClass({ 
  render: function() {
    return (
	    <div className="feedbackContent">
        <p>No one had any clues to help you!</p>
	    </div>
	);
  },
});

module.exports = FeedbackWrong;