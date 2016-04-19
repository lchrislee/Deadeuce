var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var $ = require('jquery');

var NavBar = React.createClass({
    getInitialState: function(){
        return {
            login_status: 1,
            create: "",
            join: "",
            profile: "",
            game_home: "",
            login: "",
            sign_up: ""
        }
    },
    componentDidMount: function(){
        if (this.state.login_status == 1) {
            this.setState({
                create: "Create Game",
                join: "Join Game",
                profile: "Profile",
                game_home: "Current Game",
                login: "",
                sign_up: ""
            });
        } else if(this.state.login_status == 0) {
            this.setState({
                create: "",
                join: "",
                profile: "",
                game_home: "",
                login: "Login",
                sign_up: "Sign Up"
            });
        }
    },
    render: function(){
        return(
            <div>
                <div className="navBar">
                    <p><Link to="/">Deadeuce</Link></p>
                    <ul className="navLinks">
                        <li><Link to="create_game" activeClassName="active">{this.state.create}</Link></li>
                        <li><Link to="join_game" activeClassName="active">{this.state.join}</Link></li>
                        <li><Link to="Profile" activeClassName="active">{this.state.profile}</Link></li>
                        <li><Link to="game_home" activeClassName="active">{this.state.game_home}</Link></li>
                        <li><Link to="Profile" activeClassName="active">{this.state.login}</Link></li>
                        <li><Link to="Profile" activeClassName="active">{this.state.sign_up}</Link></li>
                    </ul>
                </div>
                {this.props.children}
            </div>
        )
    }
});

module.exports = NavBar;