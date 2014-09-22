/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.CalendarDay = React.createClass({displayName: 'CalendarDay',
  render: function() {
    return (
      React.DOM.div({className: this.props.className}, 
        React.DOM.div({className: "day-number"}, this.props.moment.date())
      )
    );
  }
});