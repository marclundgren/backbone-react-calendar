/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.CalendarListView = React.createClass({displayName: 'CalendarListView',
  getDefaultProps: function() {
    return {
      className: 'col-md-12 calendar-list'
    }
  },

  createCalendar: function(item) {
    var selected = item === this.props.selected;

    return (
      app.CalendarItemView({selected: selected, changeCalendar: this.props.changeCalendar, name: item})
    );
  },

  render: function() {
    return (
      React.DOM.div({className: this.props.className}, 
        this.props.calendars.map(this.createCalendar)
      )
    );
  }
});