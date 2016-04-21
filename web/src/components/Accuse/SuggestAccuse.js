var React = require('react');
var SAContent = require('./SAContent.js');

var SuggestAccuse = React.createClass({ 
  contextTypes: {
    router: React.PropTypes.object.isRequired
   },
  render: function() {
  	var testDummyData = {
  		gameID: this.props.gameID,
        userID: this.props.userID,
        "suspects": [],
        "weapons": [],
        "locations": []
  	}
    return (
      <div className="suggestAccuseWrapper">
        <SAContent gameID={this.props.gameID} userID={this.props.userID} suspects={this.props.suspects} weapons={this.props.weapons} locations={this.props.locations}/>
      </div>
     );
  },
});

module.exports = SuggestAccuse;