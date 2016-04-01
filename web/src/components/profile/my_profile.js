var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var $ = require('jquery');

var MyProfile = React.createClass({
    getInitialState: function(){
        return{
            "username": "random",
        }
    },
    getUserData: function(e) {
        $.ajax({
            url: '/user',
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
                console.log(data);
                console.log(data.username);
                this.setState({
                    "username": data.username
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
            <div>
                <div className="prof-pic-container">
                    <img src="" className="prof-pic" />
                    <span className="prof-username">{this.state.username}</span>
                    <button className="prof-button" onClick={this.getUserData}></button>
                </div>

            </div>
        )
    }
});

module.exports = MyProfile;