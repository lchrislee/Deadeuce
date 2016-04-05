var React = require('react');
var $ = require('jQuery');

var otherPlayerWin = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div className="resultsContent">

     	SUSPECT SOLVED THE MYSTERY BEFORE YOU!

     	<ul>
     		<li>Suspect</li>
     		<li>Weapon</li>
     		<li>Location</li>
     	</ul>

     	<br/><br/>

     	<p>The other players in the game have been notified. As a result of suspect's hard work, President Nikias will name the next USC building after suspect. Better luck next time!</p>

     	<button className="turnButton">Go to Games List</button>

    </div>
    );
  }
});


module.exports = otherPlayerWin;