var React = require('react');

var FeedbackCorrect = React.createClass({ 
  render: function() {
    return (
	    <div className="feedbackContent">
        <p>User had this clue for you:
        <br/>
        <ul>
          <li>Whatever clue</li>
        </ul>
        </p>
	    </div>
	);
  },
});

module.exports = FeedbackCorrect;