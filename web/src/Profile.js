var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var ExampleModal = require('./ExampleModal.js');
var NavBar = require('./NavBar.js');

var Games = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
     	<div>This is the profile page!</div>
     </div>
    );
  }
});


module.exports = Games