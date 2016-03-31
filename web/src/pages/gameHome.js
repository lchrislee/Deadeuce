var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;


var GameHome = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>

      <div>This is the new games page!</div>
      <Link to="/game_home/detective_pad" activeClassName="active">Detective Pad/Checklist</Link>
      <br/>
      <Link to="/game_home/exit_game" activeClassName="active">Exit Game</Link>
      <br/>
      <Link to="/game_home/review_clues" activeClassName="active">Review Clues</Link>

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
                         <button type="button" className="turnButton"><p>DETECTIVE CHECKLIST</p></button>
                         <button type="button" className="turnButton suggestBtn"><p>SUGGEST</p></button>
                         <button type="button" className="turnButton"><p>ACCUSE</p></button>
                     </div>
                 </div>
        </div>
     </div>
    );
  }
});


module.exports = GameHome;