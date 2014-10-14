/**
 * @jsx React.DOM
 */

// namespace
var app = app || {};

app.CalendarItemOptionView = React.createClass({displayName: 'CalendarItemOptionView',
  getDefaultProps: function() {
    return {
      selected: false
    };
  },

  render: function() {
    return (
      React.DOM.option({value: this.props.name, selected: this.props.selected}, this.props.name)
    );
  }
});

app.CalendarItemView = React.createClass({displayName: 'CalendarItemView',
  getDefaultProps: function() {
    return {
      className: 'calendar-view',
      selected: false
    };
  },

  onClick: function() {
    this.props.changeCalendar(this.props.name);
  },

  render: function() {
    var className = this.props.className;

    if (this.props.selected) {
      className += ' selected';
    }

    return (
      React.DOM.div({className: className, onClick: this.onClick}, 
        React.DOM.div(null, this.props.name)
      )
    );
  }
});