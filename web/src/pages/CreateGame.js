var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;
var CreateGameForm = require('../components/CreateGame/CreateGameForm');

var CreateGame = React.createClass({
  render: function() {
    return (
      <div>
      	<div className="outercontainer" >
  	      <div className="hero_img"> 
              <h1 className="center">Gather your friends to find the killer.</h1>        
          </div>
        <CreateGameForm /> 
      </div>
      </div>
  );
  },
});

module.exports = CreateGame;