var React = require('react');
var $ = require('jQuery');

var GameFeed = React.createClass({
    getInitialState: function() {
        return{

        };
    },
render: function(){
    return(
            <div className="gamefeed firstRow">
            <div className="FeedHeader">
                 <div className="divFeedRow-header">
                     <p id="header" className="gamefeed-header">Available Games</p>
                 </div>
             </div>
             <div className="divFeedTable">

                <div className="contentHeader"> <p> Start Time    </p></div>
                <div className="contentHeader"> <p> Players </p></div>
                <div className="contentHeader_large"><p> Game Name</p></div>
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
      );
    }
});

module.exports = GameFeed;