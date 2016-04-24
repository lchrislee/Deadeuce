var React = require('react');
var Router = require('react-router');
var $ = require('jQuery');
var AccuseFeed = require('./AccuseFeed');

var feed = '';

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
      "defaultText": text,
      "response": ""
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
    
    var sendMe = {"gameID":this.props.gameID, // change me for different calls
                  "userID":this.props.userID, // change me for different calls
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
      success: function(data) {
        console.log("gameWinner: " + data.gameWinner);
        if (data.gameWinner != undefined){
          sessionStorage.gameID = undefined;
        }
        if (data.correct == false && this.state.action == 'suggest' ) {
          feed = data.feedback + "\n" + feed;
          console.log(feed);
          this.setState({
            response: feed
          });
        } else if(data.correct == false && this.state.action == 'accuse') {
          this.setState({
            response: "YOU LOSE!"
          });
        } else if(data.correct == true && this.state.action == 'suggest') {
          this.setState({
            response: "Guess this on your next turn."
          });
        } else if(data.correct == true && this.state.action == 'accuse'){
          this.setState({
            response: "YOU WIN"
          });
        }
      }.bind(this),
      error: function(xhr, status, err) {
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
                <label className="firstSuggestLabel">Suspect:</label>
                <select onChange={this.selectSuspect} name="suspect">
                  {modifiedSuspects.map(function(suspect){
                    return <option value={suspect} key={suspect}>{suspect}</option>
                  })}
                </select>
                <br/>
                <label>Weapon:</label>
                <select onChange={this.selectWeapon} name="weapon">
                  {modifiedWeapons.map(function(weapon){
                    return <option value={weapon} key={weapon}>{weapon}</option>
                  })}
                </select>
                <br/>
                <label>Location:</label>
                <select onChange={this.selectLocation} name="place">
                  {modifiedLocations.map(function(location){
                    return <option value={location} key={location}>{location}</option>
                  })}
                </select>
              <br/>
              <input onChange={this.selectSuggest} type="radio" title="For more INFORMATION" name="clue" 
                checked={this.state.action=="suggest"}/>Suggest
              <br/>
              <input onChange={this.selectAccuse} type="radio" title="to win/lose the game" name="clue"
                checked={this.state.action=="accuse"}/>Accuse
              <br/>
              <input className="submit" type="submit" name="submitSA" onClick={this.makeAccusation} />
                   <AccuseFeed response={this.state.response} />
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
    },

  selectWeapon: function(e) {
    e.preventDefault();
    var weapon = e.target.value;
      this.setState ({
          "weapon": weapon
      });
    },

  selectLocation: function(e) {
    e.preventDefault();
    var location = e.target.value;
      this.setState ({
          "location": location
      });
    }
});

module.exports = SAContent;