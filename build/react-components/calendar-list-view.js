/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.CalendarListView = React.createClass({displayName: 'CalendarListView',
  getDefaultProps: function() {
    return {
      active: false,
      calendars: [],
      className: 'col-md-12 calendar-list',
      selected: ''
    }
  },

  createCalendarOption: function(item) {
    return (
      React.DOM.option({value: item}, item)
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

    return (
      React.DOM.div(null, 
        React.DOM.h4(null, "Filter by"), 
        React.DOM.select({className: "form-control", value: this.props.selected, ref: "select", onChange: this.onChange}, 
          React.DOM.option({value: ""}, "All"), 
          this.props.calendars.map(this.createCalendarOption)
        )
      )
    );
  }
});