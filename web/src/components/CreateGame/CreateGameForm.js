var React = require('react');
var $ = require('jQuery');

var CreateGameForm = React.createClass({ 
  mixins: [
    require('react-onclickoutside')
  ],
  getInitialState: function() {
    return {
      "temp": undefined
    }
  },
  handleCreateGameSubmit: function(e) {
    e.preventDefault();

    var testData = {
      hostID: '12345429579572'
    };
    var stringified = JSON.stringify(testData);
    $.ajax({
      url: '/createGame',
      type: 'POST',
      contentType: "application/json",
      dataType: 'json',
      data: stringified,
      // transformRequest: function(obj){
      //   var str = [];
      //   for(var p in obj){
      //     str.push(encodeURLComponent(p) + '=' + encodeURLComponent(obj[p]));
      //   }
      //   return str.join('&');
      // },
      success: function(data) {
        console.log(data);
        console.log(data.gameID);
        this.setState({
          "temp": data.gameID
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        console.log(xhr);
        this.setState({
          "serverStatus" : "Error in server request."
        });
      }.bind(this)
    });
    var evt = "";
    this.closeModal(evt);
  },
  render: function() {
    return (
	    <div className="example-modal">
	      <h1> Create a New Game </h1>
        <button onClick={this.closeModal} className="close">X</button>
        <form onSubmit={this.handleCreateGameSubmit}>
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
                <select name="selectCharacter"> 
                  <option>EV Kitty</option>
                  <option>Tommy Trojan</option>
                  <option>George Tirebiter</option>
                  <option>President Nikias</option>
                  <option>Pete Carroll</option>
                </select>
              </th>
            </tr>
          </table>
          <input type="submit" name="submitNewGame" />
        </form>  
	    </div>
	);
  },
});

module.exports = CreateGameForm;