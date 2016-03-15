var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');

var HomePage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
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
      <button onClick={this.nextPage}>Go to next page!</button>

         <div id="gamefeed">

             <div id="content" className="divFeedTable">
                 <div className="divFeedRow">
                     <div className="divFeedColumn">
                         <div>
                            <p class="Gamefeed-Header">Game Feed</p>
                         </div>
                         <div>
                             <img src="../assets/icons/fingerprint.svg" alt="fingerprint icon" class="suggest-icon" />
                             <p class="suggest-body"><span className="suggested">EVKitty</span> suggested <span className="suggested">George Tirebiter</span> with the <span className="suggested">empty beer cans</span> at <span className="suggested">Lyon Center</span>.</p>
                         </div>
                         <div>
                             <p class="suggest-body"><span className="suggested">EVKitty</span> suggested <span className="suggested">George Tirebiter</span> with the <span className="suggested">empty beer cans</span> at <span className="suggested">Lyon Center</span>.</p>
                         </div>
                         <div>
                             <p class="suggest-body"> <span className="suggested">EVKitty</span> suggested <span className="suggested">George Tirebiter</span> with the <span className="suggested">empty beer cans</span> at <span className="suggested">Lyon Center</span>.</p>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
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


module.exports = HomePage;



