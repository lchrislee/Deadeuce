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
	      <h1> Create a New Game </h1>
        <button onClick={this.closeModal} className="close">X</button>
        <form>
          <table>
            <tr>
              <th>Game Name:</th>
              <th><input type="text" name="gameName" defaultValue="Example Name"/> </th>
            </tr>
            <tr>
              <th>Theme:</th>
              <th>
                <select name="theme" value="USC"> 
                  <option>USC</option>
                  <option>Capstone Class</option>
                </select>  
              </th>
            </tr>  
            <tr>
              <th>Players:</th>
              <th>
                <select name="numberOfPlayers" value="6"> 
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
              </th>
            </tr>
            <tr>
              <th>Privacy: </th>
              <th> 
                <input type="radio" name="private"> Private </input> <br/>
                <input type="radio" name="private"> Public </input>
              </th>
            </tr>
            <tr>
              <th>Character: </th>
              <th> 
                <select name="selectCharacter" value="EV Kitty"> 
                  <option>EV Kitty</option>
                  <option>Tommy Trojan</option>
                  <option>George Tirebiter</option>
                  <option>President Nikias</option>
                  <option>Pete Carroll</option>
                </select>
              </th>
            </tr>
          </table>
          </br>  
          <input type="submit" name="submitNewGame" />
        </form>  
	      
	    </div>
	);
  },
});

module.exports = ExampleModalContent;