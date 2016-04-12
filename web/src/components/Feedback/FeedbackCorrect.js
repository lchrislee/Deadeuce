var React = require('react');
var $ = require('jQuery');

var FeedbackCorrect = React.createClass({ 
  getInitialState: function() {
    return {

    }
  },
  
  feedback: function(e) {
    e.preventDefault();
    var feedback = {

    };
    var sendMe = {"gameID":"1234", "userID":"1234", "accusation":accusation};
    var stringified = JSON.stringify(sendMe);
    $.ajax({
      url: '/game/accuse',
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
	    <div className="feedbackContent">

          <p className="feedback-header"><br/>SUGGESTION FEEDBACK</p>
          <p>Have a clue:</p> <br/> <br/>
          <p> {feedback} </p>
          <br/>
          <button className="feedback-button" type="button">RETURN TO GAME</button>
	    </div>


	);
  },
});

module.exports = FeedbackCorrect;