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

         <div className="gamefeed firstRow">
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
                         <p className="suggest-body"><span className="suggested">EVKitty</span> suggested <span className="suggested">George Tirebiter</span> with the <span className="suggested">empty beer cans</span> at <span className="suggested">Leavey Library</span>.</p>
                     </div>
                     <div className="divFeedColumn3 column">5 minutes ago </div>
                 </div>

                 <div className="divFeedRow">
                     <div className="divFeedColumn1 column" >
                         <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                     </div>

                     <div className="divFeedColumn2 column">
                         <p className="suggest-body"><span className="suggested">Tommy Trojan</span> suggested <span className="suggested">George Tirebiter</span> with the <span className="suggested">Viterbi classes</span> at <span className="suggested">Leavey Library</span>.</p>
                     </div>
                     <div className="divFeedColumn3 column">5 minutes ago </div>
                 </div>

                 <div className="divFeedRow lastRow">
                     <div className="divFeedColumn1 column" >
                         <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                     </div>

                     <div className="divFeedColumn2 column">
                         <p className="suggest-body"><span className="suggested">President Nikias</span> suggested <span className="suggested">Pete Carroll</span> with the <span className="suggested">U-lock</span> at <span className="suggested">The Row</span>.</p>
                     </div>
                     <div className="divFeedColumn3 column">5 minutes ago </div>
                 </div>
             </div>
         </div>

         <div className="gameMap">
                 <div className="mapRow-header firstRow">
                     <div className="mapColumn" >
                         <p className="mapHeader">LYON CENTER</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapHeader">LEAVEY LIBRARY</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapHeader">TRADDIES</p>
                     </div>
                 </div>

                 <div className="mapRow-content">
                     <div className="mapColumn" >
                         <p className="mapContent"> - </p>
                     </div>
                     <div className="mapColumn mapContentBorder" >
                         <p className="mapContent"> EVKitty <br/> George Tirebiter</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapContent"> - </p>
                     </div>
                 </div>

                 <div className="mapRow-header">
                     <div className="mapColumn" >
                         <p className="mapHeader ">GROUND ZERO</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapHeader ">THE 90</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapHeader ">BOVARD</p>
                     </div>
                 </div>

                 <div className="mapRow-content">
                     <div className="mapColumn" >
                         <p className="mapContent"> - </p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapContent mapContentBorder"> - </p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapContent"> Pete Carroll </p>
                     </div>
                 </div>

                 <div className="mapRow-header">
                     <div className="mapColumn" >
                         <p className="mapHeader">EVK</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapHeader">THE ROW</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapHeader">CAMPUS CENTER</p>
                     </div>
                 </div>

                 <div className="mapRow-content lastRow">
                     <div className="mapColumn" >
                         <p className="mapContent"> Will Ferrell</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapContent mapContentBorder"> President Nikias <br/> Tommy Trojan</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapContent"> - </p>
                     </div>
                 </div>
         </div>
        <div className="turnBox-wrapper">
                 <div className="turnBox-header">
                     <p>CURRENT TURN: EVKitty (you)</p>
                     <div className="turnBox-content">
                         <div className="turnButton"><p>DETECTIVE CHECKLIST</p></div>
                         <div className="turnButton"><p>SUGGEST</p></div>
                         <div className="turnButton"><p>ACCUSE</p></div>
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



