var React = require('react');
var FeedbackContent = require('./FeedbackContent.js');

var ExampleModal = React.createClass({ 
  closeModal: function(evt) {
    this.props.closeModal(evt);
  },
  render: function() {
    return (
      <div className="example-modal-wrapper">
        <FeedbackContent closeModal={this.closeModal} />
      </div>
     );
  },
});

module.exports = Feedback;