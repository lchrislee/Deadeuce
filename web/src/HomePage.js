var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jQuery');

var HomePage = React.createClass({
	getInitialState: function() {
    return {
      "serverStatus": "Server hasn't sent anything"
    };
  },
  render: function() {
    return (
     <div>
     	<div>{this.state.serverStatus}</div>
      <button onClick={this.testSlice}>Ping the server</button>
     </div>
    );
  },
  testSlice: function() {
    var d = {
      sendTestToServer : "yo"
    };
    
    $.ajax({
      url: "/test_slice",
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: d,
      success: function(data) {
        console.log(data);
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