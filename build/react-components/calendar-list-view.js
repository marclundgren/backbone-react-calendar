/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.CalendarListView = React.createClass({displayName: 'CalendarListView',
  getDefaultProps: function() {
    return {
      active: false,
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
    var className = this.props.className;

    if (this.props.active) {
      className += ' active';
    }

    return (
      React.DOM.div({className: className}, 
        "Calendars: ", this.props.calendars.map(this.createCalendar)
      )
    );
  }
});