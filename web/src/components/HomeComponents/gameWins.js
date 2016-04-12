var React = require('react');
var $ = require('jQuery');
var GameMapContentBox = require('./GameWinningAccusations.js');

var GameWins = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return{

        };
    },
    render: function(){
        //var data = [];
        //React.Children.map(this.props.location, function(loc){
        //    //code in here is applied to each element in this.props.locations
        //    data.push();
        //});
        return(
            <div className="gameWins-wrapper">
                    <div className="gameWinsHeader">
                        <h3> Game winning accusations: </h3>
                    </div>

                    {this.props.location.map(function(info){
                        return <GameWinningAccusations data = {info} key={info.accusation}></GameWinningAccusations>;
                    })}

                    </div>
            </div>



        );
    }
});

module.exports = GameWins;