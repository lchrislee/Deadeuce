var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;
var hashHistory = require('react-router').hashHistory;

var HomePage = require('./pages/HomePage.js');
var SecondPage = require('./SecondPage.js');

var Games = require('./pages/Games');
var Nav = require('./components/NavBar');
var Profile = require('./pages/Profile');
var CreateGame = require('./pages/CreateGame');
var JoinGame = require('./pages/JoinGame');
var GameHome = require('./pages/gameHome');
var DetectivePad = require('./pages/DetectivePad.js');
var ExitGame = require('./pages/ExitGame.js');
var ReviewClues = require('./pages/ReviewClues.js');
var Feedback = require('./pages/Feedback');


var NoMatch = React.createClass({
 render: function() {
   return (
     <h2>No match for the route</h2>
   );
 }
});

ReactDOM.render(
 (
   <Router history={hashHistory}>
    <Route path="/" component = {Nav}>
      <IndexRoute component={HomePage}/>
      
      <Route path="/home" component={HomePage} />
      <Route path="/secondPage" component={SecondPage} />
      <Route path="/games" component={Games}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/create_game" component={CreateGame}/>
      <Route path="/join_game" component={JoinGame}/>
      
      <Route path="/game_home">
        <IndexRoute component={GameHome}/>
        <Route path="/game_home/detective_pad" component={DetectivePad}/>
        <Route path="/game_home/exit_game" component={ExitGame}/>
        <Route path="/game_home/review_clues" component={ReviewClues}/>
        <Route path="/game_home/feedback" component={Feedback}/>
      </Route>

      <Redirect from="/" to="/home" />
      <Route path="*" component={NoMatch} />

    </Route>
   </Router>
 ),
 document.getElementById('main')
);