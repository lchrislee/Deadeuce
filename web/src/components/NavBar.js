var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;

var NavBar = React.createClass({
    render: function(){
        return(
            <div>
                <div className="navBar">
                    <p><a href="index.html">Deadeuce</a></p>
                    <ul className="navLinks">
                        <li><Link to="/" activeClassName="active" onlyActiveOnIndex>Home</Link></li>
                        <li><Link to="create_game" activeClassName="active">Create Game</Link></li>
                        <li><Link to="join_game" activeClassName="active">Join Game</Link></li>
                        <li><Link to="Profile" activeClassName="active">Profile</Link></li>
                    </ul>
                </div>
                {this.props.children}
            </div>
        )
    }
});

module.exports = NavBar;