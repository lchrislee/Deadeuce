/**
 * Created by Rona on 4/3/16.
 */
var React = require('react');
var $ = require('jQuery');

var ClassNames = 'gameMapBoxBody';
var number = -1;

var GameMapContentBox = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function(){
        return{

        };
    },
    gameMapBoxBody: function(){
        number += 1;
        return('className="gameMapBoxBody ' + i + '"');
    },
    render: function(){
        return(
            <div className="mapBox">
                <div className="gameMapBoxHeader">
                 <p className="mapHeader">{this.props.data.name}</p>
                </div>
                <div id={this.props.num} className="gameMapBoxBody">
                    <p className="mapContent">{this.props.data.players}<br/></p>
                </div>
            </div>

        );
    }
});

module.exports = GameMapContentBox;