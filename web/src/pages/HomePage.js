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
      <div className="outercontainer" style={{paddingBottom: '0px'}}>
        

        <div className="main_page">
          <p className="main_page_title">Deadeuce</p>
          <p className="main_page_bigfont">FOUND:</p>
          <p className="main_page_midfont">EVKitty dead</p>
          <p className="main_page_small">University offering reward for the killer</p>
        </div>
        
       	
      </div>  
     </div>
    );
  },

  createGame: function(e) {
      this.context.router.push('create_game');
  },
});


module.exports = HomePage;



