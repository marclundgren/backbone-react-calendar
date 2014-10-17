/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarGridBodyRow = React.createClass({displayName: 'CalendarGridBodyRow',
  createCell: function(item) {
    var moment = item.get('moment');

    return (
      app.CalendarGridBodyCell({
        activeDay: item.get('activeDay'), 
        activeMonth: item.get('activeMonth'), 
        activeWeek: item.get('activeWeek'), 
        date: item.get('moment'), 
        events: item.get('events'), 
        fullDate: item.get('fullDate'), 
        onGridSelect: this.props.onGridSelect})
    );
  },

  componentWillUpdate: function() {
    // this.m = moment();
  },

  render: function() {
    return (
      React.DOM.div({className: "row"}, 
        this.props.dates.map(this.createCell)
      )
    );
  }
});