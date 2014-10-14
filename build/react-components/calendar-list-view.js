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

    return (
      React.DOM.select({defaultValue: this.props.defaultValue, ref: "select", className: "form-control", onChange: this.onChange}, 
        React.DOM.option({value: ""}), 
        this.props.calendars.map(this.createCalendarOption)
      )
    )

    return (
      React.DOM.div({className: className}, 
        "Calendars:", 
        React.DOM.div(null, 
          this.props.calendars.map(this.createCalendar)
        )
      )
    );
  }
});