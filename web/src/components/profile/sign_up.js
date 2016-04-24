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
    createUser: function() {
        console.log("called");
        var userInfo = {
            "name":this.state.name,
            "email":this.state.email,
            "password":this.state.password
        };
        var outputWhole = {"userInfo":userInfo};
        var output = JSON.stringify(outputWhole);
        if(this.state.password == this.state.confirmPassword) {
            $.ajax({
              url: '/createUser',
              type: 'POST',
              contentType: "application/json",
              dataType: 'json',
              data: output,
              success: function(response) {
                console.log("AJAX went through");
                    if (response.userID != undefined){
                        console.log("DONE: " + response.userID);
                        sessionStorage.setItem("userID", response.userID);
                        sessionStorage.setItem("name",this.state.name);
                    }
              }.bind(this),
              error: function(xhr, status, err) {
                this.setState({
                        "serverStatus" : "Error in server request."
                    });
              }.bind(this)
            });
        } else {
            alert('password did not match confirm Password');
        }
    },
    render: function(){
        return(
            <div className="signContainer">
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
                </div>
                <div className="sign-up">
                <div className="sign-up-header">Sign Up for an Account</div>
                    <div className="signup-form">
                        <label className="sign-label" htmlFor="username"> Name:</label> <input onChange={this.nameChanged} type="text"
                            placeholder="Name"
                            className="sign-up-username sign-up-input"/><br/>
                        <label className="sign-label"htmlFor="e-mail">Email:</label><input type="text" onChange={this.emailChanged}
                            placeholder="Email" 
                            name="sign-up-email" 
                            className="sign-up-email sign-up-input" /><br/>
                        <label className="sign-label" htmlFor="password">Password:</label><input onChange={this.passwordChanged}
                            type="password" 
                            placeholder="Password" 
                            name="sign-up-pw1" 
                            className="sign-up-pw sign-up-input" /><br/>
                        <label className="sign-label" htmlFor="confirm-password">Confirm Password:</label> <input onChange={this.confirmPasswordChanged}
                            type="password" 
                            placeholder="Confirm Password"
                            name="sign-up-pw2" 
                            className="sign-up-pw sign-up-input"/><br/> <br/>
                        <button className="sign-button" onClick={this.createUser}>SIGN UP</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SignUp;