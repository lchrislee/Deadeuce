var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react').Link;
var $ = require('jquery');


var SignUp = React.createClass({
    getInitialState: function(){
        return{

        }
    },
    componentDidMount: function(e){
        var output = {

        }
        var outputStr = JSON.stringify(output);
        $.ajax({
            url: '/createUser',
            type: 'POST',
            data: outputStr,
            contentType: 'application/json',
            success: function(response){
            }
        });
    },
    
    render: function(){
        return(
            <div className="sign-up">
            <div className="sign-up-header">Sign Up for an Account</div>
                <div className="signup-form"> <form >
                    <label className="sign-label" for="username"> Username:</label> <input type="text"
                        placeholder="Username"
                        value={this.state.username}
                        className="sign-up-username sign-up-input"/><br/>
                    <label className="sign-label"for="e-mail">Email:</label><input type="text"
                        placeholder="Email" 
                        name="sign-up-email" 
                        className="sign-up-email sign-up-input" /><br/>
                    <label className="sign-label" for="password">Password:</label><input
                        type="password" 
                        placeholder="Password" 
                        name="sign-up-pw1" 
                        className="sign-up-pw sign-up-input" /><br/>
                    <label className="sign-label" for="confirm-password">Confirm Password:</label> <input
                        type="password" 
                        placeholder="Password" 
                        name="sign-up-pw2" 
                        className="sign-up-pw sign-up-input"/><br/> <br/>
                    <button className="sign-button" type="button">SIGN UP</button>
                </form></div>

            </div>
        );
    }
});

module.exports = SignUp;