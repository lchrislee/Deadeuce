var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = React.createClass({
    render: function(){
        return(
            <div className="navBar">
                <p>Deadeuce</p>
                <ul className="navLinks">
                    <li><a href="">Home</a></li>
                    <li><a href="">Games</a></li>
                    <li><a href="">Profile</a></li>
                </ul>
            </div>
        )
    }
});

module.exports = NavBar;