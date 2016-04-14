var React = require('react');
var Router = require('react-router');
var $ = require('jQuery');

var SAContent = React.createClass({ 
  contextTypes: {
    router: React.PropTypes.object.isRequired
   },
  getDefaultProps: function() {
    return {
      "weapons": [],
      "suspects": [],
      "locations": []
    }
  },
  getInitialState: function() {
    return {
      "accusationType": "suggest"
    }
  },
  makeAccusation: function(e) {
    e.preventDefault();
    var accusation = {
      "weapon": this.state.weapon,
      "suspect": this.state.suspect,
      "location": this.state.location
    };
    console.log(accusation.weapon);
    console.log(accusation.suspect);
    console.log(accusation.location);
    var sendMe = {"gameID":"1234", "userID":"1234", "suggestion":accusation};
    var stringified = JSON.stringify(sendMe);

    var url;
    if (this.state.accusationType == "suggest"){
      url = "/game/suggest";
    }else if (this.state.accusationType == "accuse"){
      url = "/game/accuse";
    }

    // $.ajax({
    //   url: url,
    //   type: 'PUT',
    //   contentType: "application/json",
    //   dataType: 'json',
    //   data: stringified,
    //   // transformRequest: function(obj){
    //   //   var str = [];
    //   //   for(var p in obj){
    //   //     str.push(encodeURLComponent(p) + '=' + encodeURLComponent(obj[p]));
    //   //   }
    //   //   return str.join('&');
    //   // },
    //   success: function(data) {
    //     console.log(data);
    //     this.setState({
    //       "temp": data.gameID
    //     });
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.log(err);
    //     console.log(xhr);
    //     this.setState({
    //       "serverStatus" : "Error in server request."
    //     });
    //   }.bind(this)
    // });
    this.context.router.push('/game_home/feedback');
  },
  render: function() {
    return (
	    <div className="SAContainer">
          <div className="SAHeader">
            Make a Suggestion
          </div>
          <div className="suggestAccuse">
              <form onSubmit={this.makeAccusation}>
                <select onChange={this.selectSuspect} name="suspect">
                  {this.props.suspects.map(function(suspect){
                    return <option value={suspect}>{suspect}</option>
                  })}
                </select>
                <br/>
                <select onChange={this.selectWeapon} name="weapon">
                  {this.props.weapons.map(function(weapon){
                    return <option value={weapon}>{weapon}</option>
                  })}
                </select>
                <br/>
                <select onChange={this.selectLocation} name="place">
                  {this.props.locations.map(function(location){
                    return <option value={location}>{location}</option>
                  })}
                </select>
              <br/>
              <input onChange={this.selectSuggest} type="radio" name="clueType" value="suggest" />Suggestion
              <br/>
              <input onChange={this.selectAccuse} type="radio" name="clueType" value="accuse" />Accusation
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
    },

  selectSuggest: function(e) {
    e.preventDefault();
    var suggest = e.target.value;
      this.setState ({
        "accusationType": "suggest"
      });
  },

  selectAccuse: function(e) {
    e.preventDefault();
    var accuse = e.target.value;
      this.setState ({
        "accusationType": "accuse"
      });
  }
});

module.exports = SAContent;