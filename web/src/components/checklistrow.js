
var React = require('react');
var $ = require('jQuery');

var ChecklistRow = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function(){
        return{

        };
    },
    render: function(){

        return(
            <div className="checklistRow">
               <input type="checkbox" value={this.props.value}>{this.props.value}</input>
            </div>
        );
    }
});

module.exports = ChecklistRow;