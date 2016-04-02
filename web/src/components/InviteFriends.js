var React = require('react');

var CreateGame2 = React.createClass({ 
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
	      <h1> Invite Friends </h1>
        <button onClick={this.closeModal} className="close">X</button>
        <form>
          The murder has taken place. It is now up to you, 
                <select name="selectCharacter" > 
                  <option>EV Kitty</option>
                  <option>Tommy Trojan</option>
                  <option>George Tirebiter</option>
                  <option>President Nikias</option>
                  <option>Pete Carroll</option>
                </select>
              and your friends to solve the crime! <br/> 
                <input type="submit" name="submitCharacter" value="invite friends >"/>
        </form>       
	    </div>
	);
  },
});

module.exports = CreateGame2;