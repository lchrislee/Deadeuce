var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;
var GameFeed = require('../components/GameComponents/gameFeed.js');
var GameMap = require('../components/GameComponents/gameMap.js');
var TurnBox = require('../components/GameComponents/turnBox.js');
var Checklist = require('../components/checklist.js')
var SuggestAccuse = require('../components/Accuse/SuggestAccuse.js');

var GameHome = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
    
    <GameMap />
    <TurnBox />
    <Checklist />
    <SuggestAccuse />

    </div>
    );
  }
});


module.exports = GameHome;