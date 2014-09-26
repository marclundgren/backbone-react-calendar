/**
 * @jsx React.DOM
 */

// app namespace
var app = app || {};

app.EventIndicator = React.createClass({displayName: 'EventIndicator',
  render: function() {
    var className = 'event-indicator';

    if (this.props.hasEvents) {
      className += ' has-events';
    }

    return (
      React.DOM.div({className: className})
    );
  }
});