var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var $ = require('jquery');

var NavBar = React.createClass({
    getInitialState: function(){
        return {
            create: "",
            join: "",
            profile: "",
            game_home: "",
        }
    },
    componentDidMount: function(){
        if (sessionStorage.length === 0) {
            this.setState({
                create: "Create Game",
                join: "Join Game",
                profile: "SignIn/SignUp",
                game_home: "Current Game",
                logout: "Log Out"

            });
        } else if(sessionStorage.length === 0) {
            this.setState({
                create: "",
                join: "",
                profile: "Sign Up/Sign In",
                game_home: "",
                logout: ""

            });
        }
    },
    logout: function(){
        sessionStorage.clear();
        this.componentDidMount();
    },
    render: function(){
        return(
            <div>
                <div className="navBar">
                    <p><Link to="/">Deadeuce</Link></p>
                    <ul className="navLinks">
                        <li><Link to="create_game" activeClassName="active">{this.state.create}</Link></li>
                        <li><Link to="join_game" activeClassName="active">{this.state.join}</Link></li>
                        <li><Link to="game_home" activeClassName="active">{this.state.game_home}</Link></li>
                        <li><Link to="/" onClick={this.logout}>{this.state.logout}</Link></li>
                        <li><Link to="Profile" activeClassName="active">{this.state.profile}</Link></li>
                    </ul>
                </div>
                {this.props.children}
            </div>
        )
    }
});

module.exports = NavBar;