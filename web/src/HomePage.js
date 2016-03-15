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

         <div className="gamefeed">
             <div className="FeedHeader">
                 <div className="divFeedRow-header">
                     <p id="header" className="gamefeed-header">Game Feed</p>
                 </div>
             </div>
             <div className="divFeedTable">
                 <div className="divFeedRow">
                     <div className="divFeedColumn1 column" >
                         <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                     </div>
                     <div className="divFeedColumn2 column">
                         <p className="suggest-body"><span className="suggested">EVKitty</span> suggested <span className="suggested">George Tirebiter</span> with the <span className="suggested">empty beer cans</span> at <span className="suggested">Lyon Center</span>.</p>
                     </div>
                     <div className="divFeedColumn3 column">5 minutes ago </div>
                 </div>

                 <div className="divFeedRow">
                     <div className="divFeedColumn1 column" >
                         <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                     </div>

                     <div className="divFeedColumn2 column">
                         <p className="suggest-body"><span className="suggested">EVKitty</span> suggested <span className="suggested">George Tirebiter</span> with the <span className="suggested">empty beer cans</span> at <span className="suggested">Lyon Center</span>.</p>
                     </div>
                     <div className="divFeedColumn3 column">5 minutes ago </div>
                 </div>

                 <div className="divFeedRow">
                     <div className="divFeedColumn1 column" >
                         <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                     </div>

                     <div className="divFeedColumn2 column">
                         <p className="suggest-body"><span className="suggested">EVKitty</span> suggested <span className="suggested">George Tirebiter</span> with the <span className="suggested">empty beer cans</span> at <span className="suggested">Lyon Center</span>.</p>
                     </div>
                     <div className="divFeedColumn3 column">5 minutes ago </div>
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



