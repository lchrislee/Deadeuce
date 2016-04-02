var React = require('react');
var $ = require('jQuery');

var SAContent = React.createClass({ 
  getInitialState: function() {
    return {
      "suspect": undefined,
      "weapon": undefined,
      "location": undefined
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
      url: '/test_slice',
      type: 'POST',
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
        console.log(data.gameID);
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
                  <option value="evkitty">EVKitty</option>
                  <option value="tommytrojan">Tommy Trojan</option>
                  <option value="tirebiter">George Tirebiter</option>
                  <option value="nikias">President Nikias</option>
                  <option value="ferrell">Will Ferrell</option>
                  <option value="carroll">Pete Carroll</option>
                </select>
                <br/><br/>
                <select onChange={this.selectWeapon} name="weapons">
                  <option value="sodacans">Empty soda cans</option>
                  <option value="classes">Viterbi classes</option>
                  <option value="ulock">U-lock</option>
                  <option value="sword">Tommy Trojan's sword</option>
                  <option value="food">Dining hall food</option>
                  <option value="longboard">Longboard</option>
                </select>
                <br/><br/>
                <select onChange={this.selectLocation} name="locations">
                  <option value="volvo">Ground Zero</option>
                  <option value="saab">Lyon Center</option>
                  <option value="fiat">Leavey</option>
                  <option value="audi">Traddies</option>
                  <option value="audi">The 90</option>
                  <option value="audi">Bovard</option>
                  <option value="audi">EVK</option>
                  <option value="audi">The Row</option>
                  <option value="audi">Campus Center</option>
                </select>
              <br/><br/>
              <input type="radio" name="clueType" value="suggest" />Suggestion
              <br/>
              <input type="radio" name="clueType" value="accuse" />Accusation
              <br/><br/>
              <input type="submit" name="submitSA" />
              </form>
          </div>
	    </div>
	);
  },

  selectSuspect: function(e) {
    e.preventDefault();
    var suspect = {
      "suspect" : undefined
    };
    var stringified = JSON.stringify(suspect);
    $.ajax({
      url: '/test_slice',
      type: 'POST',
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
        console.log(data.gameID);
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

  selectWeapon: function(e) {
    e.preventDefault();
    var weapon = {
      "weapon" : undefined
    };
    var stringified = JSON.stringify(weapon);
    $.ajax({
      url: '/test_slice',
      type: 'POST',
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
        console.log(data.gameID);
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

  selectLocation: function(e) {
    e.preventDefault();
    var location = {
      "location" : undefined
    };
    var stringified = JSON.stringify(location);
    $.ajax({
      url: '/test_slice',
      type: 'POST',
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
        console.log(data.gameID);
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
  }
});

module.exports = SAContent;