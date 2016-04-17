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
        console.log("Selected gameName is: " + selectedGame);
        this.state.selectedGame = selectedGame;

    },
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
        this.context.router.push('game_home');
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
         <div className="outercontainer tallHeight">
             <div className="hero_img">
                 <h1 className="center">Come on in!</h1>
             </div>
             <div className="only_content">
                <h3> Choose a game from the list below:</h3>

                 <AvailableGames allGames = {this.state.allGames} selectedFunction = {this.selectGame}/>

                 <form className="center" onSubmit={this.handleCreateGameSubmit}>
                     You are about to join this game. Would you like to continue?
                     <br/>
                     <br/>
                     <input type="submit" className="submit" name="submitJoinGame" value="Continue"/>
                 </form>
             </div>
         </div>
     </div>
    );
  }
});


module.exports = JoinGame;