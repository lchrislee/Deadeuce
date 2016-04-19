
var React = require('react');
var $ = require('jQuery');
var style = {};
var AvailableGamesContent = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function(){
       // this.handleClick = this.handleClick.bind(this);
        return{
            "isSelected": false

        };
    },
    handleClick: function() {
       if (this.state.isSelected == true){
            this.setState({
                "isSelected": false
            })
        } else {
           this.props.selectedFunction(this.props.data.gameName, this.unselect);
            this.setState({
                "isSelected": true
            })
        }
    },
    unselect: function() {
        this.setState({
                "isSelected": false
            })
       console.log("unselect " + this.props.data.gameName);

   },
    //selected: function(obj){
    //    console.log(obj);
    //    obj.style.backgroundColor = '#444';
    //    obj.style.color = 'white';
    //},
    render: function(){
        var isSelected = this.state.isSelected;
        console.log("here " + this.props.data.gameName);
        if (isSelected) {
            style = {
                'background-color': '#444'
            };
        } else {
            style = {
                'background-color': '#CCC'
            };
        }
        return(
            <div className="divFeedRow" onClick={this.handleClick} style={style}>
                <div className="divFeedColumn1 column" >
                    <svg className="gamefeed-svg"><img src="/assets/icons/fingerprint.svg" alt="fingerprint icon" className="icon" /></svg>
                </div>
                <div className="divFeedColumn2_small column">
                    <p className="suggest-body"> {this.props.data.gameName}</p>
                </div>
                <div className="divFeedColumn4 column"><p> {this.props.data.numberOfPlayers}</p></div>

            </div>

        );
    }
});

module.exports = AvailableGamesContent;