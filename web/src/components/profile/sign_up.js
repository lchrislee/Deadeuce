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
            <div className="sign-up-header">Sign Up for an account</div>
                <form>
                    Username: <input type="text" 
                        placeholder="Username" 
                        value={this.state.username} 
                        className="sign-up-username sign-up-input"/><br/>
                    Email: <input type="text" 
                        placeholder="Email" 
                        name="sign-up-email" 
                        className="sign-up-email sign-up-input" /><br/>
                    Password: <input 
                        type="password" 
                        placeholder="Password" 
                        name="sign-up-pw1" 
                        className="sign-up-pw sign-up-input" /><br/>
                    Confirm Password: <input 
                        type="password" 
                        placeholder="Password" 
                        name="sign-up-pw2" 
                        className="sign-up-pw sign-up-input"/><br/>
                    <button>Sign Up</button>
                </form>
            </div>
        );
    }
});

module.exports = SignUp;