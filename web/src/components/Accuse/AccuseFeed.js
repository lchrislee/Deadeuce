var React = require('react');

var AccuseFeed = React.createClass({
	contextTypes: {
    	router: React.PropTypes.object.isRequired
	},
  render: function() {
    return (
      <div className="AccuseFeed-wrapper">
        <div className="AccuseFeed-header">Responses</div>
        <div className="AccuseFeed-Feed">
          {this.props.response}<br/>
        </div>
      </div>
     	);
  	},
});

module.exports = AccuseFeed;