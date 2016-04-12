var React = require('react');
var $ = require('jQuery');
var ChecklistRow = require('./checklistRow.js');

var Checklist = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {

        return {

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
                {this.props.suspect.map(function(suspect){
                  return <ChecklistRow value={suspect} key={suspect.name} ></ChecklistRow>;
                })}
            <div className="checklistRow category">
              Weapons
            </div>
                {this.props.weapon.map(function(weapon){
                  return <ChecklistRow value={weapon} key={weapon.name} ></ChecklistRow>;
                })}
            <div className="checklistRow category">
              Location
            </div>
                {this.props.place.map(function(place){
                  return <ChecklistRow value={place} key={place.name}> </ChecklistRow>;
                })}
          </div>
        </div>
      );
    }
});

module.exports = Checklist;