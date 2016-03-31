var React = require('react');
var SAContent = require('./SAContent.js');

var SuggestAccuse = React.createClass({ 
  closeModal: function(evt) {
    this.props.closeModal(evt);
  },
  render: function() {
    return (
      <div className="example-modal-wrapper">
        <SAContent closeModal={this.closeModal} />
      </div>
     );
  },
});

module.exports = SuggestAccuse;