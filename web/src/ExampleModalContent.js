var React = require('react');

var ExampleModalContent = React.createClass({ 
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
	      <div>This is an example Modal! Close it by clicking anywhere outside of the modal or by clicking the button below!</div>
	      <button onClick={this.closeModal}>Close Modal</button>
	    </div>
	);
  },
});

module.exports = ExampleModalContent;