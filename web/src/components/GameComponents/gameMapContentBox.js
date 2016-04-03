/**
 * Created by Rona on 4/3/16.
 */
var React = require('react');
var $ = require('jQuery');

var GameMapContentBox = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return{
        };
    },

    generateMapHeader: function(){

    },
    generateMapContent: function(){


    },

    render: function(){
        this.props.playerLocations=[i];

        return(
            <div className="mapBox">
                <div className="gameMapBoxHeader">
                <p className="mapHeader"></p>
                </div>
                <div className="gameMapBoxBody">
                    <p className="mapContent"></p>
                </div>
            </div>
        );
    }
});

module.exports = GameMapContentBox;