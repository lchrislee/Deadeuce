var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;
var CreateGame2 = require('../components/CreateGame2')


var CreateGame = React.createClass({
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
          <tbody>
            <tr>
              <th>The murder has taken place. It is now up to you, 
                <select name="selectCharacter" defaultValue="EV Kitty"> 
                  <option>EV Kitty</option>
                  <option>Tommy Trojan</option>
                  <option>George Tirebiter</option>
                  <option>President Nikias</option>
                  <option>Pete Carroll</option>
                </select>
              and your friends to solve the crime! <br/> 
              </th>
            </tr>
            </tbody>
            </table>
                <input type="submit" name="submitCharacter" defaultValue="invite friends" />
        </form>  
      <Link to="game_home" activeClassName="active">Game Home</Link>
      </div>
  );
  },
});

module.exports = CreateGame;