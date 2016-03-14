var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');

var HomePage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
	getInitialState: function() {
    return {
      "serverStatus": "Server hasn't sent anythingdd"
    };
  },
  render: function() {
    return (
     <div>
     	<div>{this.state.serverStatus}</div>
      <button onClick={this.testSlice}>Ping the server</button>
      <button onClick={this.nextPage}>Go to next page!</button>
     </div>
    );
  },
  nextPage: function(e) {
    this.context.router.push('secondPage');
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

var GameFeed = React.createClass({
  getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
        <div>

            <div id="content" class="divFeedTable">
                <div class="divFeedRow">
                    <div class="divFeedColumn">
                        <div>
                            Game Feed
                        </div>
                        <div>
                            hhhh
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
});


module.exports = HomePage



