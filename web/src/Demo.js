var React = require('react');
var ReactDOM = require('react-dom');

var Demo = React.createClass({
  getInitialState: function() {
    return {
      "counter": 0,
      "myText": "THIS IS A SICK DEMO"
    };
  },
  incrementCounter: function(){
    var counter = this.state.counter;
    counter = counter + 1;
    this.setState({
      "counter": counter,
      "newValue": 500
    });
  },
 render: function() {
   //console.log("Rendering BugAdd");
   return (
     <div>
      <div className="demo-first-div">HELLO WORLD</div>
      <div className="demo-second-div">{this.state.counter}</div>
      <button id="button" className="demo-button" onClick={this.incrementCounter}>Increment Counter!!!!!</button>
     </div>
   )
 }
});

module.exports = Demo;