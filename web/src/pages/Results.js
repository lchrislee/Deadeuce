var React = require('react');
var Win = require('./win.js');
var Lose = require('./lose.js')

var gameResults = React.createClass({ 
  render: function() {
    return (
      <div className="results">
        <Win />
        <Lose />
      </div>
     );
  },
});

module.exports = gameResults;