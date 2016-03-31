var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');


var Testing = require('./Feedback.js');



var secondPage = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
     	<div>This is the secondPage, its now Defunct except for testing</div>


      <Testing />


     </div>
    );
  }
});

module.exports = secondPage;