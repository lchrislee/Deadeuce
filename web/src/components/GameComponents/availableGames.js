var React = require('react');
var $ = require('jQuery');

var AvailableGames = React.createClass({
    getInitialState: function() {
        return{

        };
    },
render: function(){
    return(
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
      );
    }
});

module.exports = AvailableGames;