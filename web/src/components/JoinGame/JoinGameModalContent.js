var React = require('react');
var $ = require('jQuery');

var JoinGameModalContent = React.createClass({ 
  mixins: [
    require('react-onclickoutside')
  ],
  handleClickOutside: function(evt) {
    this.props.closeModal(evt);
  },
  closeModal: function(evt) {
    this.props.closeModal(evt);
  },
  handleCreateGameSubmit: function(e) {
    e.preventDefault();
    var output = JSON.stringify({gameName:"FAKE NAME", userID:"SOME ID"});
    $.ajax({
      url: '/joinGame',
      type: 'PUT',
      contentType: "application/json",
      data: output,
      // transformRequest: function(obj){
      //   var str = [];
      //   for(var p in obj){
      //     str.push(encodeURLComponent(p) + '=' + encodeURLComponent(obj[p]));
      //   }
      //   return str.join('&');
      // },
      success: function(response) {
        //{joinSuccess:t/f, nextTurn: user_id}
        console.log(response.nextTurn);
        console.log(response.joinSuccess);
        if (response.joinSuccess){
          //do something
          //maybe load the next page?
        }else{
          // we don goofed
        }
        // this.setState({
          
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
    var evt = "";
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

module.exports = JoinGameConfirm;