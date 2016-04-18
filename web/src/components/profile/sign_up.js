var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react').Link;
var $ = require('jquery');


var SignUp = React.createClass({
    getInitialState: function(){
        return{
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    },
    signUp: function(e){
        e.preventDefault();
        
        var output = JSON.stringify(this.state);

        console.log(output);

        if(this.state.password === this.state.confirmPassword) {
            $.ajax({
                url: '/createUser',
                type: 'POST',
                data: output,
                contentType: 'application/json',
                success: function(response){
                }
            });
        } else {
            alert('password did not match confirm Password');
        }
    },
    nameChanged: function(e){
        e.preventDefault();
        this.setState({
            name:e.target.value
        });
    },
    emailChanged: function(e){
        e.preventDefault();
        this.setState({
            email:e.target.value
        });
    },
    passwordChanged: function(e){
        e.preventDefault();
        this.setState({
            password:e.target.value
        });
    },
    confirmPasswordChanged: function(e){
        e.preventDefault();
        this.setState({
            confirmPassword:e.target.value
        });
    },
    render: function(){
        return(
            <div className="sign-up">
            <div className="sign-up-header">Sign Up for an Account</div>
                <div className="signup-form"> <form>
                    <label className="sign-label" for="username"> Name:</label> <input onChange={this.nameChanged} type="text"
                        placeholder="Name"
                        className="sign-up-username sign-up-input"/><br/>
                    <label className="sign-label"for="e-mail">Email:</label><input type="text" onChange={this.emailChanged}
                        placeholder="Email" 
                        name="sign-up-email" 
                        className="sign-up-email sign-up-input" /><br/>
                    <label className="sign-label" for="password">Password:</label><input onChange={this.passwordChanged}
                        type="password" 
                        placeholder="Password" 
                        name="sign-up-pw1" 
                        className="sign-up-pw sign-up-input" /><br/>
                    <label className="sign-label" for="confirm-password">Confirm Password:</label> <input onChange={this.confirmPasswordChanged}
                        type="password" 
                        placeholder="Confirm Password" 
                        name="sign-up-pw2" 
                        className="sign-up-pw sign-up-input"/><br/> <br/>
                    <button className="sign-button" type="button" onClick={this.signUp}>SIGN UP</button>
                </form></div>

            </div>
        );
    }
});

module.exports = SignUp;