var React = require('react');
var $ = require('jQuery');

var Face = React.createClass({
	contextTypes: {
    	router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
          // state variables
        };
    },
    render: function() {
    	console.log("Render face");
    	console.log("Face: eyes is: " + this.props.eyes)
    	var leftEye;
    	if (this.props.eyes == "blue"){
    		leftEye = <div className="example-face-left-blue">THIS IS JUNK</div>;
    	}else{
    		leftEye = <div className="example-face-left-black">THIS IS JUNK</div>;
    	}
    	var rightEye;
    	if (this.props.eyes == "blue"){
    		rightEye = <div className="example-face-right-blue">THIS IS JUNK</div>;
    	}else{
    		rightEye = <div className="example-face-right-black">THIS IS JUNK</div>;
    	}
    	
	    return (
	    	<div>
		    	{leftEye}
		    	{rightEye}
	    	</div>
	    );
	},
});

module.exports = Face;