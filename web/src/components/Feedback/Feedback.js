var React = require('react');
var FeedbackCorrect = require('./FeedbackCorrect.js');
var FeedbackWrong = require('./FeedbackWrong.js');

var Feedback = React.createClass({ 
  render: function() {
    return (
      <div className="feedback">
        <FeedbackWrong />
      </div>
     );
  },
});

module.exports = Feedback;