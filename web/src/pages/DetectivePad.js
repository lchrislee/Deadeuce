var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;
var Checklist = require('../components/checklist');


var DetectivePad = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
        <Checklist />
      </div>
    );
  }
});

module.exports = DetectivePad;