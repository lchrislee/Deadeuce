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

        };
    },
    render: function(){

        return(
            <div className="mapBox">
                <div className="gameMapBoxHeader">
                 <p className="mapHeader">{this.props.data.name}</p>
                </div>
                <div className="gameMapBoxBody" className={this.props.data.name}>
                    <p className="mapContent">  {this.props.data.players} </p>
                </div>
            </div>

        );
    }
});

module.exports = GameMapContentBox;