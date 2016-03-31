var React = require('react');
var $ = require('jQuery');
var Router = require('react-router');
var Link = require('react-router').Link;


var DetectivePad = React.createClass({
	getInitialState: function() {
    return {
    };
  },
  render: function() {
    return (
     <div>
         <div className="checklist firstRow">
             <div className="checklistHeader">
                 <div className="checklistRow-Header">
                    <p>Detective Checklist</p>
                 </div>
             </div>
                 <div className="checklist-content">
                     <div className="checklistRow category">
                         <p>Location</p>
                     </div>
                     <div className="checklistRow">
                         Test for checklist
                     </div>
                     <div className="checklistRow category">
                         <p>Weapons</p>
                     </div>
                     <div className="checklistRow">
                         Test for checklist
                     </div>
                     <div className="checklistRow category">
                         <p>Suspects</p>
                     </div>
                 </div>
         </div>
      </div>
    );
  }
});

module.exports = DetectivePad;