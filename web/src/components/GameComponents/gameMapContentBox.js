/**
 * Created by Rona on 4/3/16.
 */
var React = require('react');
var $ = require('jQuery');

var GameMapContentBox = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function(){
        return{
            "location": "",
            "players": ""
        ;}
    },
    render: function(){
        "location" = this.props.data.header;
        "players:" = this.props.data.playersThere;

        return(
            <div className="mapBox">
                <div className="gameMapBoxHeader">
                 <p className="mapHeader">{this.state.location}</p>
                </div>
                <div className="gameMapBoxBody">
                    <p className="mapContent">  {this.state.players} </p>
                </div>
            </div>

        );
    }
});

module.exports = GameMapContentBox;