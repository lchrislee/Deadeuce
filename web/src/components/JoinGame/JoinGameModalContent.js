var React = require('react');
var $ = require('jQuery');

var JoinGameModalContent = React.createClass({ 
  mixins: [
    require('react-onclickoutside')
  ],
  getInitialState: function() {
    return {
      "temp": undefined
    }
  },
  handleClickOutside: function(evt) {
    this.props.closeModal(evt);
  },
  closeModal: function(evt) {
    this.props.closeModal(evt);
  },
  handleCreateGameSubmit: function(e) {
    e.preventDefault();

    var testData = {
      userID: '12345429579572',
      gameName: 'example_name'
    };
    var stringified = JSON.stringify(testData);
    $.ajax({
      url: '/joinGame',
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
        console.log(data.userID);
        this.setState({
          "temp": data.userID
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
    var evt = "";
    this.closeModal(evt);
  },
  render: function() {
    return (
	    <div className="example-modal">
        <h1> Create a New Game </h1>
        <button onClick={this.closeModal} className="close">X</button>
        <form onSubmit={this.handleCreateGameSubmit}>
          You are about to join this game. Would you like to continue?
          <input type="submit" name="submitJoinGame"/> 
        </form> 
	    </div>
	);
  },
});

module.exports = JoinGameModalContent;