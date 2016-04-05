var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var ExampleModal = require('../components/CreateGame/CreateGameForm.js');
var Picture = require('../components/Picture.js');

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
      <div>This is the Deadeuce homepage!</div>
     	<div>{this.state.serverStatus}</div>
      <button onClick={this.testSlice}>Ping the server!</button>
      <button onClick={this.nextPage}>Go to next page!</button>
      <button onClick={this.createGame}>Create New Game!</button>
        {this.props.children}
        <Picture></Picture>

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



