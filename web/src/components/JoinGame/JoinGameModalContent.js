var React = require('react');
var $ = require('jQuery');

var JoinGameModalContent = React.createClass({ 
  // mixins: [
  //   require('react-onclickoutside')
  // ],
  // handleClickOutside: function(evt) {
  //   this.props.closeModal(evt);
  // },
  // closeModal: function(evt) {
  //   this.props.closeModal(evt);
  // },
  handleCreateGameSubmit: function(e) {
    e.preventDefault();
    var output = JSON.stringify({gameName:"FAKE NAME", userID:"SOME ID"});
    $.ajax({
      url: '/joinGame',
      type: 'PUT',
      contentType: "application/json",
      data: output,
      success: function(response) {
        //{joinSuccess:t/f, nextTurn: user_id}
        // console.log(response.nextTurn);
        //console.log(response.joinSuccess);
        console.log(response);
        if (response.joinSuccess){
          //do something
          console.log(data);
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
    // ^^ is this needed?
  },
  render: function() {
    return (
	    <div>
          <div className="outercontainer">
          <div className="hero_img"> 
            <h1 className="center">Come on in!</h1>        
          </div>
          <div className="primary_content">
            <div className="av_games firstRow">
                 <div className="FeedHeader">
                     <div className="gamefeed-header"> Available Games</div>
                     <div className="columnheader"> <p> Start time </p></div>
                     <div className="columnheader"> <p> Players </p></div>
                 </div>
                 <div className="av_gamesTable">
                     <div className="divFeedRow">
                         <div className="divFeedColumn1 column" >
                             <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                         </div>
                         <div className="divFeedColumn2_small column">
                             <p className="suggest-body"> demo </p>
                         </div>
                         <div className="divFeedColumn3 column"><p>1 players</p></div>
                         <div className="divFeedColumn3 column"><p>-00:00:30 </p></div>
                     </div>
                     <div className="divFeedRow">
                         <div className="divFeedColumn1 column" >
                             <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                         </div>
                         <div className="divFeedColumn2_small column">
                             <p className="suggest-body"> Capstone group</p>
                         </div>
                         <div className="divFeedColumn3 column"><p>6 players </p></div>
                         <div className="divFeedColumn3 column"><p>-04:34:32 </p></div>
                     </div>
                     <div className="divFeedRow">
                         <div className="divFeedColumn1 column" >
                             <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                         </div>
                         <div className="divFeedColumn2_small column">
                             <p className="suggest-body"> OG Deadeuce Crew</p>
                         </div>
                         <div className="divFeedColumn3 column"><p>7 players</p></div>
                         <div className="divFeedColumn3 column"><p>-11:23:09 </p></div>
                     </div>
                     <div className="divFeedRow">
                         <div className="divFeedColumn1 column" >
                             <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                         </div>
                         <div className="divFeedColumn2_small column">
                             <p className="suggest-body"> Nikias + homies </p>
                         </div>
                         <div className="divFeedColumn3 column"><p>1 players </p></div>
                         <div className="divFeedColumn3 column"><p>-12:29:08 </p></div>
                     </div>
                     <div className="divFeedRow">
                         <div className="divFeedColumn1 column" >
                             <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                         </div>
                         <div className="divFeedColumn2_small column">
                             <p className="suggest-body"> Squad</p>
                         </div>
                         <div className="divFeedColumn3 column"><p>4 players</p></div>
                         <div className="divFeedColumn3 column"><p>-12:53:26 </p></div>
                     </div>
                     <div className="divFeedRow">
                         <div className="divFeedColumn1 column" >
                             <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                         </div>
                         <div className="divFeedColumn2_small column">
                             <p className="suggest-body"> Ain't nobody messing with my clique </p>
                         </div>
                         <div className="divFeedColumn3 column"><p>3 players </p></div>
                         <div className="divFeedColumn3 column"><p>-12:29:08 </p></div>
                     </div>
                     <div className="divFeedRow">
                         <div className="divFeedColumn1 column" >
                             <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                         </div>
                         <div className="divFeedColumn2_small column">
                             <p className="suggest-body"> BAEs </p>
                         </div>
                         <div className="divFeedColumn3 column"><p>6 players</p></div>
                         <div className="divFeedColumn3 column"><p>-12:53:26 </p></div>
                     </div>
                 </div>
             </div>    
          </div>
          <div className="secondary_content">
            <form className="center" onSubmit={this.handleCreateGameSubmit}>
              You are about to join this game. Would you like to continue?
              <br/>
              <input type="submit" name="submitJoinGame"/> 
            </form>
          </div>
        </div>
	    </div>
	);
  },
});

module.exports = JoinGameModalContent;