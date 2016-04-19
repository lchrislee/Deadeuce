var React = require('react');
var Router = require('react-router');
var $ = require('jQuery');

var SAContent = React.createClass({ 
  contextTypes: {
    router: React.PropTypes.object.isRequired
   },
  getInitialState: function() {
    var text = "Select an option";
    return {
      "action": "suggest",
      "weapon": text,
      "suspect": text, 
      "location": text,
      "defaultText": text
    }
  },
  makeAccusation: function(e) {
    e.preventDefault();
    if (this.state.weapon == this.state.defaultText){
      return;
    }
    if (this.state.location == this.state.defaultText){
      return;
    }
    if (this.state.suspect == this.state.defaultText){
      return;
    }
    var sendMe = {"gameID":"1234", 
                  "userID":"1234",
                  "weapon": this.state.weapon,
                  "suspect": this.state.suspect, 
                  "location": this.state.location, 
                  "action":this.state.action};
    var stringified = JSON.stringify(sendMe);
    
    console.log(sendMe);
    $.ajax({
      url: "/game/action",
      type: 'PUT',
      contentType: "application/json",
      dataType: 'json',
      data: stringified,
      // transformRequest: function(obj){
      //   var str = [];
      //   for(var p in obj){
      //     str.push(encodeURLComponent(p) + '=' + encodeURLComponent(obj[p]));
      //   }
      //   return str.join('&');
      // },
      success: function(data) {
        console.log(data);
        if (data.correct == true) {
          
        }
        this.context.router.push('/game_home/feedback');
        // this.setState({
        //   "accusation": data.accusation
        // });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        console.log(xhr);
        this.setState({
          "serverStatus" : "Error in server request."
        });
      }.bind(this)
    });
  },
  selectSuggest: function(e) {

      this.setState ({
        "action": "suggest"
      });
  },
  selectAccuse: function(e) {
      this.setState ({
        "action": "accuse"
      });
  },
  render: function() {
    var modifiedSuspects = [];
    modifiedSuspects.push(this.state.defaultText);
    for (var i = 0; i < this.props.suspects.length; i++){
      modifiedSuspects.push(this.props.suspects[i]);
    }
    var modifiedWeapons = [];
    modifiedWeapons.push(this.state.defaultText);
    for (var i = 0; i < this.props.weapons.length; i++){
      modifiedWeapons.push(this.props.weapons[i]);
    }
    var modifiedLocations = [];
    modifiedLocations.push(this.state.defaultText);
    for (var i = 0; i < this.props.locations.length; i++){
      modifiedLocations.push(this.props.locations[i]);
    }
    return (
	    <div className="SAContainer">
          <div className="SAHeader">
            Make a Suggestion
          </div>
          <div className="suggestAccuse">
              <form onSubmit={this.makeAccusation}>
                <label>Suspect:</label>
                <select onChange={this.selectSuspect} name="suspect">
                  {modifiedSuspects.map(function(suspect){
                    return <option value={suspect}>{suspect}</option>
                  })}
                </select>
                <br/>
                <label>Weapon:</label>
                <select onChange={this.selectWeapon} name="weapon">
                  {modifiedWeapons.map(function(weapon){
                    return <option value={weapon}>{weapon}</option>
                  })}
                </select>
                <br/>
                <label>Location:</label>
                <select onChange={this.selectLocation} name="place">
                  {modifiedLocations.map(function(location){
                    return <option value={location}>{location}</option>
                  })}
                </select>
              <br/>
              <input onChange={this.selectSuggest} type="radio" name="clue" 
                checked={this.state.action=="suggest"}/>Suggestion
              <br/>
              <input onChange={this.selectAccuse} type="radio" name="clue"
                checked={this.state.action=="accuse"}/>Accusation
              <br/>
              <input className="submit" type="submit" name="submitSA" />
              </form>
          </div>
	    </div>
	);
  },
  selectSuspect: function(e) {
    e.preventDefault();
    var suspect = e.target.value;
      this.setState ({
          "suspect": suspect
      });
      console.log(suspect);
    },

  selectWeapon: function(e) {
    e.preventDefault();
    var weapon = e.target.value;
      this.setState ({
          "weapon": weapon
      });
      console.log(weapon);
    },

  selectLocation: function(e) {
    e.preventDefault();
    var location = e.target.value;
      this.setState ({
          "location": location
      });
      console.log(location);
    }
});

module.exports = SAContent;