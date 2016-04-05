var React = require('react');
var $ = require('jQuery');
var Face = require('./Face.js');

var Picture = React.createClass({
	contextTypes: {
    	router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
          "eyes":"blue"
        };
    },
    render: function() {
    	return (
	    	<div>
		    	<Face eyes={this.state.eyes} />
		    	<Face eyes={this.state.eyes} />
		    	<Face eyes={this.state.eyes} />
		    	<Face eyes={this.state.eyes} />
		    	<Face eyes={this.state.eyes} />
		    	<Face eyes={this.state.eyes} />
		    	<Face eyes={this.state.eyes} />
		    	<button onClick={this.changeEyeColor}>Change Color</button>
	    	</div>
	    );
	},
	changeEyeColor: function(){
		if (this.state.eyes == "blue"){
			this.setState({
				"eyes": "brown"
			});
		}else{
			this.setState({
				"eyes": "blue"
			});
		}
	},
});

module.exports = Picture;