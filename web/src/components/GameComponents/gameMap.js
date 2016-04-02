var React = require('react');
var $ = require('jQuery');

var GameMap = React.createClass({
    getInitialState: function() {
        return{

        };
    },
render: function(){
    return(
                  <div className="gameMap">
                 <div className="mapRow-header firstRow">
                     <div className="mapColumn" >
                         <p className="mapHeader">LYON CENTER</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapHeader">LEAVEY LIBRARY</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapHeader">TRADDIES</p>
                     </div>
                 </div>

                 <div className="mapRow-content">
                     <div className="mapColumn" >
                         <p className="mapContent"> - </p>
                     </div>
                     <div className="mapColumn mapContentBorder" >
                         <p className="mapContent"> EVKitty <br/> George Tirebiter</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapContent"> - </p>
                     </div>
                 </div>

                 <div className="mapRow-header">
                     <div className="mapColumn" >
                         <p className="mapHeader ">GROUND ZERO</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapHeader ">THE 90</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapHeader ">BOVARD</p>
                     </div>
                 </div>

                 <div className="mapRow-content">
                     <div className="mapColumn" >
                         <p className="mapContent"> - </p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapContent mapContentBorder"> - </p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapContent"> Pete Carroll </p>
                     </div>
                 </div>

                 <div className="mapRow-header">
                     <div className="mapColumn" >
                         <p className="mapHeader">EVK</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapHeader">THE ROW</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapHeader">CAMPUS CENTER</p>
                     </div>
                 </div>

                 <div className="mapRow-content lastRow">
                     <div className="mapColumn" >
                         <p className="mapContent"> Will Ferrell</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapContent mapContentBorder"> President Nikias <br/> Tommy Trojan</p>
                     </div>
                     <div className="mapColumn" >
                         <p className="mapContent"> - </p>
                     </div>
                 </div>
         </div>
      );
    }
});

module.exports = GameMap;