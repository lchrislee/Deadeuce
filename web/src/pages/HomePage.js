var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var ExampleModal = require('../components/CreateGame/CreateGameForm.js');
var HomePage = React.createClass({
    contextTypes: {
    router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
          
        };
    },
  render: function() {
    return (
     <div>
      <div className="outercontainer">
        <div className="hero_img"> 
          <h1 className="center">Oh Shit... There's Been a Murder!</h1>        
        </div>
        <div className="primary_content">
          <h3> FOUND: EVKitty dead. University offering reward for the killer.</h3>
        </div>
        <div className="secondary_content">
          <h3> Game winning accusations: </h3>
          <br/>
          George Tirebiter with empty beer bottles at the 90
          <br/><br/>
          Will Ferrell with Tommy's Sword at Bovard
          <br/><br/>
          President Nikias with a U-lock at the Row 
          <br/><br/>
          Tommy Trojan with Viterbi Classes at Traddies
          <br/><br/>
        </div>
       	<div className="center"></div>
        <div className="center white_text">
        </div> 
      </div>  
     </div>
    );
  },

  createGame: function(e) {
      this.context.router.push('create_game');
  },
  testSlice: function() {
    var d = {
      sendTestToServer : "yo"
    };
    var stringified = JSON.stringify(d);
    $.ajax({
      url: "/test_slice",
      type: 'POST',
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: stringified,
      success: function(data) {
        this.setState({
          "serverStatus" : data.test
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


module.exports = HomePage;



