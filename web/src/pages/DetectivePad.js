var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;


var DetectivePad = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
     	<div>This is the Detective Pad!</div>
     </div>
    );
  }
});

module.exports = DetectivePad;