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
              <p>Detective Checklist</p>
            </div>
          </div>
          <div className="checklist-content">
            <div className="checklistRow category">
              <p>Suspects</p>
            </div>
                {this.props.suspect.map(function(suspect){
                  return <ChecklistRow value={suspect} key={suspect.name} ></ChecklistRow>;
                })}
            <div className="checklistRow category">
              <p>Weapons</p>
            </div>
                {this.props.weapon.map(function(weapon){
                  return <ChecklistRow value={weapon} key={weapon.name} ></ChecklistRow>;
                })}
            <div className="checklistRow category">
              <p>Location</p>
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