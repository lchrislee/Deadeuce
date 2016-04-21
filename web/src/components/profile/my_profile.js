var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var $ = require('jquery');
var SignIn = require('./sign_in');
var SignUp = require('./sign_up');

var MyProfile = React.createClass({
    getInitialState: function(){
        return{
            "username": "-----",
            "profPicUrl": "",
            "wins": "0",
            "losses": "0",
        }
    },
    Login: function(e) {
        $.ajax({
            url: '/user',
            type: 'GET',
            contentType: "application/json",
            success: function(response) {
                this.setState({
                    "username": response.username,
                    "profPicUrl": response.profPicUrl,
                    "wins": response.wins,
                    "losses": response.losses,
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
                console.log(xhr);
                this.setState({
                    "serverStatus": "Error in server request."
                });
            }.bind(this)
        });
    },
    render: function(){
        return(
            <div className="outercontainer-profile">
                <SignIn />
                <SignUp />
            </div>

        )
    }
});

module.exports = MyProfile;