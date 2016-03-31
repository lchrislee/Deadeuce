var React = require('react');

var FeedbackContent = React.createClass({ 
  mixins: [
    require('react-onclickoutside')
  ],
  handleClickOutside: function(evt) {
    this.props.closeModal(evt);
  },
  closeModal: function(evt) {
    this.props.closeModal(evt);
  },
  render: function() {
    return (
	    <div className="example-modal">
	      <div>This is your feedback!</div>
	      <button onClick={this.closeModal}>Close Modal</button>
	    </div>
	);
  },
});

module.exports = FeedbackContent;