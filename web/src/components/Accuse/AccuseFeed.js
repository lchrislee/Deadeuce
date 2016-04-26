var React = require('react');

var AccuseFeed = React.createClass({
	contextTypes: {
    	router: React.PropTypes.object.isRequired
	},
  render: function() {
    var res = this.props.response;
    console.log(res);

    var contentInject = [];
    var line = "";
    for(var i = 0 ; i < res.length; i++){
      line+=res[i];
      if(res[i] == '.' || res[i] == '!'){
        contentInject.push(<div>{line}</div>);
        line = "";
      }
    }
    return (
      <div className="AccuseFeed-wrapper">
      <hr/>
        <div> <h3>Responses:</h3></div>
        <div className="AccuseFeed-Feed">
          {contentInject}
        </div>
      </div>
     	);
  	},
});

module.exports = AccuseFeed;