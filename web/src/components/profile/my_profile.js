var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var $ = require('jquery');

var MyProfile = React.createClass({
    getInitialState: function(){
        return{
            "username": "",
            "profPicUrl": "",
            "wins": "",
            "losses": "",
        }
    },
    componentDidMount: function(e) {
        $.ajax({
            url: '/user',
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            success: function(data) {
                this.setState({
                    "username": data.username,
                    "prof-pic-url": data.profPicUrl,
                    "wins": data.wins,
                    "losses": data.losses,
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
                    <img src={this.state.profPicUrl} className="prof-pic" />
                    <span className="prof-username">{this.state.username}</span>
                </div>

            </div>
        )
    }
});

module.exports = MyProfile;