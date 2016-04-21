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
          <div className="primary_content">  


            <div className="create_game_form">
              <label>
                Game Name: 
                <input type="text" style={{height: '27px'}} name="gameName" onChange={this.gameNameChanged} placeholder="Example Name" id="game_name" />
                <button name="submitNewGame" className="submit" hoverClassName="hover" onClick={this.handleCreateGameSubmit}>Submit</button>
              </label>
              
              
            </div>
          </div>
          <div className="secondary_content">
            Story or stats can go here
          </div>
      </div>
	);
  },
});

module.exports = CreateGameForm;