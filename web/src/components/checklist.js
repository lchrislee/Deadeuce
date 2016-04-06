var React = require('react');
var $ = require('jQuery');


var Checklist = React.createClass({
    getInitialState: function() {

        return {
          "suspect": ["EVKitty", "George Tirebiter", "Will Ferrell", "Pete Carroll", "President Nikias", "Tommy Trojan"],
          "weapon": ["U-lock", "Tommy Trojan's Sword", "Empty soda cans", "Longboard", "Viterbi classes", "Dining hall food"],
          "place": ["Traddies", "The 90", "Ground Zero", "Lyon Center", "The Row", "Leavey Library", "Bovard", "EVK", "Campus Center"],
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
            <div className="checklistRow">
                {this.state.suspect.map(function(suspect){
                  return <input type="checkbox" value={suspect}>{suspect}</input>
                })}
            </div>
            <div className="checklistRow category">
              <p>Weapons</p>
            </div>
            <div className="checklistRow">
                {this.state.weapon.map(function(weapon){
                  return <input type="checkbox" value={weapon}>{weapon}</input>
                })}
            </div>
            <div className="checklistRow category">
              <p>Location</p>
            </div>
            <div className="checklistRow">
                {this.state.place.map(function(place){
                  return <input type="checkbox" value={place}>{place}</input>
                })}
            </div>
          </div>
        </div>
      );
    }
});

module.exports = Checklist;