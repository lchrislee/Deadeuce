var React = require('react');
var $ = require('jQuery');

var SAContent = React.createClass({ 
  getInitialState: function() {
    return {
      "suspect": [1,2,3,4,5,6],
      "weapon": [1,2,3,4,5,6],
      "place": [1,2,3,4,5,6,7,8,9],
      "accusationType": "suggest"
    }
  },
  
  makeAccusation: function(e) {
    e.preventDefault();
    var accusation = {
      "weapon": this.state.weapon,
      "suspect": this.state.suspect,
      "place": this.state.place
    };
    console.log(accusation.weapon);
    console.log(accusation.suspect);
    console.log(accusation.place);
    var sendMe = {"gameID":"1234", "userID":"1234", "suggestion":accusation};
    var stringified = JSON.stringify(sendMe);

    var url;
    if (this.state.accusationType == "suggest"){
      url = "/game/suggest";
    }else if (this.state.accusationType == "accuse"){
      url = "/game/accuse";
    }

    $.ajax({
      url: url,
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
        this.setState({
          "temp": data.gameID
        });
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
  
  render: function() {
    return (
	    <div className="SAContainer">
          <div className="SAHeader">
            <h3>Make a Suggestion</h3>
          </div>
          <div className="suggestAccuse">
              <form onSubmit={this.makeAccusation}>
                <select onChange={this.selectSuspect} name="suspect">
                  {this.state.suspect.map(function(suspect){
                    return <option value={suspect}>{suspect}</option>
                  })}
                </select>
                <br/><br/>
                <select onChange={this.selectWeapon} name="weapon">
                  {this.state.weapon.map(function(weapon){
                    return <option value={weapon}>{weapon}</option>
                  })}
                </select>
                <br/><br/>
                <select onChange={this.selectPlace} name="place">
                  {this.state.place.map(function(place){
                    return <option value={place}>{place}</option>
                  })}
                </select>
              <br/><br/>
              <input onChange={this.selectSuggest} type="radio" name="clueType" value="suggest" required />Suggestion
              <br/>
              <input onChange={this.selectAccuse} type="radio" name="clueType" value="accuse" required />Accusation
              <br/><br/>
              <input type="submit" name="submitSA" />
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

  selectPlace: function(e) {
    e.preventDefault();
    var location = e.target.value;
      this.setState ({
          "place": place
      });
      console.log(place);
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