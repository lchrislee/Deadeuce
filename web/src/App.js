var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;
var hashHistory = require('react-router').hashHistory;

var HomePage = require('./HomePage.js');
var SecondPage = require('./SecondPage.js');

var BugList = require('./BugList');
var BugEdit = require('./BugEdit');


var Games = require('./Games');
var Nav = require('./NavBar');
var Profile = require('./Profile');
var CreateGame = require('./CreateGame');
var JoinGame = require('./JoinGame');
var GameHome = require('./gameHome');
var DetectivePad = require('./DetectivePad');
var ExitGame = require('./ExitGame');
var ReviewClues = require('./ReviewClues');



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
      <Route path="/game_home" component={GameHome}>
        <Route path="/detective_pad" component={DetectivePad}/>
        <Route path="/game_home/exit_game" component={ExitGame}/>
        <Route path="/game_home/review_clues" component={ReviewClues}/>
      </Route>


      <Route path="/bugs" component={BugList} />
      <Route path="/bugs/:id" component={BugEdit} />
      <Redirect from="/" to="/home" />
      <Route path="*" component={NoMatch} />

    </Route>
   </Router>
 ),
 document.getElementById('main')
);