/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarGridHeaderRow = React.createClass({displayName: 'CalendarGridHeaderRow',
  createCell: function(item) {
    return new app.CalendarGridHeaderCell({name: item});
  },

  render: function() {
    return (
      React.DOM.div({className: "row"}, 
        this.props.names.map(this.createCell)
      )
    );
  }
});