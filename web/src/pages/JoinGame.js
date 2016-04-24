var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;
var AvailableGames = require('../components/GameComponents/availableGames.js')


var JoinGame = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        this.findAllGames();
        return{
            "allGames": [{gameName:"Commander Chris's Crew", numberOfPlayers:"6"},
                {gameName:"Rampant Ronas", numberOfPlayers:"6"}
            ],
            "selectedGame": -1

        };
    },
    selectGame: function(selectedGame) {
        this.state.selectedGame = selectedGame;
    },
    joinGameSubmit: function() {
        var output = JSON.stringify({
                      gameName:this.state.selectedGame,
                      name:sessionStorage.name,
                      email:sessionStorage.userID
                    });
        $.ajax({
            url: '/joinGame',
            type: 'PUT',
            contentType: "application/json",
            data: output,
            success: function(response) {
                console.log(response);
                if (response.joinSuccess){
                    sessionStorage.gameID = this.state.selectedGame;
                    sessionStorage.nickName = data.nickName;
                    //maybe load the next page?
                    this.context.router.push('game_home');
                }else{
                    // we don goofed
                }
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
    findAllGames: function() {
        var input = {};

        var stringified = JSON.stringify(input);

        $.ajax({
            url: '/game/all',
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            data: stringified,

            success: function(data) {
                console.log(data);
                console.log(data.gamesList);
                this.setState({
                    "allGames": data.gamesList
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
     <div>
      <br/>
         <div className="outercontainer">
             <div className="hero_img">
                 <h1 className="center">Come on in!</h1>
             </div>
             <div className="only_content" style={{width: '100%', margin:'0px', padding: '0px', marginTop: '30px',marginBottom: '30px',borderRadius: '0px'}}>
                <h3 style={{textAlign: 'center', fontSize: '24px',fontWeight: '200'}}> Choose a game from the list below</h3>

                 <AvailableGames allGames = {this.state.allGames} selectedFunction={this.selectGame}/>

                 <div className="center">
                     You are about to join this game. Would you like to continue?
                     <br/>
                     <br/>
                    <button className="submit" onClick={this.joinGameSubmit}>Continue</button>
                 </div>
             </div>
         </div>
     </div>
    );
  }
});


module.exports = JoinGame;
