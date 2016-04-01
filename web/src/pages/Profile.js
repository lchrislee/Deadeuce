var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var MyProfile = require('../components/profile/my_profile');


var Profile = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
     	<div>This is the profile page!</div>

      <MyProfile />

     </div>
    );
  }
});


module.exports = Profile