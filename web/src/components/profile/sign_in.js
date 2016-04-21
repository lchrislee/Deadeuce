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
    signIn: function(){
        var dataSend = {"userID":this.state.email, "password":this.state.password};
        var output = JSON.stringify(dataSend);
        console.log(output);

        $.ajax({
            url: '/loginUser',
            type: 'POST',
            data: output,
            contentType: 'application/json',
            success: function(response){
                console.log(response);
                if (response.loginSuccess == undefined){
                    console.log("BROKEN");
                }else if (response.loginSuccess == true){
                    console.log(response.loginSucess);
                    sessionStorage.setItem("userID", this.state.email);
                }else{
                    console.log("improper login");
                }
            }.bind(this),
            error: function(err){
                console.log(err);
            }.bind(this)
        })
    },
    emailChange: function(e){
        e.preventDefault();
        console.log("STUFF: " + e.target.value);
        this.setState({
            email:e.target.value
        });
    },
    passwordChange: function(e){
        e.preventDefault();
        console.log("stuff: " + e.target.value);
        this.setState({
            password:e.target.value
        });
    },
    render: function(){
        return(
            <div className="sign-in">
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
                <button className="sign-button" onClick={this.signIn}>SIGN IN</button>
                or Sign Up
            </div>
        );
    }
});

module.exports = SignIn;