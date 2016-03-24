var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var ExampleModal = require('./ExampleModal.js');
var NavBar = require('./NavBar.js');
var Link = require('react-router').Link;


var ReviewClues = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
     	<div>This is the Review Clues page!</div>
     </div>
    );
  }
});


module.exports = ReviewClues;