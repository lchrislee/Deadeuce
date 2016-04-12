var React = require('react');
var SAContent = require('./SAContent.js');

var SuggestAccuse = React.createClass({ 
  render: function() {
    return (
      <div className="suggestAccuseWrapper">
        <SAContent />
      </div>
     );
  },
});

module.exports = SuggestAccuse;