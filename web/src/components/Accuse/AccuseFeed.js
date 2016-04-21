var React = require('react');

var AccuseFeed = React.createClass({
	contextTypes: {
    	router: React.PropTypes.object.isRequired
	},
  	render: function() {
  		var testDummyData = {
  			gameID: this.props.gameID,
        	userID: this.props.userID,
        	"suspects": [],
        	"weapons": [],
        	"locations": []
  		}
    	return (
      	<div className="AccuseFeed-wrapper">
        	This is the accuse Feed
      	</div>
     	);
  	},
});

module.exports = AccuseFeed;