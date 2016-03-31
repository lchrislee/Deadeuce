var React = require('react');
var JoinGameModalContent = require('./JoinGameModalContent.js');
var CharacterSelect = require('./CreateGame2.js')

var JoinGameModal = React.createClass({ 
  closeModal: function(evt) {
    this.props.closeModal(evt);
  },
  render: function() {
    return (
      <div className="example-modal-wrapper">
        <JoinGameModalContent closeModal={this.closeModal} />
      </div>
     );
  },
});

module.exports = JoinGameModal;