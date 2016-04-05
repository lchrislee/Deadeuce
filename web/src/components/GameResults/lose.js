var React = require('react');
var $ = require('jQuery');

var Lose = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div className="resultsContent">

     	YOUR ACCUSATION WAS INCORRECT!

     	<ul>
     		<li>Suspect</li>
     		<li>Weapon</li>
     		<li>Location</li>
     	</ul>

     	<br/><br/>

     	<p>You are no longer able to make suggestions in this game, but you may still observe the game. The other players in the game have been notified.</p>

     	<button className="turnButton">Return to Game</button>
     	<button className="turnButton">Go to Games List</button>

    </div>
    );
  }
});


module.exports = Lose;