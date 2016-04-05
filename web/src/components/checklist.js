var React = require('react');
var $ = require('jQuery');


var Checklist = React.createClass({
    getInitialState: function() {
        return{
          "suspect": [1,2,3,4,5,6],
          "weapon": [1,2,3,4,5,6],
          "place": [1,2,3,4,5,6,7,8,9],
        };
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
            <div className="checklistRow">
                {this.state.suspect.map(function(suspect){
                  return <input type="checkbox" value={suspect}>{suspect}</option>
                })}
            </div>
            <div className="checklistRow category">
              <p>Weapons</p>
            </div>
            <div className="checklistRow">
                {this.state.weapon.map(function(weapon){
                  return <input type="checkbox" value={weapon}>{weapon}</option>
                })}
            </div>
            <div className="checklistRow category">
              <p>Location</p>
            </div>
            <div className="checklistRow">
                {this.state.place.map(function(place){
                  return <input type="checkbox" value={place}>{place}</option>
                })}
            </div>
          </div>
        </div>
      );
    }
});

module.exports = Checklist;