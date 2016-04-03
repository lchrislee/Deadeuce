/**
 * Created by Rona on 4/3/16.
 */
var React = require('react');
var $ = require('jQuery');

var GameMapContentBox = React.createClass({
    getInitialState: function() {
        return{

        };
    },

    generateMapHeader: function(){

    },
    generateMapContent: function(){


    },

    render: function(){
        var playerLocations = [];

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