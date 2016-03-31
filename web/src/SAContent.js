var React = require('react');

var SAContent = React.createClass({ 
  mixins: [
    require('react-onclickoutside')
  ],
  handleClickOutside: function(evt) {
    this.props.closeModal(evt);
  },
  closeModal: function(evt) {
    this.props.closeModal(evt);
  },
  render: function() {
    return (
	    <div className="example-modal">
	      <div class="table">
          <div class="tableRow">
            <div class="tableItem">Suspects</div>
          </div>
          <div class="tableRow">
            <div class="tableItem" data-header="Header1">EVKitty</div>
            <div class="tableItem" data-header="Header2">George Tirebiter</div>
            <div class="tableItem" data-header="Header3">Pete Carroll</div>
            <div class="tableItem" data-header="Header4">President Nikias</div>
            <div class="tableItem" data-header="Header4">Tommy Trojan</div>
            <div class="tableItem" data-header="Header4">Will Ferrell</div>
          </div>
          <div class="tableRow">
            <div class="tableItem">Weapons</div>
          </div>
          <div class="tableRow">
            <div class="tableItem" data-header="Header1">Empty Beer Cans</div>
            <div class="tableItem" data-header="Header2">U-Lock</div>
            <div class="tableItem" data-header="Header3">row1 col3</div>
            <div class="tableItem" data-header="Header4">row1 col4</div>
            <div class="tableItem" data-header="Header4">row1 col5</div>
            <div class="tableItem" data-header="Header4">row1 col6</div>
          </div>
          <div class="tableRow">
            <div class="tableItem">Locations</div>
          </div>
          <div class="tableRow">
            <div class="tableItem" data-header="Header4">Bovard</div>
            <div class="tableItem" data-header="Header1">Campus Center</div>
            <div class="tableItem" data-header="Header2">EVK</div>
            <div class="tableItem" data-header="Header3">Ground Zero</div>
            <div class="tableItem" data-header="Header4">Leavey Library</div>
            <div class="tableItem" data-header="Header4">Lyon Center</div>
            <div class="tableItem" data-header="Header4">The Row</div>
            <div class="tableItem" data-header="Header4">The 90</div>
            <div class="tableItem" data-header="Header4">Traddies</div>
          </div>
        </div>
        <button type="button" className="turnButton suggestBtn"><p><a href="">SUGGEST</a></p></button>
        <button type="button" className="turnButton"><p><a href="">ACCUSE</a></p></button>
	      <button onClick={this.closeModal}>Close Modal</button>
	    </div>
	);
  },
});

module.exports = SAContent;