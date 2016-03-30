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
	      <h1> Pick a Character </h1>
        <button onClick={this.closeModal} className="close">X</button>
        <form>
          <table>
            <tr>
              <th>The murder has taken place. It is now up to you, 
                <select name="selectCharacter" value="EV Kitty"> 
                  <option>EV Kitty</option>
                  <option>Tommy Trojan</option>
                  <option>George Tirebiter</option>
                  <option>President Nikias</option>
                  <option>Pete Carroll</option>
                </select>
              and your friends to solve the crime! <br/> 
              </th>
            </tr>
            <tr>
              <th>
                <input type="submit" name="submitCharacter" value="invite friends >"/>
              </th>
            </tr>  
          </table>
        </form>  
	      
	    </div>
	);
  },
});

module.exports = CreateGame2;