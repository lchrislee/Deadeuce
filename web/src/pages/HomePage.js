var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var ExampleModal = require('../components/CreateGame/CreateGameForm.js');
var HomePage = React.createClass({
    contextTypes: {
    router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
          "serverStatus": "Server hasn't sent anything",
          "modalIsVisible" : false
        };
    },
    toggleModal: function(e) {
        this.setState({
            "modalIsVisible" : !this.state.modalIsVisible
        });
    },
  render: function() {
    return (
     <div>
      <div className="outercontainer">
        <div className="hero_img"> 
          <h1 className="center">Shit... There has been a murder!</h1>        
        </div>
        <div className="primary_content">
          <h3> This is where primary content goes! </h3>
        </div>
        <div className="secondary_content">
          <h3> This is where secondary content goes! </h3>
        </div>
       	<div className="center">{this.state.serverStatus}</div>
        <div className="center">
          <button onClick={this.testSlice}>Ping the server</button>
          <button onClick={this.nextPage}>Go to next page</button>
          <button onClick={this.createGame}>Create New Game</button>
            {this.props.children}
        </div> 

      </div>  
     </div>
    );
  },

  nextPage: function(e) {
      this.context.router.push('secondPage');
  },
  createGame: function(e) {
      this.context.router.push('create_game');
  },
  testSlice: function() {
    var d = {
      sendTestToServer : "yo"
    };
    var stringified = JSON.stringify(d);
    $.ajax({
      url: "/test_slice",
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: stringified,
      success: function(data) {
        this.setState({
          "serverStatus" : data.test
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
  }
});


module.exports = HomePage;



