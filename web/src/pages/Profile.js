var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var MyProfile = require('../components/profile/my_profile');
var SignIn = require('../components/profile/sign_in');
var SignUp = require('../components/profile/sign_up');


var Profile = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
     
      <MyProfile />

     </div>
    );
  }
});


module.exports = Profile