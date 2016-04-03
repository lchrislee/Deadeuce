var React = require('react');
var $ = require('jQuery');

var SAContent = React.createClass({ 
  getInitialState: function() {
    return {
      "suspect": 1,
      "weapon": 2,
      "location": 3
    }
  },
  
  makeAccusation: function(e) {
    e.preventDefault();
    var accusation = {
      "suspect": this.state.suspect,
      "weapon": this.state.weapon,
      "location": this.state.location
    };
    var stringified = JSON.stringify(accusation);
    $.ajax({
      url: '/game/checklist',
      type: 'GET',
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
                  var i;
                  for (i = 0; i < this.checklist.suspects.length; i++) {
                    <option value={this.checklist.suspects[i]}>{this.checklist.suspects[i]}</option>
                  }

                  // <option value="evkitty">EVKitty</option>
                  // <option value="tommytrojan">Tommy Trojan</option>
                  // <option value="georgetirebiter">George Tirebiter</option>
                  // <option value="presidentnikias">President Nikias</option>
                  // <option value="willferrell">Will Ferrell</option>
                  // <option value="petecarroll">Pete Carroll</option>
                </select>
                <br/><br/>
                <select onChange={this.selectWeapon} name="weapons">
                  <option value="emptysodacans">Empty soda cans</option>
                  <option value="viterbiclasses">Viterbi classes</option>
                  <option value="ulock">U-lock</option>
                  <option value="tommytrojanssword">Tommy Trojan's sword</option>
                  <option value="dininghallfood">Dining hall food</option>
                  <option value="longboard">Longboard</option>
                </select>
                <br/><br/>
                <select onChange={this.selectLocation} name="locations">
                  <option value="groundzero">Ground Zero</option>
                  <option value="lyoncenter">Lyon Center</option>
                  <option value="leavey">Leavey</option>
                  <option value="traddies">Traddies</option>
                  <option value="the90">The 90</option>
                  <option value="bovard">Bovard</option>
                  <option value="evk">EVK</option>
                  <option value="therow">The Row</option>
                  <option value="campuscenter">Campus Center</option>
                </select>
              <br/><br/>
              <input type="radio" name="clueType" value="suggest" required />Suggestion
              <br/>
              <input type="radio" name="clueType" value="accuse" required />Accusation
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