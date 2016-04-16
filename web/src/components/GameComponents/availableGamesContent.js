
var React = require('react');
var $ = require('jQuery');

var AvailableGamesContent = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function(){
        return{

        };
    },
    render: function(){

        return(
            <div className="divFeedRow">
                <div className="divFeedColumn1 column" >
                    <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                </div>
                <div className="divFeedColumn2_small column">
                    <p className="suggest-body"> {this.props.data.gameName}</p>
                </div>
                <div className="divFeedColumn4 column"><p> {this.props.data.numberOfPlayers}</p></div>

            </div>

        );
    }
});

module.exports = AvailableGamesContent;