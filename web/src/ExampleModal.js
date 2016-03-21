var React = require('react');
var ExampleModalContent = require('./ExampleModalContent.js');

var ExampleModal = React.createClass({ 
  closeModal: function(evt) {
    this.props.closeModal(evt);
  },
  render: function() {
    return (
      <div className="example-modal-wrapper">
        <ExampleModalContent closeModal={this.closeModal} />
      </div>
     );
  },
});

module.exports = ExampleModal;