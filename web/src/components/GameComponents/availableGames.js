var React = require('react');
var $ = require('jQuery');
var AvailableGamesContent = require('./availableGamesContent.js')

var AvailableGames = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return{

        };
    },
render: function(){
    return(

        <div className="av_games firstRow">
            <div className="FeedHeader">
                <div className="gamefeed-header"> Available Games</div>
                <div className="columnheader"> <p> Players </p></div>
                <div className="columnheader2"> <p> Games </p></div>
            </div>
             <div className="av_gamesTable">
                 {this.props.allGames.map(function(games){
                     return <AvailableGamesContent data = {games} key={games.gameName}></AvailableGamesContent>;
                 })}
             </div>
        </div>

      );
    }

});

module.exports = AvailableGames;