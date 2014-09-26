/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarGridHeaderRow = React.createClass({
  createCell: function(item) {
    return new app.CalendarGridHeaderCell({name: item});
  },

  render: function() {
    return (
      <div className='row'>
        {this.props.names.map(this.createCell)}
      </div>
    );
  }
});