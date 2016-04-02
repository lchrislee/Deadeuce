var React = require('react');

var JoinGameModalContent = React.createClass({ 
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
	      <form>
          You are about to join this game. Would you like to continue?
          <input type="submit" name="submitJoinGame"/> 
        </form> 
	    </div>
	);
  },
});

module.exports = JoinGameModalContent;