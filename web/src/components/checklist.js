var React = require('react');
var $ = require('jQuery');
var ChecklistRow = require('./checklistrow.js');

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
            Detective Checklist
            </div>
          </div>
          <div className="checklist-content">
            <div className="checklistRow category">
              Suspects
            </div>
                {this.props.suspects.map(function(suspect){
                  return <ChecklistRow value={suspect} key={suspect} ></ChecklistRow>;
                })}
            <div className="checklistRow category">
              Weapons
            </div>
                {this.props.weapons.map(function(weapon){
                  return <ChecklistRow value={weapon} key={weapon} ></ChecklistRow>;
                })}
            <div className="checklistRow category">
              Locations
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