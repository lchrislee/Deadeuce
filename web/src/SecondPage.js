var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var ExampleModal = require('./ExampleModal.js');
var NavBar = require('./NavBar.js');


var GamesPage = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
     	<div>This is the secondPage, its now Defunct except for testing</div>
     </div>
    );
  }
});

module.exports = GamesPage;