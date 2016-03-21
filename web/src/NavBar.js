var React = require('react');
var ReactDOM = require('react-dom');

var NavBar = React.createClass({
    render: function(){
        return(
            <div className="navBar">
                <p>Deadeuce<p/>
                <ul className="nav-links">
                    <a href=""><li>Home</li></a>
                    <a href=""><li>Games</li></a>
                    <a href=""><li>Profile</li></a>
                </ul>
            </div>
        )
    }
});

module.exports = NavBar;