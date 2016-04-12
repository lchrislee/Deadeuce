var React = require('react');
var $ = require('jQuery');

var GameWinningAccusations = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function(){
        return{

        };
    },
    render: function(){

        return(
              <div className="gameWinsBody">
                    <p>  {this.props.info.accusation} </p>
              </div>
        );
    }
});

module.exports = GameWinningAccusations;