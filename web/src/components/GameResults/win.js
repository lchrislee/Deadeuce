var React = require('react');
var $ = require('jQuery');

var Win = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div className="resultsContent">

     	YOU HAVE SOLVED THE MYSTERY!

     	<ul>
     		<li>Suspect</li>
     		<li>Weapon</li>
     		<li>Location</li>
     	</ul>

     	<br/><br/>

     	<p>The other players in the game have been notified. As a result of your hard work, President Nikias will name the next USC building after you.</p>
     	<h3>CONGRATULATIONS!</h3>

     	<button className="turnButton">Go to Games List</button>

    </div>
    );
  }
});


module.exports = Win;