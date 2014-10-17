/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarGridBodyCell = React.createClass({displayName: 'CalendarGridBodyCell',
  getDefaultProps: function() {
    return {
      activeDay: false,
      activeMonth: false,
      activeWeek: false,
      className: '',
      date: '',
      events: [],
      fullDate: '',
      moment: moment(),
      week: ''
    };
  },

  getInitialState: function() {
    return {
      selected: this.props.activeDay,
    };
  },

  onClick: function() {
    this.props.onGridSelect(this);
  },

  render: function() {
    var className = '';

    if (this.props.activeMonth) {
      className += ' active-month';

      if (this.props.activeDay) {
        className += ' circle active-day';
      }
    }

    return (
      React.DOM.div({className: "grid-cell", onClick: this.onClick}, 
        React.DOM.div({className: className}, 
          React.DOM.div(null, 
            React.DOM.span(null, this.props.date.date())
          ), 

          app.EventIndicator({hasEvents: this.props.events.length})
        )
      )
    );
  }
});