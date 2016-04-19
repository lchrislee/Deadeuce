var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var $ = require('jquery');


var SignIn = React.createClass({
    getInitialState: function(){
        return{
            email: "",
            password: ""
        }
    },
    signIn: function(e){
        e.preventDefault();

        var output = JSON.stringify(this.state);
        console.log(output);

        $.ajax({
            url: '/loginUser',
            type: 'POST',
            data: output,
            contentType: 'application/json',
            success: function(response){
            }
        })
    },
    emailChange: function(e){
        e.preventDefault();
        this.setState({
            email:e.target.value
        });
    },
    passwordChange: function(e){
        e.preventDefault();
        this.setState({
            password:e.target.value
        });
    },
    render: function(){
        return(
            <div className="sign-in">
                <form>
                    Sign In<br/><br/>
                    <input type="text" 
                        onChange={this.emailChange}
                        name="username" 
                        placeholder="Username" 
                        className="sign-in-username" 
                        autofocus /><br/>
                    <input type="password" 
                        onChange={this.passwordChange} 
                        name="password" placeholder="Password" 
                        className="sign-in-password" /><br/>
                    <button className="sign-button" onClick="SignIn">SIGN IN</button>
                </form>
                or Sign Up
            </div>
        );
    }
});

module.exports = SignIn;