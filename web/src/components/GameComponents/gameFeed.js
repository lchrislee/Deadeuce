var React = require('react');
var $ = require('jQuery');
var GameFeedContent = require('./gameFeedContent.js')

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
                         <p id="header" className="gamefeed-header">Game Feed</p>
                     </div>
                 </div>
                 <div className="divFeedTable">
                     {this.props.gameFeed.map(function(gameStatus){
                         return <GameFeedContent data = {gameStatus} key={gameStatus.accuser + " " + gameStatus.time}></GameFeedContent>;
                     })}
                 </div>
             </div>

      );
    }
});

module.exports = GameFeed;