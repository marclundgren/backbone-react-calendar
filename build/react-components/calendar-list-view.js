/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.CalendarListView = React.createClass({displayName: 'CalendarListView',
  getDefaultProps: function() {
    return {
      active: false,
      className: 'col-md-12 calendar-list',
      defaultValue: ''
    }
  },

  createCalendar: function(item) {
    var selected = item === this.props.selected;

    return (
      app.CalendarItemView({selected: selected, changeCalendar: this.props.changeCalendar, name: item})
    );
  },

  createCalendarOption: function(item) {
    var selected = item === this.props.selected;

    return (
      app.CalendarItemOptionView({selected: selected, name: item})
    );
  },

  onChange: function() {
    var val = this.refs.select.getDOMNode().value;

    this.props.changeCalendar(val);
  },

  render: function() {
    var className = this.props.className;

    if (this.props.active) {
      className += ' active';
    }

    window.logTime();

    return (
      React.DOM.div(null, 
        React.DOM.h4(null, "Filter by"), 
        React.DOM.select({defaultValue: this.props.defaultValue, ref: "select", className: "form-control", onChange: this.onChange}, 
          React.DOM.option({value: ""}, "All"), 
          this.props.calendars.map(this.createCalendarOption)
        )
      )
    );
  }
});