var React = require('react');
var $ = require('jQuery');

var CreateGameForm = React.createClass({ 
  contextTypes: {
   router: React.PropTypes.object.isRequired
   },
  getInitialState: function() {
    return {
      "gameName": undefined,
      "hostID": sessionStorage.userID
    }
  },
  handleCreateGameSubmit: function(e) {
    e.preventDefault();
    var testData = {
      hostID: this.state.hostID,
      gameName: this.state.gameName
    };

    var stringified = JSON.stringify(testData);
    $.ajax({
      url: '/createGame',
      type: 'POST',
      contentType: "application/json",
      dataType: 'json',
      data: stringified,
      success: function(data) {
        this.setState({
          "gameID": data.gameID
        },
        function(){
          sessionStorage.gameID = this.state.gameID;
          sessionStorage.nickName = data.nickName;
        });
        this.context.router.push('game_home');
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({
          "serverStatus" : "Error in server request."
        });
      }.bind(this)
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
          <div className="only_content" style={{padding: '0px',width: '100%', margin:'0px', marginTop: '30px',marginBottom: '30px',borderRadius: '0px', paddingBottom: '30px'}}>  


            <div className="create_game_form">
              <p style={{fontSize: '35px'}}>To Create a New Game</p>
              <p style={{fontSize: '18px'}}>Simply Enter the Game Name</p>
                <input type="text" name="gameName" onChange={this.gameNameChanged} placeholder="USC ITP460!" id="game_name" />
              <button name="submitNewGame" className="submit" hoverClassName="hover" onClick={this.handleCreateGameSubmit}>Submit</button>
              
              
            </div>
          </div>
      </div>
	);
  },
});

module.exports = CreateGameForm;