/**
 * Created by Rona on 4/11/16.
 */

var React = require('react');
var $ = require('jQuery');

var GameFeedContent = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function(){
        return{

        };
    },
    render: function(){
	var win = undefined;
	if (this.props.data.win != undefined){
		win = <span className="suggested"> and won</span>
	}
        return(
            <div className="divFeedRow">

                <div className="divFeedColumn1 column" >
                    <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                </div>
                <div className="divFeedColumn2 column">
                    <p className="suggest-body">
                        <span className="suggested"> {this.props.data.accuser} </span> suggested
                        <span className="suggested"> {this.props.data.suspect} </span>
                        with the <span className="suggested">{this.props.data.weapon} </span>
                        at <span className="suggested">{this.props.data.location}</span> {win}.
                    </p>
                </div>
                <div className="divFeedColumn3 column">On {new Date(this.props.data.time).toDateString()}</div>
            </div>

        );
    }
});

module.exports = GameFeedContent;
