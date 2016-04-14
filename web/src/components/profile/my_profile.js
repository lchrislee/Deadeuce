var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var $ = require('jquery');

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
                <div className="hero_img">
                    <h1 className="center">You are safe...for now...</h1>
                </div>
                    <div className="prof-pic-container">
                        <div className="prof-img"> 
                            <img src="assets/the90.png" />
                        </div>
                            <div className="prof-username">Profile: {this.state.username}
                                <br/>
                                <button className="submit" onClick={this.Login}>Login</button>
                            </div>
                            <div className="my-wins">
                                {this.state.username}'s wins: {this.state.wins}
                            </div>
                            <div className="my-losses">
                                {this.state.username}'s losses: {this.state.losses}
                            </div>
                    </div>
            </div>

        )
    }
});

module.exports = MyProfile;