var React = require('react');
var $ = require('jQuery');

var AllGames = React.createClass({
	getInitialState: function() {
        return {
        };
    },
  //   handleRetrieveAllGames: function(e) {
  //   e.preventDefault();
  //   var output = JSON.stringify({gameID:id});
  //   $.ajax({
  //     url: '/RetrieveGames',
  //     // we don't have a URL yet so this is just a placeholder
  //     type: 'GET',
  //     contentType: "application/json",
  //     data: output,
  //     success: function(response) {
  //       //{joinSuccess:t/f, nextTurn: user_id}
  //       console.log(response.xxx);
  //       console.log(response.yyy);
  //       if (response.yyy){
  //         //do something
  //         //maybe load the next page?
  //       }else{
  //         // we don goofed
  //       }
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       console.log(err);
  //       console.log(xhr);
  //       this.setState({
  //         "serverStatus" : "Error in server request."
  //       });
  //     }.bind(this)
  //   });
  //   var evt = "";
  //   // ^^ is this needed?
  //   },
    render: function() {
        return (
            <div>
            <div>Here are all the games going on!</div>

            <div className="gamefeed firstRow">
                 <div className="FeedHeader">
                     <div className="gamefeed-header"> Available Games</div>
                     <div className="divFeedColumn3"> <p> Players </p></div>
                     <div className="divFeedColumn3"> <p> Start time </p></div>
                 </div>
                 <div className="divFeedTable">
                     <div className="divFeedRow">
                         <div className="divFeedColumn1 column" >
                             <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                         </div>
                         <div className="divFeedColumn2_small column">
                             <p className="suggest-body"> Deserters</p>
                         </div>
                         <div className="divFeedColumn3 column"><p>5 players</p></div>
                         <div className="divFeedColumn3 column"><p>00:05:56 </p></div>
                     </div>

                     <div className="divFeedRow">
                         <div className="divFeedColumn1 column" >
                             <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                         </div>
                         <div className="divFeedColumn2_small column">
                             <p className="suggest-body"> Capstone group</p>
                         </div>
                         <div className="divFeedColumn3 column"><p>9 players </p></div>
                         <div className="divFeedColumn3 column"><p>02:34:32 </p></div>
                     </div>

                     <div className="divFeedRow">
                         <div className="divFeedColumn1 column" >
                             <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                         </div>
                         <div className="divFeedColumn2_small column">
                             <p className="suggest-body"> OG Deadeuce Crew</p>
                         </div>
                         <div className="divFeedColumn3 column"><p>7 players</p></div>
                         <div className="divFeedColumn3 column"><p>73:23:09 </p></div>
                     </div>
                 </div>
             </div>
         </div>
    );
  }
});

module.exports = AllGames;