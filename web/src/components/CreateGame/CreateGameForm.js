var React = require('react');
var $ = require('jQuery');

var CreateGameForm = React.createClass({ 
  contextTypes: {
   router: React.PropTypes.object.isRequired
   },
  getInitialState: function() {
    return {
      "gameID": undefined,
      "theme": "USC",
      "numberOfPlayers": 6,
      "gameName": "Example Name",
      "hostID": '12345429579572'
    }
  },
  handleCreateGameSubmit: function(e) {
    e.preventDefault();
    var testData = {
      hostID: this.state.hostID,
      gameName: this.state.gameName
    };
    //TEst
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
        if (data.gameID === undefined) {
          alert("LERT LERT LERT");
          return;
        }
        this.setState({
          "gameID": data.gameID
        });
        this.context.router.push('game_home');
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        console.log(xhr);
        this.setState({
          "serverStatus" : "Error in server request."
        });
      }.bind(this)
    });
  },
  themeChanged: function(e){
    this.setState({
      "theme":e.target.value
    });
  },
  numberOfPlayersChanged: function(e){
    this.setState({
      "numberOfPlayers":e.target.value
    });
  },
  gameNameChanged: function(e){
    this.setState({
      "gameName":e.target.value
    });
  },
  render: function() {
    return (
	    <div>
          <div className="primary_content">  
            <form onSubmit={this.handleCreateGameSubmit}>
              <table>
                <tr>
                  <th>Game Name:</th>
                  <th><input type="text" name="gameName" onChange={this.gameNameChanged} defaultValue="Example Name"/> </th>
                </tr>
                <tr>
                  <th>Theme:</th>
                  <th>
                    <select name="theme" value={this.state.theme} onChange={this.themeChanged}> 
                      <option>USC</option>
                      <option>Capstone Class</option>
                    </select>  
                  </th>
                </tr>  
                <tr>
                  <th>Players:</th>
                  <th>
                    <select name="numberOfPlayers" value={this.state.numberOfPlayers} onChange={this.numberOfPlayersChanged}> 
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
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
                      <option>Will Ferrell</option>
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
              
              </table>
              <input type="submit" name="submitNewGame" className="submit" hoverClassName="hover"/>
            </form>
          </div>
          <div className="secondary_content">
            Story or stats can go here
          </div>
        </div>
	);
  },
});

module.exports = CreateGameForm;