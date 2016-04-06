var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var $ = require('jquery');


var SignIn = React.createClass({
    render: function(){
        return(
            <div className="sign-in">
                <form>
                    Sign In<br/><br/>
                    <input type="text" name="username" placeholder="Username" className="sign-in-username" autofocus /><br/>
                    <input type="password" name="password" placeholder="Password" className="sign-in-password" /><br/>
                    <button className="sign-button">SIGN IN</button>
                </form>
                or Sign Up
            </div>
        );
    }
});

module.exports = SignIn;