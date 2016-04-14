var React = require('react');
var $ = require('jQuery');
var GameMapContentBox = require('./availableGames.js');

var AllGames = React.createClass({
	getInitialState: function() {
        return {
        };
    },
    handleRetrieveAllGames: function(e) {
    e.preventDefault();
    $.ajax({
      url: '/game/all',
      type: 'GET',
      contentType: "application/json",
      success: function(response) {
        console.log(data);
        this.setState ({
            "gameList": data.gameList
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
    },
    render: function() {
        return (
            <div>
            <div>Here are all the games going on!</div>
                <div className="primary_content">
                    <div className="av_games firstRow">
                        <div className="FeedHeader">
                            <div className="gamefeed-header"> Available Games</div>
                            <div className="columnheader"> <p> Start time </p></div>
                            <div className="columnheader"> <p> Players </p></div>
                        </div>
                        <div className="av_gamesTable">
                            <div className="divFeedRow">
                                <div className="divFeedColumn1 column" >
                                    <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                                </div>
                                <div className="divFeedColumn2_small column">
                                    <p className="suggest-body"> demo </p>
                                </div>
                                <div className="divFeedColumn3 column"><p>1 players</p></div>
                                <div className="divFeedColumn3 column"><p>-00:00:30 </p></div>
                            </div>

                         </div>
                    </div>
                </div>
            </div>




    );
  }
});

module.exports = AllGames;