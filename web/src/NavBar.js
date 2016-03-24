var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = React.createClass({
    render: function(){
        return(
            <div className="navBar">
                <p><a href="index.html">Deadeuce</a></p>
                <ul className="navLinks">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="games.html">Games</a></li>
                    <li><a href="profile.html">Profile</a></li>
                </ul>
            </div>
        )
    }
});

module.exports = NavBar;