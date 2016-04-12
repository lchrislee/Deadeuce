var React = require('react');
var $ = require('jQuery');
var ChecklistRow = require('./checklistRow.js');

var Checklist = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        var gameID = "abcdeg";
        return {
          gameID: gameID,
          "suspects": [],
          "weapons": [],
          "locations": []
        }
    },

render: function(){
    return(
        <div className="checklist firstRow">
          <div className="checklistHeader">
            <div className="checklistRow-Header">
              <p>Detective Checklist</p>
            </div>
          </div>
          <div className="checklist-content">
            <div className="checklistRow category">
              <p>Suspects</p>
            </div>
                {this.props.suspects.map(function(suspect){
                  return <ChecklistRow value={suspect} key={suspect} ></ChecklistRow>;
                })}
            <div className="checklistRow category">
              <p>Weapons</p>
            </div>
                {this.props.weapons.map(function(weapon){
                  return <ChecklistRow value={weapon} key={weapon} ></ChecklistRow>;
                })}
            <div className="checklistRow category">
              <p>Location</p>
            </div>
                {this.props.locations.map(function(location){
                  return <ChecklistRow value={location} key={location}> </ChecklistRow>;
                })}
          </div>
        </div>
      );
    }
});

module.exports = Checklist;